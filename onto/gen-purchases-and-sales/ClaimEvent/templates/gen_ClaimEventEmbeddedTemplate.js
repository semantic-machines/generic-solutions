export const html = `
<div class="container sheet">
  <div class="row row-attribute">
    <div class="col-sm-3 col-xs-5">
      <label about="gen:ClaimEvent_EventDate_Bundle" property="rdfs:label"></label>
    </div>
    <div class="col-sm-9 col-xs-7">
      <div class="form-inline">
        <div class="form-group">
          <span property="v-s:dateFrom" class="view -edit search"></span>
          <veda-control property="v-s:dateFrom" data-type="date" class="-view edit search"></veda-control>
        </div>
        <span class="view -edit -search">&mdash;&nbsp;&nbsp;&nbsp;</span>
        <div class="form-group">
          <span property="v-s:dateTo" class="view -edit search"></span>
          <veda-control property="v-s:dateTo" data-type="date" class="-view edit search"></veda-control>
        </div>
      </div>
    </div>
  </div>
  <div class="row row-attribute">
    <div class="col-sm-3 col-xs-5">
      <label about="v-s:hasStatus" property="rdfs:label"></label>
    </div>
    <div class="col-sm-3 col-xs-3">
      <div rel="v-s:hasStatus" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
      <veda-control data-type="link" rel="v-s:hasStatus" class="-view edit search fulltext dropdown"></veda-control>
    </div>
  </div>
  <div class="row row-attribute">
    <div class="col-sm-3 col-xs-5">
      <label about="v-s:theme" property="rdfs:label"></label>
    </div>
    <div class="col-sm-9 col-xs-7">
      <div property="v-s:theme" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
      <veda-control data-type="string" property="v-s:theme" class="-view edit search"></veda-control>
    </div>
  </div>
  <div class="row row-attribute">
    <div class="col-sm-3 col-xs-5">
      <label about="v-s:initiator" property="rdfs:label"></label>
    </div>
    <div class="col-sm-9 col-xs-7">
      <div rel="v-s:initiator" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
      <veda-control data-type="link" rel="v-s:initiator" class="-view edit search fulltext dropdown"></veda-control>
    </div>
  </div>
  <div class="row row-attribute">
    <div class="col-sm-3 col-xs-5">
      <label about="gen:ClaimEvent_Departments_Bundle" property="rdfs:label"></label>
    </div>
    <div class="col-sm-9 col-xs-7">
      <div rel="v-s:responsibleDepartment" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
      <veda-control data-type="link" rel="v-s:responsibleDepartment" class="-view edit search fulltext tree"></veda-control>
    </div>
  </div>
  <div class="row row-attribute">
    <div class="col-sm-3 col-xs-5">
      <label about="gen:ClaimEvent_Description_Bundle" property="rdfs:label"></label>
    </div>
    <div class="col-sm-9 col-xs-7">
      <div property="v-s:claimCircumstanceDescription" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
      <veda-control data-type="text" property="v-s:claimCircumstanceDescription" class="-view edit search"></veda-control>
    </div>
  </div>
</div>
`;