$(window).keypress((e) => {
  if(e.which === 32) {
    // make it it's own func then calll it in enter key press and save keyprss
    const palette = {};
    for(let i = 1; i <= 5; i++) {
      if(!$(`#poly${[i]}`).hasClass('locked')) {
        const elementColor = randomColor();
        $(`#poly${[i]}`).css('fill', elementColor);
        palette[`color${[i]}`] = elementColor;
      }
    }
    getNewPalette(palette);
  }
});

//fetch to update server

const getNewPalette = (palette) => {
  return newPalette
}

const randomColor = () => {
  const redValue = Math.floor(Math.random() * 255) + 1;
  const greenValue = Math.floor(Math.random() * 255) + 1;
  const blueValue = Math.floor(Math.random() * 255) + 1;
  return `rgb(${redValue}, ${greenValue}, ${blueValue})`
}

$('#color-pentagram').click((e) => {
  const elementId = '#' + e.target.id;
  $(elementId).hasClass('locked') ? $(elementId).removeClass('locked') : $(elementId).addClass('locked');  
});

$('#save-button').click((e) => {
})