import BrowserUtil from '/js/browser/util.js';
import $ from 'jquery';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  individual.canUpdate().then(function (canUpdate) {
    if (individual.hasValue('v-wf:isProcess')) {
      $('#send.action', template).remove();
      // $('#save.action', template).remove();
    } else if (individual.isNew() || canUpdate) {
      $('#send.action', template).off('click');
      $('#send.action', template).on('click', function () {
        BrowserUtil.send(individual, template, 's-wf:complexRouteTransform', undefined, 'gen:AccountingDoc_ComplexRouteStartForm_Template');
      });
    } else {
      $('#send.action', template).remove();
      $('#save.action', template).remove();
    }
  });

  $('#bluePlus', template).click(function () {
    individual.save();
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
            <label about="v-s:hasDocumentKind" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:hasDocumentKind" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:hasDocumentKind" class="-view edit search fulltext dropdown"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:registrationNumber" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-3">
            <div property="v-s:registrationNumber" class="view -edit -search"></div>
            <veda-control data-type="text" property="v-s:registrationNumber" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:registrationDate" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-3">
            <div property="v-s:registrationDate" class="view -edit search"></div>
            <veda-control data-type="date" property="v-s:registrationDate" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:transactionDate" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-3">
            <div property="v-s:transactionDate" class="view -edit search"></div>
            <veda-control data-type="date" property="v-s:transactionDate" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:hasContract" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:hasContract" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:hasContract" class="-view edit search fulltext"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="rdfs:comment" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="rdfs:comment" class="view -edit search"></div>
            <veda-control data-type="text" property="rdfs:comment" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:vatRateForAccountingDoc" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:vatRateForAccountingDoc" class="view -edit search"></div>
            <veda-control data-type="decimal" property="v-s:vatRateForAccountingDoc" class="-view edit search"></veda-control>
          </div>
        </div>

        <div class="row row-attribute view edit -search">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:hasPrice" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div about="@" rel="v-s:hasPrice" data-embedded="true">
              <div class="form-inline">
                <div class="form-group">
                  <strong about="@" property="v-s:sum" class="view -edit search"></strong>
                  <veda-control data-type="decimal" property="v-s:sum" class="-view edit search"></veda-control>
                </div>
                <div class="form-group">
                  <span about="@" rel="v-s:hasCurrency" class="view -edit search" data-template="v-ui:LabelTemplate"></span>
                  <veda-control data-type="link" rel="v-s:hasCurrency" class="-view edit search fulltext dropdown"></veda-control>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row row-attribute view edit -search">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:prepayment" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div about="@" rel="v-s:prepayment" data-embedded="true">
              <div class="form-inline">
                <div class="form-group">
                  <strong about="@" property="v-s:sum" class="view -edit search"></strong>
                  <veda-control data-type="decimal" property="v-s:sum" class="-view edit search"></veda-control>
                </div>
                <div class="form-group">
                  <span about="@" rel="v-s:hasCurrency" class="view -edit search" data-template="v-ui:LabelTemplate"></span>
                  <veda-control data-type="link" rel="v-s:hasCurrency" class="-view edit search fulltext dropdown"></veda-control>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="Participants">
        <h4 class="section-header" about="gen:ContractParticipantsBundle" property="rdfs:label"></h4>
        <table class="table no-margin">
          <thead>
            <tr>
              <th about="v-s:hasRoleInContract" data-template="v-ui:LabelTemplate"></th>
              <th about="v-s:hasContractor" property="rdfs:label"></th>
              <th about="v-s:hasOrganization" property="rdfs:label"></th>
              <th about="rdfs:comment" property="rdfs:label"></th>
            </tr>
          </thead>
          <tbody rel="v-s:hasContractParticipantSupplier" data-template="gen:ContractParticipantEmbeddedTemplate" data-embedded="true"></tbody>
        </table>
        <div class="row row-attribute">
          <div class="col-sm-1 col-xs-1">
            <veda-control rel="v-s:hasContractParticipantSupplier" data-type="link" class="-view edit search create"></veda-control>
          </div>
          <div class="col-sm-11 col-xs-9">
            <label about="gen:addContractParticipantSupplier" property="rdfs:label" class="-view edit -search"></label>
          </div>
        </div>
        <br />
        <table class="table no-margin">
          <tbody rel="v-s:hasContractParticipantCustomer" data-template="gen:ContractParticipantEmbeddedTemplate" data-embedded="true"></tbody>
        </table>
        <div class="row row-attribute">
          <div class="col-sm-1 col-xs-1">
            <veda-control rel="v-s:hasContractParticipantCustomer" data-type="link" class="-view edit search create"></veda-control>
          </div>
          <div class="col-sm-11 col-xs-9">
            <label about="gen:addContractParticipantCustomer" property="rdfs:label" class="-view edit -search"></label>
          </div>
        </div>
        <br />
      </section>

      <hr />
      <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
      <br />
      <br />
      <div class="actions view edit -search">
        <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send edit save cancel delete journal task"></span>
      </div>
    </div>
    <div about="@" class="container sheet view edit -search" data-template="v-s:LinksTemplate" data-embedded="true"></div>
    <div about="@" class="container sheet view -edit -search" data-template="v-s:CommentsTemplate"></div>
  </div>
`;
