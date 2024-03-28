import { useSelector } from "react-redux";
import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { app } from "../firebase";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { UpdateStart, UpdateSucess, UpdateFailure } from '../redux/reducers/user/userSlice';
import { useDispatch } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setimageFileUrl] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData , setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(e.target.files[0]);
      setimageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write : if
    //       request.resource.size <2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = `${currentUser.username}_${new Date().getDate()}_${
      imageFile.name
    }`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapShort) => {
        const progress =
          (snapShort.bytesTransferred / snapShort.totalBytes) * 100;
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "could not upload image : (File must be less than 2Mb) ",
          error
        );
        setImageFileUploadingProgress(null);
        setImageFile(null);
        setimageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setimageFileUrl(downloadUrl);
          setFormData({...formData, profilePicture : downloadUrl})
        });
      }
    );
  };
  const handleChange = (event) => {
    setFormData({...formData , [event.target.id] : event.target.value});
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(Object.keys(formData).length === 0){
      return 
    }
    try {
      dispatch(UpdateStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'PUT',
        headers : {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
      })
      const data = await res.json()
      console.log(data)
      if(!res.ok){
        return dispatch(UpdateFailure(data.message))
      }
      dispatch(UpdateSucess(data))

    } catch (error) {
      dispatch(UpdateFailure(error.message))
    }
  };
  console.log(formData);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="imgage/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          className="hidden"
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadingProgress && (
            <CircularProgressbar
              value={imageFileUploadingProgress || 0}
              text={`${imageFileUploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152, 199,${
                    imageFileUploadingProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="UserProfile"
            className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover ${
              imageFileUploadingProgress &&
              imageFileUploadingProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color={"failure"}>{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="email"
          placeholder="abc@gmail.com"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          autoComplete="true"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone={"purpleToBlue"} outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Account Delete</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
