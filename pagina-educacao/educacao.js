let currentCard = 1;

function showCard(cardNumber) {
  const totalCards = 3;
  const body = document.body;
  body.classList.remove('planejamento', 'reserva', 'investir');

  for (let i = 1; i <= totalCards; i++) {
    const card = document.getElementById(`card${i}`);
    if (i === cardNumber) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  }

  switch (cardNumber) {
    case 1:
      body.classList.add('planejamento');
      break;
    case 2:
      body.classList.add('reserva');
      break;
    case 3:
      body.classList.add('investir');
      break;
  }
}

function nextCard() {
  const totalCards = 3;
  currentCard = currentCard < totalCards ? currentCard + 1 : 1;
  showCard(currentCard);
}

function previousCard() {
  const totalCards = 3;
  currentCard = currentCard > 1 ? currentCard - 1 : totalCards;
  showCard(currentCard);
}

showCard(currentCard);
