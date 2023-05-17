import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function Header() {
  return (
    <div className='header-section'>
        <div>
            <img src="https://play-lh.googleusercontent.com/uE-rLPFKIsgq4LWhHBOtkvHimgP8v-nKuqMsEZ4QRr4KZLUkJdJpXi5zx09s1YnsHw" width="50px" alt="" />
        </div>
        <div className='appName'>Typing Master</div>
        <div className='useraccount'>
           <a href="http://" target="_blank" rel="noopener noreferrer"><AccountCircleIcon/></a> </div>
    </div>
  )
}

export default Header