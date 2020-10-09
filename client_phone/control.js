// import io from 
window.onload = () => 
{
    let socket = io();
    //left arrow
    document.getElementById('up').onclick = () => 
    {
        console.log('up');
        socket.emit('upPress');
    }
    //right arrow
    document.getElementById('down').onclick = () => 
    {
        console.log('down');
        socket.emit('downPress');
    }
    //status button
    document.getElementById('status').onclick = () => 
    {
        socket.emit('statusPress', 'nothing');
    }
} 