document.getElementById('question-form').addEventListener('submit', function(e) {
	e.preventDefault();

	const formData = new FormData(this);
	const statusQuestion = document.getElementById('status-question');

	fetch('https://formsubmit.co/ajax/zritmnasogo@gmail.com', {
		method: 'POST',
		body: formData,
		headers: {
			'Accept': 'application/json'
		}
	})
		.then(response => {
			if (response.ok) {
				statusQuestion.textContent = 'Повідомлення надіслано!';
				this.reset();
			} else {
				statusQuestion.textContent = 'Помилка при надсиланні.';
			}

			setTimeout(() => {
				statusQuestion.textContent = '';
			}, 3000);
		})
		.catch(error => {
			statusQuestion.textContent = 'Помилка з’єднання.';
			setTimeout(() => {
				statusQuestion.textContent = '';
			}, 3000);
		});
});