function Ecosystem() {}

Ecosystem.create = function(canvas) {
    var e = new Ecosystem()
    e.canvas = canvas;
    e.ctx = canvas.getContext('2d');
    e.min = Coordinate.create(0, 0);
    e.max = Coordinate.create(e.canvas.width,
                              e.canvas.height);
    e.ants = [];
    e.food = [];

    e.addAnts();
    e.addFood();

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
        _.map(this.ants, function(ant) { ant.tick() });
        _.map(this.food, function(food) { food.tick() });
    },

    pickUp: function(pickerUpper) {
        var item = this.getItemAt(pickerUpper.pos);
        if(item !== undefined)
        {
            item.owner = pickerUpper;
            return item;
        }
    },

    isFoodAt: function(pos) { return this.getItemAt(pos) instanceof Food; },

    getItemAt: function(pos) {
        return this.findItemAtCoordinate(this.food, pos);
    },

    findItemAtCoordinate: function(items, pos) {
        for(var i in this.items)
            if(pos.id() == this.items[i].id())
                return this.items[i];
    },

    draw: function() {
        this.ctx.fillStyle = "#00a";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    },

    addAnts: function() {
        for(var i = 0; i < 20; i++)
            this.ants.push(Ant.create(this));
    },

    addFood: function() {
        for(var i = 0; i < 20; i++)
            this.food.push(Food.create(this));
    },
}
