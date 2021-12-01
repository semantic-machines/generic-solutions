export const html = `
<section id="gen:RegNumBusinessTripBundle">
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
        <em about="v-s:registrationDate" property="rdfs:label" ></em>
      </div>
      <div class="col-sm-3 col-xs-3">
        <div property="v-s:registrationDate" class="view -edit search"></div>
        <veda-control property="v-s:registrationDate" data-type="date" class="-view edit search"></veda-control>
      </div>
    </div>
  </section>
`;