import BrowserUtil from '/js/browser/util.js';
import $ from 'jquery';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  template.on("validate", function () {
    var result = {};
    var numberArr = [];
    individual["v-s:backwardTarget"][0]["v-s:hasVersionOfLocalRegulatoryDocument"].forEach(function(doc){
      if (doc.id !== individual.id) {
        numberArr.push(String(doc["v-s:registrationNumberAdd"][0]));
      };
    });
    var number = String(individual["v-s:registrationNumberAdd"][0]);
    if ( numberArr.indexOf(number) !== -1 ) {
      $("veda-control[property='v-s:registrationNumberAdd'] input", template).popover({
        placement: "top",
        trigger: "hover",
        content: "Регистрационный номер уже существует"
      });
      result["v-s:registrationNumberAdd"] = {
        state: false,
        cause: []
      };
    } else {
      $("veda-control[property='v-s:registrationNumberAdd'] input", template).popover("destroy");
    };
    template[0].dispatchEvent(new CustomEvent("validated", {detail: result}));
  });
};

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  // Печатные бланки
  $('#lnd_printBlank', template).on('click', function (e) {
    BrowserUtil.createReport('gen:LND_PrintBlank_dolgn', individual);
  });

  function regNumberAddHandler(){
    var prefix = individual["v-s:registrationNumber"][0].split(".")[0];
    var postfix = individual.hasValue("v-s:registrationNumberAdd")? individual["v-s:registrationNumberAdd"][0] : "";
    individual["v-s:registrationNumber"] = [prefix + "." + postfix];
  };
  individual.on("v-s:registrationNumberAdd", regNumberAddHandler);
  template.one("remove", function () {
    individual.off("v-s:registrationNumberAdd", regNumberAddHandler);
  });

  individual.canUpdate().then(function(canUpdate){
    if (individual.hasValue("v-wf:isProcess")) {
      $('#send.action', template).remove();
      //$('#save.action', template).remove();
    } else if (individual.isNew() || canUpdate) {
      $('#send.action', template).off("click");
      $('#send.action', template).on('click', function () {
        BrowserUtil.send(individual, template, 's-wf:complexRouteTransform', undefined, 'gen:VersionOfLocalRegulatoryDocument_ComplexRouteStartForm_Template');

      });
    } else {
      $('#send.action', template).remove();
      $('#save.action', template).remove();
    }
  })
};

export const html = `
<div>
  <div class="container sheet">
    <h3 class="margin-sm">
      <span about="@" property="rdf:type"></span>
      <small about="@" property="rdfs:label" class="view edit -search"></small>
    </h3>
    <span about="@" data-template="v-ui:RabbitHole"></span>
    <section id="MainProperties">
      <h4 class="section-header" about="v-s:MainProperties" property="rdfs:label"></h4>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:registrationNumber" property="rdfs:label"></label>
        </div>
        <div class="col-sm-3 col-xs-7">
          <div property="v-s:registrationNumber" class="view -edit -search"></div>
          <veda-control data-type="text" property="v-s:registrationNumber" class="-view -edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:registrationNumberAdd" property="rdfs:label"></label>
        </div>
        <div class="col-sm-3 col-xs-7">
          <div property="v-s:registrationNumberAdd" class="view -edit -search"></div>
          <veda-control data-type="string" property="v-s:registrationNumberAdd" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:registrationDate" property="rdfs:label"></label>
        </div>
        <div class="col-sm-3 col-xs-7">
          <div property="v-s:registrationDate" class="view -edit -search"></div>
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
      <div class="row row-attribute -view -edit search">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:LocalRegulatoryDocument_PeriodBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div class="form-inline">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <span property="v-s:dateFrom" class="view -edit search"></span>
                  <veda-control property="v-s:dateFrom" data-type="date" class="-view edit search"></veda-control>
                </div>
              </div>
              <span class="view -edit -search">&mdash;&nbsp;&nbsp;&nbsp;</span>
              <div class="col-md-4">
                <div class="form-group">
                  <span property="v-s:dateTo" class="view -edit search"></span>
                  <veda-control property="v-s:dateTo" data-type="date" class="-view edit search"></veda-control>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row row-attribute view edit -search">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:LocalRegulatoryDocument_PeriodBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div class="form-inline">
            <div class="form-group">
              <span property="v-s:dateFrom" class="view -edit search"></span>
              <veda-control property="v-s:dateFrom" data-type="date" class="-view edit search"></veda-control>
            </div>
            <div class="form-group">
              <span property="v-s:dateTo" class="view -edit search"></span>
              <veda-control property="v-s:dateTo" data-type="date" class="-view edit search"></veda-control>
            </div>
          </div>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:signedBy" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:signedBy" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:signedBy" class="-view edit search fulltext dropdown"></veda-control>
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
          <label about="v-s:attachment" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:attachment" data-template="v-ui:FileTemplateWithComment" data-embedded="true" class="view edit -search"></div>
          <veda-control data-type="file"  rel="v-s:attachment" class="-view edit -search"></veda-control>
        </div>
      </div>
    </section>
    <section id="DescriptionOfChange" class="view edit -search">
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:hasDescriptionOfChange" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div class="table-responsive">
            <table class="table no-margin">
              <thead>
                <tr>
                  <th about="v-s:asis" property="rdfs:label"></th>
                  <th about="v-s:tobe" property="rdfs:label"></th>
                </tr>
              </thead>
              <tbody rel="v-s:hasDescriptionOfChange" data-embedded="true">
                <tr>
                  <td>
                    <div property="v-s:asis" class="view -edit -search"></div>
                    <veda-control data-type="text" property="v-s:asis" class="-view edit search"></veda-control>
                  </td>
                  <td>
                    <div property="v-s:tobe" class="view -edit -search"></div>
                    <veda-control data-type="text" property="v-s:tobe" class="-view edit search"></veda-control>
                  </td>
                </tr>
              </tbody>
            </table>
          </div><br>
          <veda-control rel="v-s:hasDescriptionOfChange" data-type="link" class="-view edit -search create"></veda-control>
        </div>
      </div>
    </section>
    <hr>
    <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
    <br>
    <br>
    <div class="actions view edit -search">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send edit save cancel delete journal task"></span>
      <button type="button" class="action btn btn-info view -edit -search" id="lnd_printBlank" about="v-s:PrintBlank" property="rdfs:label"/>
    </div>
  </div>
  <div about="@" class="container sheet view edit -search" data-template="v-s:LinksTemplate" data-embedded="true"></div>
  <div about="@" class="container sheet view -edit -search" data-template="v-s:CommentsTemplate"></div>
</div>
`;
