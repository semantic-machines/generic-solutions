import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  var rowTmpl = 'v-s:LinksObjectListTemplate_Item';

  $('#add-link', template).click(function () {
    $('.links-table', template).removeClass('hidden');
    var cntr = $("[rel='v-s:hasLinkObject']", template),
      _class = new IndividualModel('v-s:LinkObject'),
      Link = new IndividualModel();
    Link['rdf:type'] = [_class];
    Link['v-s:from'] = [individual];

    individual.isSync(false);

    Link.present(cntr, rowTmpl, 'edit').then(function (newRow) {
      Link.one('beforeReset', function () {
        newRow.remove();
      });
      Link.one('afterSave', function () {
        newRow.remove();
      });
      /*if ( individual.isNew() ) {
        newRow.find(".action#save").hide();
      }*/
    });
  });

  individual.on('afterSave', saveHandler);
  template.one('remove', function () {
    individual.off('afterSave', saveHandler);
  });
  function saveHandler() {
    $("[rel='v-s:hasLinkObject']", template).children().trigger('save');
  }

  individual.on('v-s:hasLinkObject', linksHandler);
  template.one('remove', function () {
    individual.off('v-s:hasLinkObject', linksHandler);
  });
  linksHandler();
  function linksHandler() {
    if (individual.hasValue('v-s:hasLinkObject')) {
      $('.links-table', template).removeClass('hidden');
    } else {
      $('.links-table', template).addClass('hidden');
    }
  }
};

export const html = `
  <div>
    <table class="hidden links-table table table-condensed table-striped table-sortable">
      <thead></thead>
      <tbody about="@" rel="v-s:hasLinkObject" data-embedded="true" data-limit="5" data-more="true"></tbody>
    </table>
    <div class="view -edit -search">
      <button class="btn btn-success" id="add-link">
        <span about="v-s:AddLink" property="rdfs:label"></span>
      </button>
    </div>
    <!--<button class="margin-sm btn btn-success" id="add-link" about="v-s:AddLink" property="rdfs:label"></button>-->
  </div>
`;
