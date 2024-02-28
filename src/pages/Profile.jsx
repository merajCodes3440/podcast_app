// import React, { useState } from 'react'
// import Header from '../components/common/Header'
// import { useSelector } from 'react-redux';
// import Button from '../components/common/Button';
// import { toast } from 'react-toastify';
// import { auth, db } from '../firebase';
// import { signOut } from 'firebase/auth';
// import Loader from '../components/common/Loader';

// const ProfilePage= ()=> {

//      const [userData, setUserData] = useState(null);
//     const user = useSelector((state)=>state.user.user);
//     console.log("profile user data ",user)

//     if(!user){
//       return <Loader/>
//     }

//     const handleLogout=()=>{
//       signOut(auth).then(() => {
//         // Sign-out successful.
//         toast.success("User logged out!")
//       }).catch((error) => {
//         // An error happened.
//         toast.error(error.message)
//       });
      
//     }
//   return (
//     <div>
//       <Header/>
//       <div className="input-wrapper">
//       <h1>{user.name}</h1>
//         <h3>{user.email}</h3>
//         {/* <h2>{user.uid}</h2> */}
//         {user.profilePic && <img src={user.profilePic} alt="Profile" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
//         <Button text={"Logout"} onClick={handleLogout} />
//       </div>
        
//     </div>
//   )
// }

// export default ProfilePage

import React from 'react';
import Header from '../components/common/Header';
import { useSelector } from 'react-redux';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import Loader from '../components/common/Loader';

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  console.log("user data>>>>>>",user)

  if (!user) {
    return <Loader />;
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success('User logged out!');
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
  };

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>{user.name}</h1>
        <h3>{user.email}</h3>
        {user.profilePic && (
          <img
            src={user.profilePic}
            alt="Profile"
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
        )}
        <Button text={'Logout'} onClick={handleLogout} />
      </div>
    </div>
  );
};

export default ProfilePage;


