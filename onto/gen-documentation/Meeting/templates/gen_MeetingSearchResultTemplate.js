export const html = `
  <table class="table table-bordered">
    <thead class="result-header">
      <tr>
        <th colspan="10" about="v-s:Meeting" property="rdfs:label"></th>
      </tr>
      <tr class="active">
        <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
        <th class="orderby" data-orderby="v-s:registrationNumber" width="1%">#</th>
        <th class="orderby" data-orderby="v-s:creator"><span about="v-s:creator" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:created"><span about="v-s:created" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:theme"><span about="v-s:theme" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:dateFrom"><span about="v-s:dateFrom" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:responsibleDepartment"><span about="v-s:responsibleDepartment" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:agenda"><span about="v-s:agenda" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:meetingDecision"><span about="v-s:meetingDecision" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="gen:MeetingMemberBundle"><span about="gen:MeetingMemberBundle" property="rdfs:label"></span></th>
        <th class="orderby" colspan="2" data-orderby="gen:MeetingThirdPartyParticipantBundle">
          <span about="gen:MeetingThirdPartyParticipantBundle" property="rdfs:label"></span>
        </th>
        <th><span about="v-s:attachment" property="rdfs:label"></span></th>
      </tr>
    </thead>
    <tbody class="result-container">
      <tr>
        <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
        <td property="v-s:registrationNumber"></td>
        <td rel="v-s:creator" data-template="v-ui:LabelTemplate"></td>
        <td property="v-s:created"></td>
        <td property="v-s:theme"></td>
        <td property="v-s:dateFrom"></td>
        <td rel="v-s:responsibleDepartment" data-template="v-ui:LabelTemplate"></td>
        <td property="v-s:agenda"></td>
        <td property="v-s:meetingDecision"></td>
        <td rel="v-s:member" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:hasThirdPartyParticipant">
          <span rel="v-s:correspondentOrganization" data-template="v-ui:LabelTemplate"></span>
        </td>
        <td rel="v-s:hasThirdPartyParticipant">
          <span rel="v-s:correspondentPersonDescription" data-template="v-ui:LabelTemplate"></span>
        </td>
        <td rel="v-s:attachment" data-template="v-ui:FileMinTemplate"></td>
      </tr>
    </tbody>
  </table>
`;
