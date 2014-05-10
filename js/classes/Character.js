var DIRECTION = {
	"DOWN" : 0,
	"LEFT" : 1,
	"RIGHT" : 2,
	"UP" : 3
};

var ANIMATION_DURATION = 4;
var MOVEMENT_DURATION = 15;

function Character(url, x, y, direction)
{
	this.x = x;
	this.y = y;
	this.direction = direction;
	this.animationState = -1; //negtive is immobile, while positive is character in movement

	//Loading image into the image attribute
	this.image = new Image();
	this.image.referenceToSprite = this;
	this.image.onload = function(){
		if(!this.complete)
			throw "Error loading sprite \"" + url + "\".";
		this.referenceToSprite.width = this.width / 4;
		this.referenceToSprite.height = this.height / 4;
	}
	this.image.src = "sprites/" + url;
}

Character.prototype.drawCharacter = function(context)
{
	var frame = 0;
	var changeX = 0, changeY = 0;

	if(this.animationState >= MOVEMENT_DURATION){
		//If the movement has taken more time than what's allotted, then terminate it
		this.animationState = -1;
	}
	else if(this.animationState >= 0){
		frame = Math.floor(this.animationState / ANIMATION_DURATION);
		if(frame > 3){
			frame %= 4;
		}
		var pixelsToMove = 32 - (32 * (this.animationState / MOVEMENT_DURATION));

		//based on this number, define change for x and y
		if(this.direction == DIRECTION.UP) changeY = pixelsToMove;
		else if(this.direction == DIRECTION.DOWN) changeY = -pixelsToMove;
		else if(this.direction == DIRECTION.LEFT) changeX = pixelsToMove;
		else if(this.direction == DIRECTION.RIGHT) changeX = -pixelsToMove;

		this.animationState++;
	}

	context.drawImage(
		this.image,
		frame * this.width, this.direction * this.height, //Point of origin in the rectangle src from where we get the image
		this.width, this.height, //Size of the character
		(this.x * 32) - (this.width / 2) + 16 + changeX, //Destination (depends on size of character)
		(this.y * 32) - this.height + 24 + changeY, // ----"---
		this.width, this.height //size of destination rectangle (same as size of character)
	);
};

Character.prototype.getAdjacentCoordinates = function(direction){
	var coord = {'x' : this.x, 'y' : this.y};
	switch(direction){
		case DIRECTION.DOWN:
			coord.y++;
			break;
		case DIRECTION.LEFT:
			coord.x--;
			break;
		case DIRECTION.RIGHT:
			coord.x++;
			break;
		case DIRECTION.UP:
			coord.y--;
			break;
	}
	return coord;
};

Character.prototype.move = function(direction, map){
	//can't move if movement is already happening
	if(this.animationState >= 0){
		return false;
	}
	//changing the character's direction
	this.direction = direction;

	var nextMove = this.getAdjacentCoordinates(direction);
	if(nextMove.x < 0 || nextMove.y < 0 ||
		nextMove.x >= map.getWidth() || nextMove.y >= map.getHeight()){
		return false;	
	}

	this.animationState = 1;
	this.x = nextMove.x;
	this.y = nextMove.y;
	return true;
}