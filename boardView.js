export default function boardView() {
   let board = document.createElement('div');
   board.id = 'board';
   for (let i = 0; i < 8; i++) {
      let row = document.createElement('div');
      row.classList.add('board-row');
      board.prepend(row);

      for (let j = 0; j < 8; j++) {
         let square = document.createElement('div');
         square.id = `${i}-${j}`;
         square.classList.add('square');
         square.innerText = `${i}-${j}`;
         if ((i + j) % 2 == 0) square.classList.add('light');
         else square.classList.add('dark');

         row.appendChild(square);
      }
   }

   board.addEventListener(
      'click',
      (e) => {
         if (e.target.classList.contains('square')) {
            placeKnight(e.target);
         }

         listenForTarget();
      },
      { once: true }
   );

   function listenForTarget() {
      board.addEventListener(
         'click',
         (e) => {
            if (e.target.classList.contains('square')) {
               target.classList.add('target');
            }
         },
         { once: true }
      );
   }

   function placeKnight(target) {
      let knight = document.createElement('i');
      knight.classList.add('fa-solid fa-chess-knight');
      target.appendChild(knight);
   }

   return board;
}
