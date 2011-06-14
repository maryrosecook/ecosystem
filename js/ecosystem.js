function Ecosystem() {}
Ecosystem.create = function(canvas) {
    var e = new Ecosystem()
    e.canvas = canvas;
    e.ctx = canvas.getContext('2d');

    e.ants = [];
    e.addAnt();
    return e;
}
Ecosystem.prototype = {
    animate: function() {
        var that = this;
        setInterval(function() {
            that.tick()
        }, 20)
    },

    tick: function() {
        this.draw()
        for (var i in this.ants) {
            var ant = this.ants[i]
            ant.tick()
        }
    },

    draw: function() {
        this.ctx.fillStyle = "#00a";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    },

    addAnt: function() {
        this.ants.push(Ant.create(this));
    },
}
