const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer =[0,0,0,0];
var interval;
var timerRunning = false;
var countRed =0;

//Add leading zero to numbers 9 or below
 function leadingZero(time){
     if (time <= 9){
         time = "0" + time;
     }
     return time;
 }

// Run a stundard minute/second  timer
function runTimer(){
  let minuteTimer = leadingZero(timer[0]);
  let secondTimer = leadingZero(timer[1]);
//   let miliSecondTimer = leadingZero(timer[2]);
  let currentTime = minuteTimer + ":" + secondTimer 
  theTimer.innerHTML = currentTime;
  timer[3]++;


  timer[0]= Math.floor((timer[3]/100)/60);
  timer[1]= Math.floor((timer[3]/100) - (timer[0] * 60));
//   timer[2]= Math.floor(timer[3] - (timer[1] * 100)  - (timer[0] * 6000));

}

// Match the text entered with the provided text
function spellCheck(){
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);
    
    // all the texts entered matched the origin text 
    if (textEntered == originText){
        clearInterval(interval);
        testArea.style.borderColor = "#00ff62";
       
        // checking for shorter string
    } else{
        if(textEntered == originTextMatch){
            testArea.style.borderColor = "#7feeee"
            
        }else{
            testArea.style.borderColor = "red"
            countRed++
            return countRed;
            
        }
    }
   
}


//start timer
function start(){
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning){
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    // console.log(textEnteredLength)
}



//reset everything
function reset(){
    clearInterval(interval);
    interval = null;
    timer =[0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML="00:00:00"
    testArea.style.borderColor = "grey"
    alert("your typing speed is 20wpm")
}

// Event listners for keyboard input and reset button
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);