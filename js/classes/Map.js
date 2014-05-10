function Map(name)
{
	var xhr = getXMLHttpRequest();

	xhr.open("GET", './maps/' + name + '.json', false);
	xhr.send(null);

	if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) //Code 0 for local
		throw new Error("Not able to load the map called \"" + name + "\" (HTTP code: " + xhr.status + ").");
	var mapJsonData = xhr.responseText;

	var mapData = JSON.parse(mapJsonData);

	this.tileset = new Tileset(mapData.tileset); //png bildet
	this.terrain = mapData.terrain;
	this.characters = new Array();
}

Map.prototype.getHeight = function() 
{
	return this.terrain.length;
};

Map.prototype.getWidth = function()
{
	return this.terrain[0].length;
};

Map.prototype.drawMap = function(context)
{
	for(var i = 0, l = this.terrain.length; i < l; i++){
		var line = this.terrain[i];
		var y = i * 32;
		for(var j = 0, k = line.length; j < k; j++){
			this.tileset.drawTile(line[j], context, j * 32, y);
		}
	}

	for(var i = 0, l = this.characters.length; i < l; i++){
		this.characters[i].drawCharacter(context);
	}
};

Map.prototype.addCharacter = function(person)
{
	this.characters.push(person);
};