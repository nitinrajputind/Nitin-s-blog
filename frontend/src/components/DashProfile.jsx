import { useSelector } from "react-redux";
import { Button, TextInput }  from 'flowbite-react'

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="UserProfile"
            className="rounded-full w-full h-full border-8 border-[lightgray] object-cover"
          />
        </div>
        <TextInput type="text" id='username' placeholder="username" defaultValue={currentUser.username}/>
        <TextInput type="text" id='email' placeholder="abc@gmail.com" defaultValue={currentUser.email}/>
        <TextInput type="password" id='password' placeholder="password"/>
        <Button type="submit" gradientDuoTone={'purpleToBlue'} outline>
            Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Account Delete</span>
        <span className="cursor-pointer">Account Delete</span>
      </div>
    </div>
  );
}
