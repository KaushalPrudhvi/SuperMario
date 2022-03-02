const MOVE_SPEED = 120;
const JUMP_FORCE = 360;
const BIG_JUMP_FORCE = 550;
let CURRENT_JUMP_FORCE = JUMP_FORCE;
const ENEMY_SPEED = 20;
let isJumping = true;
const FALL_DEATH = 400;
const TIME_LEFT = 50;
let isBig = false;
kaboom({
  global: true,
  // enable full screen
  fullscreen: true,
  scale: 1,
  // for debug mode
  debug: true,
  clearColor: [0, 0, 0, 1],
});

//add scenes
//coins
loadRoot("https://i.imgur.com/");
loadSprite("coin", "wbKxhcd.png");

//enenmies

loadSprite("evil-shroom", "KPO3fR9.png");
//bricks
loadSprite("brick", "pogC9x5.png");
//blocks
loadSprite("block", "M6rwarW.png");

//mario

loadSprite("mario", "Wb1qfhK.png");

loadSprite("mushroom", "0wMd92p.png");

loadSprite("surprise", "gesQ1KP.png");

loadSprite("unboxed", "bdrLpi6.png");

loadSprite("pipe-top-left", "ReTPiWY.png");

loadSprite("pipe-top-right", "hj2GK4n.png");

loadSprite("pipe-bottom-left", "c1cYSbt.png");

loadSprite("pipe-bottom-right", "nqQ79eI.png");

loadSprite("blue-block", "fVscIbn.png");

loadSprite("blue-brick", "3e5YRQd.png");

loadSprite("blue-steel", "gqVoI2b.png");

loadSprite("blue-evil-shroom", "SvV4ueD.png");

loadSprite("blue-surprise", "RMqCc1G.png");

