import boardContainer from './boardView.js';
import knightMoves from './knightTravails.js';

document.addEventListener('DOMContentLoaded', () => {
   let board = new boardContainer();
   let gameContainer = document.getElementById('game-container');
   gameContainer.prepend(board);
   gameContainer.addEventListener('click', (ev) => {
      if (
         ev.target.id === 'go-btn' &&
         board.querySelector('.start') &&
         board.querySelector('.end')
      ) {
         let start = board.querySelector('.start').getAttribute('coords');
         let end = board.querySelector('.end').getAttribute('coords');
         let path = knightMoves(JSON.parse(start), JSON.parse(end));
         board.highlightPath(path);
      }
      if (ev.target.id === 'reset-btn') {
         board.reset();
      }
   });
});
