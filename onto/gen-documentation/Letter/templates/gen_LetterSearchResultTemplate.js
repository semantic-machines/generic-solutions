export const html = `
  <table class="table table-bordered">
    <thead class="result-header">
      <tr>
        <th colspan="2" about="gen:Letter" property="rdfs:label"></th>
        <th colspan="3" about="v-s:sender" property="rdfs:label"></th>
        <th colspan="3" about="v-s:recipient" property="rdfs:label"></th>
        <th colspan="11" about="gen:Letter" property="rdfs:label"></th>
      </tr>
      <tr class="active">
        <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
        <th class="orderby" data-orderby="v-s:created"><span about="v-s:created" property="rdfs:label"></span></th>
        <th><span about="v-s:hasLetterRegistrationRecordSender" property="rdfs:label"></span></th>
        <th><span about="v-s:correspondentOrganization" property="rdfs:label"></span></th>
        <th><span about="v-s:correspondentPerson" property="rdfs:label"></span></th>
        <th width="10%" class="orderby" data-orderby="v-s:hasLetterRegistrationRecordRecipient.v-s:registrationNumber">
          <span about="v-s:hasLetterRegistrationRecordRecipient" property="rdfs:label"></span>
        </th>
        <th><span about="v-s:correspondentOrganization" property="rdfs:label"></span></th>
        <th><span about="v-s:correspondentPerson" property="rdfs:label"></span></th>

        <th><span about="v-s:hasDocumentKind" property="rdfs:label"></span></th>
        <th width="10%" class="orderby" data-orderby="v-s:dueDate"><span about="v-s:dueDate" property="rdfs:label"></span></th>
        <th width="10%" class="orderby" data-orderby="v-s:sheetsCount"><span about="v-s:sheetsCount" property="rdfs:label"></span></th>
        <th><span about="v-s:hasDelivery" property="rdfs:label"></span></th>
        <th><span about="v-s:description" property="rdfs:label"></span></th>
        <th><span about="rdfs:comment" property="rdfs:label"></span></th>
        <th><span about="v-s:attachment" property="rdfs:label"></span></th>
        <th><span about="v-s:creator" property="rdfs:label"></span></th>
        <th><span about="v-s:hasLink" property="rdfs:label"></span></th>
      </tr>
    </thead>
    <tbody class="result-container">
      <tr>
        <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
        <td property="v-s:created"></td>
        <td rel="v-s:hasLetterRegistrationRecordSender">
          <div>
            <span property="v-s:registrationNumber"></span>
            <span property="v-s:registrationDate"></span>
          </div>
        </td>
        <td rel="v-s:sender">
          <span rel="v-s:correspondentOrganization" data-template="v-ui:LabelTemplate"></span>
        </td>
        <td rel="v-s:sender">
          <div>
            <span rel="v-s:correspondentPerson" data-template="v-ui:LabelTemplate"></span>
            <span property="v-s:correspondentPersonDescription"></span>
          </div>
        </td>
        <td rel="v-s:hasLetterRegistrationRecordRecipient">
          <div>
            <span property="v-s:registrationNumber"></span>
            <span property="v-s:registrationDate"></span>
          </div>
        </td>
        <td rel="v-s:recipient">
          <span rel="v-s:correspondentOrganization" data-template="v-ui:LabelTemplate"></span>
        </td>
        <td rel="v-s:recipient">
          <div>
            <span rel="v-s:correspondentPerson" data-template="v-ui:LabelTemplate"></span>
            <span property="v-s:correspondentPersonDescription"></span>
          </div>
        </td>
        <td rel="v-s:hasDocumentKind" data-template="v-ui:LabelTemplate"></td>
        <td property="v-s:dueDate"></td>
        <td property="v-s:sheetsCount"></td>
        <td rel="v-s:hasDelivery">
          <div>
            <span property="v-s:date"></span>
            <span property="v-s:deliverBy"></span>
            <span property="rdfs:comment"></span> ;
          </div>
        </td>
        <td property="v-s:description"></td>
        <td property="rdfs:comment"></td>
        <td rel="v-s:attachment" data-template="v-ui:FileMinTemplate"></td>
        <td rel="v-s:creator" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:hasLink">
          <div>
            <span property="v-s:from"></span>
            <span property="v-s:to"></span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
`;
