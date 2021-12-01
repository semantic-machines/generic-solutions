import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  var decisionContractorCategoryState = $("#decisionContractorCategoryState", template);

  individual.on("v-s:isOrganizationOk", handler);
  template.one("remove", function () {
    individual.off("v-s:isOrganizationOk", handler);
  });
  function handler(values) {
    if (values[0] === true) {
      decisionContractorCategoryState.removeClass("alert-danger alert-warning").addClass("alert-success");
    } else if (values[0] === false) {
      decisionContractorCategoryState.removeClass("alert-success alert-warning").addClass("alert-danger");
    } else {
      decisionContractorCategoryState.removeClass("alert-success alert-danger").addClass("alert-warning");
    }
  }
  handler(individual["v-s:isOrganizationOk"]);
};

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $("#add-ContractorCategoryDecisionSecurity", template).click(function () {
    var modal = $("#notification-modal-template").html();
    modal = $(modal);
    modal.modal({"show": false});
    $("body").append(modal);
    modal.modal("show");
    template.one("remove", function () {
      modal.modal("hide").remove();
    });
    var cntr = $(".modal-body", modal),
        _class = new IndividualModel("v-s:ContractorCategoryDecisionSecurity"),
        ContractorCategoryDecisionSecurity = new IndividualModel(),
        tmpl = new IndividualModel("gen:ContractorCategoryDepartmentDecisionTemplate");
    ContractorCategoryDecisionSecurity["rdf:type"] = [_class];
    ContractorCategoryDecisionSecurity["v-s:backwardTarget"] = [individual];
    ContractorCategoryDecisionSecurity["v-s:backwardProperty"] = [new IndividualModel("v-s:hasContractorCategoryDecisionSecurity")];
    ContractorCategoryDecisionSecurity.present(cntr, tmpl, "edit");
    ContractorCategoryDecisionSecurity.one("beforeReset", function () {
      modal.modal("hide").remove();
    });
    ContractorCategoryDecisionSecurity.one("afterSave", function () {
      modal.modal("hide").remove();
    });
    template.one("remove", function () {
      modal.modal("hide");
    });
  });

  $("#add-ContractorCategoryDecisionLegal", template).click(function () {
    var modal = $("#notification-modal-template").html();
    modal = $(modal);
    modal.modal({"show": false});
    $("body").append(modal);
    modal.modal("show");
    template.one("remove", function () {
      modal.modal("hide").remove();
    });
    var cntr = $(".modal-body", modal),
        _class = new IndividualModel("v-s:ContractorCategoryDecisionLegal"),
        ContractorCategoryDecisionLegal = new IndividualModel(),
        tmpl = new IndividualModel("gen:ContractorCategoryDepartmentDecisionTemplate");
    ContractorCategoryDecisionLegal["rdf:type"] = [_class];
    ContractorCategoryDecisionLegal["v-s:backwardTarget"] = [individual];
    ContractorCategoryDecisionLegal["v-s:backwardProperty"] = [new IndividualModel("v-s:hasContractorCategoryDecisionLegal")];
    ContractorCategoryDecisionLegal.present(cntr, tmpl, "edit");
    ContractorCategoryDecisionLegal.one("beforeReset", function () {
      modal.modal("hide").remove();
    });
    ContractorCategoryDecisionLegal.one("afterSave", function () {
      modal.modal("hide").remove();
    });
  });

  $("#add-ContractorCategoryDecisionFinancial", template).click(function () {
    var modal = $("#notification-modal-template").html();
    modal = $(modal);
    modal.modal({"show": false});
    $("body").append(modal);
    modal.modal("show");
    template.one("remove", function () {
      modal.modal("hide").remove();
    });
    var cntr = $(".modal-body", modal),
        _class = new IndividualModel("v-s:ContractorCategoryDecisionFinancial"),
        ContractorCategoryDecisionFinancial = new IndividualModel(),
        tmpl = new IndividualModel("gen:ContractorCategoryDepartmentDecisionTemplate");
    ContractorCategoryDecisionFinancial["rdf:type"] = [_class];
    ContractorCategoryDecisionFinancial["v-s:backwardTarget"] = [individual];
    ContractorCategoryDecisionFinancial["v-s:backwardProperty"] = [new IndividualModel("v-s:hasContractorCategoryDecisionFinancial")];
    ContractorCategoryDecisionFinancial.present(cntr, tmpl, "edit");
    ContractorCategoryDecisionFinancial.one("beforeReset", function () {
      modal.modal("hide").remove();
    });
    ContractorCategoryDecisionFinancial.one("afterSave", function () {
      modal.modal("hide").remove();
    });
  });

  $("#add-ContractorCategoryDecisionManagement", template).click(function () {
    var modal = $("#notification-modal-template").html();
    modal = $(modal);
    modal.modal({"show": false});
    $("body").append(modal);
    modal.modal("show");
    template.one("remove", function () {
      modal.modal("hide").remove();
    });
    var cntr = $(".modal-body", modal),
        _class = new IndividualModel("v-s:ContractorCategoryDecisionManagement"),
        ContractorCategoryDecisionFinancial = new IndividualModel(),
        tmpl = new IndividualModel("gen:ContractorCategoryDepartmentDecisionTemplate");
    ContractorCategoryDecisionFinancial["rdf:type"] = [_class];
    ContractorCategoryDecisionFinancial["v-s:backwardTarget"] = [individual];
    ContractorCategoryDecisionFinancial["v-s:backwardProperty"] = [new IndividualModel("v-s:hasContractorCategoryDecisionManagement")];
    ContractorCategoryDecisionFinancial.present(cntr, tmpl, "edit");
    ContractorCategoryDecisionFinancial.one("beforeReset", function () {
      modal.modal("hide").remove();
    });
    ContractorCategoryDecisionFinancial.one("afterSave", function () {
      modal.modal("hide").remove();
    });
  });
  
  var _classSecurity = new IndividualModel('v-s:ContractorCategoryDecisionSecurity');
  var _classLegal = new IndividualModel('v-s:ContractorCategoryDecisionLegal');
  var _classFinancial = new IndividualModel('v-s:ContractorCategoryDecisionFinancial');
  var _classManagement = new IndividualModel('v-s:ContractorCategoryDecisionManagement');
  Promise.all([_classSecurity.canCreate(), _classLegal.canCreate(), _classFinancial.canCreate(), _classManagement.canCreate(), individual.canUpdate()]).then(function (rights) {
    var canCreateSecurity = rights[0],
        canCreateLegal = rights[1],
        canCreateFinancial = rights[2],
        canCreateManagement = rights[3],
        canUpdateIndividual = rights[4],
        hasRightsSecurity = canCreateSecurity && canUpdateIndividual,
        hasRightsLegal = canCreateLegal && canUpdateIndividual,
        hasRightsFinancial = canCreateFinancial && canUpdateIndividual,
        hasRightsManagement = canCreateManagement && canUpdateIndividual;
        individual.on("v-s:hasContractorCategoryDecisionSecurity", handlerSecurity);
    template.one("remove", function () {
      individual.off("v-s:hasContractorCategoryDecisionSecurity", handlerSecurity);
    });
    function handlerSecurity(values) {
      if (values.length || !hasRightsSecurity) {
        $("#add-ContractorCategoryDecisionSecurity", template).remove();
      }
    }
    handlerSecurity(individual["v-s:hasContractorCategoryDecisionSecurity"]);

    individual.on("v-s:hasContractorCategoryDecisionLegal", handlerLegal);
    template.one("remove", function () {
      individual.off("v-s:hasContractorCategoryDecisionLegal", handlerLegal);
    });
    function handlerLegal(values) {
      if (values.length || !hasRightsLegal) {
        $("#add-ContractorCategoryDecisionLegal", template).remove();
      }
    }
    handlerLegal(individual["v-s:hasContractorCategoryDecisionLegal"]);

    individual.on("v-s:hasContractorCategoryDecisionFinancial", handlerFinancial);
    template.one("remove", function () {
      individual.off("v-s:hasContractorCategoryDecisionFinancial", handlerFinancial);
    });
    function handlerFinancial(values) {
      if (values.length || !hasRightsFinancial) {
        $("#add-ContractorCategoryDecisionFinancial", template).remove();
      }
    }
    handlerFinancial(individual["v-s:hasContractorCategoryDecisionFinancial"]);

    individual.on("v-s:hasContractorCategoryDecisionManagement", handlerManagement);
    template.one("remove", function () {
      individual.off("v-s:hasContractorCategoryDecisionManagement", handlerManagement);
    });
    function handlerManagement(values) {
      if (values.length || !hasRightsManagement) {
        $("#add-ContractorCategoryDecisionManagement", template).remove();
      }
    }
    handlerManagement(individual["v-s:hasContractorCategoryDecisionManagement"]);

  });
};

