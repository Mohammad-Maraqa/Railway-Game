// Handle difficulty selection
btn5x5.addEventListener('click', () => handleClick(btn5x5, btn7x7, 1));
btn7x7.addEventListener('click', () => handleClick(btn7x7, btn5x5, 2));


function handleClick(selectedBtn, otherBtn, difficulty) {
    selectedBtn.classList.add('active');
    otherBtn.classList.remove('active');
    selectedButton = difficulty;
}


function homeScreen(){
    
    Container.innerHTML=" "
    Container.appendChild(NameBar); 
    Container.appendChild(difficultyContainer);
    Container.appendChild(controlsDiv);
    PageChanger.appendChild(Container);

}

function rulesScreen() {
    
    Container.innerHTML=" "
    
    const InfoHolder=createElement("div","holder","")
    let header1= createElement("h1","rulesHeader","Rules:")

    let header21= createElement("h2","OverviewHeader","Overview")
    let rules1= createElement("p","rulesParagraph","The game is played on a square grid of various sizes, where the goal is to create a continuous circular railway lines that reaches every place where the train can travel.")
    
    let header22= createElement("h2","InitialStateH","Initial State of the Game")
    let rules2= createElement("p","rulesParagraph","The base of the map is a 5x5 (Easy) or 7x7 (Hard) square grid, depending on the difficulty. The maps contain different numbers of mountains, bridges, oases, and empty tiles, depending on the difficulty level. You do not need to invent the maps yourself; in the pics folder under level, you will find maps for both difficulty levels in image format. You don't need to use them as images; first, convert them into a data structure of your choice and store them that way. At the start of the game, one of these maps should be selected.")
    
    let header23= createElement("h2","EndGameH","Overview")
    let pdiv=createElement("div","EndGameDiv","")
    let EndGame= createElement("p","rulesParagraph","The game ends when the player correctly completes the puzzle according to the given rules During the validation of the puzzle's completion, the following elements need to be checked:")
    let point1=createElement("li","p1","Every cell that needs to be touched is touched.")
    let point2=createElement("li","p2","Each cell has two exit points, and the train can enter each neighboring cell from the correct direction.")
    let point3=createElement("li","p3","Every cell where no track can be placed remains empty.")
    pdiv.appendChild(EndGame)
    pdiv.appendChild(point1)
    pdiv.appendChild(point2)
    pdiv.appendChild(point3)
    InfoHolder.appendChild(header1)
    InfoHolder.appendChild(header21)
    InfoHolder.appendChild(rules1)
    InfoHolder.appendChild(header22)
    InfoHolder.appendChild(rules2)

    InfoHolder.appendChild(header23)
    InfoHolder.appendChild(pdiv)
    
    Container.appendChild(InfoHolder)
    Container.appendChild(returnButton)
    
}


// This will start the game, removing the main screen and displaying the game interface
function startGame() {
    Container.innerHTML = " "; 
    
    const playScreen = document.createElement("div");
    playScreen.style.display = "flex";
    playScreen.style.justifyContent = "space-between";

    // Player info section
    const playerInfoDiv = createElement("div","playerInf");
    playerInfoDiv.innerHTML = `
        <h2>Route Designer: ${playerName}</h2>
        <h3>Elapsed Time:</h3>
        <p id="elapsedTime">${formatTime(elapsedTime)}</p>
    `;

    // Matrix display section
    const randomMatrixIndex = getRandomNumber();
    const selectedMatrix = selectedButton === 1 ? FiveBy5[randomMatrixIndex].matrix : SevenBy7[randomMatrixIndex].matrix;
    const matrixDiv = displayMatrix(selectedMatrix, selectedButton);

    playScreen.appendChild(playerInfoDiv);
    playScreen.appendChild(matrixDiv);
    Container.appendChild(playScreen);

    startTimer(); 
    Container.appendChild(returnButton)
    
}

rulesBtn.addEventListener('click', function () {
    Container.innerHTML = ""; 
    rulesScreen(); 
});

returnButton.addEventListener("click", function () {
    stopTimer();
    alertMessage.innerHTML=' '
    homeScreen();
})
startGameBtn.addEventListener("click", function () {
    if (checkInfo()) {
        startGame();
    } else {
        
        alertMessage.innerHTML="Please enter your name and select a difficulty.";
    }
});

