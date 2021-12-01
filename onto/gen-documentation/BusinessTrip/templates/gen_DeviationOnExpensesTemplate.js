export const html = `
<div class="container sheet">
  <h2>
    <span about="@" property="rdf:type"></span>
    <small about="@" property="rdfs:label"></small>
  </h2>
  <span about="@" data-template="v-ui:RabbitHole"></span>
  <hr>
  <section id="deviationOnExpensesBundle">
    <h4 class="section-header" about="gen:DeviationOnExpensesBundle" property="rdfs:label"></h4>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <strong about="v-s:hasBusinessTripReasonDeviationOnExpenses" property="rdfs:label"></strong>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div rel="v-s:hasBusinessTripReasonDeviationOnExpenses" data-template="v-ui:LabelTemplate" class="view -edit -search"></div>
        <veda-control data-type="link" rel="v-s:hasBusinessTripReasonDeviationOnExpenses" class="-view edit search fulltext dropdown"></veda-control>
      </div>
    </div>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <strong about="v-s:description" property="rdfs:label"></strong>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div property="v-s:description" class="view -edit -search"></div>
        <veda-control data-type="text" property="v-s:description" class="-view edit search"></veda-control>
      </div>
    </div>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <strong about="v-s:attachment" property="rdfs:label" class="view edit -search"></strong>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div rel="v-s:attachment" data-template="v-ui:FileTemplateWithComment" data-embedded="true"></div>
        <veda-control data-type="file"  rel="v-s:attachment" class="-view edit -search"></veda-control>
      </div>
    </div>
  </section>

  <hr>
  <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
  <br>
  <!-- BUTTONS -->
  <div class="actions view edit -search">
    <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="edit save cancel delete journal"></span>
  </div>
</div>
`;