scene("game", ({ level, score }) => {
  //create layers
  //An array
  // background layer, object layer as default, UI layer
  // initialise with obj as default
  layers(["bg", "obj", "ui"], "obj");
  // draw maps
  const maps = [
    [
      "                                                       ",
      "                                                       ",
      "                                                       ",
      "                                                       ",
      "                                                       ",
      "                                                       ",
      "                                                       ",
      "                                                       ",
      "         ============================                                              ",
      "                                                       ",
      "                                                       ",
      "                                                       ",
      "                                                       ",
      "     %    =*=%=                                        ",
      "                          -+                  -+       ",
      "           ^      ^   ^    ()            ^     ()  ^        ",
      "===============================   ==  = ===  ============== ",
    ],
    [
      "£                                                       £",
      "£     ! ! ! ! ! ! ! ! ! ! ! !                           £",
      "£                                                       £",
      "£                                                       £",
      "£                                                       £",
      "£                               x                       £",
      "£     %    @@@@@@              xx                       £",
      "£                             xxx                -+     £",
      "£                 z   z      xxxx                ()     £",
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  !!!!!!!!!!!!!!!!!!!!",
    ],
    [
      "£                                                       £",
      "£     ! ! ! ! ! ! ! ! ! ! ! !                                                  £",
      "£                                                       £",
      "£                                                       £",
      "£                                                       £",
      "£                               x                       £",
      "£     %    @@@@@@              xx                       £",
      "£                             xxx                -+     £",
      "£     zzzzzzzzz                 zzzzzzzzzzz  z      xxxx           ()     £",
      "!!!!!!!!!!!!!!!!!  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    ],
  ];

  //level configuration
  const levelCfg = {
    //every sprite has a wdith and height
    width: 20,
    height: 20,
    // parameters 1: name of the sprite, 2: solid , 3: tag

    // load in some sprites
    "=": [sprite("block"), solid()],
    $: [sprite("coin"), "coin"],
    "%": [sprite("surprise"), solid(), "coin-surprise"],
    "*": [sprite("surprise"), solid(), "mushroom-surprise"],
    "}": [sprite("unboxed"), solid()],
    "(": [sprite("pipe-bottom-left"), solid(), scale(0.5)],

    ")": [sprite("pipe-bottom-right"), solid(), scale(0.5)],

    "-": [sprite("pipe-top-left"), solid(), scale(0.5), "pipe"],

    "+": [sprite("pipe-top-right"), solid(), scale(0.5), "pipe"],

    "^": [sprite("evil-shroom"), solid(), body(), "dangerous"],

    //body() is used for gravity
    "#": [sprite("mushroom"), solid(), "mushroom", body()],

    "!": [sprite("blue-block"), solid(), scale(0.5)],
    "£": [sprite("blue-brick"), solid(), scale(0.5)],

    z: [sprite("blue-evil-shroom"), solid(), scale(0.5), body(), "dangerous"],
    "@": [sprite("blue-surprise"), solid(), scale(0.5), "coin-surprise"],
    x: [sprite("blue-steel"), solid(), scale(0.5)],
  };
  // now just create a  gamelevel(JS method) and pass the map and levelCfg
  const gameLevel = addLevel(maps[level], levelCfg);
  // add some text to display score and position on UI layer
  // default layer is 'obj '
  // so change layer to 'ui' for adding score
  //define this as a method so that it can be passed to other levels
  const scoreLabel = add([
    text(score),
    pos(30, 6),
    layer("ui"),
    {
      value: score,
    },
  ]);

  // add a text to define which level we currently are in
  // parameters for add are text, position
  add([text("level " + parseInt(level + 1)), pos(40, 6)]);

  function big() {
    let timer = 0;
    // let isBig = false;
    return {
      update() {
        if (isBig) {
          // change the jump force
          CURRENT_JUMP_FORCE = BIG_JUMP_FORCE;

          //delta time is a JS method ""time since last frame"
          timer -= dt();
          if (timer <= 0) {
            //if time <0 then we have to make mario small
            this.smallify();
          }
        }
      },
      isBig() {
        return isBig;
      },
      smallify() {
        this.scale = vec2(1, 1);

        CURRENT_JUMP_FORCE = JUMP_FORCE;
        timer = 0;
        isBig = false;
      },

      biggify(time) {
        this.scale = vec2(2);

        timer = time;
        isBig = true;
      },
    };
  }
  // create mario
  const player = add([
    sprite("mario"),
    solid(),
    pos(20, 0),
    body(),
    big(),
    origin("bot"),
  ]);

  //Now make the mushroom move
  // Whenever you grab anything with a tag of mushroom,
  action("mushroom", (m) => {
    // speed= 20
    m.move(20, 0);

    // but here the mushrrom wont fall'
    // So we need to add gravity
  });

  player.on("headbump", (obj) => {
    // we will check if he bumped an object and if the name of the object happens to be a coin surprise
    // return a coin
    if (obj.is("coin-surprise")) {
      // Now spawn the coin and place the coin just above the grid 1 pos above along Y axis
      gameLevel.spawn("$", obj.gridPos.sub(0, 1));
      // Now destroy the old one
      destroy(obj);
      // after destroying replace with an unboxed so that he cam jump onto it and collect the coin
      gameLevel.spawn("}", obj.gridPos.sub(0, 0));
    }

    if (obj.is("mushroom-surprise")) {
      // Now spawn the mushroom and place the mushroom just above the grid 1 pos above along Y axis
      gameLevel.spawn("#", obj.gridPos.sub(0, 1));
      // Now destroy the old one
      destroy(obj);
      // after destroying replace with an unboxed so that he cam jump onto it and collect the mushroom
      gameLevel.spawn("}", obj.gridPos.sub(0, 0));
    }
  });

  player.collides("mushroom", (m) => {
    // pick a mushroom and destroy the object
    destroy(m);
    //Now biggify for 6 seconds
    player.biggify(6);
  });

  player.collides("coin", (c) => {
    destroy(c);
    // increase the value of the score

    scoreLabel.value++;

    // then display the score
    scoreLabel.text = scoreLabel.value;
  });

  // Let us make evils move
  action("dangerous", (d) => {
    if (d.pos.x > player.pos.x) d.move(-ENEMY_SPEED * 3, 0);
    else d.move(ENEMY_SPEED * 3, 0);
  });
  // if player collides with anythig with dangerous
  // big mario becomes small
  // small mario dies

  player.collides("dangerous", (d) => {
    if (isJumping) {
      destroy(d);
    } else {
      // go to a lose scene and display the final score
      go("lose", { score: scoreLabel.value });
    }
  });

  player.action(() => {
    // Make camera Position same as player position

    camPos(player.pos);

    // So whenever the y coordinate of the player is greater than death value then go to lose scene
    if (player.pos.y >= FALL_DEATH) {
      go("lose", { score: scoreLabel.value });
    }
  });

  // keyDown is a method that takes inpiut from keyboard,
  // So  if we press left key , the arrow function will be executed

  keyDown("left", () => {
    // left we need to have minus direction
    player.move(-MOVE_SPEED, 0);
  });

  keyDown("right", () => {
    // right we need to have plus direction
    player.move(MOVE_SPEED, 0);
  });
  // So during any action if the player is grounded
  // then make isJumping to false
  player.action(() => {
    if (player.grounded()) {
      isJumping = false;
    }
  });
  // if the player collides with any tag name pipe and presses KeyDown (for that case anykey you wish)
  //then he has to go to Next Level
  // or create a house and then use the key desired
  player.collides("pipe", () => {
    keyPress("down", () => {
      go("game", { level: level + 1, score: scoreLabel.value });
    });
  });
  //keyPress is a JS method especially used here to make use of space key to jump
  keyPress("space", () => {
    if (player.grounded()) {
      // Make is Jumping to true when a space is pressed
      isJumping = true;
      // jump with current jump force big or small mario force
      player.jump(CURRENT_JUMP_FORCE);
    }
  });

  // timer functionality in game scene
  const timer = add([
    text("0"),
    pos(90, 70),
    scale(1),
    layer("ui"),
    { time: TIME_LEFT },
  ]);

  timer.action(() => {
    (timer.time -= dt()), (timer.text = timer.time.toFixed(2));
    if (timer.time <= 0) {
      go("lose", { score: scoreLabel.value });
    }
  });

  // Bullet functionality
  // positon of player as parameter
  function spawnBullet(p) {
    // define a rectangular area around the player position
    // give bullet as a tag
    add([rect(6, 1), pos(p), origin("center"), color(1.5, 0.5, 1), "bullet"]);
  }

  // Releasing bullet functionality
  keyPress("b", () => {
    //if (isBig)
    spawnBullet(player.pos.add(25, -10));
  });

  //move the bullets
  action("bullet", (b) => {
    //destroy(b);
    b.move(ENEMY_SPEED * 3, 0);
  });

  collides("dangerous", "bullet", (d, b) => {
    destroy(d);
    destroy(b);
  });
});

scene("lose", ({ score }) => {
  add([text(score, 32), origin("center"), pos(width() / 2, height() / 2)]);
});

//init();
start("game", { level: 0, score: 0 });
