import BrowserUtil from '/js/browser/util.js';
import $ from 'jquery';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  individual.canUpdate().then(function(canUpdate){
    if (individual.hasValue("v-wf:isProcess")) {
      $('#send.action', template).remove();
      //$('#save.action', template).remove();
    } else if (individual.isNew() || canUpdate) {
      $('#send.action', template).off("click");
      $('#send.action', template).on('click', function () {
        BrowserUtil.send(individual, template, 's-wf:complexRouteTransform', undefined, 'gen:Innovation_ComplexRouteStartForm_Template');

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
    <h2>
     <span about="gen:Innovation_Bundle" property="rdfs:label"></span>
     <small about="@" property="rdfs:label"></small>
    </h2>
    <hr>
    <section id="MainProperties">
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
          <label about="v-s:hasStatus" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:hasStatus" class="view edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:hasStatus" class="-view edit search fulltext dropdown"></veda-control>
        </div>
      </div>
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
          <label about="v-s:actualState" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div property="v-s:actualState" class="view -edit search"></div>
          <veda-control data-type="string" property="v-s:actualState" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:description" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div property="v-s:description" class="view -edit search"></div>
          <veda-control data-type="string" property="v-s:description" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:hasSector" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:hasSector" class="view edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:hasSector" class="-view edit search fulltext dropdown"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <span about="v-s:attachment" property="rdfs:label"></span>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:attachment" data-template="v-ui:FileTemplateWithComment" data-embedded="true"></div>
          <veda-control data-type="file"  rel="v-s:attachment" class="-view edit -search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:author" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:author" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:author" class="-view edit search fulltext"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:coauthor" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:coauthor" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:coauthor" class="-view edit search fulltext"></veda-control>
        </div>
      </div>
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
          <label about="v-s:financialEffectAvailability" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div class="checkbox">
            <label>
              <veda-control property="v-s:financialEffectAvailability" data-type="boolean"></veda-control>
            </label>
          </div>
          <!--<div property="v-s:financialEffectAvailability" class="view -edit -search"></div>-->
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:planYearEffect" property="rdfs:label"></label>
        </div>
        <div class="col-sm-4 col-xs-4">
          <div property="v-s:planYearEffect" class="view -edit search"></div>
          <veda-control data-type="decimal" property="v-s:planYearEffect" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:planOnceEffect" property="rdfs:label"></label>
        </div>
        <div class="col-sm-4 col-xs-4">
          <div property="v-s:planOnceEffect" class="view -edit search"></div>
          <veda-control data-type="decimal" property="v-s:planOnceEffect" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:factYearEffect" property="rdfs:label"></label>
        </div>
        <div class="col-sm-4 col-xs-4">
          <div property="v-s:factYearEffect" class="view -edit search"></div>
          <veda-control data-type="decimal" property="v-s:factYearEffect" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:factOnceEffect" property="rdfs:label"></label>
        </div>
        <div class="col-sm-4 col-xs-4">
          <div property="v-s:factOnceEffect" class="view -edit search"></div>
          <veda-control data-type="decimal" property="v-s:factOnceEffect" class="-view edit search"></veda-control>
        </div>
      </div>
    </section>

    <hr>
    <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
    <br>
    <!-- BUTTONS -->
    <div class="actions view edit -search">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send edit save cancel delete journal task"></span>
   </div>
  </div>
  <div about="@" class="container sheet view edit -search" data-template="v-s:LinksTemplate" data-embedded="true"></div>
  <div about="@" class="container sheet view -edit -search" data-template="v-s:CommentsTemplate"></div>
</div>
`;