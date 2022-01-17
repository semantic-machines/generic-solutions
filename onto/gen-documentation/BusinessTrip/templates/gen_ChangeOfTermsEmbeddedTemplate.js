export const html = `
  <section id="changeOfTerms">
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <em about="gen:datesChangesBundle" property="rdfs:label"></em>
      </div>
      <div class="col-sm-3 col-xs-3">
        <div property="v-s:dateFrom" class="view -edit search"></div>
        <veda-control property="v-s:dateFrom" data-type="date" class="-view edit search"></veda-control>
      </div>
      <div class="col-sm-3 col-xs-3">
        <div property="v-s:dateTo" class="view -edit search"></div>
        <veda-control property="v-s:dateTo" data-type="date" class="-view edit search"></veda-control>
      </div>
    </div>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <em about="v-s:duration" property="rdfs:label"></em>
      </div>
      <div class="col-sm-3 col-xs-3">
        <div property="v-s:duration" class="view -edit search"></div>
        <veda-control data-type="decimal" property="v-s:duration" class="-view edit search"></veda-control>
      </div>
    </div>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <em about="v-s:hasStatus" property="rdfs:label"></em>
      </div>
      <div class="col-sm-3 col-xs-3">
        <div rel="v-s:hasStatus" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
        <veda-control data-type="link" rel="v-s:hasStatus" class="-view edit search fulltext dropdown"></veda-control>
      </div>
    </div>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <em about="rdfs:comment" property="rdfs:label"></em>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div property="rdfs:comment" class="view -edit search"></div>
        <veda-control data-type="text" property="rdfs:comment" class="-view edit search"></veda-control>
      </div>
    </div>
  </section>
`;
