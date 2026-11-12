/* FacilityIQ deck — stage scaling + speaker notes (press N). */
(() => {
  const root = document.documentElement;
  const fit = () => root.style.setProperty("--stage-scale", Math.min(innerWidth / 1600, innerHeight / 900));
  addEventListener("resize", fit); fit();

  const panel = document.createElement("aside");
  panel.className = "notes-panel"; panel.setAttribute("aria-live", "polite");
  document.body.appendChild(panel);
  const render = () => {
    const s = document.querySelector(".slide.is-active");
    const n = s && s.querySelector(".notes");
    panel.innerHTML = `<h5>Speaker notes · ${s ? s.dataset.preview : ""}</h5>` + (n ? n.innerHTML : "<p>—</p>");
  };
  new MutationObserver(render).observe(document.querySelector(".slides"), { subtree: true, attributes: true, attributeFilter: ["class"] });
  addEventListener("keydown", (e) => { if (e.key === "n" || e.key === "N") { document.body.classList.toggle("show-notes"); render(); } });
  render();
})();
