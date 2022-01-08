import $ from 'jquery';
import veda from '/js/common/veda.js';
import IndividualModel from '/js/common/individual_model.js';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if (!individual.hasValue('v-s:initiator')) {
    individual['v-s:initiator'] = [[veda.appointment][0]];
  }

  function contractClose () {
    if (individual.hasValue('gen:hasContractStage', new IndividualModel('d:uolcp82wtvh9nhjvkwmjd8s1kj'))) {
      individual['gen:isContractClosed'] = true;
    } else {
      individual['gen:isContractClosed'] = false;
    }
  }
  contractClose();
  individual.on('gen:hasContractStage', contractClose);
  template.one('remove', function () {
    individual.off('gen:hasContractStage', contractClose);
  });

  if (mode == 'edit' && individual.isNew()) {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    individual['v-s:date'] = [date];
  }
};

export const html = `
  <div class="container sheet">
    <h2>
      <span about="gen:ContractStageChanging" property="rdfs:label"></span>
      <small about="@" property="rdfs:label"></small>
    </h2>
    <span about="@" data-template="v-ui:RabbitHole"></span>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <label about="v-s:initiator" property="rdfs:label"></label>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div class="view -edit -search" rel="v-s:initiator" data-template="v-ui:LabelTemplate"></div>
        <veda-control data-type="link" rel="v-s:initiator" class="-view edit search fulltext"></veda-control>
      </div>
    </div>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <label about="v-s:date" property="rdfs:label"></label>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div class="view -edit -search" property="v-s:date"></div>
        <veda-control data-type="date" property="v-s:date" class="-view edit search"></veda-control>
      </div>
    </div>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <label about="gen:hasContractStage" property="rdfs:label"></label>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div class="view -edit -search" rel="gen:hasContractStage" data-template="v-ui:LabelTemplate"></div>
        <veda-control data-type="link" rel="gen:hasContractStage" class="-view edit search fulltext dropdown"></veda-control>
      </div>
    </div>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <label about="gen:isContractClosed" property="rdfs:label"></label>
      </div>
      <div class="col-sm-9 col-xs-7">
        <veda-control property="gen:isContractClosed" data-type="boolean" class="view edit search"></veda-control>
      </div>
    </div>
    <div class="row row-attribute">
      <div class="col-sm-3 col-xs-5">
        <label about="rdfs:comment" property="rdfs:label"></label>
      </div>
      <div class="col-sm-9 col-xs-7">
        <div class="view -edit -search" property="rdfs:comment"></div>
        <veda-control data-type="text" property="rdfs:comment" class="-view edit search"></veda-control>
      </div>
    </div>
    <hr />
    <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
    <br />
    <div id="actions">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="edit save cancel delete"></span>
    </div>
  </div>
`;
