
$(document).ready(function(){
var c = document.getElementById("c");
var ctx = c.getContext("2d");

//making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

//chinese characters - taken from the unicode charset
var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
//converting the string into an array of single characters
chinese = chinese.split("");

var font_size = 10;
var columns = c.width/font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for(var x = 0; x < columns; x++)
	drops[x] = c.height/font_size - 1; 

//drawing the characters
function draw()
{
	//Black BG for the canvas
	//translucent BG to show trail
	ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	ctx.fillRect(0, 0, c.width, c.height);
	
	ctx.fillStyle = "#00f"; //green text
	ctx.font = font_size + "px arial";
	//looping over drops
	for(var i = 0; i < drops.length; i++)
	{
		//a random chinese character to print
		var text = chinese[Math.floor(Math.random()*chinese.length)];
		//x = i*font_size, y = value of drops[i]*font_size
		ctx.fillText(text, i*font_size, drops[i]*font_size);
		
		//sending the drop back to the top randomly after it has crossed the screen
		//adding a randomness to the reset to make the drops scattered on the Y axis
		if(drops[i]*font_size < 0 && Math.random() > 0.975)
			drops[i] = c.height / font_size;
				
		//incrementing Y coordinate
		drops[i]--;
	}
}
var pos = $('#home_container').position();
var speed = 3;
var xdir = speed, ydir = -speed;
var buffer = 5;
function move_title(){
	pos = $('#home_container').position();

	if(pos.top <= buffer){
		ydir = speed;
	}
	if(pos.top + $('#home_container').height() >= c.height - buffer){
		ydir = -speed;
	}
	if(pos.left <= buffer){
		xdir = speed;
	}
	if(pos.left + $('#home_container').width() >= c.width - buffer){
		xdir = -speed;
	}

	$('#home_container').css({
		'top':pos.top + ydir,
		'left':pos.left + xdir
	})

}

function loop(){
	draw();
	move_title();
}
setInterval(loop, 33);

});