import React, { useEffect } from 'react'
import Graph from '../Graph'
import { auth ,db } from '../../firebase';
import { toast } from 'react-toastify';

    


function Result(
  {wpm,
    Accuracy,
    missedChars,
    incorrectChars,
    correctChars,
    extraChars,
    graphData
}) {

  let timeSet = new Set();
  const newGraph =graphData.filter((i)=>{
    if(!timeSet.has(i[0])){
      timeSet.add(i[0]);
      return i;
    }
  });



  const pushuserDataToDB =async()=>{

    
        const ResultRef = db.collection('Result')
        const {uid} = auth.currentUser;

       ResultRef.add({
        wpm:wpm,
      Accuracy:Accuracy,
      timeStamp:new Date(),
      character:`${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
      userId:uid,
      }).then(()=>{
        toast.success('🦄 User Data save!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          }); 
      })
    .catch (e=> {
      console.log(e)
      toast.error('not able to save user Data', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    }); 
                  } )    
    
  
}

    
useEffect(()=>{
  if(auth.currentUser){
    pushuserDataToDB();
  }
  else{
    toast.error('login to save Result', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      }); 
  }
},[])
  

  return (
    <div className='result-box'>
        <div className="left-stats">
            <div>
            <span className="title">WPM</span>
            <span className="subtitle">{wpm}</span>
            </div>
            <div>
            <span className="title">Accuracy</span>
            <span className="subtitle">{Accuracy}</span>
            </div>
            <div>
            <span className="title">Correct Characters</span>
            <span className="subtitle">{correctChars}</span>
            </div><div>
            <span className="title">Incorrect Characters</span>
            <span className="subtitle">{incorrectChars}</span>
            </div><div>
            <span className="title">Missed Characters</span>
            <span className="subtitle">{missedChars}</span>
            </div>
            <div>
            <span className="title">Extra Characters</span>
            <span className="subtitle">{extraChars}</span>
            </div>
        </div>
        <div className="right-stats">
            <Graph graphData={newGraph}/>
        </div>
    </div>
  )
}

export default Result