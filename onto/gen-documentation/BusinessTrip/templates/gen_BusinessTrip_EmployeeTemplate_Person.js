import $ from 'jquery';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if (!individual.hasValue('v-s:tabNumber')) {
    const regexp = /(\D*(\d+)\D*)/;
    const tabNumber = individual.id.replace(regexp, '$2');
    $('#tabNumber', template).removeAttr('about').removeAttr('property').text(tabNumber);
  }
};

export const html = `
  <span>
    <span about="@" property="v-s:lastName"></span>
    <span about="@" property="v-s:firstName"></span>
    <span about="@" property="v-s:middleName"></span> -
    <span id="tabNumber" about="@" property="v-s:tabNumber"></span>
  </span>
`;
