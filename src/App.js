// import { useTheme } from '@emotion/react';
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import TypingBox from './Components/TypingBox/TypingBox';
import { GlobalStyles } from './Styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { useTheme } from './ContextFiles/ThemeContext';
function App() {
    const {theme} = useTheme()
  
  return (
    <ThemeProvider theme={theme}>
    <GlobalStyles/>

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
    </div>
      </ThemeProvider>
  );
}

export default App;
