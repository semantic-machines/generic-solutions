import BrowserUtil from '/js/browser/util.js';
import $ from 'jquery';
import veda from '/js/common/veda.js';
import IndividualModel from '/js/common/individual_model.js';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if (mode === 'edit' || template.data('mode') === 'edit') {
    const enumerated = new IndividualModel('v-s:LetterRegistrationRecordEnumerated');

    // These events are triggered in v-s:CorrespondentTemplate
    template.on('v-s:sender:own v-s:sender:foreign v-s:recipient:own v-s:recipient:foreign', function (e) {
      e.stopPropagation();
      let keyWord = e.type.split(':')[1];
      keyWord = keyWord.charAt(0).toUpperCase() + keyWord.slice(1);
      const isOwn = 'own' === e.type.split(':')[2];
      let regRecord;
      if (individual.hasValue('v-s:hasLetterRegistrationRecord' + keyWord)) {
        regRecord = individual['v-s:hasLetterRegistrationRecord' + keyWord][0];
      } else {
        regRecord = new IndividualModel();
        individual['v-s:hasLetterRegistrationRecord' + keyWord] = [regRecord];
      }
      regRecord['rdf:type'] = [new IndividualModel('v-s:LetterRegistrationRecord' + keyWord), isOwn ? enumerated : null];
    });
  }
};

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if (individual.hasValue('rdf:type', 'gen:IncomingLetter')) {
    individual['v-s:recipient'][0]['v-s:correspondentOrganization'] = veda.appointment['v-s:parentOrganization'];
  } else if (individual.hasValue('rdf:type', 'gen:OutgoingLetter')) {
    individual['v-s:sender'][0]['v-s:correspondentOrganization'] = veda.appointment['v-s:parentOrganization'];
  }

  // Частная валидация для кнопки сохранить
  template.on('internal-validated', function (e, validation) {
    validation = validation || e.detail;
    if (validation.state) {
      $('.action#save2', template).removeAttr('disabled');
    } else {
      $('.action#save2', template).attr('disabled', 'disabled');
    }
  });

  function processHandler () {
    individual.canUpdate().then(function (canUpdate) {
      if (individual.hasValue('v-wf:isProcess')) {
        $('#send.action', template).remove();
        $('#delete.action', template).remove();
      } else if (individual.isNew() || canUpdate) {
        $('#send.action', template).off('click');
        $('#send.action', template).on('click', function () {
          BrowserUtil.send(individual, template, 's-wf:complexRouteTransform', undefined, 'gen:Claim_ComplexRouteStartForm_Template');
        });
      } else {
        $('#send.action', template).remove();
        $('#delete.action', template).remove();
      }
    });
  }
  processHandler();
  individual.on('afterReset', processHandler);
  template.one('remove', function () {
    individual.off('afterReset', processHandler);
  });
};

