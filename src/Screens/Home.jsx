import React from 'react'

import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import TypingBox from '../Components/TypingBox/TypingBox';
function Home() {
  return (
<div className="canvas">

<div className='header'>
 <Header/>
</div>
<div>
  {/* <Menu countDown={"00"}/> */}
  
  <TypingBox/>
</div>
<div className='Footer'>
    
  <Footer/>
</div>
</div>  )
}

export default Home