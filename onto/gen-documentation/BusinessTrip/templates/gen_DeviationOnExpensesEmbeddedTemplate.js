export const html = `
<section id="deviationOnExpensesBundle">
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <em about="v-s:hasBusinessTripReasonDeviationOnExpenses" property="rdfs:label"></em>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div rel="v-s:hasBusinessTripReasonDeviationOnExpenses" data-template="v-ui:LabelTemplate" class="view -edit search"></div>
        <veda-control data-type="link" rel="v-s:hasBusinessTripReasonDeviationOnExpenses" class="-view edit search fulltext dropdown"></veda-control>
      </div>
    </div>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <em about="v-s:description" property="rdfs:label"></em>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div property="v-s:description" class="view -edit search"></div>
        <veda-control data-type="text" property="v-s:description" class="-view edit search"></veda-control>
      </div>
    </div>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <em about="v-s:attachment" property="rdfs:label" class="view edit -search"></em>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div rel="v-s:attachment" data-template="v-ui:FileTemplateWithComment" data-embedded="true"></div>
        <veda-control data-type="file"  rel="v-s:attachment" class="-view edit -search"></veda-control>
      </div>
    </div>
  </section>
`;