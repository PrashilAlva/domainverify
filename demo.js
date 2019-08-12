var express = require('express');
var request = require('request');
var fs = require('fs');
var bodyParser = require('body-parser');
var port = 443;
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.get('/', urlencodedParser, function (req, res) {
    fs.createReadStream(__dirname + '/main.html').pipe(res);
});

app.post('/checkWho',urlencodedParser, (req, res) => {
    console.log(req.body.who);
    var site=req.body.who;
    var url = "http://api.domainsdb.info/search?query="+site;
    console.log(url);
    request(url, function (err, response, body) {
        if (response.statusCode==200) {
            fs.createReadStream(__dirname + '/success.html').pipe(res);
        }
        else {
            fs.createReadStream(__dirname + '/failure.html').pipe(res);
        }

    });
});


app.listen(port);
console.log('Server running in ' + port);
