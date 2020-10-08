// import io from 
window.onload = () => 
{
    this.socket = io();
    //left arrow
    document.getElementById('up').onclick = () => 
    {
        console.log('up');
        this.socket.emit('upPress');
    }
    //right arrow
    document.getElementById('down').onclick = () => 
    {
        console.log('down');
        this.socket.emit('downPress');
    }
} 