import React from "react";
import ReactDOM from "react-dom";
import "./MazeSolverApp.css";
import Navbar from "./Components/Navbar/Navbar";
import Body from "./Components/Body/Body";
// Maze Solvers
import AStar from "./Algorithms/MazeSolvers/AStar/AStar";
// Maze Generators
import RandomizedDepthFirst from "./Algorithms/MazeGenerators/RandomizedDepthFirst/RandomizedDepthFirst";
import recursiveDivision from "./Algorithms/MazeGenerators/RecursiveDivision/RecursiveDivision";

class MazeSolverApp extends React.Component {
  constructor(props) {
    super(props);

    // A reference to the Body Component.
    this.bodyRef = React.createRef();
    // A reference to the Navbar Component.
    this.navbarRef = React.createRef();

    this.state = {
      // Flag to check whether a mouse button has been pressed or not.
      mouseDown: 0,
      // Stores the size of the grid Maze.
      gridSize: [],
      // Describes the type of maze to be generated: either an empty,
      // or a random maze.
      mazeType: "",
      // Stores the alogithm name used to solve the maze.
      algorithm: "",
      // An Object tha manages the app's error messages. generationErrors
      // handles the errors that appear during the Maze generation proccess
      // and mazeErrors handles the ones that appear during the maze solving
      // proccess.
      errors: {
        generationErrors: [],
        mazeErrors: [],
      },
      // A flag, in order to check if the maze is being generated or not.
      generatingMaze: false,
      // The app Maze, stored as a 2D array. Initialize as an empty array.
      maze: [],
      // The start of the maze. Initialized as an empty array.
      start: [],
      // A flag to track whether the start of the maze is being placed or not.
      placingStart: false,
      // The end of the maze. Initialized as an empty array.
      end: [],
      // A flag to track whether the end of the maze is being placed or not.
      placingEnd: false,
      // the Path that the solution algorithm produces.
      path: [],
    };
    // BINDING
    this.selectGridSize = this.selectGridSize.bind(this);
    this.selectAlgorithm = this.selectAlgorithm.bind(this);
    this.selectMazeType = this.selectMazeType.bind(this);
    this.generateMaze = this.generateMaze.bind(this);
    this.checkGenerationErrors = this.checkGenerationErrors.bind(this);
    this.checkMazeErrors = this.checkMazeErrors.bind(this);
    this.deleteErrorMessage = this.deleteErrorMessage.bind(this);
    // this.createMazeGrid = this.createMazeGrid.bind(this);
    // this.setMazeGrid = this.setMazeGrid.bind(this);
    this.selectMazeStart = this.selectMazeStart.bind(this);
    this.selectMazeEnd = this.selectMazeEnd.bind(this);
    this.selectPlacingStart = this.selectPlacingStart.bind(this);
    this.selectPlacingEnd = this.selectPlacingEnd.bind(this);
    this.checkClickPosition = this.checkClickPosition.bind(this);
    this.onElementClick = this.onElementClick.bind(this);
    this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
    this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
    this.solveMaze = this.solveMaze.bind(this);
    this.aStarSolver = this.aStarSolver.bind(this);
    this.setMazePath = this.setMazePath.bind(this);
    this.resetMazePath = this.resetMazePath.bind(this);
    this.blankMazeGridGenetator = this.blankMazeGridGenetator.bind(this);
    this.randomMazeGridGenetator = this.randomMazeGridGenetator.bind(this);
    this.generateMazeGrid = this.generateMazeGrid.bind(this);
  }
  /**Deletes an error message, specified by its category and index*/
  deleteErrorMessage(category, idx) {
    if (category === "generation") {
      let generationErrors = this.state.errors.generationErrors;
      generationErrors = generationErrors.filter((val, i) => {
        return i !== idx;
      });
      this.setState((curState) => {
        return {
          errors: {
            generationErrors: generationErrors,
            mazeErrors: curState.errors.mazeErrors,
          },
        };
      });
    }
    if (category === "maze") {
      let mazeErrors = this.state.errors.mazeErrors;
      mazeErrors = mazeErrors.filter((val, i) => {
        return i !== idx;
      });
      this.setState((curState) => {
        return {
          errors: {
            generationErrors: curState.errors.generationErrors,
            mazeErrors: mazeErrors,
          },
        };
      });
    }
  }
  /** Called when the user hits the "Generate Maze" Button. First,
   *  checks for any errors, like maze-size or maze-type being undifined,
   *  and if at least one was found, suspends the generation proccess and
   *  displays the errror messages. If no errors were found, Generates a
   *  new maze, based on the parameters provided by the user, and displays
   * that maze in the Body component.
   */
  generateMaze() {
    if (this.checkGenerationErrors()) {
      // Errors Where Found.
    } else {
      // No Errors were found. Begin by setting the state's "generatingMaze"
      // flag to True, and by resetting the maze.
      this.setState({
        generatingMaze: true,
        algorithm: "",
        maze: [],
        start: [],
        end: [],
        path: [],
        errors: {
          mazeErrors: [],
          generationErrors: [],
        },
        placingStart: false,
        placingEnd: false,
      });
      // Set the maze grid after one(1) sec.
      // setTimeout(this.setMazeGrid, 1000);
      setTimeout(this.generateMazeGrid, 1000);
    }
  }

