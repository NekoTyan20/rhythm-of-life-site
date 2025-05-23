document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener("click", function(e) {
		e.preventDefault();
		const offset = 75; 
		const target = document.querySelector(this.getAttribute("href"));
		const top = target.offsetTop - offset;

		window.scrollTo({
			top,
			behavior: "smooth"
		});
	});
});