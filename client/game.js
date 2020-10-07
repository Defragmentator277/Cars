class Game extends Phaser.Scene 
{
    constructor(conf)
    {
        super(conf);
    }

    preload()
    {
        this.load.image();
    }

    create()
    {

    }

    update()
    {

    }
}

let game = new Phaser.Game(
{
    type: Phaser.AUTO,
    width: 800,
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