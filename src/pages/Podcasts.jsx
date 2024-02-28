import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import { useDispatch, useSelector } from 'react-redux';
import { collection, onSnapshot, query } from 'firebase/firestore';
import {setPodcasts} from "../slices/podcastSlice"
import { db } from '../firebase';
import PodcastCard from '../components/common/Podcasts/PodcastCard';
import InputComponent from '../components/common/Input';

function PodcastPage() {
  const dispatch =useDispatch();
  const podcasts = useSelector((state)=>state.podcasts.podcasts);

  const [search,setSearch] = useState("");

  useEffect(()=>{
    const unsubscribe =onSnapshot(
      query(collection(db,"podcasts")),
      (querySnapshot)=>{
        const podcastsData =[];
        querySnapshot.forEach((doc)=>{
          podcastsData.push({id:doc.id,...doc.data()})
      })
        dispatch(setPodcasts(podcastsData))
      },
      (error)=>{
        console.error("Error Fetching Podcasts:", error)
      })
     return ()=>{
      unsubscribe()
     }
  },[dispatch]);
  const filteredPodcasts = podcasts.filter((item)=>item.title.trim().toLowerCase().includes(search.trim().toLowerCase()))
  return (
    <>
    <Header/>
    <div className="input-wrapper" style={{marginTop:"1rem"}}>
        <h1>Discover Podcast</h1> 
      <InputComponent 
      state={search}
      setState={setSearch}
      placeholder='Search By Title'
      type="text"
      />
      {filteredPodcasts.length> 0 ? (
        <div className='podcast-flex' style={{marginTop:"1.5rem"}}>
        {filteredPodcasts.map((item)=>{
          return <PodcastCard id={item.id} title={item.title} displayImage={item.displayImage}
          key={item.id} />
        })}
        </div>
      ):(<p> {search? "No Podcast Found" :"No Podcast on this Plateform"}</p>)}
    </div>
    </>
  )
}
export default PodcastPage
