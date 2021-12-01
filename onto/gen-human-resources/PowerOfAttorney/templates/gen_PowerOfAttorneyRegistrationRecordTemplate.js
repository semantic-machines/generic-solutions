import $ from 'jquery';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if (mode == "edit" && (!individual.hasValue("v-s:registrationDate"))) {
    var date = new Date();
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
    individual["v-s:registrationDate"] = [date] ;
  }
};

export const html = `
<div class="container sheet">
  <h2>
    <span about="@" property="rdf:type"></span>
    <small about="@" property="rdfs:label"></small>
  </h2>
  <span about="@" data-template="v-ui:RabbitHole"></span>
  <hr>
  <section id="gen:RegNumBusinessTripBundle">
    <h4 class="section-header" about="gen:PowerOfAttorneyRegistrationRecord" property="rdfs:label"></h4>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <em about="v-s:registrationDate" property="rdfs:label"></em>
        </div>
        <div class="col-sm-3 col-xs-4">
        <div about="@" property="v-s:registrationDate" class="view  -edit search"></div>
        <veda-control data-type="date" property="v-s:registrationDate" class="-view edit -search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <em about="rdfs:comment" property="rdfs:label"></em>
        </div>
        <div class="col-sm-9 col-xs-7">
        <div about="@" property="rdfs:comment" class="-view  -edit -search"></div>
        <veda-control data-type="text" property="rdfs:comment" class="-view edit -search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <em about="v-s:attachment" property="rdfs:label" ></em>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:attachment" data-template="v-ui:FileTemplateWithComment" data-embedded="true" class="view edit -search"></div>
          <veda-control data-type="file"  rel="v-s:attachment" class="-view edit -search"></veda-control>
        </div>
      </div>
  </section>
  <hr>
  <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
  <br>
  <!-- BUTTONS -->
  <div class="actions view edit -search">
    <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="edit save cancel delete"></span>
  </div>
</div>
`;