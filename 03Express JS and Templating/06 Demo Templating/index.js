const express = require('express');
const port = 8080;
const handlebars = require('express-handlebars');

const app = express();

global.__projectdir = __dirname;

app.use(express.static(__dirname + '/public'));
app.engine('.hbs', handlebars({ extname: '.hbs' }))
app.set('views', __dirname + '/views');

app.get('/',(req, res)=> {
  res.render('index.hbs', {
    title: 'Some title',
    body: 'TEST'
  });
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});