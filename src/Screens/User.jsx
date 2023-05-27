import React, { useState, useEffect } from 'react';
import { db ,auth} from '../firebase';
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
    let tempGraphData = [];
    const {uid} = auth.currentUser;
  const resultsRef = db.collection('Result');
  resultsRef
  .where('userId', '==', uid)
  .orderBy('timeStamp', 'desc')
  .get()
  .then(snapshot => {
      snapshot.docs.map(doc => {
          tempData.push({ ...doc.data() });
          tempGraphData.push([doc.data().timeStamp.toDate().toLocaleString().split(','), doc.data().wpm]);
      })
      setData(tempData);
      setGraphData(tempGraphData.reverse());
  })
  };
  useEffect(() => {
    if(!loading){
      fetchUserData();
    }
    if (!loading && !user) {
      navigate('/');
    } 
  
  }, [loading,navigate,user]);

  if (loading) {
    return (
      <div className="center-of-screen">
     <CircularProgress/>
      </div>
    )
   
  }
  return (<div className='canvas'>
    <div>
    <Header />
    </div>
      <div>
      <UserInfo totalTest={data.length}/>
      <TableData data={data}/>

      </div>
      <div>
     <Graph graphData={graphData}  />
     </div>
  </div>);
}

export default User;