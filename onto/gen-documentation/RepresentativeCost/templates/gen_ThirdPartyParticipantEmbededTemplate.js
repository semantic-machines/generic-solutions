export const html = `
<div class="well well-sm">
  <strong about="v-s:correspondentOrganization" property="rdfs:label"></strong>
  <div rel="v-s:correspondentOrganization" class="view -edit search" data-template="v-ui:LabelTemplate"></div>
  <veda-control data-type="link" rel="v-s:correspondentOrganization" class="-view edit search fulltext"></veda-control>
  <strong about="v-s:correspondentPersonDescription" property="rdfs:label" ></strong>
  <div property="v-s:correspondentPersonDescription" class="view -edit search"></div>
  <veda-control data-type="text"  property="v-s:correspondentPersonDescription" class="-view edit search"></veda-control>
</div>
`;