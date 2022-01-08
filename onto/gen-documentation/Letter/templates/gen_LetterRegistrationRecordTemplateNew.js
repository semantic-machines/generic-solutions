import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  var self = this;
  function setRegistrationDate() {
    if (this.hasValue('rdf:type', 'v-s:LetterRegistrationRecordEnumerated') && !this.hasValue('v-s:registrationNumber')) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      individual['v-s:registrationDate'] = [today];
    }
  }
  this.on('beforeSave', setRegistrationDate);
  template.one('remove', function () {
    self.off('beforeSave', setRegistrationDate);
  });

  if (mode === 'edit' || template.data('mode') === 'edit') {
    individual.on('rdf:type', typeHandler);
    template.one('remove', function () {
      individual.off('rdf:type', typeHandler);
    });
    typeHandler.call(this);
  }

  function typeHandler() {
    this.is('v-s:LetterRegistrationRecordEnumerated').then(function (isEnumerated) {
      if (isEnumerated) {
        var autoBundle = new IndividualModel('v-s:AutomaticallyBundle');
        autoBundle.load().then(function (autoBundle) {
          $('input', template).attr('placeholder', autoBundle['rdfs:label'].join(' '));
        });
      } else {
        var manualBundle = new IndividualModel('v-s:ManuallyBundle');
        manualBundle.load().then(function (manualBundle) {
          $('input', template).attr('placeholder', manualBundle['rdfs:label'].join(' '));
        });
      }
    });
  }
};

export const html = `
  <div class="container sheet">
    <div class="row">
      <div class="col-sm-9 col-xs-7 view edit -search">
        <div class="form-inline">
          <div class="form-group">
            <veda-control property="v-s:registrationNumber" data-type="text" class="-view edit search"></veda-control>
            <div property="v-s:registrationNumber" class="view -edit -search"></div>
          </div>
          <div class="form-group">
            <veda-control property="v-s:registrationDate" data-type="date" class="-view edit search"></veda-control>
            <div property="v-s:registrationDate" class="view -edit search"></div>
          </div>
        </div>
      </div>
      <div class="col-sm-9 col-xs-7 -view -edit search">
        <div class="row">
          <div class="col-md-6">
            <div property="v-s:registrationNumber" class="view -edit -search"></div>
            <veda-control property="v-s:registrationNumber" data-type="text" class="-view edit search"></veda-control>
          </div>
          <div class="col-md-6">
            <div property="v-s:registrationDate" class="view -edit search"></div>
            <veda-control property="v-s:registrationDate" data-type="date" class="-view edit search"></veda-control>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
