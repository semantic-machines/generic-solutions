import BrowserUtil from '/js/browser/util.js';
import $ from 'jquery';
import veda from '/js/common/veda.js';
import IndividualModel from '/js/common/individual_model.js';
import riot from 'riot';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if (mode === 'edit' || template.attr('data-mode') === 'edit') {
    const enumerated = new IndividualModel('v-s:LetterRegistrationRecordEnumerated');

    // These events are triggered in v-s:CorrespondentTemplate
    template.on('v-s:sender:own v-s:sender:foreign v-s:recipient:own v-s:recipient:foreign', function (e) {
      e.stopPropagation();
      let keyWord = e.type.split(':')[1];
      keyWord = keyWord.charAt(0).toUpperCase() + keyWord.slice(1);
      const isOwn = 'own' === e.type.split(':')[2];
      let regRecord;
      if (individual.hasValue('v-s:hasLetterRegistrationRecord' + keyWord)) {
        regRecord = individual['v-s:hasLetterRegistrationRecord' + keyWord][0];
      } else {
        regRecord = new IndividualModel();
        individual['v-s:hasLetterRegistrationRecord' + keyWord] = [regRecord];
      }
      regRecord['rdf:type'] = [new IndividualModel('v-s:LetterRegistrationRecord' + keyWord), isOwn ? enumerated : null];
    });
  }
};

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  if (individual.hasValue('rdf:type', 'gen:IncomingLetter')) {
    individual['v-s:recipient'][0]['v-s:correspondentOrganization'] = veda.appointment['v-s:parentOrganization'];
  } else if (individual.hasValue('rdf:type', 'gen:OutgoingLetter')) {
    individual['v-s:sender'][0]['v-s:correspondentOrganization'] = veda.appointment['v-s:parentOrganization'];
  }
  // Проверка разрешения на кнопку исходящее письмо
  const OutgoingLetter_class = new IndividualModel('gen:OutgoingLetter');
  OutgoingLetter_class.canCreate().then(function (canCreate) {
    if (individual.hasValue('rdf:type', 'gen:OutgoingLetter') || !canCreate) {
      $('#add-OutgoingLetter').remove();
    }
  });

  // Исходящий документ
  $('#add-OutgoingLetter', template).click(function () {
    const newSender = new IndividualModel();
    newSender['rdf:type'] = [new IndividualModel('v-s:Correspondent')];
    const senderPromise = individual
      .getPropertyChain('v-s:sender')
      .then(function (senderArr) {
        return senderArr.length > 0 ? senderArr[0].load() : null;
      })
      .then(function (sender) {
        if (sender != null) {
          newSender['v-s:correspondentOrganization'] = sender['v-s:correspondentOrganization'];
          newSender['v-s:correspondentDepartmentDescription'] = sender['v-s:correspondentDepartmentDescription'];
          newSender['v-s:correspondentPersonDescription'] = sender['v-s:correspondentPersonDescription'];
        }
        return newSender;
      });

    const newRecipient = new IndividualModel();
    newRecipient['rdf:type'] = [new IndividualModel('v-s:Correspondent')];
    const recipientPromise = individual
      .getPropertyChain('v-s:recipient')
      .then(function (recipientArr) {
        return recipientArr.length > 0 ? recipientArr[0].load() : null;
      })
      .then(function (recipient) {
        if (recipient != null) {
          newRecipient['v-s:correspondentOrganization'] = recipient['v-s:correspondentOrganization'];
          newRecipient['v-s:correspondentDepartment'] = recipient['v-s:correspondentDepartment'];
          newRecipient['v-s:correspondentPerson'] = recipient['v-s:correspondentPerson'];
        }
        return newRecipient;
      });

    Promise.all([senderPromise, recipientPromise]).then(function (result) {
      const _class = new IndividualModel('gen:OutgoingLetter');
      const OutcomingLetter = new IndividualModel();
      const tmpl = 'gen:LetterTemplate';
      OutcomingLetter['rdf:type'] = [_class];

      OutcomingLetter['v-s:recipient'] = [result[0]];
      OutcomingLetter['v-s:sender'] = [result[1]];
      OutcomingLetter['v-s:description'] = individual['v-s:description'];

      const Link = new IndividualModel();
      Link['rdf:type'] = [new IndividualModel('v-s:Link')];
      Link['v-s:from'] = [OutcomingLetter];
      Link['v-s:to'] = [individual];
      OutcomingLetter['v-s:hasLink'] = [Link];

      riot.route(['#', OutcomingLetter.id, '#main', tmpl, 'edit'].join('/'));
    });
  });

  // Проверка разрешения на кнопку и на входящее письмо
  const incomingLetter_class = new IndividualModel('gen:IncomingLetter');
  incomingLetter_class.canCreate().then(function (canCreate) {
    if (individual.hasValue('rdf:type', 'gen:IncomingLetter') || !canCreate) {
      $('#add-IncomingLetter').remove();
    }
  });

  // Входящий документ
  $('#add-IncomingLetter', template).click(function () {
    const newSender = new IndividualModel();
    newSender['rdf:type'] = [new IndividualModel('v-s:Correspondent')];
    const senderPromise = individual
      .getPropertyChain('v-s:sender')
      .then(function (senderArr) {
        return senderArr.length > 0 ? senderArr[0].load() : null;
      })
      .then(function (sender) {
        if (sender != null) {
          newSender['v-s:correspondentOrganization'] = sender['v-s:correspondentOrganization'];
          newSender['v-s:correspondentDepartmentDescription'] = sender['v-s:correspondentDepartmentDescription'];
          newSender['v-s:correspondentPersonDescription'] = sender['v-s:correspondentPersonDescription'];
        }
        return newSender;
      });

    const newRecipient = new IndividualModel();
    newRecipient['rdf:type'] = [new IndividualModel('v-s:Correspondent')];
    const recipientPromise = individual
      .getPropertyChain('v-s:recipient')
      .then(function (recipientArr) {
        return recipientArr.length > 0 ? recipientArr[0].load() : null;
      })
      .then(function (recipient) {
        if (recipient != null) {
          newRecipient['v-s:correspondentOrganization'] = recipient['v-s:correspondentOrganization'];
          newRecipient['v-s:correspondentDepartment'] = recipient['v-s:correspondentDepartment'];
          newRecipient['v-s:correspondentPerson'] = recipient['v-s:correspondentPerson'];
        }
        return newRecipient;
      });

    Promise.all([senderPromise, recipientPromise]).then(function (result) {
      const _class = new IndividualModel('gen:IncomingLetter');
      const IncomingLetter = new IndividualModel();
      const tmpl = 'gen:LetterTemplate';
      IncomingLetter['rdf:type'] = [_class];
      IncomingLetter['v-s:recipient'] = [result[0]];
      IncomingLetter['v-s:sender'] = [result[1]];

      const Link = new IndividualModel();
      Link['rdf:type'] = [new IndividualModel('v-s:Link')];
      Link['v-s:from'] = [IncomingLetter];
      Link['v-s:to'] = [individual];
      IncomingLetter['v-s:hasLink'] = [Link];

      IncomingLetter['v-s:description'] = individual['v-s:description'];
      riot.route(['#', IncomingLetter.id, '#main', tmpl, 'edit'].join('/'));
    });
  });

  // Проверка разрешения на создание копии
  const This_class = individual['rdf:type'][0];
  This_class.canCreate().then(function (canCreate) {
    if (!canCreate) $('#add-Letter', template).remove();
  });

  $('#add-Letter', template).click(function () {
    const _class = individual['rdf:type'][0];
    const Letter = new IndividualModel();
    const tmpl = 'gen:LetterTemplate';

    Letter['rdf:type'] = [_class];
    Letter['v-s:description'] = individual['v-s:description'];
    Letter['v-s:hasDocumentKind'] = individual['v-s:hasDocumentKind'];

    // Отправитель
    const newSender = new IndividualModel();
    newSender['rdf:type'] = [new IndividualModel('v-s:Correspondent')];
    const senderPromise = individual
      .getPropertyChain('v-s:sender')
      .then(function (senderArr) {
        return senderArr.length > 0 ? senderArr[0].load() : null;
      })
      .then(function (sender) {
        if (sender != null) {
          newSender['v-s:correspondentOrganization'] = sender['v-s:correspondentOrganization'];
          if (individual['rdf:type'][0].id === 'gen:IncomingLetter') {
            newSender['v-s:correspondentDepartmentDescription'] = sender['v-s:correspondentDepartmentDescription'];
            newSender['v-s:correspondentPersonDescription'] = sender['v-s:correspondentPersonDescription'];
          } else if (individual['rdf:type'][0].id === 'gen:OutgoingLetter') {
            newSender['v-s:correspondentDepartment'] = sender['v-s:correspondentDepartment'];
            newSender['v-s:correspondentPerson'] = sender['v-s:correspondentPerson'];
          }
        }
        return newSender;
      });

    // Получатель
    const newRecipient = new IndividualModel();
    newRecipient['rdf:type'] = [new IndividualModel('v-s:Correspondent')];
    const recipientPromise = individual
      .getPropertyChain('v-s:recipient')
      .then(function (recipientArr) {
        return recipientArr.length > 0 ? recipientArr[0].load() : null;
      })
      .then(function (recipient) {
        if (recipient != null) {
          newRecipient['v-s:correspondentOrganization'] = recipient['v-s:correspondentOrganization'];
          if (individual['rdf:type'][0].id === 'gen:OutgoingLetter') {
            newRecipient['v-s:correspondentDepartmentDescription'] = recipient['v-s:correspondentDepartmentDescription'];
            newRecipient['v-s:correspondentPersonDescription'] = recipient['v-s:correspondentPersonDescription'];
          } else if (individual['rdf:type'][0].id === 'gen:IncomingLetter') {
            newRecipient['v-s:correspondentDepartment'] = recipient['v-s:correspondentDepartment'];
            newRecipient['v-s:correspondentPerson'] = recipient['v-s:correspondentPerson'];
          }
        }
        return newRecipient;
      });
    Promise.all([senderPromise, recipientPromise]).then(function (result) {
      Letter['v-s:sender'] = [result[0]];
      Letter['v-s:recipient'] = [result[1]];
      riot.route(['#', Letter.id, '#main', tmpl, 'edit'].join('/'));
    });
  });

  // Процессная часть
  function processHandler () {
    individual.canUpdate().then(function (canUpdate) {
      if (individual.hasValue('v-wf:isProcess')) {
        $('#send.action', template).remove();
        $('#delete.action', template).remove();
      } else if (individual.isNew() || canUpdate) {
        let complexTemplateUri;
        if (individual['rdf:type'][0].id === 'gen:IncomingLetter') {
          complexTemplateUri = 'v-s:IncomingLetter_ComplexRouteStartForm_Template';
        }
        if (individual['rdf:type'][0].id === 'gen:OutgoingLetter') {
          complexTemplateUri = 'v-s:OutgoingLetter_ComplexRouteStartForm_Template';
        }
        $('#send.action', template).off('click');
        $('#send.action', template).on('click', function () {
          BrowserUtil.send(individual, template, 's-wf:complexRouteTransform', undefined, complexTemplateUri);
        });
      } else {
        $('#send.action', template).remove();
        $('#delete.action', template).remove();
      }
    });
  }
  individual.on('afterUpdate', processHandler);
  processHandler();
  template.one('remove', function () {
    individual.off('afterUpdate', processHandler);
  });

  if (this.hasValue('rdf:type', 'gen:IncomingLetter')) {
    $('#outgoing-print-blank', template).remove();
    $('#incoming-print-blank', template).on('click', function (e) {
      e.preventDefault();
      BrowserUtil.createReport('gen:IncomingLetterPrintBlank', individual);
    });
  } else {
    $('#incoming-print-blank', template).remove();
    $('#createReport', template).off('click');
    $('#createReport', template).on('click', function (e) {
      e.preventDefault();
      BrowserUtil.createReport('gen:OutgoingLetterPrintBlank_pdf', individual);
    });
    $('#createReport1', template).off('click');
    $('#createReport1', template).on('click', function (e) {
      e.preventDefault();
      BrowserUtil.createReport('gen:OutgoingLetterPrintBlank_rtf', individual);
    });
  }
};

