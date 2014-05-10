function Tileset(pathname)
{
	this.image = new Image();
	this.image.referenceToTileset = this;

	this.image.onload = function(){
		if(!this.complete)
			throw new Error("Error loading the tileset named \"" + pathname + "\".");

		this.referenceToTileset.dimension = this.width / 32;
	}
	this.image.src = "tilesets/" + pathname;
}

Tileset.prototype.drawTile = function(number, context, xPos, yPos) 
{
	var xPosInTileset = number % this.dimension;
	if(xPosInTileset == 0)
		xPosInTileset = this.dimension;

	var yPosInTileset = Math.ceil(number / this.dimension);

	var xSource = (xPosInTileset - 1) * 32;
	var ySource = (yPosInTileset - 1) * 32;

	context.drawImage(this.image, xSource, ySource, 32, 32, xPos, yPos, 32, 32);
};