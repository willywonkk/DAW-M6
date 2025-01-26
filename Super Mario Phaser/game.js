const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 488,
  backgroundColor: '#5D94FB',
  parent: 'game',
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  scene: {
      preload,
      create,
      update
  }
}

new Phaser.Game(config);

function preload() {
    this.load.spritesheet(
        'mario',
        'assets/entities/mario.png',
        { frameWidth: 18, frameHeight: 16}
    );

    this.load.spritesheet(
        'goomba',
        'assets/entities/overworld/goomba.png',
        { frameWidth: 16, frameHeight: 16}
    );

    this.load.image('cartel', 'assets/scenery/sign.png');

    this.load.image('castillo', 'assets/scenery/castle.png');

    this.load.image('badera', 'assets/scenery/final-flag.png');

    this.load.image('mastil', 'assets/scenery/flag-mast.png');

    this.load.image('nube1', 'assets/scenery/overworld/cloud1.png');
    
    this.load.image('nube2', 'assets/scenery/overworld/cloud2.png');
    
    this.load.image('nube3', 'assets/scenery/overworld/cloud3.png');
    
    this.load.image('montaña1', 'assets/scenery/overworld/mountain1.png');
    
    this.load.image('montaña2', 'assets/scenery/overworld/mountain2.png');
    
    this.load.image('arbusto1', 'assets/scenery/overworld/bush1.png');
    
    this.load.image('arbusto2', 'assets/scenery/overworld/bush2.png');
    
    this.load.image('arbusto3', 'assets/scenery/overworld/bush3.png');
    
    this.load.image('suelo', 'assets/scenery/overworld/floorbricks.png');
    
    this.load.image('suelox5', 'assets/scenery/overworld/floorbricksx5.png');
    
    this.load.image('suelox7', 'assets/scenery/overworld/floorbricksx7.png');
    
    this.load.image('tuberia_peque', 'assets/scenery/vertical-small-tube.png');
    
    this.load.image('tuberia_media', 'assets/scenery/vertical-medium-tube.png');
    
    this.load.image('tuberia_grande', 'assets/scenery/vertical-large-tube.png.png');
    
    this.load.image('bloque_duro', 'assets/blocks/overworld/immovableBlock.png');

    this.load.image('bloque_rompible', 'assets/blocks/overworld/block.png');

    this.load.image('bloque_roto', 'assets/blocks/overworld/emptyBlock.png');

    this.load.spritesheet(
        'bloque_sorpresa',
        'assets/blocks/overworld/misteryBlock.png',
        { frameWidth: 16, frameHeight: 16}
    );
}

