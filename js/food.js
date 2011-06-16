function Food() {}

Food.create = function(ecosystem) {
    var food = new Food();
    food.ecosystem = ecosystem;
    food.type = "grass";
    food.color = "#0a0";
    food.owner = null;

    food.x = Math.floor(food.ecosystem.max.x * Math.random());
    food.y = Math.floor(food.ecosystem.max.y * Math.random());

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
            this.ecosystem.ctx.fillRect(this.x, this.y, 2, 2);
        }
    },
}