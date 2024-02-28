import React, { useState } from 'react'
import InputComponent from '../../common/Input';
import Button from '../../common/Button';
import {  signInWithEmailAndPassword} from "firebase/auth"
import { auth, db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../slices/userSlice';
import { toast } from 'react-toastify';



function LoginForm() {

  const dispatch =useDispatch();
const navigate =useNavigate();


  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [loading,setLoading] =useState(false);


  const handleLogin=async()=>{
    setLoading(true)
    if(email && password){
      try{
        // creating user's account 
        const userCredential = await signInWithEmailAndPassword(
         auth,
         email,
         password
        )
        const user =userCredential.user;
        // saving user's details
        const userDoc = await getDoc(doc(db,"users",user.uid));
        const userData = userDoc.data();
       // console.log("userData",userData);
        // save data into redux , call the redux action
  
        dispatch(setUser({
            name:userData.name,
            email:user.email,
            uid:user.uid,
            proflePic:userData.proflePic
        }))
        setLoading(false)
        toast.success("Login successful!")
        navigate("/profile");
     }
     catch(e){
       toast.error(e.message)
       setLoading(false)
     }
    }
    else{
       toast.error("Make sure Email and Password are not empty.")
       setLoading(false)
    }
   
}
  return (
    <> 
      <InputComponent
        state={email}
        setState={setEmail}
        placeholder="Email"
        type="text"
        required={true}
      />
      <InputComponent
        state={password}
        setState={setPassword}
        placeholder="Password"
        type="password"
        required={true}
      />
      
       <Button text={loading? "Loading...": "Signup"}
        onClick={handleLogin} disabled={loading}/>
    </>
  )
}

export default LoginForm
