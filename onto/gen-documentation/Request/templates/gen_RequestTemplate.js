import BrowserUtil from '/js/browser/util.js';
import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $('#bluePlus', template).click(function () {
    individual.save();
    const _class = new IndividualModel('v-s:Action');
    const action = new IndividualModel();
    const tmpl = new IndividualModel('v-s:Action_Template');
    action['rdf:type'] = [_class];
    action['v-s:parent'] = [individual];
    /* action["v-s:backwardTarget"] = [individual];
    action["v-s:backwardProperty"] = [new IndividualModel("v-s:hasAction")];*/
    const modal = BrowserUtil.showModal(action, tmpl, 'edit');
    action.one('beforeReset', function () {
      modal.modal('hide').remove();
    });
    action.one('afterSave', function () {
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
            <veda-control data-type="text" property="v-s:registrationNumber" class="-view edit search"></veda-control>
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
            <label about="v-s:theme" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:theme" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="string" property="v-s:theme" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:initiator" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-3">
            <div rel="v-s:initiator" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:initiator" class="-view edit search fulltext dropdown"></veda-control>
          </div>
        </div>
      </section>
      <section id="hasAction">
        <h4 class="section-header" about="v-s:hasAction" property="rdfs:label"></h4>
        <div class="row row-attribute">
          <div class="col-sm-12 col-xs-12">
            <!--<div rel="v-s:hasAction" class="view edit -search" data-template="v-s:ActionEmbedded_Template" data-embedded="true"></div>-->
            <!--<veda-control rel="v-s:hasAction" data-type="link" class="-view edit -search create"></veda-control>-->
            <table class="table table-condensed table-bordered">
              <thead>
                <tr class="active">
                  <th width="1%">
                    <span class="glyphicon glyphicon-zoom-in"></span>
                  </th>
                  <!--<th width="1%">№</th>-->
                  <th about="v-s:hasStatus" property="rdfs:label"></th>
                  <th about="v-s:responsible" property="rdfs:label"></th>
                  <th about="v-s:taskDescription" property="rdfs:label"></th>
                  <th about="v-s:hasAction" property="rdfs:label"></th>
                  <th class="-view edit -search"></th>
                </tr>
              </thead>
              <tbody rel="v-s:hasAction" data-embedded="true" data-limit="10" data-more="true">
                <tr>
                  <th width="1%">
                    <span about="@" data-template="v-ui:IconModalTemplate"></span>
                  </th>
                  <td>
                    <div about="@" rel="v-s:hasStatus" data-template="v-ui:StatusTemplate" class="view  edit search"></div>
                    <veda-control data-type="link" rel="v-s:hasStatus" class="-view -edit search fulltext dropdown"></veda-control>
                  </td>
                  <td>
                    <div about="@" rel="v-s:responsible" data-template="v-ui:LabelTemplate" class="view  edit search"></div>
                    <veda-control data-type="link" rel="v-s:responsible" class="-view -edit search fulltext dropdown"></veda-control>
                  </td>
                  <td>
                    <div about="@" property="v-s:taskDescription" class="view  edit -search"></div>
                  </td>
                  <td>
                    <div about="@" rel="v-s:hasAction" data-template="v-ui:ClassNameLabelLinkTemplate" class="view  edit search"></div>
                    <veda-control data-type="link" rel="v-s:hasAction" class="-view -edit search fulltext dropdown"></veda-control>
                  </td>
                  <td width="100px" class="-view edit -search">
                    <button type="button" class="action glyphicon glyphicon-duplicate -view edit -search"></button>
                  </td>
                </tr>
              </tbody>
            </table>
            <veda-control data-type="link" rel="v-s:hasAction" class="-view edit -search create create-modal"></veda-control>
          </div>
        </div>
      </section>
      <section id="SystemProperties">
        <h4 class="section-header" about="v-ui:SystemPropertiesTemplate" property="rdfs:comment"></h4>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:CreatedBundle" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div class="row">
              <div class="col-sm-6 col-xs-6">
                <veda-control data-type="link" rel="v-s:creator" class="-view -edit search fulltext"></veda-control>
                <div about="@" rel="v-s:creator" data-template="v-ui:LabelTemplate" class="view edit -search"></div>
                <div rel="v-s:creator" data-template="v-ui:LabelTemplate" class="-view -edit search"></div>
              </div>
              <div class="col-sm-6 col-xs-6">
                <veda-control property="v-s:created" data-type="date" class="-view -edit search"></veda-control>
                <div about="@" property="v-s:created" class="view edit -search"></div>
                <div property="v-s:created" class="-view -edit search"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:EditedBundle" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div class="row">
              <div class="col-sm-6 col-xs-6">
                <veda-control data-type="link" rel="v-s:lastEditor" class="-view -edit search fulltext"></veda-control>
                <div about="@" rel="v-s:lastEditor" data-template="v-ui:LabelTemplate" class="view edit -search"></div>
                <div rel="v-s:lastEditor" data-template="v-ui:LabelTemplate" class="-view -edit search"></div>
              </div>
              <div class="col-sm-6 col-xs-6">
                <veda-control data-type="date" property="v-s:edited" class="-view -edit search"></veda-control>
                <div about="@" property="v-s:edited" class="view edit -search"></div>
                <div property="v-s:edited" class="-view -edit search"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <!-- BUTTONS -->
      <div class="actions view edit -search">
        <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send edit save cancel delete journal  task"></span>
      </div>
    </div>
  </div>
`;
