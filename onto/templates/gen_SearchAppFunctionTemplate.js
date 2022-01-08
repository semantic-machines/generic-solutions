import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  const resultsContainer = $('.fn-search-results', template);
  const resultTemplate = resultsContainer.html();
  resultsContainer.empty();
  individual.on('*', triggerSearch);
  template.one('remove', function () {
    individual.off('*', triggerSearch);
  });
  if (this.result.length) {
    renderResults(this.result);
  }
  function triggerSearch () {
    this.search().then(renderResults);
  }
  function renderResults (fn_uris) {
    resultsContainer.empty();
    fn_uris.forEach(function (fn_uri) {
      const fn = new IndividualModel(fn_uri);
      fn.present(resultsContainer, resultTemplate);
    });
  }
};

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  const placeholder = new IndividualModel('gen:SearchAppPlaceholder');
  placeholder.load().then(function (placeholder) {
    $('input', template).prop('placeholder', placeholder).toString();
  });
};

export const html = `
  <div>
    <veda-control property="*" data-type="string"></veda-control>
    <div class="fn-search-results list-group" style="margin:0;">
      <a href="#/@" class="list-group-item" style="white-space: nowrap;">
        <strong about="@" property="rdf:type"></strong>: <span about="@" property="rdfs:label"></span>
      </a>
    </div>
  </div>
`;
