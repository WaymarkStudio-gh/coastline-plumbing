/* Coastline Plumbing & Gas - script.js */

/* 1. Mobile navigation toggle */
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* 2. Fade sections in as they scroll into view (also draws the flow line) */
const reveals = document.querySelectorAll(".reveal, .flow-line");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

/* 3. Auto-update the footer year */
const yearEl = document.querySelector("#year");
if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

/* --- GSAP animations (needs the GSAP + ScrollTrigger scripts, only loaded on index.html) --- */

if (typeof gsap !== "undefined") {
  // Turn on the ScrollTrigger add-on
  gsap.registerPlugin(ScrollTrigger);

  // 1. Hero: heading, text and buttons rise and fade in on page load
  gsap.from(".hero-inner > *", {
    y: 24,          // start 24px lower
    opacity: 0,     // start invisible
    duration: 0.7,  // take 0.7 seconds
    stagger: 0.12,  // 0.12s gap between each element
    ease: "power2.out"
  });

  // 2. Service list items: each one rises as you scroll to it
  gsap.utils.toArray(".service-item").forEach((item) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,      // watch this item
        start: "top 85%"    // fire when its top reaches 85% down the screen
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  });
}