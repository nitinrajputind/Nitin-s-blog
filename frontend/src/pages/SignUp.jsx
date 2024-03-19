import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-6">
        {/* left Side Conatnier */}
        <div className="flex-1">
          <Link className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Nitin&apos;s
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
          Welcome to our blog community! Signing up is your first step towards unlocking a world of knowledge, creativity, and connection.
          </p>
        </div>
        {/* Right Side Conatnier */}
        <div className="flex-1">
        <form action="" className="flex flex-col gap-4">
          <div className="">
            <Label value="Your username"/>
            <TextInput type="text" placeholder="Your username" id="username"/>
          </div>
          <div className="">
            <Label value="Your email"/>
            <TextInput type="text" placeholder="name@company.com" id="email"/>
          </div>
          <div className="">
            <Label value="Your password"/>
            <TextInput type="text" placeholder="Your password" id="password"/>
          </div>
          <Button gradientDuoTone={'purpleToPink'} type="submit">Sign Up</Button>
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>have an account ? </span>
          <Link to={'/sign-in'} className="text-blue-500">
          Sign In
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}
