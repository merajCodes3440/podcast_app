import React, { useEffect } from 'react'
import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/Profile';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { setUser }  from './slices/userSlice';
import { auth, db } from './firebase';
import { useDispatch } from 'react-redux';
import PrivateRoutes from './components/common/PrivateRoutes';
import CreateAPodcast from './pages/CreateAPodcast';
import PodcastPage from "./pages/Podcasts"
import PodcastDetailsPage from './pages/PodcastDetailsPage';
import CreateAnEpisodePage from './pages/CreateAnEpisodePage';

function App() {
  const dispatch =useDispatch();

  useEffect(()=>{
      const unsubscribeAuth = onAuthStateChanged(auth,(user)=>{
        if(user){
          const unsubscribeSnapShot = onSnapshot(
            doc(db,"users",user.uid),
            (userDoc)=>{
              if(userDoc.exists()){
                const userData = userDoc.data();
                dispatch(
                  setUser({
                    name:userData.name,
                    email:userData.email,
                    uid:user.uid,
                    // profilePic:userData.profilePic
                  })
                )
              }
            },
            (error)=>{
              console.error("Error fatching user data", error)
            }
          );
          return ()=>{
            unsubscribeSnapShot()
          }
        }
      });
      return ()=>{
        unsubscribeAuth();
      }
  },[])

  return (
    <div className="app">
       <ToastContainer />
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<SignupPage/>}/>
           <Route element={<PrivateRoutes/>}>
           <Route path="/profile" element={<ProfilePage/>}/>
           <Route path="/podcasts" element={<PodcastPage/>}/>
           <Route path="/start-a-podcast" element={<CreateAPodcast/>}/>
           <Route path="/podcasts/:id" element={<PodcastDetailsPage/>}/>
           <Route path="/podcasts/:id/create-episode" element={<CreateAnEpisodePage/>}/>
           </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
