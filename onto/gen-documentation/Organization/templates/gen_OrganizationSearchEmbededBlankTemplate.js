import $ from 'jquery';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $('#showHideContent', template).click(function (e) {
    e.preventDefault();
    const a = $('#showHideContent1').attr('class');
    if (a == 'glyphicon glyphicon-chevron-right') {
      $('#showHideContent1').removeClass().addClass('glyphicon glyphicon-chevron-down');
    } else {
      $('#showHideContent1').removeClass().addClass('glyphicon glyphicon-chevron-right');
    }

    if ($('#content', template).is(':hidden')) {
      $('#content', template).show(250);
    } else {
      $('#content', template).hide(250);
    }
  });
};

export const html = `
  <div>
    <h2>
      <a href="#" id="showHideContent" style="text-decoration: none">
        <span about="v-s:Organization" property="rdfs:label"></span>
        <small><span id="showHideContent1" class="glyphicon glyphicon-chevron-right"></span></small>
      </a>
    </h2>
    <div id="content" style="display:none;">
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
            <label about="v-s:shortLabel" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:shortLabel" class="view -edit -search"></div>
            <veda-control data-type="string" property="v-s:shortLabel" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:taxId" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:taxId" class="view -edit -search"></div>
            <veda-control data-type="string" property="v-s:taxId" class="-view edit search"></veda-control>
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
      </section>
      <hr />
      <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
    </div>
  </div>
`;
