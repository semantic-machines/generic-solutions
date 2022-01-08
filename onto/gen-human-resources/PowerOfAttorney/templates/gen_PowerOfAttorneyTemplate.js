import BrowserUtil from '/js/browser/util.js';
import $ from 'jquery';
import veda from '/js/common/veda.js';
import IndividualModel from '/js/common/individual_model.js';
import riot from 'riot';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if (mode === 'edit' && individual.isNew()) {
    var _class = new IndividualModel('v-s:Correspondent'),
      Grantor = new IndividualModel();
    Grantor['rdf:type'] = [_class];
    Grantor['v-s:correspondentOrganization'] = [veda.appointment['v-s:parentOrganization'][0]];
    Grantor['v-s:correspondentDepartment'] = [veda.appointment['v-s:parentUnit'][0]];
    Grantor['v-s:correspondentPerson'] = [veda.appointment];
    individual['v-s:grantor'] = [Grantor];
  }

  template.on('validate', function () {
    var result = {};
    if (individual.hasValue('v-s:isIssuedForAbsencePeriodOfEmployee', true) && !individual.hasValue('v-s:issuedForAbsencePeriodOfEmployee')) {
      result['v-s:issuedForAbsencePeriodOfEmployee'] = {
        state: false,
        cause: ['v-ui:minCardinality'],
      };
    }
    template[0].dispatchEvent(new CustomEvent('validated', { detail: result }));
  });

  var _class = new IndividualModel('gen:PowerOfAttorney');
  _class.canCreate().then(function (canCreate) {
    if (!canCreate) {
      $('#add-copy', template).remove();
      $('#add-linkedCopy', template).remove();
    }
  });
};

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $('#add-copy', template).click(function () {
    var _class = new IndividualModel('gen:PowerOfAttorney'),
      Attorney = new IndividualModel(),
      tmpl = 'gen:PowerOfAttorneyTemplate';
    Attorney['rdf:type'] = [_class];
    copyAttorney(Attorney).then(function () {
      riot.route(['#', Attorney.id, '#main', tmpl, 'edit'].join('/'));
      Attorney.one('afterSave', function () {
        setTimeout(() => {
          riot.route('#/' + Attorney.id, false);
        }, 250);
      });
    });
  });

  $('#add-linkedCopy', template).click(function () {
    var _class = new IndividualModel('gen:PowerOfAttorney'),
      Attorney = new IndividualModel(),
      tmpl = 'gen:PowerOfAttorneyTemplate';
    Attorney['rdf:type'] = [_class];
    copyAttorney(Attorney).then(function () {
      var Link = new IndividualModel();
      Link['rdf:type'] = [new IndividualModel('v-s:Link')];
      Link['v-s:to'] = [individual];
      Link['v-s:from'] = [Attorney];
      Attorney['v-s:hasLink'] = [Link];
      riot.route(['#', Attorney.id, '#main', tmpl, 'edit'].join('/'));
    });
  });

  $('#add-RegRecord', template).click(function () {
    var modal = $('#notification-modal-template').html();
    modal = $(modal);
    modal.modal({ show: false });
    $('body').append(modal);
    modal.modal('show');
    template.one('remove', function () {
      modal.modal('hide').remove();
    });

    var cntr = $('.modal-body', modal),
      _class = new IndividualModel('gen:PowerOfAttorneyRegistrationRecord'),
      RegRecord = new IndividualModel(),
      tmpl = new IndividualModel('gen:PowerOfAttorneyRegistrationRecordTemplate');
    RegRecord['rdf:type'] = [_class];
    RegRecord['v-s:backwardTarget'] = [individual];
    RegRecord['v-s:backwardProperty'] = [new IndividualModel('gen:hasPowerOfAttorneyRegistrationRecord')];
    RegRecord['v-s:backwardReplace'] = [new IndividualModel('v-s:registrationDate')];
    RegRecord['v-s:canRead'] = [true];
    RegRecord['v-s:registrationDate'] = individual['v-s:registrationDate'];
    RegRecord.present(cntr, tmpl, 'edit');
    RegRecord.one('beforeReset', function () {
      modal.modal('hide').remove();
    });
    RegRecord.one('afterSave', function () {
      modal.modal('hide').remove();
    });
  });

  function copyAttorney(Attorney) {
    Attorney['v-s:issuedForAbsencePeriodOfEmployee'] = individual['v-s:issuedForAbsencePeriodOfEmployee'];
    Attorney['v-s:hasFormOfPowerOfAttorney'] = individual['v-s:hasFormOfPowerOfAttorney'];
    Attorney['v-s:hasReasonForPowerOfAttorney'] = individual['v-s:hasReasonForPowerOfAttorney'];
    Attorney['v-s:reason'] = individual['v-s:reason'];

    var promises = [individual['v-s:grantor'][0].clone(), individual['v-s:grantee'][0].clone()];
    return Promise.all(promises).then(function (results) {
      var clonedGrantor = results[0];
      clonedGrantor['v-s:parent'] = [Attorney.id];
      var clonedGrantee = results[1];
      clonedGrantee['v-s:parent'] = [Attorney.id];
      Attorney['v-s:grantor'] = [clonedGrantor];
      Attorney['v-s:grantee'] = [clonedGrantee];
    });
  }

  function regRecordHandler() {
    if (template.data('mode') === 'edit') {
      if (individual.hasValue('gen:hasPowerOfAttorneyRegistrationRecord')) {
        $('#buttonReg', template).hide();
      } else {
        $('#buttonReg', template).show();
      }
    }
  }
  function absencePeriodHandler() {
    if (template.data('mode') === 'edit') {
      if (individual.hasValue('v-s:isIssuedForAbsencePeriodOfEmployee', true)) {
        $('#toggle-AbsencePeriod', template).show();
      } else {
        individual['v-s:issuedForAbsencePeriodOfEmployee'] = [];
        $('#toggle-AbsencePeriod textarea', template).val('');
        $('#toggle-AbsencePeriod', template).hide();
      }
    }
  }
  function processHandler() {
    individual.canUpdate().then(function (canUpdate) {
      if (individual.hasValue('v-wf:isProcess')) {
        $('#send.action', template).remove();
        $('#delete.action', template).remove();
      } else if (individual.isNew() || canUpdate) {
        $('#send.action', template).off('click');
        $('#send.action', template).on('click', function () {
          BrowserUtil.send(individual, template, 's-wf:complexRouteTransform', undefined, 'gen:PowerOfAttorney_ComplexRouteStartForm_Template');
        });
      } else {
        $('#send.action', template).remove();
        $('#delete.action', template).remove();
      }
    });
  }
  processHandler();
  regRecordHandler();
  absencePeriodHandler();
  individual.on('afterReset', processHandler);
  individual.on('gen:hasPowerOfAttorneyRegistrationRecord', regRecordHandler);
  individual.on('v-s:isIssuedForAbsencePeriodOfEmployee', absencePeriodHandler);
  template.one('remove', function () {
    individual.off('afterReset', processHandler);
    individual.off('gen:hasPowerOfAttorneyRegistrationRecord', regRecordHandler);
    individual.off('v-s:isIssuedForAbsencePeriodOfEmployee', absencePeriodHandler);
  });
};

