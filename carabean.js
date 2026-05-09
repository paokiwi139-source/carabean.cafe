/* -----------------------------------------
   Basic Utility JS for Your Café Website
   Fully editable — no Wix code
------------------------------------------*/

/* Smooth scroll for internal links */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* Highlight the current day in your opening hours */
(function highlightOpenDay() {
  const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
  ];

  const today = days[new Date().getDay()];
  const hoursElement = document.querySelector('.about-box');

  if (hoursElement) {
    const text = hoursElement.innerHTML;
    const highlighted = text.replace(today, `<strong style="color:#d2691e">${today}</strong>`);
    hoursElement.innerHTML = highlighted;
  }
})();

/* Add a “Back to Top” button */
const backToTop = document.createElement('button');
backToTop.textContent = "↑ Top";
backToTop.style.position = "fixed";
backToTop.style.bottom = "20px";
backToTop.style.right = "20px";
backToTop.style.padding = "10px 14px";
backToTop.style.border = "none";
backToTop.style.borderRadius = "6px";
backToTop.style.background = "#333";
backToTop.style.color = "#fff";
backToTop.style.cursor = "pointer";
backToTop.style.display = "none";
backToTop.style.fontSize = "1rem";
backToTop.style.zIndex = "999";

document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const pastryImage = document.querySelector(".pastry-banner img");

window.addEventListener("scroll", () => {
  if (!pastryImage) return;

  const scrollAmount = window.scrollY;
  const shift = Math.min(scrollAmount * 0.08, window.innerWidth * 0.2);

  pastryImage.style.setProperty("--scroll-shift", `-${shift}px`);
});

/* ------------------------------
   Gallery Slider
--------------------------------*/

const track = document.querySelector(".gallery-track");
const slides = document.querySelectorAll(".gallery-track img");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const galleryWindow = document.querySelector(".gallery-window");

let index = 0;
const gap = 30;

function updateGallery() {
  let offset = 0;

  for (let i = 0; i < index; i++) {
    offset += slides[i].offsetWidth + gap;
  }

  const activeSlideWidth = slides[index].offsetWidth;
  const windowWidth = galleryWindow.offsetWidth;

  offset = offset - (windowWidth - activeSlideWidth) / 2;

  track.style.transform = `translateX(-${offset}px)`;

  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

nextBtn.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  updateGallery();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  updateGallery();
});

window.addEventListener("resize", updateGallery);
window.addEventListener("load", updateGallery);