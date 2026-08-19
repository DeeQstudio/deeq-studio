(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const mix = (a, b, t) => a + (b - a) * t;
  const smooth = (a, b, value) => {
    const t = clamp((value - a) / (b - a));
    return t * t * (3 - 2 * t);
  };
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     Navigation
  --------------------------------------------------------------------- */
  const toggle = $('[data-menu-toggle]');
  const menu = $('[data-mobile-menu]');
  let menuReturnFocus = null;

  const closeMenu = () => {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.querySelector('.sr-only').textContent = 'Open menu';
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    menu.inert = true;
    document.body.classList.remove('menu-open');
    if (menuReturnFocus) menuReturnFocus.focus();
  };

  const openMenu = () => {
    if (!toggle || !menu) return;
    menuReturnFocus = document.activeElement;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.querySelector('.sr-only').textContent = 'Close menu';
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    menu.inert = false;
    document.body.classList.add('menu-open');
  };

  toggle?.addEventListener('click', () => {
    toggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });
  menu?.addEventListener('click', e => {
    if (e.target.closest('a')) closeMenu();
  });
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') closeMenu();
    if (e.key === 'Tab' && toggle?.getAttribute('aria-expanded') === 'true' && menu) {
      const focusable = [toggle, ...$$('a, button', menu)].filter(el => !el.disabled);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  const header = $('[data-header]');
  let lastY = 0;
  addEventListener('scroll', () => {
    const y = scrollY;
    if (header && !document.body.classList.contains('menu-open')) {
      header.classList.toggle('header-hidden', y > lastY && y > 180);
    }
    lastY = y;
  }, { passive: true });

  /* ---------------------------------------------------------------------
     Motion helpers
  --------------------------------------------------------------------- */
  const progressIn = el => {
    const r = el.getBoundingClientRect();
    const travel = Math.max(1, el.offsetHeight - innerHeight);
    return clamp(-r.top / travel);
  };

  const enterProgress = (el, start = .9, finish = .28) => {
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    const range = Math.max(1, innerHeight * (start - finish));
    return clamp((innerHeight * start - r.top) / range);
  };

  const centerStrength = el => {
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    const center = r.top + r.height / 2;
    return clamp(1 - Math.abs(center - innerHeight / 2) / (innerHeight * .7));
  };

  // Mark authored reveals only after JS is ready. No-JS remains fully readable.
  const revealPlan = [
    ['.promise .section-index', 'up', 0],
    ['.promise-main h2', 'up', 0],
    ['.promise-main>p', 'soft', 1],
    ['.promise-side p', 'right', 1],
    ['.work-intro .section-index', 'up', 0],
    ['.work-intro h2', 'up', 0],
    ['.work-intro>p', 'soft', 1],
    ['.services-head .section-index', 'up', 0],
    ['.services-head h2', 'up', 0],
    ['.services-head>p', 'soft', 1],
    ['.details-copy .section-index', 'up', 0],
    ['.details-copy h2', 'up', 0],
    ['.details-copy>p', 'soft', 1],
    ['.process-head .section-index', 'up', 0],
    ['.process-head h2', 'up', 0],
    ['.process-head>p', 'soft', 1],
    ['.comfort-copy .section-index', 'up', 0],
    ['.comfort-copy h2', 'up', 0],
    ['.comfort-copy>p', 'soft', 1],
    ['.faq-head', 'up', 0],
    ['.faq-list details', 'up', 0],
    ['.contact-top', 'up', 0],
    ['.contact-main h2', 'up', 0],
    ['.contact-main>p', 'soft', 1],
    ['.contact-mail', 'up', 1],
    ['.contact-foot', 'up', 1],
    ['.route-section .section-index', 'up', 0],
    ['.route-grid h2', 'up', 0],
    ['.route-copy', 'soft', 1],
    ['.local-note>*', 'up', 0],
    ['.route-contact h2', 'up', 0],
    ['.route-contact a', 'soft', 1],
    ['.kwkr-route-lead', 'up', 0],
    ['.kwkr-route-body', 'soft', 1],
    ['.kw-route-head', 'left', 0],
    ['.kw-route-body', 'right', 1],
    ['.kw-route-close>*', 'up', 0],
  ];

  revealPlan.forEach(([selector, type, delay]) => {
    $$(selector).forEach((el, i) => {
      el.dataset.reveal = type;
      if (delay || i) el.dataset.revealDelay = String(Math.min(3, delay + (i % 3)));
    });
  });

  document.body.classList.add('js-motion');
  if (reducedMotion) document.body.classList.add('motion-reduced');

  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .13, rootMargin: '0px 0px -5% 0px' });
    $$('[data-reveal]').forEach(el => observer.observe(el));
  } else {
    $$('[data-reveal]').forEach(el => el.classList.add('is-visible'));
  }

  /* ---------------------------------------------------------------------
     Fine pointer depth. Scroll remains the primary input.
  --------------------------------------------------------------------- */
  let px = 0, py = 0, tpx = 0, tpy = 0;
  let pointerRAF = 0;
  const settlePointer = () => {
    px += (tpx - px) * .12;
    py += (tpy - py) * .12;
    render();
    if (Math.abs(tpx - px) > .002 || Math.abs(tpy - py) > .002) {
      pointerRAF = requestAnimationFrame(settlePointer);
    } else {
      pointerRAF = 0;
    }
  };

  if (!reducedMotion && matchMedia('(pointer:fine)').matches) {
    addEventListener('pointermove', e => {
      tpx = (e.clientX / innerWidth - .5) * 2;
      tpy = (e.clientY / innerHeight - .5) * 2;
      if (!pointerRAF) pointerRAF = requestAnimationFrame(settlePointer);
    }, { passive: true });
  }

  /* ---------------------------------------------------------------------
     Opening queue
  --------------------------------------------------------------------- */
  const hero = $('.hero');
  const grid = $('.hero-grid');
  const heroCopy = $('.hero-copy');
  const heroFoot = $('.hero-foot');
  const heroScrollGuide = $('[data-hero-scroll-guide]');
  const heroScrollLabel = $('[data-hero-scroll-label]');
  const heroExitCue = $('[data-hero-exit-cue]');
  const kwkrCard = $('[data-queue-card="kwkr"]');
  const kwCard = $('[data-queue-card="kw"]');
  const counter = $('[data-queue-counter]');

  function renderHero(p) {
    if (!hero || reducedMotion) return;
    const first = smooth(.02, .34, p);
    const swap = smooth(.29, .58, p);
    const second = smooth(.52, .84, p);
    const exit = smooth(.82, .98, p);

    if (kwkrCard) {
      const x = mix(-41, -67, swap) + px * 1.2;
      const y = mix(-50, -58, swap) + py * .7;
      const z = mix(-80, 210, first) - swap * 520;
      const scale = mix(1, 1.11, first) - swap * .12;
      kwkrCard.style.transform = `translate3d(${x}%,${y}%,${z}px) rotateY(${mix(-11, -2, first) - swap * 10}deg) rotateZ(${mix(1.5, 0, first)}deg) scale(${scale})`;
      kwkrCard.style.opacity = String(1 - smooth(.38, .59, p));
      kwkrCard.style.filter = `drop-shadow(0 30px 60px rgba(0,0,0,.55)) blur(${mix(0, 8, smooth(.4,.6,p))}px)`;
    }

    if (kwCard) {
      const x = mix(-14, -48, swap) + px * 1.5;
      const y = mix(-38, -50, swap) + py * .8;
      const z = mix(-510, -40, swap) + second * 230;
      const scale = mix(.92, 1.08, second);
      kwCard.style.transform = `translate3d(${x}%,${y}%,${z}px) rotateY(${mix(-17,-2,second)}deg) rotateZ(${mix(-3,0,second)}deg) scale(${scale})`;
      kwCard.style.opacity = String(mix(.55, 1, swap) * (1 - exit));
      kwCard.style.filter = `drop-shadow(0 30px 60px rgba(0,0,0,.55)) blur(${mix(0,7,exit)}px)`;
    }

    if (grid) {
      grid.style.transform = `translate(-50%,-50%) perspective(900px) rotateX(${69 + py * 1.3}deg) rotateZ(${px * .45}deg) translateY(${p * 11}vh)`;
      grid.style.opacity = String(1 - exit * .72);
    }

    if (heroCopy) {
      const compress = smooth(.08,.7,p);
      const fade = smooth(.76,.96,p);
      heroCopy.style.opacity = String(1 - fade);
      heroCopy.style.transform = `translate3d(0,${mix(0,-38,compress)}px,${mix(0,-45,compress)}px) scale(${mix(1,.985,compress)})`;
    }

    if (heroFoot) heroFoot.style.opacity = String(1 - smooth(.76,.92,p));
    if (counter) counter.textContent = p < .47 ? '01 / 02' : '02 / 02';

    if (heroScrollGuide) {
      heroScrollGuide.style.setProperty('--hero-progress', `${Math.round(p * 100)}%`);
      heroScrollGuide.style.opacity = String(1 - exit * .9);
    }
    if (heroScrollLabel) {
      heroScrollLabel.textContent = p < .1 ? 'Scroll' : p < .47 ? 'Project 01' : p < .83 ? 'Project 02' : 'Continue';
    }
    if (heroExitCue) {
      heroExitCue.style.setProperty('--hero-exit', `${Math.round(exit * 100)}%`);
      heroExitCue.style.setProperty('--hero-exit-opacity', String(exit));
    }
  }

  /* ---------------------------------------------------------------------
     Project-specific homepage cases
  --------------------------------------------------------------------- */
  const kwkrCase = $('.case-kwkr');
  const kwkrPhoto = $('[data-kwkr-photo]');
  const kwkrSite = $('[data-kwkr-site]');
  const kwkrRelease = $('[data-kwkr-release]');
  const kwkrLive = $('[data-kwkr-live]');
  const kwkrStory = $('[data-kwkr-story]');

  function renderKwkr(p) {
    if (reducedMotion || !kwkrCase) return;
    const settle = smooth(.02,.38,p);
    const content = smooth(.16,.56,p);
    const story = smooth(.69,.87,p);
    if (kwkrPhoto) kwkrPhoto.style.transform = `scale(${mix(1.08,1,settle)}) translate3d(${mix(0,-2,content)}vw,${mix(0,-1.5,content)}vh,0)`;
    if (kwkrSite) {
      kwkrSite.style.transform = `translate3d(${mix(0,-4,content)}vw,${mix(0,-3,content)}vh,0) scale(${mix(1,.96,content)})`;
      kwkrSite.style.opacity = String(1 - smooth(.55,.72,p));
    }
    if (kwkrRelease) {
      kwkrRelease.style.transform = `translate3d(${mix(0,-3,content)}vw,${mix(0,-9,content)}vh,0) rotate(${mix(5,-1,content)}deg)`;
      kwkrRelease.style.opacity = String(1 - smooth(.62,.76,p));
    }
    if (kwkrLive) {
      kwkrLive.style.transform = `translate3d(${mix(0,4,content)}vw,${mix(0,-5,content)}vh,0) rotate(${mix(-3,2,content)}deg)`;
      kwkrLive.style.opacity = String(1 - smooth(.62,.76,p));
    }
    if (kwkrStory) {
      kwkrStory.style.transform = `translateY(${(1 - story) * 105}%)`;
      kwkrStory.style.opacity = String(story);
    }
  }

  const handoff = $('[data-case-handoff]');
  function renderHandoff(p) {
    if (!handoff || reducedMotion) return;
    const line = smooth(.08,.72,p);
    const accent = smooth(.58,.96,p);
    handoff.style.setProperty('--handoff-line', String(line));
    handoff.style.setProperty('--handoff-accent', String(accent * .58));
    handoff.style.setProperty('--handoff-accent-scale', String(mix(.12,.34,accent)));
  }

  const kwCase = $('.case-kw');
  const kwOg = $('[data-kw-og]');
  const kwWord = $('[data-kw-wordmark]');
  const kwSite = $('[data-kw-site]');
  const kwStory = $('[data-kw-story]');

  function renderKw(p) {
    if (reducedMotion || !kwCase) return;
    const breathe = smooth(.02,.28,p);
    const detach = smooth(.16,.5,p);
    const reveal = smooth(.42,.68,p);
    const story = smooth(.71,.88,p);
    if (kwOg) {
      kwOg.style.transform = `scale(${mix(1.03,1.1,breathe)}) translate3d(${mix(0,-1.8,detach)}vw,${mix(0,-1,detach)}vh,0)`;
      kwOg.style.filter = `brightness(${mix(.72,.38,reveal)}) blur(${mix(0,3,reveal)}px)`;
    }
    if (kwWord) {
      const compact = innerWidth < 820;
      const x = mix(-50, compact ? -58 : -88, detach);
      const y = mix(-50, compact ? -116 : -158, detach);
      const scale = mix(1, compact ? 1.14 : 1.42, detach);
      kwWord.style.transform = `translate(${x}%,${y}%) translateZ(${detach*140}px) rotate(${mix(0,-1.4,detach)}deg) scale(${scale})`;
      kwWord.style.opacity = String(1 - smooth(.46,.64,p));
    }
    if (kwSite) {
      kwSite.style.opacity = String(reveal * (1 - smooth(.64,.78,p)));
      kwSite.style.transform = `translateY(${mix(16,0,reveal)}vh) scale(${mix(.86,1,reveal)})`;
    }
    if (kwStory) {
      kwStory.style.transform = `translateX(${(1 - story) * 101}%)`;
      kwStory.style.opacity = String(story);
      kwStory.style.setProperty('--kw-logo-lift', `${mix(34, 0, story)}px`);
      kwStory.style.setProperty('--kw-logo-tilt', `${mix(-9, -2.5, story)}deg`);
      kwStory.style.setProperty('--kw-logo-scale', String(mix(.92, 1, story)));
    }
  }

  /* ---------------------------------------------------------------------
     Motion through the rest of the homepage
  --------------------------------------------------------------------- */
  const promise = $('.promise');
  const workIntro = $('.work-intro');
  const serviceRows = $$('.service-row');
  const serviceScenes = $$('.service-scene');
  const brandStage = $('[data-brand-stage]');
  const lab = $('.icon-lab');
  const labMark = $('.lab-mark');
  const touchBrowser = $('.touch-browser');
  const touchSearch = $('.touch-search');
  const touchShare = $('.touch-share');
  const touchHome = $('.touch-home');
  const qualityStrip = $('.quality-strip');
  const processSteps = $('.process-steps');
  const processItems = $$('.process-steps li');
  const comfort = $('.comfort');
  const contact = $('.contact');

  function renderContinuity() {
    if (reducedMotion) return;

    if (promise) promise.style.setProperty('--promise-line', String(enterProgress(promise, .92, .2)));
    if (workIntro) workIntro.style.setProperty('--work-line', String(enterProgress(workIntro, .92, .22)));

    serviceRows.forEach(row => {
      const strength = centerStrength(row);
      row.style.setProperty('--row-progress', String(smooth(.08,.8,strength)));
      row.classList.toggle('motion-active', strength > .62);
    });

    serviceScenes.forEach((scene, index) => {
      const p = smooth(.04,.9,enterProgress(scene, .96, .12));
      const strength = centerStrength(scene);
      scene.style.setProperty('--scene-p', String(p));
      scene.style.setProperty('--scene-focus', String(strength));
      scene.classList.toggle('scene-current', strength > .55);
    });

    if (brandStage) {
      const p = smooth(.04,.86,enterProgress(brandStage, .96, .08));
      brandStage.style.setProperty('--brand-p', String(p));
    }

    if (lab && labMark) {
      const a = smooth(.08,.78,enterProgress(lab, .94, .08));
      const center = centerStrength(lab);
      const mx = px * center;
      const my = py * center;
      lab.style.setProperty('--lab-assemble', String(a));
      labMark.style.transform = `translate(-50%,-50%) translate3d(${mx*14}px,${my*10}px,80px) rotateX(${my*-5}deg) rotateY(${mx*7}deg) scale(${mix(.78,1,a)})`;
      if (touchBrowser) touchBrowser.style.transform = `translate3d(${mix(-90,mx*-8,a)}px,${mix(-45,my*-5,a)}px,0) rotate(${mix(-10,-3,a)}deg)`;
      if (touchSearch) touchSearch.style.transform = `translate3d(${mix(95,mx*9,a)}px,${mix(-30,my*-6,a)}px,0) rotate(${mix(10,2,a)}deg)`;
      if (touchShare) touchShare.style.transform = `translate3d(${mix(-85,mx*-10,a)}px,${mix(50,my*7,a)}px,0) rotate(${mix(9,1,a)}deg)`;
      if (touchHome) touchHome.style.transform = `translate3d(${mix(75,mx*8,a)}px,${mix(60,my*8,a)}px,0) rotate(${mix(-10,-2,a)}deg)`;
      if (qualityStrip) qualityStrip.style.setProperty('--quality-progress', `${a * 100}%`);
    }

    if (processSteps && processItems.length) {
      const r = processSteps.getBoundingClientRect();
      const p = clamp((innerHeight * .72 - r.top) / Math.max(1, r.height - innerHeight * .2));
      processSteps.style.setProperty('--process-progress', `${p * 100}%`);
      let closest = processItems[0];
      let closestDistance = Infinity;
      processItems.forEach(item => {
        const ir = item.getBoundingClientRect();
        const distance = Math.abs((ir.top + ir.height / 2) - innerHeight * .52);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = item;
        }
      });
      processItems.forEach(item => item.classList.toggle('motion-current', item === closest && r.top < innerHeight * .85 && r.bottom > innerHeight * .15));
    }

    if (comfort) {
      const p = smooth(.05,.85,enterProgress(comfort, .95, .1));
      comfort.style.setProperty('--comfort-p', String(p));
    }

    if (contact) {
      const p = smooth(.02,.75,enterProgress(contact, .96, .15));
      contact.style.setProperty('--contact-p', String(p));
    }
  }

  /* ---------------------------------------------------------------------
     Routed pages and project pages
  --------------------------------------------------------------------- */
  const routeHero = $('.route-hero');
  const routeSections = $$('.route-section');
  const serviceProofs = $$('[data-service-proof]');
  const serviceLinks = $$('.service-index a, .service-route-card');
  const footerBand = $('.footer-brand-band');
  const workFeatureKwkr = $('.work-feature-kwkr');
  const workFeatureKw = $('.work-feature-kw');

  const kwkrRouteHero = $('.kwkr-route-hero');
  const kwkrRouteBg = $('.kwkr-route-bg');
  const kwkrRouteCopy = $('.kwkr-route-copy');
  const kwkrGallery = $('.kwkr-route-gallery');

  const kwRouteHero = $('.kw-route-hero');
  const kwRouteBg = $('.kw-route-bg');
  const kwRouteLogo = $('.kw-route-logo');
  const kwRouteStory = $('.kw-route-story');

  function renderRoutes() {
    if (reducedMotion) return;

    if (routeHero) {
      const p = clamp(scrollY / Math.max(1, routeHero.offsetHeight * .92));
      routeHero.style.setProperty('--route-p', String(p));
    }

    routeSections.forEach(section => {
      section.style.setProperty('--route-section-line', String(enterProgress(section, .94, .52)));
    });

    serviceProofs.forEach(proof => {
      proof.style.setProperty('--proof-p', String(smooth(.04,.88,enterProgress(proof, .96, .12))));
    });

    serviceLinks.forEach(link => {
      link.style.setProperty('--service-link-p', String(smooth(.15,.92,centerStrength(link))));
    });

    if (footerBand) {
      const p = smooth(.05,.85,enterProgress(footerBand, .96, .52));
      footerBand.style.setProperty('--footer-brand-y', `${mix(28,0,p)}px`);
      footerBand.style.setProperty('--footer-brand-opacity', String(mix(.28,1,p)));
    }

    if (workFeatureKwkr) {
      const p = smooth(.08,.9,enterProgress(workFeatureKwkr, .96, .18));
      workFeatureKwkr.style.setProperty('--work-kwkr-scale', String(mix(1.075,1.01,p)));
      workFeatureKwkr.style.setProperty('--work-kwkr-y', `${mix(22,-8,p)}px`);
      workFeatureKwkr.style.setProperty('--work-kwkr-copy-y', `${mix(38,0,p)}px`);
      workFeatureKwkr.style.setProperty('--work-kwkr-copy-opacity', String(mix(.38,1,p)));
    }

    if (workFeatureKw) {
      const p = smooth(.08,.9,enterProgress(workFeatureKw, .96, .16));
      workFeatureKw.style.setProperty('--work-kw-scale', String(mix(1.08,1.015,p)));
      workFeatureKw.style.setProperty('--work-kw-logo-x', `${mix(52,0,p)}px`);
      workFeatureKw.style.setProperty('--work-kw-logo-r', `${mix(2.8,0,p)}deg`);
      workFeatureKw.style.setProperty('--work-kw-logo-opacity', String(mix(.28,1,p)));
      workFeatureKw.style.setProperty('--work-kw-copy-y', `${mix(34,0,p)}px`);
      workFeatureKw.style.setProperty('--work-kw-copy-opacity', String(mix(.38,1,p)));
    }

    // De Kweker route: photographic movement and a clipped gallery reveal.
    if (kwkrRouteHero && kwkrRouteBg && kwkrRouteCopy) {
      const p = clamp(scrollY / Math.max(1, kwkrRouteHero.offsetHeight));
      kwkrRouteHero.style.setProperty('--kwkr-route-scale', String(mix(1.07,1.015,p)));
      kwkrRouteHero.style.setProperty('--kwkr-route-y', `${mix(0,18,p)}px`);
      kwkrRouteHero.style.setProperty('--kwkr-copy-y', `${mix(0,-22,p)}px`);
      kwkrRouteHero.style.setProperty('--kwkr-copy-opacity', String(mix(1,.58,p)));
    }
    if (kwkrGallery) {
      const p = smooth(.08,.78,enterProgress(kwkrGallery, .96, .18));
      kwkrGallery.style.setProperty('--kwkr-gallery-clip', `${mix(14,0,p)}%`);
    }

    // Kwartier West route: the real wordmark detaches from the visual before the red story takes over.
    if (kwRouteHero && kwRouteBg && kwRouteLogo) {
      const p = clamp(scrollY / Math.max(1, kwRouteHero.offsetHeight));
      kwRouteHero.style.setProperty('--kw-route-scale', String(mix(1.055,1.105,p)));
      kwRouteHero.style.setProperty('--kw-logo-x', `${mix(0,-22,p)}px`);
      kwRouteHero.style.setProperty('--kw-logo-y', `${mix(0,-50,p)}px`);
      kwRouteHero.style.setProperty('--kw-logo-r', `${mix(0,-1.1,p)}deg`);
      kwRouteHero.style.setProperty('--kw-logo-scale', String(mix(1,1.075,p)));
      kwRouteHero.style.setProperty('--kw-logo-opacity', String(mix(1,.68,p)));
    }
    if (kwRouteStory) {
      const p = smooth(.08,.9,enterProgress(kwRouteStory, .96, .35));
      kwRouteStory.style.setProperty('--kw-story-sweep', `${p * 100}%`);
    }
  }

  /* ---------------------------------------------------------------------
     FAQ
  --------------------------------------------------------------------- */
  const faqs = $$('.faq details');
  faqs.forEach(item => item.addEventListener('toggle', () => {
    if (!item.open) return;
    faqs.forEach(other => { if (other !== item) other.open = false; });
  }));

  /* ---------------------------------------------------------------------
     Render loop
  --------------------------------------------------------------------- */
  let ticking = false;
  function render() {
    ticking = false;
    if (!reducedMotion) {
      if (hero) renderHero(progressIn(hero));
      if (kwkrCase) renderKwkr(progressIn(kwkrCase));
      if (handoff) renderHandoff(progressIn(handoff));
      if (kwCase) renderKw(progressIn(kwCase));
      renderContinuity();
      renderRoutes();
    }
  }

  const requestRender = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(render);
    }
  };

  addEventListener('scroll', requestRender, { passive: true });
  addEventListener('resize', requestRender, { passive: true });
  requestAnimationFrame(() => {
    document.documentElement.classList.add('page-ready');
    render();
  });

  const year = $('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
