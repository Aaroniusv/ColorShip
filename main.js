var Ship1 = new Image();
Ship1.src = 'Ship1.png'
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var HEIGHT = 640;
var WIDTH = 480;
var keys = [];
var keysup = [];
var post = document.getElementById('StartButton');
var intro = document.getElementById('instructions');
var powerMeter = document.getElementById('meter');
window.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});
window.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
    keysup[e.keyCode] = true;
});
var Enemy =
{
  x: this.x || Math.random() * WIDTH,
  y: this.y || Math.random() * HEIGHT / 3 ,
  radius: 20,
  hp: this.hp || 100,
  isHit: this.isHit || false,
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
  checkHP: function(color)
  {

    hp = this.hp;
    console.log(hp);
    if (this.hp > 0)
    {
      if (this.isHit && color == "red")
      {

          this.hp -= Player.Rvibe / 25;
      }
      if (this.isHit && color == "green")
      {
          this.hp -= 2;
      }
      if (this.isHit && color == "violet")
      {
          this.hp -= Player.Vvibe / 11;
      }
      if (Enemy.isHit && color == "superG")
      {
          this.hp -= Player.Gvibe / 5;
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
  Rradius: this.Rradius || 10,
  Gradius: this.Gradius || 10,
  Vradius: this.Vradius || 10,
  LaserPower: this.LaserPower || 1000,
  LaserColor: this.LaserColor,
  ScoredHit: this.ScoredHit || false,
  speed: this.speed || 3,
  Rvibe: this.Rvibe ,
  Gvibe: this.Gvibe ,
  Vvibe: this.Vvibe ,

  vibe2: this.vibe2 || 20,
  laserTime: this.laserTime || 0,
  superGBuild: this.superGBuild || 0,
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
  Collider: function()
  {

     if (Enemy.x - Player.x <= 40 && Player.x - Enemy.x <=2 )
     {
       console.log("hit");
       return true;
     }
     else
     {
       console.log("miss");

       return false;
     }
  },
  ShootLaser: function( color )
  {
    if (color == "red" )
    {
      if ( !this.Collider() )
      {
        console.log("miss");
        ctx.beginPath();
        ctx.moveTo(this.x+15,this.y);
        ctx.lineTo(this.x+15,0);
        ctx.lineWidth = 4 * this.Rradius / 10;
        ctx.strokeStyle="rgb(" + this.Rvibe + ",0,0)";
        ctx.stroke();
        Enemy.isHit = false;

      }
      if (this.Collider())
      {
        console.log("hit");

          ctx.beginPath();
          ctx.moveTo(this.x+15,this.y);
          ctx.lineTo(this.x+15,Enemy.y);
          ctx.lineWidth = 4 * this.Rradius / 10;
          ctx.strokeStyle="rgb(" + this.Rvibe + ",0,0)";
          ctx.stroke();
          Enemy.isHit = true;
          Enemy.checkHP("red");
      }
    }
    if (color == "green" )
    {
      if (!this.Collider())
      {
      ctx.beginPath();
      ctx.moveTo(this.x+15,this.y);
      ctx.lineTo(this.x+15,0);
      ctx.lineWidth = 2 * this.Gradius / 10;
      ctx.strokeStyle="rgb(0," + this.Gvibe + ",0)";
      ctx.stroke();
      Enemy.isHit = false;

      }
      else if (this.Collider())
      {
        ctx.beginPath();
        ctx.moveTo(this.x+15,this.y);
        ctx.lineTo(this.x+15,Enemy.y);
        ctx.lineWidth = 2 * this.Gradius / 10;
        ctx.strokeStyle="rgb(0," + this.Gvibe + ",0)";

        ctx.stroke();
        this.LaserPower += 1;
        this.SuperGBuild += .2;
        Enemy.isHit = true;

        Enemy.checkHP("green");
      }
    }
   if (color == "violet" )
   {
     if (!this.Collider())
     {
       ctx.beginPath();
       ctx.moveTo(this.x+15,this.y);
       ctx.lineTo(this.x+15,0);
       ctx.lineWidth = 10 * this.Vradius / 10;
       ctx.strokeStyle="rgb(" + this.Vvibe + ",30," + this.Vvibe + ")";
       ctx.stroke();
       Enemy.isHit = false;

     }
     else if(this.Collider())
     {
       ctx.beginPath();
       ctx.moveTo(this.x+15,this.y);
       ctx.lineTo(this.x+15,Enemy.y);
       ctx.lineWidth = 10 * this.Vradius / 6;
       ctx.strokeStyle='rgb(0,250,0)';

       ctx.strokeStyle="rgb(" + this.Vvibe + ",30," + this.Vvibe + ")";
       ctx.stroke();
       Enemy.isHit = true;

       Enemy.checkHP("violet");
     }
   }
   if (color == "superG" )
    {
      if (!this.Collider())
      {
        ctx.beginPath();
        ctx.moveTo(this.x+15,this.y);
        ctx.lineTo(this.x+15,0);
        ctx.lineWidth = 20 * this.Vradius / 10;
        ctx.strokeStyle="rgb(0," + this.Gvibe + ",20)";
        ctx.stroke();
        Enemy.checkHP();
        Enemy.isHit = false;

      }
      else if(this.Collider())
      {
        ctx.beginPath();
        ctx.moveTo(this.x+15,this.y);
        ctx.lineTo(this.x+15,Enemy.y);
        ctx.lineWidth = 20 * this.Vradius / 10;
        ctx.strokeStyle="rgb(0," + this.vibe + ",20)";
        ctx.stroke();
        Enemy.isHit = true;

        Enemy.checkHP();
      }
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
	if(keys[39])
  {
		Player.x += Player.speed;
	}
	if(keys[37])
  {
		Player.x -= Player.speed;
	}
	if(keys[38])
  {
		Player.y -= Player.speed;
	}
	if(keys[40])
  {
		Player.y += Player.speed;
	}

  if(keys[65] && Player.LaserPower > 2)
  {
      document.getElementById('power').innerHTML = Player.LaserPower;
      Player.Rvibe += 3;
      if (Player.Rradius < 40)
      {
        Player.Rradius += .1
      }

      Player.LaserPower -= 2;
      Player.ShootLaser("red");
	}
  else if(!keys[65] )
  {
    Player.Rvibe = 100;
    Player.Rradius = 10;
  }
  if(keys[83] )
    {
        document.getElementById('power').innerHTML = Player.LaserPower;
        Player.Gvibe += 3;
        if (Player.Gradius < 25)
        {
          Player.Gradius += .1
        }
        Player.ShootLaser("green");
    }
	else if(!keys[83] )
  {
    Player.Gvibe = 100;
    Player.Gradius = 10;
  }
  if(keys[68] && Player.LaserPower > 5)
  {
      Player.Vvibe += 3;
      if (Player.Vradius < 45)
      {
        Player.Vradius += .1
      }
      Player.ShootLaser("violet");
      Player.LaserPower -= 5;
      document.getElementById('power').innerHTML = Player.LaserPower;
	} else if(!keys[68] )
  {
    Player.Vvibe = 100;
    Player.Vradius = 10;
  }
}

render = function()
{
  Player.isAlive();
	ctx.clearRect(0,0,WIDTH,HEIGHT);

  canvasHelper.drawMap();
  Player.DrawPlayer();
  Enemy.y += Enemy.speed;
  Enemy.DrawCircle();
  update(null);


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
  Player.SuperGBuild = 0;
  Player.isAlive();
  intro.style.display = 'none'; // to hide
  powerMeter.style.display = 'block';
  main();
}
