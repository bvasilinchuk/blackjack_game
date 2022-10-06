let player = {
    name: "Your money",
    chips: 1000
};

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let cardsOpened = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");
let gameResult = document.getElementById("game-result")

playerEl.textContent = player.name + ": $" + player.chips;

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1;
    if (randomNumber > 10) {
        return 10;
    } else if (randomNumber === 1) {
        return 11;
    } else {
        return randomNumber;
    }
}

function startGame() {
    gameResult.innerText = ""
    isAlive = true;
    cardsOpened = false;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
}

function renderGame() {
    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }
    
    sumEl.textContent = "Sum: " + sum;
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
    } else {
        message = "You're out of the game!";
        openCards()
        isAlive = false;
        
        console.log("checking...")
    }
    messageEl.textContent = message;
}


function newCard() {
    if (isAlive === true && hasBlackJack === false && cardsOpened === false) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame()        ;
    }
}


function openCards() {
    if(isAlive === true && cardsOpened === false){
        cardsOpened = true;
        // creating oponent cards
        let firtsCards = getRandomCard() + getRandomCard();
        while (firtsCards < 15){
            firtsCards += getRandomCard();
        }
        if(sum > firtsCards || firtsCards > 21){
            if(sum < 22){
            gameResult.innerText = "Conratulations! You Won! Your opponent's cards were " + firtsCards;
            player.chips += 100;
            }
        } else if(sum > 21 && firtsCards > 21){
            gameResult.innerText = "You both had same cards! It's even. Your opponent's cards were " + firtsCards;
        } else{
            gameResult.innerText = "You lost this game! Your opponent's cards were " + firtsCards;
            player.chips -= 100;
        }Í



        playerEl.textContent = player.name + ": $" + player.chips;
    }
}