  // async setMazeGrid() {
  //   const grid = await this.createMazeGrid();
  //   this.setState({ maze: grid, generatingMaze: false });
  // }

  /**Generates a new Maze grid, based on the state's mazeType variable */
  generateMazeGrid() {
    const { mazeType } = this.state;
    // Make sure that mazeType variable is defined.
    if (mazeType.length > 0) {
      let maze = [];
      switch (mazeType) {
        case "blank":
          maze = this.blankMazeGridGenetator();
          break;
        case "random":
          maze = this.randomMazeGridGenetator();
          break;
        case "randomized-depth-first":
          let randomizedDepthFirstGenerator = new RandomizedDepthFirst(
            this.state.gridSize[0],
            this.state.gridSize[1]
          );
          maze = randomizedDepthFirstGenerator.generateMaze();
          break;
        case "recursive-division":
          maze = this.blankMazeGridGenetator();
          recursiveDivision(
            maze,
            0,
            this.state.gridSize[0] - 1,
            0,
            this.state.gridSize[1] - 1
          );
          break;

        default:
          console.log("Unknown Maze type...");
      }
      this.setState({ maze: maze, generatingMaze: false });
    }
  }
  /** Generates a new Blank Maze Grid*/
  blankMazeGridGenetator() {
    const { gridSize } = this.state;
    let maze = [];

    for (let i = 0; i < gridSize[1]; i++) {
      let tmpRow = new Array(gridSize[0]).fill(1);
      maze.push(tmpRow);
    }
    return maze;
  }
  /** Generates a new Random Maze Grid*/
  randomMazeGridGenetator() {
    const { gridSize } = this.state;
    let maze = [];

    for (let i = 0; i < gridSize[0]; i++) {
      let tmpRow = new Array(gridSize[1]);
      for (let j = 0; j < gridSize[1]; j++) {
        tmpRow[j] = Math.floor(Math.random() * 2);
      }
      maze.push(tmpRow);
    }
    return maze;
  }

  /**Asynchronous Creation of the maze grid.*/
  // createMazeGrid() {
  //   const { gridSize, mazeType } = this.state;
  //   let maze = [];

  //   return new Promise((resolve) => {
  //     if (mazeType === "blank") {
  //       for (let i = 0; i < gridSize[1]; i++) {
  //         let tmpRow = new Array(gridSize[0]).fill(1);
  //         maze.push(tmpRow);
  //       }
  //       resolve(maze);
  //     } else if (mazeType === "random") {
  //       for (let i = 0; i < gridSize[0]; i++) {
  //         let tmpRow = new Array(gridSize[1]);
  //         for (let j = 0; j < gridSize[1]; j++) {
  //           tmpRow[j] = Math.floor(Math.random() * 2);
  //         }
  //         maze.push(tmpRow);
  //       }
  //       resolve(maze);
  //     }
  //   });
  // }

  /**Checks for any errors in the maze generation proccess. If any were
   * found, returns TRUE, and displays the errors, Otherwise, returns
   * FALSE.
   */
  checkGenerationErrors() {
    let generationErrors = [];
    let errorsFound = false;

    if (this.state.gridSize.length === 0) {
      // Grid size has not been set.
      generationErrors.push("Please Select the Size of the Maze");
      errorsFound = true;
    }
    if (this.state.mazeType === "") {
      // Maze type has not been set.
      generationErrors.push("Please Select the Type of the maze");
      errorsFound = true;
    }
    this.setState((curState) => {
      return {
        errors: {
          generationErrors: generationErrors,
          mazeErrors: curState.errors.mazeErrors,
        },
      };
    });
    return errorsFound;
  }

