export const html = `
  <table class="table table-bordered">
    <thead class="result-header">
      <tr>
        <th colspan="10" about="v-s:AccountingDoc" property="rdfs:label"></th>
        <th colspan="2" about="v-s:hasPrice" property="rdfs:label"></th>
        <th colspan="2" about="v-s:prepayment" property="rdfs:label"></th>
        <th colspan="2" about="v-s:hasContractParticipantCustomer" property="rdfs:label"></th>
        <th colspan="2" about="v-s:hasContractParticipantSupplier" property="rdfs:label"></th>
      </tr>
      <tr class="active">
        <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
        <th class="orderby" data-orderby="v-s:creator"><span about="v-s:creator" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:created"><span about="v-s:created" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:hasDocumentKind"><span about="v-s:hasDocumentKind" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:registrationNumber"><span about="v-s:registrationNumber" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:registrationDate"><span about="v-s:registrationDate" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:transactionDate"><span about="v-s:transactionDate" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:hasContract"><span about="v-s:hasContract" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="rdfs:comment"><span about="rdfs:comment" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:vatRateForAccountingDoc"><span about="v-s:vatRateForAccountingDoc" property="rdfs:label"></span></th>
        <!--стоимость v-s:hasPrice  -->
        <th class="orderby" data-orderby="v-s:sum"><span about="v-s:sum" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:hasCurrency"><span about="v-s:hasCurrency" property="rdfs:label"></span></th>
        <!--авансовый платеж v-s:prepayment-->
        <th class="orderby" data-orderby="v-s:sum"><span about="v-s:sum" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:hasCurrency"><span about="v-s:hasCurrency" property="rdfs:label"></span></th>
        <!-- заказчик    -->
        <th class="orderby" data-orderby="v-s:hasRoleInContract"><span about="v-s:hasRoleInContract" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:hasOrganization"><span about="v-s:hasOrganization" property="rdfs:label"></span></th>
        <!--исполнитель-->
        <th class="orderby" data-orderby="v-s:hasRoleInContract"><span about="v-s:hasRoleInContract" property="rdfs:label"></span></th>
        <th class="orderby" data-orderby="v-s:hasOrganization"><span about="v-s:hasOrganization" property="rdfs:label"></span></th>
      </tr>
    </thead>
    <tbody class="result-container">
      <tr>
        <td><a href="#/@" class="glyphicon glyphicon-search"></a></td>
        <td rel="v-s:creator" data-template="v-ui:LabelTemplate"></td>
        <td property="v-s:created"></td>
        <td rel="v-s:hasDocumentKind" data-template="v-ui:LabelTemplate"></td>
        <td property="v-s:registrationNumber"></td>
        <td property="v-s:registrationDate"></td>
        <td property="v-s:transactionDate"></td>
        <td rel="v-s:hasContract" data-template="v-ui:LabelTemplate"></td>
        <td property="rdfs:comment"></td>
        <td property="v-s:vatRateForAccountingDoc"></td>
        <!--стоимость v-s:hasPrice  -->
        <td rel="v-s:hasPrice" class="number"><span property="v-s:sum"></span></td>
        <td rel="v-s:hasPrice"><span rel="v-s:hasCurrency" data-template="v-ui:LabelTemplate"></span></td>
        <!--авансовый платеж v-s:prepayment-->
        <td rel="v-s:prepayment"><span property="v-s:sum"></span></td>
        <td rel="v-s:prepayment"><span rel="v-s:hasCurrency" data-template="v-ui:LabelTemplate"></span></td>
        <!-- заказчик    -->
        <td rel="v-s:hasContractParticipantCustomer"><span rel="v-s:hasRoleInContract" data-template="v-ui:LabelTemplate"></span></td>
        <td rel="v-s:hasContractParticipantCustomer"><span rel="v-s:hasOrganization" data-template="v-ui:LabelTemplate"></span></td>
        <!--исполнитель-->
        <td rel="v-s:hasContractParticipantSupplier"><span rel="v-s:hasRoleInContract" data-template="v-ui:LabelTemplate"></span></td>
        <td rel="v-s:hasContractParticipantSupplier"><span rel="v-s:hasOrganization" data-template="v-ui:LabelTemplate"></span></td>
      </tr>
    </tbody>
  </table>
`;
