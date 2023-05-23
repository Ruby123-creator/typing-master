import { AppBar, Modal, Tabs,Tab } from '@mui/material'
import './useraccount.css'
import React,{useState} from 'react'
import {Box} from '@mui/material'
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import { useTheme } from '../../ContextFiles/ThemeContext';
import GoogleButton from 'react-google-button';
import { auth } from '../../firebase';
import { signInWithPopup ,GoogleAuthProvider  } from 'firebase/auth';
import { toast } from 'react-toastify';
import { errorMaping } from '../../Utilis/ErrorMsg';
import {useAuthState} from 'react-firebase-hooks/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
function UserAccount() {
    const [open ,setOpen] = useState(false)
    const [value ,setValue] = useState(0)
    const {theme} = useTheme()
    const Navigate = useNavigate()
    const [user] =useAuthState(auth)
    
  const handleModalOpen =()=>{
    if(user){
         Navigate('/user')
    }
    else{
    setOpen(true);
    }
  }
  const handleClose=()=>{
    setOpen(false)
  }
  const handleChange=(e,v)=>{
    setValue(v)
  }
  const provider = new GoogleAuthProvider();

  const Googleauth=()=>{


    signInWithPopup(auth, provider)
    .then(() => {
      toast.success('Google Login Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        }); 
        handleClose()
    }).catch((error) => {
      
      toast.error(errorMaping[error.code]||'some error occurred', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        }); 
    });
  }
  const logout=()=>{
    auth.signOut().then(()=>{
      toast.success('signOut successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        }); 
        Navigate('/')
    }).catch(e=>{
      toast.error('some error occurred', {
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
  }
    return (
    <div>
      <div style={{display:'flex' ,gap:'20px'}}>
        <img src={user?.photoURL} alt="user" style={{width:'40px',borderRadius:'50%'}} onClick={handleModalOpen}/>
      {user && <LogoutIcon  onClick={logout} fontSize='large'/>}
      </div> 
        <Modal
         open={open}
         onClose={handleClose}
        style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
            
        }}
        >
        <div style={{width:"360px",
         border:`1px solid ${theme.textColor}`,
         padding:'2px',
         borderRadius:'5px',
         textAlign:'center'
      }}>
        <AppBar position='static' 
        style={{background:"transparent"}}
        >
            <Tabs
            value={value}
            onChange ={handleChange}
            
            variant ='fullWidth'>
                <Tab  label='Login' style={{color:theme.textColor}}></Tab>
                <Tab  label='Signup' style={{color:theme.textColor}}></Tab>

            </Tabs>
        </AppBar>
        {value===0 && <LoginForm handleClose ={handleClose}/> }
        {value===1 && <SignUpForm handleClose ={handleClose}/> }
        <Box>
          <span>OR</span>
          <GoogleButton style={{width:"100%" ,marginTop:'12px'}} onClick={Googleauth}/>
        </Box>
        
        </div>
        </Modal>
    </div>
  )
}

export default UserAccount