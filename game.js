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

loadSprite("evil-shroom", "KP03fR9.png");
//bricks
loadSprite("brick", "pogC9x5.png");
//blocks
loadSprite("block", "bdrLpi6.png");

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
  // load in some sprites
});

start("game");
