export const html = `
  <div>
    <div class="container sheet">
      <h3 class="margin-sm">
        <span about="@" property="rdf:type"></span>
        <small about="@" property="rdfs:label" class="view edit -search"></small>
      </h3>
      <section id="MainProperties">
        <h4 class="section-header" about="v-s:MainProperties" property="rdfs:label"></h4>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:dateFrom" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-3">
            <div property="v-s:dateFrom" class="view -edit -search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="dateTime" property="v-s:dateFrom" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:dateTo" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-3">
            <div property="v-s:dateTo" class="view -edit -search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="dateTime" property="v-s:dateTo" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="gen:hasIT_InfrastructureObjects" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="gen:hasIT_InfrastructureObjects" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="gen:hasIT_InfrastructureObjects" class="-view edit search fulltext dropdown tree"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:theme" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:theme" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="string" property="v-s:theme" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:description" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:description" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="text" property="v-s:description" class="-view edit search"></veda-control>
          </div>
        </div>
      </section>
      <hr />
      <div about="@" data-template="v-ui:SystemPropertiesTemplate" data-embedded="true"></div>
      <br />
      <!-- BUTTONS -->
      <div class="actions view edit -search">
        <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send edit save cancel delete journal  task"></span>
      </div>
    </div>
  </div>
`;