function checkInfo() {
    playerName = NameBar.value.trim(); 
    return playerName !== '' && selectedButton !== null;
}

function startTimer() {
    interval = setInterval(function () {
        elapsedTime++;
        document.querySelector("#elapsedTime").innerText = formatTime(elapsedTime);
    }, 1000); 
}

function stopTimer() {
    elapsedTime=0
    clearInterval(interval); 
}


function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function getRandomNumber() {
    return Math.floor(Math.random() * 5); // 0 to 4
}

function displayMatrix(matrix,value) {
    const matrixDiv = document.createElement("div");
    matrixDiv.setAttribute("id","board")
    matrixDiv.style.display = "grid";
    matrixDiv.style.gridTemplateColumns = `repeat(${value === 1 ? 5 : 7}, 70px)`;
    matrixDiv.style.border
    const imageMap = {
        0: 'starter_eng\\pics\\tiles\\empty.png',
        1: 'starter_eng\\pics\\tiles\\bridge.png',
        2: 'starter_eng\\pics\\tiles\\mountain.png',
        3: 'starter_eng\\pics\\tiles\\oasis.png'
    };

    matrix.forEach(row => {
        
        row.forEach(cell => {
            const imgDiv = createElement("div","","");//
            imgDiv.style.width = "10px";
            imgDiv.style.height = "70px";
            const img = document.createElement("img");
            img.src = imageMap[cell[0]];
            img.dataset.rotation=cell[1]
            img.dataset.passed=false;
            img.className='tile'
            img.dataset.type=cell[0]        
            img.style.width = "70px";  
            img.style.height = "70px"; 
            img.style.objectFit = "cover"; // Ensures the image fits without distortion
            img.style.transform = `rotate(${cell[1]}deg)`; // Rotate based on data
            img.addEventListener('click', cycleImageOnLeftClick);  // Left-click to cycle image
            img.addEventListener('contextmenu', rotateImageOnRightClick);  // Right-click to rotate image
            imgDiv.appendChild(img);
            matrixDiv.appendChild(imgDiv);
        });
    });
    return matrixDiv;
}

