import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { HiOutlineMail, HiOutlineUserCircle, HiOutlineBadgeCheck, HiOutlinePencil, HiOutlineCheck, HiOutlinePhone } from "react-icons/hi";
import Swal from "sweetalert2";

const DEFAULT_AVATAR = "https://i.ibb.co/4pDNDk1/avatar-placeholder.png";

const UserHome = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        photoURL: DEFAULT_AVATAR
    });

    useEffect(() => {
        if (!user) return;

        // Step 1: Google Data Set
        setUserData({
            name: user.displayName || "User",
            email: user.email,
            phone: "",
            photoURL: user.photoURL || DEFAULT_AVATAR
        });

        // Step 2: Get data from DB
        fetch(`https://tasty-twists-server.vercel.app/users/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setUserData({
                    name: data.name || user.displayName || "User",
                    email: data.email || user.email,
                    phone: data.phone || "",
                    // Always priority Google photo
                    photoURL: user.photoURL || data.photoURL || DEFAULT_AVATAR
                });
            })
            .catch(err => {
                console.error("Error fetching user data:", err);
            });

    }, [user?.email, user?.photoURL]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        Swal.fire({ title: "Updating Profile...", didOpen: () => Swal.showLoading() });

        try {
            const res = await fetch(`https://tasty-twists-server.vercel.app/users/update/${user.email}`, {
                method: "PATCH",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    name: userData.name,
                    phone: userData.phone,
                    photoURL: user.photoURL || userData.photoURL
                })
            });

            const data = await res.json();
            if (data.modifiedCount > 0 || data.matchedCount > 0) {
                setIsEditing(false);
                // State directly updated
                setUserData(prev => ({
                    ...prev,
                    name: userData.name,
                    phone: userData.phone,
                    photoURL: user.photoURL || userData.photoURL
                }));
                Swal.fire("Updated!", "Your profile has been updated.", "success");
            }
        } catch (error) {
            Swal.fire("Error", "Could not update profile", "error");
        }
    };

    if (authLoading) return (
        <div className="flex justify-center items-center h-screen font-bold text-orange-500">
            Loading...
        </div>
    );

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <div className="mb-10">
                <h2 className="text-4xl font-black text-slate-800">
                    Welcome Back, <span className="text-[#ff6b08]">{userData.name}!</span>
                </h2>
                <p className="text-slate-500 mt-2 font-medium">Manage your personal information and account settings.</p>
            </div>

            <div className="max-w-2xl bg-white rounded-[2.5rem] shadow-xl shadow-orange-100 border border-orange-50 overflow-hidden transition-all">
                
                <div className="bg-[#ff6b08] h-32 w-full relative">
                    <div className="absolute -bottom-12 left-10 group">
                        <div className="relative">
                            <img 
                                src={userData.photoURL}
                                alt="Profile" 
                                className="w-28 h-28 rounded-3xl border-4 border-white object-cover shadow-lg bg-white"
                                onError={(e) => e.target.src = DEFAULT_AVATAR}
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-16 pb-10 px-10">
                    {!isEditing && (
                        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-4 italic">
                            * Profile picture synced with Google Account
                        </p>
                    )}

                    {isEditing ? (
                        <form onSubmit={handleUpdate} className="space-y-5">
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                                        value={userData.name}
                                        onChange={(e) => setUserData({...userData, name: e.target.value})}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Phone Number</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                                        placeholder="Enter Phone Number"
                                        value={userData.phone}
                                        onChange={(e) => setUserData({...userData, phone: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="submit" className="flex-1 py-3 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-100">
                                    <HiOutlineCheck className="text-xl" /> Save Profile
                                </button>
                                <button type="button" onClick={() => setIsEditing(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group">
                                <div className="bg-orange-100 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                                    <HiOutlineUserCircle className="text-2xl text-[#ff6b08]" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</p>
                                    <p className="text-xl font-bold text-slate-800">{userData.name}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="bg-orange-100 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                                    <HiOutlineMail className="text-2xl text-[#ff6b08]" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                                    <p className="text-lg font-semibold text-slate-700">{userData.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="bg-orange-100 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                                    <HiOutlinePhone className="text-2xl text-[#ff6b08]" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</p>
                                    <p className="text-lg font-semibold text-slate-700">{userData.phone || "Not Updated"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-green-100 p-3 rounded-2xl">
                                    <HiOutlineBadgeCheck className="text-2xl text-green-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account Status</p>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full inline-block mt-1">Active User</span>
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-slate-100 flex gap-4">
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="px-8 py-3 bg-[#ff6b08] text-white font-bold rounded-2xl hover:bg-slate-900 transition-all shadow-lg shadow-orange-200 flex items-center gap-2"
                                >
                                    <HiOutlinePencil /> Edit Profile
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserHome;