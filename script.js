const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const TypeError = document.querySelector(".error")


var timer =[0,0,0,0];
var interval;
var timerRunning = false;
var countRed =0;
var mySound;



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
  let milliSecondTimer = leadingZero(timer[2]);
  var currentTime = minuteTimer + ":" + secondTimer ;
  theTimer.innerHTML = currentTime;
  timer[3]++;


  timer[0]= Math.floor((timer[3]/100)/60);
  timer[1]= Math.floor((timer[3]/100) - (timer[0] * 60));
  timer[2]= Math.floor(timer[3] - (timer[1] * 100)  - (timer[0] * 6000));

  
}

// Match the text entered with the provided text
function spellCheck(){
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);
    

    // all the texts entered matched the origin text 
     if (textEntered == originText){
            clearInterval(interval);
            
            textEntered.style.borderColor = "#00ff62";
      }

     else{
        if(textEntered == originTextMatch){
            testArea.style.color = "green"
            
        }else{
            testArea.style.color = "red"
            countRed++
            return countRed;
            TypeError.innerHTML= countRed;
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
    
}
//add sound to keypress
  function sound(){
      mySound = new Audio();
      mySound.src = "iphone2.mp3";
      let Mytext = testArea.value.length;
      for (i=-1; i< Mytext; i++){
          if(Mytext >= 0){
              mySound.play();
              
          }
      }
  }

  //calculate speed
  function speedCheck(){
    
   
      
  }
  


//reset everything
function reset(){
    
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    let currTime = theTimer.innerHTML;
    speed = currTime.replace(":", "")
     let totalTime = speed[0]+ speed[1]; 
      
      let wordcount = testArea.value.length;

      if ( totalTime <= -9 ){
          alert("Opps! You need to type more words inorder to calculate your speed!")
      
        }else {
           let grossWPM, netWPM , accuracy 
           grossWPM = Math.floor((wordcount / 5) / totalTime)
          
           //calculate accuracy
            let correctWords = wordcount -countRed
            accuracy = Math.floor((correctWords/ wordcount) * 100)
           if(grossWPM > countRed){
            netWPM = Math.floor(grossWPM - (countRed / totalTime))
           }else { netWPM = 0 }
          TypeError.innerHTML ="Your typing speed is: "+ grossWPM 
                        +"wpm. Your total errors:" + countRed 
                        + " Your true speed: "+ netWPM 
                        + " Your Accuracy:" + accuracy +"%"; 

      }
      
    testArea.value = "";
    theTimer.innerHTML="00:00:00";

    testArea.style.borderColor = "grey";
}

// Event listners for keyboard input and reset button
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
testArea.addEventListener( "keydown", sound, false);
//resetButton.addEventListener("click", speedCheck, false);