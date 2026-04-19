import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { HiOutlinePencil, HiOutlineCheck, HiOutlineUserCircle } from "react-icons/hi";

const AdminHome = () => {
    const { user } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    
    // ফর্ম ডাটা স্টেট
    const [formData, setFormData] = useState({
        name: user?.displayName || "Admin Name",
        email: user?.email || "admin@example.com",
        phone: "01XXXXXXXXX" // ব্যাকেন্ড থেকে ডাটা আনলে এখানে বসবে
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        // 🔥 এখানে তোমার ব্যাকেন্ড API কল হবে (PATCH route)
        console.log("Updated Data:", formData);
        setIsEditing(false);
        alert("Profile Updated Successfully!");
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-8">Admin Profile 👑</h2>

            <div className="bg-white shadow-lg rounded-3xl p-8 border border-slate-100">
                <div className="flex items-center gap-6 mb-8">
                    {user?.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-24 h-24 rounded-full border-4 border-[#ff6b08]" />
                    ) : (
                        <HiOutlineUserCircle className="text-8xl text-slate-300" />
                    )}
                    <div>
                        <h3 className="text-2xl font-bold">{formData.name}</h3>
                        <p className="text-slate-500">{formData.email}</p>
                        <span className="bg-orange-100 text-[#ff6b08] px-3 py-1 rounded-full text-xs font-bold mt-2 inline-block">
                            SUPER ADMIN
                        </span>
                    </div>
                </div>

                {/* এডিট ফর্ম বা ভিউ */}
                {isEditing ? (
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <input 
                            type="text" 
                            className="w-full p-3 border rounded-xl"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                        <input 
                            type="text" 
                            className="w-full p-3 border rounded-xl"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                        <button className="bg-green-600 text-white px-6 py-2 rounded-xl flex items-center gap-2">
                            <HiOutlineCheck /> Save Changes
                        </button>
                    </form>
                ) : (
                    <div className="space-y-4 border-t pt-6">
                        <p className="text-slate-600"><strong>Full Name:</strong> {formData.name}</p>
                        <p className="text-slate-600"><strong>Email Address:</strong> {formData.email}</p>
                        <p className="text-slate-600"><strong>Phone:</strong> {formData.phone}</p>
                        
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="bg-[#ff6b08] text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-orange-700 transition"
                        >
                            <HiOutlinePencil /> Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminHome;