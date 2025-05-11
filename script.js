
    const emojis = ['😀', '🐶', '🍎', '🚗', '🎵', '🏀', '🌟', '🐱'];
    let cards = [];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matches = 0;
    let timerInterval;
    let seconds = 0;

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function startTimer() {
      seconds = 0;
      document.getElementById('timer').textContent = `⏱️ Time: ${seconds}s`;
      clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        seconds++;
        document.getElementById('timer').textContent = `⏱️ Time: ${seconds}s`;
      }, 1000);
    }

    function stopTimer() {
      clearInterval(timerInterval);
    }

    function createBoard() {
      cards = [...emojis, ...emojis];
      shuffle(cards);
      const board = document.getElementById('game-board');
      board.innerHTML = '';
      matches = 0;
      firstCard = null;
      secondCard = null;
      lockBoard = false;
      document.getElementById('message').textContent = '';

      cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.innerText = emoji;
        card.style.color = 'transparent';
        card.addEventListener('click', flipCard);
        board.appendChild(card);
      });

      startTimer();
    }

    function flipCard() {
      if (lockBoard || this.classList.contains('matched') || this === firstCard) return;

      this.classList.add('flipped');
      this.style.color = '#000';

      if (!firstCard) {
        firstCard = this;
        return;
      }

      secondCard = this;
      checkForMatch();
    }

    function checkForMatch() {
      const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
      if (isMatch) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
        matches++;
        if (matches === emojis.length) {
          gameWon();
        }
      } else {
        lockBoard = true;
        setTimeout(() => {
          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');
          firstCard.style.color = 'transparent';
          secondCard.style.color = 'transparent';
          resetBoard();
        }, 800);
      }
    }

    function resetBoard() {
      [firstCard, secondCard] = [null, null];
      lockBoard = false;
    }

    function gameWon() {
      stopTimer();
      document.getElementById('message').textContent =
        `🎉 Congratulations! You matched all emojis in ${seconds} seconds! 🎉`;
      const winAudio = document.getElementById('win-audio');
      winAudio.play();
    }

    document.getElementById('restart').addEventListener('click', createBoard);

    // Start the game initially
    createBoard();