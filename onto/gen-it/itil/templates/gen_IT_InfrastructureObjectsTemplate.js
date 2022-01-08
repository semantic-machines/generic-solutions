import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';
import riot from 'riot';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $('#add-copy', template).click(function () {
    var _class = new IndividualModel(individual['rdf:type'][0].id),
      IT_InfrastructureObjects = new IndividualModel(),
      tmpl = 'gen:IT_InfrastructureObjectsTemplate';
    IT_InfrastructureObjects['rdf:type'] = [_class];
    IT_InfrastructureObjects['v-s:title'] = individual['v-s:title'];
    IT_InfrastructureObjects['v-s:description'] = individual['v-s:description'];
    IT_InfrastructureObjects['v-s:hasMaintenanceObjectKind'] = individual['v-s:hasMaintenanceObjectKind'];
    IT_InfrastructureObjects['v-s:hasParentLink'] = individual['v-s:hasParentLink'];
    IT_InfrastructureObjects['v-s:proprietor'] = individual['v-s:proprietor'];
    IT_InfrastructureObjects['v-s:customer'] = individual['v-s:customer'];
    IT_InfrastructureObjects['v-s:operator'] = individual['v-s:operator'];
    IT_InfrastructureObjects['rdfs:comment'] = individual['rdfs:comment'];

    riot.route(['#', IT_InfrastructureObjects.id, '#main', tmpl, 'edit'].join('/'));
    IT_InfrastructureObjects.one('afterSave', function () {
      setTimeout(() => {
        riot.route('#/' + IT_InfrastructureObjects.id, false);
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
            <div property="v-s:title" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control property="v-s:title" data-type="text" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:purposeITILBundle" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:description" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="text" property="v-s:description" class="-view edit search fulltext dropdown"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:hasMaintenanceObjectKind" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:hasMaintenanceObjectKind" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:hasMaintenanceObjectKind" class="-view edit search fulltext dropdown"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:whereIsInstalledITILBundle" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:hasParentLink" class="view edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:hasParentLink" class="-view edit search fulltext dropdown"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:IT_InstallationBundle" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:hasLinkObject" class="-view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:hasLinkObject" class="-view edit search fulltext dropdown"></veda-control>
            <div about="@" class="view -edit -search" data-template="v-s:LinksObjectListTemplate" data-embedded="true"></div>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:hasLinkObjectITILBundle" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:hasPartsList" class="view edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:hasPartsList" class="-view edit search fulltext dropdown"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:proprietor" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:proprietor" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:proprietor" class="-view edit search fulltext dropdown"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:customer" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:customer" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:customer" class="-view edit search fulltext dropdown"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:operator" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:operator" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:operator" class="-view edit search fulltext dropdown"></veda-control>
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
