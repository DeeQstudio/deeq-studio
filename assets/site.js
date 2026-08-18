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

  // Mobile menu: focus-safe, Escape-safe and inert while closed.
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
    menuReturnFocus = document.activeElement;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.querySelector('.sr-only').textContent = 'Close menu';
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    menu.inert = false;
    document.body.classList.add('menu-open');
    menu.querySelector('a')?.focus();
  };
  toggle?.addEventListener('click', () => toggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu());
  menu?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') closeMenu();
    if (e.key === 'Tab' && toggle?.getAttribute('aria-expanded') === 'true' && menu) {
      const focusable = [toggle, ...$$('a, button', menu)].filter(el => !el.disabled);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Header is intentionally lighter over light sections by using mix-blend-mode.
  const header = $('[data-header]');
  let lastY = 0;
  addEventListener('scroll', () => {
    const y = scrollY;
    if (header && !document.body.classList.contains('menu-open')) {
      header.classList.toggle('header-hidden', y > lastY && y > 180);
    }
    lastY = y;
  }, { passive: true });

  const progressIn = el => {
    const r = el.getBoundingClientRect();
    const travel = Math.max(1, el.offsetHeight - innerHeight);
    return clamp(-r.top / travel);
  };

  // Pointer parallax is intentionally small; scroll remains the primary narrative input.
  let px = 0, py = 0, tpx = 0, tpy = 0;
  let pointerRAF = 0;
  const settlePointer = () => {
    px += (tpx - px) * .12;
    py += (tpy - py) * .12;
    render();
    if (Math.abs(tpx - px) > .002 || Math.abs(tpy - py) > .002) pointerRAF = requestAnimationFrame(settlePointer);
    else pointerRAF = 0;
  };
  if (!reducedMotion && matchMedia('(pointer:fine)').matches) {
    addEventListener('pointermove', e => {
      tpx = (e.clientX / innerWidth - .5) * 2;
      tpy = (e.clientY / innerHeight - .5) * 2;
      if (!pointerRAF) pointerRAF = requestAnimationFrame(settlePointer);
    }, { passive: true });
  }

  const hero = $('.hero');
  const grid = $('.hero-grid');
  const heroCopy = $('.hero-copy');
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
    if (grid) grid.style.transform = `translate(-50%,-50%) perspective(900px) rotateX(${69 + py * 1.3}deg) rotateZ(${px * .45}deg) translateY(${p * 7}vh)`;
    if (heroCopy) {
      const fade = smooth(.78,.97,p);
      heroCopy.style.opacity = String(1 - fade);
      heroCopy.style.transform = `translateY(${fade * -30}px)`;
    }
    if (counter) counter.textContent = p < .47 ? '01 / 02' : '02 / 02';
  }

  const kwkrCase = $('.case-kwkr');
  const kwkrPhoto = $('[data-kwkr-photo]');
  const kwkrSite = $('[data-kwkr-site]');
  const kwkrRelease = $('[data-kwkr-release]');
  const kwkrLive = $('[data-kwkr-live]');
  const kwkrStory = $('.case-kwkr [data-case-story]');
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
      kwkrStory.style.transform = `translateY(${(1 - story) * 100}%)`;
      kwkrStory.style.opacity = String(story);
    }
  }

  const kwCase = $('.case-kw');
  const kwOg = $('[data-kw-og]');
  const kwWord = $('[data-kw-wordmark]');
  const kwSite = $('[data-kw-site]');
  const kwStory = $('.case-kw [data-case-story]');
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
      kwStory.style.transform = `translateY(${(1 - story) * 100}%)`;
      kwStory.style.opacity = String(story);
    }
  }

  const lab = $('.icon-lab');
  const labMark = $('.lab-mark');
  const touchBrowser = $('.touch-browser');
  const touchSearch = $('.touch-search');
  const touchShare = $('.touch-share');
  const touchHome = $('.touch-home');
  function renderLab() {
    if (reducedMotion || !lab || !labMark) return;
    const r = lab.getBoundingClientRect();
    const center = clamp(1 - Math.abs((r.top + r.height / 2 - innerHeight / 2) / innerHeight), 0, 1);
    const mx = px * center, my = py * center;
    labMark.style.transform = `translate(-50%,-50%) translate3d(${mx*14}px,${my*10}px,80px) rotateX(${my*-5}deg) rotateY(${mx*7}deg)`;
    touchBrowser && (touchBrowser.style.transform = `translate3d(${mx*-8}px,${my*-5}px,0) rotate(${mix(-5,-3,center)}deg)`);
    touchSearch && (touchSearch.style.transform = `translate3d(${mx*9}px,${my*-6}px,0) rotate(${mix(4,2,center)}deg)`);
    touchShare && (touchShare.style.transform = `translate3d(${mx*-10}px,${my*7}px,0) rotate(${mix(3,1,center)}deg)`);
    touchHome && (touchHome.style.transform = `translate3d(${mx*8}px,${my*8}px,0) rotate(${mix(-4,-2,center)}deg)`);
  }

  // FAQ: only one open at a time; avoids an unnecessarily long accordion wall.
  const faqs = $$('.faq details');
  faqs.forEach(item => item.addEventListener('toggle', () => {
    if (!item.open) return;
    faqs.forEach(other => { if (other !== item) other.open = false; });
  }));

  let ticking = false;
  function render() {
    ticking = false;
    if (!reducedMotion) {
      hero && renderHero(progressIn(hero));
      kwkrCase && renderKwkr(progressIn(kwkrCase));
      kwCase && renderKw(progressIn(kwCase));
      renderLab();
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
  render();

  $('[data-year]').textContent = new Date().getFullYear();
})();
