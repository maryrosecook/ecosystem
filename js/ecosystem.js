function Ecosystem() {}
Ecosystem.create = function(canvas) {
    var e = new Ecosystem()
    e.birds = [];
    e.addBird();
    e.canvas = canvas;
    e.ctx = canvas.getContext('2d');
    return e
}
Ecosystem.prototype = {
    animate: function() {
        var that = this;
        setInterval(function() {
            that.tick()
            that.draw()
        }, 20)
    },

    draw: function() {
        this.ctx.fillStyle = "#00a";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        for (var i in this.birds) {
            var bird = this.birds[i];
            this.ctx.fillStyle = "#fff";

            this.ctx.beginPath();
            this.ctx.arc(bird.x, bird.y, 1, 0, Math.PI*2, true);
            this.ctx.closePath();
            this.ctx.fill();
        }
    },

    tick: function() {
        for (var i in this.birds) {
            var bird = this.birds[i]
            bird.tick()
                // if (bird.y < 0)
            //     this.birds = _.without(this.birds, bird)
        }
    },

    addBird: function() {
        this.birds.push(Bird.create());
    },
}
