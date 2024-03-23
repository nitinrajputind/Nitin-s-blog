import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch , useSelector} from 'react-redux';
import { SignInStart, SignInSuccess , SignInFailure } from '../redux/reducers/user/userSlice';
import OAuth from "../components/OAuth";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading , error:errorMessage} = useSelector(state => state.user)
  const [formData, setFormData] = useState({});
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value.trim(),
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(SignInFailure('please fill all the required fields'));
    }
    try {
      dispatch(SignInStart())
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(SignInFailure(data.message));
      }
      if (res.ok) {
        dispatch(SignInSuccess(data))
        navigate("/");
      }
    } catch (err) {
      dispatch(SignInFailure(err.message));
    }
  };
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
            Welcome to our blog community! Signing up is your first step towards
            unlocking a world of knowledge, creativity, and connection.
          </p>
        </div>
        {/* Right Side Conatnier */}
        <div className="flex-1">
          <form
            action=""
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="************"
                id="password"
                autoComplete="true"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone={"purpleToPink"}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading....</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don&apos;t have an account ? </span>
            <Link to={"/sign-up"} className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color={"failure"}>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
