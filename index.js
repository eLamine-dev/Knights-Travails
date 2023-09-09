import boardView from './boardView.js';
import { createBoard, knightMoves } from './knightTravails.js';

document.addEventListener('DOMContentLoaded', () => {
   let board = boardView(createBoard());
   document.body.appendChild(board);
});