function create() {
    //----------------------------------------MARIO----------------------------------------
    //------------Mario SIN fisicas------------
    // this.mario = this.add.sprite(100, 400, 'mario')
    //     .setScale(1.5)
    // ;
        
    //------------Mario CON fisicas------------
    this.mario = this.physics.add.sprite(216, 380, 'mario') //Posicion inicial 206
        .setGravityY(90)
        .setOrigin(0, 1)
        .setCollideWorldBounds(true) //Se choca con el cuadro inicial
        .setScale(1.5)
        .setDepth(1) //Capas
    ;

    this.enemy = this.physics.add.sprite(528, 380, 'goomba')
        .setGravityY(300)
        .setOrigin(0, 1)
        .setScale(1.5)
        .setVelocityX(-50)
        .setDepth(1)
        ;

    this.physics.world.setBounds(0, 0, 5070, 488);
    this.cameras.main.setBounds(0, 0, 5070, 488);
    this.cameras.main.startFollow(this.mario);

    //--------------------ANIMACIONES MARIO--------------------
    this.anims.create({
        key: "mario-camina",
        frames: this.anims.generateFrameNumbers(
            "mario",
            { start: 1, end: 3 }
        ),
        frameRate: 12,
        repeat: -1,
    })

    this.anims.create({
        key: 'mario-quieto',
        frames: [{ key: 'mario', frame: 0 }]
    })

    this.anims.create({
        key: 'mario-salta',
        frames: [{ key: 'mario', frame: 5 }]
    })

    this.anims.create({
        key: 'mario-muere',
        frames: [{ key: 'mario', frame: 4 }]
    })

    //----------------ANIMACIONES GOOMBA----------------
    this.anims.create({
        key: 'goomba-camina',
        frames: this.anims.generateFrameNumbers(
        'goomba',
        { start: 0, end: 1 }
        ),
        frameRate: 8,
        repeat: -1
    });
    this.enemy.anims.play('goomba-camina', true);

    this.anims.create({
        key: 'goomba-muere',
        frames: [{ key: 'goomba', frame: 2 }]
    });

    //----------------------------------------MUNDO----------------------------------------
    this.floor = this.physics.add.staticGroup();
    this.blocks = this.physics.add.staticGroup();

    //------------PAISAJES------------
    this.add.image(74, 250, 'cartel').setScale(2).setOrigin(0, 1);

    this.add.image(0, 440, 'montaña2').setScale(0.75).setOrigin(0, 1);
    this.add.image(278, 440, 'arbusto3').setScale(0.75).setOrigin(0, 1);
    this.add.image(384, 440, 'montaña1').setScale(0.75).setOrigin(0, 1);
    this.add.image(565, 440, 'arbusto1').setScale(0.75).setOrigin(0, 1);
    this.add.image(998, 440, 'arbusto2').setScale(0.75).setOrigin(0, 1);
    this.add.image(1152, 440, 'montaña2').setScale(0.75).setOrigin(0, 1);
    this.add.image(1429, 440, 'arbusto3').setScale(0.75).setOrigin(0, 1);
    this.add.image(1536, 440, 'montaña1').setScale(0.75).setOrigin(0, 1);
    this.add.image(1716, 440, 'arbusto1').setScale(0.75).setOrigin(0, 1);
    this.add.image(2148, 440, 'arbusto2').setScale(0.75).setOrigin(0, 1);
    this.add.image(2304, 440, 'montaña2').setScale(0.75).setOrigin(0, 1);
    this.add.image(2582, 440, 'arbusto3').setScale(0.75).setOrigin(0, 1);
    this.add.image(2688, 440, 'montaña1').setScale(0.75).setOrigin(0, 1);
    this.add.image(2868, 440, 'arbusto1').setScale(0.75).setOrigin(0, 1);
    this.add.image(3299, 440, 'arbusto2').setScale(0.75).setOrigin(0, 1);
    this.add.image(3456, 440, 'montaña2').setScale(0.75).setOrigin(0, 1);
    this.add.image(3784, 440, 'arbusto1').setScale(0.75).setOrigin(0, 1);
    this.add.image(3840, 440, 'montaña1').setScale(0.75).setOrigin(0, 1);
    this.add.image(4020, 440, 'arbusto1').setScale(0.75).setOrigin(0, 1);
    this.add.image(4608, 440, 'montaña2').setScale(0.75).setOrigin(0, 1);
    this.add.image(4938, 440, 'arbusto1').setScale(0.75).setOrigin(0, 1);
    this.add.image(4992, 440, 'montaña1').setScale(0.75).setOrigin(0, 1);
    
    
    //------------TUBERIAS------------
    this.floor.create(696, 416, 'tuberia_peque').setScale(1.5).refreshBody();
    this.floor.create(936, 404, 'tuberia_media').setScale(1.5).refreshBody();
    this.floor.create(1128, 393, 'tuberia_grande').setScale(1.5).refreshBody();
    this.floor.create(1392, 393, 'tuberia_grande').setScale(1.5).refreshBody();
    this.floor.create(3936, 416, 'tuberia_peque').setScale(1.5).refreshBody();
    this.floor.create(4320, 416, 'tuberia_peque').setScale(1.5).refreshBody();

    //------------SUELO 1------------
    for (let i = 0; i < 8; i++) {
        this.floor.create(i * 192, 488, 'suelo').setOrigin(0, 1).setScale(1.5).refreshBody();
    }
    this.floor.create(1536, 488, 'suelox5').setOrigin(0, 1).setScale(1.5).refreshBody();

    //------------SUELO 2------------
    this.floor.create(1704, 488, 'suelo').setOrigin(0, 1).setScale(1.5).refreshBody();
    this.floor.create(1896, 488, 'suelox7').setOrigin(0, 1).setScale(1.5).refreshBody();

    //------------SUELO 3------------
    for (let i = 0; i < 8; i++) {
        this.floor.create((i * 192) + 2136, 488, 'suelo').setOrigin(0, 1).setScale(1.5).refreshBody();
    }

    //------------SUELO 4------------
    for (let i = 0; i < 8; i++) {
        this.floor.create((i * 192) + 3720, 488, 'suelo').setOrigin(0, 1).setScale(1.5).refreshBody();
    }
    
    //--------------------ESCALERA 1--------------------
    for (let i = 0; i < 4; i++) {
        this.floor.create((i * 24) + 3216, 440, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();
    }

    for (let i = 0; i < 3; i++) {
        this.floor.create((i * 24) + 3240, 416, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();
    }

    for (let i = 0; i < 2; i++) {
        this.floor.create((i * 24) + 3264, 392, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();
    }

    this.floor.create(3288, 368, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();

    //--------------------ESCALERA 2--------------------
    for (let i = 0; i < 4; i++) {
        this.floor.create((i * 24) + 3360, 440, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();
    }

    for (let i = 0; i < 3; i++) {
        this.floor.create((i * 24) + 3360, 416, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();
    }

    for (let i = 0; i < 2; i++) {
        this.floor.create((i * 24) + 3360, 392, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();
    }

    this.floor.create(3360, 368, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();

    //--------------------ESCALERA 3--------------------
    for (let i = 0; i < 5; i++) {
        this.floor.create((i * 24) + 3552, 440, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();
    }

    for (let i = 0; i < 4; i++) {
        this.floor.create((i * 24) + 3576, 416, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();
    }

    for (let i = 0; i < 3; i++) {
        this.floor.create((i * 24) + 3600, 392, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();
    }

    for (let i = 0; i < 2; i++) {
        this.floor.create((i * 24) + 3624, 368, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();
    }

    //--------------------ESCALERA 4--------------------
    for (let i = 0; i < 4; i++) {
        this.floor.create((i * 24) + 3720, 440, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();
    }

    for (let i = 0; i < 3; i++) {
        this.floor.create((i * 24) + 3720, 416, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();
    }

    for (let i = 0; i < 2; i++) {
        this.floor.create((i * 24) + 3720, 392, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();
    }

    this.floor.create(3720, 368, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();
    
    //--------------------ESCALERA 5--------------------
    for (let i = 0; i < 9; i++) {
        this.floor.create((i * 24) + 4344, 440, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();
    }

    for (let i = 0; i < 8; i++) {
        this.floor.create((i * 24) + 4368, 416, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();
    }

    for (let i = 0; i < 7; i++) {
        this.floor.create((i * 24) + 4392, 392, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();
    }

    for (let i = 0; i < 6; i++) {
        this.floor.create((i * 24) + 4416, 368, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();
    }

    for (let i = 0; i < 5; i++) {
        this.floor.create((i * 24) + 4440, 344, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();
    }

    for (let i = 0; i < 4; i++) {
        this.floor.create((i * 24) + 4464, 320, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();
    }

    for (let i = 0; i < 3; i++) {
        this.floor.create((i * 24) + 4488, 296, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();
    }

    for (let i = 0; i < 2; i++) {
        this.floor.create((i * 24) + 4512, 272, 'bloque_duro').setOrigin(0, 1).setScale(1.5).refreshBody();
    }


    //--------------------BLOQUES--------------------
    this.blocks.create(384, 368, 'bloque_sorpresa').setScale(1.5).setOrigin(0, 1).refreshBody();
    
    this.blocks.create(480, 368, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(504, 368, 'bloque_sorpresa').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(528, 368, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(552, 368, 'bloque_sorpresa').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(574, 368, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();

    this.blocks.create(528, 272, 'bloque_sorpresa').setScale(1.5).setOrigin(0, 1).refreshBody();

    this.blocks.create(1848, 368, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(1872, 368, 'bloque_sorpresa').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(1896, 368, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();

    this.blocks.create(1920, 272, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(1944, 272, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(1968, 272, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(1992, 272, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(2016, 272, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(2040, 272, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(2064, 272, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(2088, 272, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();

    this.blocks.create(2184, 272, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(2208, 272, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(2232, 272, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(2256, 272, 'bloque_sorpresa').setScale(1.5).setOrigin(0, 1).refreshBody();
    
    this.blocks.create(2256, 368, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();

    this.blocks.create(2400, 368, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(2424, 368, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();

    this.blocks.create(2544, 368, 'bloque_sorpresa').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(2616, 368, 'bloque_sorpresa').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(2688, 368, 'bloque_sorpresa').setScale(1.5).setOrigin(0, 1).refreshBody();
    
    this.blocks.create(2616, 272, 'bloque_sorpresa').setScale(1.5).setOrigin(0, 1).refreshBody();

    this.blocks.create(2832, 368, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();

    this.blocks.create(2904, 272, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(2928, 272, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(2952, 272, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();

    this.blocks.create(3072, 272, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(3096, 272, 'bloque_sorpresa').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(3120, 272, 'bloque_sorpresa').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(3144, 272, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();

    this.blocks.create(3096, 368, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(3120, 368, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();

    this.blocks.create(4032, 368, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(4056, 368, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(4080, 368, 'bloque_sorpresa').setScale(1.5).setOrigin(0, 1).refreshBody();
    this.blocks.create(4104, 368, 'bloque_rompible').setScale(1.5).setOrigin(0, 1).refreshBody();


    //--------------------FINAL--------------------
    this.add.image(4752, 440, 'mastil').setScale(1.5).setOrigin(0, 1);
    this.add.image(4848, 440, 'castillo').setScale(1.5).setOrigin(0, 1);

    // COLISIONES
    this.physics.add.collider(this.mario, this.blocks);
    this.physics.add.collider(this.mario, this.floor);
    this.physics.add.collider(this.enemy, this.floor);
    this.physics.add.collider(this.enemy, this.mario, saltarEnemigo, null, this);

    // Keyboard input
    this.keys = this.input.keyboard.createCursorKeys();
}

function saltarEnemigo(mario, enemy) {
    if(mario.body.touching.down && enemy.body.touching.up) {
        enemy.anims.play('goomba-muere', true);
        enemy.setVelocitX(0);
        mario.setVelocityY(-200);
        setTimeout(() => {
            enemy.destroy()
        }, 500);

    } else {
        //Mario muere
    }
}   

function update() {
    if (this.mario.isDead) return;

    // MARIO IZQUIERDA, DERECHA y SALTAR
    if (this.keys.left.isDown) {
      this.mario.setVelocityX(-150)
      this.mario.flipX = true
      if (this.mario.body.touching.down) {
        this.mario.anims.play("mario-camina", true)
      }
    } else if (this.keys.right.isDown) {
      this.mario.setVelocityX(150)
      this.mario.flipX = false
      if (this.mario.body.touching.down) {
        this.mario.anims.play("mario-camina", true)
      }
    } else {
      this.mario.setVelocityX(0)
      if (this.mario.body.touching.down) {
        this.mario.anims.play("mario-quieto", true)
      }
    }
  
    if (this.keys.up.isDown && this.mario.body.touching.down) {
      this.mario.setVelocityY(-280)
      this.mario.anims.play("mario-salta", true)
    }
  
    // MARIO EN EL AIRE
    if (!this.mario.body.touching.down) {
      this.mario.anims.play("mario-salta", true)
    }
  
    // MARIO MUERTE
    if (this.mario.y >= config.height) {
      this.mario.isDead = true
      this.mario.anims.play("mario-muere")
      this.mario.setCollideWorldBounds(false)
  
      setTimeout(() => {
        this.mario.setVelocityY(-350)
      }, 100)
  
      setTimeout(() => {
        this.scene.restart()
      }, 3000)
    }
}
