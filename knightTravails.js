export function intToLetter(int) {
   return String.fromCharCode(int + 96).toUpperCase();
}

export function createBoard() {
   let board = new Map();
   for (let i = 1; i <= 8; i++) {
      for (let j = 1; j <= 8; j++) {
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

export default function knightMoves(start, end) {
   let board = createBoard();
   let knight = createKnight(board);
   let startPosition = `${intToLetter(start[0])}-${start[1]}`;
   let queue = [startPosition];

   while (queue.length > 0) {
      let currentMove = queue.shift();
      let x = board.get(currentMove).x;
      let y = board.get(currentMove).y;
      board.get(currentMove).visited = true;
      if (x === end[0] && y === end[1]) {
         break;
      }
      let possibleMoves = knight.getPossibleMoves(x, y);
      possibleMoves.forEach((move) => {
         if (!board.get(move).visited) {
            board.get(move).visited = true;
            board.get(move).previousMove = currentMove;

            queue.push(move);
         }
      });
   }

   let path = [];
   let target = `${intToLetter(end[0])}-${end[1]}`;
   while (target !== startPosition) {
      path.push(target);
      target = board.get(target).previousMove;
   }

   return path.reverse();
}
