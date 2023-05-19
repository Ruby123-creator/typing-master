import React from 'react'
import Graph from '../Graph'

    


function Result(
  {wpm,
    accuracy,
    missedchars,
    inccorrectChars,
    correctChars,
    extraChars,
    graphData
}) {

  console.log(correctChars)
  return (
    <div className='result-box'>
        <div className="left-stats">
            <div>
            <div className="title">WPM</div>
            <div className="subtitle">{wpm}</div>
            </div>
            <div>
            <div className="title">Accuracy</div>
            <div className="subtitle">{accuracy}</div>
            </div>
            <div>
            <div className="title">Correct Characters</div>
            <div className="subtitle">{correctChars}</div>
            </div><div>
            <div className="title">Incorrect Characters</div>
            <div className="subtitle">{inccorrectChars}</div>
            </div><div>
            <div className="title">Missed Characters</div>
            <div className="subtitle">{missedchars}</div>
            </div>
            <div>
            <div className="title">Extra Characters</div>
            <div className="subtitle">{extraChars}</div>
            </div>
        </div>
        <div className="right-stats">
            <Graph graphData={graphData}/>
        </div>
    </div>
  )
}

export default Result