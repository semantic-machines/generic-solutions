import $ from 'jquery';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $('#descriptionClose', template).remove();
};

export const html = `
  <div class="container sheet">
    <h2>
      <span about="v-s:ContractorCategoryDecisionSecurity" property="rdfs:label"></span><br />
      <small about="@" property="rdfs:label"></small>
    </h2>
    <span about="@" data-template="v-ui:RabbitHole"></span>
    <hr />
    <em about="@" rel="rdf:type" class="view edit search" data-template="v-ui:LabelTemplate"></em>
    <div about="@" class="view edit -search" data-template="gen:ContractorCategoryDepartmentDecisionEmbeddedTemplate" data-embedded="true"></div>

    <em about="v-s:attachment" property="rdfs:label"></em>
    <div rel="v-s:attachment" data-template="v-ui:FileTemplateWithComment" data-embedded="true"></div>
    <veda-control data-type="file" rel="v-s:attachment" class="-view edit -search"></veda-control>

    <hr />
    <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
    <br />
    <!-- BUTTONS -->
    <div class="actions">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="edit save cancel delete"></span>
    </div>
  </div>
`;
