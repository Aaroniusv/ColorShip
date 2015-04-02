var Ship1 = new Image();
Ship1.src = 'Ship1.png'
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var HEIGHT = 640;
var WIDTH = 480;
var keys = [];
var post = document.getElementById('StartButton');
var intro = document.getElementById('instructions');
var powerMeter = document.getElementById('meter');

window.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});
window.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
    Player.isShooting = false;
    Player.vibe = 100;
});
var Enemy =
{
  x: this.x || Math.random() * WIDTH,
  y: this.y || Math.random() * HEIGHT / 3 ,
  radius: 20,
  hp: this.hp || 100,
  speed: this.speed || 2,
  isAlive: this.isAlive || true,
  DrawCircle: function()
  {
    if (this.isAlive)
    {
      var color = Math.floor(Math.random() * 3) + 1
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      if (color = 1)
      {
        ctx.fillStyle = 'green';
      }if (color = 2)
      {
        ctx.fillStyle = 'red';
      }if (color = 3)
      {
        ctx.fillStyle = 'purple';
      }
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#003300';
      ctx.stroke();
    }
    if (!this.isAlive)
    {
      this.x = Math.random() * WIDTH;
      this.y =  Math.random() * HEIGHT / 3;
      this.isAlive = true;
      this.speed += .05;
      Player.speed += .1
      this.hp = 100;
    }
},
  checkHP: function(hp)
  {
    hp = this.hp;
    ifHit = Player.Collider();
    color = Player.LaserColor;
    if (this.hp > 0)
    {
      if (ifHit && color == "red")
      {
          this.hp -= 4;
      }
      if (ifHit && color == "green")
      {
          this.hp -= 1;
      }
      if (ifHit && color == "violet")
      {
          this.hp -= 15;
      }
    } else if (this.hp <= 0)
    {
      Enemy.isAlive = false;
    }
  },
};

var Player =
{
  x: this.x || 300,
  y: this.y || 300,
  radius: this.radius || 10,
  isShooting: this.isShooting || false,
  LaserColor: this.LaserColor || "red",
  LaserPower: this.LaserPower || 1000,
  ScoredHit: this.ScoredHit || false,
  speed: this.speed || 3,
  vibe: this.vibe || 100,
  isAlive: function()
  {
    if (Enemy.y > 600)
    {
      ctx.font="60px Verdana";
      // Create gradient
      var gradient=ctx.createLinearGradient(0,0,WIDTH,0);
      gradient.addColorStop("0","magenta");
      gradient.addColorStop("0.5","blue");
      gradient.addColorStop("1.0","red");
      // Fill with gradient
      ctx.fillStyle=gradient;
      ctx.fillText("Game Over!",10,90);
      for (var i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.arc(this.x+15, this.y+15, this.radius += .3, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
      }
        post.style.display = 'block'; // to show

    } else
    {
      post.style.display = 'none'; // to hide
    }
  },
  DrawPlayer: function()
	{
      ctx.drawImage(Ship1,Player.x,Player.y,30,30);
	},
  Collider: function(laser,enemy)
  {
     if (Enemy.x - Player.x <= 40 && Player.x - Enemy.x <=2 )
     {
       return true;
     }
     else
     {
       return false;
     }
  },

  ShootLaser: function(color)
  {
    if (color == "red" && Player.LaserPower > 0 && Player.isShooting)
    {
      ctx.strokeStyle="rgb(" + Player.vibe + ",0,0)";

      if ( !Player.Collider() )
      {
        ctx.beginPath();
        ctx.moveTo(Player.x+15,Player.y);
        ctx.lineTo(Player.x+15,0);
        ctx.lineWidth = 4;
        ctx.stroke();
      }
      else if (Player.Collider())
      {
          ctx.beginPath();
          ctx.moveTo(Player.x+15,Player.y);
          ctx.lineTo(Player.x+15,Enemy.y);
          ctx.lineWidth = 4;
          ctx.stroke();
          Enemy.checkHP();
      }
    }
     else if (color == "green" && Player.LaserPower > 0 && Player.isShooting)
    {
      ctx.strokeStyle="rgb(0," + Player.vibe + ",0)";

      if (!Player.Collider())
      {
      ctx.beginPath();
      ctx.moveTo(Player.x+15,Player.y);
      ctx.lineTo(Player.x+15,0);
      ctx.lineWidth = 2;
      ctx.stroke();
      }
      else if (Player.Collider())
      {
        ctx.beginPath();
        ctx.moveTo(Player.x+15,Player.y);
        ctx.lineTo(Player.x+15,Enemy.y);
        ctx.lineWidth = 2;
        ctx.stroke();
        Enemy.checkHP();
      }
    }else if (color == "violet" && Player.LaserPower > 0 && Player.isShooting)
   {
     ctx.strokeStyle="rgb(" + Player.vibe + ",0," + Player.vibe + ")";

     if (!Player.Collider())
     {
       ctx.beginPath();
       ctx.moveTo(Player.x+15,Player.y);
       ctx.lineTo(Player.x+15,0);
       ctx.lineWidth = 10;
       ctx.stroke();
     }
     else if(Player.Collider())
     {
       ctx.beginPath();
       ctx.moveTo(Player.x+15,Player.y);
       ctx.lineTo(Player.x+15,Enemy.y);
       ctx.lineWidth = 10;
       ctx.stroke();
       Enemy.checkHP();
     }
   }
    else
    {
    }
  },

};
var canvasHelper =
{
	drawMap: function()
	{
		ctx.fillStyle= "black";
		ctx.fillRect(0,0,WIDTH,HEIGHT);
	}
};
function update(mod)
{
	if(keys[39]){
		Player.x += Player.speed;
	}
	if(keys[37]){
		Player.x -= Player.speed;
	}
	if(keys[38]){
		Player.y -= Player.speed;
	}
	if(keys[40]){
		Player.y += Player.speed;
	}
  if(keys[65]){

    if (Player.LaserPower > 0)
    {
      Player.LaserColor = "red";
      Player.vibe += 3;
      Player.LaserPower -= 2;
      document.getElementById('power').innerHTML = Player.LaserPower;
      Player.isShooting = true;
    }

	}
  if(keys[83]){

    if (Player.LaserPower > 0)
    {

      Player.LaserColor = "green";
      Player.vibe += 3;
      //Player.LaserPower -= 1;
      document.getElementById('power').innerHTML = Player.LaserPower;
      Player.isShooting = true;
    }
	}
  if(keys[68]){

    if (Player.LaserPower > 0)
    {
      Player.LaserColor = "violet";
      Player.LaserPower -= 5;
      Player.vibe += 3;
      document.getElementById('power').innerHTML = Player.LaserPower;
      Player.isShooting = true;
    }
	}
}
render = function()
{
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	update(null);
  canvasHelper.drawMap();
  Player.DrawPlayer();
  Enemy.y += Enemy.speed;
  Enemy.DrawCircle();
  Player.ShootLaser(Player.LaserColor);
  Player.isAlive();
  requestAnimationFrame(render);
}

function main()
{

  render();
  setInterval(function () {
    if (Player.LaserPower < 1000)
    {
      Player.LaserPower ++;
    }
    document.getElementById('power').innerHTML = Player.LaserPower;
  }, 10);
}
function init()
{
  Enemy.y = 100;
  Enemy.speed = .2;
  Player.isAlive();
  intro.style.display = 'none'; // to hide
  powerMeter.style.display = 'block';

  main();


}
