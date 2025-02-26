const PageChanger = document.querySelector("#Changer");
let elapsedTime = 0; // Timer initialization
let interval;
let selectedButton = null; // Track selected difficulty
let playerName = ''; // Track player name

 // Load the main screen on page load

// Main container
const Container = document.createElement("div");
Container.style.backgroundImage = "starter_eng\\pics\\homescreen.jpg";
Container.style.backgroundSize = 'contain';
Container.style.backgroundRepeat = 'no-repeat';
Container.style.backgroundPosition = 'center';
Container.style.width = '100%';
Container.style.height = '100vh';
Container.style.display = 'flex';
Container.style.flexDirection = 'column';
Container.style.justifyContent = 'center';
Container.style.alignItems = 'center';

// Create input for name
const NameBar = document.createElement("input");
NameBar.setAttribute("type", "text");
NameBar.setAttribute("placeholder", "WHO ARE YOU?");

// Difficulty container
const difficultyContainer = document.createElement("div");
difficultyContainer.id = 'difficultyDiv';
const heading = document.createElement('h2');
heading.textContent = 'Set the Difficulty!';
const btn5x5 = document.createElement('button');
const btn7x7 = document.createElement('button');
btn5x5.textContent = '5x5';
btn7x7.textContent = '7x7';
btn5x5.classList.add('difficulty-btn');
btn7x7.classList.add('difficulty-btn');

// Controls div
const controlsDiv = document.createElement('div');
controlsDiv.id = 'controlsDiv';

// Create the Rules button
const rulesBtn = document.createElement('button');
rulesBtn.textContent = 'Rules';
rulesBtn.classList.add('control-btn');

// Creating the Start Game button
const startGameBtn = document.createElement('button');
startGameBtn.textContent = 'Start Game';
startGameBtn.classList.add('control-btn');

difficultyContainer.appendChild(heading);
difficultyContainer.appendChild(btn5x5);
difficultyContainer.appendChild(btn7x7);
controlsDiv.appendChild(rulesBtn);
controlsDiv.appendChild(startGameBtn);
const alertMessage= createElement("p","alertMessage"," ")
controlsDiv.appendChild(alertMessage)
Container.appendChild(NameBar);
Container.appendChild(difficultyContainer);
Container.appendChild(controlsDiv);
PageChanger.appendChild(Container);

const images = ['starter_eng\\pics\\tiles\\empty.png', 
    'starter_eng\\pics\\tiles\\straight_rail.png',
    'starter_eng\\pics\\tiles\\curve_rail.png' 
];  

const types1= [0, 4, 5]; 
const returnButton= createElement("button","returnBTN","return to main menu")


