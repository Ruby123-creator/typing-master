import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '../../ContextFiles/ThemeContext'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { errorMaping } from '../../Utilis/ErrorMsg'

function LoginForm({handleClose}) {
    const [email,setEmail] = useState('')

    const [password,setPassword] = useState('')
    const {theme} = useTheme();
    const handleSubmit =()=>{
        if(!email||!password){
            
            toast.error('🦄 Fill All The Details!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });            return;
        }
auth.signInWithEmailAndPassword( email, password)
  .then(() => {
    toast.success('🦄 Successfully Login!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });  
        handleClose();    
    
  })
  .catch((error) => {
    toast.error(errorMaping[error.code||'some error occurred'], {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });  
  });
      
    }

    return (
    <div>
        <Box
        p={3}
        style={{
            display:'flex',
            flexDirection:'column',
            gap:'20px',
        }}
        >
            <TextField
            variant='outlined'
            type='email'
            label='Enter Email'
            onChange={(e)=>{setEmail(e.target.value)}}
            InputLabelProps={{
                style:{
                    color:theme.textColor,
                }
            }}
            inputProps={{
                style:{
                    color:theme.textColor,
                }
            }}
            />
            <TextField
            variant='outlined'
            type='password'
            label='Enter Password'
            onChange={(e)=>{setPassword(e.target.value)}}
            InputLabelProps={{
                style:{
                    color:theme.textColor,
                }
            }}
            inputProps={{
                style:{
                    color:theme.textColor,
                }
            }}
            />
            <Button
            variant='outlined'
            size='large'
            onClick={handleSubmit}
            style={{
                backgroundColor:theme.textColor,
                color:theme.typeBoxText
            }}
            >Login</Button>
       
        </Box>
    </div>
  )
}

export default LoginForm