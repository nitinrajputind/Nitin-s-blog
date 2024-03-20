import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate()
  const[formData, setFormData] = useState({})
  const [errorMessage , setErrorMessage] = useState(null);
  const [loading , setLoading] = useState(false);
  const handleChange=(event)=>{
    setFormData({
      ...formData,
      [event.target.id] : event.target.value.trim()
    })
  }
  const handleSubmit = async (event)=>{
    event.preventDefault()
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage('please fill all the required fields')
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup',{
        method : 'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(formData)
      })
      const data = await res.json()
      if(data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      if(res.ok){
        navigate('/sign-in');
      }
      setLoading(false);
    } catch(err){
      setErrorMessage(err.message);
      setLoading(false);
    }
  }
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
        <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="">
            <Label value="Your username"/>
            <TextInput type="text" placeholder="Your username" id="username"  onChange={handleChange}/>
          </div>
          <div className="">
            <Label value="Your email"/>
            <TextInput type="email" placeholder="name@company.com" id="email"  onChange={handleChange}/>
          </div>
          <div className="">
            <Label value="Your password"/>
            <TextInput type="password" placeholder="Your password" id="password" autoComplete='true' onChange={handleChange} />
          </div>
          <Button gradientDuoTone={'purpleToPink'} type="submit" disabled={loading}>
            {
              loading ? (
                <>
                <Spinner size="sm"/>
                <span className="pl-3">Loading....</span>
                </>
              ) : "Sign Up"
            }
          </Button>
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>have an account ? </span>
          <Link to={'/sign-in'} className="text-blue-500">
          Sign In
          </Link>
        </div>
        {
          errorMessage && (
            <Alert className="mt-5" color={'failure'}>
              {errorMessage}
            </Alert>
          )
        }
        </div>
      </div>
    </div>
  );
}
