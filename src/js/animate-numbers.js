function animateSingleNumber(el) {
  const max = parseInt(el.getAttribute('data-max'), 10);
  const obj = { val: 0 };

  const progressBar = el.parentElement.querySelector('.progress-bar');

  if (progressBar) {
    progressBar.style.width = '0%';
  }

  gsap.to(obj, {
    val: max,
    duration: 2,
    ease: "power1.out",
    onUpdate: () => {
      el.textContent = Math.floor(obj.val);
      if (progressBar) {
        const percent = (obj.val / max) * 100;
        progressBar.style.width = `${percent}%`;
      }
    },
    onComplete: () => {
      setTimeout(() => {
        el.textContent = '0';
        if (progressBar) {
          progressBar.style.width = '0%';
        }
        animateSingleNumber(el); 
      }, 3000);
    }
  });
}

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      animateSingleNumber(el);
      observer.unobserve(el);
    }
  });
}, {
  threshold: 0.5, 
});

document.querySelectorAll('.paragraph-year').forEach(el => {
  observer.observe(el);
});
