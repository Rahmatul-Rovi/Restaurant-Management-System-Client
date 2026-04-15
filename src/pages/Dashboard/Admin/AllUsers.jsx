import { useQuery } from "@tanstack/react-query";
import { HiOutlineTrash, HiOutlineUserGroup } from "react-icons/hi";
import Swal from "sweetalert2";

const AllUsers = () => {
    // TanStack Query to refetch data 
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users');
            return res.json();
        }
    });

    // user to admin
    const handleMakeAdmin = (user) => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                refetch(); 
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${user.name} is now an Admin!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }

    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-4xl font-black text-slate-800">
                        Manage <span className="text-[#ff6b08]">Users</span>
                    </h2>
                    <p className="text-slate-400 font-medium mt-1">Control user roles and permissions</p>
                </div>
                <div className="bg-orange-50 px-6 py-4 rounded-3xl border border-orange-100">
                    <span className="text-slate-500 font-bold uppercase text-xs block">Total Users</span>
                    <span className="text-2xl font-black text-[#ff6b08]">{users.length}</span>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-100 overflow-hidden">
                <table className="table w-full">
                    <thead className="bg-slate-900 text-white">
                        <tr>
                            <th className="py-6 px-8">#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-600">
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover:bg-slate-50 border-b border-slate-50 transition-colors">
                                <td className="py-5 px-8 font-bold text-slate-400">{index + 1}</td>
                                <td>
                                    <div className="font-bold text-slate-800">{user.name}</div>
                                </td>
                                <td className="font-medium">{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? (
                                        <span className="badge badge-lg bg-green-100 text-green-600 border-none font-bold py-4 px-6">Admin</span>
                                    ) : (
                                        <button 
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn btn-ghost bg-orange-100 hover:bg-[#ff6b08] hover:text-white text-[#ff6b08] transition-all rounded-xl"
                                            title="Make Admin"
                                        >
                                            <HiOutlineUserGroup className="text-xl" />
                                        </button>
                                    )}
                                </td>
                                <td className="text-center">
                                    <button className="btn btn-ghost text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                                        <HiOutlineTrash className="text-2xl" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;