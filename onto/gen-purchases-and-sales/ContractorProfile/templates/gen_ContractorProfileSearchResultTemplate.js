export const html = `
<table class="table table-bordered">
  <thead class="result-header">
    <tr>
      <th colspan="4" about="v-s:ContractorProfile" property="rdfs:label"></th>
    </tr>
    <tr class="active">
      <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
      <th class="orderby" data-orderby="rdfs:label"><span about="rdfs:label" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="rdfs:comment"><span about="rdfs:comment" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:hasClassifierOKVED"><span about="v-s:hasClassifierOKVED" property="rdfs:label"></span></th>
    </tr>
  </thead>
  <tbody class="result-container">
    <tr>
      <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
      <td property="rdfs:label"></td>
      <td property="rdfs:comment"></td>
      <td rel="v-s:hasClassifierOKVED" data-template="v-ui:LabelTemplate"></td>
    </tr>
  </tbody>
</table>
`;