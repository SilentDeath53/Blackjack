var deck = [
    { value: '2', symbol: '♥' },
    { value: '2', symbol: '♦' },
    { value: '2', symbol: '♠' },
    { value: '2', symbol: '♣' },
    // Other cards can be added here...
];

var playerHand = [];
var computerHand = [];

function shuffle() {
    var currentIndex = deck.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = deck[currentIndex];
        deck[currentIndex] = deck[randomIndex];
        deck[randomIndex] = temporaryValue;
    }
}

function dealInitialCards() {
    shuffle();
    playerHand.push(deck.pop());
    computerHand.push(deck.pop());
    playerHand.push(deck.pop());
    computerHand.push(deck.pop());
}

function calculateHandValue(hand) {
    var totalValue = 0;
    var hasAce = false;

    for (var i = 0; i < hand.length; i++) {
        var card = hand[i];
        if (card.value === 'A') {
            hasAce = true;
        }
        totalValue += getValue(card.value);
    }

    if (hasAce && totalValue + 10 <= 21) {
        totalValue += 10;
    }

    return totalValue;
}

function getValue(value) {
    if (value === 'A') {
        return 1;
    } else if (value === 'K' || value === 'Q' || value === 'J') {
        return 10;
    } else {
        return parseInt(value);
    }
}

function playerTurn() {
    var decision = prompt('Enter "hit" to take a card or "stay" to keep your hand:');
    if (decision.toLowerCase() === 'hit') {
        playerHand.push(deck.pop());
        displayHands();
        if (calculateHandValue(playerHand) <= 21) {
            playerTurn();
        } else {
            endGame();
        }
    } else if (decision.toLowerCase() === 'stay') {
        computerTurn();
    } else {
        alert('Invalid choice. Please enter either "hit" or "stay".');
        playerTurn();
    }
}

function computerTurn() {
    while (calculateHandValue(computerHand) < 17) {
        computerHand.push(deck.pop());
    }
    endGame();
}

function endGame() {
    var playerValue = calculateHandValue(playerHand);
    var computerValue = calculateHandValue(computerHand);

    var message = 'Player: ' + playerValue + '\nComputer: ' + computerValue + '\n\n';

    if (playerValue > 21) {
        message += 'Player loses!';
    } else if (computerValue > 21) {
        message += 'Player wins!';
    } else if (playerValue > computerValue) {
        message += 'Player wins!';
    } else if (playerValue < computerValue) {
        message += 'Player loses!';
    } else {
        message += 'It\'s a tie!';
    }

    alert(message);
    resetGame();
}

function resetGame() {
    playerHand = [];
    computerHand = [];
    dealInitialCards();
    playGame();
}

function displayHands() {
    var playerValue = calculateHandValue(playerHand);
    var computerValue = calculateHandValue(computerHand);

    var playerCards = 'Player Cards: ';
    for (var i = 0; i < playerHand.length; i++) {
        playerCards += playerHand[i].value + playerHand[i].symbol + ' ';
    }

    var computerCards = 'Computer Cards: ';
    for (var j = 0; j < computerHand.length; j++) {
        computerCards += computerHand[j].value + computerHand[j].symbol + ' ';
    }

    alert(playerCards + '\n\n' + computerCards + '\n\nPlayer Hand Value: ' + playerValue);
}

function playGame() {
    displayHands();
    playerTurn();
}

dealInitialCards();

playGame();
