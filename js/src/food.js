function Food() {}

Food.create = function(ecosystem, hubCoordinate, maxTravel) {
  var food = new Food();
  food.ecosystem = ecosystem;
  food.owner = null;

  food.groundColor = "#0a0";
  food.cargoColor = "#0f0";

  food.pos = food.ecosystem.geometry.getRandomNewDestination(hubCoordinate, maxTravel);

  return food;
}

Food.prototype = {
  tick: function() {
    this.draw();
  },

  pickUp: function() {
    this.pos = null; // it doesn't exist anywhere until something new happens
  },

  draw: function() {
    if(this.owner == null)
    {
      this.ecosystem.ctx.fillStyle = this.groundColor;
      this.ecosystem.ctx.fillRect(this.pos.x, this.pos.y, 2, 2);
    }
  },
}