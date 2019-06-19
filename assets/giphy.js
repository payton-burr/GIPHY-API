let topics = [
  'Bugatti',
  'Audi',
  'Porche',
  'Jaguar',
  'Ferrari',
  'Mclaren',
  'BMW',
  'Spyder',
  'Mustang',
  'Lamborghini',
  'Corvette'
];

// Change the append from body to whatever class I set button area to
$(function() {
  for (let i = 0; i < topics.length; i++)
    $('#button-area').append(
      $('<button>')
        .text(topics[i])
        .addClass('btn btn-light')
    );
});
