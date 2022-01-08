export const html = `
  <table class="table table-bordered">
    <thead class="result-header">
      <tr>
        <th colspan="3" about="gen:Decree" property="rdfs:label"></th>
        <th colspan="4" about="gen:DecreeRegistrationRecord" property="rdfs:label"></th>
        <th colspan="12" about="gen:Decree" property="rdfs:label"></th>
      </tr>
      <tr class="active">
        <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
        <th class="orderby" data-orderby="gen:hasDecreeRegistrationRecord.v-s:registrationNumber">
          <span about="v-s:registrationNumber" property="rdfs:label"></span>
        </th>
        <th class="orderby" data-orderby="gen:hasDecreeRegistrationRecord.v-s:registrationDate">
          <span about="v-s:registrationDate" property="rdfs:label"></span>
        </th>
        <th class="orderby" data-orderby="gen:hasDecreeRegistrationRecord.rdfs:comment"><span about="rdfs:comment" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="gen:hasDecreeRegistrationRecord.v-s:attachment"><span about="v-s:attachment" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="gen:hasDecreeKind"><span about="gen:hasDecreeKind" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:initiator"><span about="v-s:initiator" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:signedBy"><span about="v-s:signedBy" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:responsible"><span about="v-s:responsible" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:title"><span about="gen:titleBundleDecree" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:description"><span about="gen:descriptionBundleDecree" property="rdfs:label"></span></th>
      </tr>
    </thead>
    <tbody class="result-container">
      <tr>
        <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
        <td rel="gen:hasDecreeRegistrationRecord"><span property="v-s:registrationNumber"></span></td>
        <td rel="gen:hasDecreeRegistrationRecord"><span property="v-s:registrationDate"></span></td>
        <td rel="gen:hasDecreeRegistrationRecord"><span property="rdfs:comment"></span></td>
        <td rel="gen:hasDecreeRegistrationRecord"><span rel="v-s:attachment" data-template="v-ui:FileMinTemplate"></span></td>
        <td rel="gen:hasDecreeKind" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:initiator" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:signedBy" data-template="v-ui:LabelTemplate"></td>
        <td rel="v-s:responsible" data-template="v-ui:LabelTemplate"></td>
        <td property="v-s:title"></td>
        <td property="v-s:description"></td>
      </tr>
    </tbody>
  </table>
`;
