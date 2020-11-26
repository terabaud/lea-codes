const $ = function (sel, con) {
  return (con || document).querySelector(sel);
};
const nav = $('.navigation');
if (nav) {
  nav.addEventListener('click', function (evt) {
    const el = evt.target;
    const spa = el.getAttribute('data-spa');
    if (!!spa) {
      evt.preventDefault();
      const href = el.getAttribute('href');
      const container = $(spa);
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const d = xhr.responseXML;
        const dTitle = d.title || '';
        const dContainer = $(spa, d);
        container.innerHTML = (dContainer && dContainer.innerHTML) || '';
        history.pushState({}, dTitle, href);
      };
      xhr.onerror = () => {
        // S2Pages workaround, when the auth cookie expires
        document.location.href = href;
      };
      xhr.open('GET', href);
      xhr.responseType = 'document';
      xhr.send();
    }
  });
}
