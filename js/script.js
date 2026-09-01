gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

window.addEventListener("load", () => {
  if (reduceMotion) {
    document.querySelector(".preloader").remove();
    return;
  }

  const value = { n: 0 };
  const count = document.querySelector(".preloader b");

  gsap.timeline()
    .to(".preloader__line span", { width: "100%", duration: 1.15, ease: "power2.inOut" })
    .to(value, {
      n: 100, duration: 1.15, ease: "power2.inOut",
      onUpdate: () => count.textContent = String(Math.round(value.n)).padStart(3, "0")
    }, 0)
    .to(".preloader", { yPercent: -100, duration: .9, ease: "power4.inOut" })
    .from(".hero__label, .hero h1 span, .hero__bottom", {
      y: 60, opacity: 0, stagger: .08, duration: 1, ease: "power4.out"
    }, "-=.45");
});

if (!reduceMotion) {
  gsap.to(".hero__orb", {
    y: 140, x: -100, scale: 1.15,
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
  });

  gsap.to(".hero h1", {
    y: 80, opacity: .2,
    scrollTrigger: { trigger: ".hero", start: "30% top", end: "bottom top", scrub: 1 }
  });

  gsap.from(".work__intro h2, .work__intro p", {
    y: 70, opacity: 0, stagger: .12, duration: 1, ease: "power4.out",
    scrollTrigger: { trigger: ".work__intro", start: "top 75%" }
  });

  document.querySelectorAll(".project-card").forEach(card => {
    gsap.from(card, {
      y: 100, opacity: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: card, start: "top 78%" }
    });

    gsap.from(card.querySelector(".preview-ui__browser"), {
      y: 50, scale: .94, opacity: 0, duration: 1.1, ease: "power4.out",
      scrollTrigger: { trigger: card, start: "top 72%" }
    });
  });

  gsap.from(".about h2", {
    y: 100, opacity: 0, duration: 1.1, ease: "power4.out",
    scrollTrigger: { trigger: ".about", start: "top 70%" }
  });

  gsap.utils.toArray(".experience__list article").forEach(item => {
    gsap.from(item, {
      y: 50, opacity: 0, duration: .75, ease: "power3.out",
      scrollTrigger: { trigger: item, start: "top 88%" }
    });
  });

  gsap.from(".contact__main", {
    y: 90, opacity: 0, duration: 1.1, ease: "power4.out",
    scrollTrigger: { trigger: ".contact", start: "top 68%" }
  });
}

const menuToggle = document.querySelector(".menu-toggle");
const menuPanel = document.querySelector(".menu-panel");

function closeMenu() {
  menuToggle.classList.remove("is-open");
  menuPanel.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  menuPanel.setAttribute("aria-hidden", "true");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const open = menuToggle.classList.toggle("is-open");
  menuPanel.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  menuPanel.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("menu-open", open);
});

document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    if (menuPanel.classList.contains("is-open")) closeMenu();
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  });
});

let lastY = window.scrollY;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  gsap.to(header, {
    y: y > lastY && y > 120 ? -100 : 0,
    duration: .3,
    overwrite: true
  });
  lastY = y;
}, { passive: true });