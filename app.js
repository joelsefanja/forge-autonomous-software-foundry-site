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

const precheckForm = document.querySelector('.precheck-form');

const getCheckedValue = (formData, name) => Number(formData.get(name) || 0);

const getProofScore = (form) => {
  const selected = [...form.querySelectorAll('input[name="proof"]:checked')];

  if (selected.some((input) => input.dataset.none !== undefined)) {
    return 0;
  }

  return Math.min(25, selected.reduce((total, input) => total + Number(input.value), 0));
};

const getSelectedLabel = (form, name) => {
  const input = form.querySelector(`input[name="${name}"]:checked`);
  return input?.parentElement?.textContent.trim() || 'Not answered';
};

const getProofLabels = (form) => {
  const labels = [...form.querySelectorAll('input[name="proof"]:checked')].map((input) => input.parentElement.textContent.trim());
  return labels.length ? labels : ['None yet'];
};

const getResult = ({ score, repetition, proof, buyer, scope }) => {
  if (repetition === 0 && proof === 0) {
    return ['Stop or rethink', 'There is not enough repeated pain or proof yet. Do not build before you know this problem keeps coming back.'];
  }

  if (buyer === 0) {
    return ['Prove more first', 'The buyer or approver is still unclear. FORGE would check who pays, who approves and why this matters now.'];
  }

  if (scope === 0) {
    return ['Make it smaller', 'There may be something here, but version 1 is too broad. Start with one buyer, one job and one outcome.'];
  }

  if (score >= 70) {
    return ['Build candidate', 'This has enough signal for a focused version-one review. FORGE would still check risks before recommending a build.'];
  }

  if (score >= 50) {
    return ['Make it smaller', 'There may be a product here, but proof, buyer clarity or version-one scope needs tightening first.'];
  }

  if (score >= 30) {
    return ['Prove more first', 'Do not build yet. Gather more proof about repetition, buyer urgency or workaround cost.'];
  }

  return ['Stop or rethink', 'The idea is too weak, broad or unproven for a build path right now.'];
};

const updateList = (element, items, tagName = 'li') => {
  element.replaceChildren(...items.map((item) => {
    const listItem = document.createElement(tagName);
    listItem.textContent = item;
    return listItem;
  }));
};

if (precheckForm) {
  const noneProof = precheckForm.querySelector('input[name="proof"][data-none]');
  const proofInputs = [...precheckForm.querySelectorAll('input[name="proof"]')];

  proofInputs.forEach((input) => {
    input.addEventListener('change', () => {
      if (input === noneProof && input.checked) {
        proofInputs.filter((item) => item !== noneProof).forEach((item) => {
          item.checked = false;
        });
      }

      if (input !== noneProof && input.checked && noneProof) {
        noneProof.checked = false;
      }
    });
  });

  precheckForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(precheckForm);
    const repetition = getCheckedValue(formData, 'repetition');
    const proof = getProofScore(precheckForm);
    const buyer = getCheckedValue(formData, 'buyer');
    const pain = getCheckedValue(formData, 'pain');
    const scope = getCheckedValue(formData, 'scope');
    const score = repetition + proof + buyer + pain + scope;
    const [title, copy] = getResult({ score, repetition, proof, buyer, scope });

    const strongSignals = [];

    if (repetition >= 15) strongSignals.push('The problem has repeated enough to investigate.');
    if (proof >= 10) strongSignals.push('There is visible proof beyond opinion.');
    if (buyer >= 10) strongSignals.push('The buyer or approver is reasonably clear.');
    if (pain >= 12) strongSignals.push('The workaround appears costly enough to matter.');
    if (scope >= 10) strongSignals.push('Version 1 can likely stay focused.');
    if (!strongSignals.length) strongSignals.push('No strong signal yet. Start by proving the pain repeats.');

    const nextChecks = [
      buyer >= 10 ? 'Confirm who pays or approves.' : 'Find the buyer or approver first.',
      scope >= 10 ? 'Define the exact version-one workflow.' : 'Cut the idea to one buyer, one job and one outcome.',
      proof >= 10 ? 'Review risks before build.' : 'Collect more proof before build.',
    ];

    document.querySelector('[data-result-title]').textContent = title;
    document.querySelector('[data-result-copy]').textContent = copy;
    document.querySelector('[data-result-score]').textContent = score;
    updateList(document.querySelector('[data-result-strong]'), strongSignals);
    updateList(document.querySelector('[data-result-next]'), nextChecks);

    if (!prefersReducedMotion) {
      animate(
        '.precheck-result',
        { x: [10, 0], opacity: [0.88, 1], scale: [0.985, 1] },
        { duration: 0.38, easing: [0.22, 1, 0.36, 1] },
      );
    }

    const body = [
      `FORGE idea precheck result: ${title}`,
      `Score: ${score}/90`,
      '',
      `Repetition: ${getSelectedLabel(precheckForm, 'repetition')}`,
      `Proof: ${getProofLabels(precheckForm).join(', ')}`,
      `Buyer: ${getSelectedLabel(precheckForm, 'buyer')}`,
      `Workaround pain: ${getSelectedLabel(precheckForm, 'pain')}`,
      `Version 1: ${getSelectedLabel(precheckForm, 'scope')}`,
      '',
      'Customer problem:',
      'Current workaround:',
      'What version 1 must do:',
    ].join('\n');

    document.querySelector('[data-result-mail]').href = `mailto:?subject=${encodeURIComponent(`FORGE idea precheck: ${title}`)}&body=${encodeURIComponent(body)}`;
  });
}

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
