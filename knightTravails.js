function intToLetter(int) {
   return String.fromCharCode(int + 97).toUpperCase();
}

export function createBoard() {
   let board = new Map();
   for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
         board.set(`${intToLetter(i)}-${j}`, {
            x: i,
            y: j,
            visited: false,
            previousMove: null,
         });
      }
   }

   return board;
}

function createKnight(board) {
   let possibleMoves = [];
   let getPossibleMoves = (x, y) => {
      let knightOffsets = [
         [x + 2, y + 1],
         [x + 2, y - 1],
         [x - 2, y + 1],
         [x - 2, y - 1],
         [x + 1, y + 2],
         [x + 1, y - 2],
         [x - 1, y + 2],
         [x - 1, y - 2],
      ];

      knightOffsets.forEach((offset) => {
         let move = `${intToLetter(offset[0])}-${offset[1]}`;
         if (board.has(move)) possibleMoves.push(move);
      });
      return possibleMoves;
   };

   return { getPossibleMoves };
}

export function knightMoves(start, end) {
   let myBoard = createBoard();
   console.log(myBoard);
   let myKnight = createKnight(myBoard);
   let startPosition = `${intToLetter(start[0])}-${start[1]}`;
   let queue = [startPosition];

   let testedMoves = [];

   while (queue.length > 0) {
      let currentMove = queue.shift();
      let x = myBoard.get(currentMove).x;
      let y = myBoard.get(currentMove).y;
      myBoard.get(currentMove).visited = true;
      if (x === end[0] && y === end[1]) {
         testedMoves.push(currentMove);
         break;
      }
      let possibleMoves = myKnight.getPossibleMoves(x, y);
      possibleMoves.forEach((move) => {
         if (!myBoard.get(move).visited) {
            myBoard.get(move).visited = true;
            myBoard.get(move).previousMove = currentMove;
            testedMoves.push(move);
            queue.push(move);
         }
      });
   }

   let path = [];
   let target = `${intToLetter(end[0])}-${end[1]}`;
   while (testedMoves.includes(target)) {
      path.push(target);
      target = myBoard.get(target).previousMove;
   }

   return path.reverse();
}

let result = knightMoves([0, 0], [7, 7]);

console.log(`The shortest path was ${result.length} moves!`);
console.log('The moves were:');
result.forEach((move) => console.log(move));
