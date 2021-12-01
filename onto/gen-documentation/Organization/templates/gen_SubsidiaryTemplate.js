export const html = `
<div>
  <div class="container sheet">
  <span about="@" data-template="v-ui:RabbitHole"></span>
  <hr>
    <h3 class="margin-sm">
      <span about="@" property="rdf:type"></span>
      <small about="@" property="rdfs:label" class="view edit -search"></small>
    </h3>
    <section id="MainProperties">
      <h4 class="section-header" about="v-s:MainProperties" property="rdfs:label"></h4>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:parentOrganization" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <span about="@" rel="v-s:backwardTarget" class="view edit search" data-template="v-ui:LabelLinkTemplate"></span>
        </div>
      </div>
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
          <label about="v-s:shortLabel" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
      <div property="v-s:shortLabel" class="view -edit -search"></div>
          <veda-control data-type="string" property="v-s:shortLabel" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:taxRegistrationCause" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
      <div property="v-s:taxRegistrationCause" class="view -edit -search"></div>
          <veda-control data-type="string" property="v-s:taxRegistrationCause" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:postalAddress" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
      <div property="v-s:postalAddress" class="view -edit -search"></div>
          <veda-control data-type="text" rows="3" property="v-s:postalAddress" class="-view edit search"></veda-control>
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
    </section>
    <hr>
    <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
    <br>
    <div class="actions">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="edit save cancel delete"></span>
    </div>
  </div>
</div>
`;