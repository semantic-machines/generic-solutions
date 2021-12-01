export const html = `
<table class="table table-bordered">
  <thead class="result-header">
    <tr>
      <th colspan="11" about="gen:PowerOfAttorney" property="rdfs:label"></th>
    </tr>
    <tr class="active">
      <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
      <th class="orderby" data-orderby="v-s:registrationNumber">№</th>
      <th><span about="v-s:creator" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:registrationDate"><span about="v-s:registrationDate" property="rdfs:label"></span></th>
      <th><span about="v-s:hasFormOfPowerOfAttorney" property="rdfs:label"></span></th>
      <th><span about="v-s:issuedForAbsencePeriodOfEmployee" property="rdfs:label"></span></th>
      <th><span about="v-s:dateFrom" property="rdfs:label"></span></th>
      <th><span about="v-s:dateTo" property="rdfs:label"></span></th>
      <th><span about="v-s:hasReasonForPowerOfAttorney" property="rdfs:label"></span></th>
      <th><span about="v-s:reason" property="rdfs:label"></span></th>
      <th><span about="v-s:attachment" property="rdfs:label"></span></th>

    </tr>
  </thead>
  <tbody class="result-container">
    <tr>
      <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
      <td property="v-s:registrationNumber"></td>
      <td rel="v-s:creator" data-template="v-ui:LabelTemplate"></td>
      <td property="v-s:registrationDate"></td>
      <td rel="v-s:hasFormOfPowerOfAttorney" data-template="v-ui:LabelTemplate"></td>
      <td property="v-s:issuedForAbsencePeriodOfEmployee"></td>
      <td property="v-s:dateFrom"></td>
      <td property="v-s:dateTo"></td>
      <td rel="v-s:hasReasonForPowerOfAttorney" data-template="v-ui:LabelTemplate"></td>
      <td property="v-s:reason"></td>
      <td rel="v-s:attachment" data-template="v-ui:FileMinTemplate"></td>
    </tr>
  </tbody>
</table>
`;