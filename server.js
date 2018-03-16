const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extend: true }));
app.locals.title = 'Palette Picker';

app.locals.palettes = [];

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
  console.log(request.body)
  const { title, palette } = request.body;

  if(!title) {
    response.status(422).send({
      error: 'Title is missing.'
    });
  } else {
    app.locals.palettes.push({ id, title, palette });
    response.status(201).json({ id, title, palette });
  }
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
