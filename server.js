express = require('express');
app = express();
http = require('http').Server(app);
io = require('socket.io').listen(http);
os = require('os');

let car_pos = [ true, false, false ];
let pc_socket, mobile_socket;
//
//
app.use('/mobile', (req, res, next) => 
{
    let platform = getClientPlatform(req);
    if(platform !== 'Linux')
        res.redirect('/');
    else
        next();
})
app.use('/mobile', express.static(__dirname + '/client_phone'));
//
app.use('/pc', (req, res, next) => 
{
    let platform = getClientPlatform(req);
    if(platform !== 'Windows')
        res.redirect('/');
    else
        next();
});
app.use('/pc', express.static(__dirname + '/client_pc'));
app.use('/pc', express.static(__dirname + '/client_pc/sprites'));
//
app.use('/', (req, res) => 
{
    let platform = getClientPlatform(req);
    if(platform === 'Windows')
        res.redirect('pc');
    else if(platform === 'Linux')
        res.redirect('mobile');
    else
        res.send('Your platform not supported');
});
//
io.on('connection', (socket) => 
{
    let platform = getClientPlatform(socket.handshake);
    socket.plat = platform;
    if(platform === 'Windows')
    {
        console.log('Pc connected ' + socket.id);
        pc_socket = socket;
    }
    else
    {
        console.log('Control connected ' + socket.id);
        mobile_socket = socket;
        if(pc_socket)
        {
            console.log('Starting the game');
            pc_socket.emit('startGame');
            mobile_socket.on('upPress', () => 
            {
                car_pos.every((elem, index) => 
                {
                    if(elem && index > 0)
                    {
                        console.log('upPress find');
                        car_pos[index - 1] = true;
                        car_pos[index] = false;
                        pc_socket.emit('chaingePos', car_pos);
                        return false;
                    }
                    return true;
                });
            });
            mobile_socket.on('downPress', () => 
            {
                car_pos.every((elem, index) => 
                {
                    if(elem && index < car_pos.length - 1)
                    {
                        console.log('downPress find ' + index);
                        car_pos[index + 1] = true;
                        car_pos[index] = false;
                        pc_socket.emit('chaingePos', car_pos);
                        return false;
                    }
                    return true;
                });
            });
            mobile_socket.on('statusPress', (info) => 
            {
                console.log(info);
            });
        }
    }
    io.on('disconnect', (socket) => 
    {
        console.log(socket.platform + ' was disconnect');
    });
});
//
http.listen(8082);
//Function`s
function getClientPlatform(req)
{
    return req.headers['user-agent'].split(' ')[1].replace('(', '').replace(';', '');
}