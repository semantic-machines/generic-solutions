import BrowserUtil from '/js/browser/util.js';
import $ from 'jquery';

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  $('.aspect-link[about=\'' + BrowserUtil.escape4$(individual.id) + '\']', template).addClass('active');
};

export const html = `
  <div>
    <style>
      .aspect-links {
        display: flex;
        flex-wrap: wrap;
      }
      .aspect-link-group {
        flex-grow: 1;
        border-bottom: 1px solid #555;
      }
      .aspect-link-group * {
        flex-grow: 1;
      }
      .aspect-link-group .btn-link {
        color: #555;
        border-radius: 6px 6px 0 0 !important;
      }
      .aspect-link-group .btn-link:hover {
        color: #555;
        text-decoration: underline;
      }
      .aspect-link-group .btn-link.active {
        color: #fff;
        background-color: #555;
        border-color: #555;
        pointer-events: none;
        text-decoration: none;
        text-shadow: 0px 1px 1px black;
      }
      .aspect-link-group .btn-link.active:hover {
        color: #fff;
        text-decoration: underline;
        background-color: #555;
        border-color: #555;
      }
    </style>
    <div about="gen:Main" class="container aspect-links">
      <div class="btn-group aspect-link-group">
        <div class="btn-group" about="gen:SearchAppFunction" data-template="gen:SearchAppFunctionIconTemplate"></div>
        <div class="aspect-links" about="@" rel="v-s:hasBusinessAspect">
          <a href="#/@//gen:AspectTemplate" class="btn btn-sm btn-link aspect-link" about="@" property="v-s:shortLabel"></a>
        </div>
      </div>
    </div>
    <div about="@" data-template="v-s:AspectTemplate"></div>
  </div>
`;
