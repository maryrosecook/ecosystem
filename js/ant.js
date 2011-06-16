function Ant() {}

Ant.create = function(ecosystem) {
    var ant = new Ant();
    ant.ecosystem = ecosystem;

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
        this.harvest();

        if(this.path.length == 0)
            this.setRandomDestination(); // make new path

        var nextCoordinate = this.path.shift();
        this.pos.x = nextCoordinate.x;
        this.pos.y = nextCoordinate.y;

        this.draw();
    },

    harvest: function() {
        if(this.ecosystem.isFoodAt(this.pos))
        {
            this.cargo = this.ecosystem.pickUp(this);
            this.color = this.cargo.color;
        }
    },

    getPathTo: function(coordinate) {
        return this.pathFinder.astar(Coordinate.create(this.pos.x, this.pos.y),
                                     coordinate,
                                     this.ecosystem.max);
    },

    setRandomDestination: function() {
        var goal = Coordinate.create(this.pos.x + this.randomOrdinate(this.pos.x,
                                                                  this.ecosystem.min.x,
                                                                  this.ecosystem.max.x),
                                     this.pos.y + this.randomOrdinate(this.pos.y,
                                                                  this.ecosystem.min.y,
                                                                  this.ecosystem.max.y));

        this.path = this.getPathTo(goal);
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