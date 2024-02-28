import React from 'react';
import "./style.css"
import { Link } from 'react-router-dom';
import { CiPlay1 } from "react-icons/ci";


function PodcastCard({id, title,displayImage}) {
  
  return (
    <Link to={`/podcasts/${id}`}>
    <div className='podcast-card'>
      <img className="display-img-podcast" src={displayImage} />
      <div className="card-title-flex">
      <p className='title-podcast'>{title}</p>
      <p style={{color:"white"}}><CiPlay1/> </p>
      </div>
    </div>
    </Link>
  )
}

export default PodcastCard;
