export const html = `
  <div>
    <div class="col-sm-3 col-xs-5">
      <strong about="v-s:Price" property="rdfs:label"></strong>
    </div>
    <div class="col-sm-3 col-xs-4">
      <div property="v-s:sum" class="view -edit -search"></div>
      <veda-control data-type="string" property="v-s:sum" class="-view edit search fulltext dropdown"></veda-control>
    </div>
    <div class="col-sm-3 col-xs-4">
      <div rel="v-s:hasCurrency" class="view -edit -search" data-template="v-ui:LabelTemplate"></div>
      <veda-control data-type="link" rel="v-s:hasCurrency" class="-view edit search fulltext dropdown"></veda-control>
    </div>
  </div>
`;
