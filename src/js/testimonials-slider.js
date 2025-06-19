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
	const blockWidth = block.offsetWidth + 20; 
	const shift = currentIndex * blockWidth;
	wrapper.style.transform = `translateX(-${shift}px)`;

	dots.forEach(d => d.classList.remove('active'));
	dots[currentIndex].classList.add('active');
}

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
});

wrapperTouchArea.addEventListener('touchend', (e) => {
	if (!isSwiping) return;
	isSwiping = false;

	const endX = e.changedTouches[0].clientX;
	const diffX = endX - startX;

	const swipeThreshold = 50; 

	if (diffX > swipeThreshold && currentIndex > 0) {
		currentIndex--;
		updateSlide();
	} else if (diffX < -swipeThreshold && currentIndex < totalSlides - 1) {
		currentIndex++;
		updateSlide();
	} else {
		updateSlide();
	}
});

