import React, { useEffect, useState } from 'react';
import VideoSlider from '../COMPONENTS/VideoSilides';
import Navbar from '../COMPONENTS/nav';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import eye from "../assets/eye-off-outline.svg";
import eyeclosed from "../assets/eye-outline.svg";
import { BsEyeFill } from 'react-icons/bs';

function Home() {
  const [isShown, setIsShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const HandleShow = () => {
    setIsShown(!isShown);
  };

  const handleLogin = async () => {
    setLoading(true);

    if (!email || !password) {
      toast.error("Please provide all credentials");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/Users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (res.status === 200) {
        toast.success("Logged in successfully!");
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else if (res.status === 400) {
        toast.error("Bad request. Check your email or password.");
      } else if (res.status === 403) {
        toast.error(`Invalid password`);
      }else if(res.status == 404){
        toast.error("User Not found");
      }else{
        toast.error("Failed to login");
      }
    } catch (error) {
      toast.error("Failed to login: " + error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
<>
  <Navbar />
  <div 
    className="w-full min-h-screen flex items-center justify-center bg-cover bg-center relative" 
    style={{ backgroundImage: `url('/bg.png')` }}
  >
    <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/70 to-zinc-900/70"></div>

    <ToastContainer />
    <div className="relative w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-br from-gray-900/80 to-orange-950/80 rounded-xl p-10 shadow-md backdrop-blur-sm">
        <div className="flex justify-center">
          <p className="text-white text-center text-[20px] font-semibold mb-6">Login</p>
        </div>
        <div>
          <div className="mb-5">
            <input 
              type="text" 
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              placeholder="Email" 
              className="w-full h-[45px] border border-b-orange-400 bg-transparent text-[14px] font-semibold rounded-full text-white shadow-md p-4 outline-none" 
            />
          </div>
          <div className="mb-8 relative">
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
              type={isShown ? "text" : "password"} 
              placeholder="Password" 
              className="w-full h-[45px] border border-b-orange-400 bg-transparent text-[14px] font-semibold text-white rounded-full shadow-md p-4 outline-none" 
            />
            <img 
              src={isShown ? eye : eyeclosed} 
              className="w-5 h-5 absolute top-3.5 right-4 cursor-pointer" 
              onClick={HandleShow} 
              alt="Toggle visibility" 
            />
          </div>

          <div>
            <input 
              type="button" 
              onClick={handleLogin} 
              value={loading ? "Loading..." : "Login"} 
              className="p-2 w-full h-[45px] rounded-full bg-orange-400 hover:bg-orange-600 transition-all duration-500 cursor-pointer font-semibold text-white" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</>

  );
}

export default Home;
