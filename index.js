var express = require('express');
var mongoose = require('mongoose');
var app = express();
var redis = require('redis');
var client = redis.createClient(6379, 'redis');
var bodyParser = require('body-parser')

mongoose.Promise = Promise;
mongoose.connect("mongodb://mongo:27017/users", {
    useNewUrlParser: true
}).then(() => {
    console.log('Succesfully connected to the database');
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res) => {
    res.json("go tp 2")
})

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

client.set('my test key', 'my test value', redis.print);
client.get('my test key', function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }
    console.log('GET result ->' + result);
});

var port = 3001;
app.listen(port, function(){
    console.log("server running on :3001")
});





