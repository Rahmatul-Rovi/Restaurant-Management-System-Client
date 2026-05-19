import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { HiOutlinePencil, HiOutlineCheck, HiOutlineUserCircle, HiOutlineCloudUpload } from "react-icons/hi";
import Swal from "sweetalert2";

//  ImgBB API Key 
const image_hosting_key = "YOUR_IMGBB_API_KEY"; 
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AdminHome = () => {
    const { user, loading } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        photoURL: ""
    });

    //  Load user data
    useEffect(() => {
        if (user?.email) {
            fetch(`https://tasty-twists-server.vercel.app/users/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setFormData({
                        name: data.name || user.displayName || "Admin",
                        email: data.email || user.email,
                        phone: data.phone || "",
                        // if google login then get the google image
                        photoURL: data.photoURL || user.photoURL || "" 
                    });
                })
                .catch(err => console.error("Error loading user:", err));
        }
    }, [user]);

    // IMAGE UPLOAD HANDLER (ImgBB)
    const handleImageUpload = async (e) => {
        const imageFile = e.target.files[0];
        if (!imageFile) return;

        setUploading(true);
        const imgFormData = new FormData();
        imgFormData.append("image", imageFile);

        try {
            const res = await fetch(image_hosting_api, {
                method: "POST",
                body: imgFormData
            });
            const data = await res.json();

            if (data.success) {
                setFormData({ ...formData, photoURL: data.data.display_url });
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Image uploaded successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error("Upload error", error);
            Swal.fire("Error", "Image upload failed", "error");
        } finally {
            setUploading(false);
        }
    };

    // PROFILE UPDATE HANDLER
    const handleUpdate = async (e) => {
        e.preventDefault();
        Swal.fire({ title: "Updating...", didOpen: () => Swal.showLoading() });

        try {
            const res = await fetch(`https://tasty-twists-server.vercel.app/users/update/${user.email}`, {
                method: "PATCH",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (data.modifiedCount > 0 || data.matchedCount > 0) {
                setIsEditing(false);
                Swal.fire("Success!", "Profile Updated Successfully!", "success");
            }
        } catch (error) {
            Swal.fire("Error", "Update failed", "error");
        }
    };

    if (loading) return <div className="text-center p-10 font-bold">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-8">Admin Profile 👑</h2>

            <div className="bg-white shadow-xl rounded-3xl p-8 border border-slate-100">
                
                {/* PROFILE HEADER */}
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                    <div className="relative group">
                        <img
                            src={formData.photoURL || "https://i.ibb.co/L1Npq9B/placeholder.png"}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-[#ff6b08] object-cover shadow-lg"
                        />
                        {isEditing && (
                            <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-all text-white text-xs">
                                <HiOutlineCloudUpload className="text-2xl" />
                                <span>{uploading ? "Uploading..." : "Change Photo"}</span>
                                <input type="file" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                            </label>
                        )}
                    </div>

                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold">{formData.name}</h3>
                        <p className="text-slate-500">{formData.email}</p>
                        <span className="bg-orange-100 text-[#ff6b08] px-4 py-1 rounded-full text-xs font-bold mt-2 inline-block">SUPER ADMIN</span>
                    </div>
                </div>

                {/* EDIT FORM vs INFO VIEW */}
                {isEditing ? (
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-600 mb-1">Name</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border rounded-xl"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-600 mb-1">Phone</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border rounded-xl"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-xl flex items-center gap-2">
                                <HiOutlineCheck /> Save Changes
                            </button>
                            <button type="button" onClick={() => setIsEditing(false)} className="bg-slate-200 px-6 py-2 rounded-xl">Cancel</button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4 border-t pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700">
                            <p><strong>Name:</strong> {formData.name}</p>
                            <p><strong>Email:</strong> {formData.email}</p>
                            <p><strong>Phone:</strong> {formData.phone || "Not set"}</p>
                        </div>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-[#ff6b08] text-white px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-orange-700"
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