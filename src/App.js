// import { useTheme } from '@emotion/react';
import './App.css';

import { GlobalStyles } from './Styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { useTheme } from './ContextFiles/ThemeContext';
import 'react-toastify/dist/ReactToastify.css';
import User from './Screens/User';
import { Route, Routes } from 'react-router-dom';
import Home from './Screens/Home';

function App() {
    const {theme} = useTheme()
  
  return (
    <ThemeProvider theme={theme}>
          <ToastContainer />

    <GlobalStyles/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/user' element={<User/>}/>

     </Routes>
    
      </ThemeProvider>
  );
}

export default App;
