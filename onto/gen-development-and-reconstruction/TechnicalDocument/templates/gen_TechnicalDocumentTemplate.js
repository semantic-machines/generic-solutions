import BrowserUtil from '/js/browser/util.js';
import $ from 'jquery';
import veda from '/js/common/veda.js';
import IndividualModel from '/js/common/individual_model.js';
import riot from 'riot';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  template.on("validate", function () {
    var result = {};
    if ( individual.hasValue("v-s:hasLifecycleStage", 'd:a6uu8yexul97649zuczu37abf4f')
        || (individual.hasValue("v-s:hasLifecycleStage")
            && individual["v-s:hasLifecycleStage"][0].hasValue("v-s:hasParentLink", 'd:a6uu8yexul97649zuczu37abf4f')) ) {
      result["v-s:hasClassifierMarkOfWorkingDrawingsSet"] = {
        state: true,
        cause: []
      };
    }
    if (!individual.hasValue('v-s:hasDocumentKind', 'd:2fb47ad2cca5420686f5722cbadaee51')){
      if (individual.hasValue('v-s:hasLifecycleStage', 'd:twejo8o3tb0w00gkfkox62l1bz')) {
        if (!individual.hasValue('v-s:hasClassifierSectionOfProjectDocumentation')) {
          result['v-s:hasClassifierSectionOfProjectDocumentation'] = {
            state: false,
            cause: ["v-ui:minCardinality"]
          };
        }
      }
      if (individual.hasValue('v-s:hasLifecycleStage', 'd:yzukiatavri0xticlw3xax2qeg')) {
        if (!individual.hasValue('v-s:hasClassifierMarkOfWorkingDrawingsSet')) {
          result['v-s:hasClassifierMarkOfWorkingDrawingsSet'] = {
            state: false,
            cause: ["v-ui:minCardinality"]
          };
        }
      }
    }
    template[0].dispatchEvent(new CustomEvent("validated", {detail: result}));
  });
};

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  //if (individual.isNew() ) {
  //  individual["v-s:developer"][0]["v-s:correspondentOrganization"] = veda.appointment["v-s:parentOrganization"];
  //}

  // Проверка разрешения на создание тех документов
  var This_class = individual["rdf:type"][0];
  This_class.canCreate().then(function(canCreate) {
    if (!canCreate) $("#add-LinkedTechnicalDocument", template).remove();
  });
  $("#add-LinkedTechnicalDocument", template).click(function () {
    var _class = new IndividualModel("v-s:TechnicalDocument"),
        TechnicalDocument = new IndividualModel(),
        tmpl = "gen:TechnicalDocumentTemplate";
    TechnicalDocument["rdf:type"] = [_class];
    TechnicalDocument["v-s:backwardTarget"] = [individual];
    TechnicalDocument["v-s:backwardProperty"] = [new IndividualModel("v-s:hasTechnicalDocument")];
    TechnicalDocument["v-s:canRead"] = [ true ];
    TechnicalDocument["v-s:title"] = individual["v-s:title"] ;
    TechnicalDocument["v-s:shortLabel"] = individual["v-s:shortLabel"] ;
    TechnicalDocument["v-s:registrationDate"] = individual["v-s:registrationDate"] ;
    TechnicalDocument["v-s:hasLifecycleStage"] = individual["v-s:hasLifecycleStage"] ;
    TechnicalDocument["v-s:hasClassifierSectionOfProjectDocumentation"] = individual["v-s:hasClassifierSectionOfProjectDocumentation"] ;
    TechnicalDocument["v-s:hasClassifierSectionOfProjectDocumentation"] = individual["v-s:hasClassifierMarkOfWorkingDrawingsSet"] ;
    TechnicalDocument["v-s:hasProject"] = individual["v-s:hasProject"] ;
    Promise.resolve().then(function() {
      if ( individual.hasValue("v-s:developer") ) {
        return individual["v-s:developer"][0].load().then(function(developer) {
          return developer.clone();
        });
      }
      return null;
    }).then(function(clonedDeveloper) {
      if (clonedDeveloper != null) {
        TechnicalDocument["v-s:developer"]= [ clonedDeveloper ];
      }
      riot.route( ["#", TechnicalDocument.id, "#main", tmpl, "edit"].join("/") );
    });
  });

  // Проверка разрешения на создание копии
  var This_class = individual["rdf:type"][0];
  This_class.canCreate().then(function(canCreate) {
    if (!canCreate) $("#add-copy", template).remove();
  });

  $("#add-copy", template).click(function () {
    var _class = new IndividualModel("v-s:TechnicalDocument"),
        TechnicalDocument = new IndividualModel(),
        tmpl = "gen:TechnicalDocumentTemplate" ;
    TechnicalDocument["rdf:type"] = [_class] ;
    TechnicalDocument["v-s:title"]=individual["v-s:title"] ;
    TechnicalDocument["v-s:hasLifecycleStage"]=individual["v-s:hasLifecycleStage"] ;
    TechnicalDocument["v-s:hasDocumentKind"]=individual["v-s:hasDocumentKind"] ;
    TechnicalDocument["v-s:hasSector"]=individual["v-s:hasSector"] ;
    TechnicalDocument["v-s:hasBudgetCategory"]=individual["v-s:hasBudgetCategory"] ;
    TechnicalDocument["v-s:shortLabel"]=individual["v-s:shortLabel"] ;
    TechnicalDocument["v-s:owner"]=individual["v-s:owner"] ;
    TechnicalDocument["v-s:hasClassifierSectionOfProjectDocumentation"]=individual["v-s:hasClassifierSectionOfProjectDocumentation"] ;
    TechnicalDocument["v-s:hasClassifierMarkOfWorkingDrawingsSet"]=individual["v-s:hasClassifierMarkOfWorkingDrawingsSet"] ;
    TechnicalDocument.one("afterSave", function () {
      setTimeout(() => {
        riot.route("#/" + TechnicalDocument.id, false);
      }, 250);
    });
    Promise.resolve().then(function() {
      if ( individual.hasValue("v-s:developer") ) {
        return individual["v-s:developer"][0].load().then(function(developer) {
          return developer.clone();
        });
      }
      return null;
    }).then(function(clonedDeveloper) {
      if (clonedDeveloper != null) {
        TechnicalDocument["v-s:developer"]= [ clonedDeveloper ];
      }
      riot.route( ["#", TechnicalDocument.id, "#main", tmpl, "edit"].join("/") ) ;
    });
  });

  function lifeCycleStage() {
    if ( individual.hasValue("v-s:hasLifecycleStage", new IndividualModel("d:a6uu8yexul97649zuczu37abf4f")) ) {
      $('#EngineeringRequest', template).hide();
      $('#LinkedTechnicalDocuments', template).hide();
      $('#Project', template).hide();
      $('#Section', template).hide();
      $('#Mark', template).hide();
    } else {
      $('#EngineeringRequest', template).show();
      $('#LinkedTechnicalDocuments', template).show();
      $('#Project', template).show();
      $('#Section', template).show();
      $('#Mark', template).show();
    }
    individual.getPropertyChain("v-s:hasLifecycleStage", "v-s:hasParentLink").then(function(linkArr) {
      if (linkArr.length > 0 && linkArr[0].id ==="d:a6uu8yexul97649zuczu37abf4f") {
        $('#Section', template).hide();
        $('#Mark', template).hide();
      } else {
        $('#Section', template).show();
        $('#Mark', template).show();
      }
    });
  }

  function documentKindHandler() {
    if (individual.hasValue('v-s:hasDocumentKind', new IndividualModel('d:2fb47ad2cca5420686f5722cbadaee51') )) {
      $('#Section', template).hide();
      $('#Mark', template).hide();
    } else {
      $('#Section', template).show();
      $('#Mark', template).show();
    }
  }
  function addBackwardProperty() {
    if (individual.hasValue('v-s:backwardTarget')) {
      individual["v-s:backwardProperty"] = [new IndividualModel("v-s:hasTechnicalDocument")];
    }
  }
  documentKindHandler();
  individual.on('v-s:hasDocumentKind', documentKindHandler);
  individual.on("v-s:hasLifecycleStage", lifeCycleStage);
  individual.on("beforeSave", addBackwardProperty);
  template.one("remove", function () {
    individual.off("v-s:hasLifecycleStage", lifeCycleStage);
    individual.off('v-s:hasDocumentKind', documentKindHandler);
    individual.off('beforeSave', addBackwardProperty);
  });

  individual.canUpdate().then(function(canUpdate){
    if (individual.hasValue("v-wf:isProcess")) {
      $('#send.action', template).remove();
      //$('#save.action', template).remove();
    } else if (individual.isNew() || canUpdate) {
      $('#send.action', template).off("click");
      $('#send.action', template).on('click', function () {
        BrowserUtil.send(individual, template, 's-wf:complexRouteTransform', undefined, 'gen:TechnicalDocument_ComplexRouteStartForm_Template');
      });
    } else {
      $('#send.action', template).remove();
      $('#save.action', template).remove();
    }
  });
};

