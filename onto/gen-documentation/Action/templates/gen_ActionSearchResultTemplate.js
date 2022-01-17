export const html = `
  <table class="table table-bordered">
    <thead class="result-header">
      <tr>
        <th colspan="11" about="v-s:Action" property="rdfs:label"></th>
      </tr>
      <tr class="active">
        <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
        <th><span about="v-s:hasStatus" property="rdfs:label"></span></th>
        <th><span about="v-s:responsible" property="rdfs:label"></span></th>
        <th><span about="v-s:responsibleDepartment" property="rdfs:label"></span></th>
        <th><span about="v-s:responsibleOrganization" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:datePlan"><span about="v-s:datePlan" property="rdfs:label"></span></th>
        <th><span about="v-s:taskDescription" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:dateFact"><span about="v-s:dateFact" property="rdfs:label"></span></th>
        <th><span about="v-s:reportDescription" property="rdfs:label"></span></th>
        <th><span about="v-s:creator" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:created"><span about="v-s:created" property="rdfs:label"></span></th>
      </tr>
    </thead>
    <tbody class="result-container">
      <tr>
        <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
        <td rel="v-s:hasStatus" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:responsible" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:responsibleDepartment" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:responsibleOrganization" data-template="v-ui:LabelTemplate"></td>
        <td property="v-s:datePlan"></td>
        <td property="v-s:taskDescription"></td>
        <td property="v-s:dateFact"></td>
        <td property="v-s:reportDescription"></td>
        <td rel="v-s:creator" data-template="v-ui:LabelTemplate"></td>
        <td property="v-s:created"></td>
      </tr>
    </tbody>
  </table>
`;
