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
          <label about="rdfs:comment" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div property="rdfs:comment" class="view -edit -search"></div>
          <veda-control data-type="string" property="rdfs:comment" class="-view edit search"></veda-control>
        </div>
      </div>
    </section>
    <hr />
    <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
    <br />
    <div about="@" rel="v-s:backwardTarget" data-embedded="true">
      <div about="@" rel="v-s:backwardTarget" data-embedded="true" data-template="gen:OrganizationSearchEmbededBlankTemplate"></div>
    </div>
    <br />
  </div>
`;
