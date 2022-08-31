// import Heap from "../../DataStructures/FibonnacciHeap";

class RandomizedDepthFirst {
  constructor(gridX, gridY) {
    // Initialize the maze as a (gridX x gridX) grid full
    // of walls
    let maze = [];

    for (let j = 0; j < gridX; j++) {
      let tmpMaze = new Array(gridY).fill(0);
      maze.push(tmpMaze);
    }

    for (let i = 0; i < gridX; i++) {
      for (let j = 0; j < gridY; j++) {
        if (i % 2 === 1) {
          if (j % 2 === 1) {
            maze[i][j] = 1;
          }
        }
      }
    }
    // Store the maze dimensions.
    this.gridX = gridX;
    this.gridY = gridY;
    // Store the maze just created.
    this.maze = maze;
    // Data structure to track the visited cells.
    // If a cell is visited, visited[cell] = 1,
    // else visited[cell] = 0.
    this.visited = maze;

    // BINDING
    this.findNeighbors = this.findNeighbors.bind(this);
    this.generateMaze = this.generateMaze.bind(this);
  }
  /**Maze Generation method.*/
  generateMaze() {
    return this.maze;
  }
  //   generateMaze() {
  //     // A stack to store cells.
  //     let stack = [];
  //     // Select the starting cell, as one of the cells of the first
  //     // row of the maze. Then place it on the maze, mark it as
  //     // visited and push it into the stark.
  //     let current = [0, 1 + Math.floor((this.gridY - 1) * Math.random())];
  //     this.maze[current[0]][current[1]] = 1;
  //     this.visited[current[0]][current[1]] = 1;
  //     stack.push(current);
  //     // While the stack is not empty
  //     while (stack.length > 0) {
  //       // Pop a cell from the stack and make it a current cell
  //       current = stack.pop();
  //       // Find the Unvisited neighbors of the current cell.
  //       let neighbors = this.findNeighbors(current);
  //       // If the current cell has any neighbours which have not been visited
  //       if (neighbors.length > 0) {
  //         // Push the current cell to the stack
  //         stack.push(current);
  //         // Choose one of the unvisited neighbours
  //         let chosen = neighbors[Math.floor(neighbors.length * Math.random())];
  //         // Remove the wall between the current cell and the chosen cell
  //         this.maze[chosen[0]][chosen[1]] = 1;
  //         // Mark the chosen cell as visited and push it to the stack
  //         this.visited[chosen[0]][chosen[1]] = 1;
  //         stack.push(chosen);
  //       }
  //     }
  //     return this.maze;
  //   }

  /**Finds the neighboring elements(Nodes) of thes given node That are marked
   * as not Visited. No diagonal movement is allowed, so we search for
   * neighbors above, under, on the left and on the right of the given
   * element.*/
  findNeighbors(cell) {
    const [x, y] = cell;
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
    // Filter Out the already visited Neighbors.
    neighbors = neighbors.filter((neighbor) => {
      return this.visited[neighbor[0]][neighbor[1]] === 0;
    });
    return neighbors;
  }
}

export default RandomizedDepthFirst;
