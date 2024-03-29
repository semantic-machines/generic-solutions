export const html = `
  <div>
    <div class="container sheet">
      <h3 class="margin-sm">
        <span about="@" property="rdf:type"></span>
        <small about="@" property="rdfs:label" class="view edit -search"></small>
      </h3>
      <span about="@" data-template="v-ui:RabbitHole"></span>
      <section id="MainProperties">
        <h4 class="section-header" about="v-s:MainProperties" property="rdfs:label"></h4>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:hasStatus" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-3">
            <div rel="v-s:hasStatus" class="view -edit search" data-template="v-ui:StatusTemplate"></div>
            <veda-control data-type="link" rel="v-s:hasStatus" class="-view edit search fulltext dropdown"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:responsible" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:responsible" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:responsible" class="-view edit search fulltext"></veda-control>
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
            <label about="v-s:responsibleOrganization" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:responsibleOrganization" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="link" rel="v-s:responsibleOrganization" class="-view edit search fulltext"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:description" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:description" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="text" property="v-s:description" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:attachment" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div rel="v-s:attachment" class="view -edit search" data-template="v-ui:FileTemplateWithComment"></div>
            <veda-control data-type="file" rel="v-s:attachment" class="-view edit search"></veda-control>
          </div>
        </div>
      </section>
      <section id="Plan">
        <h4 class="section-header" about="v-s:Plan" property="rdfs:label"></h4>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:datePlan" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-3">
            <div property="v-s:datePlan" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="date" property="v-s:datePlan" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:timeEffort" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <veda-control data-type="worktime" property="v-s:timeEffort" class="view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:taskDescription" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:taskDescription" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="text" property="v-s:taskDescription" class="-view edit search"></veda-control>
          </div>
        </div>
      </section>
      <section id="Fact">
        <h4 class="section-header" about="v-s:Fact" property="rdfs:label"></h4>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:dateFact" property="rdfs:label"></label>
          </div>
          <div class="col-sm-3 col-xs-3">
            <div property="v-s:dateFact" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="date" property="v-s:dateFact" class="-view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:timeEffort" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <veda-control data-type="worktime" property="v-s:count" class="view edit search"></veda-control>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-4">
            <label about="v-s:reportDescription" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div property="v-s:reportDescription" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
            <veda-control data-type="text" property="v-s:reportDescription" class="-view edit search"></veda-control>
          </div>
        </div>
      </section>
      <section id="hasAction">
        <h4 class="section-header" about="v-s:hasAction" property="rdfs:label"></h4>
        <div class="row row-attribute">
          <div class="col-sm-12 col-xs-12">
            <!--<div rel="v-s:hasAction" class="view edit -search" data-template="v-s:ActionEmbedded_Template" data-embedded="true"></div>-->
            <!--<veda-control rel="v-s:hasAction" data-type="link" class="-view edit -search create"></veda-control>-->
            <table class="table table-condensed table-bordered">
              <thead>
                <tr class="active">
                  <th width="1%">
                    <span class="glyphicon glyphicon-zoom-in"></span>
                  </th>
                  <!--<th width="1%">№</th>-->
                  <th about="v-s:hasStatus" property="rdfs:label"></th>
                  <th about="v-s:responsible" property="rdfs:label"></th>
                  <th about="v-s:taskDescription" property="rdfs:label"></th>
                  <th about="v-s:hasAction" property="rdfs:label"></th>
                  <th class="-view edit -search"></th>
                </tr>
              </thead>
              <tbody rel="v-s:hasAction" data-embedded="true" data-limit="10" data-more="true">
                <tr>
                  <th width="1%">
                    <span about="@" data-template="v-ui:IconModalTemplate"></span>
                  </th>
                  <td>
                    <div about="@" rel="v-s:hasStatus" data-template="v-ui:StatusTemplate" class="view  edit search"></div>
                    <veda-control data-type="link" rel="v-s:hasStatus" class="-view -edit search fulltext dropdown"></veda-control>
                  </td>
                  <td>
                    <div about="@" rel="v-s:responsible" data-template="v-ui:LabelTemplate" class="view  edit search"></div>
                    <veda-control data-type="link" rel="v-s:responsible" class="-view -edit search fulltext dropdown"></veda-control>
                  </td>
                  <td>
                    <div about="@" property="v-s:taskDescription" class="view  edit -search"></div>
                  </td>
                  <td>
                    <div about="@" rel="v-s:hasAction" data-template="v-ui:ClassNameLabelLinkTemplate" class="view  edit search"></div>
                    <veda-control data-type="link" rel="v-s:hasAction" class="-view -edit search fulltext dropdown"></veda-control>
                  </td>
                  <td width="100px" class="-view edit -search">
                    <button type="button" class="action glyphicon glyphicon-duplicate -view edit -search"></button>
                  </td>
                </tr>
              </tbody>
            </table>
            <veda-control data-type="link" rel="v-s:hasAction" class="-view edit -search create create-modal"></veda-control>
          </div>
        </div>
      </section>
      <section id="SystemProperties">
        <h4 class="section-header" about="v-ui:SystemPropertiesTemplate" property="rdfs:comment"></h4>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:CreatedBundle" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div class="row">
              <div class="col-sm-6 col-xs-6">
                <veda-control data-type="link" rel="v-s:creator" class="-view -edit search fulltext"></veda-control>
                <div about="@" rel="v-s:creator" data-template="v-ui:LabelTemplate" class="view edit -search"></div>
                <div rel="v-s:creator" data-template="v-ui:LabelTemplate" class="-view -edit search"></div>
              </div>
              <div class="col-sm-6 col-xs-6">
                <veda-control property="v-s:created" data-type="date" class="-view -edit search"></veda-control>
                <div about="@" property="v-s:created" class="view edit -search"></div>
                <div property="v-s:created" class="-view -edit search"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="row row-attribute">
          <div class="col-sm-3 col-xs-5">
            <label about="v-s:EditedBundle" property="rdfs:label"></label>
          </div>
          <div class="col-sm-9 col-xs-7">
            <div class="row">
              <div class="col-sm-6 col-xs-6">
                <veda-control data-type="link" rel="v-s:lastEditor" class="-view -edit search fulltext"></veda-control>
                <div about="@" rel="v-s:lastEditor" data-template="v-ui:LabelTemplate" class="view edit -search"></div>
                <div rel="v-s:lastEditor" data-template="v-ui:LabelTemplate" class="-view -edit search"></div>
              </div>
              <div class="col-sm-6 col-xs-6">
                <veda-control data-type="date" property="v-s:edited" class="-view -edit search"></veda-control>
                <div about="@" property="v-s:edited" class="view edit -search"></div>
                <div property="v-s:edited" class="-view -edit search"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <div class="actions">
        <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="edit save cancel delete"></span>
      </div>
    </div>
  </div>
`;