function checkMatrix(matrix){
    let cells=matrix.querySelectorAll(".tile")
    let cellList=[];

    cells.forEach(cell => { cellList.push(cell);});
    let leng=cellList.length
    typpp=parseInt(Math.sqrt(leng))
    for (let i =0; i < cellList.length;i++){
        let cellT=parseInt(cellList[i].dataset.type)
        let cellR=parseInt(cellList[i].dataset.rotation)
        if (cellT==2 ||cellT==1||cellT==0){
            return false;
        }
        switch (cellT) {
            case 11: case 4:
                if(cellR==0||180==cellR){
                    
                    if (cellT==4 && ((i-typpp)<0 ||(i+typpp)>(Math.pow(typpp,2)-1))){
                        console.log(i+" ")
                        return false;
                    }
                    let dcellT=parseInt(cellList[i+typpp].dataset.type)
                    let dcellR=parseInt(cellList[i+typpp].dataset.rotation)
                    let ucellT=parseInt(cellList[i-typpp].dataset.type)
                    let ucellR=parseInt(cellList[i-typpp].dataset.rotation)
                    if ((((dcellT==11||dcellT==4) && (dcellR==0||dcellR==180))||((dcellT==22||dcellT==5) && (dcellR==270||dcellR==180)))
                        &&(((ucellT==11||ucellT==4) && (ucellR==0||ucellR==180))||((ucellT==22||ucellT==5) && (ucellR==0||ucellR==90)))){
                    }
                    else {
                        console.log(i+" ")
                        return false;
                    }
                    
                }else {
                    if(((i-1)%typpp)>(i%typpp)||((i+1)%typpp)<(i%typpp)||i-1<0) {
                        console.log(i+" ")
                        return false;
                    }
                    let RcellT=parseInt(cellList[i+1].dataset.type)
                    let RcellR=parseInt(cellList[i+1].dataset.rotation)
                    let LcellT=parseInt(cellList[i-1].dataset.type)
                    let LcellR=parseInt(cellList[i-1].dataset.rotation)
                    if ((((LcellT==11||LcellT==4) && (LcellR==90||LcellR==270))||((LcellT==22||LcellT==5) && (LcellR==0||LcellR==270)))
                        &&(((RcellT==11||RcellT==4) && (RcellR==90||RcellR==270))||((RcellT==22||RcellT==5) && (RcellR==90||RcellR==180)))){
                    }else{
                        console.log(i+" ")
                        console.log ("Cell"+cellT+ " "+cellR)
                        console.log ("lCell"+LcellT+ " "+LcellR)
                        console.log ("RCell"+RcellT+ " "+RcellR)

                        return false;
                    }
                }   
            break;
            case 22:   
            case 5:
                if(cellT==5 && cellR==0){
                    if(i+typpp>(Math.pow(typpp,2)-1)||((i+1)%typpp)<(i%typpp)){
                        console.log(i+" ")
                        return false;
                    }
                    let RcellT=parseInt(cellList[i+1].dataset.type)
                    let RcellR=parseInt(cellList[i+1].dataset.rotation)
                    let DcellT=parseInt(cellList[i+typpp].dataset.type)
                    let DcellR=parseInt(cellList[i+typpp].dataset.rotation)
                    if((((RcellT==11 || RcellT==4)&& (RcellR==90 || RcellR==270))|| 
                    ((RcellT==22 || RcellT==5) && (RcellR==90 || RcellR==180)) ) &&
                        (((DcellT==11||DcellT==4) && (DcellR==0||DcellR==180))||
                        ((DcellT==22 ||DcellT==5) && (DcellR==180||DcellR==270)))

                    ){} else {console.log(i+" ")
                        console.log ("Cell"+cellT+ " "+cellR)
                        console.log ("Cellr"+RcellT+ " "+RcellR)
                        console.log ("Celld"+DcellT+ " "+DcellR)

                        return false;
                    }
                    
                }
                if (cellR==90){
                    if(((i-1)%typpp)>(i%typpp) ||(i+typpp)>(Math.pow(typpp,2)-1)||i-1<0){
                        console.log(i+" ")
                        return false;
                    }
                    let LcellT=parseInt(cellList[i-1].dataset.type)
                    let LcellR=parseInt(cellList[i-1].dataset.rotation)
                    let DcellT=parseInt(cellList[i+typpp].dataset.type)
                    let DcellR=parseInt(cellList[i+typpp].dataset.rotation)
                    if((((LcellT==11 || LcellT==4)&& (LcellR==90 || LcellR==270))|| 
                    ((LcellT==22 || LcellT==5) && (LcellR==0 || LcellR==270)) ) &&
                        (((DcellT==11||DcellT==4) && (DcellR==0||DcellR==180))||
                        ((DcellT==22 ||DcellT==5) && (DcellR==180||DcellR==270)))

                    ){}else {console.log(i+" ")
                        console.log ("Cell"+cellT+ " "+cellR)
                        console.log ("LCell"+LcellT+ " "+LcellR)
                        console.log ("DCell"+DcellT+ " "+DcellR)

                        return false;
                    }
                    
                }
                if (cellR==180){
                    if(i-typpp<0 || ((i-1)%typpp)>(i%typpp)){
                        console.log(i+" ")
                        return false;
                    }
                    let LcellT=parseInt(cellList[i-1].dataset.type)
                    let LcellR=parseInt(cellList[i-1].dataset.rotation)
                    let ucellT=parseInt(cellList[i-typpp].dataset.type)
                    let ucellR=parseInt(cellList[i-typpp].dataset.rotation)
                    if((((LcellT==11 || LcellT==4)&& (LcellR==90 || LcellR==270))|| 
                    ((LcellT==22 || LcellT==5) && (LcellR==0 || LcellR==270)) ) &&
                        (((ucellT==11||ucellT==4) && (ucellR==0||ucellR==180))||
                        ((ucellT==22 ||ucellT==5) && (ucellR==0||ucellR==90)))

                    ){}else {console.log(i+" ")
                        console.log ("Cell"+cellT+ " "+cellR)
                        console.log ("LCell"+LcellT+ " "+LcellR)
                        console.log ("uCell"+ucellT+ " "+ucellR)

                        return false;
                    }
                    
                }if (cellR==270){
                    if(i-typpp<0 || ((i+1)%typpp)<(i%typpp)){
                        console.log(i+" ")
                        return false;
                    }
                    let rcellT=parseInt(cellList[i+1].dataset.type)
                    let rcellR=parseInt(cellList[i+1].dataset.rotation)
                    let ucellT=parseInt(cellList[i-typpp].dataset.type)
                    let ucellR=parseInt(cellList[i-typpp].dataset.rotation)
                    if((((rcellT==11 || rcellT==4)&& (rcellR==90 || rcellR==270))|| 
                    ((rcellT==22 || rcellT==5) && (rcellR==180 || rcellR==90)) ) &&
                        (((ucellT==11||ucellT==4) && (ucellR==0||ucellR==180))||
                        ((ucellT==22 ||ucellT==5) && (ucellR==0||ucellR==90))) 

                    ){ }else {console.log(i+" ")
                        console.log ("Cell"+cellT+ " "+cellR)
                        console.log ("rCell"+rcellT+ " "+rcellR)
                        console.log ("uCell"+ucellT+ " "+ucellR)

                        return false;
                    } 
                }
                break;
            case 3:
                break;
            default:
                return false;
                break;
        }
    }
    
    return true;
}

