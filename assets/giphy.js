let topics = [
  'Bugatti',
  'Audi',
  'Porche',
  'Jaguar',
  'Ferrari',
  'Mclaren',
  // 'Acura',
  'Spyder',
  'Mustang',
  'Lamborghini',
  'Corvette'
];

// Generating button
$(function() {
  for (let i = 0; i < topics.length; i++)
    $('#button-area').append(
      $('<button>')
        .text(topics[i])
        .addClass('btn btn-light searchButton')
        .attr('data-type', topics[i])
    );
});

// On click event to add GIPHY to search area
$(document).on('click', '.searchButton', function() {
  let type = $(this).data('type');

  let APIKey = '&api_key=3meK41RxJiNeS6c81jqYQ5Fzqtiq0p0j&limit=10';
  let queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + type + APIKey;

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    console.log(response);
    for (let i = 0; i < response.data.length; i++) {
      let gifDiv = $('<div>');
      let still = response.data[i].images.fixed_height_still.url;
      let animate = response.data[i].images.fixed_height.url;
      let rating = response.data[i].rating;
      let p = $('<p>').text('Rating: ' + rating);
      let image = $('<img>');
      image.addClass('gif-image');
      image.attr('src', still);
      image.attr('data-still', still);
      image.attr('data-animate', animate);
      image.attr('data-state', 'still');
      gifDiv.append(p);
      gifDiv.append(image);
      $('#search-area').prepend(gifDiv);
    }
  });
});

// Search button functionality

$('#search-button').on('click', function() {
  let addSearch = $('input').val();
  topics.push(addSearch);
  $('#button-area').append(
    $('<button>')
      .text(addSearch)
      .addClass('btn btn-light searchButton')
      .attr('data-type', addSearch)
  );
  return false;
});

// Animage and still functionality

$(document).on('click', '.gif-image', function() {
  let state = $(this).attr('data-state');
  if (state === 'still') {
    $(this).attr('src', $(this).data('animate'));
    $(this).attr('data-state', 'animate');
  } else {
    $(this).attr('src', $(this).data('still'));
    $(this).attr('data-state', 'still');
  }
});
