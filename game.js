kontra.init(); // kontra initialiation

var scoreboard = document.getElementById("scoreboard");
scoreboard.innerHTML = 0 // scoreboard initialization

let sprites = []; // arrays for the red marks and sprites
let marks = [];

// Loading images/sprites
var player_image = new Image();
player_image.src = 'img/player.png';
var bullet_image = new Image();
bullet_image.src = 'img/bullet.png';

// function which will create enemy and instansiate it
function createEnemy(x, y, radius,x_speed,y_speed) {
let enemy = kontra.Sprite({
type: 'enemy',
x: x,
y: y,
dx: x_speed,
dy: y_speed,
radius: radius,
render() {
  this.context.fillStyle = 'black';
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
  this.context.fill();
}
});
sprites.push(enemy);
}
var score = -1;

kontra.initKeys(); // keys initialization

// a handy function to convert degres to radians
function deg2Rad(degrees) {
  return degrees * Math.PI / 180;
}

// function to create and instantiate the player spreite
let player = kontra.Sprite({
  type: 'player',
  x: 460,
  y: 280,
  width: 4,
  dt: 0,
  render() {
    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.rotate(deg2Rad(this.rotation));
    this.context.drawImage(player_image,-14,-25);
    this.context.restore();
  },
  update() {

  	// key press evets
    if (kontra.keyPressed('left')) {
      this.rotation += -4
    }
    else if (kontra.keyPressed('right')) {
      this.rotation += 4
    }
    const cos = Math.cos(deg2Rad(this.rotation));
    const sin = Math.sin(deg2Rad(this.rotation));
    this.dt += 1/60;
    if (kontra.keyPressed('space') && this.dt > 0.25) {
      sht.play();
      this.dt = 0;

      // bullet generation and instantiation
      let bullet = kontra.Sprite({
        type: 'bullet',
        x: this.x + cos * 12,
        y: this.y + sin * 12,
        dx: this.dx + cos * 5,
        dy: this.dy + sin * 5,
        ttl: 60,
        width: 12,
        height: 12,
        image: bullet_image,
      });
      sprites.push(bullet);
    }
  }
});

// The main light sprite geneation
let light = kontra.Sprite({
  type: 'light',
  x: 460,
  y: 280,
  width: 6,
  dt: 0,
  color: 'rgba(225,225,225,0.2)',
  render() {
    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.rotate(deg2Rad(this.rotation));
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.moveTo(0,0);
    this.context.lineTo(4000,-5000);
    this.context.lineTo(6000, 8000);
    this.context.closePath();
    this.context.fill();
    this.context.restore();
  },
  update() {

  	// lights key press events
    if (kontra.keyPressed('left')) {
      this.rotation += -4
    }
    else if (kontra.keyPressed('right')) {
      this.rotation += 4
    }
  }
});

// rendering sprites
sprites.push(player);

// The game loop
let loop = kontra.GameLoop({

	// the update function
  update() {
    let canvas = kontra.getCanvas();
    sprites.map(sprite => {
      sprite.update();
    });
    light.update();
    for (let i = 0; i < sprites.length; i++) {
      if (sprites[i].type === 'enemy') {
        for (let j = 0; j < sprites.length; j++) {
        	// Collision detection
          if (sprites[j].type !== 'enemy') {
            let enemy = sprites[i];
            let sprite = sprites[j];
            let dx = enemy.x - sprite.x;
            let dy = enemy.y - sprite.y;
            if (Math.sqrt(dx * dx + dy * dy) < enemy.radius + sprite.width) {
              enemy.ttl = 0;
              des.play();
              score += 1
              scoreboard.innerHTML = score;
              sprite.ttl = 0;
              sprites.forEach((sprite) => {if(sprite.type === 'player' && !sprite.isAlive()){
                over(score)
              }});
              break;
            }
          }
        }
      }
    }
    sprites = sprites.filter(sprite => sprite.isAlive());
  },

  // the render function
  render() {
    win(score)
    light.render();

    // map is used to render all of them at once
    sprites.map(sprite => sprite.render());

    // creating marks according to the score and also instantiating the red mark
    marks.map(m => m.render());
      if (score == -1) {
    window.setInterval(function(){
    createEnemy(950,290,40,-4,0)
  },3000)
      let mark = kontra.Sprite({
      x: 950,
      y: 270,
      width: 5,
      height: 30,
      color: 'red',
    });
    marks.push(mark);
    score += 1
  }
    if (score == 10) { // When score was 10
    window.setInterval(function(){
    createEnemy(465,5,30,0,2)
  },4000)
      let mark1 = kontra.Sprite({
      x: 465,
      y: 5,
      width: 30,
      height: 5,
      color: 'red',
    });
    marks.push(mark1);
    score += 1
  }
    if (score == 20) { // When score was 20
    window.setInterval(function(){
    createEnemy(465,595,25,0,-2)
  },5000)
      let mark2 = kontra.Sprite({
      x: 465,
      y: 595,
      width: 30,
      height: 5,
      color: 'red',
    });
    marks.push(mark2);
    score += 1
  }
  if (score == 40) { // When score was 30
    window.setInterval(function(){
    createEnemy(5,290,25,4,0)
  },6000)
      let mark3 = kontra.Sprite({
      x: 5,
      y: 290,
      width: 30,
      height: 5,
      color: 'red',
    });
    marks.push(mark3);
    score += 1
  }
}
});

// removing the dead sprites
marks = marks.filter(s => s.isAlive());


// The start function to start the game loop
function startt() {
  loop.start();
  document.getElementById("startt").style.display = "none"
}

// Function to tell the user that he/she has won the game
function win(score){
  if (score >= 60) {
    loop.stop();
    scoreboard.style.display = "none"
    document.getElementById("won").style.display = "inline-block"
  }
}

// Function to tell the user that he/she has lost the game
function over(score){
  loop.stop();
  scoreboard.style.display = "none"
  document.getElementById("go-main").style.display = "inline-block"
  document.getElementById("game_over").innerHTML = score-1
}


//audio
var bgm = document.getElementById("myAudio");
var des = document.getElementById("des");
var sht = document.getElementById("shoot");
