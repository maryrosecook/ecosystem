function Food() {}

Food.create = function(ecosystem) {
  var food = new Food();
  food.ecosystem = ecosystem;
  food.owner = null;

  food.groundColor = "#0a0";
  food.cargoColor = "#0f0";

  food.pos = Coordinate.create(Math.floor(food.ecosystem.max.x * Math.random()),
                               Math.floor(food.ecosystem.max.y * Math.random()));

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