function Food() {}

Food.create = function(ecosystem) {
    var food = new Food();
    food.ecosystem = ecosystem;
    food.type = "grass";
    food.color = "#0b0";
    food.owner = null;

    food.pos = Coordinate.create();
    food.pos.x = Math.floor(food.ecosystem.max.x * Math.random());
    food.pos.y = Math.floor(food.ecosystem.max.y * Math.random());

    return food;
}

Food.prototype = {
    tick: function() {
        this.draw();
    },

    draw: function() {
        if(this.owner == null)
        {
            this.ecosystem.ctx.fillStyle = this.color;
            this.ecosystem.ctx.fillRect(this.pos.x, this.pos.y, 2, 2);
        }
    },
}