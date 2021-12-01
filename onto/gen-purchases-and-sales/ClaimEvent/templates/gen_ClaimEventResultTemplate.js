export const html = `
<table class="table table-bordered">
  <thead class="result-header">
    <tr>
      <th colspan="17" about="v-s:ClaimEvent" property="rdfs:label"></th>
    </tr>
    <tr class="active">
      <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
      <th width="10%" class="orderby" data-orderby="v-s:creator"><span about="v-s:creator" property="rdfs:label"></span></th>
      <th width="10%" class="orderby" data-orderby="v-s:created"><span about="v-s:created" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:registrationNumber"><span about="v-s:registrationNumber" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:hasStatus"><span about="v-s:hasStatus" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="gen:ClaimEvent_EventDate_Bundle"><span about="v-s:date" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:theme"><span about="v-s:theme" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:initiator"><span about="v-s:initiator" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="gen:ClaimEvent_Departments_Bundle"><span about="v-s:responsibleDepartment" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="gen:ClaimEvent_Contract_Bundle"><span about="v-s:content" property="rdfs:label"></span></th>
  </thead>
  <tbody class="result-container">
   <tr>
      <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
      <td rel="v-s:creator" data-template="v-ui:LabelTemplate"></td>
      <td property="v-s:created"></td>
      <td property="v-s:registrationNumber"></td>
      <td rel="v-s:hasStatus" data-template="v-ui:LabelTemplate"></td>
      <td property="v-s:date"></td>
      <td property="v-s:theme"></td>
      <td rel="v-s:initiator" data-template="v-ui:LabelTemplate"></td>
      <td rel="v-s:responsibleDepartment" data-template="v-ui:LabelTemplate"></td>
      <td property="v-s:content"></td>
    </tr>
  </tbody>
</table>
`;