function cycleImageOnLeftClick(event) {
    let img = event.target;
    let currentType = parseInt(img.dataset.type);  // Get the type of clicked tile
    
    // Check if the current type is one of the specified types
    if (types1.includes(currentType)) {
        let currentIndex = types1.indexOf(currentType); // Find the current image index

        if (currentIndex !== -1) {
            // Calculate the next index
            let nextIndex = (currentIndex + 1) % images.length;  
            img.src = images[nextIndex];  // Set new image
            img.dataset.type = types1[nextIndex]; // Update the data-type attribute
        }
    } if (currentType== 1 || currentType==11){
        
        
        img.src='starter_eng\\pics\\tiles\\bridge_rail.png'
        img.dataset.type=11
    } if(currentType==2||currentType==22){
        
        img.src='starter_eng\\pics\\tiles\\mountain_rail.png'
        img.dataset.type=22  
    }
    if (checkMatrix(document.querySelector("div#board"))) {
        showWinningMessage();
        console.log('you won')
    }
}

// Rotate the image by 90 degrees on right-click
function rotateImageOnRightClick(event) {
    event.preventDefault();  // Prevent the default right-click context menu
    let img = event.target;
    let currentType = parseInt(img.dataset.type);  // Get the type of the clicked tile
    if ([0, 4, 5, 6].includes(currentType)) {
        let currentRotation = parseInt(img.dataset.rotation) || 0;  // Get current rotation
        currentRotation = (currentRotation + 90) % 360;  // Increment rotation by 90 degrees
        img.style.transform = `rotate(${currentRotation}deg)`;  // Apply CSS rotation
        img.dataset.rotation = currentRotation;  // Update rotation in the dataset
        if (checkMatrix(document.querySelector("div#board"))) {
            showWinningMessage();
            
            console.log('you won')
        }
    }else {
        let currentRotation = parseInt(img.dataset.rotation) ;  // Get current rotation
        img.style.transform = `rotate(${currentRotation}deg)`;  // Apply CSS rotation
        img.dataset.rotation = currentRotation;  // Update rotation in the dataset
        if (checkMatrix(document.querySelector("div#board"))) {
            showWinningMessage();
            
            console.log('you won')
        }
    }
}



function showWinningMessage(){
    playerInf.innerHTML=''
    let h=createElement("h1","winningTitle","Congratulations you Won")
    let ff=formatTime(elapsedTime);
    stopTimer();
    let p=createElement("div","PlayerStats",`
        <h2>Route Designer: ${playerName}</h2>
        <h3>Elapsed Time:</h3>
        <p id="elapsedTime">${ff}</p>
    `)
    playerInf.appendChild(h);
    playerInf.appendChild(p);

}
