export const html = `
<table class="table table-bordered">
  <thead class="result-header">
    <tr>
      <th colspan="9" about="gen:InternalDocument" property="rdfs:label"></th>
    </tr>
    <tr class="active">
      <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
      <th class="orderby" data-orderby="v-s:registrationNumber">№</th>
      <th><span about="v-s:creator" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:created"><span about="v-s:created" property="rdfs:label"></span></th>
      <th><span about="v-s:hasDocumentKind" property="rdfs:label"></span></th>
      <th><span about="v-s:theme" property="rdfs:label"></span></th>
      <th><span about="v-s:content" property="rdfs:label"></span></th>
      <th><span about="rdfs:comment" property="rdfs:label"></span></th>
      <th><span about="v-s:attachment" property="rdfs:label"></span></th>
    </tr>
  </thead>
  <tbody class="result-container">
    <tr>
      <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
      <td property="v-s:registrationNumber"></td>
      <td rel="v-s:creator" data-template="v-ui:LabelTemplate"></td>
      <td property="v-s:created"></td>
      <td rel="v-s:hasDocumentKind" data-template="v-ui:LabelTemplate"></td>
      <td property="v-s:theme"></td>
      <td property="v-s:content"></td>
      <td property="rdfs:comment"></td>
      <td rel="v-s:attachment" data-template="v-ui:FileMinTemplate"></td>
     </tr>
  </tbody>
</table>
`;