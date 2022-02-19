import BrowserUtil from '/js/browser/util.js';
import $ from 'jquery';

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
  const relNameTmpl = files.children('.rel-name').remove();
  const relValueTmpl = files.children('.rel-value').remove();
  props.forEach(function (property_uri) {
    const relName = relNameTmpl.clone();
    relName.find('strong').attr('about', property_uri);
    relName.find('veda-control').attr('rel', property_uri);
    const relValue = relValueTmpl.clone().attr('rel', property_uri);
    files.append(relName, relValue);
  });
};

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $('#save_and_start_process', template).on('click', function () {
    BrowserUtil.send(individual, template, 's-wf:complexRouteTransform');
  });
};

export const html = `
  <div>
    <h2>
      <span about="v-s:ContractorProfile" property="rdfs:label"></span>
      <small about="@" property="rdfs:label"></small>
    </h2>
    <br />
    <div>
      <span about="@" rel="v-s:backwardTarget" data-template="v-ui:IconModalTemplate"></span>
      <span about="@" rel="v-s:backwardTarget" data-template="v-ui:ClassNameLabelTemplate"></span>
    </div>
    <br class="view -edit -search" />
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
      <tfoot>
        <tr>
          <td colspan="3">
            <veda-control
              data-type="link"
              rel="v-s:hasClassifierOKVED"
              class="-view edit search fulltext"
              data-template="{@.v-s:registrationNumber} - {@.rdfs:label}"></veda-control>
          </td>
        </tr>
      </tfoot>
    </table>
    <br />
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
  </div>
`;