export const html = `
<div class="container sheet">
  <h2>
    <span about="v-s:ContractorCategoryDecision" property="rdfs:label"></span><br>
    <small about="@" property="rdfs:label"></small>
  </h2>
  <span about="@" data-template="v-ui:RabbitHole"></span>
  <hr>
  <br>
  <div id="decisionContractorCategoryState" class="alert">
    <div class="row">
      <div class="col-md-6">
        <div class="checkbox">
          <label>
            <veda-control property="v-s:isOrganizationOk" data-type="boolean"></veda-control>
            <span><strong about="v-s:isOrganizationOk" property="rdfs:label"></strong> <span property="v-s:date" class="view -edit search"></span></span>
          </label>
        </div>
      </div>
      <div class="col-md-6">
        <veda-control property="v-s:date" data-type="dateTime" class="-view edit search"></veda-control>
      </div>
    </div>
  </div>
  <div rel="v-s:hasContractorCategoryDecisionSecurity" class="view edit -search" data-template="gen:ContractorCategoryDepartmentDecisionEmbeddedTemplate"></div>
  <div rel="v-s:hasContractorCategoryDecisionLegal" class="view edit -search" data-template="gen:ContractorCategoryDepartmentDecisionEmbeddedTemplate"></div>
  <div rel="v-s:hasContractorCategoryDecisionFinancial" class="view edit -search" data-template="gen:ContractorCategoryDepartmentDecisionEmbeddedTemplate"></div>
  <div rel="v-s:hasContractorCategoryDecisionManagement" class="view edit -search" data-template="gen:ContractorCategoryDepartmentDecisionEmbeddedTemplate"></div>
  <div class="row">
    <div class="clearfix view -edit -search col-md-3 col-md-offset-9" >
      <button id="add-ContractorCategoryDecisionSecurity" class="btn btn-success btn-block" about="v-s:hasContractorCategoryDecisionSecurity" property="rdfs:label"></button>
      <button id="add-ContractorCategoryDecisionLegal" class="btn btn-success btn-block" about="v-s:hasContractorCategoryDecisionLegal" property="rdfs:label"></button>
      <button id="add-ContractorCategoryDecisionFinancial" class="btn btn-success btn-block" about="v-s:hasContractorCategoryDecisionFinancial" property="rdfs:label"></button>
      <button id="add-ContractorCategoryDecisionManagement" class="btn btn-success btn-block" about="v-s:hasContractorCategoryDecisionManagement" property="rdfs:label"></button>
    </div>
  </div>

  <hr>
  <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
  <br>
  <!-- BUTTONS -->
  <div class="actions">
    <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="edit save cancel delete"></span>
  </div>
</div>
`;