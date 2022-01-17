import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';
import riot from 'riot';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $('#add-copy', template).click(function () {
    const _class = new IndividualModel(individual['rdf:type'][0].id);
    const Installation = new IndividualModel();
    const tmpl = 'gen:LinkObjectTemplate';
    Installation['rdf:type'] = [_class];
    Installation['v-s:title'] = individual['v-s:title'];
    Installation['v-s:to'] = individual['v-s:to'];
    Installation['v-s:from'] = individual['v-s:from'];
    Installation['rdfs:comment'] = individual['rdfs:comment'];

    riot.route(['#', Installation.id, '#main', tmpl, 'edit'].join('/'));
    Installation.one('afterSave', function () {
      setTimeout(() => {
        riot.route('#/' + Installation.id, false);
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
            <label about="v-s:title" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:title" class="view -edit search" data-template="v-ui:LabelLinkTemplate"></div>
            <veda-control property="v-s:title" data-type="text" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:from" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:from" class="view -edit search" data-template="v-ui:LabelLinkTemplate"></div>
            <veda-control data-type="link" rel="v-s:from" class="-view edit search fulltext"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:to" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:to" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:to" class="-view edit search fulltext"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:purposeITILBundle" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:from" about="@" class="view edit -search"><span property="v-s:description"></span></div>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="rdfs:comment" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="rdfs:comment" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="text" property="rdfs:comment" rows="3" class="-view edit search fulltext dropdown"></veda-control>
          </div>
        </div>
      </section>
      <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
      <hr />
      <!-- BUTTONS -->
      <div class="actions view edit -search">
        <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="edit save cancel delete"></span>
        <button type="button" class="action btn btn-default view -edit -search" id="add-copy" about="v-s:Clone" property="rdfs:label" />
      </div>
    </div>
  </div>
`;
