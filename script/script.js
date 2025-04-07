// Sticky Navigation Menu JS Code
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");
console.log(scrollBtn);
let val;
window.onscroll = function () {
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add("sticky");
    scrollBtn.style.display = "block";
  } else {
    nav.classList.remove("sticky");
    scrollBtn.style.display = "none";
  }
};

// Side NavIgation Menu JS Code
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = function () {
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  body.style.overflow = "hidden";
  scrollBtn.style.pointerEvents = "none";
};
cancelBtn.onclick = function () {
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflow = "auto";
  scrollBtn.style.pointerEvents = "auto";
};

// Side Navigation Bar Close While We Click On Navigation Links
let navLinks = document.querySelectorAll(".menu li a");
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    navBar.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
  });
}
let nb_stops = 10; // 10 color stops should be enough
let dir = "left"; // left, right, top, bottom

function SetupRainbow() {
  var rainbowStr = GetRainbowString(nb_stops, 80, 50);
  var oppositeDir =
    dir === "left"
      ? "right"
      : dir === "right"
      ? "left"
      : dir === "top"
      ? "bottom"
      : "top";
  var css =
    ".rainbowText {\
   background-clip: text;\
   color: transparent;\
   -webkit-background-clip: text;\
   -webkit-text-fill-color: transparent;\
   background-image: -webkit-linear-gradient(" +
    dir +
    "," +
    rainbowStr +
    "); \
   background-image: linear-gradient(to " +
    oppositeDir +
    "," +
    rainbowStr +
    ") \
}";

  var style = document.createElement("style");
  style.type = "text/css";
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  document.head.appendChild(style);
}

// function that generate the rainbow string
function GetRainbowString(nbStops, saturation, luminosity) {
  let gap = 360 / nbStops,
    colors = [];
  for (let i = 0; i < nbStops; i++) {
    colors.push("hsl(" + i * gap + "," + saturation + "%," + luminosity + "%)");
  }
  return colors.join();
}

window.addEventListener("load", function () {
  SetupRainbow();

  // Initialize horizontal scrolling if GSAP is available
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    // ScrollTrigger plugin registration
    gsap.registerPlugin(ScrollTrigger);

    // Setup horizontal scrolling for experience section
    initExperienceScroll();
  }
});

// Initialize the horizontal scrolling for experience section
function initExperienceScroll() {
  // Check if the experience container exists
  const experienceContainer = document.getElementById("experience-container");
  if (!experienceContainer) return;

  // Selecting all horizontal sections
  const horizontalSections = gsap.utils.toArray(".horizontal-section");

  // Applying horizontal scroll animation
  gsap.to(horizontalSections, {
    xPercent: -100 * (horizontalSections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: "#experience-container",
      pin: true,
      scrub: 1,
      snap: 1 / (horizontalSections.length - 1),
      end: () =>
        "+=" + document.querySelector("#experience-container").offsetWidth,
    },
  });
}
