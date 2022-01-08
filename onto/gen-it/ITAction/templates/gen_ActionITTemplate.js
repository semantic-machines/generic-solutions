import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if (individual.isNew()) {
    individual['v-s:hasStatus'] = [new IndividualModel('v-s:StatusDraft')];
  }

  $('#add-ActionIT', template).click(function () {
    var modal = $('#notification-modal-template').html();
    modal = $(modal);
    modal.modal({ show: false });
    $('body').append(modal);
    modal.modal('show');
    template.one('remove', function () {
      modal.modal('hide').remove();
    });
    var cntr = $('.modal-body', modal),
      _class = new IndividualModel('gen:ActionIT'),
      ActionIT = new IndividualModel(),
      tmpl = new IndividualModel('gen:ActionITTemplate');
    ActionIT['rdf:type'] = [_class];
    ActionIT.present(cntr, tmpl, 'edit');
    ActionIT['v-s:backwardTarget'] = [individual];
    ActionIT['v-s:backwardProperty'] = [new IndividualModel('gen:hasActionIT')];
    ActionIT['gen:hasIT_InfrastructureObjects'] = individual['gen:hasIT_InfrastructureObjects'];
    ActionIT['v-s:responsibleOrganization'] = individual['v-s:responsibleOrganization'];
    ActionIT['v-s:responsibleDepartment'] = individual['v-s:responsibleDepartment'];
    ActionIT.one('afterReset', function () {
      modal.modal('hide').remove();
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
      <span about="@" data-template="v-ui:RabbitHole"></span>
      <section id="MainProperties">
        <h4 class="section-header" about="v-s:MainProperties" property="rdfs:label"></h4>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:registrationNumber" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-3">
            <div property="v-s:registrationNumber" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="string" property="v-s:registrationNumber" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:hasStatus" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-3">
            <div rel="v-s:hasStatus" class="view -edit search" data-template="v-ui:StatusTemplate"></div>
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
            <label about="gen:hasIT_InfrastructureObjects" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="gen:hasIT_InfrastructureObjects" class="view edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="gen:hasIT_InfrastructureObjects" class="-view edit search fulltext dropdown tree"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:responsible" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:responsible" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:responsible" class="-view edit search fulltext"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:responsibleDepartment" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:responsibleDepartment" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:responsibleDepartment" class="-view edit search fulltext"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:responsibleOrganization" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:responsibleOrganization" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:responsibleOrganization" class="-view edit search fulltext"></veda-control>
          </div>
        </div>
        <!--<div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:description" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div property="v-s:description" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="text" property="v-s:description" class="-view edit search"></veda-control>
        </div>
      </div>-->
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:attachment" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:attachment" class="view -edit search" data-template="v-ui:FileTemplateWithComment"></div>
            <veda-control data-type="file" rel="v-s:attachment" class="-view edit search"></veda-control>
          </div>
        </div>
      </section>
      <section id="Plan">
        <h4 class="section-header" about="v-s:Plan" property="rdfs:label"></h4>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:datePlan" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-3">
            <div property="v-s:datePlan" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="date" property="v-s:datePlan" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:timeEffort" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <veda-control data-type="worktime" property="v-s:timeEffort" class="view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:taskDescription" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:taskDescription" class="view -edit search alert alert-warning" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="text" property="v-s:taskDescription" class="-view edit search"></veda-control>
          </div>
        </div>
      </section>
      <section id="Fact">
        <h4 class="section-header" about="v-s:Fact" property="rdfs:label"></h4>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:dateFact" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-3">
            <div property="v-s:dateFact" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="date" property="v-s:dateFact" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:timeEffort" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <veda-control data-type="worktime" property="v-s:count" class="view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-4">
            <label about="v-s:reportDescription" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:reportDescription" class="view -edit search alert alert-success" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="text" property="v-s:reportDescription" class="-view edit search"></veda-control>
          </div>
        </div>
      </section>
      <section id="hasAction">
        <h4 class="section-header">
          <span about="gen:hasActionIT" property="rdfs:label"></span>
          <button class="btn btn-xs btn-success margin-lg-h view -edit -search" id="add-ActionIT">
            <span class="glyphicon glyphicon-zoom-in"></span>
            <span about="gen:hasActionIT" property="rdfs:label"></span>
          </button>
        </h4>
        <div class="row row-attribute">
          <div></div>
          <div class="col-sm-12 col-xs-12">
            <div rel="gen:hasActionIT" data-template="gen:ActionITEmbeddedTemplate" data-embedded="true"></div>
            <veda-control data-type="link" rel="gen:hasActionIT" class="-view edit -search create create-modal"></veda-control>
          </div>
        </div>
      </section>
      <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true" class="view -edit search"></div>
      <hr />
      <div class="actions">
        <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="edit save cancel delete"></span>
      </div>
    </div>
  </div>
`;
