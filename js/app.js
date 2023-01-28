//? [**GAME SHOW APP**]

// *GLOBAL VARIABLES
const keys = document.getElementById('qwerty');
const phrase = document.querySelector('#phrase ul');
const gameBoard = document.getElementById('overlay');
const startGame = document.querySelector('.btn__reset');
const title = document.querySelector('.title');

// *SET MISSES TO 0 (UP TO 5 MISSES)
let misses = '0';

// *HOLDS LIVES AND HEART IMAGES
const lives = document.querySelectorAll('.tries img');

// *ARRAY TO HOLD PHRASES
const phrases = [
    "wheel of success",
    "javascript",
    "practice coding",
    "web designer",
    "trust the process",
    "have fun"
];

// *RETURNS A RANDOM PHRASE FROM ARRAY SPLIT BY CHARACTERS
const getRandomPhraseAsArray = phrasesAarry => {
    const randomPhrases = phrasesAarry[Math.floor(Math.random() * phrasesAarry.length)]
        .split('');
    return randomPhrases;
};

// *ADD LETTERS FROM PHRASES TO DISPLAY RANDOMLY
const addPhraseToDisplay = phrasesSplitByChar => {
    for (let i = 0; i < phrasesSplitByChar.length; i++) {
        const phraseItem = document.createElement('li');
        if (phrasesSplitByChar[i] === ' ') {
            phraseItem.classList.add('space');
        } else {
            phraseItem.classList.add('letter');
        }
        phraseItem.innerHTML = phrasesSplitByChar[i];
        phrase.appendChild(phraseItem);
    }
};


// *VARIABLE TO HOLD PHRASES PASSED IN RANDOM PHRASE ARRAY
const newPhrase = getRandomPhraseAsArray(phrases);

// *EVENT LISTENER TO START GAME ON CLICK
startGame.addEventListener('click', () => {
    resetGame();
    gameBoard.style.display = 'none';
    addPhraseToDisplay(newPhrase);
});

// *LISTENS FOR KEYBOARD LETTERS TO BE CLICKED
keys.addEventListener('click', (key) => {
    if (key.target.tagName === 'BUTTON') {
        key.target.className = 'chosen';
        key.target.disabled = true;

        // if no matches found, remove heart
        if (checkLetter(key.target.textContent) == null) {
            lives[misses].src = 'images/lostHeart.png';
            misses++;
        }
        checkWin();
    }
});

// *CHECKS IF LETTER IS IN PHRASE
const checkLetter = buttonClicked => {
    let checkLetter = document.querySelectorAll('.letter');
    let letterFound = null;

    for (let i = 0; i < checkLetter.length; i++) {
        if (checkLetter[i].textContent === buttonClicked) {
            letterFound = buttonClicked;
            checkLetter[i].classList.add('show');
            checkLetter[i].style.transition = '.8s ease-in-out';
        }
    }
    return letterFound;
};

// *CHECKS IF GAME IS WON OR LOST
const checkWin = () => {
    let letter = document.querySelectorAll('.letter');
    let showLetters = document.querySelectorAll('.show');
    let win = null;

    if (letter.length === showLetters.length) {
        gameBoard.className = 'win';
        gameBoard.style.display = 'flex';
        title.textContent = "🎊We Have A Winner!🎊";
        startGame.innerText = 'Play Again🤷‍♂️';
        win = true;
        return win;
    } else if (misses > 4) {
        title.innerText = '🍀Maybe next time!';
        startGame.innerText = 'Play Again🤷‍♂️';
        gameBoard.className = 'lose';
        gameBoard.style.display = 'flex';
        win = false;
        return win;
    }
}

// *RESET GAME FUNCTION
function resetGame() {
    misses = 0;
    phrase.textContent = '';
    const letterBtn = document.querySelectorAll('.chosen');

    for (let i = 0; i < letterBtn.length; i++) {
        letterBtn[i].classList.remove('chosen');
        letterBtn[i].disabled = false;
    }

    for (let i = 0; i < lives.length; i++) {
        lives[i].src = 'images/liveHeart.png';
    }
}