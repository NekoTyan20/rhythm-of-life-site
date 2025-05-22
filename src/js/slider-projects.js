fetch('../src/data/projects.json')
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


function templateForProject(title, text, images, numberOfMas){
    const contentBlock = document.createElement('div');
    contentBlock.classList.add('content-block');

    const blockForProject = document.createElement('div');
    blockForProject.classList.add('info');

    if(numberOfMas % 2 !== 0){
        blockForProject.classList.add('reverse');
    }
    

    const textInfo = document.createElement('div');

    const header3Title = document.createElement('h3');
    header3Title.classList.add('third-title-text');
    header3Title.classList.add('services');
    header3Title.classList.add('projects');
    header3Title.textContent = title;
    
    const paragraphText = document.createElement('p');
    paragraphText.classList.add('paragraph-text');
    paragraphText.classList.add('projects');
    paragraphText.textContent = text;

    const imagesContainer = images.map((img) => {
        const imageBlock = document.createElement('img');
        imageBlock.setAttribute('src', img);
        if(numberOfMas % 2 !== 0){
            imageBlock.classList.add('reverse');
        }
        imageBlock.setAttribute('alt', 'Опис зображення');
        imageBlock.setAttribute('width', '530');
        imageBlock.setAttribute('height', '483');
        imageBlock.setAttribute('loading', 'lazy');

        return imageBlock;
    })

    imagesContainer[0].classList.add('active');

    contentBlock.append(blockForProject, arrowButtons(numberOfMas));
    blockForProject.append(textInfo);
    imagesContainer.forEach((element) => blockForProject.append(element));
    textInfo.append(header3Title, paragraphText);

    return contentBlock;
}

function arrowButtons(numberOfMas){
    const arrowButtonsContainer = document.createElement('div');
    arrowButtonsContainer.classList.add('arrow-button-block');
    if(numberOfMas % 2 !== 0){
        arrowButtonsContainer.classList.add('reverse');
    }

    const  leftBtn = document.createElement('button');
    leftBtn.setAttribute('type', 'button');
    leftBtn.classList.add('arrow-button');
    leftBtn.classList.add('left');

    const  rightBtn = document.createElement('button');
    rightBtn.setAttribute('type', 'button');
    rightBtn.classList.add('arrow-button');
    rightBtn.classList.add('right');

    const containerPoints = document.createElement('div');
    containerPoints.classList.add('container-points');

    const firstPoint = document.createElement('div');
    firstPoint.classList.add('point');
    firstPoint.classList.add('active');
    
    const secondPoint = document.createElement('div');
    secondPoint.classList.add('point');

    const thirdPoint = document.createElement('div');
    thirdPoint.classList.add('point');

    if(numberOfMas % 2 !== 0){
        firstPoint.classList.add('reverse');
        secondPoint.classList.add('reverse');
        thirdPoint.classList.add('reverse');
    }

    arrowButtonsContainer.append(leftBtn, containerPoints, rightBtn);
    containerPoints.append(firstPoint, secondPoint, thirdPoint);
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

      const slides = Array.from(sliderContainer.querySelectorAll('img'));
      const points = Array.from(sliderContainer.querySelectorAll('.point'));
      const currentIndex = slides.findIndex(slide => slide.classList.contains('active'));

      let newIndex = currentIndex;

      if (button.classList.contains('right')) {
        newIndex = (currentIndex + 1) % slides.length;
      } else if (button.classList.contains('left')) {
        newIndex = (currentIndex - 1 + slides.length) % slides.length; 
      }

      slides.forEach(slide => slide.classList.remove('active'));
      slides[newIndex].classList.add('active');
      
      points.forEach(point => point.classList.remove('active'));
      points[newIndex].classList.add('active');
    }
  }
});
