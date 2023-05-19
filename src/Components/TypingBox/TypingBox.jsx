import React, { createRef, useEffect, useMemo } from "react";
import { useState, useRef } from "react";
import "./typingbox.css";
import Menu from "../Menu/Menu";
import { useTestMode } from "../../ContextFiles/Context";
import Result from "../Result/Result";
var randomWords = require("random-words");

function TypingBox() {
  const { testTime } = useTestMode();
  const [timer, setTimer] = useState(testTime);
  const [startTyping, setStartTyping] = useState(false);
  const [EndTyping, setEndTyping] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [currentwordIndex, setCurrentwordIndex] = useState(0);
  const [currentcharIndex, setCurrentcharIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setInCorrectChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [correctwords, setCorrectWords] = useState(0);
  const [graphData, setGraphData] = useState([]);

  //to create random words whenever 
  const [wordsArr, setwordsArray] = useState(() => {
    return randomWords(50);
  });
  // input reference for user typing box
  const inputRef = useRef(null);
  //fun is used to focus that particular input so the user can write in typing box easily whenever refresh
  function Inputfocus() {
    inputRef.current.focus();
  }

// it reurns an array of referencing the random words
  const wordsRefArray = useMemo(() => {
    return Array(50)
      .fill(0)
      .map((i) => createRef(null));
  }, []);
 //we get 50 span tags after that with theeir referncing value

  //it is called whenever the browser loads
  useEffect(() => {
    Inputfocus();
    //we want our blinking cursor before first word
    wordsRefArray[0].current.childNodes[0].className = "current";
  }, []);



  
// timer function 
  const startTimer = () => {
    const interval = setInterval(countTimer, 1000);
    setIntervalId(interval);   //fun is used to cancel the setinterval timing
    function countTimer() {
      setTimer((latesttime) => {
        setCorrectChars((correctChars) => {
          setGraphData((graphData) => {
            return [
              ...graphData,
              [
                testTime - latesttime + 1,
                ((correctChars/5)/((testTime - latesttime + 1) / 60)),
              ],
            ];
          });
        });
        if (latesttime === 1) {
          clearInterval(interval);
          setEndTyping(true);
          return 0;
        }
        return latesttime - 1;
      });
    }
  };



 //this runs whenever user start to type
  const handleUserInput = (e) => {
    if (!startTyping) {   // if start typing is true
      startTimer();  //it calls timer fun which  will run the timer function after every 1000ms
      setStartTyping(true);  //set as true
    }



    let currentWords = wordsRefArray[currentwordIndex].current.childNodes;
   
//first check is it a spacebar ,logic for space
if (e.keyCode === 32) {

let correctSpans =
wordsRefArray[currentwordIndex].current.querySelectorAll(".correct"); //get out all spans with correct classname
if (correctSpans.length === currentWords.length) {
  //if all the letter are correct with classname correct
  //increase the correctwords
setCorrectWords(correctwords + 1);
}

//if cursor is at the end
if (currentWords.length <= currentcharIndex) {
currentWords[currentcharIndex - 1].classList.remove("current-right");
} else {
  //cursor present in betwwen the words
  //for the missing characters
setMissedChars(missedChars + (currentWords.length - currentcharIndex));
for(let i=currentcharIndex;i<wordsArr.length;i++){
    wordsArr[i].className += " skipped"
}
currentWords[currentcharIndex].classList.remove("current");
}


//scrolling line condition
if (
  wordsRefArray[currentwordIndex + 1].current.offsetLeft <
  wordsRefArray[currentwordIndex].current.offsetLeft
) {
  //i am present at the last word of a line
  wordsRefArray[currentwordIndex].current.scrollIntoView();
}
wordsRefArray[currentwordIndex+1].current.childNodes[0].className =
"current";
setCurrentwordIndex(currentwordIndex + 1);
setCurrentcharIndex(0);
return;
}
   // logic for currentletters

    //if userentering key equal to the wordletter
     if (e.key === wordsRefArray[currentwordIndex].current.childNodes[currentcharIndex].innerText) {
      //give them correct classname
      currentWords[currentcharIndex].className = "correct";
      setCorrectChars(correctChars + 1);
      console.log(correctChars)

    } else {
      //give them incorrect classname
      currentWords[currentcharIndex].className = "incorrect";
      // increase the incorrectChars
      setInCorrectChars(incorrectChars + 1);
    }   

//logic for backspace
 if (e.keyCode === 8) {
  //logic for backspace
  //if u r in next word then u will not to allow for backspace
  if (currentcharIndex !== 0) {
    if (currentWords.length === currentcharIndex) {
      if (currentWords[currentcharIndex - 1].className.includes("extra")) {
        currentWords[currentcharIndex - 1].remove();
        currentWords[currentcharIndex - 2].className += " current-right";
      } else {
        currentWords[currentcharIndex - 1].className = "current";
      }

      setCurrentcharIndex(currentcharIndex - 1);
      return;
    }
    currentWords[currentcharIndex].className = "";
    currentWords[currentcharIndex - 1].className = "current";
    setCurrentcharIndex(currentcharIndex - 1);
  }
  return;
}
   
 

  //logic for ending the word
    if (currentcharIndex === currentWords.length) {
      //to add new letters
      let newspan = document.createElement("span");
      newspan.innerText = e.key;
      newspan.className = "incorrect current-right extra";
      //append these new charas to the word
      wordsRefArray[currentwordIndex].current.append(newspan);
     
     //after appending remove the current-right cursor
      currentWords[currentcharIndex - 1].classList.remove("current-right");
      // increase the current char
      setCurrentcharIndex(currentcharIndex + 1);
      //increase the extra character
      setExtraChars(extraChars + 1);
      return;
    }


  // if current letter length equal to currentword length then move the cursor
    if (currentcharIndex + 1 === currentWords.length) {
      currentWords[currentcharIndex].className += " current-right";
    } else {
      currentWords[currentcharIndex + 1].className = "current";
    }
    
   
    setCurrentcharIndex(currentcharIndex + 1);
  };







  const reset = () => {
    clearInterval(intervalId);
    setTimer(testTime);
    setCurrentcharIndex(0);
    setCurrentwordIndex(0);
    setStartTyping(false);
    setEndTyping(false);
    setwordsArray(randomWords(50));
    resetwordspanref();
    setCorrectChars(0)
    setInCorrectChars(0)
    setMissedChars(0)
    setExtraChars(0)
    setGraphData([])
    setCorrectWords(0)
  };

  function resetwordspanref() {
    wordsRefArray.map((i) => {
      Array.from(i.current.childNodes).map((j) => {
        j.className = "";
      });
    });
    wordsRefArray[0].current.childNodes[0].className = "current";
  }
  function calulateWPM() {
    return Math.round(correctChars / 5 / (testTime / 60));
  }
  function calulateAcc() {
    return Math.round((correctwords / currentwordIndex) * 100);
  }
  useEffect(() => {
    reset();
  }, [testTime]);
  
  return (
    <div>
      {EndTyping ? (
        <Result
          WPM={calulateWPM()}
          Accuracy={calulateAcc()}
          correctChars={correctChars}
          incorrectChars={incorrectChars}
          extraChars={extraChars}
          missedChars={missedChars}
          graphData={graphData}
        />
      ) : (
        <div>
                <Menu countDown={timer} />

        <div className="box" onClick={Inputfocus}>
          <div className="Typing-box">
            {wordsArr.map((word, ind) => {
              return (
                <span className="words" key={ind} ref={wordsRefArray[ind]}>
                  {word.split("").map((char, i) => (
                    <span key={i}>{char}</span>
                  ))}
                </span>
              );
            })}
          </div>
          <input
            ref={inputRef}
            className="hidden-input"
            type="text"
            onKeyDown={handleUserInput}
          />
        </div>
        </div>
      )}
    </div>
  );
}

export default TypingBox;
