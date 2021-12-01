export const html = `
<!--И тут тоже что то надо добавить -->
<table class="table table-bordered">
  <thead class="result-header">
    <tr>
      <th colspan="13" about="v-s:Claim" property="rdfs:label"></th>
    </tr>
    <tr class="active">
      <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
      <th width="10%" class="orderby" data-orderby="v-s:creator"><span about="v-s:creator" property="rdfs:label"></span></th>
      <th width="10%" class="orderby" data-orderby="v-s:created"><span about="v-s:created" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:sender"><span about="v-s:sender" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:registrationNumberOut"><span about="v-s:registrationNumberOut" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:registrationDateOut"><span about="v-s:registrationDateOut" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:recipient"><span about="v-s:recipient" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:registrationNumberIn"><span about="v-s:registrationNumberIn" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:registrationDateIn"><span about="v-s:registrationDateIn" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:hasStatus"><span about="v-s:hasStatus" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:hasDecision"><span about="v-s:hasStatus" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:claimRequirement"><span about="gen:ClaimRequirement_Bundle" property="rdfs:label"></span></th>
      <th class="orderby" data-orderby="v-s:reportDescription"><span about="gen:ReportDescription_Bundle" property="rdfs:label"></span></th>
    </tr>
  </thead>
  <tbody class="result-container">
    <tr>
      <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
      <td rel="v-s:creator" data-template="v-ui:LabelTemplate"></td>
      <td property="v-s:created"></td>
      <td rel="v-s:sender">
        <div>
          <span rel="v-s:correspondentOrganization" data-template="v-ui:LabelTemplate"></span>
          <span property="v-s:correspondentOrganizationDescription"></span>
        </div>
      </td>
      <td rel="v-s:hasLetterRegistrationRecordSender">
        <span property="v-s:registrationNumber"></span>
      </td>
      <td rel="v-s:hasLetterRegistrationRecordSender">
        <span property="v-s:registrationDate"></span>
      </td>
      <td rel="v-s:recipient">
        <div>
          <span rel="v-s:correspondentOrganization" data-template="v-ui:LabelTemplate"></span>
          <span property="v-s:correspondentOrganizationDescription"></span>
        </div>
      </td>
      <td rel="v-s:hasLetterRegistrationRecordRecipient">
        <span property="v-s:registrationNumber"></span>
      </td>
      <td rel="v-s:hasLetterRegistrationRecordRecipient">
        <span property="v-s:registrationDate"></span>
      </td>
      <td rel="v-s:hasStatus" data-template="v-ui:LabelTemplate"></td>
      <td rel="v-s:hasDecision" data-template="v-ui:LabelTemplate"></td>
      <td property="v-s:claimRequirement"></td>
      <td property="v-s:reportDescription"></td>
    </tr>
  </tbody>
</table>
`;