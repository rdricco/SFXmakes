import './index.css';

const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const mobileMenu = document.querySelector<HTMLElement>('[data-mobile-menu]');
const header = document.querySelector<HTMLElement>('.site-header');
const toast = document.querySelector<HTMLElement>('[data-toast]');
const buyButtons = document.querySelectorAll<HTMLButtonElement>('[data-buy]');
const processDialog = document.querySelector<HTMLDialogElement>('[data-process-dialog]');
const processButton = document.querySelector<HTMLButtonElement>('[data-process-open]');
const closeProcess = document.querySelector<HTMLButtonElement>('[data-process-close]');

const announce = (message: string) => {
  if (!toast) return;
  toast.querySelector('[data-toast-message]')!.textContent = message;
  toast.classList.add('is-visible');
  window.setTimeout(() => toast.classList.remove('is-visible'), 3600);
};

menuButton?.addEventListener('click', () => {
  const isOpen = mobileMenu?.classList.toggle('is-open') ?? false;
  menuButton.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

buyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    announce('HORROR STARTER KIT — added to your kit.');
    button.classList.add('is-added');
    button.textContent = 'ADDED TO KIT';
    window.setTimeout(() => {
      button.classList.remove('is-added');
      button.textContent = button.dataset.buyLabel ?? 'GET THE KIT';
    }, 2600);
  });
});

processButton?.addEventListener('click', () => processDialog?.showModal());
closeProcess?.addEventListener('click', () => processDialog?.close());
processDialog?.addEventListener('click', (event) => {
  if (event.target === processDialog) processDialog.close();
});

const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-revealed');
      revealObserver.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 },
);
document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => revealObserver.observe(element));

const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')];
const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
const navObserver = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('is-active', link.hash === `#${entry.target.id}`));
  }),
  { rootMargin: '-32% 0px -58% 0px', threshold: 0 },
);
sections.forEach((section) => navObserver.observe(section));
