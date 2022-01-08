export const html = `
  <section id="RegNumber">
    <h4 class="section-header">
      <span about="@" data-template="v-ui:IconModalTemplate" class="view edit -search"></span>
      <span about="gen:DecreeRegistrationRecord" property="rdfs:label"></span>
      <b>
        <span class="view edit -search">#</span>
        <span about="@" property="v-s:registrationNumber" class="view edit -search"></span>
        <span class="view edit -search">/</span>
        <span about="@" property="v-s:registrationDate" class="view edit -search"></span>
      </b>
    </h4>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <label about="gen:hasDecreeKind" property="rdfs:label"></label>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div rel="gen:hasDecreeKind" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
        <veda-control data-type="link" rel="gen:hasDecreeKind" class="-view edit search fulltext"></veda-control>
      </div>
    </div>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <label about="v-s:attachment" property="rdfs:label"></label>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div rel="v-s:attachment" data-template="v-ui:FileTemplateWithComment" data-embedded="true"></div>
        <veda-control data-type="file" rel="v-s:attachment" class="-view edit -search"></veda-control>
      </div>
    </div>
  </section>
`;
