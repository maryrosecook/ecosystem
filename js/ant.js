function Ant() {}

Ant.create = function(ecosystem) {
    var ant = new Ant();
    ant.ecosystem = ecosystem;
    ant.state = ant.ecosystem.machine.generateTree(antai, ant);

    ant.cargo = null;
    ant.pathFinder = Astar.create();
    ant.path = [];

    ant.pos = Coordinate.create();
    ant.pos.x = Math.floor(ant.ecosystem.max.x * Math.random());
    ant.pos.y = Math.floor(ant.ecosystem.max.y * Math.random());
    ant.color = "#fff";

    return ant;
}

Ant.prototype = {
    tick: function() {
        this.state = this.state.tick();
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
        return this.cargo == null
            && this.ecosystem.getItemAt(this.pos) !== undefined;
    },

    grab: function() {
        var item = this.ecosystem.getItemAt(this.pos);
        if(item instanceof Food)
        {
            console.log("foundfood")
            this.cargo = this.ecosystem.pickUp(this);
            this.color = this.cargo.color;
        }
    },

    canStrikeForHome: function() {
        return this.pos.id() != this.ecosystem.nest.pos.id();
    },

    canSetCourseForHome: function() {
        return this.path.length == 0
            || this.path[this.path.length - 1].id() != this.ecosystem.nest.pos.id();
    },
    setCourseForHome: function() {
        this.setPath(this.getPathTo(this.ecosystem.nest.pos), "home");
    },

    getPathTo: function(coordinate) {
        return this.pathFinder.astar(Coordinate.create(this.pos.x, this.pos.y),
                                     coordinate,
                                     this.ecosystem.max);
    },

    setPath: function(path, destination) {
        this.path = path;
        this.destination = destination;
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
    identifier: "idle", strategy: "prioritised",
    children: [
        {
            identifier: "wander", strategy: "sequential",
            children: [
                {
                    identifier: "salvage", strategy: "sequential",
                    children: [
                        { identifier: "grab" },
                        {
                            identifier: "strikeForHome", strategy: "prioritised",
                            children: [
                                { identifier: "setCourseForHome" },
                                { identifier: "walk" },
                            ]
                        },
                    ]
                },
                { identifier: "setWanderDestination" },
                { identifier: "walk" },
            ]
        },
    ]
}