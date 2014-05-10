var map = new Map("terrain");

var player = new Character("hero.png", 7, 14, DIRECTION.UP);
map.addCharacter(player);

window.onload = function(){
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	//Setter størrelsen til canvas lik bredden og høyden til kartet
	//Dette er problematisk hvis kartet er større en skjermen, dog.
	canvas.width = map.getWidth() * 32;
	canvas.height = map.getHeight() * 32;

	setInterval(function(){
		map.drawMap(ctx);
	}, 40);

	window.onkeydown = function(event){
		var e = event || window.event;
		var key = e.which || e.keyCode;

		switch(key){
			case 38 : case 119: //arrow up, w
				player.move(DIRECTION.UP, map);
				break;
			case 40: case 115: //arrow down, s
				player.move(DIRECTION.DOWN, map);
				break;
			case 37: case 97:
				player.move(DIRECTION.LEFT, map);
				break;
			case 39: case 100:
				player.move(DIRECTION.RIGHT, map);
				break;
			default:
				//if the key is not in use, then no reason to block it's normal behaviour
				return true;
		}
		return false;
	};

};