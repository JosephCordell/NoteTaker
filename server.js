const express = require('express');
const routes = require('./controllers')
const exphbs = require('express-handlebars')
const path = require('path');

const hbs = exphbs.create({})

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3000;


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes)


// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
