import BrowserUtil from '/js/browser/util.js';
import $ from 'jquery';
import veda from '/js/common/veda.js';
import IndividualModel from '/js/common/individual_model.js';
import riot from 'riot';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if (mode == 'edit' && individual.isNew()) {
    if (!individual.hasValue('v-s:responsibleDepartment')) {
      individual['v-s:responsibleDepartment'] = [veda.appointment['v-s:parentUnit'][0]];
    }
  }

  if (!individual.hasValue('v-s:initiator') && mode == 'edit') {
    individual['v-s:initiator'] = [[veda.appointment][0]];
  }
};

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $('#add-OutgoingLetter', template).click(function () {
    const _class = new IndividualModel('v-s:OutgoingLetter');
    const OutcomingLetter = new IndividualModel();
    const tmpl = 'gen:LetterTemplate';
    OutcomingLetter['rdf:type'] = [_class];

    const recipientPromise = individual['v-s:stakeholder'].map(function (stakeholder) {
      const newRecipient = new IndividualModel();
      newRecipient['rdf:type'] = [new IndividualModel('v-s:Correspondent')];
      newRecipient['v-s:correspondentOrganization'] = [stakeholder];
      return newRecipient;
    });
    Promise.all(recipientPromise).then(function (recipient) {
      const newSender = new IndividualModel();
      newSender['rdf:type'] = [new IndividualModel('v-s:Correspondent')];
      newSender['v-s:correspondentOrganization'] = [new IndividualModel('d:org_RU1100220011')];

      OutcomingLetter['v-s:recipient'] = recipient;
      OutcomingLetter['v-s:sender'] = [newSender];

      const Link = new IndividualModel();
      Link['rdf:type'] = [new IndividualModel('v-s:Link')];
      Link['v-s:from'] = [OutcomingLetter];
      Link['v-s:to'] = [individual];
      OutcomingLetter['v-s:hasLink'] = [Link];

      riot.route(['#', OutcomingLetter.id, '#main', tmpl, 'edit'].join('/'));
    });
  });

  $('#add-OutgoingClaim', template).click(function () {
    const _class = new IndividualModel('v-s:Claim');
    const OutcomingClaim = new IndividualModel();
    const tmpl = 'gen:ClaimTemplate';
    OutcomingClaim['rdf:type'] = [_class];

    const recipientPromise = individual['v-s:stakeholder'].map(function (stakeholder) {
      const newRecipient = new IndividualModel();
      newRecipient['rdf:type'] = [new IndividualModel('v-s:Correspondent')];
      newRecipient['v-s:correspondentOrganization'] = [stakeholder];
      return newRecipient;
    });
    Promise.all(recipientPromise).then(function (recipient) {
      const newSender = new IndividualModel();
      newSender['rdf:type'] = [new IndividualModel('v-s:Correspondent')];
      newSender['v-s:correspondentOrganization'] = [new IndividualModel('d:org_RU1100220011')];

      OutcomingClaim['v-s:recipient'] = recipient;
      OutcomingClaim['v-s:sender'] = [newSender];
      OutcomingClaim['v-s:dateFrom'] = individual['v-s:date'];
      OutcomingClaim['v-s:hasStatus'] = individual['v-s:hasStatus'];
      OutcomingClaim['v-s:hasClaimEvent'] = [individual];

      const Link = new IndividualModel();
      Link['rdf:type'] = [new IndividualModel('v-s:Link')];
      Link['v-s:from'] = [OutcomingClaim];
      Link['v-s:to'] = [individual];
      OutcomingClaim['v-s:hasLink'] = [Link];

      riot.route(['#', OutcomingClaim.id, '#main', tmpl, 'edit'].join('/'));
    });
  });

  $('#add-IncomingClaim', template).click(function () {
    const _class = new IndividualModel('v-s:Claim');
    const IncomingClaim = new IndividualModel();
    const tmpl = 'gen:ClaimTemplate';
    IncomingClaim['rdf:type'] = [_class];

    const recipientPromise = individual['v-s:stakeholder'].map(function (stakeholder) {
      const newSender = new IndividualModel();
      newSender['rdf:type'] = [new IndividualModel('v-s:Correspondent')];
      newSender['v-s:correspondentOrganization'] = [stakeholder];
      return newSender;
    });
    Promise.all(recipientPromise).then(function (sender) {
      const newRecipient = new IndividualModel();
      newRecipient['rdf:type'] = [new IndividualModel('v-s:Correspondent')];
      newRecipient['v-s:correspondentOrganization'] = [new IndividualModel('d:org_RU1100220011')];

      IncomingClaim['v-s:recipient'] = [newRecipient];
      IncomingClaim['v-s:sender'] = sender;
      IncomingClaim['v-s:dateFrom'] = individual['v-s:date'];
      IncomingClaim['v-s:hasStatus'] = individual['v-s:hasStatus'];
      IncomingClaim['v-s:hasClaimEvent'] = [individual];

      const Link = new IndividualModel();
      Link['rdf:type'] = [new IndividualModel('v-s:Link')];
      Link['v-s:from'] = [IncomingClaim];
      Link['v-s:to'] = [individual];
      IncomingClaim['v-s:hasLink'] = [Link];

      riot.route(['#', IncomingClaim.id, '#main', tmpl, 'edit'].join('/'));
    });
  });

  // Поцессная часть
  function processHandler () {
    individual.canUpdate().then(function (canUpdate) {
      if (individual.hasValue('v-wf:isProcess')) {
        $('#send.action', template).remove();
        $('#delete.action', template).remove();
      } else if (individual.isNew() || canUpdate) {
        $('#send.action', template).off('click');
        $('#send.action', template).on('click', function () {
          BrowserUtil.send(individual, template, 's-wf:complexRouteTransform', undefined, 'gen:ClaimEvent_ComplexRouteStartForm_Template');
        });
      } else {
        $('#send.action', template).remove();
        $('#delete.action', template).remove();
      }
    });
  }
  processHandler();
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
            <label about="v-s:registrationNumber" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-3">
            <div property="v-s:registrationNumber" class="view -edit -search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="text" property="v-s:registrationNumber" class="-view -edit search"></veda-control>
          </div>
        </div>

        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="gen:ClaimEvent_EventDate_Bundle" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div class="form-inline">
              <div class="form-group">
                <span property="v-s:dateFrom" class="view -edit search"></span>
                <veda-control property="v-s:dateFrom" data-type="dateTime" class="-view edit search"></veda-control>
              </div>
              <span class="view -edit -search">&mdash;&nbsp;&nbsp;&nbsp;</span>
              <div class="form-group">
                <span property="v-s:dateTo" class="view -edit search"></span>
                <veda-control property="v-s:dateTo" data-type="dateTime" class="-view edit search"></veda-control>
              </div>
            </div>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:hasStatus" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-3">
            <div rel="v-s:hasStatus" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:hasStatus" class="-view edit search fulltext dropdown"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:theme" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:theme" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="string" property="v-s:theme" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="gen:ClaimEvent_Description_Bundle" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:claimCircumstanceDescription" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="text" property="v-s:claimCircumstanceDescription" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:initiator" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:initiator" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:initiator" class="-view edit search fulltext dropdown"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="gen:ClaimEvent_Departments_Bundle" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:responsibleDepartment" class="view edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:responsibleDepartment" class="-view edit search fulltext tree"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="gen:ClaimEvent_Contractors_Bundle" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <table class="table table-bordered">
              <thead class="result-header">
                <tr class="active">
                  <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
                  <th about="rdfs:label" property="rdfs:label"></th>
                  <th about="v-s:taxId" property="rdfs:label"></th>
                  <th about="v-s:legalAddress" property="rdfs:label"></th>
                </tr>
              </thead>
              <tbody rel="v-s:stakeholder">
                <tr>
                  <td width="1%"><a href="#/@" class="glyphicon glyphicon-search"></a></td>
                  <td property="rdfs:label"></td>
                  <td property="v-s:taxId"></td>
                  <td property="v-s:legalAddress"></td>
                </tr>
              </tbody>
              <tfoot class="-view edit search">
                <tr>
                  <td colspan="6">
                    <veda-control data-type="link" rel="v-s:stakeholder" class="-view edit search fulltext"></veda-control>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:attachment" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-7">
            <div rel="v-s:attachment" data-template="v-ui:FileTemplateWithComment" data-embedded="true"></div>
            <veda-control data-type="file" rel="v-s:attachment" class="-view edit search"></veda-control>
          </div>
        </div>

        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="gen:ClaimEvent_hasContract_Bundle" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <table class="table table-bordered">
              <thead class="result-header">
                <tr class="active">
                  <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
                  <th about="v-s:registrationNumber" property="rdfs:label"></th>
                  <th about="gen:RegistrationNumberInBundle" property="rdfs:label"></th>
                  <th about="v-s:registrationDate" property="rdfs:label"></th>
                  <th about="gen:ContractSubjectBundle" property="rdfs:label"></th>
                </tr>
              </thead>
              <tbody rel="v-s:hasContract">
                <tr>
                  <td width="1%"><a href="#/@" class="glyphicon glyphicon-search"></a></td>
                  <td property="v-s:registrationNumber"></td>
                  <td property="v-s:registrationNumberIn"></td>
                  <td property="v-s:registrationDate"></td>
                  <td property="v-s:theme"></td>
                </tr>
              </tbody>
              <tfoot class="-view edit search">
                <tr>
                  <td colspan="6">
                    <veda-control data-type="link" rel="v-s:hasContract" class="-view edit search fulltext"></veda-control>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>
      <hr />
      <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
      <br />
      <!-- BUTTONS -->
      <div class="actions view edit -search">
        <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send save edit cancel delete journal task"></span>
        <button
          type="button"
          class="action btn btn-success view -edit -search"
          id="add-OutgoingLetter"
          about="v-s:OutgoingLetter"
          property="rdfs:label"></button>
        <button
          type="button"
          class="action btn btn-success view -edit -search"
          id="add-OutgoingClaim"
          about="gen:OutgoingClaimCreate"
          property="rdfs:label"></button>
        <button
          type="button"
          class="action btn btn-success view -edit -search"
          id="add-IncomingClaim"
          about="gen:IncomingClaimCreate"
          property="rdfs:label"></button>
      </div>
    </div>
    <div about="@" class="container sheet view edit -search" data-template="v-s:LinksTemplate" data-embedded="true"></div>
    <div about="@" class="container sheet view -edit -search" data-template="v-s:CommentsTemplate"></div>
  </div>
`;
