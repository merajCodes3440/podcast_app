import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { FaPause, FaPlay, FaVolumeDown, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

function AudioPlayer({ audioSrc, image }) {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  const handleDuration = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const handleVolume = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMute(newVolume === 0);
  };

  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const toggleMute = () => {
    const newMute = !isMute;
    setIsMute(newMute);
    setVolume(newMute ? 0 : 1);
    audioRef.current.volume = newMute ? 0 : 1;
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

useEffect(() => {
   
    const audio = audioRef.current;
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetaDate);
      audio.addEventListener("ended", handleEnded);
      return ()=>{
       
      audio.removeEventListener("timeupdate", handleTimeUpdate); 
      audio.removeEventListener("loadedmetadata", handleLoadedMetaDate); 
      audio.removeEventListener("ended", handleEnded); 
      }
  }, []);


  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetaDate = () => {
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  return (
    <div className="custom-audio-player">
      <img src={image} className="audio-player-image" alt="Audio Player" />
      <audio src={audioSrc} ref={audioRef}></audio>
      <p style={{ cursor: "pointer" }} onClick={togglePlay}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </p>
      <div className="duration-flex">
        <p>{formatTime(currentTime)}</p>
        <input
          type="range"
          onChange={handleDuration}
          value={currentTime}
          max={duration}
          step={1}
          className="duration-range"
        />
        <p>{formatTime(duration)}</p>
        <p onClick={toggleMute}>
          {isMute ? <FaVolumeMute /> : volume > 0.5 ? <FaVolumeUp /> : <FaVolumeDown />}
        </p>
        <input
          type="range"
          onChange={handleVolume}
          value={isMute ? 0 : volume}
          max={1}
          step={0.01}
          className="volume-range"
        />
      </div>
    </div>
  );
}



export default AudioPlayer;
