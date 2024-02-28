import React from "react";
import Button from "../../Button";

function EpisodeDetails({ title, description, audioFile, onClick ,index}) {
  return (
    <div  style={{width:"100%"}}>
      <h1 style={{ textAlign: "left", marginBottom: "0" }}> {index}. {title}</h1>
      <p style={{ marginLeft: "1rem" }} className="podcast-description">
        {description}
      </p>
      <Button
        text={"Play"}
        onClick={() => onClick(audioFile)}
        style={{width:"100px"}}
      />
    </div>
  );
}

export default EpisodeDetails;
