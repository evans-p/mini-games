import Heap from "../../DataStructures/FibonnacciHeap";

class AStar {
  constructor(maze, start, end) {
    this.maze = maze;
    this.start = start;
    this.end = end;

    // BINDING
    this.heuristic = this.heuristic.bind(this);
    this.findNeighbors = this.findNeighbors.bind(this);
    this.create2DMatrix = this.create2DMatrix.bind(this);
    this.reconstructPath = this.reconstructPath.bind(this);
    this.solve = this.solve.bind(this);
  }

  /**
   * Finds the neighboring elements(Nodes) of thes given node.
   * No diagonal movement is allowed, so we search for neighbors
   * above, under, on the left and on the right of the giver
   * element.
   */
  findNeighbors(x, y) {
    let neighbors = [];
    let el = this.maze.length - 1;

    // Find all of the element's neighbors.
    if (x === 0 && y === 0) {
      neighbors.push([x, y + 1]);
      neighbors.push([x + 1, y]);
    } else if (x === el && y === 0) {
      neighbors.push([x, y + 1]);
      neighbors.push([x - 1, y]);
    } else if (x < el && x > 0 && y === 0) {
      neighbors.push([x - 1, y]);
      neighbors.push([x + 1, y]);
      neighbors.push([x, y + 1]);
    } else if (x === 0 && y === el) {
      neighbors.push([x, y - 1]);
      neighbors.push([x + 1, y]);
    } else if (x === el && y === el) {
      neighbors.push([x, y - 1]);
      neighbors.push([x - 1, y]);
    } else if (x < el && x > 0 && y === el) {
      neighbors.push([x - 1, y]);
      neighbors.push([x + 1, y]);
      neighbors.push([x, y - 1]);
    } else if (x === 0 && y > 0 && y < el) {
      neighbors.push([x + 1, y]);
      neighbors.push([x, y + 1]);
      neighbors.push([x, y - 1]);
    } else if (x === el && y > 0 && y < el) {
      neighbors.push([x - 1, y]);
      neighbors.push([x, y + 1]);
      neighbors.push([x, y - 1]);
    } else {
      neighbors.push([x - 1, y]);
      neighbors.push([x + 1, y]);
      neighbors.push([x, y - 1]);
      neighbors.push([x, y + 1]);
    }

    const res = neighbors.filter((value) => {
      return this.maze[value[0]][value[1]] >= 1;
    });
    return res;
  }

  /**
   * The heuristic Function. In this Case we chose the euclidian
   * Distance
   */
  heuristic(x, y) {
    return Math.sqrt(
      Math.pow(x - this.end[0], 2) + Math.pow(y - this.end[1], 2)
    );
  }

  /**Creates a 2D(NxN) Array and fills it with the given value.*/
  create2DMatrix(N, value) {
    let matrix = [];

    for (var i = 0; i < N; i++) {
      let temp = new Array(N).fill(value);
      matrix.push(temp);
    }
    return matrix;
  }

  reconstructPath(cameFrom, node) {
    let path = [];
    let current = node;

    while (!(current[0] === this.start[0] && current[1] === this.start[1])) {
      let from = [
        cameFrom[current[0]][current[1]][0],
        cameFrom[current[0]][current[1]][1],
      ];
      path.push(from);
      current = from;
    }

    // Filter out the starting node.
    path = path.filter((value) => {
      return value[0] !== this.start[0] || value[1] !== this.start[1];
    });

    return path;
  }

  solve() {
    // Initialize a heap for storing unexplored Nodes.
    let openSet = new Heap();
    // An array to store already explored Nodes.
    let closedSet = [];
    // Path tracking data structyre. Used to reconstruct the sortest path.
    let cameFrom = this.create2DMatrix(this.maze.length, []);
    // Initialize gScore for every node with INFINITY.
    let gScore = this.create2DMatrix(this.maze.length, Infinity);

    // Set gScore(Start) = 0;
    gScore[this.start[0]][this.start[1]] = 0;
    // Add Start Node to open set.
    openSet.insert(this.heuristic(this.start[0], this.start[1]), this.start);

    while (!openSet.isEmpty()) {
      // Fetch the Node with the smallest FScore.
      let current = openSet.extractMinimum();
      // Check if current===end. If so reconstruct the sortest path and
      // return it.
      if (current[0] === this.end[0] && current[1] === this.end[1]) {
        return this.reconstructPath(cameFrom, this.end);
      }

      // Find The neighbors of the current Node.
      let neighbors = this.findNeighbors(current[0], current[1]);
      for (const neighbor of neighbors) {
        // tentative_gScore = gScore[current] + d(current, neighbor)
        // d(current, neighbor) is the weight of the edge from current
        // to neighbor in our case d is always ONE(1)
        let tentative_gScore = gScore[current[0]][current[1]] + 1;

        if (tentative_gScore < gScore[neighbor[0]][neighbor[1]]) {
          cameFrom[neighbor[0]][neighbor[1]] = current;
          gScore[neighbor[0]][neighbor[1]] = tentative_gScore;
          // If the neighbor is NOT in the openSet, add it.
          if (openSet.findNode(neighbor) === undefined) {
            openSet.insert(
              gScore[neighbor[0]][neighbor[1]] +
                this.heuristic(neighbor[0], neighbor[1]),
              neighbor
            );
          }
        }
      }
      closedSet.push(current);
    }
    return [];
  }
}

export default AStar;
