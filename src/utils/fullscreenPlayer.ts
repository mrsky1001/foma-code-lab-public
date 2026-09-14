// Standalone Fullscreen Web Application Player
// Allows navigating between virtual project pages without leaving fullscreen or triggering editor reloads

interface FullscreenPlayerOptions {
  initialPage: string;
  initialSearch?: string;
  pages: Record<string, string>;
  css: string;
  userJs: string;
  canonicalJs: string;
  dataJs: string;
  baseHref: string;
}

function serializeForScript(val: unknown): string {
  return JSON.stringify(val ?? '').replace(/</g, '\\u003c');
}

const RUNTIME_INTERCEPTOR_SCRIPT = `(function() {
  function createFallbackStorage() {
    var mem = {};
    return {
      getItem: function(k) { return Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null; },
      setItem: function(k, v) { mem[k] = String(v); },
      removeItem: function(k) { delete mem[k]; },
      clear: function() { mem = {}; },
      key: function(i) { return Object.keys(mem)[i] || null; },
      get length() { return Object.keys(mem).length; }
    };
  }
  try {
    var k = "__foma_ls__"; window.localStorage.setItem(k, "1"); window.localStorage.removeItem(k);
  } catch(e) {
    try { Object.defineProperty(window, "localStorage", { value: createFallbackStorage(), configurable: true, enumerable: true, writable: true }); } catch(err) {}
  }
  try {
    var ks = "__foma_ss__"; window.sessionStorage.setItem(ks, "1"); window.sessionStorage.removeItem(ks);
  } catch(e) {
    try { Object.defineProperty(window, "sessionStorage", { value: createFallbackStorage(), configurable: true, enumerable: true, writable: true }); } catch(err) {}
  }
  window.__fomaNavigate = function(href) {
    try { window.parent.postMessage({ type: "foma-navigate", href: String(href) }, "*"); } catch(e) {}
  };
  try { window.location.assign = window.location.replace = window.__fomaNavigate; } catch(e) {}
  document.addEventListener("click", function(e) {
    var a = e.target && e.target.closest ? e.target.closest("a") : null;
    if (!a) return;
    var href = a.getAttribute("href");
    if (!href) return;
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return;
    if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//")) {
      a.setAttribute("target", "_blank");
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    window.__fomaNavigate(href);
  }, true);
  window.addEventListener("error", function(e) {
    if (e.target && e.target.tagName === "IMG") {
      var src = e.target.getAttribute("src");
      if (src && src.startsWith("../img/")) { e.target.src = src.replace("../img/", "img/"); }
      else if (src && src.startsWith("img/")) { e.target.src = "../" + src; }
    }
  }, true);
})();`;

export function generateFullscreenPlayer({
  initialPage,
  initialSearch = '',
  pages,
  css,
  userJs,
  canonicalJs,
  dataJs,
  baseHref,
}: FullscreenPlayerOptions): string {
  const safePages = serializeForScript(pages);
  const safeCss = serializeForScript(css);
  const safeUserJs = serializeForScript(userJs);
  const safeCanonicalJs = serializeForScript(canonicalJs);
  const safeDataCode = serializeForScript(
    (dataJs || '').replace(/const OFFICE_ROOMS/g, 'window.OFFICE_ROOMS').replace(/const MOCK_BOOKINGS/g, 'window.MOCK_BOOKINGS')
  );
  const safeRuntimeScript = serializeForScript(RUNTIME_INTERCEPTOR_SCRIPT);
  const safeBaseHref = serializeForScript(baseHref);
  const safeInitialPage = serializeForScript(initialPage || 'index.html');
  const safeInitialSearch = serializeForScript(initialSearch || '');

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>СмартОфис — Полный экран</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background: #ffffff;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    #foma-player-frame {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
      margin: 0;
      padding: 0;
    }
  </style>
