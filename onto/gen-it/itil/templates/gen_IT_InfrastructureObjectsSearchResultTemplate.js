export const html = `
  <table class="table table-bordered">
    <thead class="result-header">
      <tr>
        <th colspan="7" about="v-s:Request" property="rdfs:label"></th>
      </tr>
      <tr class="active">
        <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
        <th><span about="v-s:title" property="rdfs:label"></span></th>
        <th><span about="v-s:description" property="rdfs:label"></span></th>
        <th><span about="v-s:hasMaintenanceObjectKind" property="rdfs:label"></span></th>
        <th><span about="v-s:hasParentLink" property="rdfs:label"></span></th>
        <th><span about="v-s:hasLinkObject" property="rdfs:label"></span></th>
        <th><span about="v-s:proprietor" property="rdfs:label"></span></th>
        <th><span about="v-s:customer" property="rdfs:label"></span></th>
        <th><span about="v-s:operator" property="rdfs:label"></span></th>
        <th><span about="rdfs:comment" property="rdfs:label"></span></th>
        <th><span about="v-s:creator" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:created"><span about="v-s:created" property="rdfs:label"></span></th>
      </tr>
    </thead>
    <tbody class="result-container">
      <tr>
        <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
        <td property="v-s:title"></td>
        <td property="v-s:description"></td>
        <td rel="v-s:hasMaintenanceObjectKind" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:hasParentLink" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:hasLinkObject" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:proprietor" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:customer" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:operator" data-template="v-ui:LabelTemplate"></td>
        <td property="rdfs:comment"></td>
        <td rel="v-s:creator" data-template="v-ui:LabelTemplate"></td>
        <td property="v-s:created"></td>
      </tr>
    </tbody>
  </table>
`;
