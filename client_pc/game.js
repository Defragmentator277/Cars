class Game extends Phaser.Scene 
{
    constructor(conf)
    {
        super(conf);
        this.main_car;
        this.socket = io();
        this.TOP_POINT = 100;
        this.BOTTOM_POINT = 250;
    }

    preload()
    {
        // this.load.image('car', '/sprites/car.png');
    }

    create()
    {
        //
        this.socket.on('addCar', (car) => 
        {
            this.main_car = this.add.rectangle(100, 0, 250, 250, 0xFF0000);
            if(car.up)
            {
                this.main_car.y = this.TOP_POINT;
            }
            else
            {
                this.main_car.y = this.BOTTOM_POINT;
            }
            console.log('Car added');
        });
        this.socket.on('chaingePos', (car) => 
        {
            if(car.up)
            {
                this.main_car.y = this.TOP_POINT;
            }
            else
            {
                this.main_car.y = this.BOTTOM_POINT;
            }
        })
        //
    }

    update()
    {

    }
}

let game = new Phaser.Game(
{
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    physics: 
    {
        default: 'arcade',
        arcade: 
        {
            debug: true,
            gravity: { y: 0 }
        }
    },
    scene: Game
});