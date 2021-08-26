const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryItemsListEl = document.querySelector('.js-gallery');
const galleryModalEl = document.querySelector('.js-lightbox');
const galleryModalOverlayEl = document.querySelector('.lightbox__overlay')
const modalImgEl = document.querySelector('.lightbox__image');
const closeModalBtnEl = document.querySelector('[data-action="close-lightbox"]')
const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);
const currentModalImgSrc = [];
const currentModalImgDescription = [];
  

  galleryItems.map(galleryItem => {
    currentModalImgSrc.push(galleryItem.original);
    currentModalImgDescription.push(galleryItem.description);
  })

galleryItemsListEl.insertAdjacentHTML('beforeend', galleryItemsMarkup);

galleryItemsListEl.addEventListener('click', galleryClickHandler);
galleryModalEl.addEventListener('click', overlayClickHandler);



function createGalleryItemsMarkup(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;
  }).join('')
}

function galleryClickHandler(e) {
  e.preventDefault()
 
  const isDataSource = e.target.dataset.source;
  if (!isDataSource) {
    return;
  }

  window.addEventListener('keydown', escKeyHandler);
  galleryModalEl.classList.add('is-open');
  modalImgEl.src = e.target.dataset.source;
  modalImgEl.alt = e.target.alt;
  window.addEventListener('keydown', swipingModalImagesHandler);
}

function closeModalHandler(e) {
  window.removeEventListener('keydown', escKeyHandler);
  window.removeEventListener('keydown', swipingModalImagesHandler);
  galleryModalEl.classList.remove('is-open');
  modalImgEl.src = '';
  modalImgEl.alt = '';
}

function overlayClickHandler(e) {
  if (e.target !== modalImgEl) {
    closeModalHandler();
  }
}

function escKeyHandler(e) {
  if (e.code === 'Escape') {
    closeModalHandler();
  }
}
  
function swipingModalImagesHandler(e) {
  const indexCurrentImg = currentModalImgSrc.indexOf(modalImgEl.src);
  const indexCurrentImgDescription = currentModalImgDescription.indexOf(modalImgEl.alt);

  
  if (e.code === 'ArrowRight'&& indexCurrentImg +1 < currentModalImgSrc.length) {
    modalImgEl.src = currentModalImgSrc[indexCurrentImg + 1];
    modalImgEl.alt = currentModalImgDescription[indexCurrentImgDescription + 1];
  }
  if (e.code === 'ArrowLeft'&& indexCurrentImg > 0) {
    modalImgEl.src = currentModalImgSrc[indexCurrentImg - 1]
    modalImgEl.alt = currentModalImgDescription[indexCurrentImgDescription - 1];
  }
  
}