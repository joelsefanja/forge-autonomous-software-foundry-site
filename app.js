import { animate, hover, inView, stagger } from 'https://cdn.jsdelivr.net/npm/motion@12.40.0/+esm';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let activeScrollAnimation;

const focusSection = (target) => {
  const previousTabIndex = target.getAttribute('tabindex');
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });

  if (previousTabIndex === null) {
    target.removeAttribute('tabindex');
  } else {
    target.setAttribute('tabindex', previousTabIndex);
  }
};

const getTargetY = (target) => {
  const offset = 24;
  return Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
};

const moveToAnchor = async (link, target, href) => {
  if (activeScrollAnimation) {
    activeScrollAnimation.stop();
  }

  if (prefersReducedMotion) {
    window.scrollTo(0, getTargetY(target));
    window.history.pushState(null, '', href);
    focusSection(target);
    return;
  }

  await animate(link, { y: [0, 4, -2, 0] }, { duration: 0.24, easing: [0.22, 1, 0.36, 1] }).finished;

  const startY = window.scrollY;
  const targetY = getTargetY(target);
  const distance = Math.abs(targetY - startY);
  const duration = Math.min(1.05, Math.max(0.62, distance / 5600));

  activeScrollAnimation = animate(startY, targetY, {
    duration,
    easing: [0.22, 1, 0.36, 1],
    onUpdate: (latest) => window.scrollTo(0, latest),
  });

  await activeScrollAnimation.finished;
  activeScrollAnimation = undefined;
  window.history.pushState(null, '', href);
  focusSection(target);
};

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');

    if (!href || href === '#') {
      return;
    }

    const target = document.querySelector(href);

    if (!target) {
      return;
    }

    event.preventDefault();
    moveToAnchor(link, target, href);
  });
});

if (!prefersReducedMotion) {
  animate(
    '.hero .copy > *, .board',
    { opacity: [0, 1], y: [10, 0] },
    { duration: 0.45, delay: stagger(0.035), easing: [0.22, 1, 0.36, 1] },
  );

  document.querySelectorAll('.section > .head, .split, .process, .deliverables, .faq, .cta').forEach((element) => {
    inView(
      element,
      () => {
        animate(element, { opacity: [0.92, 1], y: [8, 0] }, { duration: 0.35, easing: [0.22, 1, 0.36, 1] });
      },
      { margin: '0px 0px -12% 0px' },
    );
  });
}

document.querySelectorAll('.button, .nav-action').forEach((element) => {
  hover(element, () => {
    if (prefersReducedMotion) {
      return;
    }

    const animation = animate(element, { y: -2 }, { duration: 0.16, easing: 'ease-out' });

    return () => {
      animation.stop();
      animate(element, { y: 0 }, { duration: 0.18, easing: 'ease-out' });
    };
  });
});
