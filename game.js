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

scene("game", () => {
  //create layers
  //An array
  // background layer, object layer as default, UI layer
  // initialise with obj as default
  layers(["bg", "obj", "ui"], "obj");
  // draw maps
  const map = [
    "                                                       ",
    "                                                       ",
    "                                                       ",
    "                                                       ",
    "                                                       ",
    "                                                       ",
    "     %    =*=%=                                                  ",
    "                           -+                            ",
    "                 ^   ^     ()                                      ",
    "===============================   ==================== ",
  ];

  //level configuration
  const levelCfg = {
    //every sprite has a wdith and height
    width: 20,
    height: 20,
    "=": [sprite("block"), solid()],
    $: [sprite("coin")],
    "%": [sprite("surprise"), solid(), "coin-surprise"],
    "*": [sprite("surprise"), solid(), "mushroom-surprise"],
    "}": [sprite("unboxed"), solid()],
    "(": [sprite("pipe-bottom-left"), solid(), scale(0.5)],

    ")": [sprite("pipe-bottom-right"), solid(), scale(0.5)],

    "-": [sprite("pipe-top-left"), solid(), scale(0.5)],

    "+": [sprite("pipe-top-right"), solid(), scale(0.5)],

    "^": [sprite("evil-shroom"), solid()],

    "#": [sprite("mushroom"), solid()],
  };
  // now just create a  gamelevel(JS method) and pass the map and levelCfg
  const gameLevel = addLevel(map, levelCfg);
  // add some text to display score and position on UI layer
  // default layer is 'obj '
  // so change layer to 'ui' for adding score
  //define this as a method so that it can be passed to other levels
  const scoreLabel = add([
    text("test"),
    pos(30, 6),
    layer("ui"),
    {
      value: "test",
    },
  ]);

  // add a text to define which level we currently are in
  add([text("level " + "test", pos(4, 6))]);
  // create mario
  const player = add([
    sprite("mario"),
    solid(),
    pos(20, 0),
    body(),
    origin("bot"),
  ]);
  // keyDown is a method that takes inpiut from keyboard,
  // So  if we press left key , the arrow function will be executed
  const MOVE_SPEED = 120;

  keyDown("left", () => {
    // left we need to have minus
    player.move(-MOVE_SPEED, 0);
  });

  // load in some sprites
});

start("game");
