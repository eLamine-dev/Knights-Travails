import boardContainer from './boardView.js';
import { createBoard, knightMoves } from './knightTravails.js';

document.addEventListener('DOMContentLoaded', () => {
   let board = new boardContainer();
   document.getElementById('game-container').prepend(board);
   document.getElementById('game-container').addEventListener('click', (ev) => {
      if (
         ev.target.id === 'go-btn' &&
         board.querySelector('.start') &&
         board.querySelector('.end')
      ) {
         let start = board.querySelector('.start').getAttribute('coords');
         let end = board.querySelector('.end').getAttribute('coords');
         let path = knightMoves(JSON.parse(start), JSON.parse(end));
         showResult(path);
         board.highlightPath(path);
      }
      if (ev.target.id === 'reset-btn') {
         document.getElementById('result').innerHTML = '';
         board.reset();
      }
   });
});

function showResult(path) {
   let result = document.getElementById('result');
   let message = document.createElement('p');
   message.textContent = `You made it in ${path.length} moves!  Here's your path:`;
   let movesList = document.createElement('ol');
   path.forEach((move) => {
      let moveLi = document.createElement('li');
      moveLi.textContent = move;
      movesList.append(moveLi);
   });

   result.appendChild(message);
   result.appendChild(movesList);
   console.log(path);
}
