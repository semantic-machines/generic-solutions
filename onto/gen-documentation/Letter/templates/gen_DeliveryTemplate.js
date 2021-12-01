export const html = `
<div class="container sheet">
  <h3 class="margin-sm">
    <span about="@" property="rdf:type"></span>
    <small about="@" property="rdfs:label" class="view edit -search"></small>
  </h3>
  <span about="@" data-template="v-ui:RabbitHole"></span>
  <section id="MainProperties">
    <h4 class="section-header" about="v-s:MainProperties" property="rdfs:label"></h4>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <label about="v-s:date" property="rdfs:label"></label>
      </div>
      <div class="col-sm-4 col-xs-3">
        <div property="v-s:date" class="view -edit search"></div>
        <veda-control property="v-s:date" data-type="date" class="-view edit search"></veda-control>
      </div>
    </div>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <label about="v-s:transportOrganization" property="rdfs:label"></label>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div rel="v-s:transportOrganization" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
        <veda-control data-type="link" rel="v-s:transportOrganization" class="-view edit search fulltext dropdown"></veda-control>
      </div>
    </div>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <label about="v-s:deliverBy" property="rdfs:label"></label>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div rel="v-s:deliverBy" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
        <veda-control data-type="link" rel="v-s:deliverBy" class="-view edit search fulltext dropdown"></veda-control>
      </div>
    </div>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <label about="rdfs:comment" property="rdfs:label"></label>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div property="rdfs:comment" class="view -edit search"></div>
        <veda-control property="rdfs:comment" data-type="text" class="-view edit search"></veda-control>
      </div>
    </div>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <label about="v-s:attachment" property="rdfs:label"></label>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div rel="v-s:attachment" data-template="v-ui:FileTemplateWithComment" data-embedded="true"></div>
        <veda-control data-type="file" rel="v-s:attachment" class="-view edit -search create"></veda-control>
      </div>
    </div>
  </section>
  <hr>
  <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
  <br>
  <div class="actions view edit -search">
    <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="edit save cancel delete journal"></span>
  </div>
</div>
`;