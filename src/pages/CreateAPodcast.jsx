import React from 'react'
import Header from '../components/common/Header'
import CreateAPodcastForm from '../components/StartAPodcast/CreatePodcastForm'

function CreateAPodcast() {
  return (
    <div >
        <Header/>
        <div className="input-wrapper">
        <h1>Create A Podcast </h1>
        <CreateAPodcastForm/>
        </div>
      
    </div>
  )
}

export default CreateAPodcast