</head>
<body>
  <iframe
    id="foma-player-frame"
    sandbox="allow-scripts allow-modals allow-same-origin allow-forms"
    title="СмартОфис Превью"
  ></iframe>

  <script>
  (function() {
    var PAGES = ${safePages};
    var CSS = ${safeCss};
    var USER_JS = ${safeUserJs};
    var CANONICAL_JS = ${safeCanonicalJs};
    var DATA_CODE = ${safeDataCode};
    var RUNTIME_SCRIPT_CODE = ${safeRuntimeScript};
    var BASE_HREF = ${safeBaseHref};
    var INITIAL_PAGE = ${safeInitialPage};
    var INITIAL_SEARCH = ${safeInitialSearch};

    var iframe = document.getElementById('foma-player-frame');

    function resolveVirtualPage(href) {
      if (!href) return { pageKey: 'index.html', search: '' };
      var parts = href.split('?');
      var pathPart = parts[0].replace(/^(\\.\\.\\/|\\.\\/|\\/)*/, '').replace(/^pages\\//, '');
      var pageKey = !pathPart || pathPart === 'index' ? 'index.html' : (pathPart.endsWith('.html') ? pathPart : pathPart + '.html');
      var search = parts[1] ? ('?' + parts[1]) : '';
      return { pageKey: pageKey, search: search };
    }

    function buildDoc(pageKey, search) {
      var rawHtml = PAGES[pageKey] || PAGES['index.html'] || '<!DOCTYPE html><html><body><h1 style="font-family:sans-serif;padding:30px;">Страница ' + pageKey + ' не найдена</h1></body></html>';

      // 1. Remove external link/script references to avoid 404 against Vite dev server
      var html = rawHtml
        .replace(/<link[^>]*href=["'][^"']*style\\.css["'][^>]*>/gi, '')
        .replace(/<script[^>]*src=["'][^"']*(?:data|main)\\.js["'][^>]*><\\/script>/gi, '');

      // 2. Dynamic base href for images and icons
      if (!html.includes('<base')) {
        if (html.includes('<head>')) {
          html = html.replace('<head>', '<head>\\n  <base href="' + BASE_HREF + '">');
        } else {
          html = '<base href="' + BASE_HREF + '">' + html;
        }
      }

      // Ensure responsive viewport meta tag for mobile devices
      if (!html.includes('viewport')) {
        var metaViewport = '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
        if (html.includes('<head>')) {
          html = html.replace('<head>', '<head>\\n  ' + metaViewport);
        } else {
          html = metaViewport + '\\n' + html;
        }
      }

      // 3. Inject storage polyfill, mock search/pathname, link navigation interceptor
      var locationScript = '<script>' +
        '(function() {' +
        '  var vSearch = ' + JSON.stringify(search || '') + ';' +
        '  var vPath = ' + JSON.stringify('/' + pageKey) + ';' +
        '  try { history.replaceState(null, "", vPath + vSearch); } catch(e) {}' +
        '  try { Object.defineProperty(window.location, "search", { get: function() { return vSearch; }, configurable: true }); } catch(e) {}' +
        '  try { Object.defineProperty(window.location, "pathname", { get: function() { return vPath; }, configurable: true }); } catch(e) {}' +
        '})();' +
        '<' + '/script>';

      var runtimeScript = '<script>\\n' + RUNTIME_SCRIPT_CODE + '\\n<' + '/script>';

      // 4. Inject data.js
      var dataScript = '<script id=\"foma-data-js\">' +
        'if (typeof window.OFFICE_ROOMS === \"undefined\") {' +
        '  try {' +
        '    var dataCode = ' + JSON.stringify(DATA_CODE) + ';' +
        '    (new Function(dataCode))();' +
        '  } catch(e) {}' +
        '}' +
        '<' + '/script>';

      // 5. Inlined CSS
      var styleTag = '<style id=\"foma-inlined-css\">\\n' + CSS + '\\n</style>';

      // 6. User JS and Fallback Canonical JS
      var sanitizeNavigation = function(code) {
        return (code || '')
          .replace(/(?:window\\.)?location\\.(?:assign|replace)\\(([^)]+)\\);?/g, 'window.__fomaNavigate($1);')
          .replace(/(?:window\\.)?location\\.href\\s*=\\s*([^;\\r\\n]+);?/g, 'window.__fomaNavigate($1);');
      };
      var sanitizedUserJs = sanitizeNavigation(USER_JS);
      var sanitizedCanonicalJs = sanitizeNavigation(CANONICAL_JS);

      var userScriptTag = sanitizedUserJs
        ? '<script>try {\\n' + sanitizedUserJs + '\\n} catch(e) { console.error(\"[User Code Runtime Error]:\", e); }<' + '/script>'
        : '';
      var canonicalScriptTag = sanitizedCanonicalJs
        ? '<script>try {\\n' + sanitizedCanonicalJs + '\\n} catch(e) { console.error(\"[Runtime Fallback Error]:\", e); }<' + '/script>'
        : '';

      var headInjections = locationScript + '\\n' + runtimeScript + '\\n' + dataScript + '\\n' + styleTag;
      if (html.includes('</head>')) {
        html = html.replace('</head>', headInjections + '\\n</head>');
      } else if (html.includes('<head>')) {
        html = html.replace('<head>', '<head>\\n' + headInjections);
      } else {
        html = headInjections + html;
      }

      var bodyInjections = userScriptTag + '\\n' + canonicalScriptTag;
      if (html.includes('</body>')) {
        html = html.replace('</body>', bodyInjections + '\\n</body>');
      } else {
        html = html + '\\n' + bodyInjections;
      }

      return html;
    }

    function renderCurrentHash() {
      var rawHash = window.location.hash ? window.location.hash.slice(1) : '';
      var resolved = resolveVirtualPage(rawHash || INITIAL_PAGE);
      if (rawHash && rawHash.includes('?')) {
        resolved.search = '?' + rawHash.split('?')[1];
      } else if (!rawHash && INITIAL_SEARCH) {
        resolved.search = INITIAL_SEARCH;
      }

      var doc = buildDoc(resolved.pageKey, resolved.search);
      iframe.srcdoc = doc;

      var titles = {
        'index.html': 'Главная — СмартОфис',
        'catalog.html': 'Каталог офисов — СмартОфис',
        'room-details.html': 'Описание комнаты — СмартОфис',
        'booking.html': 'Оформление бронирования — СмартОфис',
        'my-bookings.html': 'Мои бронирования — СмартОфис',
        'login.html': 'Авторизация — СмартОфис',
        'register.html': 'Регистрация — СмартОфис'
      };
      document.title = (titles[resolved.pageKey] || (resolved.pageKey + ' — СмартОфис')) + ' (Полный экран)';
    }

    window.addEventListener('message', function(e) {
      if (e.data && e.data.type === 'foma-navigate') {
        var resolved = resolveVirtualPage(e.data.href);
        var targetHash = '#' + resolved.pageKey + (resolved.search || '');
        if (window.location.hash === targetHash) {
          renderCurrentHash();
        } else {
          window.location.hash = targetHash;
        }
      }
    });

    window.addEventListener('hashchange', renderCurrentHash);

    // Set initial hash
    var startHash = '#' + (INITIAL_PAGE || 'index.html') + (INITIAL_SEARCH || '');
    if (!window.location.hash) {
      try {
        history.replaceState(null, '', startHash);
      } catch(e) {
        window.location.hash = startHash;
      }
    }
    renderCurrentHash();
  })();
  </script>
</body>
</html>`;
}
