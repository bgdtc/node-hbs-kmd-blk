//import modules
const
    express = require('express'),
    app = express(),
    cors = require('cors'),
    hbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 8888;



// Cors
app.use(cors({
    origin: ['http://localhost:8888'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))


//Handlebars
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
}));

//Express static pour le chemin de dossier
app.use('/assets', express.static('public'));

//BODY PARSER 
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());



//Router dirige chemins sur les controllers

const ROUTER = require('./back/router')
app.use('/', ROUTER)


app.listen(port, () => {
    console.log("le serveur tourne bien sur le port:" + port);
});