import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $('#add-ActionIT', template).click(function () {
    let modal = $('#notification-modal-template').html();
    modal = $(modal);
    modal.modal({show: false});
    $('body').append(modal);
    modal.modal('show');
    template.one('remove', function () {
      modal.modal('hide').remove();
    });
    const cntr = $('.modal-body', modal);
    const _class = new IndividualModel('gen:ActionIT');
    const ActionIT = new IndividualModel();
    const tmpl = new IndividualModel('gen:ActionITTemplate');
    ActionIT['rdf:type'] = [_class];
    ActionIT.present(cntr, tmpl, 'edit');
    ActionIT['v-s:backwardTarget'] = [individual];
    ActionIT['v-s:backwardProperty'] = [new IndividualModel('gen:hasActionIT')];
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
      <section id="MainProperties">
        <h4 class="section-header" about="v-s:MainProperties" property="rdfs:label"></h4>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:registrationNumber" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-3">
            <div property="v-s:registrationNumber" class="view -edit -search" data-template="v-ui:LabelTemplate"></div>
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
            <label about="v-s:date" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-3">
            <div property="v-s:date" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="date" property="v-s:date" class="-view edit search"></veda-control>
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
            <label about="v-s:theme" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:theme" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="string" property="v-s:theme" class="-view edit search"></veda-control>
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
      <!-- BUTTONS -->
      <div class="actions view edit -search">
        <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send edit save cancel delete journal  task"></span>
      </div>
    </div>
  </div>
`;
