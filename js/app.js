(function () {
  var yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  var body = document.body;
  var header = document.querySelector(".site-header");
  var toggle = document.getElementById("navToggle");
  var drawer = document.getElementById("mobileDrawer");
  var overlay = document.getElementById("mobileOverlay");
  var mobileLinks = document.querySelectorAll(".mobile-link, .mobileLink");

  function openMenuLabel() {
    return document.documentElement.dataset.navOpenAria || "Open menu";
  }

  function closeMenuLabel() {
    return document.documentElement.dataset.navCloseAria || "Close menu";
  }

  function syncToggleLabel() {
    if (!toggle) {
      return;
    }

    if (body.classList.contains("mobile-open")) {
      toggle.setAttribute("aria-label", closeMenuLabel());
    } else {
      toggle.setAttribute("aria-label", openMenuLabel());
    }
  }

  function closeMenu() {
    body.classList.remove("mobile-open");

    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      syncToggleLabel();
    }

    if (drawer) {
      drawer.setAttribute("aria-hidden", "true");
    }

    if (overlay) {
      overlay.hidden = true;
    }
  }

  function openMenu() {
    body.classList.add("mobile-open");

    if (toggle) {
      toggle.setAttribute("aria-expanded", "true");
      syncToggleLabel();
    }

    if (drawer) {
      drawer.setAttribute("aria-hidden", "false");
    }

    if (overlay) {
      overlay.hidden = false;
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      if (body.classList.contains("mobile-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener(
    "resize",
    function () {
      if (window.innerWidth >= 860) {
        closeMenu();
      }
    },
    { passive: true }
  );

  function updateHeaderState() {
    if (!header) {
      return;
    }

    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  function jumpToHashTarget() {
    function runStableScroll(action) {
      var delays = [0, 120, 320, 720];

      delays.forEach(function (delay) {
        if (delay === 0) {
          window.requestAnimationFrame(action);
          return;
        }

        window.setTimeout(action, delay);
      });
    }

    var params = new URLSearchParams(window.location.search);
    var offset = params.get("offset");

    if (offset) {
      var y = parseInt(offset, 10);
      if (!Number.isNaN(y)) {
        function scrollToOffset() {
          window.scrollTo({ top: Math.max(0, y), left: 0, behavior: "auto" });
        }

        runStableScroll(scrollToOffset);
        return;
      }
    }

    var section = params.get("section");
    var selector = "";

    if (section) {
      selector = "#" + section;
    } else {
      var hash = window.location.hash;
      if (hash && hash.length >= 2) {
        selector = hash;
      }
    }

    if (!selector) {
      return;
    }

    var target = document.querySelector(selector);
    if (!target) {
      return;
    }

    function scrollToTarget() {
      var targetTop = Math.max(0, Math.round(target.getBoundingClientRect().top + window.scrollY));
      window.scrollTo({ top: targetTop, left: 0, behavior: "auto" });
    }

    runStableScroll(scrollToTarget);
  }

  window.addEventListener("scroll", updateHeaderState, { passive: true });
  window.addEventListener("deeq:langchange", syncToggleLabel);
  window.addEventListener("DOMContentLoaded", jumpToHashTarget);
  window.addEventListener("load", jumpToHashTarget);
  updateHeaderState();
  syncToggleLabel();
  jumpToHashTarget();
})();
