import BrowserUtil from '/js/browser/util.js';
import $ from 'jquery';
import veda from '/js/common/veda.js';
import IndividualModel from '/js/common/individual_model.js';
import riot from 'riot';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  //Права зеленных кнопок
  var _class  = new IndividualModel("v-s:BusinessTripRegistrationRecord");
  var _class2 = new IndividualModel("gen:ChangeOfTerms");
  _class.canCreate().then(function(result) {
//    if (!result) $("#add-regEntry", template).remove();
  });
  var changeOfTermsCanCreate = _class2.canCreate();
  changeOfTermsCanCreate.then(function(result){
    if (!result) $("#add-ChangeOfBusinessTrip", template).remove();
  });
  function handler() {
    changeOfTermsCanCreate.then(function(result) {
      if(!result){
        $("#notify.action", template).remove();
      } else if( result && !individual.hasValue("gen:hasChangeOfTerms") ) {
        $("#notify.action", template).hide();
      } else {
        $("#notify.action", template).show();
      }
    });
  }
  handler("gen:hasChangeOfTerms", individual["gen:hasChangeOfTerms"]);
  individual.on("propertyModified", handler);
  template.one("remove", function () {
    individual.off("propertyModified", handler);
  });
  template.on("validate", function () {
    var result = {};
    if ( individual.hasValue("gen:hasBusinessTripTransportKind","d:2078749d2bcf42e0ae80c5d8287d19d9") ) {
      result["gen:isTicketRefund"] = {
        state: individual.hasValue("gen:isTicketRefund"),
        cause: ["v-ui:minCardinality"]
      };
      result["gen:isTicketExchange"] = {
        state: individual.hasValue("gen:isTicketExchange"),
        cause: ["v-ui:minCardinality"]
      };
    }
    template[0].dispatchEvent(new CustomEvent("validated", {detail: result}));
  });
};

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $("#add-copy", template).click(function () {
    var _class = new IndividualModel("gen:BusinessTrip"),
        BusinessTrip = new IndividualModel(),
        tmpl = "gen:BusinessTripTemplate" ;
    BusinessTrip["rdf:type"] = [_class] ;
    BusinessTrip["v-s:businessTripEmployee"]=individual["v-s:businessTripEmployee"] ;
    BusinessTrip["v-s:businessTripDepartment"]=individual["v-s:businessTripDepartment"] ;
    BusinessTrip["v-s:businessTripGoal"]=individual["v-s:businessTripGoal"] ;
    BusinessTrip["gen:businessTripOrganization"]=individual["gen:businessTripOrganization"] ;
    BusinessTrip["gen:hasBusinessTripPurpose"]=individual["gen:hasBusinessTripPurpose"] ;
    BusinessTrip["v-s:hasClassifierCountry"]=individual["v-s:hasClassifierCountry"] ;
    BusinessTrip["gen:hasBusinessTripDirection"]=individual["gen:hasBusinessTripDirection"] ;
    BusinessTrip["gen:businessTripOrganizationDescription"]=individual["gen:businessTripOrganizationDescription"] ;
    BusinessTrip["v-s:dateFrom"]=individual["v-s:dateFrom"] ;
    BusinessTrip["v-s:dateTo"]=individual["v-s:dateTo"] ;
    BusinessTrip["v-s:duration"]=individual["v-s:duration"] ;
    riot.route( ["#", BusinessTrip.id, "#main", tmpl, "edit"].join("/") ) ;
    BusinessTrip.one("afterSave", function () {
      setTimeout(() => {
        riot.route("#/" + BusinessTrip.id, false);
      }, 250);
    });
  });

