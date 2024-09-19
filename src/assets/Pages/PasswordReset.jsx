import React, { useEffect } from 'react';
import { supabase } from '../../SupabaseClient'; // Adjust path if needed

export default function ForgotPassword() {
    const [email, setEmail] = React.useState("");

    const handleReset = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);
        
        if (error) {
            alert(error.message);
        } else {
            alert("Check your email for the password reset link.");
        }
    };

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === "PASSWORD_RECOVERY") {
                const newPassword = prompt("What would you like your new password to be?");
                const { data, error } = await supabase.auth.updateUser({ password: newPassword });

                if (error) {
                    alert(error.message);
                } else {
                    alert("Password updated successfully!");
                }
            }
        });

        // Cleanup subscription on unmount
      
    }, []);

    return (
        <div className="flex justify-center mx-auto">
            <div>
                <form onSubmit={handleReset}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring"
                        placeholder="Enter your email"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full mb-5 px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}
