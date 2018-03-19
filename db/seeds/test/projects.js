exports.seed = function(knex, Promise) {
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert([
          { id: 0, title: 'Project1' }
        ], 'id')
        .then(project => {
          return knex('palettes').insert([
            {
              id: 0,
              project_id: 0,
              palette_name: 'palette 1',
              color1: 'red',
              color2: 'orange',
              color3: 'yellow',
              color4: 'green',
              color5: 'blue'
            }
          ]);
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
  .catch(error => console.log(`Error seeding data: ${error}`));
};
