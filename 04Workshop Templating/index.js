const env = process.env.NODE_ENV || 'development';
global.__basedir=__dirname;

const config = require('./config/config')[env];
const app = require('express')();

require('./config/express')(app);
require('./config/routes')(app);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));

// const cubeModel=require('./models/cube');

// //Test update functionality
// cubeModel.update(1,{desc:'updated'}).then((updated)=>console.log(updated));

// //Test insert and delete functionality
// // cubeModel.insert({name:'test1', desc:'test2'})
// // .then(insertedCube=>{
// //     console.log(insertedCube);
// //     return cubeModel.delete(insertedCube.id)
// // }).then((deletedCube)=>{
// //     console.log('deleted cube: ',deletedCube)
// //     console.log('lastIndex should be 1 and we should not have any cubes');
// // })

