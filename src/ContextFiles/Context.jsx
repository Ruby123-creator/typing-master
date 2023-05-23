import { createContext, useState } from "react";
import React from 'react'
 const ContextApi = createContext();

 export const ContextProvider =({children})=>{
   const [testTime ,setTestTime] = useState(16)

   const values ={
    testTime,
    setTestTime
   }

    return(
        <ContextApi.Provider value ={values} >{children}</ContextApi.Provider>
    )
 }

 export const useTestMode = () => React.useContext(ContextApi);
