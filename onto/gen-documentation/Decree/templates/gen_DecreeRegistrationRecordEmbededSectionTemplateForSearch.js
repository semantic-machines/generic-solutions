export const html = `
  <div>
    <div class="container sheet">
      <section id="MainProperties">
        <h4 class="section-header" about="gen:DecreeRegistrationRecord" property="rdfs:label"></h4>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="gen:hasDecreeKind" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="gen:hasDecreeKind" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="gen:hasDecreeKind" class="view edit search fulltext"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:registrationNumber" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-7">
            <div property="v-s:registrationNumber" class="view -edit -search"></div>
            <veda-control data-type="text" property="v-s:registrationNumber" class="view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:registrationDate" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-7">
            <div property="v-s:registrationDate" class="view -edit search"></div>
            <veda-control property="v-s:registrationDate" data-type="date" class="view edit search"></veda-control>
          </div>
        </div>
      </section>
    </div>
  </div>
`;
