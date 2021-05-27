const key = '&api_key=3meK41RxJiNeS6c81jqYQ5Fzqtiq0p0j&limit=10';
const url = 'https://api.giphy.com/v1/gifs/';
const button = document.querySelector('button');
const input = document.querySelector('input');
const results = document.querySelector('.results');

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
  let toggle = false;
  const value = input.value;
  const res = await fetchData(value);
  const { data } = res;
  data.forEach((val) => {
    let image = document.createElement('img');
    image.src = val.images.fixed_height_still.url;
    image.classList.add('image');
    results.prepend(image);

    image.addEventListener('click', () => {
      !toggle
        ? (image.src = val.images.fixed_height.url)
        : (image.src = val.images.fixed_height_still.url);

      toggle = !toggle;
    });
  });
};

window.addEventListener('load', handleData);

button.addEventListener('click', handleData);