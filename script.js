const board = document.querySelector('section');
const score = document.querySelector('.score');
const pairs = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let selectedCards = [];
let scoreCount = 0;

score.innerText = scoreCount;

const shuffle = () => pairs.sort(() => Math.random() - 0.5);

const win = () => {
  alert("Parabéns, você completou o jogo! A página será reiniciada para tentar novamente!");
  document.location.reload(true);
};

const isMatch = ({target}) => {
  if(target.classList.contains('open')) return;
  target.classList.add('open');
  selectedCards.push(target);
  if (selectedCards.length > 1) {
    const card1 = selectedCards[0];
    const card2 = selectedCards[1];
    if (card1.dataset.value === card2.dataset.value) {
      scoreCount = scoreCount + 1;
      score.innerText = scoreCount;
      selectedCards = [];
    } else {
      selectedCards = [];
      setTimeout(() => {
        card1.classList.remove('open');
        card2.classList.remove('open');
      }, 300)
    }
  }
  if (scoreCount == 8) {
    setTimeout(() => {
      win();
    }, 500)
  }
};

const createCards = (cards) => {
  cards.forEach((pair) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerText = pair;
    card.dataset.value = pair;
    card.addEventListener('click', isMatch);
    board.appendChild(card);
  });
};

const load = () => {
  const shuffledCards = shuffle();
  createCards(shuffledCards);
};

load();
