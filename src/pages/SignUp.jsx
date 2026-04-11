import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FaGoogle } from "react-icons/fa";
import { updateProfile } from "firebase/auth";
import Swal from 'sweetalert2';

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
                
                updateProfile(loggedUser, {
                    displayName: name
                })
                .then(() => {
                    // ১. এখানে ইউজার অবজেক্ট তৈরি করো ডাটাবেজের জন্য
                    const userInfo = {
                        name: name,
                        email: email,
                        role: 'user' // ডিফল্টভাবে সবাই ইউজার
                    };

                    // ২. ডাটাবেজে ইউজার পাঠানোর API কল
                    fetch('http://localhost:5000/users', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(userInfo)
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            Swal.fire({
                                title: 'Account Created!',
                                text: `Welcome to TastyTwists, ${name}!`,
                                icon: 'success',
                                timer: 2000,
                                showConfirmButton: false,
                                position: "center"
                            });
                            navigate('/');
                        }
                    })
                })
                .catch(err => console.error(err));
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    title: 'Registration Failed',
                    text: error.message,
                    icon: 'error',
                    confirmButtonColor: '#ff6b08'
                });
            });
    };

    const handleGoogleSignUp = () => {
        signInWithGoogle()
            .then(result => {
                // ৩. গুগল সাইন আপের ক্ষেত্রেও ডাটাবেজে সেভ করা জরুরি
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    role: 'user'
                };

                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userInfo)
                })
                .then(res => res.json())
                .then(() => {
                    Swal.fire({
                        title: 'Welcome!',
                        text: 'Signed up with Google successfully!',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    navigate('/');
                })
            })
            .catch(error => console.error(error));
    }

    return (
        // তোমার নিচের রিটার্ন অংশ আগের মতোই থাকবে...
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

                <div className="divider my-8 text-slate-300 text-xs font-bold uppercase tracking-widest">OR</div>

                <button 
                    onClick={handleGoogleSignUp}
                    className="w-full py-4 border-2 border-slate-100 rounded-2xl flex items-center justify-center gap-3 font-bold text-slate-700 hover:bg-slate-300 transition-all"
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