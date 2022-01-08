import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  var _class = new IndividualModel('v-s:ContractorCategoryDecision');
  _class.canCreate().then(function (canCreate) {
    if (!canCreate) {
      $('#AddResolution', template).remove();
    }
  });

  var decisionContractorCategoryEmbeddedState = $('#decisionContractorCategoryEmbeddedState', template);
  individual.on('v-s:isOrganizationOk', handler);
  template.one('remove', function () {
    individual.off('v-s:isOrganizationOk', handler);
  });
  function handler() {
    if (individual.hasValue('v-s:isOrganizationOk', true)) {
      decisionContractorCategoryEmbeddedState.removeClass('panel-danger panel-warning').addClass('panel-success');
    } else if (individual.hasValue('v-s:isOrganizationOk', false)) {
      decisionContractorCategoryEmbeddedState.removeClass('panel-success panel-warning').addClass('panel-danger');
    } else {
      decisionContractorCategoryEmbeddedState.removeClass('panel-success panel-danger').addClass('panel-warning');
    }
  }
  handler();
};

export const html = `
  <div>
    <div id="decisionContractorCategoryEmbeddedState" class="panel">
      <div class="panel-heading">
        <h3 class="panel-title">
          <span><a href="#/@" class="glyphicon glyphicon-search"></a></span>
          <span about="v-s:ContractorCategoryDecision" property="rdfs:label" class="panel-title"> </span>
        </h3>
      </div>
      <div class="panel-body">
        <div class="checkbox">
          <label>
            <veda-control property="v-s:isOrganizationOk" data-type="boolean"></veda-control>
            <strong about="v-s:isOrganizationOk" property="rdfs:label"></strong>
            <span property="v-s:date" class="view -edit search"></span>
          </label>
        </div>
        <div class="checkbox" rel="v-s:hasContractorCategoryDecisionSecurity">
          <label>
            <veda-control property="v-s:isContractorOkSecurityDepSummary" data-type="boolean"></veda-control>
            <span><strong about="v-s:isContractorOkSecurityDepSummary" property="rdfs:label"></strong> </span>
          </label>
        </div>
        <div class="checkbox" rel="v-s:hasContractorCategoryDecisionLegal">
          <label>
            <veda-control property="v-s:isContractorOkLegalDepSummary" data-type="boolean"></veda-control>
            <span><strong about="v-s:isContractorOkLegalDepSummary" property="rdfs:label"></strong> </span>
          </label>
        </div>
        <div class="checkbox" rel="v-s:hasContractorCategoryDecisionFinancial">
          <label>
            <veda-control property="v-s:isContractorOkFinancialDepSummary" data-type="boolean"></veda-control>
            <span><strong about="v-s:isContractorOkFinancialDepSummary" property="rdfs:label"></strong> </span>
          </label>
        </div>
        <div class="checkbox" rel="v-s:hasContractorCategoryDecisionManagement">
          <label>
            <veda-control property="v-s:isContractorOkManagementSummary" data-type="boolean"></veda-control>
            <span><strong about="v-s:isContractorOkManagementSummary" property="rdfs:label"></strong> </span>
          </label>
        </div>
      </div>
    </div>
  </div>
`;
