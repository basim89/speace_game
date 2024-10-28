const words = ["specialty", "local", "crosswalk", "explain", "abroad"];
let currentLevel = 0;
let currentWord = "";
let scrambledWord = "";
let startTime = 0;
let timerInterval;

function scrambleWord(word) {
    let shuffled = word.split('').sort(() => 0.5 - Math.random()).join('');
    return shuffled;
}

function startGame() {
    currentLevel = 0;
    nextLevel();
    document.getElementById('background-music').play();
}

function nextLevel() {
    if (currentLevel >= words.length) {
        document.getElementById('message').innerText = 'تهانينا! لقد أنهيت جميع المستويات!';
        document.getElementById('message').style.color = 'green';
        document.getElementById('check-button').disabled = true;
        return;
    }

    currentWord = words[currentLevel];
    scrambledWord = scrambleWord(currentWord);
    document.getElementById('word-container').innerText = scrambledWord;
    document.getElementById('user-input').value = '';
    document.getElementById('message').innerText = '';
    document.getElementById('level').innerText = currentLevel + 1;
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    let currentTime = new Date().getTime();
    let elapsedTime = Math.floor((currentTime - startTime) / 1000);
    document.getElementById('time').innerText = elapsedTime;
}

function checkWord() {
    clearInterval(timerInterval);
    let userInput = document.getElementById('user-input').value;
    if (userInput.toLowerCase() === currentWord) {
        document.getElementById('message').innerText = 'صحيح!';
        document.getElementById('message').style.color = 'green';
        document.getElementById('correct-sound').play();
        currentLevel++;
        setTimeout(nextLevel, 1000); // Wait 1 second before starting the next level
    } else {
        document.getElementById('message').innerText = 'خطأ! حاول مرة أخرى.';
        document.getElementById('message').style.color = 'red';
        document.getElementById('wrong-sound').play();
    }
}

document.getElementById('check-button').addEventListener('click', checkWord);

document.getElementById('start-button').addEventListener('click', function() {
    document.querySelector('.start-screen').classList.add('fade-out');
    document.querySelector('.main-page').classList.add('visible');
    setTimeout(startGame, 1000); // Wait 1 second before starting the game
});
