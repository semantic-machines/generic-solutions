export const html = `
  <tr>
    <td about="@" data-template="v-ui:IconModalTemplate"></td>
    <td>
      <veda-control property="v-s:registrationNumber" data-type="text" class="-view edit search"></veda-control>
      <div property="v-s:registrationNumber" class="view -edit -search"></div>
    </td>
    <td>
      <div class="view -edit -search" rel="v-s:hasContractScope" data-template="v-ui:LabelTemplate"></div>
      <veda-control data-type="link" rel="v-s:hasContractScope" class="-view edit search fulltext"></veda-control>
    </td>
    <td>
      <veda-control property="v-s:theme" data-type="string" class="-view edit search"></veda-control>
      <div property="v-s:theme" class="view -edit -search"></div>
    </td>
    <td>
      <div class="view -edit -search" rel="v-s:initiator" data-template="v-ui:LabelTemplate"></div>
      <veda-control data-type="link" rel="v-s:initiator" class="-view edit search fulltext"></veda-control>
    </td>
  </tr>
`;