//Скрипты зеленных кнопок
$("#add-RegRecord", template).click(function () {
    var modal = $("#notification-modal-template").html();
    modal = $(modal);
    modal.modal({"show": false});
    $("body").append(modal);
    modal.modal("show");
    template.one("remove", function () {
      modal.modal("hide").remove();
    });
    var cntr = $(".modal-body", modal),
      _class = new IndividualModel("v-s:BusinessTripRegistrationRecord"),
      RegRecord = new IndividualModel(),
      tmpl = new IndividualModel("gen:BusinessTripRegistrationRecordTemplate");

    RegRecord["rdf:type"] = [_class];
    RegRecord["v-s:backwardTarget"] = [individual];
    RegRecord["v-s:backwardProperty"] = [new IndividualModel("v-s:hasBusinessTripRegistrationRecord")];
    RegRecord["v-s:canRead"] = [ true ];
    RegRecord.present(cntr, tmpl, "edit");
    RegRecord.one("beforeReset", function () {
      modal.modal("hide").remove();
    });
    RegRecord.one("afterSave", function () {
      modal.modal("hide").remove();
    });
  });
  function handler(property_uri){
    if (individual.hasValue("v-s:hasBusinessTripRegistrationRecord")){
      $("#buttonReg").hide();
    }else{
      $("#buttonReg").show();
    }
  }
  individual.on("propertyModified", handler);
  template.one("remove", function () {
    individual.off("propertyModified", handler);
  });
  handler("v-s:BusinessTripRegistrationRecord");

  $("#add-ChangeOfTerms", template).click(function () {
    var modal = $("#notification-modal-template").html();
    modal = $(modal);
    modal.modal({"show": false});
    $("body").append(modal);
    modal.modal("show");
    template.one("remove", function () {
      modal.modal("hide").remove();
    });
    var cntr = $(".modal-body", modal),
      _class = new IndividualModel("gen:ChangeOfTerms"),
      ChangeOfTerms = new IndividualModel(),
      tmpl = new IndividualModel("gen:ChangeOfTermsTemplate");
    ChangeOfTerms["rdf:type"] = [_class];
    ChangeOfTerms["v-s:backwardTarget"] = [individual];
    ChangeOfTerms["v-s:backwardProperty"] = [new IndividualModel("gen:hasChangeOfTerms")];
    ChangeOfTerms["v-s:canRead"] = [ true ];
    ChangeOfTerms.present(cntr, tmpl, "edit");
    ChangeOfTerms.one("beforeReset", function () {
      modal.modal("hide").remove();
    });
    ChangeOfTerms.one("afterSave", function () {
      modal.modal("hide").remove();
    });
  });

  $("#add-DeviationOnExpenses", template).click(function () {
    var modal = $("#notification-modal-template").html();
    modal = $(modal);
    modal.modal({"show": false});
    $("body").append(modal);
    modal.modal("show");
    template.one("remove", function () {
      modal.modal("hide").remove();
    });
    var cntr = $(".modal-body", modal),
      _class = new IndividualModel("gen:DeviationOnExpenses"),
      DeviationOnExpenses = new IndividualModel(),
      tmpl = new IndividualModel("gen:DeviationOnExpensesTemplate");
    DeviationOnExpenses["rdf:type"] = [_class];
    DeviationOnExpenses["v-s:backwardTarget"] = [individual];
    DeviationOnExpenses["v-s:backwardProperty"] = [new IndividualModel("gen:hasDeviationOnExpenses")];
    DeviationOnExpenses["v-s:canRead"] = [ true ];
    DeviationOnExpenses.present(cntr, tmpl, "edit");
    DeviationOnExpenses.one("beforeReset", function () {
      modal.modal("hide").remove();
    });
    DeviationOnExpenses.one("afterSave", function () {
      modal.modal("hide").remove();
    });
  });








  function ModifiedHandlerSupplier() {
    if (template.data("mode") === "edit" && individual.hasValue("v-s:supplier")){
      if (!individual.hasValue("gen:businessTripOrganization")) {
        individual.getPropertyChain('v-s:supplier', 'v-s:shortLabel').then(function(shortLabel) {
          if (shortLabel.length > 0) individual["gen:businessTripOrganization"] = shortLabel;
        })
      }
      if (!individual.hasValue("gen:hasClassifierCountry")) {
        individual.getPropertyChain('v-s:supplier', 'v-s:hasClassifierCountry').then(function(country) {
          if (country.length > 0) individual["gen:hasClassifierCountry"] = country;
        })
      }

      if (!individual.hasValue("gen:businessTripOrganizationDescription")) {
        individual.getPropertyChain('v-s:supplier', 'v-s:legalAddress').then(function(legalAddress) {
          if (legalAddress.length > 0) individual["gen:businessTripOrganizationDescription"] = legalAddress;
        })
      }
    }
  }
  ModifiedHandlerSupplier();

  function getDepartment () {
    if ( individual.hasValue("v-s:businessTripEmployee") && template.data("mode") === "edit" ){
      individual.getPropertyChain('v-s:businessTripEmployee', 'v-s:parentUnit').then(function(parentUnit) {
        individual["v-s:businessTripDepartment"] = parentUnit ;
      })
    }
  }

  function directionBT () {
    if ( template.data("mode") === "edit" ) {
      if (individual.hasValue("v-s:hasClassifierCountry", new IndividualModel("d:Country_RUS")) ){
        individual["gen:hasBusinessTripDirection"] = [new IndividualModel("d:87116c2092da45cba4300daa6de0b748")] ;
      }
      else
        individual["gen:hasBusinessTripDirection"] = [new IndividualModel("d:d4cf39d06aec4a9aafcd4663f7996125")] ;
    }
  }

  individual.on("v-s:supplier", ModifiedHandlerSupplier);
  individual.on("v-s:businessTripEmployee", getDepartment);
  individual.on('v-s:hasClassifierCountry', directionBT);
  template.one("remove", function () {
    individual.off("v-s:supplier", ModifiedHandlerSupplier);
    individual.off("v-s:businessTripEmployee", getDepartment);
    individual.off('v-s:hasClassifierCountry', directionBT);
  });

  //Процессная часть
  function processHandler() {
    individual.canUpdate().then(function (canUpdate) {
      var userId = "cfg:Administrator"//Администратор
      if ( veda.user.id !==  userId && individual.hasValue("v-wf:isProcess") ) {
        $('#send.action', template).remove();
        $('#save.action', template).remove();
        $('#edit.action', template).remove();
        $('#delete.action', template).remove();
      } else if (individual.isNew() || canUpdate) {
        $('#send.action', template).off("click");
        $('#send.action', template).on('click', function () {
          BrowserUtil.send(individual, template, 's-wf:complexRouteTransform', undefined, 'gen:BusinessTrip_ComplexRouteStartForm_Template');
        });
      } else {
          $('#send.action', template).remove();
          $('#delete.action', template).remove();
      }
    })
  }
  processHandler();

  individual.on("afterReset", processHandler);
  template.one("remove", function () {
    individual.off("afterReset", processHandler);
  });

  function notifyHandler() {
    if ( template.data("mode") != "search" ) {
      if ( individual.hasValue("gen:hasChangeOfTerms") ) {
        $('#notify.action', template).removeClass("hidden");
        $('#notify.action', template).off("click");
        $('#notify.action', template).on('click', function () {
          BrowserUtil.send(individual, template, 's-wf:complexRouteTransform', undefined, 'gen:BusinessTrip_ComplexRouteStartForm_Template');
        });
      } else {
        $('#notify.action', template).addClass("hidden");
      }
    }
  }
  notifyHandler();

  individual.on("gen:hasChangeOfTerms", notifyHandler);
  template.one("remove", function () {
    individual.off("gen:hasChangeOfTerms", notifyHandler);
  });

  function handler1(property_uri) {
    if ( individual.hasValue("v-s:hasBusinessTripRegistrationRecord") ) {
      $("#add-regEntry", template).addClass("hidden");
    } else {
      $("#add-regEntry", template).removeClass("hidden");
    }
  }
  handler1("v-s:hasBusinessTripRegistrationRecord");

  individual.on("propertyModified", handler1);
  template.one("remove", function () {
    individual.off("propertyModified", handler1);
  });

  if ( template.data("mode") === "edit" &&
    (
      individual.hasValue("v-wf:hasStatusWorkflow", "v-wf:Completed")
      || individual.hasValue("v-wf:isProcess")
    )
  ) {
    $(".action#save, .action#edit, .action#cancel, .action#delete", template).remove();
  }

  /*function showBoolean () {
    if ( mode != "search") {
      if ( individual.hasValue("gen:hasBusinessTripTransportKind","d:2078749d2bcf42e0ae80c5d8287d19d9") ) {
        $("#ticketRefund", template).removeClass("hidden");
      } else {
        $("#ticketRefund", template).addClass("hidden");
        individual["gen:isTicketRefund"] = [] ;
        individual["gen:isTicketExchange"] = [] ;
      }
    }
    else if ( mode === "search") {
      $("#ticketRefund", template).removeClass("hidden") ;
    }
  }
  showBoolean();
  individual.on("gen:hasBusinessTripTransportKind", showBoolean);
  template.one("remove", function () {
    individual.off("gen:hasBusinessTripTransportKind", showBoolean);
  });*/
};

