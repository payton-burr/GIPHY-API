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

function generateButtons() {
  for (topic of topics) {
    const buttons = document.createElement('button');
    buttons.textContent = topic;
    buttons.classList.add('btn-options');
    buttonArea.appendChild(buttons);
  }
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-options')) {
    giphyName = e.target.textContent;
    getGiphy();
  } else {
    return null;
  }
});

async function getGiphy() {
  const url = urlBase + giphyName + APIKey;
  const giphyAPI = await fetch(url);
  const giphy = await giphyAPI.json();
  // console.log(giphy);

  for (let i = 0; i < giphy.data.length; i++) {
    let image = document.createElement('img');
    image.src = giphy.data[i].images.fixed_height_still.url;
    console.log(image.src);
    image.classList.add('image');
    imageContainer.prepend(image);
  }
}

generateButtons();
