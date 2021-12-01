export const html = `
<div class="container sheet">
  <h2>
    <span about="@" property="rdf:type"></span>
    <small about="@" property="rdfs:label"></small>
  </h2>
  <span about="@" data-template="v-ui:RabbitHole"></span>
  <hr>
  <section id="RepresentativeCosts">
    <h4 class="section-header" about="gen:RepresentativeCostsForEvent" property="rdfs:label"></h4>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <strong about="gen:hasRepresentativeCostsKind" property="rdfs:label"></strong>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="gen:hasRepresentativeCostsKind" class="view -edit -search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="gen:hasRepresentativeCostsKind" class="-view edit search fulltext dropdown"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <strong about="v-s:hasCurrency" property="rdfs:label"></strong>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:hasCurrency" class="view -edit -search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:hasCurrency" class="-view edit search fulltext dropdown"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <strong about="v-s:sum" property="rdfs:label"></strong>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div property="v-s:sum" class="view -edit -search"></div>
          <veda-control data-type="decimal" property="v-s:sum" class="-view edit search"></veda-control>
        </div>
      </div>
  </section>
  <hr>
  <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
  <br>
  <!-- BUTTONS -->
  <div class="actions view edit -search">
    <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="edit save cancel delete journal "></span>
  </div>
</div>
`;