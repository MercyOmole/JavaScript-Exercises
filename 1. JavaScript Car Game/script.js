//(1st)
const score = document.querySelector(".score")
const startScreen = document.querySelector(".startScreen")
const gameArea = document.querySelector(".gameArea")

//(8th) Set a supposed empty object, with speed of 5
let player = {
    speed:10,
    score:0 // (32nd) set score as default
}

//(5th) Setup an object to track which keys are being pressed.
let keys = {
    ArrowUp:false,
    ArrowDown:false,
    ArrowRight:false,
    ArrowLeft:false
}

//(2nd) Add eventListeners
startScreen.addEventListener("click", start)
document.addEventListener("keydown", pressOn)
document.addEventListener("keyup", pressOff)

//(20th) create a function to move the lines.
function moveLines() {
    //create a variable to select a class.
    let lines = document.querySelectorAll(".line")
    //(23rd) set a loop to loop through the elements (line objects)
    lines.forEach(function(item) {
        //console.log(item.y)
        if(item.y >= 1500) {
            item.y -= 1500
        }
        item.y += player.speed
        item.style.top = item.y + "px "
    })
}

//(28th) function to see if the Car elements collides
// Getting the top, bottom, right and left position
function isCollide(a,b) {
    let aRect = a.getBoundingClientRect()
    let bRect = b.getBoundingClientRect()

    //(29th) to see if there is an overlap, if positive, return a value of false, if no collision, return true.
    return !(

        (aRect.bottom < bRect.top) ||
        (aRect.top > bRect.bottom) ||
        (aRect.right < bRect.left) ||
        (aRect.left > bRect.right)
    )
}

//(25th) create a function to move the enemies.
function moveEnemy(car) {//(31st) pass in the car value
    //create a variable to select a class.
    let enemyEle = document.querySelectorAll(".enemy")
    //(27th) set a loop to loop through the elements (line objects)
    enemyEle.forEach(function(item) {
        if(isCollide(car, item)) {
            //console.log("HIT")
            endGame() //(35th) calling the funtion to end the game.
        }
        if(item.y >= 1500) {
            item.y = -600
            item.style.left = Math.floor(Math.random() * 350) + "px"
            //(39th)
            item.style.backgroundColor = randomColor()
        }
        item.y += player.speed
        item.style.top = item.y + "px "
    })
}

//(7th) Request function
function playGame() {

    //(14th) select the element with the class of car.
    let car = document.querySelector(".car")
    //(22nd) call the moveLines function
    moveLines()
    //(26th) call the moveEnemy function
    moveEnemy(car) //(30th)pass in the car value

    //(18th) gameArea- bound the moving car within the game Area
    let road = gameArea.getBoundingClientRect()
    //console.log(road)

    //(10th) Here in the animation frame, take the player object start and make it is true.
    if(player.start) {

        //(15th) check to see the values of keys using the key object, add the (x, y) coordinates and use the speed to control how fast the car moves.
        
        //decrease the y coordinate.
        //(After 18th), && player.y > road.top
        if(keys.ArrowUp && player.y > road.top){player.y -= player.speed;}

        //increase the y coordinate.
        //(After 18th), && player.y < road.bottom
        if(keys.ArrowDown && player.y < road.bottom-50){player.y += player.speed;}

        //decrease the x coordinate.
        //(After b 18th), && player.x > 0 was added to ensure the car does not move off of the leftside of the road.
        if(keys.ArrowLeft && player.x > 0){player.x -= player.speed;}
        
        //increase the x coordinate.
        //(After 18th), && player.x < (road.width-50) was added to ensure the car does not move off of the rightside of the road.
        if(keys.ArrowRight && player.x < (road.width-50)){player.x += player.speed;}

        //(17th) adjust the position of the element by taking the car, updating the element style, left position.
        car.style.left = player.x + 'px';
        car.style.top = player.y + 'px';
        //(34th)
        player.score++
        score.innerText = "Score: "+player.score

        //We can see that within the animation frame, the animation frame was   requested and that is what creates the loop of the animation.
        //(7th) Just like any function invoked within itself, it is going to constantly loop and create additional animation frames.
        window.requestAnimationFrame(playGame)
    }
}

//(3rd)
//onkeydown/pressOn = Fires when the user releases a key.
function pressOn(e){
    //to prevent the default action
    e.preventDefault()

    //Set the e.key to correspond with string value of e.key that we saw output in the console.
    keys[e.key] = true
    //console.log(keys)
}

//(4th)
//onkeyup = Fires when the user presses a key.
function pressOff(e){
    e.preventDefault()
    keys[e.key] = false
    //console.log(keys)
}

//(36th) Build endGame function
function endGame() {
    player.start = false
    score.innerHTML = "Game Over<br>Score was "+player.score
    startScreen.classList.remove("hide")
}

function start() {
    //(12th)
    //add a function to add or remove the class of hide (the start Screen).
    startScreen.classList.add("hide")
    //gameArea.classList.remove("hide")
    //(37th) Clearing the innerhtml, to enable proper restarting of the game.
    gameArea.innerHTML = "" 

    //(9th) once the you start the game, take your player object and set it to true.
    player.start = true 
    player.score = 0 //(33rd) set the player score to zero. strtubg position

    //(6th) Request animation frame once you hit the start button. (start())
    window.requestAnimationFrame(playGame)

    //(19th)
    //Set a ForLoop to generate the road lines. By creating a div and add a class of line to it after adding css propertiess to the line class.
    for(let x=0;x<10;x++) {
         let div = document.createElement("div")
        div.classList.add("line")
        //(21st) Give the line element the y position.
        div.y = x * 150
        div.style.top= (x * 150) + "px";
        gameArea.appendChild(div)
    }

    //(11th)
    //Create an element that you can access and move around the screen
    let car = document.createElement("div")
    //car.innerText = "Car"

    //(13th) Add the .car class to the element "car" that was just created.
    car.setAttribute("class", "car")
    gameArea.append(car)

    //(16th) Set the player.x value by calculating where the Car object is and getting it offset position.
    player.x = car.offsetLeft
    player.y = car.offsetTop
    //(24th) Create the other car enemies.
    for(let x=0;x<3;x++) {
        let enemy = document.createElement("div")
        enemy.classList.add("enemy")
        //(40th)
        enemy.innerHTML = "<br>"+(x+1)
        //(25th) Positioning the car Elements
        enemy.y = ((x + 1)* 600) * -1
        enemy.style.top= enemy.y + "px";
        enemy.style.left = Math.floor(Math.random() * 350) + "px"
        enemy.style.backgroundColor = randomColor() //(39th) call the random colour function.        
        gameArea.appendChild(enemy)
    }
}

//(38th) function to generate random colors for enemy cars
function randomColor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16)
        return ("0"+String(hex)).substr(-2)
    }
    return "#"+c()+c()+c()
}


//function randomColor() {
  //  let hex = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
    //let hexArray = Array.from({length: 6 }, () =>
    //Math.floor(Math.random() * 16)
    //)
    //let hexCode = hexArray.map((i) => hex[i]).join('')
    //return `#${hexCode}`
//}