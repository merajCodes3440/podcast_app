import React, { useState } from 'react'
import Header from '../components/common/Header'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import InputComponent from '../components/common/Input';
import Button from '../components/common/Button';
import FileInput from '../components/common/Input/FilesInput';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db, storage } from '../firebase';
import { toast } from 'react-toastify';

function CreateAnEpisodePage() {

    
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState(""); 
    const [audioFile, setAudioFile] = useState(); 
    const [loading,setLoading] =useState(false);
    const navigate= useNavigate();
    const dispatch =useDispatch();
    const {id} =useParams();

    const audioFileHandle =(file)=>{
        setAudioFile(file)
    }

    const handleSubmit=async()=>{
       if(title,desc,audioFile,id){
         try{
             setLoading(true); 
             const audioRef = ref(
              storage,
              `podcast-episode/${auth.currentUser.uid}/${Date.now()}`
             )
             await uploadBytes(audioRef,audioFile)
             const audioURL =await getDownloadURL(audioRef);
             const episodeData ={
              title:title,
              description:desc,
              audioFile:audioURL,
             };
             await addDoc(
              collection(db,'podcasts',id,'episodes'),
              episodeData,
             )
             toast.success("Episode Created Successfully!")
             setLoading(false);
             navigate(`/podcasts/${id}`)
             setTitle("")
             setDesc("")
             setAudioFile("")
         }

         catch(e){
            toast.error(e.message);
            setLoading(false)
         }
       }
       else{
        toast.error("All File Should Be there");
        setLoading(false)
       }
    }
    
  return (
    <div style={{marginBottom:"5rem"}}>
    <Header/>
    <div className="input-wrapper" >
        <h1>Create An Episode</h1>
        <InputComponent
        state={title}
        setState={setTitle}
        placeholder="Title"
        type="text"
        required={true}
      />
      <InputComponent
        state={desc}
        setState={setDesc}
        placeholder="Description"
        type="text"
        required={true}
      />

    <FileInput accept={"audio/*"} id="audio-file-input" 
    text={"Upload Audio File"} fileHandleFnc={audioFileHandle}/>
        
     <Button text={loading? "Loading...": "Create Episode"} disabled={loading} 
     onClick={handleSubmit} />
    </div>
    </div>
  )
}

export default CreateAnEpisodePage;
