export const html = `
  <div class="container sheet">
    <h2>
      <span about="@" property="rdf:type"></span>
      <small about="@" property="rdfs:label"></small>
    </h2>
    <span about="@" data-template="v-ui:RabbitHole"></span>
    <hr />
    <section id="changeOfTerms">
      <h4 class="section-header" about="gen:ChangeOfTerms" property="rdfs:label"></h4>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <strong about="gen:datesChangesBundle" property="rdfs:label"></strong>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div property="v-s:dateFrom" class="view edit search"></div>
          <veda-control property="v-s:dateFrom" data-type="date" class="-view edit search"></veda-control>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div property="v-s:dateTo" class="view edit search"></div>
          <veda-control property="v-s:dateTo" data-type="date" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <strong about="v-s:duration" property="rdfs:label"></strong>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div property="v-s:duration" class="view -edit -search"></div>
          <veda-control data-type="decimal" property="v-s:duration" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <strong about="v-s:hasStatus" property="rdfs:label"></strong>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:hasStatus" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:hasStatus" class="-view edit search fulltext dropdown"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <strong about="rdfs:comment" property="rdfs:label"></strong>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div property="rdfs:comment" class="view -edit -search"></div>
          <veda-control data-type="text" property="rdfs:comment" class="-view edit search"></veda-control>
        </div>
      </div>
    </section>
    <hr />
    <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
    <br />
    <!-- BUTTONS -->
    <div class="actions view edit -search">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="edit save cancel delete journal"></span>
    </div>
  </div>
`;
