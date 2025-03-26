// assets/js/main.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("GSAP + Jekyll – Loaded!");

  // 1. Mobile Menu Toggle
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  let menuOpen = false;

  hamburgerBtn.addEventListener("click", () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
      // Reveal the mobile menu with a little GSAP
      mobileMenu.classList.remove("hidden");
      gsap.fromTo(
        mobileMenu,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
      // Optional: lock body scroll
      document.documentElement.style.overflow = "hidden";
    } else {
      // Animate out, then hide
      gsap.to(mobileMenu, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          mobileMenu.classList.add("hidden");
          document.documentElement.style.overflow = "";
        },
      });
    }
  });

  // 2. Random “glowing lines” logic
  //    We'll spawn lines in #randomLines at random intervals.
  const linesContainer = document.getElementById("randomLines");
  if (linesContainer) {
    spawnLine(); // kick off the first line
  }

  function spawnLine() {
    // Create a div or span representing the line
    const lineEl = document.createElement("div");
    lineEl.classList.add("random-line");

    // Decide direction: horizontal or vertical
    const horizontal = Math.random() > 0.5;
    if (horizontal) {
      // lineEl gets 1px height, random width
      const widthPx = 100 + Math.random() * 200; // 100-300
      lineEl.style.width = `${widthPx}px`;
      lineEl.style.height = "1px";
      lineEl.style.top = "50%"; // start near middle
      lineEl.style.left = "0";
      // background direction
      lineEl.style.background = "linear-gradient(to right, rgba(59,130,246,0.6), transparent)";
      // Animate with GSAP
      gsap.fromTo(
        lineEl,
        { opacity: 0, x: 0 },
        {
          opacity: 1,
          x: widthPx + 300,
          duration: 1 + Math.random() * 1.5,
          ease: "power2.out",
          onComplete: () => {
            // fade out
            gsap.to(lineEl, {
              opacity: 0,
              duration: 0.4,
              onComplete: () => {
                linesContainer.removeChild(lineEl);
              },
            });
          },
        }
      );
    } else {
      // vertical line
      const heightPx = 100 + Math.random() * 200; // 100-300
      lineEl.style.width = "1px";
      lineEl.style.height = `${heightPx}px`;
      lineEl.style.left = "50%"; // start near middle
      lineEl.style.top = "0";
      lineEl.style.background = "linear-gradient(to bottom, rgba(59,130,246,0.6), transparent)";
      // Animate
      gsap.fromTo(
        lineEl,
        { opacity: 0, y: 0 },
        {
          opacity: 1,
          y: heightPx + 300,
          duration: 1 + Math.random() * 1.5,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(lineEl, {
              opacity: 0,
              duration: 0.4,
              onComplete: () => {
                linesContainer.removeChild(lineEl);
              },
            });
          },
        }
      );
    }

    // Insert into container
    linesContainer.appendChild(lineEl);

    // Schedule next line
    const nextDelay = 800 + Math.random() * 2000; // 0.8s - 2.8s
    setTimeout(spawnLine, nextDelay);
  }
});

let heroObserved = false;
const heroImageContainer = document.getElementById("heroImageContainer");
const heroRandomLinesContainer = document.getElementById("heroRandomLines");
const heroImage = document.getElementById("heroImage");
const sketchLinesSvg = document.getElementById("sketchLinesSvg");

if (heroImageContainer) {
  // Setup IntersectionObserver to detect ~40% in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !heroObserved) {
          heroObserved = true;
          // 1) Add the rotate + glow animation classes
          heroImageContainer.classList.add("animate-3d-flip");
          heroImageContainer.classList.add("before:animate-image-glow");
          // 2) Fade in actual image
          heroImage.classList.remove("opacity-0");
          heroImage.classList.add("opacity-100");
          // 3) Animate the sketch lines
          sketchLinesSvg && sketchLinesSvg.classList.add("[&_path]:animate-sketch-lines");
          // 4) Start random lines
          spawnLine(); // define below
        }
      });
    },
    { threshold: 0.4 }
  );
  observer.observe(heroImageContainer);
}

function spawnLine() {
  if (!heroRandomLinesContainer) return;
  // Create a random line every so often
  const lineEl = document.createElement("span");
  lineEl.className = "absolute block bg-glow-lines";
  // Decide direction "to left" or "to top"
  const direction = Math.random() > 0.5 ? "to left" : "to top";
  // random size + speed
  const size = 10 + Math.random() * 20; // 10-30
  const duration = 1300 + Math.random() * 2200; // 1300-3500 ms

  if (direction === "to left") {
    lineEl.style.left = "0";
    lineEl.style.top = "50%";
    lineEl.style.width = `${size * 5}px`; // or scale for your preference
    lineEl.style.height = "1px";
    // GSAP fromTo or just CSS animate with a custom keyframe
    gsap.fromTo(
      lineEl,
      { x: 0, opacity: 0 },
      {
        x: size * 5 + 300,
        opacity: 1,
        duration: duration / 1000,
        ease: "power2.out",
        onComplete: () => {
          // fade out
          gsap.to(lineEl, {
            opacity: 0,
            duration: 0.4,
            onComplete: () => heroRandomLinesContainer.removeChild(lineEl),
          });
        },
      }
    );
  } else {
    lineEl.style.right = "0";
    lineEl.style.top = "0";
    lineEl.style.width = "1px";
    lineEl.style.height = `${size * 5}px`;
    gsap.fromTo(
      lineEl,
      { y: 0, opacity: 0 },
      {
        y: size * 5 + 300,
        opacity: 1,
        duration: duration / 1000,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(lineEl, {
            opacity: 0,
            duration: 0.4,
            onComplete: () => heroRandomLinesContainer.removeChild(lineEl),
          });
        },
      }
    );
  }
  heroRandomLinesContainer.appendChild(lineEl);

  // Schedule next line
  const nextDelay = 800 + Math.random() * 1700; // 0.8 - 2.5s
  setTimeout(spawnLine, nextDelay);
}
