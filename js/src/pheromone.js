function Pheromone() {}

Pheromone.create = function(ecosystem, pos) {
  var pheromone = new Pheromone();
  pheromone.ecosystem = ecosystem;
  pheromone.pos = pos;

  pheromone.step = 10;
  pheromone.maxStrength = 95;

  pheromone.strength = pheromone.step;
  pheromone.updateColor(); // more efficient to do this now instead of in draw()
  return pheromone;
}

Pheromone.prototype = {
  strengthen: function() {
    if(this.strength < this.maxStrength - this.step)
    {
      this.strength += this.step;
      this.updateColor(); // more efficient to do this now instead of in draw()
    }
  },

  tick: function() {
    this.draw();
  },

  updateColor: function() {
    this.color = this.ecosystem.getStaticBaseColor()
      + (255 - this.maxStrength + this.strength).toString(16);
  },

  draw: function() {
    this.ecosystem.ctx.fillStyle = this.color;
    //console.log(blue.toString(16), this.ecosystem.ctx.fillStyle, blue)
    this.ecosystem.ctx.fillRect(this.pos.x, this.pos.y, 2, 2);
  },
}