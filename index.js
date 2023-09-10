import boardView from './boardView.js';
import { createBoard, knightMoves } from './knightTravails.js';

document.addEventListener('DOMContentLoaded', () => {
   let board = boardView(createBoard());
   document.getElementById('game-container').prepend(board);
   document.getElementById('game-container').addEventListener('click', (ev) => {
      if (ev.target.id === 'go-btn') {
         showResult();
      }
      if (ev.target.id === 'reset-btn') {
         board.reset();
      }
   });
});

function showResult() {
   let start = document.querySelector('.square.start').id;
   let end = document.querySelector('.square.end').id;
   let board = document.getElementById('board');
   let result = document.getElementById('result');
   let moves = knightMoves(start, end);
   if (moves.length === 0) {
      result.textContent = 'No possible moves';
   } else {
      result.textContent = `Moves: ${moves.join(', ')}`;
   }
   board.highlight(moves);
}
