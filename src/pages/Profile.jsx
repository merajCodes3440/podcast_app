import React, { useState } from 'react'
import Header from '../components/common/Header'
import { useSelector } from 'react-redux';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import Loader from '../components/common/Loader';
import userimg from "../assets/user.jpg"

const ProfilePage= ()=> {

     const [userData, setUserData] = useState(null);
    const user = useSelector((state)=>state.user.user);
    // console.log("profile user data ",user)

    if(!user){
      return <Loader/>
    }

    const handleLogout=()=>{
      signOut(auth).then(() => {
        // Sign-out successful.
        toast.success("User logged out!")
      }).catch((error) => {
        // An error happened.
        toast.error(error.message)
      });
      
    }

    
  return (
    <div>
      <Header/>
      <div className="input-wrapper">
          <div className="profile-cards">
            <div className='profile-card'>
                <img src={userimg} alt="image"  style={{width:"9rem",height:"10rem" ,marginLeft:"auto",marginRight:"auto",borderRadius:".3rem"}}/>
                <p className='card-p'>{user.name}</p>
                <p className='card-p' >{user.email}</p>
                <Button text={"Logout"} onClick={handleLogout} style={{width:"90%",textAlign:"center",marginLeft:"auto",marginRight:"auto"}} />
            </div>
          </div>
      </div>
        
    </div>
  )
}

export default ProfilePage
