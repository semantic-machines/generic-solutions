import BrowserUtil from '/js/browser/util.js';
import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';
import riot from 'riot';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  function prepayment(){
    if (individual.hasValue("gen:toWhomToGiveAnPrepayment"))
    {
      var prepaymentPrice;
      prepaymentPrice = new IndividualModel();
      prepaymentPrice['rdf:type'] = [new IndividualModel('v-s:Price')];
      prepaymentPrice['v-s:parent'] = [individual];
      individual['gen:hasPricePrepayment'] = [prepaymentPrice];
    }
    else  individual['gen:hasPricePrepayment'] = [];
  }
  function compensate(){
    if (individual.hasValue("gen:toWhomToCompensateRepresentativeCosts"))
    {
      var compensatePrice;
      compensatePrice = new IndividualModel();
      compensatePrice['rdf:type'] = [new IndividualModel('v-s:Price')];
      compensatePrice['v-s:parent'] = [individual];
      individual['gen:hasPriceCompensate'] = [compensatePrice];
    }
    else  individual['gen:hasPriceCompensate'] = [];
  }
  individual.on('gen:toWhomToGiveAnPrepayment', prepayment);
  individual.on('gen:toWhomToCompensateRepresentativeCosts', compensate);
  template.one("remove", function () {
    individual.off('gen:toWhomToGiveAnPrepayment', prepayment);
    individual.off('gen:toWhomToCompensateRepresentativeCosts', compensate);
  });

  individual.canUpdate().then(function(canUpdate){
    if (individual.hasValue("v-wf:isProcess")) {
      $('#send.action', template).remove();
      //$('#save.action', template).remove();
    } else if (individual.isNew() || canUpdate) {
      $('#send.action', template).off("click");
      $('#send.action', template).on('click', function () {
        BrowserUtil.send(individual, template, 's-wf:complexRouteTransform', undefined, 'gen:RepresentativeCost_ComplexRouteStartForm_Template');

      });
    } else {
      $('#send.action', template).remove();
      $('#save.action', template).remove();
    }
  })

  // Проверка разрешения на создание копии
  var This_class = individual["rdf:type"][0];
  This_class.canCreate().then(function(canCreate) {
    if (!canCreate) $("#add-RepresentativeCost", template).remove();
  });

  $("#add-RepresentativeCost", template).click(function () {
    var _class = new IndividualModel("gen:RepresentativeCosts"),
        RepresentativeCost = new IndividualModel(),
        tmpl = "gen:RepresentativeCostsTemplate" ;
    RepresentativeCost["rdf:type"] = [_class] ;
    RepresentativeCost["v-s:stakeholder"]=individual["v-s:stakeholder"] ;
    RepresentativeCost["v-s:goal"]=individual["v-s:goal"] ;
    RepresentativeCost["v-s:dateFrom"]=individual["v-s:dateFrom"] ;    
    RepresentativeCost["v-s:dateTo"]=individual["v-s:dateTo"] ;    
    RepresentativeCost["v-s:placeDescription"]=individual["v-s:placeDescription"] ;    
    RepresentativeCost["v-s:count"]=individual["v-s:count"] ;    
    RepresentativeCost["v-s:participant"]=individual["v-s:participant"] ;    
    RepresentativeCost["v-s:hasPaymentForm"]=individual["v-s:hasPaymentForm"] ;    
    RepresentativeCost["rdfs:comment"]=individual["rdfs:comment"] ;    
    RepresentativeCost["gen:isPrepaymentRequired"]=individual["gen:isPrepaymentRequired"] ;    
    RepresentativeCost["gen:toWhomToGiveAnPrepayment"]=individual["gen:toWhomToGiveAnPrepayment"] ;
    RepresentativeCost["v-s:hasThirdPartyParticipant"]=individual["v-s:hasThirdPartyParticipant"] ;    
    RepresentativeCost["gen:toWhomToCompensateRepresentativeCosts"]=individual["gen:toWhomToCompensateRepresentativeCosts"] ;       

    //Мероприятия
    var newRepresentativeCostsEvent = new IndividualModel();
    newRepresentativeCostsEvent["rdf:type"] = [ new IndividualModel("gen:RepresentativeCostsEvent") ];
    var RepresentativeCostsEventPromise = individual.getPropertyChain("gen:hasRepresentativeCostsEvent").then(function(RepresentativeCostsEventArr) {
      return RepresentativeCostsEventArr.length > 0? RepresentativeCostsEventArr[0].load() : null;
    }).then(function(costsEvent) {
      if (costsEvent != null) {
        newRepresentativeCostsEvent["v-s:description"] = costsEvent["v-s:description"];
        newRepresentativeCostsEvent["v-s:responsible"] = costsEvent["v-s:responsible"];
        newRepresentativeCostsEvent["v-s:dateTo"] = costsEvent["v-s:dateTo"];
      }
      return newRepresentativeCostsEvent;
    })

    //Расходы для Мероприятия
    var newRepresentativeCostsForEvent = new IndividualModel();
    newRepresentativeCostsForEvent["rdf:type"] = [ new IndividualModel("gen:RepresentativeCostsForEvent") ];
    var RepresentativeCostsForEventPromise = individual.getPropertyChain("gen:hasRepresentativeCostsForEvent").then(function(RepresentativeCostsForEventArr) {
      return RepresentativeCostsForEventArr.length > 0? RepresentativeCostsForEventArr[0].load() : null;
    }).then(function(costsForEvent) {
      if (costsForEvent != null) {
        newRepresentativeCostsForEvent["gen:hasRepresentativeCostsKind"] = costsForEvent["gen:hasRepresentativeCostsKind"];
      }
      return newRepresentativeCostsForEvent;
    })

    Promise.all([RepresentativeCostsEventPromise, RepresentativeCostsForEventPromise]).then(function (result){
      RepresentativeCost["gen:hasRepresentativeCostsEvent"] = [ result[0] ];
      RepresentativeCost["gen:hasRepresentativeCostsForEvent"] = [ result[1] ];
    })

    riot.route( ["#", RepresentativeCost.id, "#main", tmpl, "edit"].join("/") ) ;
    RepresentativeCost.one("afterSave", function () {
      riot.route("#/" + RepresentativeCost.id, false);
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
          <label about="v-s:title" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div property="v-s:title" class="view -edit search"></div>
          <veda-control data-type="string" property="v-s:title" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:hasAction" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:hasAction" class="view edit search" data-template="gen:ActionEmbeddedTemplate"></div>
          <veda-control data-type="link" rel="v-s:hasAction" class="-view edit search create"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:hasMeeting" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:hasMeeting" class="view edit search" data-template="gen:MeetingTemplate"></div>
          <veda-control data-type="link" rel="v-s:hasMeeting" class="-view edit search create"></veda-control>
        </div>
      </div>
    </section>
    <hr>
    <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
    <br>
    <div class="actions view edit -search">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send edit save cancel delete journal task"></span>
   </div>
  </div>
  <div about="@" class="container sheet view edit -search" data-template="v-s:LinksTemplate" data-embedded="true"></div>
  <div about="@" class="container sheet view -edit -search" data-template="v-s:CommentsTemplate"></div>
</div>
`;