import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';


function UserInfo({ totalTest }) {
    const [user] = useAuthState(auth)
    return (

            <div className="userinfo">
                <div className="image">
                    <img src={user.photoURL} style={{ width:'200px', borderRadius:'50%'}} />
                </div>
                <div className="info">
                    <div className="email">
                        {user.email}
                    </div>
                    <div className="joinAt">
                        {user.metadata.creationTime}
                    </div>
                    <div className="test">
                Total Test Taken  :- <span>{totalTest}</span>

            </div>
                </div>
            </div>
            
        
    )
}

export default UserInfo;