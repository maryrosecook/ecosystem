function Ecosystem() {}

Ecosystem.create = function(canvas) {
  var e = new Ecosystem();

  // drawing setup
  e.canvas = canvas;
  e.ctx = canvas.getContext('2d');

  // state machine generator
  e.machine = new Machine();

  // important locations
  e.min = Coordinate.create(0, 0);
  e.max = Coordinate.create(e.canvas.width,
                            e.canvas.height);

  // things in the ecosystem
  e.ants = [];
  e.food = [];
  e.nest = Nest.create(e, e.max);

  e.addAnts(20);
  e.addFood(300);

  return e;
}

Ecosystem.prototype = {
  animate: function() {
    var that = this;
    setInterval(function() {
      that.tick()
    }, 10)
  },

  tick: function() {
    this.draw()
    _.map(this.ants, function(ant) { ant.tick() });
    _.map(this.food, function(food) { food.tick() });
    this.nest.tick();
  },

  pickUp: function(pickerUpper) {
    var item = this.pickUpItemAtCoordinate(this.food, pickerUpper.pos);
    if(item !== null)
    {
      item.owner = pickerUpper;
      return item;
    }
  },

  getAnyItemAt: function(pos) {
    return this.getItemAt(this.food, pos);
  },

  getItemAt: function(items, pos) {
    for(var i in items)
      if(pos.id() == items[i].pos.id())
        return items[i];
  },

  pickUpAnyItemAt: function(pos) {
    return this.pickUpItemAt(this.food, pos);
  },

  pickUpItemAt: function(items, pos) {
    var item = null;
    for(var i in items)
      if(pos.id() == items[i].pos.id())
      {
        item = items[i];
        delete items[i];
      }

    return item;
  },

  draw: function() {
    this.ctx.fillStyle = "#00a";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  },

  addAnts: function(count) {
    for(var i = 0; i < count; i++)
      this.ants.push(Ant.create(this));
  },

  addFood: function(count) {
    for(var i = 0; i < count; i++)
      this.food.push(Food.create(this));
  },
}