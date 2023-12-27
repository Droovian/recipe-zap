import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {

        e.preventDefault();

        try{
            // console.log('Sending registration request:', { username, email, password });

            const response = await axios.post("http://localhost:3000/auth/register", {
                username,
                email,
                password
            });
            // console.log('Reg response', + response.data);

            setSuccessMessage('Registration complete, now login');
        }
        catch(err){
            setError('User already exists, login');
        }
    }
    return ( 
        <div className="flex h-screen w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-yellow-800">
            Enter your details
          </h2>
          {error && <p className='flex justify-center text-red-500 font-light'>{error}</p>}
          {successMessage && <p className='flex justify-center text-green-500 font-light'>{successMessage}</p>}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e)=> setUsername(e.target.value)}
                  required
                  className="mb-3 p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  value={email}
                  required
                  onChange={(e)=> setEmail(e.target.value)}
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
                  value={password}
                  type="password"
                  required
                  onChange={(e)=> setPassword(e.target.value)}
                  className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

              <button type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline">
                Submit
              </button>

          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Have an account?{' '}
            <Link to='/auth' className="font-semibold leading-6 text-yellow-500">
              Login
            </Link>
          </p>
        </div>
      </div>
     );
}
 
export default Register;