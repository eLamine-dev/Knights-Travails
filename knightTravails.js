function intToLetter(int) {
   return String.fromCharCode(int + 97).toUpperCase();
}
function createBoard() {
   let board = new Map();
   for (let i = 0; i < 8; i++) {
      // var iLetter = String.fromCharCode(i + 97).toUpperCase();
      for (let j = 0; j < 8; j++) {
         board.set(`${intToLetter(i)}-${j}`, {
            x: i,
            y: j,
            visited: false,
            previousMove: null,
         });
         // board[`${iLetter}-${j}`] = { x: i, y: j, visited: false };
      }
   }

   return board;
}

// let myBoard = createBoard();
// console.log(myBoard);

function createKnight(board) {
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
      let possibleMoves = [];
      knightOffsets.forEach((offset) => {
         let move = `${intToLetter(offset[0])}-${offset[1]}`;
         if (board.has(move)) possibleMoves.push(move);
      });
      return possibleMoves;
   };

   return { getPossibleMoves };
}

function knightTravails(start, end) {
   let myBoard = createBoard();
   let myKnight = createKnight(myBoard);

   let queue = [`${intToLetter(start[0])}-${start[1]}`];

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

let result = knightTravails([0, 0], [7, 7]);

console.log(`The shortest path was ${result.length} moves!`);
console.log('The moves were:');
result.forEach((move) => console.log(move));

// tree.levelOrder = (callBack) => {
//    let queue = [];
//    queue.push(tree.root);
//    let array = [];

//    const levelOrderRec = (node) => {
//       if (node === null) return;
//       else if (queue.length > 0) {
//          let currentNode = queue.shift();

//          callBack ? callBack(currentNode) : array.push(currentNode.data);

//          if (node.left !== null) queue.push(node.left);
//          if (node.right !== null) queue.push(node.right);
//          levelOrderRec(queue[0]);
//       }
//       if (!callBack) return array;
//    };

//    return levelOrderRec(queue[0]);
// };

// // non recursive levelOrder
// tree.levelOrder2 = (callBack) => {
//    if (tree.root === null) return;
//    let queue = [];
//    queue.push(tree.root);
//    let array = [];

//    while (queue.length > 0) {
//       let currentNode = queue.shift();
//       callBack ? callBack(currentNode) : array.push(currentNode.data);
//       if (currentNode.left !== null) queue.push(currentNode.left);
//       if (currentNode.right !== null) queue.push(currentNode.right);
//    }

//    if (!callBack) return array;
// };
