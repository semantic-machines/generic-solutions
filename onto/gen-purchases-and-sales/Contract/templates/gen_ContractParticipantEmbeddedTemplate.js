import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  function getOwner () {
    if (
      individual.hasValue('v-s:hasOrganization', new IndividualModel('d:org_RU1121016110_1')) ||
      individual.hasValue('v-s:hasOrganization', new IndividualModel('d:org_RU1121016110_2')) ||
      individual.hasValue('v-s:hasOrganization', new IndividualModel('d:org_RU7726531163'))
    ) {
      if (individual.hasValue('v-s:parent')) {
        individual['v-s:parent'][0]['v-s:owner'] = individual['v-s:hasOrganization'];
      } else {
        individual['v-s:backwardTarget'][0]['v-s:owner'] = individual['v-s:hasOrganization'];
      }
    }
  }
  function linkedOrganization () {
    if (template.data('mode') == 'edit') {
      individual['v-s:hasOrganization'] = individual['v-s:hasContractor'][0]['v-s:linkedOrganization'];
    }
  }
  individual.on('v-s:hasContractor', linkedOrganization);
  individual.on('v-s:hasOrganization', getOwner);
  template.one('remove', function () {
    individual.off('v-s:hasContractor', linkedOrganization);
    individual.off('v-s:hasOrganization', getOwner);
  });
};

export const html = `
  <tr>
    <td width="15%">
      <veda-control data-type="link" rel="v-s:hasRoleInContract" class="-view edit search dropdown fulltext"></veda-control>
      <div rel="v-s:hasRoleInContract" data-template="v-ui:LabelTemplate" class="view -edit search"></div>
    </td>
    <td width="20%">
      <veda-control
        data-type="link"
        rel="v-s:hasContractor"
        class="-view edit search fulltext"
        data-template="{@.rdfs:label}, {@.v-s:registrationNumber}"></veda-control>
      <div rel="v-s:hasContractor" class="view -edit search">
        <a href="#/@">
          <span about="@" property="rdfs:label"></span>,
          <span about="@" property="v-s:registrationNumber"></span>
        </a>
      </div>
    </td>
    <td width="50%">
      <veda-control
        data-type="link"
        rel="v-s:hasOrganization"
        class="-view edit search fulltext"
        data-template="{@.v-s:shortLabel}, {@.v-s:taxId}"></veda-control>
      <div rel="v-s:hasOrganization" class="view -edit search">
        <a href="#/@">
          <span about="@" property="rdfs:label"></span>,
          <span about="@" property="v-s:taxId"></span>
        </a>
      </div>
    </td>
    <td width="15%">
      <veda-control property="rdfs:comment" data-type="string" class="-view edit search"></veda-control>
      <div property="rdfs:comment" class="view -edit -search"></div>
    </td>
  </tr>
`;
