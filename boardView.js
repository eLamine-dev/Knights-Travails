function intToLetter(int) {
   return String.fromCharCode(int + 96).toUpperCase();
}

class boardContainer extends HTMLElement {
   connectedCallback() {
      this.board = document.createElement('div');
      this.render(this.board);
   }

   render(board) {
      board.id = 'board';
      for (let i = 1; i <= 8; i++) {
         let column = document.createElement('div');
         column.classList.add('board-col');
         board.appendChild(column);

         for (let j = 1; j <= 8; j++) {
            let square = document.createElement('div');
            square.setAttribute('coords', JSON.stringify([i, j]));
            square.id = `${intToLetter(i)}-${j}`;
            square.classList.add('square');
            // square.innerText = `${intToLetter(i)}-${j}`;
            if ((i + j) % 2 === 0) square.classList.add('dark');
            else square.classList.add('light');

            column.prepend(square);
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

      this.classList.add('board-container');
      this.appendChild(lettersRowTop);
      this.appendChild(numbersColLeft);
      this.appendChild(board);
      this.appendChild(numbersColRight);
      this.appendChild(lettersRowBottom);

      this.listenForKnight(board);
   }

   reset() {
      this.board.classList.remove('knight-placed');
      this.board.classList.remove('target-placed');
      this.board.querySelectorAll('.square').forEach((square) => {
         square.classList.remove('start');
         square.classList.remove('end');
         square.classList.remove('knight');
         square.classList.remove('knight-path');
         square.innerText = '';
      });
      this.listenForKnight();
   }

   highlightPath(path) {
      function showPath(position, endPosition, i) {
         let square = document.getElementById(position);
         if (square.classList.contains('end')) {
            square.classList.remove('end');
         }
         square.classList.add('knight');
         setTimeout(() => {
            if (position !== endPosition) {
               square.classList.remove('knight');
               square.classList.add('knight-path');
               square.innerText = i + 1;
            }
         }, 800);
      }

      for (let i = 0; i < path.length; i++) {
         setTimeout(() => {
            if (i === 0) {
               let startSquare = document.querySelector('.square.start');
               startSquare.classList.remove('start');
               startSquare.classList.add('knight-path');
               startSquare.innerText = 0;
            }
            showPath(path[i], path[path.length - 1], i);
         }, 1000 + i * 800);
      }
   }

   listenForKnight() {
      this.board.addEventListener(
         'click',
         (e) => {
            if (e.target.classList.contains('square')) {
               e.target.classList.add('start');
               this.board.classList.add('knight-placed');
            }
            this.listenForTarget();
         },
         { once: true }
      );
   }

   listenForTarget() {
      this.board.addEventListener(
         'click',
         (e) => {
            this.board.classList.add('target-placed');
            if (e.target.classList.contains('square')) {
               e.target.classList.add('end');
            }
         },
         { once: true }
      );
   }
}

customElements.define('board-container', boardContainer);
export default boardContainer;
