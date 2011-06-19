function Ecosystem() {}

Ecosystem.create = function(canvas) {
  var e = new Ecosystem();
  var numAnts = 30;
  var numFoodHubs = 3;
  var numFoodPerHub = 100;
  var maxFoodTravel = 50; // from hub

  e.frameInterval = 1;

  // drawing setup
  e.canvas = canvas;
  e.ctx = canvas.getContext('2d');

  // make helpers
  e.machine = new Machine(); // state machine maker
  e.geometry = Geometry.create(e); // coord functions

  // important locations
  e.min = Coordinate.create(0, 0);
  e.max = Coordinate.create(e.canvas.width,
                            e.canvas.height);
  e.color = "#0000a0";
  e.staticBaseColor = e.color.substr(0, 5);

  // things in the ecosystem
  e.creatures = {};
  e.items = {};

  e.creatures.ants = [];
  e.items.pheromones = {};
  e.items.food = {};

  e.nest = Nest.create(e, e.max);

  e.addAnts(numAnts);
  e.addFood(numFoodHubs, numFoodPerHub, maxFoodTravel);

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
    this.mapInner(this.items, "tick");
    this.nest.tick();
    this.mapInner(this.creatures, "tick");
  },

  mapInner: function(collection, funcName) {
    for(var i in collection)
    {
      var innerCollection = collection[i];
      for(var j in innerCollection)
        innerCollection[j][funcName].call(innerCollection[j]);
    }
  },

  pheromone: function(pos) {
    var pheromonePos = Coordinate.create(pos.x, pos.y);
    if(this.items.pheromones[pheromonePos.id()] === undefined)
      this.items.pheromones[pheromonePos.id()] = Pheromone.create(this, pheromonePos);
    else
      this.items.pheromones[pheromonePos.id()].strengthen();
  },

  getItemAt: function(pos, type) {
    if(this.items[type][pos.id()] !== undefined)
      return this.items[type][pos.id()]
  },

  pickUpItemAt: function(pos, type) {
    var item = this.items[type][pos.id()];
    if(item !== undefined)
    {
      delete this.items[type][pos.id()];
      item.pickUp();
    }

    return item;
  },

  getStaticBaseColor: function() { return this.staticBaseColor; },

  draw: function() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  },

  addAnts: function(count) {
    for(var i = 0; i < count; i++)
      this.creatures.ants.push(Ant.create(this));
  },

  addFood: function(hubCount, foodPerHubCount, maxFoodTravel) {
    for(var i = 0; i < hubCount; i++)
    {
      var randomFoodHub = this.geometry.getRandomCoordinate();
      for(var j = 0; j < foodPerHubCount; j++)
      {
        var food = Food.create(this, randomFoodHub, maxFoodTravel);
        this.items.food[food.pos.id()] = food;
      }
    }
  },
}