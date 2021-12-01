export const html = `
<section id="RepresentativeCosts2">
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <em about="v-s:responsible" property="rdfs:label"></em>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:responsible" class="view -edit -search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:responsible" class="-view edit search fulltext"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <em about="v-s:dateTo" property="rdfs:label"></em>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div property="v-s:dateTo" class="view -edit -search"></div>
          <veda-control data-type="date" property="v-s:dateTo" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <em about="v-s:description" property="rdfs:label"></em>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div property="v-s:description" class="view -edit -search"></div>
          <veda-control data-type="text" property="v-s:description" class="-view edit search"></veda-control>
        </div>
      </div>
    </section>
`;