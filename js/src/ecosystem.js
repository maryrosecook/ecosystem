function Ecosystem() {}

Ecosystem.create = function(canvas) {
  var e = new Ecosystem();
  var numAnts = 10;
  var numFood = 300;
  e.frameInterval = 10;

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
  e.creatures = {};
  e.items = {};
  e.creatures.ants = [];
  e.items.food = [];

  e.nest = Nest.create(e, e.max);

  e.addAnts(numAnts);
  e.addFood(numFood);

  return e;
}

Ecosystem.prototype = {
  animate: function() {
    var that = this;
    setInterval(function() {
      that.tick()
    }, this.frameInterval)
  },

  tick: function() {
    this.draw();
    this.nest.tick();
    this.mapInner(this.creatures, "tick");
    this.mapInner(this.items, "tick");
  },

  mapInner: function(collection, funcName) {
    _.map(collection, function(innerCollection) {
      _.map(innerCollection, function(item) {
        item[funcName].call(item);
      });
    });
  },

  getItemAt: function(pos) {
    for(var itemType in this.items) // food etc.
      for(var i in this.items[itemType])
        if(pos.id() === this.items[itemType][i].pos.id())
          return this.items[itemType][i];
  },

  pickUpItemAt: function(pos) {
    for(var itemType in this.items) // food etc.
    {
      var item = null;
      for(var i in this.items[itemType])
        if(pos.id() == this.items[itemType][i].pos.id())
        {
          item = this.items[itemType][i];
          delete this.items[itemType][i];
          item.pickUp();
        }

      return item;
  }
  },

  draw: function() {
    this.ctx.fillStyle = "#00a";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  },

  addAnts: function(count) {
    for(var i = 0; i < count; i++)
      this.creatures.ants.push(Ant.create(this));
  },

  addFood: function(count) {
    for(var i = 0; i < count; i++)
      this.items.food.push(Food.create(this));
  },
}