import { createGlobalStyle } from "styled-components";

 export const GlobalStyles = createGlobalStyle`
 body{
 margin:0;
 padding:0;
  background:${({theme})=>theme.background};
 color:${({theme})=>theme.textColor};
//   padding:50px;
  font-size:20px;
  font-weight:700;

 }
 .canvas{
   display:grid;
   grid-template-rows: repeat(3);
   grid-auto-flow:row;
  min-height:100vh;
  align-items:center;
  text-align:center;
  gap:0.5rem;
  width:100vw;

  
 }

 .header-section{
  display: flex;
  justify-content:space-between;
  padding:0 8px;
  box-shadow: 2px 2px 13px gray;
  align-items: center;

}
.appName{
  font-size: 30px;
  font-weight: 700;
}
.useraccount a{
  color:${({theme})=>theme.textColor};
}



.menu{
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 65%;
  margin-bottom: 12px;
  padding: 10px 0;
  color:${({theme})=>theme.textColor};
  border-radius: 5px;
padding: 0 10px;
  /* padding: 10px 20px; */
  border: 1px solid gray;
  box-shadow: 4px 5px 4px #515050;

}
.select{
  margin-right: 10px;
  text-align: center;
}
.menu .modes{
  display: flex;
}
.time{
  margin: 4px 5px;
  cursor: pointer;
  padding: 1px 4px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #dddada;

}



.box{
   
   display: block;
   /* max-width: 500px; */
   width: 70%;
   margin-left: auto;
   margin-right: auto;

}
.Typing-box{
    border: 1px solid grey;
    border-radius: 10px;
    padding: 30px 10px;
    display: flex;
    flex-wrap: wrap;
    color:${({theme})=>theme.typeBoxText};
    font-size: 18px;
    font-weight: 500;
    font-family: 'Roboto Mono', monospace;
        box-shadow: 4px 5px 4px #515050;
}
.hidden-input{
    opacity: 0;
}
.words{
    margin-right: 10px;
}
.current{
    border-left: 1px solid;
    animation:blinking 2s infinite;
    animation-timing-function:ease;

    
}
@keyframes blinking{
    0%{border-left-color: grey;}
    25%{border-left-color: black;}
    50%{border-left-color: grey;}
    75%{border-left-color: black;}
    100%{border-left-color: grey;}
}
.current-right{
    border-right: 1px solid;
    animation:blinkingRight 2s infinite;
    animation-timing-function:ease;

    
}
@keyframes blinkingRight{
    0%{border-right-color: grey;}
    25%{border-right-color: black;}
    50%{border-right-color: grey;}
    75%{border-right-color: black;}
    100%{border-right-color: grey;}
}

.correct{
    color: green;
}
.incorrect{
    color: red;
}
.footer-section{
    
  padding:2px 20px;
  display: flex;
  justify-content:space-between;
  box-shadow: 2px 2px 13px gray;
  align-items: center;

}

.contact ul{
  display: flex;

}
ul li{
  margin: 0 5px;
 list-style: none;  
 color:${({theme})=>theme.textColor};
 cursor: pointer;

}
ul a{
  color:${({theme})=>theme.textColor};
}




.result-box{
  display: flex;
  justify-content: space-around;
  align-items: center;

}

.left-stats{
  width: 50%;
}
.right-stats{
  width: 50%;
}
.title{
  margin-right:25px;
  
}

.center-of-screen{
  display:flex;
  min-height:100vh;
  justify-content:center;
  align-items:center;
}
`
  // color:${({theme})=>theme.textColor};
