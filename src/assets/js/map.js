(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("map",
{ "compressionlevel":-1,
 "height":10,
 "infinite":false,
 "layers":[
        {
         "data":[81, 82, 82, 82, 82, 82, 1, 44, 44, 43, 81, 82, 82, 82, 82, 82, 21, 44, 44, 43, 81, 82, 82, 69, 107, 107, 107, 70, 83, 43, 81, 82, 82, 88, 152, 152, 152, 86, 83, 43, 81, 82, 82, 88, 152, 152, 152, 86, 83, 43, 81, 82, 82, 88, 152, 152, 152, 86, 83, 43, 81, 82, 82, 89, 67, 67, 67, 90, 83, 43, 81, 82, 82, 82, 82, 82, 82, 82, 83, 43, 81, 82, 82, 82, 82, 82, 82, 82, 83, 43, 101, 102, 102, 102, 102, 102, 102, 102, 103, 43],
         "height":10,
         "id":1,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }],
 "nextlayerid":2,
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.4.3",
 "tileheight":32,
 "tilesets":[
        {
         "firstgid":1,
         "source":"..\/tiles\/tile.tsx"
        }],
 "tilewidth":32,
 "type":"map",
 "version":1.4,
 "width":10
});