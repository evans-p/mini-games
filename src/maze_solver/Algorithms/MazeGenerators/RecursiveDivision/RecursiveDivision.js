const recursiveDivision = (maze, startX, endX, startY, endY, pass) => {
  console.log(pass);
  // Select the orizontal and vertical lines.
  let orizontal = startX + 1 + Math.floor((endX - startX - 1) * Math.random());
  let vertical = startY + 1 + Math.floor((endY - startY - 1) * Math.random());
  if (pass !== undefined) {
    while (orizontal === pass[0][0]) {
      orizontal = startX + 1 + Math.floor((endX - startX - 1) * Math.random());
    }
    while (vertical === pass[1][1]) {
      vertical = startY + 1 + Math.floor((endY - startY - 1) * Math.random());
    }
  }

  for (let i = startX; i <= endX; i++) {
    maze[i][vertical] = 0;
  }

  for (let j = startY; j <= endY; j++) {
    maze[orizontal][j] = 0;
  }
  let passages = [
    [orizontal, startY + Math.floor((vertical - startY) * Math.random())],
    [
      orizontal,
      vertical + 1 + Math.floor((endY - vertical - 1) * Math.random()),
    ],
    [startX + Math.floor((orizontal - startX) * Math.random()), vertical],
    [
      orizontal + 1 + Math.floor((endX - orizontal - 1) * Math.random()),
      vertical,
    ],
  ];

  for (const passage of passages) {
    maze[passage[0]][passage[1]] = 1;
  }
  let baseCase = 2;
  let paramPass = [];

  if (orizontal - startX > baseCase && vertical - startY > baseCase) {
    paramPass = [passages[2], passages[0]];
    recursiveDivision(
      maze,
      startX,
      orizontal - 1,
      startY,
      vertical - 1,
      paramPass
    );
  }
  if (endX - orizontal > baseCase && vertical - startY > baseCase) {
    paramPass = [passages[3], passages[0]];
    recursiveDivision(
      maze,
      orizontal + 1,
      endX,
      startY,
      vertical - 1,
      paramPass
    );
  }
  if (orizontal - startX > baseCase && endY - vertical > baseCase) {
    paramPass = [passages[2], passages[1]];
    recursiveDivision(
      maze,
      startX,
      orizontal - 1,
      vertical + 1,
      endY,
      paramPass
    );
  }
  if (endX - orizontal > baseCase && endY - vertical > baseCase) {
    paramPass = [passages[3], passages[1]];
    recursiveDivision(maze, orizontal + 1, endX, vertical + 1, endY, paramPass);
  }
};

export default recursiveDivision;
