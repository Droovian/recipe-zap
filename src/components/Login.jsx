import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [_, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await axios.post("http://localhost:3000/auth/login", {
                email,
                password
            });

            setCookies("access_token", response.data.token);
            window.localStorage.setItem("access_token", response.data.token);
            
            toast.success("Logged in successfully", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });

            await new Promise((resolve) => setTimeout(resolve, 2300));
            navigate('/');
            
        }
        catch(err){
          toast.error("Login failed! No record", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000, 
          });
        }
    }
  return (
    <div className="flex h-screen w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
     <ToastContainer />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-yellow-800">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  value={email}
                  required
                  onChange={(e)=>{setEmail(e.target.value)}}
                  className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  required
                  className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline "
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}

export default Login;
