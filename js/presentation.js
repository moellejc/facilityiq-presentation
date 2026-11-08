/**
 * FacilityIQ Presentation engine
 * Keyboard, click, swipe, and hash navigation
 */

(() => {
  const deck = document.querySelector("[data-deck]");
  if (!deck) return;

  const slides = Array.from(deck.querySelectorAll("[data-slide]"));
  const progressBar = document.querySelector("[data-progress]");
  const currentEl = document.querySelector("[data-slide-current]");
  const totalEl = document.querySelector("[data-slide-total]");
  const prevBtn = document.querySelector("[data-prev]");
  const nextBtn = document.querySelector("[data-next]");

  let index = 0;
  let animating = false;
  let touchStartX = 0;
  let touchStartY = 0;

  const total = slides.length;
  if (totalEl) totalEl.textContent = String(total).padStart(2, "0");

  function clamp(n) {
    return Math.max(0, Math.min(total - 1, n));
  }

  function updateChrome() {
    if (currentEl) currentEl.textContent = String(index + 1).padStart(2, "0");
    if (progressBar) {
      const pct = total <= 1 ? 100 : (index / (total - 1)) * 100;
      progressBar.style.width = `${pct}%`;
    }
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === total - 1;
  }

  function goTo(nextIndex, { pushHash = true } = {}) {
    const target = clamp(nextIndex);
    if (target === index || animating) return;

    const direction = target > index ? 1 : -1;
    const current = slides[index];
    const next = slides[target];

    animating = true;
    current.classList.remove("is-active");
    current.classList.add(direction > 0 ? "is-exit-up" : "is-exit-down");

    next.classList.remove("is-exit-up", "is-exit-down");
    next.classList.add("is-active");

    index = target;
    updateChrome();

    if (pushHash) {
      const id = next.id || `slide-${index + 1}`;
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
      slide.classList.toggle("is-active", i === index);
    });

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
      const t = event.changedTouches[0];
      const dx = t.screenX - touchStartX;
      const dy = t.screenY - touchStartY;
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) next();
      else prev();
    },
    { passive: true }
  );

  init();

  // Expose for console / extensions
  window.FacilityIQDeck = { goTo, next, prev, get index() { return index; }, get total() { return total; } };
})();
