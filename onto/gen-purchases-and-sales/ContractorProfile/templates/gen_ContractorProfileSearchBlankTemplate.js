export const html = `
<div class="container sheet">
  <h3 class="margin-sm">
    <span about="@" property="rdf:type"></span>
    <small about="@" property="rdfs:label" class="view edit -search"></small>
  </h3>
  <section id="MainProperties">
    <h4 class="section-header" about="v-s:MainProperties" property="rdfs:label"></h4>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <label about="rdfs:label" property="rdfs:label"></label>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div property="rdfs:label" class="view -edit -search"></div>
        <veda-control data-type="string" property="rdfs:label" class="-view edit search"></veda-control>
      </div>
    </div>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <label about="rdfs:comment" property="rdfs:label"></label>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div property="rdfs:comment" class="view -edit -search"></div>
        <veda-control data-type="string" property="rdfs:comment" class="-view edit search"></veda-control>
      </div>
    </div>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <label about="v-s:hasClassifierOKVED" property="rdfs:label"></label>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div rel="v-s:hasClassifierOKVED" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
        <veda-control data-type="link" rel="v-s:hasClassifierOKVEDt" class="-view edit search fulltext" data-template="{@.v-s:registrationNumber} - {@.rdfs:label}"></veda-control>
      </div>
    </div>
  </section>
  <hr>
  <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
</div>
`;