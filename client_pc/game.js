class Game extends Phaser.Scene 
{
    constructor(conf)
    {
        super(conf);
        //Parametr`s
        this.mainCar;
        this.greetingText;
        //Tween`s animation
        this.animateText = [];
        //Another Library
        this.socket = io();
        //Constant`s
        this.WIDTH = 1000;
        this.HEIGHT = 600;
        //Car`s movements
        this.TOP_POINT = 150;
        this.MIDDLE_POINT = 270;
        this.BOTTOM_POINT = 430;
        //
        this.SCALE_CAR = 0.5;
    }

    preload()
    {
        this.load.image('car', 'sprites/car.jpg');  
        this.load.image('background', 'sprites/background.png');
    }

    create()
    {
        this.greetingText = this.add.text(0, 0, 'Connect phone to start play!',
        {
            align: 'center',
            color: '#FFF',
            fontSize: '50px'
        })
        .setOrigin(0.5)
        .setScale(0.5)
        .setPosition(this.WIDTH / 2, this.HEIGHT / 2);
        this.randAnimation();
        //
        this.socket.on('startGame', () => 
        {
            console.log('Game beggins!');
            //Adding background
            this.add.image(0, 0, 'background')
            .setOrigin(0)
            .setScale(1);
            //Adding main car
            this.mainCar = this.add.sprite(300, this.TOP_POINT, 'car')
            .setScale(this.SCALE_CAR)
            .setFlipX(true);
            //Deleting enter text
            this.greetingText.destroy();
        });
        this.socket.on('chaingePos', (car_pos) => 
        {
            console.log('Car chainge position');
            if(car_pos[0])
            {
                this.mainCar.y = this.TOP_POINT;
            }
            else if(car_pos[1])
            {
                this.mainCar.y = this.MIDDLE_POINT;
            }
            else if(car_pos[2])
            {
                this.mainCar.y = this.BOTTOM_POINT;
            }
            else
            {
                console.log('Error something went frong');
            }
        });
        //
    }

    update()
    {

    }

    randAnimation()
    {
        if(Math.random() > 0.5)
        {
            let scaleText = this.tweens.add(
            {
                targets: this.greetingText,
                scale: '+=0.5',
                duration: 1500,
                delay: 1000,
                ease: 'Bounce',
                yoyo: true,
                onComplete: () => this.randAnimation()
            })
        }
        else
        {
            let spinText = this.tweens.add(
            {
                targets: this.greetingText,
                angle: (Math.random() > 0.5 ? '-' : '+') + '=360',
                duration: 1500,
                delay: 1000,
                ease: 'Sine',
                yoyo: true,
                onComplete: () => this.randAnimation()
            })
        }
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