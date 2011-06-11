// code from here: http://13thparallel.com/archive/bezier-curves/

function Coordinate() {}2
Coordinate.create = function(x, y) {
    var coordinate = new Coordinate();
    coordinate.x = x;
    coordinate.y = y;

    return coordinate;
}

function Bezier() {}
Bezier.create = function(c1, c2, c3, c4) {
    var bezier = new Bezier();
    bezier.c1 = c1;
    bezier.c2 = c2;
    bezier.c3 = c3;
    bezier.c4 = c4;

    return bezier;
}
Bezier.prototype = {
    point: function(progress) {
        var coordinate = Coordinate.create(0, 0);

        coordinate.x = this.c1.x * this.b1(progress) + this.c2.x * this.b2(progress) + this.c3.x * this.b3(progress) + this.c4.x * this.b4(progress);
        coordinate.y = this.c1.y * this.b1(progress) + this.c2.y * this.b2(progress) + this.c3.y * this.b3(progress) + this.c4.y * this.b4(progress);

        return coordinate;
    },

    b1: function(t) { return t*t*t },
    b2: function(t) { return 3*t*t*(1-t) },
    b3: function(t) { return 3*t*(1-t)*(1-t) },
    b4: function(t) { return (1-t)*(1-t)*(1-t) },
}