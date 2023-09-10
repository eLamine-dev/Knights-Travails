export default function boardView() {
   let board = document.createElement('div');
   board.id = 'board';
   for (let i = 1; i <= 8; i++) {
      let row = document.createElement('div');
      row.classList.add('board-row');
      board.prepend(row);

      for (let j = 1; j <= 8; j++) {
         let square = document.createElement('div');
         square.setAttribute('value', JSON.stringify([i, j]));
         square.id = `${i}-${j}`;
         square.classList.add('square');
         // square.innerText = `${i}-${j}`;
         if ((i + j) % 2 == 0) square.classList.add('dark');
         else square.classList.add('light');

         row.appendChild(square);
      }
   }

   let lettersRowTop = document.createElement('div');
   lettersRowTop.classList.add('lettersRow');
   let numbersColLeft = document.createElement('div');
   numbersColLeft.classList.add('numbersCol');

   for (let i = 1; i <= 8; i++) {
      let letter = document.createElement('div');
      letter.classList.add('coordinate');
      letter.innerText = String.fromCharCode(96 + i).toUpperCase();
      lettersRowTop.appendChild(letter);

      let number = document.createElement('div');
      number.classList.add('coordinate');
      number.innerText = i;
      numbersColLeft.prepend(number);
   }

   let lettersRowBottom = lettersRowTop.cloneNode(true);
   let numbersColRight = numbersColLeft.cloneNode(true);

   board.addEventListener(
      'click',
      (e) => {
         board.classList.add('knight-placed');

         if (e.target.classList.contains('square')) {
            e.target.classList.add('start');
         }

         listenForTarget();
      },
      { once: true }
   );

   function listenForTarget() {
      board.addEventListener(
         'click',
         (e) => {
            board.classList.add('target-placed');
            if (e.target.classList.contains('square')) {
               e.target.classList.add('end');
            }
         },
         { once: true }
      );
   }

   function placeKnight(target) {
      let knight = document.createElement('i');
      knight.classList.add('fa-solid');
      knight.classList.add('fa-chess-knight');
      target.appendChild(knight);
   }

   let boardContainer = document.createElement('div');
   boardContainer.classList.add('board-container');
   boardContainer.appendChild(lettersRowTop);
   boardContainer.appendChild(numbersColLeft);
   boardContainer.appendChild(board);
   boardContainer.appendChild(numbersColRight);
   boardContainer.appendChild(lettersRowBottom);

   return boardContainer;
}
