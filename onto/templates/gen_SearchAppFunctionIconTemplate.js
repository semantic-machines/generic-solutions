import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $('.fn-search-toggle', template).click(function () {
    var searchAppFnContainer = $('.fn-search-container', template);
    if (searchAppFnContainer.is(':empty')) {
      var searchAppFn = new IndividualModel('gen:SearchAppFunction');
      searchAppFn.present(searchAppFnContainer);
    }
    setTimeout(function () {
      $('input', template).focus();
    });
  });
};

export const html = `
  <div class="btn-group">
    <style>
      .open > .dropdown-toggle {
        background-color: #ddd;
      }
    </style>
    <a class="btn btn-sm btn-link fn-search-toggle dropdown-toggle" href="#" data-toggle="dropdown">
      <span class="fa fa-search"></span>
      <span class="caret"></span>
    </a>
    <div style="padding:0;border:none;" class="dropdown-menu fn-search-container"></div>
  </div>
`;
