import { useQuery } from "@tanstack/react-query";
import { useState } from "react"; // স্টেট হ্যান্ডেল করার জন্য
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlineX } from "react-icons/hi";
import Swal from "sweetalert2";

const ManageItems = () => {
    const [selectedItem, setSelectedItem] = useState(null); // যে আইটেম এডিট হবে

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
                if (data.success) {
                    refetch(); 
                    Swal.fire("Deleted!", "Item has been deleted.", "success");
                }
            }
        });
    };

    // Update Function
    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedInfo = {
            name: form.name.value,
            price: parseFloat(form.price.value),
            category: form.category.value,
            recipe: form.recipe.value,
            image: form.image.value
        };

        const res = await fetch(`http://localhost:5000/menu/${selectedItem._id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updatedInfo)
        });
        const data = await res.json();

        if (data.success) {
            refetch();
            setSelectedItem(null); // Modal বন্ধ করবে
            Swal.fire("Updated!", "Item updated successfully", "success");
        }
    };

    if (isLoading) return <div className="text-center mt-20 font-bold">Loading Menu...</div>;

    return (
        <div className="w-full relative">
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
                                    <button 
                                        onClick={() => setSelectedItem(item)}
                                        className="btn btn-ghost bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white rounded-xl">
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

            {/* --- UPDATE MODAL --- */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 w-full max-w-2xl relative shadow-2xl">
                        <button 
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-4 right-4 text-2xl text-slate-400 hover:text-red-500">
                            <HiOutlineX />
                        </button>
                        <h2 className="text-2xl font-bold mb-6 text-slate-800">Update Item: <span className="text-[#ff6b08]">{selectedItem.name}</span></h2>
                        
                        <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
                            <div className="form-control col-span-2">
                                <label className="label font-bold">Recipe Name</label>
                                <input name="name" defaultValue={selectedItem.name} type="text" className="input input-bordered rounded-xl" required />
                            </div>
                            <div className="form-control">
                                <label className="label font-bold">Category</label>
                                <select name="category" defaultValue={selectedItem.category} className="select select-bordered rounded-xl">
                                    <option value="biryani">Biryani</option>
                                    <option value="curry">Curry</option>
                                    <option value="fish">Fish</option>
                                    <option value="dessert">Dessert</option>
                                    <option value="vortas">Vortas</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label font-bold">Price ($)</label>
                                <input name="price" defaultValue={selectedItem.price} type="number" step="0.01" className="input input-bordered rounded-xl" required />
                            </div>
                            <div className="form-control col-span-2">
                                <label className="label font-bold">Image URL</label>
                                <input name="image" defaultValue={selectedItem.image} type="text" className="input input-bordered rounded-xl" required />
                            </div>
                            <div className="form-control col-span-2">
                                <label className="label font-bold">Details</label>
                                <textarea name="recipe" defaultValue={selectedItem.recipe} className="textarea textarea-bordered rounded-xl h-24"></textarea>
                            </div>
                            <div className="col-span-2 mt-4">
                                <button type="submit" className="btn bg-[#ff6b08] hover:bg-slate-900 text-white w-full border-none rounded-xl">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageItems;