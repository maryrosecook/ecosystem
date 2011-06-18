function Coordinate() {}
Coordinate.create = function(x, y, dynamic) {
  var coordinate = new Coordinate();
  coordinate.x = x;
  coordinate.y = y;

  // a bit mental
  if(dynamic === true)
    coordinate.id = function() {
      return coordinate.generateId();
    };
  else
  {
    coordinate._id = coordinate.generateId();
    coordinate.id = function() {
      return coordinate._id;
    };
  }

  return coordinate;
}
Coordinate.prototype = {
  generateId: function() {
    return this.x + "," + this.y
  },

  neighbours: function(maxCoordinates) {
    var neighbours = [];

    if(this.x > 0)
      neighbours.push(Coordinate.create(this.x - 1, this.y));
    if(this.y > 0)
      neighbours.push(Coordinate.create(this.x, this.y - 1));
    if(this.x < maxCoordinates.x)
      neighbours.push(Coordinate.create(this.x + 1, this.y));
    if(this.y < maxCoordinates.y)
      neighbours.push(Coordinate.create(this.x, this.y + 1));
    if(this.x > 0 && this.y > 0)
      neighbours.push(Coordinate.create(this.x - 1, this.y - 1));
    if(this.x < maxCoordinates.x && this.y < maxCoordinates.y)
      neighbours.push(Coordinate.create(this.x + 1, this.y + 1));
    if(this.x > 0 && this.y < maxCoordinates.y)
      neighbours.push(Coordinate.create(this.x - 1, this.y + 1));
    if(this.x < maxCoordinates.x && this.y > 0)
      neighbours.push(Coordinate.create(this.x + 1, this.y - 1));

    return neighbours;
  },
}