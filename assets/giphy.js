let topics = [
  'Bugatti',
  'Audi',
  'Porche',
  'Jaguar',
  'Ferrari',
  'Mclaren',
  'Spyder',
  'Mustang',
  'Lamborghini',
  'Corvette',
];

const APIKey = '&api_key=3meK41RxJiNeS6c81jqYQ5Fzqtiq0p0j&limit=10';
const urlBase = 'https://api.giphy.com/v1/gifs/search?q=';
let giphyName = '';
const buttonArea = document.querySelector('.button-area');
const imageContainer = document.querySelector('.images-container');
const searchForm = document.querySelector('#search-form');

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-options')) {
    giphyName = e.target.textContent;
    getGiphy();
  } else {
    return null;
  }
});

searchForm.addEventListener('submit', handleSubmit);

function generateButtons() {
  for (topic of topics) {
    const buttons = document.createElement('button');
    buttons.textContent = topic;
    buttons.classList.add('btn-options');
    buttonArea.appendChild(buttons);
  }
}

function handleSubmit(e) {
  e.preventDefault();

  giphyName = e.target.children[1].value;
  getGiphy();
}

async function getGiphy() {
  const url = urlBase + giphyName + APIKey;
  const giphyAPI = await fetch(url);
  const giphy = await giphyAPI.json();
  let toggle = false;
  // console.log(giphy);

  for (let i = 0; i < giphy.data.length; i++) {
    let image = document.createElement('img');
    image.src = giphy.data[i].images.fixed_height_still.url;
    image.classList.add('image');
    imageContainer.prepend(image);

    image.addEventListener('click', (e) => {
      e.preventDefault();
      if (!toggle) {
        image.src = giphy.data[i].images.fixed_height.url;
        toggle = !toggle;
      } else {
        image.src = giphy.data[i].images.fixed_height_still.url;
        toggle = !toggle;
      }
    });
  }
}

generateButtons();
