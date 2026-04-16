// src/pages/Dashboard/Admin/ManageItems.jsx
import { useQuery } from "@tanstack/react-query";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import Swal from "sweetalert2";

const ManageItems = () => {
    // Data fetch with TanStack Query 
    const { data: menu = [], refetch, isLoading } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/menu');
            return res.json();
        }
    });

    // Item delete function
    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to delete ${item.name}!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch(`http://localhost:5000/menu/${item._id}`, {
                    method: 'DELETE'
                });
                const data = await res.json();
                
                if (data.deletedCount > 0) {
                    refetch(); 
                    Swal.fire("Deleted!", "Item has been deleted.", "success");
                }
            }
        });
    };

    if (isLoading) return <div className="text-center mt-20 font-bold">Loading Menu...</div>;

    return (
        <div className="w-full">
            <div className="mb-10">
                <h2 className="text-4xl font-black text-slate-800">Manage All <span className="text-[#ff6b08]">Items</span></h2>
                <p className="text-slate-400 font-medium mt-1">Total Items: {menu.length}</p>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
                <table className="table w-full">
                    <thead className="bg-slate-900 text-white">
                        <tr>
                            <th className="py-6 px-8">#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-600">
                        {menu.map((item, index) => (
                            <tr key={item._id} className="hover:bg-slate-50 border-b border-slate-50">
                                <td className="py-4 px-8 font-bold text-slate-400">{index + 1}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                    </div>
                                </td>
                                <td className="font-bold text-slate-800">{item.name}</td>
                                <td className="font-medium">${item.price}</td>
                                <td><span className="badge badge-ghost font-semibold uppercase text-xs">{item.category}</span></td>
                                <td className="text-center flex justify-center gap-2 py-6">
                                    <button className="btn btn-ghost bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white rounded-xl">
                                        <HiOutlinePencilAlt className="text-xl" />
                                    </button>
                                    <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost bg-red-100 text-red-500 hover:bg-red-500 hover:text-white rounded-xl">
                                        <HiOutlineTrash className="text-xl" />
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

export default ManageItems;