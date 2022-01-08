import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if (mode === 'edit' && individual.hasValue('v-wf:processedDocument')) {
    var stages = ['introduction', 'coordination1', 'approval', 'instruction4', 'autoinstruction'];
    var complex = 's-wf:ComplexRouteStartForm_';
    var simple = 's-wf:SimpleRouteStartForm_';
    var doc = individual['v-wf:processedDocument'][0];

    individual.addSimpleStartForm(stages, complex);

    individual[complex + 'introduction'][0][simple + 'visible'] = [true];
    individual[complex + 'introduction'][0][simple + 'editable'] = [true];

    individual[complex + 'coordination1'][0][simple + 'visible'] = [true];
    individual[complex + 'coordination1'][0][simple + 'editable'] = [true];

    individual[complex + 'approval'][0][simple + 'visible'] = [true];
    individual[complex + 'approval'][0][simple + 'editable'] = [true];

    var actionPredicate = 'v-s:hasAction';
    if (doc.hasValue(actionPredicate)) {
      var promises = doc[actionPredicate].map(function (action) {
        return action.load();
      });

      individual[complex + 'autoinstruction'][0]['rdfs:label'] = ['Поручения на основе блока "' + new IndividualModel(actionPredicate)['rdfs:label'][0] + '"'];
      individual[complex + 'autoinstruction'][0][simple + 'visible'] = [true];
      individual[complex + 'autoinstruction'][0][simple + 'editable'] = [false];
      individual[complex + 'autoinstruction'][0][simple + 'actions'] = doc[actionPredicate];
    }
  }
};

export const html = ` <div about="@" data-embedded="true" data-template="s-wf:ComplexRouteStartForm_Common_Template" class="view edit"></div> `;
