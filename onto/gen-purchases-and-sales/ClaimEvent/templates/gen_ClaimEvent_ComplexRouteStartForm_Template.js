import $ from 'jquery';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if (mode === 'edit' && individual.hasValue('v-wf:processedDocument')) {
    var stages = ['coordination1', 'review'];
    var complex = 's-wf:ComplexRouteStartForm_';
    var simple = 's-wf:SimpleRouteStartForm_';
    var doc = individual['v-wf:processedDocument'][0];

    individual.addSimpleStartForm(stages, complex);

    //Согласование
    individual[complex + 'coordination1'][0][simple + 'visible'] = [true];
    individual[complex + 'coordination1'][0][simple + 'editable'] = [true];

    //Рассмотрение
    individual[complex + 'review'][0][simple + 'visible'] = [true];
    individual[complex + 'review'][0][simple + 'editable'] = [true];

    var reviewParticipants = [];
    reviewParticipants.push(doc['v-s:creator'][0].getChief());
    Promise.all(reviewParticipants).then(function (result) {
      individual[complex + 'coordination1'][0][simple + 'participant'] = result;
    });
  }
};

export const html = ` <div about="@" data-embedded="true" data-template="s-wf:ComplexRouteStartForm_Common_Template" class="view edit"></div> `;
