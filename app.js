(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const gsapInstance = window.gsap;

  if (!gsapInstance) {
    return;
  }

  if (window.ScrollToPlugin) {
    gsapInstance.registerPlugin(window.ScrollToPlugin);
  }

  if (window.ScrollTrigger) {
    gsapInstance.registerPlugin(window.ScrollTrigger);
  }

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

  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach((link) => {
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

      if (prefersReducedMotion || !window.ScrollToPlugin) {
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
        focusSection(target);
        window.history.pushState(null, '', href);
        return;
      }

      gsapInstance.to(window, {
        duration: 0.85,
        ease: 'power3.out',
        scrollTo: { y: target, offsetY: 24 },
        onComplete: () => {
          focusSection(target);
          window.history.pushState(null, '', href);
        },
      });
    });
  });

  if (prefersReducedMotion) {
    return;
  }

  gsapInstance.from('.hero .copy > *', {
    y: 18,
    opacity: 0,
    duration: 0.72,
    ease: 'power3.out',
    stagger: 0.07,
  });

  gsapInstance.from('.board', {
    x: 18,
    y: 10,
    opacity: 0,
    duration: 0.82,
    ease: 'power3.out',
    delay: 0.12,
  });

  if (window.ScrollTrigger) {
    gsapInstance.utils.toArray('.section > .head, .split, .process, .deliverables, .faq, .cta').forEach((element) => {
      gsapInstance.from(element, {
        y: 28,
        opacity: 0,
        duration: 0.72,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 82%',
          once: true,
        },
      });
    });
  }

  document.querySelectorAll('.button, .deliverables .item, .flow .step, .faq .item').forEach((element) => {
    element.addEventListener('pointerenter', () => {
      gsapInstance.to(element, {
        y: -3,
        duration: 0.18,
        ease: 'power2.out',
      });
    });

    element.addEventListener('pointerleave', () => {
      gsapInstance.to(element, {
        y: 0,
        duration: 0.22,
        ease: 'power2.out',
      });
    });
  });

  document.querySelectorAll('.situations span, .metric').forEach((element) => {
    element.addEventListener('pointerenter', () => {
      gsapInstance.to(element, {
        scale: 1.035,
        duration: 0.18,
        ease: 'power2.out',
        transformOrigin: 'center',
      });
    });

    element.addEventListener('pointerleave', () => {
      gsapInstance.to(element, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      });
    });
  });
})();
