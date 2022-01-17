export const html = `
<table class="table table-bordered">
  <thead class="result-header">
    <tr>
      <th colspan="10" about="v-s:Action" property="rdfs:label"></th>
      <th colspan="3" about="v-s:Meeting" property="rdfs:label"></th>
    </tr>
    <tr class="active">
      <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
      <th class="orderby" data-orderby="v-s:registrationNumber" width="1%">#</th>
      <th class="orderby" data-orderby="v-s:creator"><span about="v-s:creator" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:created"><span about="v-s:created" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:description"><span about="v-s:description" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:responsible"><span about="v-s:responsible" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:contributor"><span about="v-s:contributor" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:controller"><span about="v-s:controller" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:dateToPlan"><span about="v-s:dateToPlan" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:hasStatus"><span about="v-s:hasStatus" property="rdfs:label"></span></th>

      <th class="orderby" data-orderby="v-s:backwardTarget.v-s:registrationNumber"><span about="v-s:registrationNumber" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:backwardTarget.v-s:dateFrom"><span about="v-s:dateFrom" property="rdfs:label"></span>
      <th class="orderby" data-orderby="v-s:backwardTarget.v-s:theme"><span about="v-s:theme" property="rdfs:label"></span></th>
</th>
    </tr>
  </thead>
  <tbody class="result-container">
    <tr>
      <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
      <td property="v-s:registrationNumber"></td>
      <td rel="v-s:creator" data-template="v-ui:LabelTemplate"></td>
      <td property="v-s:created"></td>
      <td property="v-s:description"></td>
      <td rel="v-s:responsible" data-template="v-ui:LabelTemplate"></td>
      <td rel="v-s:contributor" data-template="v-ui:LabelTemplate"></td>
      <td rel="v-s:controller" data-template="v-ui:LabelTemplate"></td>
      <td property="v-s:dateToPlan"></td>
      <td rel="v-s:hasStatus" data-template="v-ui:LabelTemplate"></td>
      <td rel="v-s:backwardTarget"><span property="v-s:registrationNumber"></span></td>
      <td rel="v-s:backwardTarget"><span property="v-s:dateFrom"></span></td>
      <td rel="v-s:backwardTarget"><span property="v-s:theme"></span></td>
    </tr>
  </tbody>
</table>
`;
