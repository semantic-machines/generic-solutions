import $ from 'jquery';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if (mode === "edit" && individual.hasValue("v-wf:processedDocument")) {
    var stages = ["introduction", "coordination1", "coordination2", "coordination3", "sign", "approval", "review"];
    var complex = "s-wf:ComplexRouteStartForm_";
    var simple = "s-wf:SimpleRouteStartForm_";
    var doc = individual['v-wf:processedDocument'][0];

    individual.addSimpleStartForm(stages, complex);

    individual[complex+'introduction'][0][simple+'visible'] = [true];
    individual[complex+'introduction'][0][simple+'editable'] = [true];
    individual[complex+'coordination1'][0][simple+'visible'] = [true];
    individual[complex+'coordination1'][0][simple+'editable'] = [true];
    individual[complex+'coordination2'][0][simple+'visible'] = [true];
    individual[complex+'coordination2'][0][simple+'editable'] = [true];
    individual[complex+'coordination3'][0][simple+'visible'] = [true];
    individual[complex+'coordination3'][0][simple+'editable'] = [true];
    individual[complex+'sign'][0][simple+'visible'] = [true];
    individual[complex+'sign'][0][simple+'editable'] = [true];
    individual[complex+'sign'][0][simple+'deadlineDays'] = [5];
    individual[complex+'approval'][0][simple+'visible'] = [true];
    individual[complex+'approval'][0][simple+'editable'] = [true];
    individual[complex+'approval'][0][simple+'deadlineDays'] = [5];
    individual[complex+'review'][0][simple+'visible'] = [true];
    individual[complex+'review'][0][simple+'editable'] = [true];
    individual[complex+'review'][0][simple+'deadlineDays'] = [3];
  }
};

export const html = `
<div about="@" data-embedded="true" data-template="s-wf:ComplexRouteStartForm_Common_Template" class="view edit"></div>
`;