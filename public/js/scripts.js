const pageSetup = () => {
  getProjects();
  getPalettes();
}

$(document).ready( pageSetup );

const paletteState = {
  palette: {"color1": "rgb(139, 50, 152)",
            "color2": "rgb(42, 17, 172)",
            "color3": "rgb(21, 75, 149)",
            "color4": "rgb(136, 99, 227)",
            "color5": "rgb(221, 8, 250)"}
}

$(window).keypress((e) => {
  if(e.which === 32 &&
    !$(document.activeElement).is('#palette-input') && 
    !$(document.activeElement).is('#save-palette') &&
    !$(document.activeElement).is('#title-input') &&
    !$(document.activeElement).is('#save-title')) {
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

$('#save-title').click( async (e) => {
  const title = $('#title-input').val();
  await fetch('/api/v1/projects', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      title
    })
  })
});

$('#save-palette').click( async (e) => {
  createPalettes(paletteState.palette)
  const paletteName = $('#palette-input').val();
  const projectId = $('#select-options').val();

  await fetch('/api/v1/palettes', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      palette_name: paletteName,
      project_id: parseInt(projectId),
      ...paletteState.palette})
  })
});

const deletePalette = async (e) => {
  const paletteId = e.target.id;
  $(e.target).parent().remove();
  await fetch(`/api/v1/palettes/${paletteId}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  });
};

$('#project-container').on('click', '.delete', deletePalette);

const getProjects = async () => {
  const initialFetch = await fetch('/api/v1/projects');
  const projects = await initialFetch.json();
  projects.forEach(project => createProjects(project));
}

const createProjects = (project) => {
  $('#select-options').append(`<option value=${project.id}>${project.title}</option>`);
  $('#project-container').append(`<h2 id=${project.id}>${project.title}</h2>`)
}

const getPalettes = async () => {
  const initialFetch = await fetch('/api/v1/palettes');
  const palettes = await initialFetch.json();
  palettes.forEach(palette => createPalettes(palette));
}

const createPalettes = (palette) => {
  const addColors = createColors(palette);  
  $('#' + palette.project_id).append(`<div><h3 id=${palette.id}>${palette.palette_name}</h3><div id="palette-container">${addColors}</div><button class="delete" id=${palette.id}>DELETE</button></div>`);
}

const createColors = (palette) => {
  let result = '';
  for(let i = 1; i <= 5; i++) {
    if(palette) {
      result += `<div style="background-color:${palette[`color${i}`]}">${palette[`color${i}`]}</div>`
    }    
  }
  return result;
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {    
    navigator.serviceWorker.register('../service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      }).catch(error => {
        console.log(`ServiceWorker registration failed: ${error}`);
      });
  });
}
 