export const html = `
  <table class="table table-bordered">
    <thead class="result-header">
      <tr>
        <th colspan="7" about="v-s:Request" property="rdfs:label"></th>
      </tr>
      <tr class="active">
        <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
        <th class="orderby" data-orderby="v-s:dateFrom"><span about="v-s:dateFrom" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:dateTo"><span about="v-s:dateTo" property="rdfs:label"></span></th>
        <th><span about="gen:hasIT_InfrastructureObjects" property="rdfs:label"></span></th>
        <th><span about="v-s:theme" property="rdfs:label"></span></th>
        <th><span about="v-s:description" property="rdfs:label"></span></th>
      </tr>
    </thead>
    <tbody class="result-container">
      <tr>
        <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
        <td property="v-s:dateFrom"></td>
        <td property="v-s:dateTo"></td>
        <td property="gen:hasIT_InfrastructureObjects"></td>
        <td property="v-s:theme"></td>
        <td property="v-s:description"></td>
        <td rel="v-s:creator" data-template="v-ui:LabelTemplate"></td>
        <td property="v-s:created"></td>
      </tr>
    </tbody>
  </table>
`;
