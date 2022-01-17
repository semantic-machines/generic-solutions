import $ from 'jquery';
import IndividualModel from '/js/common/individual_model.js';
import riot from 'riot';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  const props = [
    'v-s:attachOrganizationProperties',
    'v-s:attachCertificateRegistrationLegal',
    'v-s:attachExcerptFromEGRUL',
    'v-s:attachCertificateTaxRegistration',
    'v-s:attachAppointingOrder',
    'v-s:attachWarrant',
    'v-s:attachSignatureSample',
    'v-s:attachLicense',
    'v-s:attachTaxReport',
    'v-s:attachAccountBalance',
    'v-s:attachTaxDeclaration',
    'v-s:attachDocConfirmUseAddresses',
    'v-s:attachDocSpecialTaxSystem',
    'v-s:attachInsurancePayments',
    'v-s:attachSubcontract',
    'v-s:attachSubcontractorInteraction',
    'v-s:attachDocConfirmUseTransport',
    'v-s:attachDocConfirmUseWood',
    'v-s:attachDocConfirmUseForestryEquipment',
    'v-s:attachOtherDoc',
  ];
  const files = $('.files', template);
  const relNameTmpl = $('.rel-name', template).get(0).outerHTML;
  const relValueTmpl = $('.rel-value', template).get(0).outerHTML;
  $('.rel-name, .rel-value', template).remove();
  props.map(function (property_uri) {
    const relName = $(relNameTmpl);
    relName.find('strong').attr('about', property_uri);
    relName.find('veda-control').attr('rel', property_uri);
    const relValue = $(relValueTmpl).attr('rel', property_uri);
    files.append(relName, relValue);
  });
};

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $('#add-contractorCategoryRequest', template).click(function () {
    const _class = new IndividualModel('v-s:ContractorCategoryRequest');
    const request = new IndividualModel();
    const tmpl = 'gen:ContractorCategoryRequestTemplate';
    request['rdf:type'] = [_class];
    request['v-s:backwardTarget'] = [individual];
    request['v-s:backwardProperty'] = [new IndividualModel('v-s:hasContractorCategoryRequest')];
    request['v-s:canRead'] = [true];
    riot.route(['#', request.id, '#main', tmpl, 'edit'].join('/'));
  });
};

