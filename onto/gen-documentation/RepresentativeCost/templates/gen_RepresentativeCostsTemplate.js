import BrowserUtil from '/js/browser/util.js';
import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';
import riot from 'riot';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  function prepayment () {
    if (individual.hasValue('gen:toWhomToGiveAnPrepayment')) {
      const prepaymentPrice = new IndividualModel();
      prepaymentPrice['rdf:type'] = [new IndividualModel('v-s:Price')];
      prepaymentPrice['v-s:parent'] = [individual];
      individual['gen:hasPricePrepayment'] = [prepaymentPrice];
    } else individual['gen:hasPricePrepayment'] = [];
  }
  function compensate () {
    if (individual.hasValue('gen:toWhomToCompensateRepresentativeCosts')) {
      const compensatePrice = new IndividualModel();
      compensatePrice['rdf:type'] = [new IndividualModel('v-s:Price')];
      compensatePrice['v-s:parent'] = [individual];
      individual['gen:hasPriceCompensate'] = [compensatePrice];
    } else individual['gen:hasPriceCompensate'] = [];
  }
  individual.on('gen:toWhomToGiveAnPrepayment', prepayment);
  individual.on('gen:toWhomToCompensateRepresentativeCosts', compensate);
  template.one('remove', function () {
    individual.off('gen:toWhomToGiveAnPrepayment', prepayment);
    individual.off('gen:toWhomToCompensateRepresentativeCosts', compensate);
  });

  individual.canUpdate().then(function (canUpdate) {
    if (individual.hasValue('v-wf:isProcess')) {
      $('#send.action', template).remove();
      // $('#save.action', template).remove();
    } else if (individual.isNew() || canUpdate) {
      $('#send.action', template).off('click');
      $('#send.action', template).on('click', function () {
        BrowserUtil.send(individual, template, 's-wf:complexRouteTransform', undefined, 'gen:RepresentativeCost_ComplexRouteStartForm_Template');
      });
    } else {
      $('#send.action', template).remove();
      $('#save.action', template).remove();
    }
  });

  // Проверка разрешения на создание копии
  const This_class = individual['rdf:type'][0];
  This_class.canCreate().then(function (canCreate) {
    if (!canCreate) $('#add-RepresentativeCost', template).remove();
  });

  $('#add-RepresentativeCost', template).click(function () {
    const _class = new IndividualModel('gen:RepresentativeCosts');
    const RepresentativeCost = new IndividualModel();
    const tmpl = 'gen:RepresentativeCostsTemplate';
    RepresentativeCost['rdf:type'] = [_class];
    RepresentativeCost['v-s:stakeholder'] = individual['v-s:stakeholder'];
    RepresentativeCost['v-s:goal'] = individual['v-s:goal'];
    RepresentativeCost['v-s:dateFrom'] = individual['v-s:dateFrom'];
    RepresentativeCost['v-s:dateTo'] = individual['v-s:dateTo'];
    RepresentativeCost['v-s:placeDescription'] = individual['v-s:placeDescription'];
    RepresentativeCost['v-s:count'] = individual['v-s:count'];
    RepresentativeCost['v-s:participant'] = individual['v-s:participant'];
    RepresentativeCost['v-s:hasPaymentForm'] = individual['v-s:hasPaymentForm'];
    RepresentativeCost['rdfs:comment'] = individual['rdfs:comment'];
    RepresentativeCost['gen:isPrepaymentRequired'] = individual['gen:isPrepaymentRequired'];
    RepresentativeCost['gen:toWhomToGiveAnPrepayment'] = individual['gen:toWhomToGiveAnPrepayment'];
    RepresentativeCost['v-s:hasThirdPartyParticipant'] = individual['v-s:hasThirdPartyParticipant'];
    RepresentativeCost['gen:toWhomToCompensateRepresentativeCosts'] = individual['gen:toWhomToCompensateRepresentativeCosts'];

    // Мероприятия
    const newRepresentativeCostsEvent = new IndividualModel();
    newRepresentativeCostsEvent['rdf:type'] = [new IndividualModel('gen:RepresentativeCostsEvent')];
    const RepresentativeCostsEventPromise = individual
      .getPropertyChain('gen:hasRepresentativeCostsEvent')
      .then(function (RepresentativeCostsEventArr) {
        return RepresentativeCostsEventArr.length > 0 ? RepresentativeCostsEventArr[0].load() : null;
      })
      .then(function (costsEvent) {
        if (costsEvent != null) {
          newRepresentativeCostsEvent['v-s:description'] = costsEvent['v-s:description'];
          newRepresentativeCostsEvent['v-s:responsible'] = costsEvent['v-s:responsible'];
          newRepresentativeCostsEvent['v-s:dateTo'] = costsEvent['v-s:dateTo'];
        }
        return newRepresentativeCostsEvent;
      });

    // Расходы для Мероприятия
    const newRepresentativeCostsForEvent = new IndividualModel();
    newRepresentativeCostsForEvent['rdf:type'] = [new IndividualModel('gen:RepresentativeCostsForEvent')];
    const RepresentativeCostsForEventPromise = individual
      .getPropertyChain('gen:hasRepresentativeCostsForEvent')
      .then(function (RepresentativeCostsForEventArr) {
        return RepresentativeCostsForEventArr.length > 0 ? RepresentativeCostsForEventArr[0].load() : null;
      })
      .then(function (costsForEvent) {
        if (costsForEvent != null) {
          newRepresentativeCostsForEvent['gen:hasRepresentativeCostsKind'] = costsForEvent['gen:hasRepresentativeCostsKind'];
        }
        return newRepresentativeCostsForEvent;
      });

    Promise.all([RepresentativeCostsEventPromise, RepresentativeCostsForEventPromise]).then(function (result) {
      RepresentativeCost['gen:hasRepresentativeCostsEvent'] = [result[0]];
      RepresentativeCost['gen:hasRepresentativeCostsForEvent'] = [result[1]];
    });

    riot.route(['#', RepresentativeCost.id, '#main', tmpl, 'edit'].join('/'));
    RepresentativeCost.one('afterSave', function () {
      setTimeout(() => {
        riot.route('#/' + RepresentativeCost.id, false);
      }, 250);
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
            <label about="v-s:stakeholder" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:stakeholder" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:stakeholder" class="-view edit search fulltext"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:goal" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:goal" class="view -edit search"></div>
            <veda-control data-type="string" property="v-s:goal" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:date" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-7">
            <div property="v-s:dateFrom" class="view -edit search"></div>
            <veda-control data-type="date" property="v-s:dateFrom" class="-view edit search"></veda-control>
          </div>
          <div class="col-sm-3 col-xs-7">
            <div property="v-s:dateTo" class="view -edit search"></div>
            <veda-control data-type="date" property="v-s:dateTo" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:placeDescription" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:placeDescription" class="view -edit search"></div>
            <veda-control data-type="string" property="v-s:placeDescription" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:count" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:count" class="view -edit search"></div>
            <veda-control data-type="integer" property="v-s:count" class="-view edit search fulltext"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:participant" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:participant" class="view edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:participant" class="-view edit search fulltext"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:hasThirdPartyParticipant" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div
              rel="v-s:hasThirdPartyParticipant"
              class="view  edit search"
              data-template="gen:ThirdPartyParticipantEmbededTemplate"
              data-embedded="true"></div>
            <veda-control data-type="link" rel="v-s:hasThirdPartyParticipant" class="-view edit -search create"></veda-control>
            <veda-control data-type="link" rel="v-s:hasThirdPartyParticipant" class="-view -edit search create"></veda-control>
          </div>
        </div>
      </section>

      <section id="Plan">
        <h4 class="section-header clearfix">
          <span about="gen:hasRepresentativeCostsEvent" property="rdfs:label"></span>
          <veda-control
            data-type="link"
            rel="gen:hasRepresentativeCostsEvent"
            data-template="gen:RepresentativeCostsEventTemplate"
            class="-view edit -search create create-modal pull-right"></veda-control>
          <veda-control data-type="link" rel="gen:hasRepresentativeCostsEvent" class="-view -edit search create pull-right"></veda-control>
        </h4>
        <div class="table-responsive view edit -search">
          <table class="table no-margin">
            <thead class="result-header">
              <tr>
                <th width="1"><span class="glyphicon glyphicon-search"></span></th>
                <th about="v-s:responsible" property="rdfs:label"></th>
                <th about="v-s:dateTo" property="rdfs:label"></th>
                <th about="v-s:description" property="rdfs:label"></th>
              </tr>
            </thead>
            <tbody rel="gen:hasRepresentativeCostsEvent" data-embedded="true">
              <tr>
                <td>
                  <a href="#/@" class="glyphicon glyphicon-search"></a>
                </td>
                <td>
                  <div about="@" rel="v-s:responsible" data-template="v-ui:LabelTemplate"></div>
                </td>
                <td>
                  <div about="@" property="v-s:dateTo"></div>
                </td>
                <td>
                  <div about="@" property="v-s:description"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div rel="gen:hasRepresentativeCostsEvent" data-template="gen:RepresentativeCostsEventEmbeddedTemplate" class="-view -edit search create"></div>
      </section>
      <section id="Consumption">
        <h4 class="section-header clearfix">
          <span about="gen:hasRepresentativeCostsForEvent" property="rdfs:label"></span>
          <veda-control
            data-type="link"
            rel="gen:hasRepresentativeCostsForEvent"
            data-template="gen:RepresentativeCostsForEventTemplate"
            class="-view edit -search create create-modal pull-right"></veda-control>
        </h4>
        <div class="table-responsive view edit -search">
          <table class="table no-margin">
            <thead class="result-header">
              <tr>
                <th width="1"><span class="glyphicon glyphicon-search"></span></th>
                <th about="gen:hasRepresentativeCostsKind" property="rdfs:label"></th>
                <th about="v-s:hasCurrency" property="rdfs:label"></th>
                <th about="v-s:sum" property="rdfs:label"></th>
              </tr>
            </thead>
            <tbody rel="gen:hasRepresentativeCostsForEvent" data-embedded="true">
              <tr>
                <td>
                  <a href="#/@" class="glyphicon glyphicon-search"></a>
                </td>
                <td>
                  <div about="@" rel="gen:hasRepresentativeCostsKind" data-template="v-ui:LabelTemplate"></div>
                </td>
                <td>
                  <div about="@" rel="v-s:hasCurrency" data-template="v-ui:LabelTemplate"></div>
                </td>
                <td>
                  <div about="@" property="v-s:sum"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section id="Report">
        <h4 class="section-header" about="v-s:hasSourceOfFinancing" property="rdfs:label"></h4>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:hasSourceOfFinancing" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:hasSourceOfFinancing" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:hasSourceOfFinancing" class="-view edit search fulltext dropdown"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="gen:isPrepaymentRequired" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <veda-control data-type="boolean" property="gen:isPrepaymentRequired" class="view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="rdfs:comment" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="rdfs:comment" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="text" property="rdfs:comment" class="-view edit search fulltext"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="gen:toWhomToGiveAnPrepayment" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="gen:toWhomToGiveAnPrepayment" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="gen:toWhomToGiveAnPrepayment" class="-view edit search fulltext"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div about="@" rel="gen:hasPricePrepayment" data-template="gen:PriceMicroTemplate" data-embedded="true"></div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="gen:toWhomToCompensateRepresentativeCosts" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="gen:toWhomToCompensateRepresentativeCosts" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="gen:toWhomToCompensateRepresentativeCosts" class="-view edit search fulltext"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div about="@" rel="gen:hasPriceCompensate" data-template="gen:PriceMicroTemplate" data-embedded="true"></div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="gen:representativeCostsReport" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="gen:representativeCostsReport" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="text" property="gen:representativeCostsReport" class="-view edit search fulltext"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:attachment" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:attachment" data-template="v-ui:FileTemplateWithComment" data-embedded="true" class="view edit -search"></div>
            <veda-control data-type="file" rel="v-s:attachment" class="-view edit -search"></veda-control>
          </div>
        </div>
      </section>
      <hr />
      <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
      <br />
      <div class="actions view edit -search">
        <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send edit save cancel delete journal task"></span>
        <button type="button" class="action btn btn-default view -edit -search" id="add-RepresentativeCost" about="v-s:Clone" property="rdfs:label"></button>
      </div>
    </div>
    <div about="@" class="container sheet view edit -search" data-template="v-s:LinksTemplate" data-embedded="true"></div>
    <div about="@" class="container sheet view -edit -search" data-template="v-s:CommentsTemplate"></div>
  </div>
`;
