const btnBurger = document.querySelector('.btn-burger');
const containerBurgerMenu = document.querySelector('.header-burger-elements');
btnBurger.addEventListener('click', (event) => {
	btnBurger.classList.toggle('is-open');
	containerBurgerMenu.classList.toggle('is-open');
})

window.addEventListener('resize', () => {
  if (window.innerWidth >= 660) {
    btnBurger.classList.remove('is-open');
    containerBurgerMenu.classList.remove('is-open');
  }
});