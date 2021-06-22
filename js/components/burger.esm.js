const $ = document.querySelector.bind(document);
const burger = $('.burger');
const menu = $('.navigation__layer');
const navLinks = Array.from($('.navigation').querySelectorAll('button, a'));

if (burger) {
  burger.addEventListener('click', (e) => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    const newState = !expanded;
    burger.setAttribute('aria-expanded', newState.toString());
    if (newState === true) {
      window.setTimeout(() => menu.classList.add('animate'), 50);
    } else {
      menu.classList.remove('animate');
    }
  });

  menu.addEventListener('click', (e) => {
    burger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('animate');
  });

  const goToLink = (direction) => {
    const index = navLinks.indexOf(document.activeElement);
    if (index === -1) {
      return;
    }
    if (index + direction < 0) {
      navLinks[navLinks.length - 1].focus();
      return;
    }
    navLinks[(index + direction) % navLinks.length].focus();
  };

  window.addEventListener('keydown', (e) => {
    if (burger.getAttribute('aria-expanded') !== 'true') {
      return;
    }
    if (e.key === 'Escape') {
      burger.setAttribute('aria-expanded', 'false');
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      goToLink(-1);
      e.preventDefault();
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      goToLink(1);
      e.preventDefault();
    }
  });

  window.addEventListener('focusin', (e) => {
    // if the burger menu is open and the focus is behind the menu
    // then move the focus onto the burger.
    if (
      burger.getAttribute('aria-expanded') === 'true' &&
      navLinks.indexOf(document.activeElement) === -1
    ) {
      burger.focus();
    }
  });
}
