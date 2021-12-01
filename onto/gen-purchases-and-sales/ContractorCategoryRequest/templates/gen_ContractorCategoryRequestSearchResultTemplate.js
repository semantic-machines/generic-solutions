export const html = `
<table class="table table-bordered">
  <thead class="result-header">
    <tr>
      <th colspan="3" about="v-s:ContractorCategoryRequest" property="rdfs:label"></th>
      <th colspan="2" about="v-s:Organization" property="rdfs:label"></th>
      <th colspan="5" about="v-s:hasContractorCategoryDecision" property="rdfs:label"></th>
    </tr>
    <tr class="active">
      <th width="1%">#</th>
      <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
      <th class="orderby" data-orderby="rdfs:comment"><span about="rdfs:comment" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:shortLabel"><span about="v-s:shortLabel" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:taxId"><span about="v-s:taxId" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:hasContractorCategoryDecision.v-s:isOrganizationOk"><span about="v-s:isOrganizationOk" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:hasContractorCategoryDecision.v-s:hasContractorCategoryDecisionSecurity.v-s:isContractorOkSecurityDepSummary"><span about="v-s:isContractorOkSecurityDepSummary" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:hasContractorCategoryDecision.v-s:hasContractorCategoryDecisionLegal.v-s:isContractorOkLegalDepSummary"><span about="v-s:isContractorOkLegalDepSummary" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:hasContractorCategoryDecision.v-s:hasContractorCategoryDecisionFinancial.v-s:isContractorOkFinancialDepSummary"><span about="v-s:isContractorOkFinancialDepSummary" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:hasContractorCategoryDecision.v-s:hasContractorCategoryDecisionManagement.v-s:isContractorOkManagementSummary"><span about="v-s:isContractorOkManagementSummary" property="rdfs:label"></span></th>
    </tr>
  </thead>
  <tbody class="result-container">
    <tr>
      <td class="serial-number"></td>
      <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
      <td property="rdfs:comment"></td>
      <td about="@" rel="v-s:backwardTarget"> <span rel="v-s:backwardTarget"><span property="v-s:shortLabel"></span></span></td>
      <td about="@" rel="v-s:backwardTarget"><span rel="v-s:backwardTarget"><span property="v-s:taxId"></span></span></td>
      <td rel="v-s:hasContractorCategoryDecision">
        <span property="v-s:isOrganizationOk"></span>
      </td>
      <td rel="v-s:hasContractorCategoryDecision">
        <div rel="v-s:hasContractorCategoryDecisionSecurity">
          <span property="v-s:isContractorOkSecurityDepSummary"></span>
        </div>
      </td>
      <td rel="v-s:hasContractorCategoryDecision">
        <div  rel="v-s:hasContractorCategoryDecisionLegal">
          <span property="v-s:isContractorOkLegalDepSummary"></span>
        </div>
      </td>
      <td rel="v-s:hasContractorCategoryDecision">
        <div  rel="v-s:hasContractorCategoryDecisionFinancial">
          <span property="v-s:isContractorOkFinancialDepSummary"></span>
        </div>
      </td>
      <td rel="v-s:hasContractorCategoryDecision">
        <div  rel="v-s:hasContractorCategoryDecisionManagement">
          <span property="v-s:isContractorOkManagementSummary"></span>
        </div>
      </td>
    </tr>
  </tbody>
</table>
`;