export const html = `
  <div>
    <div class="container sheet">
      <h3 class="margin-sm">
        <span about="@" property="rdf:type"></span>
        <small about="@" property="rdfs:label" class="view edit -search"></small>
      </h3>
      <section id="Sender">
        <h4 class="section-header clearfix">
          <span about="v-s:sender" property="rdfs:label"></span>
          <veda-control data-type="link" rel="v-s:sender" class="-view edit search create pull-right"></veda-control>
        </h4>

        <div rel="v-s:sender" class="view edit search" data-template="gen:CorrespondentTemplateNew" data-embedded="true"></div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:hasLetterRegistrationRecordSender" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div
              rel="v-s:hasLetterRegistrationRecordSender"
              class="view edit search"
              data-template="gen:LetterRegistrationRecordTemplateNew"
              data-embedded="true"></div>
            <veda-control data-type="link" rel="v-s:hasLetterRegistrationRecordSender" class="-view edit search create"></veda-control>
          </div>
        </div>
      </section>

      <section id="Recipient">
        <h4 class="section-header clearfix">
          <span about="v-s:recipient" property="rdfs:label"></span>
          <veda-control data-type="link" rel="v-s:recipient" class="-view edit search create pull-right"></veda-control>
        </h4>

        <div rel="v-s:recipient" class="view edit search" data-template="gen:CorrespondentTemplateNew" data-embedded="true"></div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:hasLetterRegistrationRecordRecipient" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div
              rel="v-s:hasLetterRegistrationRecordRecipient"
              class="view edit search"
              data-template="gen:LetterRegistrationRecordTemplateNew"
              data-embedded="true"></div>
            <veda-control data-type="link" rel="v-s:hasLetterRegistrationRecordRecipient" class="-view edit search create"></veda-control>
          </div>
        </div>
      </section>
      <section id="MainProperties">
        <h4 class="section-header" about="v-s:MainProperties" property="rdfs:label"></h4>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:hasDocumentKind" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:hasDocumentKind" class="view edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:hasDocumentKind" class="-view edit search fulltext dropdown"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:dueDate" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-7">
            <div property="v-s:dueDate" class="view -edit search"></div>
            <veda-control property="v-s:dueDate" data-type="date" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:sheetsCount" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-7">
            <div property="v-s:sheetsCount" class="view -edit search"></div>
            <veda-control property="v-s:sheetsCount" data-type="integer" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:description" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:description" class="view -edit -search"></div>
            <veda-control property="v-s:description" data-type="text" rows="2" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="rdfs:comment" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="rdfs:comment" class="view -edit -search"></div>
            <veda-control property="rdfs:comment" data-type="text" rows="2" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:attachment" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:attachment" data-template="v-ui:FileTemplateWithComment" data-embedded="true"></div>
            <veda-control data-type="file" rel="v-s:attachment" class="-view edit -search create"></veda-control>
          </div>
        </div>
      </section>
      <section id="Delivery">
        <h4 class="section-header clearfix">
          <span about="v-s:hasDelivery" property="rdfs:label"></span>
          <veda-control data-type="link" rel="v-s:hasDelivery" class="-view edit -search create create-modal pull-right"></veda-control>
          <veda-control data-type="link" rel="v-s:hasDelivery" class="-view -edit search create pull-right"></veda-control>
        </h4>
        <div class="table-responsive view edit -search">
          <table class="table no-margin">
            <thead class="result-header">
              <tr>
                <th width="1"><span class="glyphicon glyphicon-search"></span></th>
                <th about="v-s:date" property="rdfs:label"></th>
                <th about="v-s:deliverBy" property="rdfs:label"></th>
                <th about="rdfs:comment" property="rdfs:label"></th>
                <th about="v-s:attachment" property="rdfs:label"></th>
              </tr>
            </thead>
            <tbody rel="v-s:hasDelivery" data-embedded="true">
              <tr>
                <td>
                  <a href="#/@" class="glyphicon glyphicon-search"></a>
                </td>
                <td>
                  <div about="@" property="v-s:date"></div>
                </td>
                <td>
                  <div about="@" rel="v-s:deliverBy" data-template="v-ui:LabelTemplate"></div>
                </td>
                <td>
                  <div about="@" property="rdfs:comment"></div>
                </td>
                <td>
                  <div rel="v-s:attachment" data-template="v-ui:FileMinTemplate" data-embedded="true"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div rel="v-s:hasDelivery" data-template="gen:DeliveryEmbeddedTemplate" data-embedded="true" class="-view -edit search create"></div>
      </section>
      <section id="RelatedLetter">
        <h4 class="section-header" about="v-s:hasRelatedLetter" property="rdfs:label"></h4>
        <div class="table-responsive">
          <table class="table no-margin">
            <thead>
              <tr>
                <th colspan="1"></th>
                <th colspan="3" about="v-s:sender" property="rdfs:label"></th>
                <th colspan="3" about="v-s:recipient" property="rdfs:label"></th>
              </tr>
              <tr class="active">
                <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
                <th about="v-s:correspondentOrganization" property="rdfs:label"></th>
                <th about="v-s:registrationNumber" property="rdfs:label"></th>
                <th about="v-s:registrationDate" property="rdfs:label"></th>
                <th about="v-s:correspondentOrganization" property="rdfs:label"></th>
                <th about="v-s:registrationNumber" property="rdfs:label"></th>
                <th about="v-s:registrationDate" property="rdfs:label"></th>
              </tr>
            </thead>
            <tbody rel="v-s:hasRelatedLetter">
              <tr>
                <td about="@" data-template="v-ui:IconModalTemplate"></td>
                <td rel="v-s:sender"><span property="v-s:correspondentOrganization" data-template="v-ui:LabelTemplate"> </span></td>
                <td rel="v-s:hasLetterRegistrationRecordSender"><span property="v-s:registrationNumber" data-template="v-ui:LabelTemplate"> </span></td>
                <td rel="v-s:hasLetterRegistrationRecordSender"><span property="v-s:registrationDate" data-template="v-ui:LabelTemplate"> </span></td>
                <td rel="v-s:recipient"><span property="v-s:correspondentOrganization" data-template="v-ui:LabelTemplate"> </span></td>
                <td rel="v-s:hasLetterRegistrationRecordRecipient"><span property="v-s:registrationNumber" data-template="v-ui:LabelTemplate"> </span></td>
                <td rel="v-s:hasLetterRegistrationRecordRecipient"><span property="v-s:registrationDate" data-template="v-ui:LabelTemplate"> </span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <veda-control data-type="link" rel="v-s:hasRelatedLetter" class="-view edit search fulltext"></veda-control>
      </section>
      <br />
      <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
      <br />
      <div class="actions view edit -search">
        <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send save edit cancel delete journal task"></span>
        <button
          type="button"
          class="action btn btn-success view -edit -search"
          id="add-OutgoingLetter"
          about="v-s:OutgoingLetter"
          property="rdfs:label"></button>
        <button
          type="button"
          class="action btn btn-success view -edit -search"
          id="add-IncomingLetter"
          about="v-s:IncomingLetter"
          property="rdfs:label"></button>
        <button type="button" class="action btn btn-default view -edit -search" id="add-Letter" about="v-s:Clone" property="rdfs:label"></button>
        <button
          type="button"
          class="action btn btn-info view -edit -search"
          id="incoming-print-blank"
          about="v-s:IncomingLetterPrintBlank"
          property="rdfs:label"></button>
        <div class="btn-group dropup" id="outgoing-print-blank">
          <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span about="v-s:OutgoingLetterPrintBlank" property="rdfs:label"></span>
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li><a href="#" id="createReport" about="v-s:OutgoingLetterPrintBlank_pdf" property="rdfs:label"></a></li>
            <li><a href="#" id="createReport1" about="v-s:OutgoingLetterPrintBlank_rtf" property="rdfs:label"></a></li>
          </ul>
        </div>
      </div>
    </div>
    <div about="@" class="container sheet view edit -search" data-template="v-s:LinksTemplate" data-embedded="true"></div>
    <div about="@" class="container sheet view -edit -search" data-template="v-s:CommentsTemplate"></div>
  </div>
`;
