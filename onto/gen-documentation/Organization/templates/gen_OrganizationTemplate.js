import BrowserUtil from '/js/browser/util.js';
import $ from 'jquery';
import veda from '/js/common/veda.js';
import IndividualModel from '/js/common/individual_model.js';
import Backend from '/js/common/backend.js';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  const _ContractorProfile = new IndividualModel('v-s:ContractorProfile');
  const canCreateProfile = _ContractorProfile.canCreate();
  const canUpdatePromise = individual.canUpdate();

  function handler () {
    Promise.all([canCreateProfile, canUpdatePromise]).then(function (results) {
      if (template.data('mode') === 'edit' || individual.hasValue('v-s:hasContractorProfile') || !(results[0] && results[1])) {
        $('#add-profile', template).remove();
      }
    });
  }
  individual.on('v-s:hasContractorProfile', handler);
  template.one('remove', function () {
    individual.off('v-s:hasContractorProfile', handler);
  });
  handler();

  const _class = new IndividualModel('v-s:Subsidiary');

  Promise.all([_class.rights, individual.rights])
    .then(function (rights) {
      const class_rights = rights[0];
      const individual_rights = rights[1];
      if (!class_rights.hasValue('v-s:canCreate', true) || !individual_rights.hasValue('v-s:canUpdate', true)) {
        $('#add-subsidiary', template).remove();
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  let prevTaxId = individual.hasValue('v-s:taxId') && individual['v-s:taxId'][0].toString();

  // Validation
  template.on('validate', function () {
    const result = {state: true};
    let regexp;
    if (individual.hasValue('v-s:hasClassifierCountry', 'd:Country_RUS') && individual.hasValue('v-s:hasClassifierLegalForm', 'd:OKOPF_50102')) {
      regexp = /^([0-9]{12})$/gi;
    } else if (individual.hasValue('v-s:hasClassifierCountry', 'd:Country_RUS')) {
      regexp = /^([0-9]{10})$/gi;
    } else if (individual.hasValue('v-s:hasClassifierCountry', 'd:Country_NLD')) {
      regexp = /^[A-Z]{1,3}[0-9]{9}[B]{1}[0-9]{2}$/gi;
    } else if (individual.hasValue('v-s:hasClassifierCountry')) {
      regexp = /^[A-Z]{1,3}[0-9]{4,}$/gi;
    }
    if (!individual.hasValue('v-s:taxId')) {
      result['v-s:taxId'] = {
        state: false,
        cause: ['v-ui:minCardinality'],
      };
    } else {
      // Check regexp
      const taxId = individual['v-s:taxId'][0].toString();
      if (taxId != '0000000000' && taxId != '000000000000') {
        result['v-s:taxId'] = {
          state: regexp.test(taxId),
          cause: ['v-ui:regexp'],
        };
      } else {
        result['v-s:taxId'] = {
          state: false,
          cause: ['v-s:ForSafeTaxId'],
        };
      }

      // Check unique
      const newTaxId = individual.hasValue('v-s:taxId') && individual['v-s:taxId'][0].toString();
      if (prevTaxId !== newTaxId) {
        prevTaxId = newTaxId;
      }
      if (result['v-s:taxId'].state) {
        Backend.query(veda.ticket, '\'rdf:type\'===\'v-s:Organization\' && \'v-s:taxId\'==\'' + taxId + '\'').then(function (queryResult) {
          result['v-s:taxId'] = {
            state: !queryResult.result.length || queryResult.result[0] === individual.id,
            cause: ['v-s:NonUniqueTaxId'],
          };
          template[0].dispatchEvent(new CustomEvent('validated', {detail: result}));
        });
      }
    }
    // Если значение поля v-s:hasClassifierCountry=d:Country_RUS то поле v-s:hasClassifierLegalForm Обязательное
    if (individual.hasValue('v-s:hasClassifierCountry', 'd:Country_RUS')) {
      result['v-s:hasClassifierLegalForm'] = {
        state: individual.hasValue('v-s:hasClassifierLegalForm'),
        cause: ['v-ui:minCardinality'],
      };
    }
    // Если значение поля v-s:hasClassifierCountry=d:Country_RUS и поле v-s:hasClassifierLegalForm=d:OKOPF_50102 то поле v-s:taxRegistrationCause должно быть обязательным.
    if (
      individual.hasValue('v-s:hasClassifierCountry', 'd:Country_RUS') &&
      !individual.hasValue('v-s:hasClassifierLegalForm', 'd:OKOPF_50102') &&
      !individual.hasValue('v-s:hasClassifierLegalForm', 'd:OKOPF_50000')
    ) {
      result['v-s:taxRegistrationCause'] = {
        state: /^[0-9]{9}$/.test(individual['v-s:taxRegistrationCause'][0]),
        cause: ['v-ui:regexp'],
      };
    }
    template[0].dispatchEvent(new CustomEvent('validated', {detail: result}));
  });
};

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  // Генерация Uri
  BrowserUtil.registerHandler(individual, template, 'beforeSave', function () {
    const shortLabel = individual['v-s:hasClassifierCountry'][0]['v-s:shortLabel'];
    const taxId = individual['v-s:taxId'];
    if (individual.hasValue('v-s:hasClassifierCountry', 'd:Country_RUS') && individual.isNew()) {
      individual.id = 'd:org_' + shortLabel + taxId;
    } else if (individual.isNew()) {
      individual.id = 'd:org_' + taxId;
    }
  });

  $('#add-subsidiary', template).click(function () {
    let modal = $('#notification-modal-template').html();
    modal = $(modal);
    modal.modal({show: false});
    $('body').append(modal);
    modal.modal('show');
    template.one('remove', function () {
      modal.modal('hide').remove();
    });
    const cntr = $('.modal-body', modal);
    const _class = new IndividualModel('v-s:Subsidiary');
    const subsidiary = new IndividualModel();
    const tmpl = new IndividualModel('gen:SubsidiaryTemplate');
    subsidiary['rdf:type'] = [_class];
    subsidiary['v-s:backwardTarget'] = [individual];
    subsidiary['v-s:backwardProperty'] = [new IndividualModel('v-s:hasSubsidiary')];
    subsidiary['v-s:canRead'] = [true];
    subsidiary.present(cntr, tmpl, 'edit');
    subsidiary.one('beforeReset', function () {
      modal.modal('hide').remove();
    });
    subsidiary.one('afterSave', function () {
      modal.modal('hide').remove();
    });
  });

  $('#add-profile', template).click(function () {
    let modal = $('#notification-modal-template').html();
    modal = $(modal);
    modal.modal({show: false});
    $('body').append(modal);
    modal.modal('show');
    template.one('remove', function () {
      modal.modal('hide').remove();
    });
    const cntr = $('.modal-body', modal);
    const _class = new IndividualModel('v-s:ContractorProfile');
    const profile = new IndividualModel();
    const tmpl = new IndividualModel('gen:ContractorProfileTemplate');
    profile['rdf:type'] = [_class];
    profile['v-s:backwardTarget'] = [individual];
    profile['v-s:backwardProperty'] = [new IndividualModel('v-s:hasContractorProfile')];
    profile['rdfs:label'] = individual['v-s:shortLabel'];
    profile.present(cntr, tmpl, 'edit');
    profile.one('beforeReset', function () {
      modal.modal('hide').remove();
    });
    profile.one('afterSave', function () {
      modal.modal('hide').remove();
    });
  });

  $('#add-communicationMean', template).click(function () {
    let modal = $('#notification-modal-template').html();
    modal = $(modal);
    modal.modal({show: false});
    $('body').append(modal);
    modal.modal('show');
    template.one('remove', function () {
      modal.modal('hide').remove();
    });
    const cntr = $('.modal-body', modal);
    const _class = new IndividualModel('v-s:CommunicationMean');
    const CommunicationMean = new IndividualModel();
    const tmpl = new IndividualModel('v-s:CommunicationMeanTemplate');
    CommunicationMean['rdf:type'] = [_class];
    CommunicationMean['v-s:backwardTarget'] = [individual];
    CommunicationMean['v-s:backwardProperty'] = [new IndividualModel('v-s:hasCommunicationMean')];
    CommunicationMean['v-s:canRead'] = [true];
    CommunicationMean.present(cntr, tmpl, 'edit');
    CommunicationMean.one('beforeReset', function () {
      modal.modal('hide').remove();
    });
    CommunicationMean.one('afterSave', function () {
      modal.modal('hide').remove();
    });
  });
};

export const html = `
<div>
  <div class="container sheet">
    <h3 class="margin-sm">
      <span about="@" property="rdf:type"></span>
      <small about="@" property="rdfs:label" class="view edit -search"></small>
    </h3>
    <section id="MainProperties">
      <h4 class="section-header" about="v-s:MainProperties" property="rdfs:label"></h4>

      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="rdfs:label" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
      <div property="rdfs:label" class="view -edit -search"></div>
          <veda-control data-type="string" property="rdfs:label" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:shortLabel" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div property="v-s:shortLabel" class="view -edit -search"></div>
          <veda-control data-type="string" property="v-s:shortLabel" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:hasClassifierCountry" property="rdfs:label"></label>
        </div>
        <div class="col-sm-4 col-xs-4">
          <div rel="v-s:hasClassifierCountry" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:hasClassifierCountry" class="-view edit search fulltext dropdown"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:hasClassifierLegalForm" property="rdfs:label"></label>
        </div>
        <div class="col-sm-4 col-xs-4">
          <div rel="v-s:hasClassifierLegalForm" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:hasClassifierLegalForm" class="-view edit search fulltext dropdown"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:taxId" property="rdfs:label"></label>
        </div>
        <div class="col-sm-4 col-xs-4">
      <div property="v-s:taxId" class="view -edit -search"></div>
          <veda-control data-type="string" property="v-s:taxId" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:taxRegistrationCause" property="rdfs:label"></label>
        </div>
        <div class="col-sm-4 col-xs-4">
      <div property="v-s:taxRegistrationCause" class="view -edit -search"></div>
          <veda-control data-type="string" property="v-s:taxRegistrationCause" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:legalAddress" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
      <div property="v-s:legalAddress" class="view -edit -search"></div>
          <veda-control data-type="text" rows="3" property="v-s:legalAddress" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:postalAddress" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
      <div property="v-s:postalAddress" class="view -edit -search"></div>
          <veda-control data-type="text" rows="3" property="v-s:postalAddress" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:LegalEntityExistencePeriodBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-3 col-xs-3">
      <div property="v-s:dateFromFact" class="view -edit search"></div>
          <veda-control data-type="date" property="v-s:dateFromFact" class="-view edit search"></veda-control>
        </div>
        <div class="col-sm-3 col-xs-3">
      <div property="v-s:dateToFact" class="view -edit search"></div>
          <veda-control data-type="date" property="v-s:dateToFact" class="-view edit search"></veda-control>
        </div>
      </div>

      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <strong about="v-s:hasSubsidiary" property="rdfs:label"></strong>
        </div>
        <div class="col-sm-9 col-xs-7">
          <table class="table table-condensed table-bordered">
            <thead>
              <tr class="view -edit -search active">
                <th width="1%"><span class="glyphicon glyphicon-search"></th>
                <th about="v-s:shortLabel" property="rdfs:label"></th>
                <th about="v-s:taxRegistrationCause" property="rdfs:label"></th>
                <th about="v-s:postalAddress" property="rdfs:label"></th>
              </tr>
            </thead>
            <tbody rel="v-s:hasSubsidiary" data-embedded="true">
              <tr>
                <td about="@" data-template="v-ui:IconModalTemplate"></td>
                <td>
                <div property="v-s:shortLabel" class="view -edit -search"></div>
                <veda-control property="v-s:shortLabel" data-type="string" class="-view edit search"></div>
                </td>
                <td>
                <div property="v-s:taxRegistrationCause" class="view -edit -search"></div>
                <veda-control property="v-s:taxRegistrationCause" data-type="string" class="-view edit search"></div>
                </td>
                <td>
                <div property="v-s:postalAddress" class="view -edit -search"></div>
                <veda-control property="v-s:postalAddress" data-type="string" class="-view edit search"></div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="view -edit -search">
            <button class="btn btn-xs btn-success" id="add-subsidiary">
              <span class="glyphicon glyphicon-zoom-in"></span>
              <span about="v-s:hasSubsidiary" property="rdfs:label"> </span>
            </button>
          </div>
        </div>
      </div>


      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <strong about="v-s:hasCommunicationMean" property="rdfs:label"></strong>
        </div>
        <div class="col-sm-9 col-xs-7">
          <table class="table table-condensed table-bordered">
            <thead>
              <tr class="view -edit -search active">
                <th width="1%"><span class="glyphicon glyphicon-search"></th>
                <th about="v-s:hasCommunicationMeanChannel" property="rdfs:label"></th>
                <th about="v-s:hasCommunicationMeanTarget" property="rdfs:label"></th>
                <th about="v-s:description" property="rdfs:label"></th>
                <th about="rdfs:comment" property="rdfs:label"></th>
              </tr>
            </thead>
            <tbody rel="v-s:hasCommunicationMean" data-embedded="true">
              <tr>
                <td about="@" data-template="v-ui:IconModalTemplate"></td>
                <td>
                  <div rel="v-s:hasCommunicationMeanChannel" class="view -edit -search" data-template="v-ui:LabelTemplate"></div>
                  <veda-control data-type="link" rel="v-s:hasCommunicationMeanChannel" class="-view edit search fulltext dropdown"></veda-control>
                </td>
                <td>
                  <div rel="v-s:hasCommunicationMeanTarget" class="view -edit -search" data-template="v-ui:LabelTemplate"></div>
                  <veda-control data-type="link" rel="v-s:hasCommunicationMeanTarget" class="-view edit search fulltext dropdown"></veda-control>
                </td>
                <td>
                  <div property="v-s:description" class="view -edit -search"></div>
                  <veda-control property="v-s:description" data-type="text" class="-view edit search"></div>
                </td>
                <td>
                  <div property="rdfs:comment" class="view -edit -search"></div>
                  <veda-control property="rdfs:comment" data-type="text" class="-view edit search"></div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="view -edit -search">
            <button class="btn btn-xs btn-success" id="add-communicationMean">
              <span class="glyphicon glyphicon-zoom-in"></span>
              <span about="gen:AddCommunicationMeanBundle" property="rdfs:label"></span>
            </button>
          </div>
        </div>
      </div>

      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:HeadOrganization" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:parentUnit" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:parentUnit" class="-view edit search fulltext"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:hasContractorProfile" property="rdfs:label" class="view edit -search"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:hasContractorProfile" class="view edit -search" data-template="v-ui:ClassNameLabelLinkTemplate"></div>
          <div class="view -edit -search">
            <button class="btn btn-xs btn-success" id="add-profile">
              <span class="glyphicon glyphicon-zoom-in"></span>
              <span about="v-s:hasContractorProfile" property="rdfs:label"> </span>
            </button>
          </div>
        </div>
      </div>
    </section>
    <hr>
    <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
    <br>
    <div class="actions">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="edit save cancel delete journal"></span>
    </div>
  </div>
  <div about="@" class="container sheet view edit -search" data-template="v-s:LinksTemplate" data-embedded="true"></div>
  <div about="@" class="container sheet view -edit -search" data-template="v-s:CommentsTemplate"></div>
</div>
`;
