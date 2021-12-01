export const html = `
<table class="table table-bordered">
  <thead class="result-header">
    <tr>
      <th colspan="13" about="v-s:Organization" property="rdfs:label"></th>
    </tr>
    <tr class="active">
      <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
      <th><span about="v-s:shortLabel" property="rdfs:label"></span></th>
      <th><span about="v-s:creator" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:created"><span about="v-s:created" property="rdfs:label"></span></th>
      <th><span about="v-s:hasClassifierCountry" property="rdfs:label"></span></th>
      <th><span about="v-s:hasClassifierLegalForm" property="rdfs:label"></span></th>
      <th><span about="v-s:taxId" property="rdfs:label"></span></th>
      <th><span about="v-s:taxRegistrationCause" property="rdfs:label"></span></th>
      <th><span about="v-s:legalAddress" property="rdfs:label"></span></th>
      <th><span about="v-s:postalAddress" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:dateFromFact"><span about="v-s:dateFromFact" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:dateToFact"><span about="v-s:dateFromFact" property="rdfs:label"></span></th>
      <th><span about="v-s:HeadOrganization" property="rdfs:label"></span></th>
    </tr>
  </thead>
  <tbody class="result-container">
    <tr>
      <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
      <td property="v-s:shortLabel"></td>
      <td rel="v-s:creator" data-template="v-ui:LabelTemplate"></td>
      <td property="v-s:created"></td>
      <td rel="v-s:hasClassifierCountry" data-template="v-ui:LabelTemplate"></td>
      <td rel="v-s:hasClassifierLegalForm" data-template="v-ui:LabelTemplate"></td>
      <td property="v-s:taxId"></td>
      <td property="v-s:taxRegistrationCause"></td>
      <td property="v-s:legalAddress"></td>
      <td property="v-s:postalAddress"></td>
      <td property="v-s:dateFromFact"></td>
      <td property="v-s:dateToFact"></td>
      <td rel="v-s:HeadOrganization" data-template="v-ui:LabelTemplate"></td>
    </tr>
  </tbody>
</table>
`;