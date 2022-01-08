export const html = `
<div class="container sheet">
  <div class="row row-attribute">
    <div class="col-sm-3 col-xs-5">
        <em about="v-s:registrationDate" property="rdfs:label" ></em>
      </div>
      <div class="col-sm-3 col-xs-4">
        <div property="v-s:registrationDate" class="view  -edit search"></div>
        <veda-control data-type="date"  property="v-s:registrationDate" class="-view -edit search"></veda-control>
      </div>
    </div>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <em about="rdfs:comment" property="rdfs:label"></em>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div about="@" property="rdfs:comment" class="view  -edit search"></div>
        <veda-control data-type="text" property="rdfs:comment" class="-view -edit search"></veda-control>
      </div>
    </div>
    <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <em about="v-s:attachment" property="rdfs:label" class="view edit -search"></em>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:attachment" data-template="v-ui:FileTemplateWithComment" data-embedded="true" class="view edit -search"></div>
          <veda-control data-type="file"  rel="v-s:attachment" class="-view edit -search"></veda-control>
        </div>
      </div>
  </div>
</div>
`;
