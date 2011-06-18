function Ant() {}

Ant.create = function(ecosystem) {
  var ant = new Ant();
  ant.ecosystem = ecosystem;
  ant.state = ant.ecosystem.machine.generateTree(antai, ant);

  ant.cargo = null;
  ant.pathFinder = Astar.create();
  ant.path = [];

  ant.pos = ant.ecosystem.geometry.getRandomCoordinate(true);

  ant.normalColor = "#fff";
  ant.color = ant.normalColor;

  return ant;
}

Ant.prototype = {
  tick: function() {
    this.state = this.state.tick();
    //console.log(this.state.id)
    this.draw();
  },

  maxWander: 50,
  canSetWanderDestination: function() { return this.path.length == 0; },
  setWanderDestination: function() {
    this.setCourse(this.ecosystem.geometry.getRandomNewDestination(this.pos,
                                                                   this.maxWander),
                   "wander");
  },

  canWalk: function() { return this.path.length > 0; },
  walk: function() {
    var nextCoordinate = this.path.shift();
    this.pos.x = nextCoordinate.x;
    this.pos.y = nextCoordinate.y;
  },

  canSalvage: function() {
    return this.cargo === null
      && this.ecosystem.getItemAt(this.pos, "food") !== undefined;
  },

  canFollowPheromone: function() {
    return this.ecosystem.getItemAt(this.pos, "pheromones") !== undefined
      && !this.ecosystem.nest.atNest(this);
  },
  followPheromone: function() {
    //console.log("setting pheromone course")
    this.deleteCourse(null); // delete any existing course
    var c = this.ecosystem.geometry.coordinateAwayFromNest(this.pos);
    this.pos = Coordinate.create(c.x, c.y, true);
  },

  grab: function() {
    var item = this.ecosystem.pickUpItemAt(this.pos, "food");
    if(item instanceof Food)
    {
      console.log("foundfood")
      this.cargo = item;
      this.color = this.cargo.cargoColor;
    }
  },

  pheromone: function() {
    this.ecosystem.pheromone(this.pos);
  },

  canDepositCargo: function() { return this.cargo !== null },
  depositCargo: function() {
    this.ecosystem.nest.depositCargo(this.cargo);
    this.cargo = null;
    this.color = this.normalColor;
  },

  canGoHome: function() {
    return this.cargo !== null;
  },

  canSetCourseForHome: function() {
    return this.cargo !== null
      && this.headingTo !== "home";
  },
  setCourseForHome: function() {
    this.setCourse(this.ecosystem.nest.pos, "home");
  },

  getPathTo: function(coordinate) {
    return this.pathFinder.astar(Coordinate.create(this.pos.x, this.pos.y),
                                 coordinate,
                                 this.ecosystem.max);
  },

  canWalkHome: function() { return this.path.length > 0; },

  headingTo: null,
  setCourse: function(coordinate, headingTo) {
    this.path = this.getPathTo(coordinate);
    this.headingTo = headingTo;
  },

  deleteCourse: function() {
    this.path = [];
    this.headingTo = null;
  },

  draw: function() {
    this.ecosystem.ctx.fillStyle = this.color;
    this.ecosystem.ctx.fillRect(this.pos.x, this.pos.y, 2, 2);
  },
}

// AI
antai = {
  id: "idle", strategy: "prioritised",
  children: [
    {
      id: "scavenge", strategy: "sequential",
      children: [
        {
          id: "salvage", strategy: "sequential",
          children: [
            { id: "grab" },
            {
              id: "goHome", strategy: "prioritised",
              children: [
                { id: "setCourseForHome" },
                {
                  id: "walkHome", strategy: "sequential",
                  children: [
                    { id: "walk" },
                    { id: "pheromone" },
                  ]
                },
                { id: "depositCargo" },
              ]
            },
          ]
        },
        { id: "followPheromone" },
        { id: "setWanderDestination" },
        { id: "walk" },
      ]
    },
  ]
}