const openModal = document.querySelector('#join');
const backdrop = document.querySelector('.backdrop');
const closeFormBtn = document.querySelector('.close-form-btn');
openModal.addEventListener("click", () => {
	backdrop.classList.remove('is-hidden');
});
closeFormBtn.addEventListener("click", () => {
	backdrop.classList.add('is-hidden');
})
