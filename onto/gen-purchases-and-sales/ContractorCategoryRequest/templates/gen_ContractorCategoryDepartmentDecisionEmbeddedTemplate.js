import $ from 'jquery';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  try {
    const types = {
      'v-s:ContractorCategoryDecisionSecurity': {
        ok: 'v-s:isContractorOkSecurityDepSummary',
        summary: 'v-s:contractorSecurityDepSummary',
      },
      'v-s:ContractorCategoryDecisionLegal': {
        ok: 'v-s:isContractorOkLegalDepSummary',
        summary: 'v-s:contractorLegalDepSummary',
      },
      'v-s:ContractorCategoryDecisionFinancial': {
        ok: 'v-s:isContractorOkFinancialDepSummary',
        summary: 'v-s:contractorFinancialDepSummary',
      },
      'v-s:ContractorCategoryDecisionManagement': {
        ok: 'v-s:isContractorOkManagementSummary',
        summary: 'v-s:contractorManagementSummary',
      },
    };

    const type = individual['rdf:type'][0].id;
    const ok = types[type].ok;
    const summary = types[type].summary;

    function checkHandler (property_uri) {
      if (property_uri === ok) {
        if (individual.hasValue(ok, true)) {
          template.addClass('panel-success').removeClass('panel-warning').removeClass('panel-danger');
        } else if (individual.hasValue(ok, false)) {
          template.removeClass('panel-success').removeClass('panel-warning').addClass('panel-danger');
        } else {
          template.removeClass('panel-success').addClass('panel-warning').removeClass('panel-danger');
        }
      }
    }
    individual.on('propertyModified', checkHandler);
    template.one('remove', function () {
      individual.off('propertyModified', checkHandler);
    });
    checkHandler(ok);

    $('.ok-property', template).attr('property', ok);
    $('.summary-about', template).attr('about', summary);
    $('.summary-property', template).attr('property', summary);
  } catch (error) {
    console.log(error);
  }
};

export const html = `
  <div class="panel panel-horizontal">
    <div class="panel-heading">
      <veda-control class="ok-property" data-type="boolean"></veda-control>
    </div>
    <div class="panel-body">
      <h4 id="descriptionClose" class="margin-sm">
        <span about="@" data-template="v-ui:IconModalTemplate"></span>
        <span class="summary-about" property="rdfs:label"></span>
      </h4>
      <div class="view -edit summary-property"></div>
      <veda-control data-type="text" rows="4" class="-view edit summary-property"></veda-control>
    </div>
  </div>
`;
