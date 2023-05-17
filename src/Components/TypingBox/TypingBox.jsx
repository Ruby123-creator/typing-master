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
  const [wordsArr, setwordsArray] = useState(() => {
    return randomWords(50);
  });

  // let para =        randomWords(50).join(" ")
  const inputRef = useRef(null);
  const wordsRefArray = useMemo(() => {
    return Array(wordsArr.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [wordsArr]);
  // console.log(wordsRefArray)
  function Inputfocus() {
    inputRef.current.focus();
  }

  const startTimer = () => {
    const interval = setInterval(countTimer, 1000);
    setIntervalId(interval);
    function countTimer() {
      setTimer((latesttime) => {
        setCorrectChars((correctChars) => {
          setGraphData((graphData) => {
            return [
              ...graphData,
              [
                testTime - latesttime + 1,
                correctChars / 5 / ((testTime - latesttime + 1) / 60),
              ],
            ];
          });
        });
        if (latesttime === 1) {
          setEndTyping(true);
          clearInterval(interval);
          return 0;
        }
        return latesttime - 1;
      });
    }
  };
  const handleUserInput = (e) => {
    if (!startTyping) {
      startTimer();
      setStartTyping(true);
    }
    const currentWords = wordsRefArray[currentwordIndex].current.childNodes;
    // console.log(currentWords[currentcharIndex].innerText)
    if (e.keyCode === 32) {
      //logic for space
      let correctCharsInWord =
        wordsArr[currentwordIndex].current.querySelectorAll(".correct");
      if (correctCharsInWord.length === currentWords.length) {
        setCorrectWords(correctwords + 1);
      }
      if (currentWords.length <= currentcharIndex) {
        currentWords[currentcharIndex - 1].classList.remove("current-right");
      } else {
        setMissedChars(missedChars + (currentWords.length - currentcharIndex));
        currentWords[currentcharIndex].classList.remove("current");
      }
      wordsRefArray[currentcharIndex].current.childNodes[0].className =
        "current";
      setCurrentwordIndex(currentwordIndex + 1);
      setCurrentcharIndex(0);
      return;
    }
    if (e.keyCode === 8) {
      //logic for backspace
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
    if (currentcharIndex === currentWords.length) {
      let newspan = document.createElement("span");
      newspan.innerText = e.key;
      newspan.className = "incorrect extra right-current";
      currentWords[currentcharIndex - 1].classList.remove("current-right");
      wordsRefArray[currentwordIndex].current.append(newspan);
      setCurrentcharIndex(currentcharIndex + 1);
      setExtraChars(extraChars + 1);
      return;
    }

    if (e.key === currentWords[currentcharIndex].innerText) {
      currentWords[currentcharIndex].className = "correct";
      setCorrectChars(correctChars + 1);
    } else {
      currentWords[currentcharIndex].className = "incorrect";
      setInCorrectChars(incorrectChars + 1);
    }
    // console.log(currentcharIndex+1)
    if (currentcharIndex + 1 === currentWords.length) {
      // console.log(currentcharIndex)
      currentWords[currentcharIndex].className += " current-right";
      // setCurrentwordIndex(currentwordIndex+1)
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
    Inputfocus();
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
  useEffect(() => {
    Inputfocus();
    wordsRefArray[0].current.childNodes[0].className = "current";
  }, []);
  return (
    <div>
      <Menu countDown={timer} />
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
      )}
    </div>
  );
}

export default TypingBox;
