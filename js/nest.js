function Nest() {}

Nest.create = function(ecosystem, max) {
    var nest = new Nest();
    nest.ecosystem = ecosystem;
    nest.color = "#000";

    nest.pos = Coordinate.create(Math.floor(max.x / 2),
                                  Math.floor(max.y / 2));

    return nest;
}

Nest.prototype = {
    tick: function() {
        this.draw();
    },

    draw: function() {
        this.ecosystem.ctx.fillStyle = this.color;
        this.ecosystem.ctx.fillRect(this.pos.x, this.pos.y, 3, 3);
    },
}