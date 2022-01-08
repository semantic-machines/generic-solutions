import BrowserUtil from '/js/browser/util.js';
import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  // кнопка активна если итоговая оценка отрицательная
  individual.getPropertyChain('v-s:hasContractorCategoryDecision', 'v-s:isOrganizationOk').then(function (isOkArr) {
    if (isOkArr.length > 0 && isOkArr[0] === false) {
      $('.action#save_and_start_process2', template).removeAttr('disabled');
    } else {
      $('.action#save_and_start_process2', template).attr('disabled', 'disabled');
    }
  });
};

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $('#add-ContractorCategoryDecision', template).click(function () {
    let modal = $('#notification-modal-template').html();
    modal = $(modal);
    modal.modal({show: false});
    $('body').append(modal);
    modal.modal('show');
    template.one('remove', function () {
      modal.modal('hide').remove();
    });
    const cntr = $('.modal-body', modal);
    const _class = new IndividualModel('v-s:ContractorCategoryDecision');
    const decision = new IndividualModel();
    const tmpl = new IndividualModel('gen:ContractorCategoryDecisionTemplate');
    decision['rdf:type'] = [_class];
    decision['v-s:backwardTarget'] = [individual];
    decision['v-s:backwardProperty'] = [new IndividualModel('v-s:hasContractorCategoryDecision')];
    decision['v-s:canRead'] = [true];
    decision.present(cntr, tmpl, 'edit');
    decision.one('beforeReset', function () {
      modal.modal('hide').remove();
    });
    decision.one('afterSave', function () {
      modal.modal('hide').remove();
    });
  });

  const _class = new IndividualModel('v-s:ContractorCategoryDecision');
  _class.rights.then(function (rights) {
    if (!rights.hasValue('v-s:canCreate', true)) {
      $('#add-ContractorCategoryDecision', template).prop('disabled', true);
    }
  });

  function handler () {
    if (individual.hasValue('v-s:hasContractorCategoryDecision')) {
      $('#add-ContractorCategoryDecision', template).hide();
    } else {
      $('#add-ContractorCategoryDecision', template).show();
    }
  }
  handler();
  individual.on('v-s:hasContractorCategoryDecision', handler);
  template.one('remove', function () {
    individual.off('v-s:hasContractorCategoryDecision', handler);
  });

  function processHandler () {
    individual.canUpdate().then(function (canUpdate) {
      if (individual.hasValue('v-wf:isProcess')) {
        $('#save_and_start_process1.action', template).remove();
        $('#save_and_start_process2.action', template).remove();
        $('#delete.action', template).remove();
      } else if (individual.isNew() || canUpdate) {
        $('#save_and_start_process1.action', template).off('click');
        $('#save_and_start_process1.action', template).on('click', function () {
          BrowserUtil.send(
            individual,
            template,
            's-wf:complexRouteTransform',
            undefined,
            'gen:ContractorCategoryRequest_Initial_ComplexRouteStartForm_Template',
          );
        });
        $('#save_and_start_process2.action', template).off('click');
        $('#save_and_start_process2.action', template).on('click', function () {
          BrowserUtil.send(individual, template, 's-wf:complexRouteTransform', undefined, 'gen:ContractorCategoryRequest_Risks_ComplexRouteStartForm_Template');
        });
      } else {
        $('#save.action', template).remove();
        $('#edit.action', template).remove();
        $('#delete.action', template).remove();
      }
    });
  }

  individual.on('afterReset', processHandler);
  processHandler();
  template.one('remove', function () {
    individual.off('afterReset', processHandler);
  });
};

export const html = `
  <div>
    <div class="container sheet">
      <div class="row">
        <div class="col-md-9 col-sm-7">
          <h2>
            <span about="v-s:ContractorCategoryRequest" property="rdfs:label"></span><br />
            <small about="@" property="rdfs:label"></small>
          </h2>
          <span about="@" data-template="v-ui:RabbitHole"></span>
        </div>
      </div>
      <hr class="margin-sm" />
      <div class="row">
        <div class="col-md-9 col-sm-7">
          <em about="rdfs:comment" property="rdfs:label"></em>
          <div property="rdfs:comment" class="view -edit -search"></div>
          <veda-control data-type="text" rows="2" property="rdfs:comment" class="-view edit search"></veda-control>
        </div>
        <div class="col-md-3 col-sm-5">
          <br />
          <div rel="v-s:hasContractorCategoryDecision" data-template="gen:ContractorCategoryDecisionEmbeddedTemplate"></div>
          <div id="new-ContractorCategoryDecision" class="view -edit -search clearfix">
            <button class="btn btn-success pull-right" id="add-ContractorCategoryDecision">
              <span class="glyphicon glyphicon-zoom-in"></span>
              <span about="v-s:ContractorCategoryDecision" property="rdfs:label"></span>
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div about="@" rel="v-s:backwardTarget" data-embedded="true" data-template="gen:ContractorProfileEmbeddedTemplate"></div>
      <hr />
      <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
      <br />
      <!-- BUTTONS -->
      <div class="actions">
        <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="edit save cancel delete journal task"></span>
        <button
          type="button"
          class="action btn btn-warning view -edit -search"
          id="save_and_start_process1"
          about="gen:ContractorCategoryRequest_InitialEvaluationBundle"
          property="rdfs:label" />
        <button
          type="button"
          class="action btn btn-warning view -edit -search"
          id="save_and_start_process2"
          about="gen:ContractorCategoryRequest_RisksEvaluationBundle"
          property="rdfs:label" />
      </div>
    </div>
    <div about="@" class="container sheet view edit -search" data-template="v-s:LinksTemplate" data-embedded="true"></div>
    <div about="@" class="container sheet view -edit -search" data-template="v-s:CommentsTemplate"></div>
  </div>
`;
