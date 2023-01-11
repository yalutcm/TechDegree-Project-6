//? [**GAME SHOW APP**]

const keys = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const gameBoard = document.getElementById('overlay');
const startGame = document.querySelector('.btn__reset');
const title = document.querySelector('.title');

// *SET MISSES TO 0 (UP TO 5 MISSES)
let misses = '0';

// *HOLDS LIVES AND HEART IMAGES
const lives = document.querySelectorAll('.tries img');

// *ARRAY TO HOLD PHRASES
const phrases = 
   [
      "wheel of success",
      "javascript",
      "practice coding",
      "web designer",
      "trust the process",
      "have fun"
   ]; 

startGame.addEventListener('click', () => 
{
    resetGame();
    gameBoard.style.display = 'none';
});

// start.addEventListener('click', () => 
// {
//    gameBoard.style.visibility = 'visible';
//    if (gameBoard.style.visibility === 'visible') 
//    {
//       resetGame();
//       gameBoard.style.visibility = 'hidden';
//       gameBoard.style.transition = 'all .7s';
//    }
// });

// *LISTENS FOR KEYBOARD LETTERS TO BE CLICKED
keys.addEventListener('click', (key) => 
{
    if(key.target.tagName === 'BUTTON') 
    {
      key.target.className = 'chosen';
      key.target.disabled = true;

      // if no matches found, remove heart
      if(checkLetter(key.target.textContent) == null) 
      {
         lives[missed].src = 'images/lostHeart.png';
         missed++;
      }
    checkWin();
    }
});


// const getRandomPhraseAsArray = arr => arr[Math.floor(Math.random() * arr.length)]
// .split('');

// *RETURNS A RANDOM PHRASE FROM ARRAY
const getRandomPhraseAsArray = phrasesAarry =>
{
   const randomPhrases = phrasesAarry[Math.floor(Math.random() * phrasesAarry.length)]
   .split('');
   return randomPhrases;
}

// *ADD LETTERS FROM PHRASES TO DISPLAY RANDOMLY
const addPhraseToDisplay = phrasesSplitByChar => 
{
   for(let i = 0; i < phrasesSplitByChar.length; i++)
   {
      let phraseItem = document.createElement('li');
      if(phrasesSplitByChar[i] === ' ')
      {
         phraseItem.classList.add('space');
      }
      else
      {
         phraseItem.classList.add('letter');
      }
      phraseItem.innerHTML = phrasesSplitByChar[i];
      phrase.appendChild(phraseItem);
   }
}

// *CHECKS IF LETTER IS IN PHRASE
const checkLetter = buttonClicked => 
{
   let  checkLetter =  document.querySelectorAll('.letter');
   let letterFound = null;

   for (let i = 0; i < checkLetter.length; i++)
   {
      if (checkLetter[i].textContent === buttonClicked)
      {
         letterFound = buttonClicked;
         checkLetter[i].classList.add('show');
         checkLetter[i].style.transition = '.8s ease-in-out';
      }
   }
   return letterFound;
};

// *CHECKS IF GAME IS WON OR LOST
const checkWin = () => 
{
   let letter = document.querySelectorAll('.letter');
   let showLetters = document.querySelectorAll('.show');
   let win = null;
   
   if(letter.length === showLetters.length) 
   {
      gameBoard.className = 'win';
      gameBoard.style.display = 'flex';
      title.textContent = "🎊We Have A Winner!🎊";
      startGame.innerText = 'Play Again🤷‍♂️';
      win = true;
      return win;

   } 
   else if(missed > 4) 
   {
      title.innerText = '🍀Maybe next time!';
      startGame.innerText = 'Play Again🤷‍♂️';
      gameBoard.className = 'lose';
      gameBoard.style.display = 'flex';
      win = false;
      return win;
   }
}

function resetGame() 
{
   let keyboardBtn = document.querySelectorAll('#qwerty .keyrow button');
   missed = 0;

   phrase.innerHTML = '';
   let phraseSplit = getRandomPhraseAsArray(phrases);
   addPhraseToDisplay(phraseSplit);
   
   for(let i = 0; i < keyboardBtn.length; i++) 
   {
      keyboardBtn[i].classList.remove('chosen');
      keyboardBtn[i].disabled = false;
      
      for(let j = 0; j < lives.length; j++) 
      {
         lives[j].src = 'images/liveHeart.png';
      }
   }
}


// // Reset Game
// function resetGame() {
//     missed = 0;
//     ul.innerHTML = '';
//     const shownLetters = document.querySelectorAll('.show');
//     for (let i = 0; i< shownLetters.length; i++) {
//         shownLetters[i].classList.remove('show');
//         shownLetters[i].textContent = '';
//     };
//     const letterBtn = document.querySelectorAll('.chosen');
//     for (let i = 0; i< letterBtn.length; i++) {
//         letterBtn[i].classList.remove('chosen');
//         letterBtn[i].disabled = false;
//     };
//     const newPhrase = getRandomPhraseAsArray(phrases);
//     addPhraseToDisplay(newPhrase);
//     const hearts = document.querySelectorAll('.tries img');
//     for(let i = 0; i < hearts.length; i++) {
//         hearts[i].src = 'images/liveHeart.png';
//     };
// };