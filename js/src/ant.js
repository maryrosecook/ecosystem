function Ant() {}

Ant.create = function(ecosystem) {
  var ant = new Ant();
  ant.ecosystem = ecosystem;
  ant.state = ant.ecosystem.machine.generateTree(antai, ant);

  ant.cargo = null;
  ant.pathFinder = Astar.create();
  ant.path = [];

  ant.pos = Coordinate.create(Math.floor(ant.ecosystem.max.x * Math.random()),
                              Math.floor(ant.ecosystem.max.y * Math.random()),
                              true);

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

  canSetWanderDestination: function() { return this.path.length == 0; },
  setWanderDestination: function() {
    this.setPath(this.getRandomDestination(), "wander");
  },

  canWalk: function() { return this.path.length > 0; },
  walk: function() {
    var nextCoordinate = this.path.shift();
    this.pos.x = nextCoordinate.x;
    this.pos.y = nextCoordinate.y;
  },

  canSalvage: function() {
    return this.cargo === null
      && this.ecosystem.getItemAt(this.pos) !== undefined;
  },

  grab: function() {
    var item = this.ecosystem.pickUpItemAt(this.pos);
    if(item instanceof Food)
    {
      console.log("foundfood")
      this.cargo = item;
      this.color = this.cargo.cargoColor;
    }
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
    this.setPath(this.getPathTo(this.ecosystem.nest.pos), "home");
  },

  getPathTo: function(coordinate) {
    return this.pathFinder.astar(Coordinate.create(this.pos.x, this.pos.y),
                                 coordinate,
                                 this.ecosystem.max);
  },

  headingTo: null,
  setPath: function(path, headingTo) {
    this.path = path;
    this.headingTo = headingTo;
  },

  getRandomDestination: function() {
    var goal = Coordinate.create(this.pos.x + this.randomOrdinate(this.pos.x,
                                                                  this.ecosystem.min.x,
                                                                  this.ecosystem.max.x),
                                 this.pos.y + this.randomOrdinate(this.pos.y,
                                                                  this.ecosystem.min.y,
                                                                  this.ecosystem.max.y));

    return this.getPathTo(goal);
  },

  randomOrdinate: function(current, min, max) {
    var theoreticalMaxTravel = Math.floor(50 * Math.random());
    if(Math.random() < 0.5)
      return -this.randTravel(theoreticalMaxTravel, current, min);
    else
      return this.randTravel(theoreticalMaxTravel, current, max);
  },

  // returns theoreticalMaxTravel, or boundary if closer
  randTravel: function(theoreticalMaxTravel, position, boundary) {
    var max = Math.min(theoreticalMaxTravel, Math.abs(position - boundary));
    return Math.floor(Math.random() * max);
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
      id: "wander", strategy: "sequential",
      children: [
        {
          id: "salvage", strategy: "sequential",
          children: [
            { id: "grab" },
            {
              id: "goHome", strategy: "prioritised",
              children: [
                { id: "setCourseForHome" },
                { id: "walk" },
                { id: "depositCargo" },
              ]
            },
          ]
        },
        { id: "setWanderDestination" },
        { id: "walk" },
      ]
    },
  ]
}