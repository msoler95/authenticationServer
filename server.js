var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');
var models = require('./models');
var config = require('./config');
var cors = require('cors');
var expressValidator = require('express-validator');
mongoose.connect(config.db_path);


//Initialize models defined.
models.initialize();


var app = express();

app.use(bodyParser.json());
app.use(expressValidator())
//Server routes
var userRouter = require('./routes/userRoute');
var authRouter = require('./routes/authenticationRoute');
var resetPasswordRouter = require('./routes/resetPassword');
app.use(cors());


app.use('/user', userRouter);
app.use('/authenticate', authRouter);
app.use('/resetPassword', resetPasswordRouter);

// app.use(express.static(__dirname + '/public'));

// app.get('*', function(req, res){
//   res.sendfile(__dirname + '/public/index.html');
// });


var port = config.serverPort;
var adress = config.serverUrl;

http.createServer(app).listen(port, adress, function () {
  console.log('Conected on local:8080! :D' + new Date())
});

