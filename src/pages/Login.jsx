// src/pages/Login.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const { signIn, signInWithGoogle } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        
        signIn(email, password)
            .then(result => console.log("Logged In", result.user))
            .catch(error => console.error(error));
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-orange-100 border border-orange-50 w-full max-w-md">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-slate-800">Welcome <span className="text-[#ff6b08]">Back</span></h2>
                    <p className="text-slate-400 mt-2 font-medium">Ready for your next delicious meal?</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="form-control">
                        <label className="label text-xs font-bold text-slate-500 uppercase ml-1">Email</label>
                        <input name="email" type="email" placeholder="Email" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-[#ff6b08] outline-none rounded-2xl transition-all font-medium" required />
                    </div>
                    <div className="form-control">
                        <label className="label text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
                        <input name="password" type="password" placeholder="Password" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-[#ff6b08] outline-none rounded-2xl transition-all font-medium" required />
                    </div>
                    
                    <button className="w-full py-5 bg-[#ff6b08] text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-orange-200 hover:bg-slate-900 transition-all duration-300">
                        Login
                    </button>
                </form>

                <div className="divider my-8 text-slate-300 text-xs font-bold uppercase tracking-widest">OR</div>

                <button onClick={signInWithGoogle} className="w-full py-4 border-2 border-slate-100 rounded-2xl flex items-center justify-center gap-3 font-bold text-slate-700 hover:bg-slate-300 transition-all">
                    <FaGoogle className="text-[#ff6b08]" /> Continue with Google
                </button>

                <p className="text-center mt-8 text-slate-500 font-medium">
                    New to TastyTwists? <Link to="/signup" className="text-[#ff6b08] font-bold">Create Account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;