export const html = `
  <div class="container sheet">
    <h2>
      <span about="v-s:ContractorProfile" property="rdfs:label"></span>
      <small about="@" property="rdfs:label"></small>
    </h2>
    <span about="@" data-template="v-ui:RabbitHole"></span>
    <hr />
    <br />
    <div>
      <div about="@" rel="v-s:backwardTarget">
        <span>
          <span about="@" data-template="v-ui:IconModalTemplate"></span>
          <span about="@" data-template="v-ui:ClassNameLabelTemplate"></span>
        </span>
      </div>
    </div>
    <br />
    <table class="table table-bordered">
      <thead class="result-header">
        <tr>
          <th colspan="5" about="v-s:ContractorCategoryRequest" property="rdfs:label"></th>
        </tr>
        <tr class="active">
          <th width="1%"><span class="glyphicon glyphicon-search"></span></th>
          <th about="rdfs:comment" property="rdfs:label"></th>
          <th about="v-s:date" property="rdfs:label"></th>
          <th about="v-s:isOrganizationOk" property="rdfs:label"></th>
        </tr>
      </thead>
      <tbody rel="v-s:hasContractorCategoryRequest">
        <tr>
          <td width="1%"><a href="#/@" class="glyphicon glyphicon-search"></a></td>
          <td width="50%">
            <div property="rdfs:comment" class="view -edit -search"></div>
          </td>
          <td width="20%" rel="v-s:hasContractorCategoryDecision">
            <div>
              <div property="v-s:date" class="view -edit -search"></div>
            </div>
          </td>
          <td width="30%" rel="v-s:hasContractorCategoryDecision" data-template="gen:ContractorProfileTemplate_ContractorCategoryDecision"></td>
        </tr>
      </tbody>
    </table>
    <div class="view -edit -search clearfix">
      <button class="btn btn-success pull-right" id="add-contractorCategoryRequest">
        <span class="glyphicon glyphicon-search"></span>
        <span about="v-s:ContractorCategoryRequest" property="rdfs:label"></span>
      </button>
    </div>
    <br />
    <table class="table table-bordered">
      <thead>
        <tr>
          <th colspan="3" about="v-s:AddOKVEDName" property="rdfs:label"></th>
        </tr>
        <tr class="active">
          <th about="rdfs:label" property="rdfs:label"></th>
          <th about="v-s:description" property="rdfs:label"></th>
          <th about="v-s:registrationNumber" property="rdfs:label"></th>
        </tr>
      </thead>
      <tbody rel="v-s:hasClassifierOKVED">
        <tr>
          <td property="rdfs:label" class="view edit -search"></td>
          <td property="v-s:description" class="view edit -search"></td>
          <td property="v-s:registrationNumber" class="view edit -search"></td>
        </tr>
      </tbody>
      <tfoot class="-view edit -search">
        <tr>
          <td colspan="3">
            <br />
            <veda-control data-type="link" rel="v-s:hasClassifierOKVED" class="-view edit search fulltext tree"></veda-control>
          </td>
        </tr>
      </tfoot>
    </table>

    <div class="checkbox">
      <label>
        <veda-control property="v-s:isDirectManufacturer" data-type="boolean"></veda-control>
        <em about="v-s:isDirectManufacturer" property="rdfs:label"></em>
      </label>
    </div>
    <div class="checkbox">
      <label>
        <veda-control property="v-s:isSpecialTax" data-type="boolean"></veda-control>
        <em about="v-s:isSpecialTax" property="rdfs:label"></em>
      </label>
    </div>
    <em about="v-s:organizationProperties" property="rdfs:label"></em>
    <div property="v-s:organizationProperties" class="view -edit -search"></div>
    <veda-control data-type="text" property="v-s:organizationProperties" class="-view edit search"></veda-control>
    <em about="v-s:contactInfo" property="rdfs:label"></em>
    <div property="v-s:contactInfo" class="view -edit -search"></div>
    <veda-control data-type="text" property="v-s:contactInfo" class="-view edit search"></veda-control>
    <br />
    <table class="table table-bordered files">
      <thead>
        <tr>
          <th rowspan="2" width="30%" about="v-s:fileName" property="rdfs:label"></th>
          <th rowspan="2" width="20%" about="rdfs:comment" property="rdfs:label"></th>
          <th colspan="2" width="20%" about="v-s:AddDateactions" property="rdfs:label"></th>
          <th rowspan="2" width="20%" about="v-s:creator" property="rdfs:label"></th>
        </tr>
        <tr>
          <th width="15%" about="v-s:dateFrom" property="rdfs:label"></th>
          <th width="15%" about="v-s:dateTo" property="rdfs:label"></th>
        </tr>
      </thead>
      <tbody class="rel-name">
        <tr class="active">
          <td colspan="5">
            <strong about="" property="rdfs:label"></strong>
            <veda-control style="display:inline-block;margin-left:10px" rel="" data-type="file" class="-view edit -search"></veda-control>
          </td>
        </tr>
      </tbody>
      <tbody class="rel-value" rel="" data-embedded="true">
        <tr>
          <td>
            <a href="/files/@">
              <span about="@" property="v-s:fileName"></span>
            </a>
          </td>
          <td>
            <span property="rdfs:comment" class="view -edit -search"></span>
            <veda-control data-type="string" property="rdfs:comment" class="-view edit search"></veda-control>
          </td>
          <td>
            <div property="v-s:dateFrom" class="view -edit -search"></div>
            <veda-control property="v-s:dateFrom" data-type="dateTime" class="-view edit search"></veda-control>
          </td>
          <td>
            <div property="v-s:dateTo" class="view -edit -search"></div>
            <veda-control property="v-s:dateTo" data-type="dateTime" class="-view edit search"></veda-control>
          </td>
          <td><span about="@" rel="v-s:creator" data-template="v-ui:LabelTemplate"></span> <span about="@" property="v-s:created"></span></td>
        </tr>
      </tbody>
    </table>
    <hr />
    <div about="@" data-template="v-ui:SystemPropertiesNewTemplate" data-embedded="true"></div>
    <br />
    <!-- BUTTONS -->
    <div class="actions">
      <span about="@" data-template="v-ui:StandardButtonsTemplate" data-embedded="true" data-buttons="edit save cancel delete journal task"></span>
    </div>
  </div>
`;
