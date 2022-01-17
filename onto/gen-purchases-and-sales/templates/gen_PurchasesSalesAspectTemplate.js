export const html = `
  <div class="container sheet" style="position:relative;">
    <div class="row">
      <div class="col-md-4">
        <div class="container-fluid">
          <h4 class="text-center" style="text-transform: uppercase">
            <i class="fa fa-file-text-o"></i> <span about="v-s:Blanks" property="rdfs:label"></span>
          </h4>
          <hr />
          <div about="@" rel="v-s:hasBlank">
            <a href="#/@" class="btn btn-success btn-lg btn-block margin-lg" about="@" property="rdfs:label" style="white-space: normal;"></a>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="container-fluid">
          <h4 class="text-center" style="text-transform: uppercase"><i class="fa fa-table"></i> <span about="v-s:Registries" property="rdfs:label"></span></h4>
          <hr />
          <div about="@" rel="v-s:hasRegistry">
            <a href="#/@" class="btn btn-info btn-lg btn-block margin-lg" about="@" property="rdfs:label" style="white-space: normal;"></a>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="container-fluid">
          <h4 class="text-center" style="text-transform: uppercase"><i class="fa fa-bar-chart"></i> <span about="v-s:Reports" property="rdfs:label"></span></h4>
          <hr />
          <div about="@" rel="v-s:hasReport">
            <a href="#/@" class="btn btn-warning btn-lg btn-block margin-lg" about="@" property="rdfs:label" style="white-space: normal;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
