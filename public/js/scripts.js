const palette = {};

$(window).keypress((e) => {
  if(e.which === 32) {
    for(let i = 1; i <= 5; i++) {
      if(!$(`#poly${[i]}`).hasClass('locked')) {
        $(`#poly${[i]}`).css('fill', randomColor());
      }
    }
  }
});

const randomColor = () => {
  const redValue = Math.floor(Math.random() * 252) + 1;
  const greenValue = Math.floor(Math.random() * 252) + 1;
  const blueValue = Math.floor(Math.random() * 252) + 1;
  return `rgb(${redValue}, ${greenValue}, ${blueValue})`
}

$('#color-pentagram').click((e) => {
  const elementId = '#' + e.target.id;
  $(elementId).hasClass('locked') ? $(elementId).removeClass('locked') : $(elementId).addClass('locked');  
});
