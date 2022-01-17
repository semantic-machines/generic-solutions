import BrowserUtil from '/js/browser/util.js';
import $ from 'jquery';
import veda from '/js/common/veda.js';
import IndividualModel from '/js/common/individual_model.js';
import riot from 'riot';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if (mode == 'edit' && individual.isNew()) {
    if (!individual.hasValue('v-s:initiator')) {
      individual['v-s:initiator'] = [veda.appointment['v-s:parentUnit'][0]];
    }
  }
};

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $('#add-copy', template).click(function () {
    const _class = new IndividualModel('gen:InternalDocument');
    const InternalDocument = new IndividualModel();
    const tmpl = 'gen:InternalDocumentTemplate';
    InternalDocument['rdf:type'] = [_class];
    InternalDocument['v-s:hasDocumentKind'] = individual['v-s:hasDocumentKind'];
    InternalDocument['v-s:initiator'] = individual['v-s:initiator'];
    InternalDocument['v-s:responsibleDepartment'] = individual['v-s:responsibleDepartment'];
    InternalDocument['v-s:copyTo'] = individual['v-s:copyTo'];
    InternalDocument['v-s:theme'] = individual['v-s:theme'];
    InternalDocument['v-s:content'] = individual['v-s:content'];
    const link_class = new IndividualModel('v-s:Link');
    const Link = new IndividualModel();
    Link['rdf:type'] = [link_class];
    Link['v-s:from'] = [individual];
    Link['v-s:to'] = [InternalDocument];
    InternalDocument['v-s:hasLink'] = [Link];
    riot.route(['#', InternalDocument.id, '#main', tmpl, 'edit'].join('/'));
    InternalDocument.one('afterSave', function () {
      setTimeout(() => {
        riot.route('#/' + InternalDocument.id, false);
      }, 250);
    });
  });

  individual.canUpdate().then(function (canUpdate) {
    if (individual.hasValue('v-wf:isProcess')) {
      $('#send.action', template).remove();
      // $('#save.action', template).remove();
    } else if (individual.isNew() || canUpdate) {
      $('#send.action', template).off('click');
      $('#send.action', template).on('click', function () {
        BrowserUtil.send(individual, template, 's-wf:complexRouteTransform', undefined, 'gen:InternalDocument_ComplexRouteStartForm_Template');
      });
    } else {
      $('#send.action', template).remove();
      $('#save.action', template).remove();
    }
  });

  // Печатные бланки
  $('#internalDocument_printBlank', template).on('click', function (e) {
    BrowserUtil.createReport('gen:InternalDocument_printBlank', individual);
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
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:registrationNumber" class="view -edit -search"></div>
            <veda-control data-type="text" property="v-s:registrationNumber" class="-view -edit search"></veda-control>
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
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:theme" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div class="view -edit -search bg-warning padding-md"><strong property="v-s:theme"></strong></div>
            <veda-control data-type="multilingualString" property="v-s:theme" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:content" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:content" class="view -edit -search"></div>
            <veda-control data-type="text" property="v-s:content" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:attachment" property="rdfs:label" class="view edit -search"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:attachment" data-template="v-ui:FileTemplateWithComment" data-embedded="true"></div>
            <veda-control data-type="file" rel="v-s:attachment" class="-view edit -search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="rdfs:comment" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="rdfs:comment" class="view edit -search"></div>
            <veda-control data-type="text" property="rdfs:comment" class="-view edit search"></veda-control>
          </div>
        </div>
      </section>
      <hr />
      <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
      <br />
      <div class="actions view edit -search">
        <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send edit save cancel delete journal task"></span>
        <button type="button" class="action btn btn-default view -edit -search" id="add-copy" about="gen:CopyBundleInternalDocument" property="rdfs:label" />
        <button
          type="button"
          class="action btn btn-info view -edit -search"
          id="internalDocument_printBlank"
          about="gen:InternalDocument_printBlank"
          property="rdfs:label" />
      </div>
    </div>
    <div about="@" class="container sheet view edit -search" data-template="v-s:LinksTemplate" data-embedded="true"></div>
    <div about="@" class="container sheet view -edit -search" data-template="v-s:CommentsTemplate"></div>
  </div>
`;
