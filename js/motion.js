// motion.js — anchored: reversible presence + scroll progress + signature moment (slow)

function prefersReduced(){
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function initPresence(){
  const els = Array.from(document.querySelectorAll("[data-presence]"));
  if(!els.length) return;

  if(prefersReduced()){
    els.forEach(el => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    for(const e of entries){
      if(e.isIntersecting) e.target.classList.add("is-in");
      else e.target.classList.remove("is-in");
    }
  }, { threshold: 0.18, rootMargin: "0px 0px -12% 0px" });

  els.forEach((el) => {
    const style = el.getAttribute("data-presence") || "";
    const delay =
      style === "brand" ? 0 :
      style === "logo" ? 0 :
      style === "headline" ? 140 :
      style === "title" ? 100 :
      style === "lead" ? 160 :
      style === "links" ? 220 :
      style === "feature-left" ? 120 :
      style === "feature-right" ? 120 :
      style === "step" ? 80 :
      style === "contactTop" ? 60 :
      style === "fine" ? 120 :
      90;

    el.style.transitionDelay = `${delay}ms`;
    io.observe(el);
  });
}

export function initScrollProgress(){
  const bar = document.querySelector(".scrollProgress");
  if(!bar) return;

  const onScroll = () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop || 0;
    const max = (doc.scrollHeight - doc.clientHeight) || 1;
    const p = Math.max(0, Math.min(1, scrollTop / max));
    bar.style.width = `${(p * 100).toFixed(2)}%`;

    const glow = document.querySelector(".ambientGlow");
    if(glow){
      glow.style.opacity = String(0.20 + (p * 0.06));
    }
  };

  let raf = 0;
  const tick = () => { raf = 0; onScroll(); };

  window.addEventListener("scroll", () => {
    if(raf) return;
    raf = requestAnimationFrame(tick);
  }, { passive: true });

  onScroll();
}

export function initSignatureMoment(){
  const el = document.querySelector("[data-signature]");
  if(!el) return;

  if(prefersReduced()){
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
    return;
  }

  const clamp01 = (x) => Math.max(0, Math.min(1, x));
  const easeInOut = (t) => t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2;

  const update = () => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || 800;

    const center = r.top + r.height * 0.5;
    const dist = Math.abs((vh * 0.50) - center);
    const maxDist = vh * 0.60; // slower curve

    const raw = 1 - (dist / maxDist);
    const t = easeInOut(clamp01(raw));

    el.style.opacity = String(0.06 + t * 0.94);
    el.style.transform = `translateY(${(1 - t) * 22}px)`;

    // subtle cyan→violet “alive” near peak (not flashy)
    const glow = 0.05 + (t * 0.12);
    el.style.filter =
      `drop-shadow(0 0 26px rgba(68,227,255,${glow})) ` +
      `drop-shadow(0 0 34px rgba(167,139,250,${glow * 0.62}))`;
  };

  let raf = 0;
  const onScroll = () => {
    if(raf) return;
    raf = requestAnimationFrame(() => { raf = 0; update(); });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
}
