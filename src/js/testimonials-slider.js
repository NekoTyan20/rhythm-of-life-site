const wrapper = document.querySelector('.testimonials-container');
const dots = document.querySelectorAll('.dots');
const block = document.querySelector('.testimonials-block');
const wrapperTouchArea = document.querySelector('.testimonials-wrapper');

let currentIndex = 0;
const totalSlides = dots.length;

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentIndex = i;
    updateSlide();
  });
});

function updateSlide() {
  const blockWidth = block.offsetWidth + 20; // 20 — ваш margin-left
  const shift = currentIndex * blockWidth;
  wrapper.style.transform = `translateX(-${shift}px)`;

  dots.forEach(d => d.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

// --- Добавляем обработку свайпа ---
let startX = 0;
let isSwiping = false;

wrapperTouchArea.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isSwiping = true;
});

wrapperTouchArea.addEventListener('touchmove', (e) => {
  if (!isSwiping) return;
  const currentX = e.touches[0].clientX;
  const diffX = currentX - startX;

  // Можно добавить визуальный сдвиг при свайпе (необязательно)
  // wrapper.style.transform = `translateX(${-currentIndex * (block.offsetWidth + 20) + diffX}px)`;
});

wrapperTouchArea.addEventListener('touchend', (e) => {
  if (!isSwiping) return;
  isSwiping = false;

  const endX = e.changedTouches[0].clientX;
  const diffX = endX - startX;

  const swipeThreshold = 50; // Минимальное расстояние для свайпа

  if (diffX > swipeThreshold && currentIndex > 0) {
    // свайп вправо — назад
    currentIndex--;
    updateSlide();
  } else if (diffX < -swipeThreshold && currentIndex < totalSlides - 1) {
    // свайп влево — вперед
    currentIndex++;
    updateSlide();
  } else {
    // возвращаемся на текущий слайд, если свайп недостаточен
    updateSlide();
  }
});

