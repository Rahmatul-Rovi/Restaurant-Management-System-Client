import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { HiOutlinePencil, HiOutlineCheck, HiOutlineUserCircle } from "react-icons/hi";
import Swal from 'sweetalert2'; // SweetAlert import

const AdminHome = () => {
    const { user, loading } = useContext(AuthContext); // 'loading' ta context theke anbe
    const [isEditing, setIsEditing] = useState(false);
    
    // Initial state set kora
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });

    // User load hole data update kora
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.displayName || "Admin",
                email: user.email || "admin@example.com",
                phone: user.phoneNumber || "" // Firebase auth e phone thakle
            });
        }
    }, [user]);

    const handleUpdate = (e) => {
        e.preventDefault();
        
        // SweetAlert implementation
        Swal.fire({
            title: 'Updating...',
            text: 'Please wait while we update your profile.',
            icon: 'info',
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
                // 🔥 Eikhane tomar PATCH API call hobe
                console.log("Updated Data:", formData);
                
                // Simulate API call
                setTimeout(() => {
                    setIsEditing(false);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Profile Updated Successfully!',
                        icon: 'success',
                        confirmButtonColor: '#ff6b08'
                    });
                }, 1000);
            }
        });
    };

    if (loading) {
        return <div className="text-center p-10">Loading Profile...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-8">Admin Profile 👑</h2>

            <div className="bg-white shadow-lg rounded-3xl p-8 border border-slate-100">
                <div className="flex items-center gap-6 mb-8">
                    {user?.photoURL ? (
                        <img 
                            src={user.photoURL} 
                            alt="Profile" 
                            className="w-24 h-24 rounded-full border-4 border-[#ff6b08] object-cover" 
                        />
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

                {isEditing ? (
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <label className="block text-sm font-medium">Full Name</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border rounded-xl"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                        <label className="block text-sm font-medium">Phone</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border rounded-xl"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                        <div className="flex gap-4">
                            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-green-700">
                                <HiOutlineCheck /> Save Changes
                            </button>
                            <button type="button" onClick={() => setIsEditing(false)} className="bg-slate-200 px-6 py-2 rounded-xl">
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4 border-t pt-6">
                        <p className="text-slate-600"><strong>Full Name:</strong> {formData.name}</p>
                        <p className="text-slate-600"><strong>Email Address:</strong> {formData.email}</p>
                        <p className="text-slate-600"><strong>Phone:</strong> {formData.phone || "Not provided"}</p>
                        
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