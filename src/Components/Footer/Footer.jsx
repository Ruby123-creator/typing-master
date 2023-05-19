import React ,{useState} from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Select from 'react-select';
import { themeOptions } from '../../Utilis/ThemeOption';
import './footer.css'
import { useTheme } from '../../ContextFiles/ThemeContext';
function Footer() {
    const {setTheme,theme} = useTheme()
    console.log(theme)
    const handleChange=(e)=>{
      setTheme(e.value)
      localStorage.setItem("theme",JSON.stringify(e.value))
    }
  return (
    <div className='footer-section'>
        <div className='contact'>
            <ul>
                <li><a href="https://github.com/Ruby123-creator" target="_blank" rel="noopener noreferrer"><GitHubIcon/></a></li>
                <li><a href="https://portfolio-gamma-murex-36.vercel.app/" target="_blank" rel="noopener noreferrer"><AccountCircleIcon/></a></li>
                <li><a href="http://" target="_blank" rel="noopener noreferrer"><EmailIcon/></a></li>
                <li><a href="http://" target="_blank" rel="noopener noreferrer"><DocumentScannerIcon/></a></li>
                <li><a href="https://www.linkedin.com/in/ruby-pal-123creator/" target="_blank" rel="noopener noreferrer"><LinkedInIcon/></a></li>

            </ul>
        </div>
        <div className='selectTheme'>
         <Select
         onChange={handleChange}
         options={themeOptions}
         menuPlacement='top'
         defaultValue={{label:theme.label,value:theme.value}}
         />

        </div>
    </div>
  )
}

export default Footer