export const html = `
<div>
  <div class="container sheet">
    <h2>
      <span about="v-s:TechnicalDocument" property="rdfs:label"></span><br>
      <small about="@" property="rdfs:label"></small>
    </h2>
    <span about="@" data-template="v-ui:RabbitHole"></span>
    <hr>
    <section id="MainProperties">
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:registrationNumber" property="rdfs:label"></label>
        </div>
        <div class="col-sm-3 col-xs-4">
          <div property="v-s:registrationNumber" class="view -edit search"></div>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:shortLabel_TechnicalDocument_Bundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-3 col-xs-4">
          <div property="v-s:shortLabel" class="view -edit -search"></div>
          <veda-control data-type="string" property="v-s:shortLabel" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:DateForTechnicalDocumentBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-3 col-xs-4">
          <div property="v-s:registrationDate" class="view -edit search"></div>
          <veda-control property="v-s:registrationDate" data-type="date" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:title" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div property="v-s:title" class="view -edit -search"></div>
          <veda-control data-type="string" property="v-s:title" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:HasLifecycleStageForTechnicalDocumentBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:hasLifecycleStage" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:hasLifecycleStage" class="-view edit search fulltext dropdown"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="v-s:hasClassifierSectionOfProjectDocumentation" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:hasClassifierSectionOfProjectDocumentation" class="view edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:hasClassifierSectionOfProjectDocumentation" class="-view edit search fulltext dropdown" data-template="{@.v-s:shortLabel} | {@.rdfs:label}"></veda-control>
        </div>
      </div>
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
          <label about="v-s:hasClassifierMarkOfWorkingDrawingsSet" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:hasClassifierMarkOfWorkingDrawingsSet" class="view edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:hasClassifierMarkOfWorkingDrawingsSet" class="-view edit search fulltext dropdown" data-template="{@.v-s:shortLabel} | {@.rdfs:label}"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="gen:backwardTargetBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:backwardTarget" class="view edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:backwardTarget" class="-view edit search fulltext"></veda-control><br>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <label about="rdfs:comment" property="rdfs:label"></label>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div property="rdfs:comment" class="view -edit -search"></div>
          <veda-control data-type="text"  property="rdfs:comment" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <span about="v-s:attachment" property="rdfs:label"></span>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div rel="v-s:attachment" data-template="v-ui:FileTemplateWithComment" data-embedded="true"></div>
          <veda-control data-type="file"  rel="v-s:attachment" class="-view edit -search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-3 col-xs-5">
          <span about="v-s:developer" property="rdfs:label"></span>
        </div>
        <div class="col-sm-9 col-xs-7">
          <div id="sender" rel="v-s:developer" class="view edit search" data-template="v-s:CorrespondentTemplate" data-embedded="true"></div>
          <veda-control id="sender-create" data-type="link" rel="v-s:developer" class="-view edit search create"></veda-control>
        </div>
      </div>
    </section>

    <section id="LinkedTechnicalDocuments">
      <h4 class="section-header" about="v-s:hasTechnicalDocument" property="rdfs:label"></h4>
      <div class="table-responsive">
        <table class="table no-margin">
          <thead>
            <tr>
              <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
              <th width="20%" about="v-s:registrationNumber" property="rdfs:label"></th>
              <th width="20%" about="v-s:hasDocumentKind" property="rdfs:label"></th>
              <th about="rdfs:label" property="rdfs:label"></th>
              <th about="gen:shortLabel_TechnicalDocument_Bundle" property="rdfs:label"></th>
              <th about="gen:SectionCodeForTechnicalDocumentBundle" property="rdfs:label"></th>
              <th about="gen:MarkCodeForTechnicalDocumentBundle" property="rdfs:label"></th>
            </tr>
          </thead>
          <tbody rel="v-s:hasTechnicalDocument" >
            <tr>
              <td about="@" data-template="v-ui:IconModalTemplate"></td>
              <td><div property="v-s:registrationNumber" class="view -edit -search"></div></td>
              <td><div rel="v-s:hasDocumentKind" data-template="v-ui:LabelTemplate" class="view -edit -search"></div></td>
              <td><div property="rdfs:label" class="view -edit -search"></div></td>
              <td><div property="v-s:shortLabel" class="view -edit -search"></div></td>
              <td rel="v-s:hasClassifierSectionOfProjectDocumentation"><span property="v-s:shortLabel"></span></td>
              <td rel="v-s:hasClassifierMarkOfWorkingDrawingsSet"><span property="v-s:shortLabel"></span></td>
            </tr>
          </tbody>
        </table>
      </div><br>
      <veda-control data-type="link" rel="v-s:hasTechnicalDocument" class="-view edit search fulltext"></veda-control>
      <div class="clearfix view -edit -search">
        <button class="btn btn-success" id="add-LinkedTechnicalDocument">
          <span class="glyphicon glyphicon-zoom-in"></span>
          <span about="v-s:hasTechnicalDocument" property="rdfs:label"></span>
        </button>
      </div>
    </section>
    <hr>
    <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
    <br>
    <!-- BUTTONS -->
    <div class="actions view edit -search">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="edit save cancel delete journal task"></span>
      <button type="button" class="action btn btn-default view -edit -search" id="add-copy" about="v-s:Clone" property="rdfs:label" />
    </div>
  </div>
  <div about="@" class="container sheet view edit -search" data-template="v-s:LinksTemplate" data-embedded="true"></div>
  <div about="@" class="container sheet view -edit -search" data-template="v-s:CommentsTemplate"></div>
</div>
`;
