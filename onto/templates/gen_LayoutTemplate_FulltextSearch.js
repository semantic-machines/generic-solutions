import $ from 'jquery';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  template.tooltip({
    container: template,
    trigger: 'hover',
    placement: 'bottom',
    title: individual['rdfs:label'].join(' '),
  });
};

export const html = `
  <a href="#/@"><span class="fa fa-lg fa-search"></span></a>
`;
