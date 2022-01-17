export const html = `
  <div class="container sheet">
    <h2>
      <span about="@" property="rdf:type"></span>
      <small about="@" property="rdfs:label"></small>
    </h2>
    <span about="@" data-template="v-ui:RabbitHole"></span>
    <hr />
    <section id="hasAction">
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <em about="v-s:registrationNumber" property="rdfs:label"></em>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div property="v-s:registrationNumber" class="view -edit -search"></div>
          <veda-control property="v-s:registrationNumber" data-type="text" class="-view edit search"></veda-control>
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
          <em about="v-s:responsible" property="rdfs:label"></em>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:responsible" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:responsible" class="-view edit search fulltext"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <em about="gen:contributorMeetingBundle" property="rdfs:label"></em>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:contributor" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:contributor" class="-view edit search fulltext"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <em about="v-s:controller" property="rdfs:label"></em>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:controller" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:controller" class="-view edit search fulltext"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <em about="v-s:dateToPlan" property="rdfs:label"></em>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div property="v-s:dateToPlan" class="view -edit search"></div>
          <veda-control data-type="date" property="v-s:dateToPlan" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <em about="v-s:hasStatus" property="rdfs:label"></em>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:hasStatus" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:hasStatus" class="-view edit search fulltext dropdown"></veda-control>
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
