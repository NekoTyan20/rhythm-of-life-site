document.addEventListener('DOMContentLoaded', () => {
	const questionButtons = document.querySelectorAll('.question-title');

	questionButtons.forEach(button => {
		button.addEventListener('click', () => {
			const icon = button.querySelector('.question-arrow-icon');
			const title = button.querySelector('.paragraph-text');
			const answer = button.nextElementSibling;
			const inner = answer.querySelector('.inner-text'); 

			const isActive = answer.classList.contains('active');

			document.querySelectorAll('.question-arrow-icon.active').forEach(el => el.classList.remove('active'));
			document.querySelectorAll('.paragraph-text.active').forEach(el => el.classList.remove('active'));
			document.querySelectorAll('.second-paragraph-text.active').forEach(el => {
				el.classList.remove('active');
				el.style.maxHeight = null;
			});

			if (!isActive) {
				icon.classList.add('active');
				title.classList.add('active');
				answer.classList.add('active');

				answer.style.maxHeight = inner.scrollHeight + 'px'; 
			}
		});
	});

	setTimeout(() => {
		const activeAnswer = document.querySelector('.second-paragraph-text.active');
		if (activeAnswer) {
			const inner = activeAnswer.querySelector('.inner-text');
			activeAnswer.style.maxHeight = inner.scrollHeight + 'px';
		}
	}, 200);

});
