import React, { useState } from "react";
import InputComponent from "../../common/Input";
import Button from "../../common/Button";
import { auth, db, storage } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignupForm() {
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileURL, setFileURL] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);

    if (password == conformPassword && password.length >= 6) {
      try {
        // creating user's account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Upload file to Firebase Storage
        const storageRef = storage.ref();
        const fileRef = storageRef.child(`profile-pics/${user.uid}`);
        await fileRef.put(file);
        const downloadURL = await fileRef.getDownloadURL();

        // saving user's details
        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
          profilePic: downloadURL,
        });
        // save data into redux , call the redux action
        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
            profilePic: downloadURL,
          })
        );
        setLoading(false);
        toast.success("user has been created!");
        navigate("/profile");
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      // throw an error ---
      if (password.length <= 6) {
        toast.error("your password should not be less then 6 digits.");
      } else if (password != conformPassword) {
        toast.error("password and conform password are not matching!.");
      }
    }
    setLoading(false);
  };

  return (
    <>
      <InputComponent
        state={fullName}
        setState={setFullName}
        placeholder="Full Name"
        type="text"
        required={true}
      />
      <InputComponent
        state={email}
        setState={setEmail}
        placeholder="Email"
        type="text"
        required={true}
      />
      <InputComponent
        state={password}
        setState={setPassword}
        placeholder="Password"
        type="password"
        required={true}
      />
      <InputComponent
        state={conformPassword}
        setState={setConformPassword}
        placeholder="Conform Password"
        type="password"
        required={true}
      />

      <InputComponent
        state={fileURL}
        setState={setFileURL}
        placeholder="Profile pic"
        type="file"
        required={true}
      />

      <Button
        text={loading ? "Loading..." : "Signup"}
        disabled={loading}
        onClick={handleSignup}
      />
    </>
  );
}

export default SignupForm;
