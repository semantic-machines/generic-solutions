export const html = `
  <table class="table table-bordered">
    <thead class="result-header">
      <tr>
        <th colspan="8" about="v-s:ClassSpecification" property="rdfs:label"></th>
      </tr>
      <tr class="active">
        <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
        <th><span about="v-ui:forClass" property="rdfs:label"></span></th>
        <th><span about="v-s:dateProperties" property="rdfs:label"></span></th>
        <th><span about="v-s:shelfLife" property="rdfs:label"></span></th>
        <th><span about="v-s:responsible" property="rdfs:label"></span></th>
        <th><span about="v-s:hasApplication" property="rdfs:label"></span></th>
        <th><span about="v-s:hasAspect" property="rdfs:label"></span></th>
      </tr>
    </thead>
    <tbody class="result-container">
      <tr>
        <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
        <td rel="v-ui:forClass" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:dateProperties" data-template="v-ui:LabelTemplate"></td>
        <td property="v-s:shelfLife"></td>
        <td rel="v-s:responsible" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:hasApplication" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:hasAspect" data-template="v-ui:LabelTemplate"></td>
      </tr>
    </tbody>
  </table>
`;
