const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = (app) => {
    
    //TODO: Setup the view engine
    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        extname:'.hbs'
    }));
    //TODO: Setup the body parser
    app.use(bodyParser.urlencoded({
        extended:true
    }));
    //TODO: Setup the static files
    app.set('view engine','.hbs');
    app.use(express.static('./static'));
};