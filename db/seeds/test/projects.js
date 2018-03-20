exports.seed = function(knex, Promise) {
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          title: 'Project1'
        }, 'id')
        .then(project => {
          return knex('palettes').insert([
            {
              project_id: project[0],
              palette_name: 'palette 1',
              color1: 'red',
              color2: 'orange',
              color3: 'yellow',
              color4: 'green',
              color5: 'blue'
            }
          ])
        })
        .catch(error => console.log(`Inner Error seeding data: ${error}`))
      ])
    })
  .catch(error => console.log(`Outer Error seeding data: ${error}`));
};
