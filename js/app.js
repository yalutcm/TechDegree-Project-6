// **** Global Variables **** // 

// elements assigned to variables
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const ul = document.querySelector('#phrase ul');
const strtBtn = document.querySelector('.btn__reset');
const showGame = document.getElementById('overlay');


// array to hold phrases
const phraseArray = [

    'You are in control',
    'Remember why you started',
    'Read books',
    'Take care of Earth',
    'Have fun'
];

// variable to keep track of misses
let missed = 0;

// **** Event Listeners **** // 
// start game button
strtBtn.addEventListener('click', () => {
    if (showGame.style.display == 'none') {
        showGame.style.display = 'block';
    } else {
        showGame.style.transition = 'all .7s';
        showGame.style.display = 'none';
    }
});

p