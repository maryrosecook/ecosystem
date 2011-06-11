function Bird() {}
Bird.create = function() {
    var bird = new Bird();
    var c1 = Coordinate.create(10, 100);
    var c2 = Coordinate.create(10, 10);
    var c3 = Coordinate.create(100, 10);
    var c4 = Coordinate.create(100, 100);
    bird.bezier = Bezier.create(c1, c2, c3, c4);
    bird.progress = 0;

    bird.x = 0;
    bird.y = 0;

    return bird;
}
Bird.prototype = {
    tick: function() {
        if(this.progress < 1)
        {
            this.progress += 0.01;
            var newCoordinate = this.bezier.point(this.progress);
            this.x = newCoordinate.x;
            this.y = newCoordinate.y;
        }
    }
}