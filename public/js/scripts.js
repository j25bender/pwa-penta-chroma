$(window).keypress((e) => {
  if(e.which === 32) {
    randomColor();    

    const palette = [{color0: randomColor(), locked: false},
      {color1: randomColor(), locked: false},
      {color2: randomColor(), locked: false},
      {color3: randomColor(), locked: false},
      {color4: randomColor(), locked: false}];

    for(let i = 0; i < 5; i++) {
      console.log(i)
      if($(`#poly${[i]}`).hasClass('locked')) {
        palette[i].locked = true;
      } else {
        console.log('sdf')
      }
    }

    // palette[i].locked = true : palette[i].color[i]
       
    
    $('#svgPoly0').html(`<polygon points="9,10 250,73 110,288" style="fill:${palette[0].color0}" id="poly0"/>`);
    $('#svgPoly1').html(`<polygon points="145,27 270,250 0,250" style="fill:${palette[1].color1};" id="poly1"/>`);
    $('#svgPoly2').html(`<polygon points="242,10 0,73 130,288" style="fill:${palette[2].color2};" id="poly2"/>`);
    $('#svgPoly3').html(`<polygon points="0,0 0,250 242,185" style="fill:${palette[3].color3};" id="poly3"/>`);
    $('#svgPoly4').html(`<polygon points="250,0 8,185 250,250" style="fill:${palette[4].color4};" id="poly4"/>`);
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
