import BrowserUtil from '/js/browser/util.js';
import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';
import riot from 'riot';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $('#add-ContractStageChanging_prolongate', template).click(function () {
    var modal = $('#notification-modal-template').html();
    modal = $(modal);
    modal.modal({ show: false });
    $('body').append(modal);
    modal.modal('show');
    template.one('remove', function () {
      modal.modal('hide').remove();
    });
    var cntr = $('.modal-body', modal),
      _class = new IndividualModel('gen:ContractStageChanging'),
      ContractStageChanging = new IndividualModel(),
      tmpl = new IndividualModel('gen:ContractStageChangingTemplate');
    ContractStageChanging['rdf:type'] = [_class];
    ContractStageChanging['v-s:backwardTarget'] = [individual];
    ContractStageChanging['v-s:backwardProperty'] = [new IndividualModel('gen:hasContractStageChanging')];
    ContractStageChanging['v-s:canRead'] = [true];
    ContractStageChanging['gen:hasContractStage'] = [new IndividualModel('d:nq4w68sngp2q296unrdotup48f')];
    ContractStageChanging.present(cntr, tmpl, 'edit');
    ContractStageChanging.one('beforeReset', function () {
      modal.modal('hide').remove();
    });
    ContractStageChanging.one('afterSave', function () {
      modal.modal('hide').remove();
    });
  });

  $('#add-ContractStageChanging_close', template).click(function () {
    var modal = $('#notification-modal-template').html();
    modal = $(modal);
    modal.modal({ show: false });
    $('body').append(modal);
    modal.modal('show');
    template.one('remove', function () {
      modal.modal('hide').remove();
    });
    var cntr = $('.modal-body', modal),
      _class = new IndividualModel('gen:ContractStageChanging'),
      ContractStageChanging = new IndividualModel(),
      tmpl = new IndividualModel('gen:ContractStageChangingTemplate');
    ContractStageChanging['rdf:type'] = [_class];
    ContractStageChanging['v-s:backwardTarget'] = [individual];
    ContractStageChanging['v-s:backwardProperty'] = [new IndividualModel('gen:hasContractStageChanging')];
    ContractStageChanging['v-s:canRead'] = [true];
    ContractStageChanging['v-s:backwardReplace'] = [new IndividualModel('gen:isContractClosed')];
    ContractStageChanging['gen:hasContractStage'] = [new IndividualModel('d:uolcp82wtvh9nhjvkwmjd8s1kj')];
    ContractStageChanging.present(cntr, tmpl, 'edit');
    ContractStageChanging.one('beforeReset', function () {
      modal.modal('hide').remove();
    });
    ContractStageChanging.one('afterSave', function () {
      modal.modal('hide').remove();
    });
  });

  $('#add-ContractStageChanging_reopen', template).click(function () {
    var modal = $('#notification-modal-template').html();
    modal = $(modal);
    modal.modal({ show: false });
    $('body').append(modal);
    modal.modal('show');
    template.one('remove', function () {
      modal.modal('hide').remove();
    });
    var cntr = $('.modal-body', modal),
      _class = new IndividualModel('gen:ContractStageChanging'),
      ContractStageChanging = new IndividualModel(),
      tmpl = new IndividualModel('gen:ContractStageChangingTemplate');
    ContractStageChanging['rdf:type'] = [_class];
    ContractStageChanging['v-s:backwardTarget'] = [individual];
    ContractStageChanging['v-s:backwardProperty'] = [new IndividualModel('gen:hasContractStageChanging')];
    ContractStageChanging['v-s:canRead'] = [true];
    ContractStageChanging['v-s:backwardReplace'] = [new IndividualModel('gen:isContractClosed')];
    ContractStageChanging['gen:hasContractStage'] = [new IndividualModel('d:a8one4lqfat24wuccfih99ovcb7')];
    ContractStageChanging.present(cntr, tmpl, 'edit');
    ContractStageChanging.one('beforeReset', function () {
      modal.modal('hide').remove();
    });
    ContractStageChanging.one('afterSave', function () {
      modal.modal('hide').remove();
    });
  });
  function prolongateHandler() {
    if (individual.hasValue('gen:isAutoProlongateProvides', true)) {
      $('#add-ContractStageChanging_prolongate', template).removeClass('hidden');
    } else {
      $('#add-ContractStageChanging_prolongate', template).addClass('hidden');
    }
    if (individual.hasValue('gen:isContractClosed', true)) {
      $('#add-ContractStageChanging_close', template).addClass('hidd  en');
      $('#add-ContractStageChanging_reopen', template).removeClass('hidden');
      $('#add-AdditionalAgreement', template).prop('disabled', true);
    } else {
      $('#add-ContractStageChanging_close', template).removeClass('hidden');
      $('#add-ContractStageChanging_reopen', template).addClass('hidden');
      $('#add-AdditionalAgreement', template).prop('disabled', false);
    }
  }
  individual.on('gen:isAutoProlongateProvides', prolongateHandler);
  individual.on('gen:isContractClosed', prolongateHandler);
  template.one('remove', function () {
    individual.off('gen:isAutoProlongateProvides', prolongateHandler);
    individual.off('gen:isContractClosed', prolongateHandler);
  });
  prolongateHandler();

  $('#add-AdditionalAgreement', template).click(function () {
    var _class = new IndividualModel('gen:AdditionalAgreement'),
      AdditionalAgreement = new IndividualModel(),
      tmpl = 'gen:AdditionalAgreementTemplate';
    AdditionalAgreement['rdf:type'] = [_class];
    AdditionalAgreement['v-s:backwardTarget'] = [individual];
    AdditionalAgreement['v-s:theme'] = individual['v-s:theme'];
    AdditionalAgreement['v-s:initiator'] = individual['v-s:initiator'];
    AdditionalAgreement['v-s:supportSpecialistOfContract'] = individual['v-s:supportSpecialistOfContract'];
    AdditionalAgreement['v-s:hasObligationKind'] = individual['v-s:hasDeliveryConditions'];
    AdditionalAgreement['v-s:backwardProperty'] = [new IndividualModel('gen:hasAdditionalAgreement')];
    AdditionalAgreement['v-s:canRead'] = [true];

    Promise.resolve()
      .then(function () {
        if (individual.hasValue('gen:hasAdditionalAgreement')) {
          var promiseArr = individual['gen:hasAdditionalAgreement'].map(function (agreement) {
            return agreement.load();
          });
          return Promise.all(promiseArr).then(function (agreements) {
            var massivregnum = [];
            agreements.forEach(function (agreement) {
              var object;
              if (agreement.hasValue('v-s:registrationNumberAdd')) {
                object = agreement['v-s:registrationNumberAdd'][0].toString();
              } else {
                object = '0';
              }
              var proverca = object.lastIndexOf('.');
              var a;
              if (proverca > 0) {
                a = parseInt(object.split('.')[0]);
              } else {
                a = parseInt(object);
              }
              if (isNaN(a)) {
                massivregnum.splice(i, 0, 0);
              } else {
                massivregnum.splice(i, 0, a);
              }
            });
            return getMaxValue(massivregnum) + 1;
          });
        } else {
          return (1).toString();
        }
      })
      .then(function (result) {
        AdditionalAgreement['v-s:registrationNumberAdd'] = [result];
        AdditionalAgreement['v-s:registrationNumber'] = [
          [individual['v-s:registrationNumber'][0], AdditionalAgreement['v-s:registrationNumberAdd'][0]].join('.'),
        ];
      });
    // В случае если есть допы у контракта, скрипт вычисляет количество допов, скажем их 6
    // и прибавляет один получаем цифру 7, пробегает по всем привязанным допам и проверяет не занят ли этот доп номер
    function getMaxValue(array) {
      var max = array[0]; // берем первый элемент массива
      for (var i = 0; i < array.length; i++) {
        // переберем весь массив
        // если элемент больше, чем в переменной, то присваиваем его значение переменной
        if (max < array[i]) max = array[i];
      }
      // возвращаем максимальное значение
      return max;
    }

    riot.route(['#', AdditionalAgreement.id, '#main', tmpl, 'edit'].join('/'));
  });

  function processHandler() {
    individual.canUpdate().then(function (canUpdate) {
      if (individual.hasValue('v-wf:isProcess')) {
        $('#send.action', template).remove();
        $('#delete.action', template).remove();
      } else if (individual.isNew() || canUpdate) {
        $('#send.action', template).off('click');
        $('#send.action', template).on('click', function () {
          BrowserUtil.send(individual, template, 's-wf:complexRouteTransform', undefined, 'gen:Contract_ComplexRouteStartForm_Template');
        });
      } else {
        $('#send.action', template).remove();
        $('#delete.action', template).remove();
      }
    });
  }
  processHandler();
};

