const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8080;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


//register middleware

app.use((req, res, next) =>{ 
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
});

/*
//maintenance page
app.use((req, res, next) =>{ 
    res.render('maintenance.hbs');
       // next();
});
*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

/*
app.get('/', (req, res) => {
    //res.send('<h1>Hello trouble.</h1>');
    res.send({
        name : 'Fouad',
        likes : ['reading', 'writing']
    });
});
*/

app.listen(port, () => {
    console.log(`The server is up on port ${port}`);
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
    pageTitle : 'The About Page',
        });
});


app.get('/', (req, res) => {
    res.render('home.hbs', {
    pageTitle : 'The Home Page',
    welcome : 'The goal of this video is to explain, The goal of this video is to explain.',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
    pageTitle : 'This is the PR@JeTS Page',
    welcome : 'My portfolio shows you this video for enjoyment.',
    });
});

// localhost 8080 using the following public link
// http://weather-app.roboserve.c9users.io/

//https://polar-sea-83353.herokuapp.com/