import BrowserUtil from '/js/browser/util.js';
import $ from 'jquery';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $('#createReport', template).on('click', function () {
    BrowserUtil.createReport('gen:BusinessTrip_listReport', individual);
  });
};

export const html = `
<div class="container sheet">
  <h3 about="gen:BusinessTrip_listReportParameters" property="rdfs:label"></h3>
  <div class="row">
    <div class="col-md-6">
      <strong about="v-s:responsible" property="rdfs:label"></strong>
      <div rel="v-s:responsible" data-template="v-ui:LabelTemplate" class="view -edit -search"></div>
      <veda-control rel="v-s:responsible" data-type="select" class="-view edit search fulltext"></veda-control>
    </div>
  </div>

  <br><br>
  <div class="actions">
    <button type="button" class="action btn btn-success -view edit -search" id="createReport" about="v-s:CreateReport" property="rdfs:label"/>
  </div>
</div>
`;