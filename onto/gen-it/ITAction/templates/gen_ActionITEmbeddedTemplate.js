export const html = `
<div class="panel panel-default">
    <div class="panel-heading clearfix">
      <h3 class="panel-title pull-left">
        <span about="@" data-template="v-ui:IconModalTemplate"></span>
        <span about="@" class="view -edit -search">
          <a href="#/@///edit" class="glyphicon glyphicon-edit" tabindex="-1"></a>
        </span>
        <span about="gen:ActionIT" property="rdfs:label"></span>
        <span about="@" rel="v-s:hasStatus" data-template="v-ui:StatusTemplate"></span>&nbsp
        <small about="@" property="rdfs:label" class="view edit -search"></small>
      </h3>
    </div>
    <div class="panel-body">
      <div class="row row-attribute">
        <div class="col-sm-2 col-xs-5">
          <label about="gen:RegNumBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-3 col-xs-3">
          <div property="v-s:registrationNumber" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="string" property="v-s:registrationNumber" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-2 col-xs-5">
          <label about="v-s:theme" property="rdfs:label"></label>
        </div>
        <div class="col-sm-10 col-xs-7">
          <div property="v-s:theme" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="string" property="v-s:theme" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-2 col-xs-5">
          <label about="gen:ResponsibleBundle" property="rdfs:label"></label>
        </div>
        <div class="col-sm-10 col-xs-7">
          <div rel="v-s:responsible" class="view -edit -search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="link" rel="v-s:responsible" class="-view edit search fulltext" ></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-2 col-xs-5">
          <label>План</label>
        </div>
        <div class="col-sm-2 col-xs-2">
          <div property="v-s:datePlan" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="date" property="v-s:datePlan" class="-view edit search"></veda-control>
        </div>
        <div class="col-sm-8 col-xs-5">
          <div property="v-s:taskDescription" class="alert-warning view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="text" property="v-s:taskDescription" class="-view edit search"></veda-control>
        </div>
      </div>
      <div class="row row-attribute">
        <div class="col-sm-2 col-xs-5">
          <label>Факт</label>
        </div>
        <div class="col-sm-2 col-xs-2">
          <div property="v-s:dateFact" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="date" property="v-s:dateFact" class="-view edit search"></veda-control>
        </div>
        <div class="col-sm-8 col-xs-5">
          <div property="v-s:reportDescription" class="alert-success view -edit search" data-template="v-ui:LabelTemplate"></div>
          <veda-control data-type="text" property="v-s:reportDescription" class="-view edit search"></veda-control>
        </div>
      </div>
     <div class="row row-attribute">
        <div class="col-sm-1 col-xs-5"></div>
        <div class="col-sm-11 col-xs-7">
          <div rel="gen:hasActionIT" class="view edit search" data-template="gen:ActionITEmbeddedTemplate" data-embedded="true"></div>
        </div>
      </div>
    </div>
  </div>
`;