import $ from 'jquery';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  var displayedDoc = container.closest('[resource]').attr('resource');
  if (this.hasValue('v-s:from', displayedDoc)) {
    $('.link-from', template).remove();
  } else if (this.hasValue('v-s:to', displayedDoc)) {
    $('.link-to', template).remove();
  }
};

export const html = `
  <tr>
    <td>
      <div class="view -edit -search" about="@" property="v-s:title"></div>
      <veda-control data-type="string" property="v-s:title" class="-view edit search"></veda-control>
    </td>
    <td>
      <div class="link-from" about="@" rel="v-s:from" data-template="v-ui:ClassNameLabelLinkTemplate"></div>
      <div class="link-to view -edit -search" about="@" rel="v-s:to" data-template="v-ui:ClassNameLabelLinkTemplate"></div>
      <veda-control data-type="link" rel="v-s:to" class="-view edit search fulltext" data-query-prefix="'rdf:type'=='v-s:UserThing'"></veda-control>
    </td>
    <td>
      <div class="view -edit -search" about="@" property="rdfs:comment"></div>
      <veda-control data-type="string" property="rdfs:comment" class="-view edit search"></veda-control>
    </td>
    <td><div class="pull-right" about="@" data-template="v-ui:IconButtonsTemplate" data-embedded="true"></div></td>
  </tr>
`;
