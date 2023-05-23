import React, { useState, useEffect } from 'react';
import { auth ,db } from '../firebase';
import { getDocs ,collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import TableData from '../Components/TableData';
import Graph from '../Components/Graph';
import UserInfo from '../Components/UserInfo';
import Header from '../Components/Header/Header';
function User() {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  // const [dataLoad, setdataLoad] = useState(true)
  const fetchUserData = async () => {
    let tempData = [];
    let tempgraphData = [];
  console.log("hello")
  const { uid } = auth.currentUser;

    const resultsRef = await getDocs(collection(db, "Result"))
    resultsRef.docs.forEach((doc)=>{
            console.log(doc.data())

        tempData.push({...doc.data()})
        tempgraphData.push([doc.data().timeStamp.toDate().toLocaleString().split(',')[0] ,doc.data().wpm])
    })
    
      setData(tempData)
      setGraphData(tempgraphData)
  };
  useEffect(() => {
    if(!loading){
      fetchUserData();
    }
    if (!loading && !user) {
      navigate('/');
    } 
  
  }, [loading]);

  if (loading) {
    return (
      <div className="center-of-screen">
     <CircularProgress/>
      </div>
    )
   
  }
  return (<div className=''>
    <div>
    <Header />
    </div>
    <div className='user-data'>
      <div>
      <UserInfo totalTest={data.length}/>

      </div>
      <div className='userGraph'>
     <Graph graphData={graphData}  />
     </div>
     </div>
    
    <div style={{margin:'40px'}} >
    <TableData data={data}/>
    </div>
  </div>);
}

export default User;