  /**Checks for any errors before the maze solving proccess begins.
   * If any were found, returns TRUE, and displays the errors,
   * Otherwise, returns FALSE. */
  checkMazeErrors() {
    let mazeErrors = [];
    let errorsFound = false;

    if (this.state.start.length === 0) {
      // Maze Start has not been set.
      mazeErrors.push("Please Place the Start of the Maze");
      errorsFound = true;
    }
    if (this.state.end.length === 0) {
      // Maze End has not been set.
      mazeErrors.push("Please Place the End of the Maze");
      errorsFound = true;
    }
    if (this.state.algorithm === "") {
      // Solution Algorithm has not been set.
      mazeErrors.push("Please select the Solution Algorithm");
      errorsFound = true;
    }
    this.setState((curState) => {
      return {
        errors: {
          generationErrors: curState.errors.generationErrors,
          mazeErrors: mazeErrors,
        },
      };
    });
    return errorsFound;
  }
  /**A "Solver" Function That uses A* Algorithm to solve the maze.*/
  aStarSolver() {
    let aStar = new AStar(this.state.maze, this.state.start, this.state.end);
    let path = aStar.solve();
    return path;
  }

  setMazePath(path) {
    let { maze } = this.state;

    for (const node of path) {
      maze[node[0]][node[1]] = 4;
    }
    this.setState({ maze: maze, path: path });
  }

  resetMazePath() {
    let { maze, path } = this.state;

    for (const node of path) {
      maze[node[0]][node[1]] = 1;
    }
    this.setState({ maze: maze, path: [] });
  }

  /**Called Once the user hits the "Solve Maze!" button. Begins by reseting
   * the current path, if one is available.Then, continues, by calling
   * checkMazeErrors method, to check for any errors before the solving
   * begins. If any where found, the errors are being displayed on the screen
   * and solveMaze returns. If No errors were found, Calls the appropriate "Solver"
   * Function To solve the maze problem.
   */
  solveMaze() {
    this.resetMazePath();

    if (this.checkMazeErrors()) {
      console.log("ERRORS WHERE FOUND!!");
    } else {
      switch (this.state.algorithm) {
        case "astar":
          console.log("Solving With ASTAR...");
          let path = this.aStarSolver();
          if (path.length > 0) {
            this.setMazePath(path);
          } else {
            // Fail
          }
          break;
        default:
          console.log("Cannot Identify Selected Algorithm...");
          break;
      }
    }
  }

  /**Call in order to set the grid variable in the Component's state.*/
  selectGridSize(grid) {
    this.setState({ gridSize: grid });
  }
  /**Call in order to set the alorithm variable in the Component's state.*/
  selectAlgorithm(alg) {
    this.setState({ algorithm: alg });
  }
  /**Call in order to set the mazeType variable in the Component's state.*/
  selectMazeType(maze) {
    this.setState({ mazeType: maze });
  }
  /**Call in order to set the start variable in the Component's state.*/
  selectMazeStart(start) {
    this.setState({ start: start });
  }
  /**Call in order to set the end variable in the Component's state.*/
  selectMazeEnd(end) {
    this.setState({ end: end });
  }
  /**Call in order to set the placingStart variable in the Component's state.*/
  selectPlacingStart(placingStart) {
    this.setState({ placingStart: placingStart, placingEnd: false });
  }
  /**Call in order to set the placingEnd variable in the Component's state.*/
  selectPlacingEnd(placingEnd) {
    this.setState({ placingEnd: placingEnd, placingStart: false });
  }
  // componentDidMount() {
  //   console.log(this.bodyRef.current.mazeRef.current);
  //   // const navbar = ReactDOM.findDOMNode(
  //   //   this.navbarRef.current
  //   // ).getBoundingClientRect();
  //   // const body = ReactDOM.findDOMNode(
  //   //   this.bodyRef.current
  //   // ).getBoundingClientRect();
  //   // console.log("Navbar:", navbar);
  //   // console.log(("Body:", body));
  // }

