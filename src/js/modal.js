const backdrop = document.querySelector('.backdrop');
const closeFormBtn = document.querySelector('.close-form-btn');

document.querySelectorAll('.join-team-btn').forEach((button) => {
	button.addEventListener('click', () => {
		backdrop.classList.remove('is-hidden');
	});
});

closeFormBtn.addEventListener("click", () => {
	backdrop.classList.add('is-hidden');
})
