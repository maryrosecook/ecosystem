function Astar() {}

Astar.create = function() {
  var astar = new Astar();
  return astar;
}

Astar.prototype = {
  astar: function(start, goal, maxCoordinates)
  {
    if(start.id() == goal.id())
      return this.reconstructPath({}, start);

    var closedSet = {};
    var openSet = {};
    var cameFrom = {};

    // lower scores are better
    var gScore = {};
    var fScore = {};

    openSet[start.id()] = start; // the set of tentative nodes to be evaluated.
    gScore[start.id()] = 0; // cost from start along best known path.
    fScore[start.id()] = gScore[start.id()] + this.heuristicCostEstimate(start, goal);

    while(_.keys(openSet).length > 0)
    {
      var x = this.getNextNode(openSet, fScore);
      if(x.id() == goal.id())
        return this.reconstructPath(cameFrom, goal);

      delete openSet[x.id()];
      closedSet[x.id()] = x;

      var neighbours = x.neighbours(maxCoordinates);
      for(var i in neighbours)
      {
        var y = neighbours[i];
        if(closedSet[y.id()] !== undefined)
          continue

        var tentativeGScore = gScore[x.id()] + this.distance(x, y);
        var tentativeIsBetter = null;
        if(openSet[y.id()] === undefined)
        {
          openSet[y.id()] = y;
          tentativeIsBetter = true
        }
        else if(tentativeGScore < gScore[y.id()])
          tentativeIsBetter = true;
        else
          tentativeIsBetter = false;

        if(tentativeIsBetter === true)
        {
          cameFrom[y.id()] = x;
          gScore[y.id()] = tentativeGScore;
          fScore[y.id()] = gScore[y.id()] + this.heuristicCostEstimate(y, goal);
        }
      }
    }

    return null;
  },

  getNextNode: function(openSet, fScore) {
    var lowestScore = 99999999999999999;
    var lowestScoringNode = null;
    for(var i in openSet)
    {
      if(fScore[i] < lowestScore)
      {
        lowestScore = fScore[i];
        lowestScoringNode = openSet[i];
      }
    }

    return lowestScoringNode;
  },

  distance: function(a, b) {
    var x = Math.abs(a.x - b.x);
    var y = Math.abs(a.y - b.y);
    return Math.sqrt((x * x) + (y * y));
  },

  heuristicCostEstimate: function(a, goal) {
    return this.distance(a, goal);
  },

  reconstructPath: function(cameFrom, currentNode) {
    if(cameFrom[currentNode.id()] !== undefined)
    {
      var p = this.reconstructPath(cameFrom, cameFrom[currentNode.id()]);
      p.push(currentNode);
      return p;
    }
    else
      return [currentNode];
  }
}