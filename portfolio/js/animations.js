// js/animations.js
(function () {
  const reveals = document.querySelectorAll(".reveal");

  if (!reveals.length) return; // safety check

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // stagger effect
          const siblings =
            entry.target.parentElement.querySelectorAll(".reveal");
          let delay = 0;

          siblings.forEach((el, idx) => {
            if (el === entry.target) {
              delay = idx * 80;
            }
          });

          setTimeout(() => {
            entry.target.classList.add("visible");
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  reveals.forEach((el) => observer.observe(el));
})();
