var Ship1 = new Image();
Ship1.src = 'ship1.png'
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var HEIGHT = 640;
var WIDTH = 480;
var keys = [];
window.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});
window.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
    Player.isShooting = false;
    //Player.LaserColor = "black";

});



var Player =
{
  x: this.x || 300,
  y: this.y || 300,
  isShooting: this.isShooting || false,
  LaserColor: this.LaserColor || "red",
  LaserPower: this.LaserPower || 1000,
  DrawPlayer: function()
	{
		ctx.drawImage(Ship1,Player.x,Player.y,30,30);
	},
  ShootLaser: function(color)
  {
    if (color == "red" && Player.LaserPower > 0 && Player.isShooting)
    {
      ctx.beginPath();
      ctx.moveTo(Player.x+15,Player.y);
      ctx.lineTo(Player.x+15,0);
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 3;
      ctx.stroke();

    }
     else if (color == "green" && Player.LaserPower > 0 && Player.isShooting)
    {
      ctx.beginPath();
      ctx.moveTo(Player.x+15,Player.y);
      ctx.lineTo(Player.x+15,0);
      ctx.strokeStyle = "green";
      ctx.lineWidth = 2;
      ctx.stroke();
    }else if (color == "violet" && Player.LaserPower > 0 && Player.isShooting)
   {
     ctx.beginPath();
     ctx.moveTo(Player.x+15,Player.y);
     ctx.lineTo(Player.x+15,0);
     ctx.strokeStyle = "violet";
     ctx.lineWidth = 10;
     ctx.stroke();
   }
    else
    {
      //console.log("no color is selected or key is up");
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
		Player.x += 3;
	}
	if(keys[37]){
		Player.x -= 3;
	}
	if(keys[38]){
		Player.y -= 3;
	}
	if(keys[40]){
		Player.y += 3;
	}
  if(keys[65]){

    if (Player.LaserPower > 0)
    {
      Player.LaserColor = "red";
      Player.LaserPower -= 6;
      document.getElementById('power').innerHTML = Player.LaserPower;
      Player.isShooting = true;
    }

	}
  if(keys[83]){

    if (Player.LaserPower > 0)
    {
      Player.LaserColor = "green";
      Player.LaserPower -= 3;
      document.getElementById('power').innerHTML = Player.LaserPower;
      Player.isShooting = true;
    }
	}
  if(keys[68]){

    if (Player.LaserPower > 0)
    {
      Player.LaserColor = "violet";
      Player.LaserPower -= 9;
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

  Player.ShootLaser(Player.LaserColor);
  //Player.LaserColor = null;


  //console.log(Player.LaserPower);
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
