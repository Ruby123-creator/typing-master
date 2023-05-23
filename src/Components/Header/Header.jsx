import React from 'react'
import UserAccount from '../UserAccount/UserAccount';
function Header() {
  return (
    <div className='header-section'>
        <div>
            <img src="https://play-lh.googleusercontent.com/uE-rLPFKIsgq4LWhHBOtkvHimgP8v-nKuqMsEZ4QRr4KZLUkJdJpXi5zx09s1YnsHw" width="50px" alt="" />
        </div>
        <div className='appName'>Typing Master</div>
        <div className='useraccount'>
          <UserAccount/>
          </div> 
    </div>
  )
}

export default Header