export const html = `
<div>
  <div class="container sheet">
    <h2>
      <span about="@" property="rdf:type"></span>
      <small about="@" property="rdfs:label"></small>
    </h2>
    <hr>
    <section>
      <h4 class="section-header clearfix">
        <span about="v-s:hasBusinessTripRegistrationRecord" property="rdfs:label"></span>
        <!--<veda-control data-type="link" rel="v-s:hasBusinessTripRegistrationRecord" data-template="gen:BusinessTripRegistrationRecordTemplate" class="-view edit -search create create-modal pull-right"></veda-control>-->
        <veda-control data-type="link" rel="v-s:hasBusinessTripRegistrationRecord" class="-view -edit search create pull-right"></veda-control>
        <div class="view -edit -search pull-right">
          <button class="btn btn-xs btn-success" id="add-RegRecord">
            <span class="glyphicon glyphicon-zoom-in"></span>
            <span about="v-s:hasBusinessTripRegistrationRecord" property="rdfs:label"></span>
          </button>
        </div>
      </h4>
      <div class="table-responsive -view edit -search">
        <table class="table no-margin">
          <thead class="result-header">
            <tr>
              <th width="1"><span class="glyphicon glyphicon-search"></span></th>
              <th about="gen:RegNumBusinessTripBundle" property="rdfs:label"></th>
              <th about="v-s:registrationDate" property="rdfs:label"></th>
            </tr>
          </thead>
          <tbody rel="v-s:hasBusinessTripRegistrationRecord" >
            <tr>
              <td about="@" data-template="v-ui:IconModalTemplate"></td>
              <td>
                <div about="@" property="v-s:registrationNumber"></div>
              </td>
              <td>
                <div about="@" property="v-s:registrationDate"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
       <div rel="v-s:hasBusinessTripRegistrationRecord" data-template="gen:BusinessTripRegistrationRecordEmbeddedTemplate" data-embedded="true" class="view -edit search create"></div>
    </section>

    <section id="MainProperties">
      <h4 class="section-header" about="v-s:MainProperties" property="rdfs:label"></h4>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:businessTripEmployee" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:businessTripEmployee" class="view -edit search" data-template="gen:BusinessTrip_EmployeeTemplate"></div>
          <veda-control data-type="link" rel="v-s:businessTripEmployee" class="-view edit search fulltext"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:businessTripDepartment" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:businessTripDepartment" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:businessTripDepartment" class="-view edit search fulltext"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:businessTripGoal" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div property="v-s:businessTripGoal" class="view -edit search"></div>
          <veda-control data-type="text" property="v-s:businessTripGoal" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:DestinationOrganizationBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:supplier" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:supplier" class="-view edit search fulltext"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
        </div>
        <div class="col-sm-9 col-xs-7">
          <div property="gen:businessTripOrganization" class="view -edit -search"></div>
          <veda-control data-type="string" property="gen:businessTripOrganization" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:hasClassifierCountry" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:hasClassifierCountry" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:hasClassifierCountry" class="-view edit search fulltext dropdown"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:businessTripOrganizationDescription" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div property="gen:businessTripOrganizationDescription" class="view -edit -search"></div>
          <veda-control data-type="string" property="gen:businessTripOrganizationDescription" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:hasSourceOfTransport" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:hasSourceOfTransport" class="view edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:hasSourceOfTransport" class="-view edit search fulltext dropdown"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:hasBusinessTripTransportKind" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="gen:hasBusinessTripTransportKind" class="view edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="gen:hasBusinessTripTransportKind" class="-view edit search fulltext dropdown"></veda-control>
        </div>
      </div>
      <!--<div id="ticketRefund" class="hidden">
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <strong about="gen:isTicketRefund" property="rdfs:label"></strong>
          </div>
          <div class="col-sm-9 col-xs-7">
            <veda-control property="gen:isTicketRefund" data-type="booleanRadio"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <strong about="gen:isTicketExchange" property="rdfs:label"></strong>
          </div>
          <div class="col-sm-9 col-xs-7">
            <veda-control property="gen:isTicketExchange" data-type="booleanRadio"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <strong about="gen:ticketComment" property="rdfs:label"></strong>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="gen:ticketComment" class="view -edit -search"></div>
            <veda-control data-type="text" property="gen:ticketComment" class="-view edit search"></veda-control>
          </div>
        </div>
      </div>-->
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:date" property="rdfs:label"></label>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div property="v-s:dateFrom" class="view -edit search"></div>
          <veda-control data-type="date" property="v-s:dateFrom" class="-view edit search"></veda-control>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div property="v-s:dateTo" class="view -edit search"></div>
          <veda-control data-type="date" property="v-s:dateTo" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:duration" property="rdfs:label"></label>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div property="v-s:duration" class="view -edit search"></div>
          <veda-control data-type="decimal" property="v-s:duration" class="-view edit search"></veda-control>
        </div>
      </div>
    </section>
    <section id="hasChangeOfTerms">
      <h4 class="section-header clearfix">
        <span about="gen:ChangeOfTerms" property="rdfs:label"></span>
        <!--<veda-control data-type="link" rel="gen:hasChangeOfBusinessTrip" data-template="gen:ChangeOfTermsTemplate" class="-view edit -search create create-modal pull-right"></veda-control>-->
        <veda-control data-type="link" rel="gen:hasChangeOfTerms" class="-view -edit search create pull-right"></veda-control>
        <div class="view -edit -search pull-right">
          <button class="btn btn-xs btn-success" id="add-ChangeOfTerms">
            <span class="glyphicon glyphicon-zoom-in"></span>
            <span about="gen:hasChangeOfTerms" property="rdfs:label"></span>
          </button>
        </div>
      </h4>
      <div class="table-responsive view edit -search">
        <table class="table no-margin">
          <thead class="result-header">
            <tr>
              <th width="1"><span class="glyphicon glyphicon-search"></span></th>
              <th colspan="2" about="gen:datesChangesBundle" property="rdfs:label"></th>
              <th about="v-s:duration" property="rdfs:label"></th>
              <th about="rdfs:comment" property="rdfs:label"></th>
            </tr>
          </thead>
          <tbody rel="gen:hasChangeOfTerms" >
            <tr>
              <td about="@" data-template="v-ui:IconModalTemplate"></td>
              <td>
                <div about="@" property="v-s:dateFrom"></div>
              </td>
              <td>
                <div about="@" property="v-s:dateTo"></div>
              </td>
              <td>
                <div about="@" property="v-s:duration"></div>
              </td>
              <td>
                <div about="@" property="rdfs:comment"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div rel="gen:hasChangeOfTerms" data-template="gen:ChangeOfTermsEmbeddedTemplate" data-embedded="true" class="-view -edit search create"></div>
    </section>
    <section id="DeviationOnExpenses">
      <h4 class="section-header clearfix">
        <span about="gen:hasDeviationOnExpenses" property="rdfs:label"></span>
        <!--<veda-control data-type="link" rel="gen:hasDeviationOnExpenses" data-template="gen:DeviationOnExpensesTemplate" class="-view edit -search create create-modal pull-right"></veda-control>-->
        <veda-control data-type="link" rel="gen:hasDeviationOnExpenses" class="-view -edit search create pull-right"></veda-control>
        <div class="view -edit -search pull-right">
          <button class="btn btn-xs btn-success" id="add-DeviationOnExpenses">
            <span class="glyphicon glyphicon-zoom-in"></span>
            <span about="gen:hasDeviationOnExpenses" property="rdfs:label"></span>
          </button>
        </div>
      </h4>
      <div class="table-responsive view edit -search">
        <table class="table no-margin">
          <thead class="result-header">
            <tr>
              <th width="1"><span class="glyphicon glyphicon-search"></span></th>
              <th about="v-s:hasBusinessTripReasonDeviationOnExpenses" property="rdfs:label"></th>
              <th about="v-s:description" property="rdfs:label"></th>
            </tr>
          </thead>
          <tbody rel="gen:hasDeviationOnExpenses" >
            <tr>
              <td about="@" data-template="v-ui:IconModalTemplate"></td>
              <td>
                <div rel="v-s:hasBusinessTripReasonDeviationOnExpenses" data-template="v-ui:LabelTemplate"></div>
              </td>
              <td>
                <div about="@" property="v-s:description"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div rel="gen:hasDeviationOnExpenses" data-template="gen:DeviationOnExpensesEmbeddedTemplate" data-embedded="true" class="-view -edit search create"></div>
    </section>
    <hr>
    <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
    <br>
    <!-- BUTTONS -->
    <div class="actions view edit -search">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="send edit save cancel delete journal task"></span>
      <span class=" view -edit -search">
        <button type="button" class="action btn btn-warning view -edit -search" id="notify" about="gen:NotifyBundle" property="rdfs:label"/>
        <button type="button" class="action btn btn-default view -edit -search" id="add-copy" about="v-s:Clone" property="rdfs:label" />
      </span>
    </div>
  </div>
  <div about="@" class="container sheet view edit -search" data-template="v-s:LinksTemplate" data-embedded="true"></div>
  <div about="@" class="container sheet view -edit -search" data-template="v-s:CommentsTemplate"></div>
</div>
`;
