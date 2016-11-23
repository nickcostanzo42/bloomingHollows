const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');



app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/", express.static(__dirname + '/public'));


var db = pgp(process.env.DATABASE_URL || 'postgres://nicholascostanzo@localhost:5432/heroku_test');

app.get('/', function(req, res) {
    db.any('SELECT * FROM messages').then(function(data) {
        var template_data = {
            messages: data
        }
        res.render('index', template_data);
    });
});


app.listen(PORT, function() {
  console.log('Node app is running on', PORT);
});
