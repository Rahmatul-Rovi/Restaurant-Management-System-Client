// src/pages/Dashboard/Admin/AddItems.jsx
import { useForm } from "react-hook-form";
import { HiOutlineUpload } from "react-icons/hi";
import Swal from "sweetalert2";

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        
        // Backend Data fetch
        const menuItem = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: data.image 
        };

        // Backend Post Request
        fetch('http://localhost:5000/menu', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(menuItem)
        })
        .then(res => res.json())
        .then(result => {
            if(result.insertedId){
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.name} added to the menu!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    };

    return (
        <div className="w-full">
            <div className="mb-8">
                <h2 className="text-4xl font-black text-slate-800">Add New <span className="text-[#ff6b08]">Item</span></h2>
                <p className="text-slate-400 font-medium mt-1">Fill up the form to add a delicious dish</p>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-100">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Item Name */}
                    <div className="form-control w-full mb-6">
                        <label className="label font-bold text-slate-700">Recipe Name*</label>
                        <input type="text" placeholder="e.g. Grilled Chicken" {...register("name", { required: true })} className="input input-bordered w-full rounded-xl focus:outline-[#ff6b08]" />
                    </div>

                    <div className="flex gap-6 mb-6">
                        {/* Category */}
                        <div className="form-control w-full">
                            <label className="label font-bold text-slate-700">Category*</label>
                            <select defaultValue="default" {...register("category", { required: true })} className="select select-bordered rounded-xl focus:outline-[#ff6b08]">
                                <option disabled value="default">Select Category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>

                        {/* Price */}
                        <div className="form-control w-full">
                            <label className="label font-bold text-slate-700">Price*</label>
                            <input type="number" step="0.01" placeholder="Price in $" {...register("price", { required: true })} className="input input-bordered w-full rounded-xl focus:outline-[#ff6b08]" />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div className="form-control w-full mb-6">
                        <label className="label font-bold text-slate-700">Image URL*</label>
                        <input type="text" placeholder="Paste image link here" {...register("image", { required: true })} className="input input-bordered w-full rounded-xl focus:outline-[#ff6b08]" />
                    </div>

                    {/* Recipe Details */}
                    <div className="form-control w-full mb-8">
                        <label className="label font-bold text-slate-700">Recipe Details*</label>
                        <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24 rounded-xl focus:outline-[#ff6b08]" placeholder="Tell us about the dish..."></textarea>
                    </div>

                    <button type="submit" className="btn bg-[#ff6b08] hover:bg-slate-900 text-white border-none px-8 rounded-xl flex items-center gap-2">
                        Add Item <HiOutlineUpload className="text-xl" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;