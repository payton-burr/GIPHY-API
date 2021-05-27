const key = '&api_key=3meK41RxJiNeS6c81jqYQ5Fzqtiq0p0j&limit=20';
const url = 'https://api.giphy.com/v1/gifs/';
const button = document.querySelector('button');
const input = document.querySelector('input');
const results = document.querySelector('.results');
let prevInput;
let title;

const fetchData = async (search) => {
  let urlBase;
  !search
    ? (urlBase = `${url}trending?${key}`)
    : (urlBase = `${url}search?q=${search}${key}`);

  try {
    const response = await fetch(urlBase);
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

const handleData = async (e) => {
  e.preventDefault();
  title && title.remove();
  if (prevInput === input.value) return;
  prevInput = input.value;
  const value = input.value;
  const res = await fetchData(value);

  res.data.forEach((val) => {
    let image = document.createElement('img');
    image.src = val.images.fixed_height_still.url;
    image.classList.add('image');
    results.prepend(image);

    image.addEventListener('mouseenter', () => {
      image.src = val.images.fixed_height.url;
    });
    image.addEventListener('mouseleave', () => {
      image.src = val.images.fixed_height_still.url;
    });
  });
};

window.addEventListener('load', (e) => {
  handleData(e);
  title = document.createElement('h2');
  title.textContent = 'Trending';
  results.before(title);
});

button.addEventListener('click', (e) => {
  if (input.value === '') {
    e.preventDefault();
    return;
  }
  handleData(e);
});
