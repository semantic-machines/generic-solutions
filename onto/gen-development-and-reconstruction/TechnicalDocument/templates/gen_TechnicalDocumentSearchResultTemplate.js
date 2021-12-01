export const html = `
<table class="table table-bordered">
  <thead class="result-header">
    <tr>
      <th colspan="13" about="v-s:TechnicalDocument" property="rdfs:label"></th>
    </tr>
    <tr class="active">
      <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
      <th class="orderby" data-orderby="v-s:registrationNumber">№</th>
      <th><span about="v-s:creator" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:created"><span about="v-s:created" property="rdfs:label"></span></th>
      <th><span about="v-s:registrationDate" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:created"><span about="v-s:registrationDate" property="rdfs:label"></span></th>
      <th><span about="v-s:title" property="rdfs:label"></span></th>
      <th><span about="v-s:hasLifecycleStage" property="rdfs:label"></span></th>
      <th><span about="v-s:hasClassifierSectionOfProjectDocumentation" property="rdfs:label"></span></th>
      <th><span about="v-s:hasDocumentKind" property="rdfs:label"></span></th>
      <th><span about="v-s:backwardTarget" property="rdfs:label"></span></th>
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
      <td property="v-s:shortLabel"></td>
      <td property="v-s:registrationDate"></td>
      <td property="v-s:title"></td>
      <td rel="v-s:hasLifecycleStage" data-template="v-ui:LabelTemplate"></td>
      <td rel="v-s:hasClassifierSectionOfProjectDocumentation" data-template="v-ui:LabelTemplate"></td>
      <td rel="v-s:hasDocumentKind" data-template="v-ui:LabelTemplate"></td>
      <td rel="v-s:backwardTarget" data-template="v-ui:LabelTemplate"></td>
      <td property="rdfs:comment"></td>
      <td rel="v-s:attachment" data-template="v-ui:FileMinTemplate"></td>
     </tr>
  </tbody>
</table>
`;