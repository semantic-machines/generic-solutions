import BrowserUtil from '/js/browser/util.js';
import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  individual.canUpdate().then(function(canUpdate){
    if (individual.hasValue("v-wf:isProcess")) {
      $('#send.action', template).remove();
      //$('#save.action', template).remove();
    } else if (individual.isNew() || canUpdate) {
      $('#send.action', template).off("click");
      $('#send.action', template).on('click', function () {
        BrowserUtil.send(individual, template, 's-wf:complexRouteTransform', undefined, 'gen:Meeting_ComplexRouteStartForm_Template');

      });
    } else {
      $('#send.action', template).remove();
      $('#save.action', template).remove();
    }
  })

  $("#bluePlus", template).click(function () {
    individual.save();
  });

  $("#add-action", template).click(function () {
    var modal = $("#notification-modal-template").html();
    modal = $(modal);
    modal.modal({"show": false});
    $("body").append(modal);
    modal.modal("show");
    template.one("remove", function () {
      modal.modal("hide").remove();
    });
    var cntr = $(".modal-body", modal),
      _class = new IndividualModel("v-s:Action"),
      Action = new IndividualModel(),
      tmpl = new IndividualModel("gen:MeetingActionTemplate");
    Action["rdf:type"] = [_class];
    Action["v-s:backwardTarget"] = [individual];
    Action["v-s:backwardProperty"] = [new IndividualModel("v-s:hasAction")];
    Action["v-s:canRead"] = [ true ];
    Action.present(cntr, tmpl, "edit");
    Action.one("beforeReset", function () {
      modal.modal("hide").remove();
    });
    Action.one("afterSave", function () {
      modal.modal("hide").remove();
    });
  });


  //Процессная часть
  function processHandler() {
    individual.canUpdate().then(function(canUpdate) {
      if ( individual.hasValue("v-wf:isProcess")) {
        $("#send.action", template).attr("disabled", "disabled");
        $("#delete.action", template).attr("disabled", "disabled");
        $("#add-action", template).attr("disabled", "disabled");
        $("#bluePlus .create", template).attr("disabled", "disabled").off('click');
      } else if (individual.isNew() || canUpdate) {
        $('#send.action', template).off("click");
        $('#send.action', template).on('click', function () {
          BrowserUtil.send(individual, template, 's-wf:complexRouteTransform', undefined, 'gen:Meeting_ComplexRouteStartForm_Template');
        });
       } else {
        $("#add-action", template).removeAttr("disabled");
      }
    })
  }
  processHandler();
  individual.on("v-wf:isProcess", processHandler);
  template.one("remove", function () {
    individual.off("v-wf:isProcess", processHandler);
  });
};

export const html = `
<div>
  <div class="container sheet">
    <h3 class="margin-sm">
      <span about="@" property="rdf:type"></span>
      <small about="@" property="rdfs:label" class="view edit -search"></small>
    </h3>
    <section id="MainProperties">
      <h4 class="section-header" about="v-s:MainProperties" property="rdfs:label"></h4>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:theme" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div class="view -edit -search bg-warning padding-md"><strong property="v-s:theme"></strong></div>
          <veda-control data-type="string" property="v-s:theme" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:registrationNumber" property="rdfs:label"></label>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div property="v-s:registrationNumber" class="view -edit -search"></div>
          <veda-control data-type="text" property="v-s:registrationNumber" class="-view -edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:DateFromBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div property="v-s:dateFrom" class="view -edit search"></div>
          <veda-control data-type="dateTime" property="v-s:dateFrom" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:responsibleDepartment" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:responsibleDepartment" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:responsibleDepartment" class="-view edit search fulltext"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:agenda" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div property="v-s:agenda" class="view -edit search"></div>
          <veda-control data-type="text" rows="3" property="v-s:agenda" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:meetingDecision" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div property="v-s:meetingDecision" class="view -edit search"></div>
          <veda-control data-type="text" rows="3" property="v-s:meetingDecision" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:attachment" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:attachment" data-template="v-ui:FileTemplateWithComment" data-embedded="true"></div>
          <veda-control data-type="file"  rel="v-s:attachment" class="-view edit -search"></veda-control>
        </div>
      </div>

    <section id="Participants">
      <h4 class="section-header" about="gen:MeetingParticipantsBundle" property="rdfs:label"></h4>

      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:MeetingMemberBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:member" class="view edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:member" class="-view edit search fulltext tree"></veda-control>
        </div>
      </div>
      <br>

      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:MeetingThirdPartyParticipantBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">

          <table class="table no-margin">
            <tbody rel="v-s:hasThirdPartyParticipant" data-template="gen:MeetingThirdPartyParticipantEmbeddedTemplate" data-embedded="true"></tbody>
          </table>
          <div class="row row-attribute">
            <div class="col-sm-1 col-xs-1">
              <veda-control rel="v-s:hasThirdPartyParticipant" data-type="link" class="-view edit search create"></veda-control>
            </div>
            <div class="col-sm-11 col-xs-9">
              <label about="gen:addMeetingThirdPartyParticipant" property="rdfs:label" class="-view edit -search"></label>
            </div>
          </div>

        </div>
      </div>
    </section>


      <section id="hasAction">
        <h4 class="section-header clearfix">
          <span about="gen:HasActionBundle" property="rdfs:label"></span>
          <veda-control data-type="link" rel="v-s:hasAction" class="-view -edit search create pull-right"></veda-control>
          <div class="view -edit -search pull-right">
            <button class="btn btn-xs btn-success" id="add-action">
              <span class="glyphicon glyphicon-zoom-in"></span>
              <span about="v-s:hasAction" property="rdfs:label"></span>
            </button>
          </div>
        </h4>
        <div class="table-responsive view edit -search">
          <table class="table no-margin">
            <thead class="result-header">
              <tr>
                <th width="1"><span class="glyphicon glyphicon-search"></span></th>
                <th about="v-s:registrationNumber" property="rdfs:label"></th>
                <th about="v-s:description" property="rdfs:label"></th>
                <th about="v-s:responsible" property="rdfs:label"></th>
                <th about="v-s:dateToPlan" property="rdfs:label"></th>
                <th about="v-s:hasStatus" property="rdfs:label"></th>
              </tr>
            </thead>
            <tbody rel="v-s:hasAction" >
              <tr>
                <td about="@" data-template="v-ui:IconModalTemplate"></td>
                <td>
                  <div about="@" property="v-s:registrationNumber"></div>
                </td>
                <td>
                  <div about="@" property="v-s:description"></div>
                </td>
                <td>
                  <div about="@" rel="v-s:responsible" data-template="v-ui:LabelTemplate"></div>
                </td>
                <td>
                  <div about="@" property="v-s:dateToPlan"></div>
                </td>
                <td>
                  <div about="@" rel="v-s:hasStatus" data-template="v-ui:LabelTemplate"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div rel="v-s:hasAction" data-template="gen:ActionEmbeddedTemplate" data-embedded="true" class="-view -edit search create"></div>
      </section>


    </section>
    <hr>
    <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
    <br>
    <br>
    <div class="actions view edit -search">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send edit save cancel delete journal task"></span>
    </div>
  </div>
  <div about="@" class="container sheet view edit -search" data-template="v-s:LinksTemplate" data-embedded="true"></div>
  <div about="@" class="container sheet view -edit -search" data-template="v-s:CommentsTemplate"></div>
</div>
`;
