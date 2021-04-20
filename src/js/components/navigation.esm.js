/**
 * Load content into page without a whole page reload
 * @param {string} href URL to route to
 * @param {boolean} pushState whether to call history.pushState or not
 */
function load(href, pushState) {
  const container = $('main');
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    const d = xhr.responseXML;
    const dTitle = d.title || '';
    const dContainer = $('main', d);
    const dScripts = [...d.querySelectorAll('script[src]')];
    dScripts.forEach((scriptTag) => {
      // load further script tags on-demand.
      const scriptSrc = scriptTag.getAttribute('src');
      if (!$('script[src="' + scriptSrc + '"]')) {
        const newScript = document.createElement('script');
        newScript.setAttribute('type', 'module');
        newScript.setAttribute('src', scriptSrc);
        document.body.appendChild(newScript);
      }
    });
    container.innerHTML = (dContainer && dContainer.innerHTML) || '';
    if (Prism) {
      Prism.highlightAllUnder(container);
    }
    document.title = dTitle;
    if (pushState) {
      history.pushState({}, dTitle, href);
    }
    window.scrollTo(0, 0);
    container.focus();
  };
  xhr.onerror = () => {
    // S2Pages workaround, when the auth cookie expires
    document.location.href = href;
    reject();
  };
  xhr.open('GET', href);
  xhr.responseType = 'document';
  xhr.send();
}

function $(sel, con) {
  return (con || document).querySelector(sel);
}

/**
 * Search for a parent anchor tag outside a clicked event target
 *
 * @param {HTMLElement} el the clicked event target.
 * @param {number} maxNests max number of levels to go up.
 * @returns the anchor tag or null
 */
function findAnchorTag(el, maxNests = 3) {
  for (let i = maxNests; el && i > 0; --i, el = el.parentNode) {
    if (el.nodeName === 'A') {
      return el;
    }
  }
  return null;
}

window.addEventListener('click', function (evt) {
  let baseUrl = $('meta[name="x-base"]')?.getAttribute('content') || '/';
  const el = findAnchorTag(evt.target);
  const href = el?.getAttribute('href');
  if (el && href) {
    if (href.startsWith('#')) {
      return;
    }
    // if the URL either starts with the base url
    // or is a relative URL, then handle the link
    // as a single page application link.
    if (href.startsWith(baseUrl) || /^\w+\:\/\//.test(href) === false) {
      evt.preventDefault();
      load(href, true);
    } else {
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener nnoreferrer');
    }
  }
});

window.addEventListener('popstate', function (e) {
  load(document.location.pathname, false);
});
