express = require('express');
app = express();
http = require('http').Server(app);
// io = require('socket.io').listen(http);
os = require('os');

let car;
let pc_socket;
app.use('/mobile', express.static(__dirname + '/client_phone'));
app.use('/mobile', (req, res) => 
{
    // console.log(car);
    // if(!car)
    // {
    //     res.send('Not connected with PC!!!');
    // }
    // io.on('connection', (socket) => 
    // {
    //     console.log('phone connected');
    //     socket.on('upPress', () => 
    //     {
    //         car.up = true;
    //         car.down = false;
    //         pc_socket.emit('chaingePos', car);
    //         console.log('up');
    //     });
    //     socket.on('upDown', () => 
    //     {
    //         car.down = true;
    //         car.up = false;
    //         pc_socket.emit('chaingePos', car);
    //         console.log('down');
    //     });

    //     io.on('disconnect', (socket) => 
    //     {
    //         console.log('phone disconnected');

    //     });
    // });
});
//
app.use('/pc', express.static(__dirname + '/client_pc'));
app.use('/pc', express.static(__dirname + '/client_pc/sprites'));
app.use('/pc', (req, res) => 
{
    // io.on('connection', (socket) => 
    // {
    //     car = { up: true, down: false, gas: false };
    //     console.log('pc connected');
    //     //
    //     pc_socket = socket;
    //     socket.emit('addCar', car);
    //     socket.on('disconnect', (socket) => 
    //     {
    //         console.log('pc disconnected');
    //         delete pc_socket;
    //     });
    // });
});
//
app.use('/', (req, res) => 
{
    plat = os.platform();
    console.log(plat);
    // res.send(plat);
    // res.redirect(plat !== 'win32' ? 'mobile' : 'pc');
});

http.listen(8081);