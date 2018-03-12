const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));
app.locals.title = 'Palette Picker';

app.locals.palettes = [
  { id: '1', title: 'palette one', palette: [{color1: 'red', locked: false},
                                           {color2: 'orange', locked: false},
                                           {color3: 'yellow', locked: false},
                                           {color4: 'green', locked: false},
                                           {color5: 'blue', locked: false}]
  },
  { id: '2', title: 'palette two', palette: [{color1: 'indigo', locked: false},
                                           {color2: 'violet', locked: false},
                                           {color3: 'mangenta', locked: false},
                                           {color4: 'puce', locked: false},
                                           {color5: 'ghostwhite', locked: false}]
  }
];

app.get('/', (request, response) => {
  response.send('hello platte picker!');
});

app.get('/api/v1/palettes', (request, response) => {
  const palettes = app.locals.palettes;

  response.json(palettes);
});

app.get('/api/v1/palettes/:id', (request, response) => {
  const { id } = request.params;
  const palette = app.locals.palettes.find( palette => palette.id === id );
  if(palette) {
    response.status(200).json(palette);    
  } else {
    response.sendStatus(404);
  }
});

app.post('/api/v1/palettes', (request, response) => {
  const id = Date.now();
  const { palette } = request.body;

  app.locals.palettes.push(message);
  response.status(201).json({ id, palette });
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
