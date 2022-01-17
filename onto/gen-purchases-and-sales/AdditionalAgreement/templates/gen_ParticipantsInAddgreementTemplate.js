export const html = `
  <table class="table no-margin">
    <thead>
      <tr>
        <th about="v-s:hasRoleInContract" data-template="v-ui:LabelTemplate"></th>
        <th about="v-s:hasContractor" property="rdfs:label"></th>
        <th about="v-s:hasOrganization" property="rdfs:label"></th>
        <th about="rdfs:comment" property="rdfs:label"></th>
      </tr>
    </thead>
    <tbody rel="v-s:hasContractParticipantSupplier" data-template="gen:ContractParticipantEmbeddedTemplate" data-embedded="true"></tbody>
  </table>
  <div class="row row-attribute">
    <div class="col-sm-1 col-xs-1">
      <veda-control rel="v-s:hasContractParticipantSupplier" data-type="link" class="-view edit search create"></veda-control>
    </div>
    <div class="col-sm-11 col-xs-9">
      <label about="gen:addContractParticipantSupplier" property="rdfs:label" class="-view edit -search"></label>
    </div>
  </div>
  <br />
  <table class="table no-margin">
    <tbody rel="v-s:hasContractParticipantCustomer" data-template="gen:ContractParticipantEmbeddedTemplate" data-embedded="true"></tbody>
  </table>
  <div class="row row-attribute">
    <div class="col-sm-1 col-xs-1">
      <veda-control rel="v-s:hasContractParticipantCustomer" data-type="link" class="-view edit search create"></veda-control>
    </div>
    <div class="col-sm-11 col-xs-9">
      <label about="gen:addContractParticipantCustomer" property="rdfs:label" class="-view edit -search"></label>
    </div>
  </div>
  <br />
  <table class="table no-margin">
    <tbody rel="v-s:hasContractParticipantStakeholder" data-template="gen:ContractParticipantEmbeddedTemplate" data-embedded="true"></tbody>
  </table>
  <div class="row row-attribute">
    <div class="col-sm-1 col-xs-1">
      <veda-control rel="v-s:hasContractParticipantStakeholder" data-type="link" class="-view edit search create"></veda-control>
    </div>
    <div class="col-sm-11 col-xs-9">
      <label about="gen:addContractParticipantStakeholder" property="rdfs:label" class="-view edit -search"></label>
    </div>
  </div>
`;
