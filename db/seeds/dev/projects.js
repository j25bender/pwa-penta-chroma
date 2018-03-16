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
            {color1: 'red', project_id: project[0]},
            {color2: 'orange', project_id: project[0]},
            {color3: 'yellow', project_id: project[0]},
            {color4: 'green', project_id: project[0]},
            {color5: 'blue', project_id: project[0]}
          ]);
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
  .catch(error => console.log(`Error seeding data: ${error}`));
};
