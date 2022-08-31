function checkForBlanks(grid) {
  // # A function that loops through the grid searching for blank(zero) values.
  // # If at least one is found return True, else return False.

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] === 0) {
        return true;
      }
    }
  }
  return false;
}

function possible(grid, x, y, value) {
  // 	# this function checks if the blank(equal to zero) element of the grind
  // 	# on the position grid[x, y] can have a value of n. In other words check
  // 	# if grid[x, y]=n is a possibility. To do that, we check if at least one
  // 	# of row, the column and the 3x3 cell that the element belongs to has an
  // 	# element equal to n.
  for (let i = 0; i < grid.length; i++) {
    if (grid[x][i] === value && grid[x][i] > 0) {
      return false;
    }
    if (grid[i][y] === value && grid[i][y] > 0) {
      return false;
    }
  }

  const cr = 3 * Math.floor(x / 3);
  const cc = 3 * Math.floor(y / 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[cr + i][cc + j] === value && grid[cr + i][cc + j] > 0) {
        return false;
      }
    }
  }
  return true;
}

function sudokuRecursive(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] === 0) {
        for (let k = 1; k < 10; k++) {
          if (possible(grid, i, j, k)) {
            grid[i][j] = k;
            sudokuRecursive(grid);
            if (checkForBlanks(grid)) {
              grid[i][j] = 0;
            }
          }
        }
        return;
      }
    }
  }
}

export { sudokuRecursive };
