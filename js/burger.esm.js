const $ = document.querySelector.bind(document);
const burger = $('.burger');
const menu = $('.navigation');

if (burger) {
  burger.addEventListener('click', (e) => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', (!expanded).toString());
  });

  menu.addEventListener('click', (e) => {
    burger.setAttribute('aria-expanded', 'false');
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}
