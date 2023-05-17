import React from 'react'
import './menu.css'
import { useTestMode } from '../../ContextFiles/Context'
function Menu({countDown}) {
    const {setTestTime} = useTestMode();
    const updateTime=(e)=>{
         setTestTime(Number(e.target.id))
    }
  return (
    <div className='menu'>
    <div className='counter'>{countDown}s</div>
    <div className='modes'>
        
      <div className='select'>Select Timer</div>  
    <div className="time" id={15} onClick={updateTime}>15s</div>
    <div className="time" id={30} onClick={updateTime}>30s</div>
    <div className="time" id={60} onClick={updateTime}>60s</div>
    </div>
    </div>
    
  )
}

export default Menu