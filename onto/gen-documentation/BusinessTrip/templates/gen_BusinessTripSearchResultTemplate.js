export const html = `
<table class="table table-bordered">
  <thead class="result-header">
    <tr>
      <th colspan="15" about="gen:BusinessTrip" property="rdfs:label"></th>
    </tr>
    <tr class="active">
      <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
      <th><span about="v-s:creator" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:hasBusinessTripRegistrationRecord.v-s:registrationNumber">№</th>
      <th class="orderby" data-orderby="v-s:hasBusinessTripRegistrationRecord.v-s:registrationDate"><span about="v-s:registrationDate" property="rdfs:label"></span></th>
      <th><span about="v-s:businessTripEmployee" property="rdfs:label"></span></th>
      <th><span about="v-s:businessTripDepartment" property="rdfs:label"></span></th>
      <th><span about="v-s:businessTripGoal" property="rdfs:label"></span></th>
      <th><span about="gen:businessTripOrganization" property="rdfs:label"></span></th>
      <th><span about="v-s:hasClassifierCountry" property="rdfs:label"></span></th>
      <th><span about="gen:businessTripOrganizationDescription" property="rdfs:label"></span></th>
      <th><span about="gen:hasBusinessTripTransportKind" property="rdfs:label"></span></th>
      <th><span about="v-s:dateTo" property="rdfs:label"></span></th>
      <th><span about="v-s:dateFrom" property="rdfs:label"></span></th>
      <th><span about="v-s:duration" property="rdfs:label"></span></th>
    </tr>
  </thead>
  <tbody class="result-container">
    <tr>
      <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
      <td rel="v-s:creator" data-template="v-ui:LabelTemplate"></td>
      <td rel="v-s:hasBusinessTripRegistrationRecord">
        <span property="v-s:registrationNumber"></span>
      </td>
      <td rel="v-s:hasBusinessTripRegistrationRecord">
        <span property="v-s:registrationDate"></span>
      </td>
      <td rel="v-s:businessTripEmployee" data-template="v-ui:LabelTemplate"></td>
      <td rel="v-s:businessTripDepartment" data-template="v-ui:LabelTemplate"></td>
      <td property="v-s:businessTripGoal"></td>
      <td property="gen:businessTripOrganization"></td>
      <td rel="v-s:hasClassifierCountry" data-template="v-ui:LabelTemplate"></td>
      <td property="gen:businessTripOrganizationDescription"></td>
      <td rel="gen:hasBusinessTripTransportKind" data-template="v-ui:LabelTemplate"></td>
      <td property="v-s:dateTo"></td>
      <td property="v-s:dateFrom"></td>
      <td property="v-s:duration"></td>
    </tr>
  </tbody>
</table>
`;
