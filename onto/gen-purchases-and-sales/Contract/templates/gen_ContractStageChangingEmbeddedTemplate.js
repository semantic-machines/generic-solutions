export const html = `
<tr>
  <td about="@" data-template="v-ui:IconModalTemplate"></td>
  <td>
    <div class="view -edit -search" property="v-s:date"></div>
    <veda-control data-type="date" property="v-s:date" class="-view edit search"></veda-control>
  </td>
  <td>
    <div class="view -edit -search" rel="gen:hasContractStage" data-template="v-ui:LabelTemplate"></div>
    <veda-control data-type="link" rel="gen:hasContractStage" class="-view edit search fulltext dropdown"></veda-control>
  </td>
  <td>
    <div class="view -edit -search" rel="v-s:initiator" data-template="v-ui:LabelTemplate"></div>
    <veda-control data-type="link" rel="v-s:initiator" class="-view edit search fulltext"></veda-control>
  </td>
  <td>
    <veda-control property="rdfs:comment" data-type="string" class="-view edit search"></veda-control>
    <div property="rdfs:comment" class="view -edit -search"></div>
  </td>
</tr>
`;