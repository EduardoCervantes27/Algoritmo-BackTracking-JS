'use strict'

let maze = [
    ['*', '*', '*', '*', '*', '*', ' ' , '*', '*', '*'],
    ['*', ' ', '*', ' ', ' ', ' ', ' ' , ' ', ' ', '*'],
    ['*', ' ', ' ', ' ', '*', ' ', ' ' , '*', ' ', '*'],
    ['*', '*', '*', '*', ' ', ' ', '*' , '*', '*', '*'],
    ['*', ' ', ' ', ' ', ' ', '*', ' ' , ' ', ' ', '*'],
    ['*', ' ', '*', '*', '*', '*', ' ' , '*', ' ', '*'],
    ['*', ' ', ' ', ' ', ' ', '*', ' ' , '*', ' ', '*'],
    ['*', '*', ' ', '*', '*', '*', ' ' , '*', ' ', '*'],
    ['*', ' ', ' ', ' ', ' ', ' ', ' ' , '*', ' ', '*'],
    ['*', '*', '*', '*', '*', '*', '*' , '*', 'e', '*'],
];

var contenedor_laberinto = document.querySelector(".laberinto-cuerpo");

for (var i = 0; i < maze.length; i++) {
    for (var j = 0; j < maze.length; j++) {
        if (maze[i][j] == '*') {
            var cuadrito = document.createElement("div");
            cuadrito.classList.add("muro");
            contenedor_laberinto.append(cuadrito);
        }
        if (maze[i][j] == ' ' || maze[i][j] == 'e') {
            var cuadrito = document.createElement("div");
            cuadrito.classList.add("pasillo");
            contenedor_laberinto.append(cuadrito);
        }
    }
}

// One way maze solution
function mazeSolver(maze, row, column, count) {
    var casilla = document.querySelector(".pasillo");
    count++;
    if (count === 20) {
        return "lost";
    }
    if (maze[row][column] === "e") {
        return "";
    }
    if (
        column < maze[0].length - 1 &&
        maze[row][column + 1] != "*" &&
        maze[row][column + 1] != "x"
    ) {
        maze[row][column] = "x";
        return "R" + mazeSolver(maze, row, column + 1, count);
    }
    if (
        row < maze.length - 1 &&
        maze[row + 1][column] != "*" &&
        maze[row + 1][column] != "x"
    ) {
        maze[row][column] = "x";
        return "D" + mazeSolver(maze, row + 1, column, count);
    }
    if (
        column > 0 &&
        maze[row][column - 1] != "*" &&
        maze[row][column - 1] != "x"
    ) {
        maze[row][column] = "x";
        return "L" + mazeSolver(maze, row, column - 1, count);
    }
    if (row > 0 && maze[row - 1][column] != "*" && maze[row - 1][column] != "x") {
        maze[row][column] = "x";
        return "U" + mazeSolver(maze, row - 1, column, count);
    }
}

/* console.log(mazeSolver(maze, 0, 6, 0)); */

// All solutions

function allMazeSolver(maze, row, column, path = "") {
    // check for edges of maze
    if (
        row < 0 ||
        column < 0 ||
        maze.length <= row ||
        maze[row].length <= column
    ) {
        return;
    }
    // check for walls or previously visited positions
    if (maze[row][column] == "*") {
        return;
    }

    if (maze[row][column] == "e") {
        return console.log("exit found", path);
    }
    maze[row][column] = "*";
    allMazeSolver(maze, row + 1, column, path + "d");
    allMazeSolver(maze, row, column + 1, path + "r");
    allMazeSolver(maze, row - 1, column, path + "u");
    allMazeSolver(maze, row, column - 1, path + "l");
    maze[row][column] = " ";
}

console.log(allMazeSolver(maze, 0, 6));
