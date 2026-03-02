(function () {
  var reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reducedMotion = reducedMotionQuery.matches;
  var query = new URLSearchParams(window.location.search);
  var captureMode = query.has("capture");

  if (captureMode) {
    document.documentElement.classList.add("capture-mode");
  }

  function handleReducedMotionChange(event) {
    reducedMotion = event.matches;
  }

  if (typeof reducedMotionQuery.addEventListener === "function") {
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
  } else if (typeof reducedMotionQuery.addListener === "function") {
    reducedMotionQuery.addListener(handleReducedMotionChange);
  }

  var revealNodes = document.querySelectorAll(".reveal");

  if (reducedMotion || captureMode) {
    revealNodes.forEach(function (node) {
      node.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    revealNodes.forEach(function (node) {
      revealObserver.observe(node);
    });
  }

  var parallaxNodes = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));

  if (!reducedMotion && !captureMode && parallaxNodes.length) {
    var parallaxTicking = false;

    function updateParallax() {
      var viewportHeight = window.innerHeight || 1;

      parallaxNodes.forEach(function (node) {
        var speed = parseFloat(node.getAttribute("data-parallax"));
        if (Number.isNaN(speed)) {
          speed = 0.05;
        }

        var rect = node.getBoundingClientRect();
        var centerOffset = viewportHeight * 0.5 - (rect.top + rect.height * 0.5);
        var shift = centerOffset * speed;
        node.style.transform = "translate3d(0," + shift.toFixed(2) + "px,0)";
      });

      parallaxTicking = false;
    }

    function requestParallaxUpdate() {
      if (parallaxTicking) {
        return;
      }

      parallaxTicking = true;
      window.requestAnimationFrame(updateParallax);
    }

    window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
    window.addEventListener("resize", requestParallaxUpdate);
    requestParallaxUpdate();
  }

  var heroWordmark = document.querySelector(".hero-wordmark-wrap");

  if (heroWordmark && !reducedMotion && !captureMode) {
    var heroTicking = false;

    function updateHeroWordmark() {
      var viewportHeight = window.innerHeight || 1;
      var rect = heroWordmark.getBoundingClientRect();
      var progress = Math.max(0, Math.min(1, 1 - rect.top / (viewportHeight * 1.15)));
      var opacity = 1 - progress * 0.2;
      var shift = progress * 26;

      heroWordmark.style.opacity = String(opacity.toFixed(3));
      heroWordmark.style.transform = "translate3d(0," + shift.toFixed(2) + "px,0)";

      heroTicking = false;
    }

    function requestHeroUpdate() {
      if (heroTicking) {
        return;
      }

      heroTicking = true;
      window.requestAnimationFrame(updateHeroWordmark);
    }

    window.addEventListener("scroll", requestHeroUpdate, { passive: true });
    window.addEventListener("resize", requestHeroUpdate);
    requestHeroUpdate();
  }

  var workSteps = Array.prototype.slice.call(document.querySelectorAll(".work-step"));
  var currentImage = document.getElementById("workImageCurrent");
  var nextImage = document.getElementById("workImageNext");
  var stageKicker = document.getElementById("workStageKicker");
  var stageTitle = document.getElementById("workStageTitle");
  var stageNote = document.getElementById("workStageNote");
  var stageLink = document.getElementById("workStageLink");

  var activeWorkIndex = -1;
  var workTransitionToken = 0;

  function stageLiveLabel() {
    return document.documentElement.dataset.workVisitLive || "Visit live site";
  }

  function stageStartLabel() {
    return document.documentElement.dataset.workStartDirection || "Start this direction";
  }

  function updateStageLink(url, isLive) {
    if (!stageLink) {
      return;
    }

    var nextUrl = url || "#contact";
    var live = isLive === "1" || isLive === "true";

    stageLink.setAttribute("href", nextUrl);

    if (live && /^https?:\/\//i.test(nextUrl)) {
      stageLink.setAttribute("target", "_blank");
      stageLink.setAttribute("rel", "noopener");
      stageLink.textContent = stageLiveLabel();
    } else {
      stageLink.removeAttribute("target");
      stageLink.removeAttribute("rel");
      stageLink.textContent = stageStartLabel();
    }
  }

  function applyWorkState(index, animate, force) {
    if (!workSteps[index]) {
      return;
    }

    if (index === activeWorkIndex && !force) {
      return;
    }

    var nextStep = workSteps[index];

    workSteps.forEach(function (step, stepIndex) {
      step.classList.toggle("is-active", stepIndex === index);
    });

    var nextSrc = nextStep.getAttribute("data-work-image") || "";
    var nextAlt = nextStep.getAttribute("data-work-alt") || "DeeQ Studio project";
    var nextKicker = nextStep.getAttribute("data-work-kicker") || "";
    var nextTitle = nextStep.getAttribute("data-work-title") || "";
    var nextNote = nextStep.getAttribute("data-work-note") || "";
    var nextLink = nextStep.getAttribute("data-work-link") || "#contact";
    var nextLive = nextStep.getAttribute("data-work-live") || "0";

    if (stageKicker) {
      stageKicker.textContent = nextKicker;
    }

    if (stageTitle) {
      stageTitle.textContent = nextTitle;
    }

    if (stageNote) {
      stageNote.textContent = nextNote;
    }

    updateStageLink(nextLink, nextLive);

    if (currentImage && nextImage && nextSrc) {
      var shouldAnimate = animate && !reducedMotion && !captureMode;

      if (!shouldAnimate) {
        currentImage.src = nextSrc;
        currentImage.alt = nextAlt;
        nextImage.classList.remove("is-entering");
        currentImage.classList.remove("is-leaving");
      } else {
        nextImage.src = nextSrc;
        nextImage.alt = nextAlt;

        nextImage.classList.remove("is-entering");
        currentImage.classList.remove("is-leaving");

        void nextImage.offsetWidth;

        nextImage.classList.add("is-entering");
        currentImage.classList.add("is-leaving");

        workTransitionToken += 1;
        var transitionToken = workTransitionToken;

        nextImage.addEventListener(
          "animationend",
          function onAnimationEnd() {
            if (transitionToken !== workTransitionToken) {
              return;
            }

            currentImage.src = nextSrc;
            currentImage.alt = nextAlt;
            nextImage.classList.remove("is-entering");
            currentImage.classList.remove("is-leaving");
          },
          { once: true }
        );
      }
    }

    activeWorkIndex = index;
  }

  if (workSteps.length) {
    workSteps.forEach(function (step, index) {
      step.addEventListener("click", function () {
        applyWorkState(index, true, false);
      });

      step.addEventListener("focus", function () {
        applyWorkState(index, false, false);
      });
    });

    applyWorkState(0, false, true);

    if (!reducedMotion) {
      var workObserver = new IntersectionObserver(
        function (entries) {
          var bestEntry = null;

          entries.forEach(function (entry) {
            if (!entry.isIntersecting || entry.intersectionRatio < 0.62) {
              return;
            }

            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry;
            }
          });

          if (!bestEntry) {
            return;
          }

          var stepIndex = workSteps.indexOf(bestEntry.target);
          if (stepIndex >= 0) {
            applyWorkState(stepIndex, true, false);
          }
        },
        {
          threshold: [0.38, 0.54, 0.68, 0.82],
          rootMargin: "-36% 0px -36% 0px",
        }
      );

      workSteps.forEach(function (step) {
        workObserver.observe(step);
      });
    }
  }

  var updatesType = document.getElementById("updatesType");
  var updatesWrap = document.getElementById("updatesTypeWrap");
  var updatesReserve = document.getElementById("updatesReserve");
  var typeTimer = null;
  var resizeTimer = null;

  function readUpdateLines() {
    if (!updatesWrap) {
      return [];
    }

    var raw = updatesWrap.getAttribute("data-lines") || "";

    return raw
      .split("|")
      .map(function (line) {
        return line.trim();
      })
      .filter(Boolean);
  }

  function startTypewriter() {
    if (!updatesType || !updatesWrap) {
      return;
    }

    if (typeTimer) {
      window.clearTimeout(typeTimer);
      typeTimer = null;
    }

    var updateLines = readUpdateLines();

    if (!updateLines.length) {
      updateLines = [updatesType.textContent || ""]; 
    }

    var measureNode = updatesReserve || updatesType;
    var computed = window.getComputedStyle(measureNode);
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var widestLine = updateLines[0];
    var maxWidth = 0;

    if (ctx) {
      ctx.font =
        computed.font ||
        [computed.fontStyle, computed.fontVariant, computed.fontWeight, computed.fontSize, computed.fontFamily]
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();
    }

    updateLines.forEach(function (line) {
      var width = ctx ? ctx.measureText(line).width : line.length * 12;
      if (width > maxWidth) {
        maxWidth = width;
        widestLine = line;
      }
    });

    if (updatesReserve) {
      updatesReserve.textContent = widestLine;
    }

    if (maxWidth > 0) {
      updatesWrap.style.setProperty("--updates-max-w", Math.ceil(maxWidth + 18) + "px");
    }

    window.requestAnimationFrame(function () {
      if (!updatesReserve) {
        return;
      }

      updatesWrap.style.setProperty("--updates-min-h", updatesReserve.offsetHeight + "px");
    });

    if (reducedMotion || captureMode) {
      updatesType.textContent = updateLines[0];
      return;
    }

    var lineIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function tickType() {
      var line = updateLines[lineIndex];

      if (!deleting) {
        charIndex += 1;
      } else {
        charIndex -= 1;
      }

      updatesType.textContent = line.slice(0, Math.max(charIndex, 0));

      var delay = deleting ? 34 : 56;

      if (!deleting && charIndex >= line.length) {
        deleting = true;
        delay = 1320;
      } else if (deleting && charIndex <= 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % updateLines.length;
        delay = 260;
      }

      typeTimer = window.setTimeout(tickType, delay);
    }

    typeTimer = window.setTimeout(tickType, 640);
  }

  startTypewriter();

  window.addEventListener("resize", function () {
    if (resizeTimer) {
      window.clearTimeout(resizeTimer);
    }

    resizeTimer = window.setTimeout(startTypewriter, 160);
  });

  window.addEventListener("deeq:langchange", function () {
    if (activeWorkIndex >= 0) {
      applyWorkState(activeWorkIndex, false, true);
    }

    startTypewriter();
  });
})();
