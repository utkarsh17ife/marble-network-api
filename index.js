const express = require('express');
var bodyParser = require('body-parser')
var { mongoService } = require('./service');

var port = process.env.PORT || 3000

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



var port = process.env.PORT || 3000;


mongoService.connect();



app.use('/rest/asset/', require('./routes/asset'));
app.use('/rest/query/', require('./routes/query'));
app.use('/rest/transaction/', require('./routes/transaction'));
app.use('/rest/network/', require('./routes/network'));
app.use('/rest/participant/', require('./routes/participant'));







app.listen(port, () => {
    console.log(`The app is up on port ${port}`);
})