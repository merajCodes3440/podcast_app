import React from 'react'
import Header from '../components/common/Header'
import { useSelector } from 'react-redux';

function ProfilePage() {
    const user = useSelector((state)=>state.user.user);
  return (
    <div>
      <Header/>
        <h1>{user.name}</h1>
        <h2>{user.email}</h2>
        <h2>{user.uid}</h2>
    </div>
  )
}

export default ProfilePage
