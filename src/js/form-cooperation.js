document.getElementById('cooperation-form').addEventListener('submit', function(e) {
	e.preventDefault();

	const formData = new FormData(this);
	const statusCooperation = document.getElementById('status-cooperation');

	fetch('https://formsubmit.co/ajax/zritmnasogo@gmail.com', {
		method: 'POST',
		body: formData,
		headers: {
			'Accept': 'application/json'
		}
	})
		.then(response => {
			if (response.ok) {
				statusCooperation.textContent = 'Повідомлення надіслано!';
				this.reset();
			} else {
				statusCooperation.textContent = 'Помилка при надсиланні.';
			}

			setTimeout(() => {
				statusCooperation.textContent = '';
			}, 3000);
		})
		.catch(error => {
			statusCooperation.textContent = 'Помилка з’єднання.';
			setTimeout(() => {
				statusCooperation.textContent = '';
			}, 3000);
		});
});