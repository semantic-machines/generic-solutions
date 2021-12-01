export const html = `
<table class="table table-bordered">
  <thead class="result-header">
    <tr>
      <th colspan="7" about="v-s:Request" property="rdfs:label"></th>
    </tr>
    <tr class="active">
      <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
      <th><span about="v-s:title" property="rdfs:label"></span></th>
      <th><span about="v-s:from" property="rdfs:label"></span></th>
      <th><span about="v-s:to" property="rdfs:label"></span></th>
      <th><span about="rdfs:comment" property="rdfs:label"></span></th>
      <th><span about="v-s:creator" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:created"><span about="v-s:created" property="rdfs:label"></span></th>
    </tr>
  </thead>
  <tbody class="result-container">
    <tr>
      <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
      <td property="v-s:title"></td>
      <td rel="v-s:from" data-template="v-ui:LabelTemplate"></td>
      <td rel="v-s:to" data-template="v-ui:LabelTemplate"></td>
      <td property="rdfs:comment"></td>
      <td rel="v-s:creator" data-template="v-ui:LabelTemplate"></td>
      <td property="v-s:created"></td>
    </tr>
  </tbody>
</table>
`;