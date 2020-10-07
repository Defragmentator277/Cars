express = require('express');
app = express();
http = require('http').Server(app);
io = require('socket.io').listen(http);

app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/client/sprites'));

// console.log(window.navigator);
http.listen(8081);