export const html = `
  <div>
    <div class="container sheet">
      <h3 class="margin-sm">
        <span about="@" property="rdf:type"></span>
        <small about="@" property="rdfs:label" class="view edit -search"></small>
      </h3>

      <section id="Sender">
        <h4 class="section-header clearfix">
          <span about="v-s:sender" property="rdfs:label"></span>
          <veda-control data-type="link" rel="v-s:sender" class="-view edit search create pull-right"></veda-control>
        </h4>

        <div rel="v-s:sender" class="view edit search" data-template="gen:CorrespondentTemplateNew" data-embedded="true"></div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:hasLetterRegistrationRecordSender" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div
              rel="v-s:hasLetterRegistrationRecordSender"
              class="view edit search"
              data-template="gen:LetterRegistrationRecordTemplateNew"
              data-embedded="true"></div>
            <veda-control data-type="link" rel="v-s:hasLetterRegistrationRecordSender" class="-view edit search create"></veda-control>
          </div>
        </div>
      </section>

      <section id="Recipient">
        <h4 class="section-header clearfix">
          <span about="v-s:recipient" property="rdfs:label"></span>
          <veda-control data-type="link" rel="v-s:recipient" class="-view edit search create pull-right"></veda-control>
        </h4>

        <div rel="v-s:recipient" class="view edit search" data-template="gen:CorrespondentTemplateNew" data-embedded="true"></div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:hasLetterRegistrationRecordRecipient" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div
              rel="v-s:hasLetterRegistrationRecordRecipient"
              class="view edit search"
              data-template="gen:LetterRegistrationRecordTemplateNew"
              data-embedded="true"></div>
            <veda-control data-type="link" rel="v-s:hasLetterRegistrationRecordRecipient" class="-view edit search create"></veda-control>
          </div>
        </div>
      </section>

      <section id="Delivery">
        <h4 class="section-header clearfix">
          <span about="v-s:hasDelivery" property="rdfs:label"></span>
          <veda-control data-type="link" rel="v-s:hasDelivery" class="-view edit -search create create-modal pull-right"></veda-control>
          <veda-control data-type="link" rel="v-s:hasDelivery" class="-view -edit search create pull-right"></veda-control>
        </h4>
        <div class="table-responsive view edit -search">
          <table class="table no-margin">
            <thead class="result-header">
              <tr>
                <th width="1"><span class="glyphicon glyphicon-search"></span></th>
                <th about="v-s:date" property="rdfs:label"></th>
                <th about="v-s:deliverBy" property="rdfs:label"></th>
                <th about="rdfs:comment" property="rdfs:label"></th>
                <th about="v-s:attachment" property="rdfs:label"></th>
              </tr>
            </thead>
            <tbody rel="v-s:hasDelivery" data-embedded="true">
              <tr>
                <td>
                  <a href="#/@" class="glyphicon glyphicon-search"></a>
                </td>
                <td>
                  <div about="@" property="v-s:date"></div>
                </td>
                <td>
                  <div about="@" rel="v-s:deliverBy" data-template="v-ui:LabelTemplate"></div>
                </td>
                <td>
                  <div about="@" property="rdfs:comment"></div>
                </td>
                <td>
                  <div rel="v-s:attachment" data-template="v-ui:FileMinTemplate" data-embedded="true"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div rel="v-s:hasDelivery" data-template="gen:DeliveryEmbeddedTemplate" data-embedded="true" class="-view -edit search create"></div>
      </section>

      <section id="ClaimEvent">
        <h4 class="section-header" about="v-s:ClaimEvent" property="rdfs:label"></h4>

        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="gen:ClaimEvent_Embedded_Bundle" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:hasClaimEvent" class="view -edit search" data-template="v-ui:LabelLinkTemplate"></div>
            <veda-control data-type="link" rel="v-s:hasClaimEvent" class="-view edit search fulltext"></veda-control>
          </div>
        </div>
        <div rel="v-s:hasClaimEvent" class="view edit -search" data-template="gen:ClaimEventEmbeddedTemplate" data-embedded="true"></div>
      </section>

      <section id="MainProperties">
        <h4 class="section-header" about="v-s:MainProperties" property="rdfs:label"></h4>
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
            <label about="v-s:hasDecision" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-3">
            <div rel="v-s:hasDecision" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:hasDecision" class="-view edit search fulltext dropdown"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="gen:ClaimRequirement_Bundle" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:claimRequirement" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="text" property="v-s:claimRequirement" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="gen:ReportDescription_Bundle" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:reportDescription" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="text" property="v-s:reportDescription" class="-view edit search"></veda-control>
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
      </section>

      <br />
      <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
      <br />
      <div class="actions view edit -search">
        <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send save edit cancel delete journal task"></span>
      </div>
    </div>
    <div about="@" class="container sheet view edit -search" data-template="v-s:LinksTemplate" data-embedded="true"></div>
    <div about="@" class="container sheet view -edit -search" data-template="v-s:CommentsTemplate"></div>
  </div>
`;
