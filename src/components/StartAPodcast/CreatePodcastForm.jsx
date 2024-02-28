import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputComponent from '../common/Input';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import FileInput from '../common/Input/FilesInput';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../firebase';
import { addDoc, collection} from 'firebase/firestore';

function CreateAPodcastForm() {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState(""); 
  const [displayImage, setDisplayImage] = useState(); 
  const [bannerImage, setBannerImage] = useState(); 
  const [loading,setLoading] =useState(false);
  
  const dispatch =useDispatch();
  const navigate= useNavigate(); 

  const handleSubmit = async()=>{
    if(title && desc && displayImage && bannerImage){
      setLoading(true);

     try{
      const bannerImageRef = ref(
        storage,
        `podcasts/${auth.currentUser.uid}/${Date.now()}`
      );
       await uploadBytes(bannerImageRef,bannerImage);
       const bannerImageUrl = await getDownloadURL(bannerImageRef);
       toast.success("File Uploaded")

       const displayImageRef = ref(
        storage,
        `podcasts/${auth.currentUser.uid}/${Date.now()}`
      );
       await uploadBytes(displayImageRef,displayImage);
       const displayImageUrl = await getDownloadURL(displayImageRef);
       const podcastData ={
        title:title,
        description:desc,
        bannerImage:bannerImageUrl,
        displayImage:displayImageUrl,
        createdBy:auth.currentUser.uid,
       }
       const docRef = await addDoc(collection(db,"podcasts"),podcastData);
        setTitle(""),
        setDesc("");
        setBannerImage(null);
        setDisplayImage(null);
        toast.success("Podcast Created");
        setLoading(false);
    }
     catch(e){
      toast.error(e.message);
      console.log(e)
      setLoading(false);
     }
       // 1. upload file -> get downloadable link
       // 2. create a new doc link a new collecton called podcast
       // 3. save this new podcast episodes state in our  podcast 
      toast.success("form submit")
    }
    else{ 
      toast.error("Please Upload All The Files")
    }
  }
  const bannerImageHandle =(file)=>{
    setBannerImage(file)
  }
  const displayImageHandle =(file)=>{
    setDisplayImage(file);
  }
  return (
    <>
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
     <FileInput accept={"image/*"} id="display-image-input"  
    text={"Display Image Upload "} fileHandleFnc={displayImageHandle}/>


      <FileInput accept={"image/*"} id="banner-image-input" 
    text={"Banner Image Upload "} fileHandleFnc={bannerImageHandle}/>
        
     <Button text={loading? "Loading...": "Create Podcast"} disabled={loading} 
     onClick={handleSubmit} />

    </>
  )
}

export default CreateAPodcastForm
