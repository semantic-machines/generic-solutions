import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';
import riot from 'riot';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $("#add-RegulatoryDocument", template).click(function () {
    var _class = new IndividualModel("v-s:VersionOfLocalRegulatoryDocument"),
        RegulatoryDocument = new IndividualModel(),
        tmpl = "gen:VersionOfLocalRegulatoryDocumentTemplate";
    RegulatoryDocument["rdf:type"] = [_class];
    RegulatoryDocument["v-s:backwardTarget"] = [individual];
    RegulatoryDocument["v-s:backwardProperty"] = [new IndividualModel("v-s:hasVersionOfLocalRegulatoryDocument")];
    RegulatoryDocument["v-s:canRead"] = [ true ];
    RegulatoryDocument["v-s:hasDocumentKind"] = individual["v-s:hasDocumentKind"] ;
    RegulatoryDocument["v-s:title"] = individual["v-s:title"] ;
    var newRegNumber = individual["v-s:hasVersionOfLocalRegulatoryDocument"].reduce(function(max, current) {
      if (current.hasValue("v-s:registrationNumberAdd")) {
        var numberAdd = +current["v-s:registrationNumberAdd"][0];
        if ( !isNaN(numberAdd) ) {
          if (numberAdd > max) max = numberAdd;
        }
      }
      return max;
    }, 0) + 1;
    RegulatoryDocument["v-s:registrationNumberAdd"] = [newRegNumber];
    RegulatoryDocument["v-s:registrationNumber"] = [ individual["v-s:registrationNumber"][0] + "." + newRegNumber ];
    riot.route( ["#", RegulatoryDocument.id, "#main", tmpl, "edit"].join("/") );
  });
  if (template.data("mode") == "view" && new Date (2018,10,27) > individual["v-s:created"][0]){
    $('button#send').hide();
    $('button#edit').hide();
  }
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
        <div class="col-sm-9 col-xs-7">
          <div property="v-s:registrationNumber" class="view -edit -search"></div>
          <veda-control data-type="text" property="v-s:registrationNumber" class="-view -edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:registrationDate" property="rdfs:label"></label>
        </div>
        <div class="col-sm-3 col-xs-7">
          <div property="v-s:registrationDate" class="view -edit search"></div>
          <veda-control property="v-s:registrationDate" data-type="date" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:valid" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <veda-control property="v-s:valid" data-type="booleanRadio"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:title" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div class="view -edit -search bg-warning padding-md"><strong property="v-s:title"></strong></div>
          <veda-control data-type="text" property="v-s:title" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="rdfs:comment" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div property="rdfs:comment" class="view -edit -search"></div>
          <veda-control data-type="text" property="rdfs:comment" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:LocalRegulatoryDocument_StakeholderBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:stakeholder" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:stakeholder" class="-view edit search fulltext dropdown"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:hasDocumentKind" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:hasDocumentKind" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:hasDocumentKind" class="-view edit search fulltext dropdown"></veda-control>
        </div>
      </div>
    </section>
    <section id="VersionsDocuments" class="view -edit -search">
      <h4 class="section-header clearfix">
        <span about="v-s:hasVersionOfLocalRegulatoryDocument" property="rdfs:label"></span>
        <veda-control data-type="link" rel="v-s:hasVersionOfLocalRegulatoryDocument" class="-view -edit search create pull-right"></veda-control>
        <div class="view -edit -search pull-right">
          <button class="btn btn-xs btn-success" id="add-RegulatoryDocument">
            <span class="glyphicon glyphicon-zoom-in"></span>
            <span about="v-s:hasVersionOfLocalRegulatoryDocument" property="rdfs:label"></span>
          </button>
        </div>
      </h4>
      <div class="table-responsive view edit -search">
        <table class="table no-margin">
          <thead>
            <tr>
              <th width="1%"><span class="glyphicon glyphicon-search"></th>
              <th about="rdfs:label" property="rdfs:label"></th>
              <th about="v-s:dateFrom" property="rdfs:label"></th>
              <th about="v-s:dateTo" property="rdfs:label"></th>
            </tr>
          </thead>
          <tbody rel="v-s:hasVersionOfLocalRegulatoryDocument">
            <tr>
              <td about="@" data-template="v-ui:IconModalTemplate"></td>
              <td>
                <div property="rdfs:label" class="view -edit -search"></div>
              </td>
              <td>
                <div property="v-s:dateFrom" class="view -edit -search"></div>
              </td>
              <td>
                <div property="v-s:dateTo" class="view -edit -search"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <hr>
    <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
    <br>
    <!-- BUTTONS -->
    <div class="actions view edit -search">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="edit save cancel delete journal task"></span>
    </div>
  </div>
  <div about="@" class="container sheet view edit -search" data-template="v-s:LinksTemplate" data-embedded="true"></div>
  <div about="@" class="container sheet view -edit -search" data-template="v-s:CommentsTemplate"></div>
</div>
`;