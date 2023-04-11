import { cardArray } from "./cardData.js";

/**
 * @todo Fix bug: If you click the card to fast, it push two cards in the array, and see is as 'one pair'. 
 */

export default function memoryGame() {
	const imagesContainer = document.querySelector('.grid__container');
	const resultContainer = document.querySelector('.game__result');
	let cardsChosen = [];
	let cardsChosenIds = [];
	const cardsMatched = [];

	cardArray.sort(() => 0.5 - Math.random());

	function createGameBoard() {
		for(let card = 0; card < cardArray.length ; card++) {
			renderHTML(card);
		}
	}

	function renderHTML(card) {
			const memoryCard = document.createElement('img');

			// Also adds an eventlistener to each card
			memoryCard.addEventListener('click', flipCard);

			memoryCard.classList.add('memory__card');
			imagesContainer.appendChild(memoryCard);
			memoryCard.setAttribute('src', './_app/assets/sprites/pink-shade-blob.png');
			memoryCard.setAttribute('data-id', card)
	}

	function flipCard() {
		let cardId = this.getAttribute('data-id');
		this.setAttribute('src', cardArray[cardId].image);

		cardsChosen.push(cardArray[cardId].name);
		cardsChosenIds.push(cardId);

		if(cardsChosen.length === 2) {
			setTimeout(checkMatch, 500);
		}
	}

	function checkMatch() {
		const allMemoryCards = document.querySelectorAll('.memory__card');

		if(cardsChosen[0] === cardsChosen[1]) {
			allMemoryCards[cardsChosenIds[0]].setAttribute('src', './_app/assets/sprites/red-blob.png');
			allMemoryCards[cardsChosenIds[1]].setAttribute('src', './_app/assets/sprites/red-blob.png')

			allMemoryCards[cardsChosenIds[0]].removeEventListener('click', flipCard);
			allMemoryCards[cardsChosenIds[1]].removeEventListener('click', flipCard);

			cardsMatched.push(cardsChosen);
		} else {
			allMemoryCards[cardsChosenIds[0]].setAttribute('src', './_app/assets/sprites/pink-shade-blob.png');
			allMemoryCards[cardsChosenIds[1]].setAttribute('src', './_app/assets/sprites/pink-shade-blob.png');

		}

		cardsChosen = [];
		cardsChosenIds = [];

		if (cardsMatched.length === cardArray.length/2) {
			const youWin = document.createElement('div');
			youWin.classList.add('result__win');
			youWin.innerText = 'Congrats, good memory';
			resultContainer.appendChild(youWin)
		}
	}

	createGameBoard()
}	