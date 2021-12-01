export const html = `
<table class="table table-bordered">
  <thead class="result-header">
    <tr>
      <th colspan="14" about="gen:RepresentativeCosts" property="rdfs:label"></th>
    </tr>
    <tr class="active">
      <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
      <th><span about="v-s:creator" property="rdfs:label"></span></th>
      <th><span about="v-s:stakeholder" property="rdfs:label"></span></th>
      <th><span about="v-s:goal" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:dateFrom"><span about="v-s:dateFrom" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:dateTo"><span about="v-s:dateTo" property="rdfs:label"></span></th>
      <th><span about="v-s:placeDescription" property="rdfs:label"></span></th>
      <th><span about="v-s:count" property="rdfs:label"></span></th>
      <th><span about="v-s:participant" property="rdfs:label"></span></th>
      <th><span about="v-s:hasThirdPartyParticipant" property="rdfs:label"></span></th>
      <th><span about="v-s:hasPaymentForm" property="rdfs:label"></span></th>
      <th><span about="gen:representativeCostsReport" property="rdfs:label"></span></th>
      <th><span about="v-s:attachment" property="rdfs:label"></span></th>

    </tr>
  </thead>
  <tbody class="result-container">
    <tr>
      <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
      <td rel="v-s:creator" data-template="v-ui:LabelTemplate"></td>
      <td rel="v-s:stakeholder" data-template="v-ui:LabelTemplate"></td>
      <td property="v-s:goal"></td>
      <td property="v-s:dateFrom"></td>
      <td property="v-s:dateTo"></td>
      <td property="v-s:placeDescription"></td>
      <td property="v-s:count"></td>
      <td rel="v-s:participant" data-template="v-ui:LabelTemplate"></td>
      <td rel="v-s:hasThirdPartyParticipant">
        <span rel="v-s:correspondentOrganization" data-template="v-ui:LabelTemplate"></span>
      </td>
      <td rel="v-s:hasPaymentForm" data-template="v-ui:LabelTemplate"></td>
      <td property="gen:representativeCostsReport"></td>
      <td property="v-s:attachment" data-template="v-ui:LabelTemplate"></td>
     </tr>
  </tbody>
</table>
`;