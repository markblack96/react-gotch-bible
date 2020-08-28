// little test server, won't be used in production
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname + '/public')));

app.get('/', function (req, res) {
    res.sendFile('index.html');
})

app.listen('5000', function() {
    console.log('Running on 127.0.0.1:5000')
})