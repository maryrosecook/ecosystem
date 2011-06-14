// code from here: http://13thparallel.com/archive/bezier-curves/

function Coordinate() {}2
Coordinate.create = function(x, y) {
    var coordinate = new Coordinate();
    coordinate.x = x;
    coordinate.y = y;
    coordinate.id = x + "," + y;

    return coordinate;
}
Coordinate.prototype = {
    neighbours: function(maxCoordinates) {
        var neighbours = [];

        if(this.x > 0)
            neighbours.push(Coordinate.create(this.x - 1, this.y));
        if(this.y > 0)
            neighbours.push(Coordinate.create(this.x, this.y - 1));
        if(this.x < maxCoordinates.x)
            neighbours.push(Coordinate.create(this.x + 1, this.y));
        if(this.y < maxCoordinates.y)
            neighbours.push(Coordinate.create(this.x, this.y + 1));
        if(this.x > 0 && this.y > 0)
            neighbours.push(Coordinate.create(this.x - 1, this.y - 1));
        if(this.x < maxCoordinates.x && this.y < maxCoordinates.y)
            neighbours.push(Coordinate.create(this.x + 1, this.y + 1));
        if(this.x > 0 && this.y < maxCoordinates.y)
            neighbours.push(Coordinate.create(this.x - 1, this.y + 1));
        if(this.x < maxCoordinates.x && this.y > 0)
            neighbours.push(Coordinate.create(this.x + 1, this.y - 1));

        return neighbours;
    },
}

function Bezier() {}
Bezier.create = function(c1, c2, c3, c4) {
    var bezier = new Bezier();
    bezier.c1 = c1;
    bezier.c2 = c2;
    bezier.c3 = c3;
    bezier.c4 = c4;
    bezier.progress = 0;

    return bezier;
}
Bezier.prototype = {
    point: function() {
        var coordinate = Coordinate.create(0, 0);

        coordinate.x = this.c1.x * this.b1(this.progress) + this.c2.x * this.b2(this.progress) + this.c3.x * this.b3(this.progress) + this.c4.x * this.b4(this.progress);
        coordinate.y = this.c1.y * this.b1(this.progress) + this.c2.y * this.b2(this.progress) + this.c3.y * this.b3(this.progress) + this.c4.y * this.b4(this.progress);

        return coordinate;
    },

    b1: function(t) { return (1-t)*(1-t)*(1-t) },
    b2: function(t) { return 3*(1-t)*(1-t)*t },
    b3: function(t) { return 3*(1-t)*t*t },
    b4: function(t) { return t*t*t },
}