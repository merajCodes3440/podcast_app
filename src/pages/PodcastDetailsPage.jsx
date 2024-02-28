import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import Header from "../components/common/Header";
import { toast } from "react-toastify";
import Button from "../components/common/Button";
import EpisodeDetails from "../components/common/Podcasts/EpisodeDetails";
import AudioPlayer from "../components/common/Podcasts/AudioPlayer";

function PodcastDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [playingFile,setPlayingFile]  =useState("")
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setPodcast({ id: id, ...docSnap.data() });
        toast.success("Podcast Found!");
      } else {
        // docSnap.data() will be undefined in this case
        toast.error("No Such Podcast!");
        navigate("/podcasts");
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodesData = [];
        querySnapshot.forEach((doc) => {
          episodesData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodesData);
      },
      (error) => {
        console.error("Error Featching Episodes", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [id]);

  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "0rem" }}>
        {podcast.id && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "1rem",
              }}
            >
              <h1 className="podcast-title-heading">{podcast.title}</h1>

              {podcast.createdBy == auth.currentUser.uid && (
                <Button
                  style={{ margin: 0, width: "300px !importent" }}
                  text={"Create Episode"}
                  onClick={() => {
                    navigate(`/podcasts/${id}/create-episode`);
                  }}
                />
              )}
            </div>

            <div className="banner-wrapper">
              <img src={podcast.bannerImage} />
            </div>
            <p className="podcast-description">{podcast.description}</p>
            <h1 className="podcast-title-heading">Episodes</h1>
            {episodes.length > 0 ? (
              <>
                {episodes.map((episode,index) => {
                  return (
                    <EpisodeDetails
                      key={index}
                      index={index+1}
                      title={episode.title}
                      description={episode.description}
                      audioFile={episode.audioFile}
                      onClick={(file) =>  setPlayingFile(file)}
                    />
                  );
                })}
              </>
            ) : (
              <p>No Episodes</p>
            )}
          </>
        )}
      </div>
      {playingFile &&  <AudioPlayer audioSrc={playingFile} image={podcast.displayImage} /> }
     
    </div>
  );
}

export default PodcastDetailsPage;
