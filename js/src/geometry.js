function Geometry() {}

Geometry.create = function(ecosystem) {
  var geometry = new Geometry();
  geometry.ecosystem = ecosystem;
  return geometry;
}

Geometry.prototype = {
  getRandomCoordinate: function(dynamic) {
    return Coordinate.create(Math.floor(this.ecosystem.max.x * Math.random()),
                             Math.floor(this.ecosystem.max.y * Math.random()),
                             dynamic);
  },

  getRandomNewDestination: function(pos, maxTravel) {
    return Coordinate.create(pos.x + this.randomOrdinate(pos.x,
                                                         this.ecosystem.min.x,
                                                         this.ecosystem.max.x,
                                                         maxTravel),
                             pos.y + this.randomOrdinate(pos.y,
                                                         this.ecosystem.min.y,
                                                         this.ecosystem.max.y,
                                                         maxTravel));
  },

  randomOrdinate: function(current, min, max, maxTravel) {
    var randomMaxTravel = Math.floor(maxTravel * Math.random());
    if(Math.random() < 0.5)
      return -this.randTravel(randomMaxTravel, current, min);
    else
      return this.randTravel(randomMaxTravel, current, max);
  },

  // returns theoreticalMaxTravel, or boundary if closer
  randTravel: function(randomMaxTravel, position, boundary) {
    var max = Math.min(randomMaxTravel, Math.abs(position - boundary));
    return Math.floor(Math.random() * max);
  },

  coordinateAwayFromNest: function(currentCoordinate) {
    var c = Coordinate.create(this.ordinateAwayFromNest(currentCoordinate.x,
                                                        this.ecosystem.nest.pos.x),
                              this.ordinateAwayFromNest(currentCoordinate.y,
                                                        this.ecosystem.nest.pos.y));
    return c;
  },

  ordinateAwayFromNest: function(objectOrdinate, nestOrdinate) {
    if(nestOrdinate < objectOrdinate)
      return objectOrdinate + 1;
    else if(nestOrdinate > objectOrdinate)
      return objectOrdinate - 1;
    else
      return objectOrdinate;
  },
}
