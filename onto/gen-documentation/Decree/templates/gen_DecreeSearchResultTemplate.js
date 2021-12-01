export const html = `
<table class="table table-bordered">
  <thead class="result-header">
    <tr>
      <th colspan="14" about="gen:Decree" property="rdfs:label"></th>
    </tr>
    <tr class="active">
      <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
      <th class="orderby" data-orderby="gen:hasDecreeRegistrationRecord.v-s:registrationNumber">№</th>
      <th><span about="v-s:creator" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="gen:hasDecreeRegistrationRecord.v-s:registrationDate"><span about="v-s:registrationDate" property="rdfs:label"></span></th>
      <th><span about="v-s:owner" property="rdfs:label"></span></th>
      <th><span about="v-s:hasDocumentKind" property="rdfs:label"></span></th>
      <th><span about="v-s:initiator" property="rdfs:label"></span></th>
      <th><span about="v-s:signedBy" property="rdfs:label"></span></th>
      <th><span about="v-s:responsibleDepartment" property="rdfs:label"></span></th>
      <th><span about="v-s:title" property="rdfs:label"></span></th>
      <th><span about="v-s:description" property="rdfs:label"></span></th>
      <th><span about="rdfs:comment" property="rdfs:label"></span></th>
      <th><span about="v-s:attachment" property="rdfs:label"></span></th>
    </tr>
  </thead>
  <tbody class="result-container">
    <tr>
      <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
      <td rel="gen:hasDecreeRegistrationRecord">
        <span property="v-s:registrationNumber"></span>
      </td>
      <td rel="v-s:creator" data-template="v-ui:LabelTemplate"></td>
      <td rel="gen:hasDecreeRegistrationRecord">
        <span property="v-s:registrationDate"></span>
      </td>
      <td rel="v-s:owner" data-template="v-ui:LabelTemplate"></td>
      <td rel="v-s:hasDocumentKind" data-template="v-ui:LabelTemplate"></td>
      <td rel="v-s:initiator" data-template="v-ui:LabelTemplate"></td>
      <td rel="v-s:signedBy" data-template="v-ui:LabelTemplate"></td>
      <td rel="v-s:responsibleDepartment" data-template="v-ui:LabelTemplate"></td>
      <td property="v-s:title"></td>
      <td property="v-s:description"></td>
      <td property="rdfs:comment"></td>
      <td rel="v-s:attachment" data-template="v-ui:FileMinTemplate"></td>
    </tr>
  </tbody>
</table>
`;