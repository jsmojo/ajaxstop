var express = require('express');
var config = {
    port: process.env.port || 8080
};

var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {});
});

app.listen(config.port, function() {
    console.log(`Running on port: ${config.port}`);
})