export const html = `
  <div>
    <div class="container sheet">
      <h2>
        <span about="gen:PowerOfAttorney" property="rdfs:label"></span>
        <small about="@" property="rdfs:label"></small>
      </h2>
      <hr />
      <section>
        <h4 class="section-header clearfix">
          <span about="gen:PowerOfAttorneyRegistrationRecord" property="rdfs:label"></span>
          <veda-control data-type="link" rel="gen:hasPowerOfAttorneyRegistrationRecord" class="-view -edit search create pull-right"></veda-control>
          <div class="view -edit -search pull-right">
            <button class="btn btn-xs btn-success" id="add-RegRecord">
              <span class="glyphicon glyphicon-zoom-in"></span>
              <span about="gen:hasPowerOfAttorneyRegistrationRecord" property="rdfs:label"></span>
            </button>
          </div>
        </h4>
        <div class="table-responsive -view edit -search">
          <table class="table no-margin">
            <thead class="result-header">
              <tr>
                <th width="1"><span class="glyphicon glyphicon-search"></span></th>
                <th about="gen:PowerOfAttorney_date_Bundle" property="rdfs:label"></th>
                <th about="rdfs:comment" property="rdfs:label"></th>
              </tr>
            </thead>
            <tbody rel="gen:hasPowerOfAttorneyRegistrationRecord">
              <tr>
                <td about="@" data-template="v-ui:IconModalTemplate"></td>
                <td>
                  <div about="@" property="gen:PowerOfAttorney_date_Bundle"></div>
                </td>
                <td>
                  <div about="@" property="rdfs:comment"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          rel="gen:hasPowerOfAttorneyRegistrationRecord"
          data-template="gen:PowerOfAttorneyRegistrationRecordEmbeddedTemplate"
          data-embedded="true"
          class="view -edit search create"></div>
      </section>
      <section id="MainProperties">
        <h4 class="section-header" about="v-s:MainProperties" property="rdfs:label"></h4>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:registrationNumber" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:registrationNumber" class="view -edit -search"></div>
            <veda-control data-type="text" property="v-s:registrationNumber" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="gen:PowerOfAttorney_date_Bundle" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-3">
            <div property="v-s:registrationDate" class="view -edit search"></div>
            <veda-control data-type="date" property="v-s:registrationDate" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:hasFormOfPowerOfAttorney" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:hasFormOfPowerOfAttorney" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="radio" rel="v-s:hasFormOfPowerOfAttorney" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:isIssuedForAbsencePeriodOfEmployee" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div class="checkbox">
              <label>
                <veda-control property="v-s:isIssuedForAbsencePeriodOfEmployee" data-type="boolean"></veda-control>
              </label>
            </div>
            <div property="v-s:issuedForAbsencePeriodOfEmployee" class="view edit search"></div>
            <div id="toggle-AbsencePeriod">
              <veda-control data-type="link" rel="v-s:issuedForAbsencePeriodOfEmployee" class="-view edit search fulltext"></veda-control>
            </div>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="gen:PowerOfAttorney_duration_Bundle" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-3">
            <div property="v-s:dateFrom" class="view -edit search"></div>
            <veda-control data-type="date" property="v-s:dateFrom" class="-view edit search"></veda-control>
          </div>
          <div class="col-sm-3 col-xs-3">
            <div property="v-s:dateTo" class="view -edit search"></div>
            <veda-control data-type="date" property="v-s:dateTo" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="gen:isPowerOfAttorneyProlongationRequired" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div class="checkbox">
              <label>
                <veda-control property="gen:isPowerOfAttorneyProlongationRequired" data-type="boolean"></veda-control>
              </label>
            </div>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <span about="gen:PowerOfAttorney_reason_Bundle" property="rdfs:label"></span>
          </div>
          <div class="col-sm-4 col-xs-3">
            <div rel="v-s:hasReasonForPowerOfAttorney" data-template="v-ui:LabelTemplate" class="view edit search"></div>
            <veda-control data-type="link" rel="v-s:hasReasonForPowerOfAttorney" class="-view edit search fulltext dropdown"></veda-control><br />
          </div>
          <div class="col-sm-5 col-xs-3">
            <div property="v-s:reason" class="view -edit search"></div>
            <veda-control data-type="text" property="v-s:reason" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:grantor" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:grantor" class="view edit search" data-template="v-s:CorrespondentTemplate" data-embedded="true"></div>
            <veda-control data-type="link" rel="v-s:grantor" class="-view edit search create"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:grantee" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:grantee" class="view edit search" data-template="v-s:CorrespondentTemplate" data-embedded="true"></div>
            <veda-control data-type="link" rel="v-s:grantee" class="-view edit search create"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <span about="v-s:attachment" property="rdfs:label"></span>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:attachment" data-template="v-ui:FileTemplateWithComment" data-embedded="true"></div>
            <veda-control data-type="file" rel="v-s:attachment" class="-view edit -search"></veda-control>
          </div>
        </div>
      </section>

      <hr />
      <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
      <br />
      <!-- BUTTONS -->
      <div class="actions view edit -search">
        <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send edit save cancel delete journal task"></span>
        <button type="button" class="action btn btn-default view -edit -search" id="add-copy" about="gen:PowerOfAttorney_copy_Bundle" property="rdfs:label" />
        <button
          type="button"
          class="action btn btn-default view -edit -search"
          id="add-linkedCopy"
          about="gen:PowerOfAttorney_linkedCopy_Bundle"
          property="rdfs:label" />
      </div>
    </div>
    <div about="@" class="container sheet view edit -search" data-template="v-s:LinksTemplate" data-embedded="true"></div>
    <div about="@" class="container sheet view -edit -search" data-template="v-s:CommentsTemplate"></div>
  </div>
`;
