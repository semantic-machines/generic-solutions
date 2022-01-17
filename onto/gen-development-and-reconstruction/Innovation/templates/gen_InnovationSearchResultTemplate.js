export const html = `
  <table class="table table-bordered">
    <thead class="result-header">
      <tr>
        <th colspan="11" about="v-s:Idea" property="rdfs:label"></th>
      </tr>
      <tr class="active">
        <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
        <th class="orderby" data-orderby="v-s:registrationNumber">№</th>
        <th><span about="v-s:creator" property="rdfs:label"></span></th>
        <th><span about="v-s:hasStatus" property="rdfs:label"></span></th>
        <th><span about="v-s:title" property="rdfs:label"></span></th>
        <th><span about="v-s:actualState" property="rdfs:label"></span></th>
        <th><span about="v-s:description" property="rdfs:label"></span></th>
        <th><span about="v-s:hasSector" property="rdfs:label"></span></th>
        <th><span about="v-s:attachment" property="rdfs:label"></span></th>
        <th><span about="v-s:author" property="rdfs:label"></span></th>
        <th><span about="v-s:stakeholder" property="rdfs:label"></span></th>
      </tr>
    </thead>
    <tbody class="result-container">
      <tr>
        <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
        <td property="v-s:registrationNumber"></td>
        <td rel="v-s:creator" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:hasStatus" data-template="v-ui:LabelTemplate"></td>
        <td property="v-s:title"></td>
        <td property="v-s:actualState"></td>
        <td property="v-s:description"></td>
        <td rel="v-s:hasSector" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:attachment" data-template="v-ui:FileMinTemplate"></td>
        <td rel="v-s:author" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:stakeholder" data-template="v-ui:LabelTemplate"></td>
      </tr>
    </tbody>
  </table>
`;
