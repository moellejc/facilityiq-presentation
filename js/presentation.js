/**
 * FacilityIQ Presentation engine
 * Keyboard, click, swipe, hash navigation, and slide overview drawer
 */

(() => {
  const deck = document.querySelector("[data-deck]");
  if (!deck) return;

  const slides = Array.from(deck.querySelectorAll("[data-slide]"));
  const progressBar = document.querySelector("[data-progress]");
  const currentEls = Array.from(document.querySelectorAll("[data-slide-current]"));
  const totalEls = Array.from(document.querySelectorAll("[data-slide-total]"));
  const prevBtn = document.querySelector("[data-prev]");
  const nextBtn = document.querySelector("[data-next]");
  const sectionLabel = document.querySelector("[data-section-label]");
  const overview = document.querySelector("[data-overview]");
  const overviewScrim = document.querySelector("[data-overview-scrim]");
  const overviewTrack = document.querySelector("[data-overview-track]");
  const overviewToggles = Array.from(document.querySelectorAll("[data-overview-toggle]"));

  let index = 0;
  let animating = false;
  let overviewOpen = false;
  let touchStartX = 0;
  let touchStartY = 0;
  let overviewTouchY = 0;

  const total = slides.length;
  const pad = (n) => String(n).padStart(2, "0");

  totalEls.forEach((el) => {
    el.textContent = pad(total);
  });

  function clamp(n) {
    return Math.max(0, Math.min(total - 1, n));
  }

  function previewLabel(slide, i) {
    return (
      slide.getAttribute("data-preview") ||
      slide.querySelector(".headline, h1, h2")?.textContent?.trim()?.slice(0, 42) ||
      `Slide ${pad(i + 1)}`
    );
  }

  function buildOverview() {
    if (!overviewTrack) return;
    overviewTrack.replaceChildren();

    slides.forEach((slide, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "overview-item";
      btn.setAttribute("role", "listitem");
      btn.dataset.overviewIndex = String(i);
      btn.setAttribute("aria-label", `Go to slide ${i + 1}: ${previewLabel(slide, i)}`);

      btn.innerHTML = `
        <span class="overview-item__index">${pad(i + 1)}</span>
        <span class="overview-item__title"></span>
        <span class="overview-item__rule" aria-hidden="true"></span>
      `;
      btn.querySelector(".overview-item__title").textContent = previewLabel(slide, i);

      btn.addEventListener("click", () => {
        goTo(i, { force: true });
        closeOverview();
      });

      overviewTrack.appendChild(btn);
    });
  }

  function syncOverviewActive() {
    if (!overviewTrack) return;
    const items = overviewTrack.querySelectorAll(".overview-item");
    items.forEach((item, i) => {
      const active = i === index;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-current", active ? "true" : "false");
      if (active && overviewOpen) {
        item.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
      }
    });
  }

  function setOverviewOpen(open) {
    overviewOpen = open;
    document.body.classList.toggle("is-overview-open", open);

    if (overview) {
      overview.classList.toggle("is-open", open);
      overview.setAttribute("aria-hidden", open ? "false" : "true");
    }

    if (overviewScrim) {
      overviewScrim.hidden = false;
      overviewScrim.classList.toggle("is-visible", open);
      if (!open) {
        window.setTimeout(() => {
          if (!overviewOpen) overviewScrim.hidden = true;
        }, 420);
      }
    }

    overviewToggles.forEach((btn) => {
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (btn.hasAttribute("aria-label")) {
        btn.setAttribute(
          "aria-label",
          open ? "Close slide overview" : "Open slide overview"
        );
      }
    });

    if (open) syncOverviewActive();
  }

  function openOverview() {
    setOverviewOpen(true);
  }

  function closeOverview() {
    setOverviewOpen(false);
  }

  function toggleOverview() {
    setOverviewOpen(!overviewOpen);
  }

  function updateChrome() {
    currentEls.forEach((el) => {
      el.textContent = pad(index + 1);
    });

    if (progressBar) {
      const pct = total <= 1 ? 100 : (index / (total - 1)) * 100;
      progressBar.style.width = `${pct}%`;
    }

    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === total - 1;

    if (sectionLabel) {
      sectionLabel.textContent =
        slides[index]?.getAttribute("data-section") || previewLabel(slides[index], index);
    }

    syncOverviewActive();
  }

  function goTo(nextIndex, { pushHash = true, force = false } = {}) {
    const target = clamp(nextIndex);
    if (target === index) return;
    if (animating && !force) return;

    const direction = target > index ? 1 : -1;
    const current = slides[index];
    const nextSlide = slides[target];

    if (force) {
      slides.forEach((slide) => {
        slide.classList.remove("is-active", "is-exit-up", "is-exit-down");
      });
      nextSlide.classList.add("is-active");
      index = target;
      animating = false;
      updateChrome();
      if (pushHash) {
        const id = nextSlide.id || `slide-${index + 1}`;
        history.replaceState(null, "", `#${id}`);
      }
      return;
    }

    animating = true;
    current.classList.remove("is-active");
    current.classList.add(direction > 0 ? "is-exit-up" : "is-exit-down");

    nextSlide.classList.remove("is-exit-up", "is-exit-down");
    nextSlide.classList.add("is-active");

    index = target;
    updateChrome();

    if (pushHash) {
      const id = nextSlide.id || `slide-${index + 1}`;
      history.replaceState(null, "", `#${id}`);
    }

    window.setTimeout(() => {
      current.classList.remove("is-exit-up", "is-exit-down");
      animating = false;
    }, 480);
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  function indexFromHash() {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return 0;
    const byId = slides.findIndex((s) => s.id === hash);
    if (byId >= 0) return byId;
    const match = /^slide-(\d+)$/i.exec(hash);
    if (match) return clamp(Number(match[1]) - 1);
    return 0;
  }

  function init() {
    slides.forEach((slide, i) => {
      if (!slide.id) slide.id = `slide-${i + 1}`;
    });

    buildOverview();
    index = indexFromHash();

    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === index);
    });

    updateChrome();

    if (!window.location.hash && slides[0]?.id) {
      history.replaceState(null, "", `#${slides[0].id}`);
    }
  }

  document.addEventListener("keydown", (event) => {
    const tag = event.target?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || event.target?.isContentEditable) {
      return;
    }

    if (event.key === "Escape" && overviewOpen) {
      event.preventDefault();
      closeOverview();
      return;
    }

    if (event.key === "o" || event.key === "O") {
      event.preventDefault();
      toggleOverview();
      return;
    }

    if (overviewOpen) return;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
      case "PageDown":
      case " ":
      case "Enter":
        event.preventDefault();
        next();
        break;
      case "ArrowLeft":
      case "ArrowUp":
      case "PageUp":
      case "Backspace":
        event.preventDefault();
        prev();
        break;
      case "Home":
        event.preventDefault();
        goTo(0);
        break;
      case "End":
        event.preventDefault();
        goTo(total - 1);
        break;
      default:
        break;
    }
  });

  prevBtn?.addEventListener("click", prev);
  nextBtn?.addEventListener("click", next);
  overviewToggles.forEach((btn) => btn.addEventListener("click", toggleOverview));
  overviewScrim?.addEventListener("click", closeOverview);

  window.addEventListener("hashchange", () => {
    const fromHash = indexFromHash();
    if (fromHash !== index) goTo(fromHash, { pushHash: false });
  });

  deck.addEventListener(
    "touchstart",
    (event) => {
      const t = event.changedTouches[0];
      touchStartX = t.screenX;
      touchStartY = t.screenY;
    },
    { passive: true }
  );

  deck.addEventListener(
    "touchend",
    (event) => {
      if (overviewOpen) return;
      const t = event.changedTouches[0];
      const dx = t.screenX - touchStartX;
      const dy = t.screenY - touchStartY;
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) next();
      else prev();
    },
    { passive: true }
  );

  // Swipe down on overview to close; swipe up near bottom edge to open
  overview?.addEventListener(
    "touchstart",
    (event) => {
      overviewTouchY = event.changedTouches[0].screenY;
    },
    { passive: true }
  );

  overview?.addEventListener(
    "touchend",
    (event) => {
      const dy = event.changedTouches[0].screenY - overviewTouchY;
      if (overviewOpen && dy > 56) closeOverview();
      if (!overviewOpen && dy < -40) openOverview();
    },
    { passive: true }
  );

  document.addEventListener(
    "touchstart",
    (event) => {
      if (overviewOpen) return;
      const t = event.changedTouches[0];
      if (t.screenY > window.innerHeight - 56) {
        overviewTouchY = t.screenY;
      } else {
        overviewTouchY = 0;
      }
    },
    { passive: true }
  );

  document.addEventListener(
    "touchend",
    (event) => {
      if (overviewOpen || !overviewTouchY) return;
      const t = event.changedTouches[0];
      const dy = t.screenY - overviewTouchY;
      if (dy < -48) openOverview();
      overviewTouchY = 0;
    },
    { passive: true }
  );

  init();

  window.FacilityIQDeck = {
    goTo,
    next,
    prev,
    openOverview,
    closeOverview,
    toggleOverview,
    get index() {
      return index;
    },
    get total() {
      return total;
    },
    get overviewOpen() {
      return overviewOpen;
    },
  };
})();
