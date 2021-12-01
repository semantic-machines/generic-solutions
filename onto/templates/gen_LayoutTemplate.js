import $ from 'jquery';
import veda from '/js/common/veda.js';
import IndividualModel from '/js/common/individual_model.js';

export const pre = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  // Markdown
  var main = document;
  var observer = new MutationObserver(function(mutations, observer) {
    var lastMutation = mutations.pop();
    processMain(lastMutation);
  });
  var mainConfig = { childList: true, subtree: true };
  var markdownConfig = { childList: true };
  observer.observe(main, mainConfig);
  template.one("remove", function () {
    observer.disconnect();
  });
  function processMain(mutation) {
    var target = $(mutation.target);
    var markdown = target.find(".markdown:not(.observed)");
    markdown.each(function () {
      this.classList.add("observed");
      var text = this.textContent;
      this.innerHTML = marked(text);
      var markdownObserver = new MutationObserver(function(mutations, observer) {
        var lastMutation = mutations.pop();
        processMarkdown(lastMutation, observer);
      });
      markdownObserver.observe(this, markdownConfig);
      $(this).one("remove", function () {
        markdownObserver.disconnect();
      });
    });
  }
  function processMarkdown(mutation, observer) {
    observer.disconnect();
    var target = mutation.target;
    var text = target.textContent;
    target.innerHTML = marked(text);
    observer.observe(target, markdownConfig);
  }
};

export const post = function (individual, template, container, mode, extra) {
  template = $(template);
  container = $(container);

  var vedaInfo = new IndividualModel("v-s:vedaInfo");
  vedaInfo.load().then(function (vedaInfo) {
    document.title = vedaInfo.toString();
  });
  // Render user
  var userInfo = $("#user-info", template);
  var userInfoTmpl = "v-ui:IconPersonTemplate";
  userInfo.empty();
  veda.user.present(userInfo, userInfoTmpl);

  if ($(window).scrollTop()>="250") $("#to-top", template).fadeIn("normal");
  $(window).scroll(function() {
    if ($(window).scrollTop()<="250") $("#to-top", template).fadeOut("normal");
    else $("#to-top", template).fadeIn("normal");
  });
  $("#to-top", template).click(function(){$("html,body").animate({scrollTop:0},"normal");});

  template.on("click", ".table-sortable > thead > tr:last-child th", function (e) {
    $(this).closest("table").tableSortable(this);
  });
};

export const html = `
<div class="page">
  <nav role="navigation" class="navbar navbar-veda">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="btn btn-default navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
          <span class="glyphicon glyphicon-menu-hamburger"></span>
        </button>
        <a class="navbar-brand" href="#/gen:Main" about="gen:Logo" data-template="v-ui:ImageTemplate"></a>
      </div>
      <div class="collapse navbar-collapse" id="navbar-collapse">
        <ul class="nav navbar-nav navbar-right">
          <li about="v-s:Favorites" data-template="v-s:FavoritesIndicatorTemplate" style="border-right:1px solid #ddd;"></li>
          <li about="v-s:NewsSearchUser" data-template="v-s:NewsIndicatorTemplate"></li>
          <li about="v-s:Contacts" data-template="gen:LayoutTemplate_Contacts"></li>
          <li about="v-fs:FulltextSearch" data-template="gen:LayoutTemplate_FulltextSearch"></li>
          <li about="v-cal:TasksCalendar" data-template="v-cal:FunctionCalendarIndicatorTemplate"></li>
          <li about="v-ft:Inbox" data-template="v-ft:FunctionTasksIndicatorTemplate"></li>
          <li id="user-info"></li>
          <li id="menu" class="dropdown" about="gen:MainMenu" data-template="v-s:MenuTemplate"></li>
          <li about="v-ui:AvailableLanguage" data-template="v-ui:LanguageSwitchTemplate"></li>
          <li style="padding-left:10px; margin-left:10px; border-left:1px solid #ddd;" about="@" data-template="v-ui:FullWidthSwitchTemplate"></li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="go-up text-primary" id="to-top">&uarr; <span about="gen:UpBundle" property="rdfs:label"></span></div>

  <div id="main"></div>

  <nav class="navbar-fixed-bottom hidden-print container">
    <div id="copyright" class="text-right text-muted">
      <span about="v-s:PoweredBy" property="rdfs:label"></span>
      <a about="v-s:VedaPlatform" property="rdfs:label"></a>.
      &copy; <a href="http://www.semantic-machines.com" about="v-s:SemanticMachines" property="rdfs:label"></a>.
      <span about="v-s:License" property="rdfs:label"></span>
      <a alt="GNU General Public License version 3 official text" href="http://www.gnu.org/licenses/gpl.html">GPLv3.</a>
    </div>
  </nav>
</div>
`;