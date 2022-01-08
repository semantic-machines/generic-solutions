import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if (mode === 'edit' && individual.hasValue('v-wf:processedDocument')) {
    const stages = ['coordination1', 'coordination2', 'examination'];
    const complex = 's-wf:ComplexRouteStartForm_';
    const simple = 's-wf:SimpleRouteStartForm_';

    individual.addSimpleStartForm(stages, complex);

    individual[complex + 'coordination1'][0][simple + 'visible'] = [true];
    individual[complex + 'coordination1'][0][simple + 'editable'] = [true];
    individual[complex + 'coordination1'][0][simple + 'participant'] = individual[complex + 'coordination1'][0][simple + 'participant'].concat(
      new IndividualModel('d:org_RU1100220011_position_4'),
    ); // ЮРО
    individual[complex + 'coordination1'][0][simple + 'participant'] = individual[complex + 'coordination1'][0][simple + 'participant'].concat(
      new IndividualModel('d:org_RU1100220011_position_10'),
    ); // кадры
    individual[complex + 'coordination1'][0][simple + 'participant'] = individual[complex + 'coordination1'][0][simple + 'participant'].concat(
      new IndividualModel('d:org_RU1100220011_position_7'),
    ); // бухгалтерия
    individual[complex + 'coordination1'][0][simple + 'comment'] = ['Произвести оценку контрагента'];

    individual[complex + 'examination'][0][simple + 'visible'] = [true];
    individual[complex + 'examination'][0][simple + 'editable'] = [true];
  }
};

export const html = ` <div about="@" data-embedded="true" data-template="s-wf:ComplexRouteStartForm_Common_Template" class="view edit"></div> `;
