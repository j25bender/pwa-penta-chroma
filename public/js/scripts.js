const paletteState = {
  palette: {"color1": "rgb(139, 50, 152)",
            "color2": "rgb(42, 17, 172)",
            "color3": "rgb(21, 75, 149)",
            "color4": "rgb(136, 99, 227)",
            "color5": "rgb(221, 8, 250)"}
}

$(window).keypress((e) => {
  if(e.which === 32) {
    setRandomPalette();
  }
});

const setRandomPalette = () => {
  palette = {};
  for(let i = 1; i <= 5; i++) {
    if(!$(`#poly${[i]}`).hasClass('locked')) {
      const elementColor = randomColor();
      $(`#poly${[i]}`).css('fill', elementColor);
      palette[`color${[i]}`] = elementColor;
    } else {
      const lockedColor = $(`#poly${[i]}`).css('fill');
      palette[`color${[i]}`] = lockedColor;   
    }
  }
  paletteState.palette = palette;
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

$('#save-button').click( async (e) => {
  const title = $('#title-input').val();
  await fetch('http://localhost:3000/api/v1/palettes', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      title: title,
      palette: paletteState.palette
    })
  })
})