export const html = `
<div>
  <style>
    .section-header {
      background-color: #f5f5f5;
      padding: 10px;
      border-top: 1px solid #ccc;
      margin-top: 1.5em;
      margin-bottom: 1em;
    }
    veda-control .radio:first-child, veda-control .checkbox:first-child {
      margin-top: 0;
    }
    veda-control .radio:last-child, veda-control .checkbox:last-child {
      margin-bottom: 0;
    }
    .row-attribute {
      margin-top: 1em;
    }
    .row-attribute > div:first-child {
      text-align: right;
      font-weigth: bold;
    }
  </style>
  <div class="container sheet">
    <h3 class="margin-sm">
      <span about="gen:Contract" property="rdfs:label"></span>
      <small about="@" property="rdfs:label"></small>
    </h3>
    <section id="MainProperties">
      <h4 class="section-header" about="v-s:MainProperties" property="rdfs:label"></h4>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:hasDocumentKind" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <veda-control rel="v-s:hasDocumentKind" data-type="radio"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:ContractSubjectBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div class="view -edit -search bg-warning padding-md"><strong property="v-s:theme"></strong></div>
          <veda-control data-type="multilingualText" property="v-s:theme" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:RegistrationNumberAddBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div class="view -edit -search" property="v-s:registrationNumber"></div>
          <veda-control data-type="text" property="v-s:registrationNumber" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:RegistrationDateBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div class="view -edit -search" property="v-s:registrationDate"></div>
          <veda-control data-type="date" property="v-s:registrationDate" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:RegistrationNumberInBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div class="view -edit -search" property="v-s:registrationNumberIn"></div>
          <veda-control data-type="string" property="v-s:registrationNumberIn" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:initiatorForContractBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:initiator" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:initiator" class="-view edit search fulltext dropdown"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:rationale" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div class="view -edit -search" property="v-s:rationale"></div>
          <veda-control data-type="multilingualText" property="v-s:rationale" class="-view edit search"></veda-control>
        </div>
      </div>

      <div class="row row-attribute view edit -search">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:hasPriceBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div about="@" rel="v-s:hasPrice" data-embedded="true">
            <div class="form-inline">
              <div class="form-group">
                <strong about="@" property="v-s:sum" class="view -edit search"></strong>
                <veda-control data-type="decimal" property="v-s:sum" class="-view edit search"></veda-control>
              </div>
              <div class="form-group">
                <span about="@" rel="v-s:hasCurrency" class="view -edit search" data-template="v-ui:LabelTemplate"></span>
                <veda-control data-type="link" rel="v-s:hasCurrency" class="-view edit search fulltext dropdown"></veda-control>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:DurationOfTheContractBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div class="view -edit -search" property="v-s:dateFrom"></div>
          <veda-control data-type="date" property="v-s:dateFrom" class="-view edit search"></veda-control>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div class="view -edit -search" property="v-s:dateTo"></div>
          <veda-control data-type="date" property="v-s:dateTo" class="-view edit search"></veda-control>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div class="view -edit -search" property="v-s:dateFact"></div>
          <veda-control data-type="date" property="v-s:dateFact" class="-view edit search"></veda-control>
        </div>
      </div>

      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:isAutoProlongateProvides" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <veda-control property="gen:isAutoProlongateProvides" data-type="boolean"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:isContractUnlimited" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <veda-control property="gen:isContractUnlimited" data-type="boolean"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:isContractClosed" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <veda-control property="gen:isContractClosed" data-type="boolean"></veda-control>
        </div>
      </div>

      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:hasObligationKind" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:hasObligationKind" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:hasObligationKind" class="-view edit search fulltext dropdown"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:hasContractDirection" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="gen:hasContractDirection" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="gen:hasContractDirection" class="-view edit search fulltext dropdown"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:hasBudgetCategory" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:hasBudgetCategory" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:hasBudgetCategory" class="-view edit search fulltext dropdown"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:supportSpecialistOfContract" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:supportSpecialistOfContract" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:supportSpecialistOfContract" class="-view edit search fulltext"></veda-control>
        </div>
      </div>
    </section>
    <section id="Participants">
      <h4 class="section-header" about="gen:ContractParticipantsBundle" property="rdfs:label"></h4>
      <table class="table no-margin">
        <thead>
          <tr>
            <th about="v-s:hasRoleInContract" data-template="v-ui:LabelTemplate"></th>
            <th about="v-s:hasContractor" property="rdfs:label"></th>
            <th about="v-s:hasOrganization" property="rdfs:label"></th>
            <th about="rdfs:comment" property="rdfs:label"></th>
          </tr>
        </thead>
        <tbody rel="v-s:hasContractParticipantSupplier" data-template="gen:ContractParticipantEmbeddedTemplate" data-embedded="true"></tbody>
      </table>
      <div class="row row-attribute">
        <div class="col-sm-1 col-xs-1">
          <veda-control rel="v-s:hasContractParticipantSupplier" data-type="link" class="-view edit search create"></veda-control>
        </div>
        <div class="col-sm-11 col-xs-9">
          <label about="gen:addContractParticipantSupplier" property="rdfs:label" class="-view edit -search"></label>
        </div>
      </div>
      <br>
      <table class="table no-margin">
        <tbody rel="v-s:hasContractParticipantCustomer" data-template="gen:ContractParticipantEmbeddedTemplate" data-embedded="true"></tbody>
      </table>
      <div class="row row-attribute">
        <div class="col-sm-1 col-xs-1">
          <veda-control rel="v-s:hasContractParticipantCustomer" data-type="link" class="-view edit search create"></veda-control>
        </div>
        <div class="col-sm-11 col-xs-9">
          <label about="gen:addContractParticipantCustomer" property="rdfs:label" class="-view edit -search"></label>
        </div>
      </div>
      <br>
      <table class="table no-margin">
        <tbody rel="v-s:hasContractParticipantStakeholder" data-template="gen:ContractParticipantEmbeddedTemplate" data-embedded="true"></tbody>
      </table>
      <div class="row row-attribute">
        <div class="col-sm-1 col-xs-1">
          <veda-control rel="v-s:hasContractParticipantStakeholder" data-type="link" class="-view edit search create"></veda-control>
        </div>
        <div class="col-sm-11 col-xs-9">
          <label about="gen:addContractParticipantStakeholder" property="rdfs:label" class="-view edit -search"></label>
        </div>
      </div>
    </section>

    <section>
      <h4 class="section-header" about="gen:hasContractStageChanging" property="rdfs:label"></h4>
      <table class="table no-margin">
        <thead>
          <tr>
            <th width="1%"><span class="glyphicon glyphicon-search" ></th>
            <th about="v-s:date" property="rdfs:label"></th>
            <th about="gen:hasContractStage" property="rdfs:label"></th>
            <th about="v-s:initiator" property="rdfs:label"></th>
            <th about="rdfs:comment" property="rdfs:label"></th>
          </tr>
        </thead>
        <tbody rel="gen:hasContractStageChanging" data-template="gen:ContractStageChangingEmbeddedTemplate" data-embedded="true"></tbody>
      </table><br>
      <veda-control rel="gen:hasContractStageChanging" data-type="link" class="-view edit search create"></veda-control>
      <div class="view -edit -search pull-right">
        <button class="btn btn-xs btn-success" id="add-ContractStageChanging_prolongate">
          <span class="glyphicon glyphicon-zoom-in"></span>
          <span about="gen:ContractStageChanging_prolongate_Bundle" property="rdfs:label"></span>
        </button>
      </div>
      <br><br>
      <div class="view -edit -search pull-right">
        <button class="btn btn-xs btn-success" id="add-ContractStageChanging_close">
          <span class="glyphicon glyphicon-zoom-in"></span>
          <span about="gen:ContractStageChanging_close_Bundle" property="rdfs:label"></span>
        </button>
      </div>
      <br><br>
      <div class="view -edit -search pull-right">
        <button class="btn btn-xs btn-success" id="add-ContractStageChanging_reopen">
          <span class="glyphicon glyphicon-zoom-in"></span>
          <span about="gen:ContractStageChanging_reopen_Bundle" property="rdfs:label"></span>
        </button>
      </div>
    </section>

    <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
    <br>
    <!-- BUTTONS -->
    <div class="actions view edit -search">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send edit save cancel delete journal task"></span>
    </div>
  </div>
  <div class="container sheet view edit -search margin-lg">
    <h3 about="gen:AdditionalAgreementTitleBundle" property="rdfs:label" class="margin-sm"></h3>
    <hr class="margin-lg">
    <table class="table no-margin">
      <thead>
        <tr>
          <th width="1%"><span class="glyphicon glyphicon-search" ></th>
          <th about="v-s:registrationNumber" property="rdfs:label"></th>
          <th about="v-s:hasContractScope" property="rdfs:label"></th>
          <th about="v-s:theme" property="rdfs:label"></th>
          <th about="v-s:initiator" property="rdfs:label"></th>
        </tr>
      </thead>
      <tbody rel="gen:hasAdditionalAgreement" data-template="gen:AdditionalAgreementEmbeddedTemplate" data-embedded="true"></tbody>
    </table>
    <br>
    <div class="view -edit -search pull-right">
        <button class="btn btn-xs btn-success" id="add-AdditionalAgreement">
          <span class="glyphicon glyphicon-zoom-in"></span>
          <span about="gen:AddAdditionalAgreementBundle" property="rdfs:label"></span>
        </button>
      </div>
  </div>
  <div about="@" class="container sheet view edit -search margin-lg" data-template="v-s:LinksTemplate" data-embedded="true"></div>
  <div about="@" class="container sheet view -edit -search margin-lg" data-template="v-s:CommentsTemplate"></div>
</div>
`;
