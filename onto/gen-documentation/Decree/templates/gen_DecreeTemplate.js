import BrowserUtil from '/js/browser/util.js';
import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';
import riot from 'riot';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $('#add-copy', template).click(function () {
    const _class = new IndividualModel('gen:Decree');
    const Decree = new IndividualModel();
    const tmpl = 'gen:DecreeTemplate';
    Decree['rdf:type'] = [_class];
    Decree['v-s:hasDecreeKind'] = individual['v-s:hasDecreeKind'];
    Decree['v-s:owner'] = individual['v-s:owner'];
    Decree['v-s:title'] = individual['v-s:title'];
    Decree['v-s:initiator'] = individual['v-s:initiator'];
    Decree['v-s:signedBy'] = individual['v-s:signedBy'];
    Decree['v-s:responsible'] = individual['v-s:responsible'];
    const link_class = new IndividualModel('v-s:Link');
    const Link = new IndividualModel();
    Link['rdf:type'] = [link_class];
    Link['v-s:from'] = [individual];
    Link['v-s:to'] = [Decree];
    Decree['v-s:hasLink'] = [Link];
    riot.route(['#', Decree.id, '#main', tmpl, 'edit'].join('/'));
    Decree.one('afterSave', function () {
      setTimeout(() => {
        riot.route('#/' + Decree.id, false);
      }, 250);
    });
  });
  $('#add-RegRecord', template).click(function () {
    let modal = $('#notification-modal-template').html();
    modal = $(modal);
    modal.modal({show: false});
    $('body').append(modal);
    modal.modal('show');
    template.one('remove', function () {
      modal.modal('hide').remove();
    });
    const cntr = $('.modal-body', modal);
    const _class = new IndividualModel('gen:DecreeRegistrationRecord');
    const RegRecord = new IndividualModel();
    const tmpl = new IndividualModel('gen:DecreeRegistrationRecordTemplate');

    RegRecord['rdf:type'] = [_class];
    RegRecord['gen:hasDecreeKind'] = individual['gen:hasDecreeKind'];
    RegRecord['v-s:backwardTarget'] = [individual];
    RegRecord['v-s:backwardProperty'] = [new IndividualModel('gen:hasDecreeRegistrationRecord')];
    RegRecord['v-s:backwardReplace'] = [new IndividualModel('gen:hasDecreeKind')];
    RegRecord['v-s:canRead'] = [true];
    RegRecord.present(cntr, tmpl, 'edit');
    RegRecord.one('beforeReset', function () {
      modal.modal('hide').remove();
    });
    RegRecord.one('afterSave', function () {
      modal.modal('hide').remove();
    });
  });
  function handler (property_uri) {
    if (individual.hasValue('gen:hasDecreeRegistrationRecord')) {
      $('#buttonReg').hide();
    } else {
      $('#buttonReg').show();
    }
  }
  individual.on('propertyModified', handler);
  template.one('remove', function () {
    individual.off('propertyModified', handler);
  });
  handler('gen:hasDecreeRegistrationRecord');

  individual.canUpdate().then(function (canUpdate) {
    if (individual.hasValue('v-wf:isProcess')) {
      $('#send.action', template).remove();
      // $('#save.action', template).remove();
    } else if (individual.isNew() || canUpdate) {
      $('#send.action', template).off('click');
      $('#send.action', template).on('click', function () {
        BrowserUtil.send(individual, template, 's-wf:complexRouteTransform', undefined, 'gen:Decree_ComplexRouteStartForm_Template');
      });
    } else {
      $('#send.action', template).remove();
      $('#save.action', template).remove();
    }
  });
};

export const html = `
  <div>
    <div class="container sheet">
      <h3 class="margin-sm">
        <span about="@" property="rdf:type"></span>
        <small about="@" property="rdfs:label" class="view edit -search"></small>
      </h3>
      <div rel="gen:hasDecreeRegistrationRecord" class="view edit -search" data-template="gen:DecreeRegistrationRecordEmbededSectionTemplate"></div>
      <div
        rel="gen:hasDecreeRegistrationRecord"
        data-template="gen:DecreeRegistrationRecordEmbededSectionTemplateForSearch"
        data-embedded="true"
        class="-view -edit search create"></div>
      <section id="buttonReg">
        <h4 class="section-header clearfix">
          <span about="gen:DecreeRegistrationRecord" property="rdfs:label"></span>
          <veda-control data-type="link" rel="gen:hasDecreeRegistrationRecord" class="-view -edit search create pull-right"></veda-control>
          <div class="view -edit -search pull-right">
            <button class="btn btn-xs btn-success" id="add-RegRecord">
              <span class="glyphicon glyphicon-zoom-in"></span>
              <span about="gen:hasDecreeRegistrationRecord" property="rdfs:label"></span>
            </button>
          </div>
        </h4>
      </section>
      <section id="MainProperties">
        <h4 class="section-header" about="v-s:MainProperties" property="rdfs:label"></h4>
        <!--div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:ownerBundleDecree" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:owner" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="select" rel="v-s:owner" class="-view edit search fulltext dropdown"></veda-control>
        </div>
      </div-->
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="gen:hasDecreeKind" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="gen:hasDecreeKind" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="gen:hasDecreeKind" class="-view edit search fulltext dropdown"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:initiator" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:initiator" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:initiator" class="-view edit search fulltext dropdown"></veda-control>
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
            <label about="gen:responsibleDepartmentBundle" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:responsibleDepartment" class="view edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:responsibleDepartment" class="-view edit search fulltext dropdown tree"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="gen:titleBundleDecree" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div class="view -edit -search bg-warning padding-md"><strong property="v-s:title"></strong></div>
            <veda-control data-type="string" property="v-s:title" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="gen:descriptionBundleDecree" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:description" class="view -edit search"></div>
            <veda-control data-type="text" property="v-s:description" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:attachment" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:attachment" data-template="v-ui:FileTemplateWithComment" data-embedded="true"></div>
            <veda-control data-type="file" rel="v-s:attachment" class="-view edit -search"></veda-control>
          </div>
        </div>
      </section>
      <hr />
      <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
      <br />
      <br />
      <div class="actions view edit -search">
        <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send edit save cancel delete journal task"></span>
        <button type="button" class="action btn btn-default view -edit -search" id="add-copy" about="gen:CopyBundleInternalDocument" property="rdfs:label" />
      </div>
    </div>
    <div about="@" class="container sheet view edit -search" data-template="v-s:LinksTemplate" data-embedded="true"></div>
    <div about="@" class="container sheet view -edit -search" data-template="v-s:CommentsTemplate"></div>
  </div>
`;
