export const html = `
<table class="table table-bordered">
  <thead class="result-header">
    <tr>
      <th colspan="7" about="gen:Contract" property="rdfs:label"></th>
      <th colspan="2" about="v-s:supplier" property="rdfs:label"></th>
      <th colspan="2" about="v-s:customer" property="rdfs:label"></th>
      <th colspan="2" about="v-s:hasContractParticipantStakeholder" property="rdfs:label"></th>
      <th colspan="5"></th>
    </tr>
    <tr class="active">
      <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
      <th><span about="v-s:hasDocumentKind" property="rdfs:label"></th>
      <th><span about="gen:ContractSubjectBundle" property="rdfs:label"></th>
      <th class="orderby" data-orderby="v-s:registrationNumber">№</th>
      <th class="orderby" data-orderby="v-s:registrationDate"><span about="v-s:registrationDate" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:registrationNumberIn"><span about="v-s:registrationNumberIn" property="rdfs:label"></th>
      <th><span about="gen:initiatorForContractBundle" property="rdfs:label"></th>
      <th><span about="v-s:hasContractor" property="rdfs:label"></th>
      <th><span about="v-s:hasOrganization" property="rdfs:label"></th>
      <th><span about="v-s:hasContractor" property="rdfs:label"></th>
      <th><span about="v-s:hasOrganization" property="rdfs:label"></th>      
      <th><span about="v-s:hasContractor" property="rdfs:label"></th>
      <th><span about="v-s:hasOrganization" property="rdfs:label"></th>
      <th><span about="gen:isAutoProlongateProvides" property="rdfs:label"></th>
      <th><span about="gen:isContractUnlimited" property="rdfs:label"></th>
      <th><span about="gen:isContractClosed" property="rdfs:label"></th>
      <th><span about="v-s:hasBudgetCategory" property="rdfs:label"></th>
      <th><span about="v-s:supportSpecialistOfContract" property="rdfs:label"></th>
    </tr>
  </thead>
  <tbody class="result-container">
    <tr>
      <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
      <td rel="v-s:hasDocumentKind" data-template="v-ui:LabelTemplate"></td>
      <td property="v-s:theme"></td>
      <td property="v-s:registrationNumber"></td>
      <td property="v-s:registrationDate"></td>
      <td property="v-s:registrationNumerIn"></td>
      <td rel="v-s:initiator" data-template="v-ui:LabelTemplate"></td>
      <td rel="v-s:hasContractParticipantSupplier">
        <span rel="v-s:hasContractor" data-template="v-ui:LabelTemplate"></span>
      </td>
      <td rel="v-s:hasContractParticipantSupplier">
        <span rel="v-s:hasOrganization" data-template="v-ui:LabelTemplate"></span>
      </td>
      <td rel="v-s:hasContractParticipantCustomer">
        <span rel="v-s:hasContractor" data-template="v-ui:LabelTemplate"></span>
      </td>
      <td rel="v-s:hasContractParticipantCustomer">
        <span rel="v-s:hasOrganization" data-template="v-ui:LabelTemplate"></span>
      </td>
      <td rel="v-s:hasContractParticipantStakeholder">
        <span rel="v-s:hasContractor" data-template="v-ui:LabelTemplate"></span>
      </td>
      <td rel="v-s:hasContractParticipantStakeholder">
        <span rel="v-s:hasOrganization" data-template="v-ui:LabelTemplate"></span>
      </td>
      <td property="gen:isAutoProlongateProvides"></td>
      <td property="gen:isContractUnlimited"></td>
      <td property="gen:isContractClosed"></td>
      <td rel="v-s:hasBudgetCategory" data-template="v-ui:LabelTemplate"></td>
      <td rel="v-s:supportSpecialistOfContract" data-template="v-ui:LabelTemplate"></td>
     </tr>
  </tbody>
</table>
`;