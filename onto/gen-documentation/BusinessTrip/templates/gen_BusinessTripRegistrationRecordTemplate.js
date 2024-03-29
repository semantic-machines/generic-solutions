export const html = `
  <div class="container sheet">
    <h2>
      <span about="@" property="rdf:type"></span>
      <small about="@" property="rdfs:label"></small>
    </h2>
    <span about="@" data-template="v-ui:RabbitHole"></span>
    <hr />
    <section id="gen:RegNumBusinessTripBundle">
      <h4 class="section-header" about="v-s:BusinessTripRegistrationRecord" property="rdfs:label"></h4>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <em about="gen:RegNumBusinessTripBundle" property="rdfs:label"></em>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div property="v-s:registrationNumber" class="view -edit -search"></div>
          <veda-control data-type="text" property="v-s:registrationNumber" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <em about="v-s:registrationDate" property="rdfs:label"></em>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div property="v-s:registrationDate" class="view -edit search"></div>
          <veda-control property="v-s:registrationDate" data-type="date" class="-view edit search"></veda-control>
        </div>
      </div>
    </section>
    <hr />
    <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
    <br />
    <!-- BUTTONS -->
    <div class="actions view edit -search">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="edit save cancel delete -journal "></span>
    </div>
  </div>
`;
