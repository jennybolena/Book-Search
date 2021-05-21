const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const myRouter = require('./routes/handlers');

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.use('/', myRouter);

app.use(express.static('public'));


app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});

