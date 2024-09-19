import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../SupabaseClient';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSignup = async (e) => {
        setError(null);
        setSuccess(null);
        e.preventDefault();
       try{
        const { data, error } = await supabase.auth.signUp(
            {
              email: email,
              password: password ,
              options: {
                data: {
                  first_name: username,
                }
              }
            }
          ) 
         
          console.log(data)
          if (error) {
            alert(error.message)
          }else {
              setSuccess("Account created successfully. Please check your email for verification link.")
          }
       } catch (error){
           setError(error.message)
       } 
    };
    
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                <form onSubmit={handleSignup} className="w-full max-w-md">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
                    </div>
                    <div className="flex items-center justify-center mt-6">
                       
                        <Link to="/signup" className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize
                         border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
                            sign up
                        </Link>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <input type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 
                    dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300
                     focus:outline-none" placeholder="Username" value={username}  onChange={(e) => setUsername (e.target.value)}/>
                    <input type="email" className="block w-full py-3 mt-4 text-gray-700 bg-white border rounded-lg px-11
                     dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 
                     focus:outline-none" placeholder="Email address"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" className="block w-full py-3 mt-4 text-gray-700 bg-white border rounded-lg px-11
                     dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300
                      focus:outline-none" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="w-full px-6 py-3 mt-6 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none">
                        Sign Up
                    </button>
                    <div className="mt-6 text-center">
                        <Link to="/signin" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                            Already have an account?
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}
