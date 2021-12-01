import $ from 'jquery';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if( individual.hasValue("v-s:isOrganizationOk", true) ) {
    template.closest("tr").addClass("success");
  } else if ( individual.hasValue("v-s:isOrganizationOk", false) ) {
    template.closest("tr").addClass("danger");
  } else {
    template.closest("tr").addClass("warning");
  }
};

export const html = `
<div>
  <veda-control property="v-s:isOrganizationOk" data-type="boolean"></veda-control>
</div>
`;