import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { HiOutlineMail, HiOutlineUserCircle, HiOutlineBadgeCheck } from "react-icons/hi";

const UserHome = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            {/* Header Section */}
            <div className="mb-10">
                <h2 className="text-4xl font-black text-slate-800">
                    Welcome Back, <span className="text-[#ff6b08]">{user?.displayName || 'Brother'}!</span>
                </h2>
                <p className="text-slate-500 mt-2 font-medium">Manage your profile and track your activities here.</p>
            </div>

            {/* Profile Card Section */}
            <div className="max-w-2xl bg-white rounded-[2.5rem] shadow-xl shadow-orange-100 border border-orange-50 overflow-hidden">
                <div className="bg-[#ff6b08] h-32 w-full relative">
                    {/* ইউজার ইমেজ */}
                    <div className="absolute -bottom-12 left-10">
                        {user?.photoURL ? (
                            <img 
                                src={user.photoURL} 
                                alt="Profile" 
                                className="w-28 h-28 rounded-3xl border-4 border-white object-cover shadow-lg"
                            />
                        ) : (
                            <div className="w-28 h-28 rounded-3xl border-4 border-white bg-slate-200 flex items-center justify-center shadow-lg">
                                <HiOutlineUserCircle className="text-6xl text-slate-400" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-16 pb-10 px-10">
                    <div className="space-y-6">
                        {/* Name Section */}
                        <div className="flex items-center gap-4">
                            <div className="bg-orange-100 p-3 rounded-2xl">
                                <HiOutlineUserCircle className="text-2xl text-[#ff6b08]" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</p>
                                <p className="text-xl font-bold text-slate-800">{user?.displayName || "Not Set"}</p>
                            </div>
                        </div>

                        {/* Email Section */}
                        <div className="flex items-center gap-4">
                            <div className="bg-orange-100 p-3 rounded-2xl">
                                <HiOutlineMail className="text-2xl text-[#ff6b08]" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                                <p className="text-lg font-semibold text-slate-700">{user?.email}</p>
                            </div>
                        </div>

                        {/* Role Status Section */}
                        <div className="flex items-center gap-4">
                            <div className="bg-green-100 p-3 rounded-2xl">
                                <HiOutlineBadgeCheck className="text-2xl text-green-600" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account Status</p>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">Active User</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 pt-8 border-t border-slate-100 flex gap-4">
                        <button className="px-8 py-3 bg-[#ff6b08] text-white font-bold rounded-2xl hover:bg-slate-900 transition-all shadow-lg shadow-orange-200">
                            Edit Profile
                        </button>
                        <button className="px-8 py-3 border-2 border-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all">
                            Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;