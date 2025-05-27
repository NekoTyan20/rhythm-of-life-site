fetch('./src/data/projects.json')
	.then(response => {
		if (!response.ok) {
			throw new Error('Помилка при завантаженні JSON');
		}
		return response.json();
	})
	.then(data => {

		let numberOfMas = 0;
		const containerForProjects = document.querySelector('#projectContainer');
		data.posts.forEach(post => {
			containerForProjects.append(templateForProject(post.title, post.text, post.images, numberOfMas));
			numberOfMas += 1;
		});
	})
	.catch(error => {
		console.error('Сталася помилка:', error);
	});


function convertYouTubeLinkToEmbed(link) {
	const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
	const match = link.match(regex);
	if (match && match[1]) {
		return `https://www.youtube.com/embed/${match[1]}`;
	}
	return '';
}

function templateForProject(title, text, mediaItems, numberOfMas) {
	const contentBlock = document.createElement('div');
	contentBlock.classList.add('content-block');
	contentBlock.classList.add('without-margin-one-photo');

	const blockForProject = document.createElement('div');
	blockForProject.classList.add('info');

	if (numberOfMas % 2 !== 0) {
		blockForProject.classList.add('reverse');
	}

	if (mediaItems.length === 1) {
		blockForProject.classList.add('one-photo');
		contentBlock.classList.remove('without-margin-one-photo');
		contentBlock.classList.add('one');
	}

	const textInfo = document.createElement('div');

	const header3Title = document.createElement('h3');
	header3Title.classList.add('third-title-text', 'services', 'projects');
	header3Title.textContent = title;

	const paragraphText = document.createElement('p');
	paragraphText.classList.add('paragraph-text', 'projects');
	paragraphText.textContent = text;

	const mediaElements = mediaItems.map(item => {
		if (typeof item === 'string' && item.trim().startsWith('<iframe')) {
			const wrapper = document.createElement('div');
			wrapper.innerHTML = item.trim();
			const iframe = wrapper.firstElementChild;
			iframe.classList.add('content');
			if (numberOfMas % 2 !== 0) {
				iframe.classList.add('reverse');
			}
			return iframe;
		}

		let type = '';
		let src = '';

		if (typeof item === 'string') {
			src = item;
		} else if (typeof item === 'object' && item.src) {
			src = item.src;
		}

		if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(src)) {
			type = 'youtube';
		} else if (/\.(mp4|webm|ogg)$/i.test(src)) {
			type = 'video';
		} else {
			type = 'image';
		}

		if (type === 'video') {
			const video = document.createElement('video');
			video.setAttribute('src', src);
			video.setAttribute('width', '530');
			video.setAttribute('height', '483');
			video.setAttribute('controls', '');
			video.setAttribute('preload', 'metadata');
			video.classList.add('content');
			if (numberOfMas % 2 !== 0) {
				video.classList.add('reverse');
			}
			return video;
		} else if (type === 'youtube') {
			const iframe = document.createElement('iframe');
			iframe.setAttribute('width', '530');
			iframe.setAttribute('height', '483');
			iframe.setAttribute('src', convertYouTubeLinkToEmbed(src));
			iframe.setAttribute('frameborder', '0');
			iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
			iframe.setAttribute('allowfullscreen', '');
			iframe.classList.add('content');
			if (numberOfMas % 2 !== 0) {
				iframe.classList.add('reverse');
			}
			return iframe;
		} else {
			const image = document.createElement('img');
			image.setAttribute('src', src);
			image.setAttribute('alt', 'Опис зображення');
			image.setAttribute('width', '530');
			image.setAttribute('height', '483');
			image.setAttribute('loading', 'lazy');
			image.classList.add('content');
			if (numberOfMas % 2 !== 0) {
				image.classList.add('reverse');
			}
			return image;
		}
	});


	if (mediaElements.length > 0) {
		mediaElements[0].classList.add('active');
	}

	if (mediaElements.length > 1) {
		contentBlock.append(blockForProject, arrowButtons(numberOfMas, mediaElements.length));
	} else {
		contentBlock.append(blockForProject);
	}

	blockForProject.append(textInfo);
	mediaElements.forEach(element => blockForProject.append(element));
	textInfo.append(header3Title, paragraphText);

	return contentBlock;
}


function arrowButtons(numberOfMas, imagesCount) {
	const arrowButtonsContainer = document.createElement('div');
	arrowButtonsContainer.classList.add('arrow-button-block');
	if (numberOfMas % 2 !== 0) {
		arrowButtonsContainer.classList.add('reverse');
	}

	const leftBtn = document.createElement('button');
	leftBtn.setAttribute('type', 'button');
	leftBtn.classList.add('arrow-button', 'left');

	const rightBtn = document.createElement('button');
	rightBtn.setAttribute('type', 'button');
	rightBtn.classList.add('arrow-button', 'right');

	const containerPoints = document.createElement('div');
	containerPoints.classList.add('container-points');

	for (let i = 0; i < imagesCount; i++) {
		const point = document.createElement('div');
		point.classList.add('point');
		if (i === 0) point.classList.add('active');
		if (numberOfMas % 2 !== 0) point.classList.add('reverse');
		containerPoints.appendChild(point);
	}

	arrowButtonsContainer.append(leftBtn, containerPoints, rightBtn);
	leftBtn.append(createArrowSVG());
	rightBtn.append(createArrowSVG());

	return arrowButtonsContainer;
}

function createArrowSVG() {
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('width', '24');
	svg.setAttribute('height', '24');
	svg.setAttribute('aria-label', 'Кнопка');

	const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
	use.setAttribute('href', './images/sprite.svg#icon-arrow');

	svg.appendChild(use);
	return svg;
}
document.addEventListener('click', (event) => {
	const button = event.target.closest('.arrow-button');

	if (button) {
		const sliderContainer = button.closest('.content-block');
		if (sliderContainer) {
			event.preventDefault();

			const slides = Array.from(sliderContainer.querySelectorAll('img, video'));
			const points = Array.from(sliderContainer.querySelectorAll('.point'));
			const currentIndex = slides.findIndex(slide => slide.classList.contains('active'));

			let newIndex = currentIndex;

			if (button.classList.contains('right')) {
				newIndex = (currentIndex + 1) % slides.length;
			} else if (button.classList.contains('left')) {
				newIndex = (currentIndex - 1 + slides.length) % slides.length; 
			}

			slides.forEach(slide => {
                slide.classList.remove('active');
                if (slide.tagName === 'VIDEO') {
                    slide.pause();
                    slide.currentTime = 0;
                }
            });

            slides[newIndex].classList.add('active');

      
			points.forEach(point => point.classList.remove('active'));
			points[newIndex].classList.add('active');
		}
	}
});