  /**Returns True if the click event happened inside the maze's rectangle.
   * Otherwise, return false.  */
  clickInTheMaze(event, mazeRect) {
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;
    const x = event.pageX - offsetX;
    const y = event.pageY - offsetY;

    return (
      y > mazeRect.top &&
      y < mazeRect.top + mazeRect.height &&
      x > mazeRect.left &&
      x < mazeRect.left + mazeRect.width
    );
  }
  /**Check whether the click event that just happened, took place inside
   * The maze component or not. Can only be used after the maze component
   * has been mounted onto the DOM.*/
  checkClickPosition(e) {
    // First, make sure maze has been set.
    if (this.state.maze.length > 0) {
      // If the maze has been set, fetch its bounding Rectangle.
      const maze = ReactDOM.findDOMNode(
        this.bodyRef.current.mazeRef.current
      ).getBoundingClientRect();
      if (
        !this.clickInTheMaze(e, maze) &&
        (this.state.placingStart || this.state.placingEnd)
      ) {
        // A click event happened OUTSIDE the maze area: set
        // placingStart and placingEnd to false.
        this.setState({ placingStart: false, placingEnd: false });
      }
    }
  }
  /**Handles the event of a maze element being clicked.*/
  onElementClick(x, y) {
    let { start, placingStart, end, placingEnd, maze } = this.state;

    if (placingStart) {
      // placingStart === true. That means we are placing the start
      // element. Make the Clicked element the starting Node by setting
      // its value to 2. If a starting node already exists, remove the
      // previous one.
      if (start.length > 0) {
        // A start node already exists. Remove it.
        maze[start[0]][start[1]] = 1;
        start = [];
      }
      // Check if the clicked element is an end node
      if (x === end[0] && y === end[1]) {
        // Delete the end node.
        end = [];
        maze[x][y] = 1;
      }
      // Set the new start node on the maze grid.
      maze[x][y] = 2;
      // Store start position in the state.
      start = [x, y];
      // Update the state with the new changes.
      this.setState({
        maze: maze,
        start: start,
        end: end,
        placingStart: false,
      });
    } else if (placingEnd) {
      // placingEnd === true. That means we are placing the end
      // element. Make the Clicked element the end Node by setting
      // its value to 3. If an end node already exists, remove the
      // previous one.
      if (end.length > 0) {
        // A start node already exists. Remove it.
        maze[end[0]][end[1]] = 1;
        end = [];
      }
      // Check if the clicked element is a start node
      if (x === start[0] && y === start[1]) {
        // Delete the end node.
        start = [];
        maze[x][y] = 1;
      }
      // Set the new end node on the maze grid.
      maze[x][y] = 3;
      // Store end position in the state.
      end = [x, y];
      // Update the state with the new changes.
      this.setState({ maze: maze, end: end, start: start, placingEnd: false });
    } else {
      // Check if the clicked element is a start element.
      if (x === start[0] && y === start[1]) {
        // Make the clicked element a white element.
        maze[x][y] = 1;
        // Delete start node.
        start = [];
        this.setState({ maze: maze, start: start });
      }
      // Check if the clicked element is an end element.
      else if (x === end[0] && y === end[1]) {
        // Make the clicked element a white element.
        maze[x][y] = 1;
        // Delete start node.
        end = [];
        this.setState({ maze: maze, end: end });
      } else {
        // Clicked Element is black or white. Just switch
        // their color from black to white, and vice versa.
        maze[x][y] = maze[x][y] === 1 ? 0 : 1;
        this.setState({ maze: maze });
      }
    }
  }

  onElementHover(x, y, event) {
    let { maze } = this.state.maze;
    if (maze[x][y] === 1 && event.buttons > 0) {
    }
  }

  handleOnMouseDown(e) {
    this.setState((curState) => {
      return {
        mouseDown: ++curState.mouseDown,
      };
    });
  }

  handleOnMouseUp(e) {
    this.setState((curState) => {
      return {
        mouseDown: --curState.mouseDown,
      };
    });
  }

  render() {
    return (
      <div
        className="MazeSolverApp"
        onClick={this.checkClickPosition}
        // onMouseDown={this.handleOnMouseDown}
        // onMouseUp={this.handleOnMouseUp}
      >
        <Navbar
          ref={this.navbarRef}
          selectGridSize={this.selectGridSize}
          selectMazeType={this.selectMazeType}
          generateMaze={this.generateMaze}
        />
        <Body
          ref={this.bodyRef}
          errors={this.state.errors}
          maze={this.state.maze}
          placingStart={this.state.placingStart}
          placingEnd={this.state.placingEnd}
          deleteErrorMessage={this.deleteErrorMessage}
          onElementClick={this.onElementClick}
          generatingMaze={this.state.generatingMaze}
          selectAlgorithm={this.selectAlgorithm}
          selectPlacingStart={this.selectPlacingStart}
          selectPlacingEnd={this.selectPlacingEnd}
          solveMaze={this.solveMaze}
        />
      </div>
    );
  }
}

export default MazeSolverApp;
