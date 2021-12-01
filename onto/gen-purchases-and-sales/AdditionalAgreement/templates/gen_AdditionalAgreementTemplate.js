import BrowserUtil from '/js/browser/util.js';
import $ from 'jquery';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  function processHandler() {
    individual.canUpdate().then(function (canUpdate) {
      if ( individual.hasValue("v-wf:isProcess") ) {
        $('#send.action', template).remove();
        $('#delete.action', template).remove();
      } else if ( individual.isNew() || canUpdate ) {
        $('#send.action', template).off("click");
        $('#send.action', template).on('click', function () {
          BrowserUtil.send(individual, template, 's-wf:complexRouteTransform', undefined, 'gen:AdditionalAgreement_ComplexRouteStartForm_Template');
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
  <style>
    .section-header {
      background-color: #f5f5f5;
      padding: 10px;
      border-top: 1px solid #ccc;
      margin-top: 1.5em;
      margin-bottom: 1em;
    }
    veda-control .radio:first-child, veda-control .checkbox:first-child {
      margin-top: 0;
    }
    veda-control .radio:last-child, veda-control .checkbox:last-child {
      margin-bottom: 0;
    }
    .row-attribute {
      margin-top: 1em;
    }
    .row-attribute > div:first-child {
      text-align: right;
      font-weigth: bold;
    }
  </style>
  <div class="container sheet">
    <h3 class="margin-sm">
      <span about="gen:AdditionalAgreement" property="rdfs:label"></span>
      <small about="@" property="rdfs:label"></small>
    </h3>
    <span about="@" data-template="v-ui:RabbitHole" class="view -edit -search"></span>
    <hr>
    <section id="MainProperties">
      <h4 class="section-header" about="v-s:MainProperties" property="rdfs:label"></h4>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:hasDocumentKind" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <veda-control rel="v-s:hasDocumentKind" data-type="radio"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:hasContractScope" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <veda-control rel="v-s:hasContractScope" data-type="checkbox"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:ContractSubjectBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div class="view -edit -search bg-warning padding-md"><strong property="v-s:theme"></strong></div>
          <veda-control data-type="multilingualText" property="v-s:theme" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:DescriptionAddAgreementBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div class="view -edit -search" property="v-s:description"></div>
          <veda-control data-type="multilingualText" property="v-s:description" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:RegistrationNumberAddBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div class="view -edit -search" property="v-s:registrationNumber"></div>
          <veda-control data-type="text" property="v-s:registrationNumber" class="-view edit search"></veda-control>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div class="view -edit -search" property="v-s:registrationNumberAdd"></div>
          <veda-control data-type="string" property="v-s:registrationNumberAdd" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:RegistrationDateBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div class="view -edit -search" property="v-s:registrationDate"></div>
          <veda-control data-type="date" property="v-s:registrationDate" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:RegistrationNumberInBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div class="view -edit -search" property="v-s:registrationNumberIn"></div>
          <veda-control data-type="string" property="v-s:registrationNumberIn" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:initiatorForContractBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:initiator" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:initiator" class="-view edit search fulltext dropdown"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:DurationOfTheContractBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div class="view -edit -search" property="v-s:dateFrom"></div>
          <veda-control data-type="date" property="v-s:dateFrom" class="-view edit search"></veda-control>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div class="view -edit -search" property="v-s:dateTo"></div>
          <veda-control data-type="date" property="v-s:dateTo" class="-view edit search"></veda-control>
        </div>
      </div>

      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:isContractClosed" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <veda-control property="gen:isContractClosed" data-type="boolean"></veda-control>
        </div>
      </div>

      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:hasObligationKind" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:hasObligationKind" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:hasObligationKind" class="-view edit search fulltext dropdown"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:hasBudgetCategory" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:hasBudgetCategory" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:hasBudgetCategory" class="-view edit search fulltext dropdown"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:supportSpecialistOfContract" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:supportSpecialistOfContract" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:supportSpecialistOfContract" class="-view edit search fulltext"></veda-control>
        </div>
      </div>
    </section>

    <section id="Participants">
      <h4 class="section-header" about="gen:ContractParticipantsBundle" property="rdfs:label"></h4>
      <div about="@" rel="v-s:backwardTarget" class="view edit search" data-template="gen:ParticipantsInAddgreementTemplate"></div>
    </section>

    <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
    <br>
    <!-- BUTTONS -->
    <div class="actions view edit -search">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send edit save cancel delete journal task"></span>
    </div>
  </div>

  <div about="@" class="container sheet view edit -search margin-lg" data-template="v-s:LinksTemplate" data-embedded="true"></div>
  <div about="@" class="container sheet view -edit -search margin-lg" data-template="v-s:CommentsTemplate"></div>
</div>
`;