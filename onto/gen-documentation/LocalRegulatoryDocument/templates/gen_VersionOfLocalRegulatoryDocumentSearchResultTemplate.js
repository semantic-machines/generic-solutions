export const html = `
  <table class="table table-bordered">
    <thead class="result-header">
      <tr>
        <th colspan="11" about="v-s:LocalRegulatoryDocument" property="rdfs:label"></th>
      </tr>
      <tr class="active">
        <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
        <th class="orderby" data-orderby="v-s:registrationNumber">№</th>
        <th class="orderby" data-orderby="v-s:registrationNumberAdd"><span about="v-s:registrationNumberAdd" property="rdfs:label"></span></th>
        <th><span about="v-s:creator" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:registrationDate"><span about="v-s:registrationDate" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:valid"><span about="v-s:valid" property="rdfs:label"></span></th>
        <th><span about="v-s:title" property="rdfs:label"></span></th>
        <th><span about="v-s:initiator" property="rdfs:label"></span></th>
        <th><span about="v-s:signedBy" property="rdfs:label"></span></th>
        <th><span about="rdfs:comment" property="rdfs:label"></span></th>
        <th><span about="v-s:hasDocumentKind" property="rdfs:label"></span></th>
      </tr>
    </thead>
    <tbody class="result-container">
      <tr>
        <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
        <td property="v-s:registrationNumber"></td>
        <td property="v-s:registrationNumberAdd"></td>
        <td rel="v-s:creator" data-template="v-ui:LabelTemplate"></td>
        <td property="v-s:registrationDate"></td>
        <td property="v-s:valid"></td>
        <td property="v-s:title"></td>
        <td rel="v-s:initiator" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:signedBy" data-template="v-ui:LabelTemplate"></td>
        <td property="rdfs:comment"></td>
        <td rel="v-s:hasDocumentKind" data-template="v-ui:LabelTemplate"></td>
      </tr>
    </tbody>
  </table>
`;
