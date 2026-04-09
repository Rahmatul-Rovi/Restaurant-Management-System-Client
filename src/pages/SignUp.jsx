import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FaGoogle } from "react-icons/fa";
import { updateProfile } from "firebase/auth";

const SignUp = () => {
    const { createUser, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log("User Created:", loggedUser);

                updateProfile(loggedUser, {
                    displayName: name
                })
                .then(() => {
                    console.log("Profile Updated");
                    navigate('/');
                })
                .catch(err => console.error(err));
            })
            .catch(error => console.error(error));
    };

    const handleGoogleSignUp = () => {
        signInWithGoogle()
            .then(result => {
                console.log("Google User:", result.user);
                navigate('/');
            })
            .catch(error => console.error(error));
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-6">
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-orange-100 border border-orange-50 w-full max-w-md">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-slate-800">Join <span className="text-[#ff6b08]">Us</span></h2>
                    <p className="text-slate-400 mt-2 font-medium">Create an account to start ordering!</p>
                </div>

                <form onSubmit={handleSignUp} className="space-y-5">
                    <div className="form-control">
                        <label className="label text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                        <input name="name" type="text" placeholder="Your Name" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-[#ff6b08] outline-none rounded-2xl transition-all font-medium" required />
                    </div>
                    <div className="form-control">
                        <label className="label text-xs font-bold text-slate-500 uppercase ml-1">Email</label>
                        <input name="email" type="email" placeholder="Email Address" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-[#ff6b08] outline-none rounded-2xl transition-all font-medium" required />
                    </div>
                    <div className="form-control">
                        <label className="label text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
                        <input name="password" type="password" placeholder="Create Password" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-[#ff6b08] outline-none rounded-2xl transition-all font-medium" required />
                    </div>
                    
                    <button className="w-full py-5 bg-[#ff6b08] text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-orange-200 hover:bg-slate-900 transition-all duration-300">
                        Create Account
                    </button>
                </form>

                {/* Google Sign Up Section */}
                <div className="divider my-8 text-slate-300 text-xs font-bold uppercase tracking-widest">OR</div>

                <button 
                    onClick={handleGoogleSignUp}
                    className="w-full py-4 border-2 border-slate-100 rounded-2xl flex items-center justify-center gap-3 font-bold text-slate-700 hover:bg-slate-50 transition-all"
                >
                    <FaGoogle className="text-[#ff6b08]" /> Continue with Google
                </button>

                <p className="text-center mt-8 text-slate-500 font-medium">
                    Already have an account? <Link to="/login" className="text-[#ff6b08] font-bold">Login Here</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;