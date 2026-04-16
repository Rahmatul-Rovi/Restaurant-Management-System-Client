import { HiOutlineUpload } from "react-icons/hi";
import Swal from "sweetalert2";

const AddItems = () => {

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const form = event.target;
        const name = form.name.value;
        const category = form.category.value;
        const price = form.price.value;
        const image = form.image.value;
        const recipe = form.recipe.value;

        const menuItem = {
            name,
            category,
            price: parseFloat(price),
            recipe,
            image
        };

        try {
            const res = await fetch('http://localhost:5000/menu', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(menuItem)
            });

            const data = await res.json();

            // ✅ FIXED CONDITION
            if (data.success) {

                form.reset(); 

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${name} added to the menu!`,
                    showConfirmButton: false,
                    timer: 1500
                });

            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed!",
                    text: "Item is not added "
                });
            }

        } catch (error) {
            console.error("Error:", error);

            Swal.fire({
                icon: "error",
                title: "Server Error!",
                text: "Backend connection problem"
            });
        }
    };

    return (
        <div className="w-full">
            <div className="mb-8">
                <h2 className="text-4xl font-black text-slate-800">Add New <span className="text-[#ff6b08]">Item</span></h2>
                <p className="text-slate-400 font-medium mt-1">Fill up the form to add a delicious dish</p>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-100">
                <form onSubmit={handleSubmit}>
                    
                    <div className="form-control w-full mb-6">
                        <label className="label font-bold text-slate-700">Recipe Name*</label>
                        <input name="name" type="text" required className="input input-bordered w-full rounded-xl" />
                    </div>

                    <div className="flex gap-6 mb-6">
                        
                        <div className="form-control w-full">
                            <label className="label font-bold text-slate-700">Category*</label>
                            <select name="category" defaultValue="default" required className="select select-bordered rounded-xl">
                                <option disabled value="default">Select Category</option>
                                <option value="Biryani">Biryani</option>
                                <option value="Curry">Curry</option>
                                <option value="Fish">Fish</option>
                                <option value="Dessert">Dessert</option>
                                <option value="Vortas">Vortas</option>
                            </select>
                        </div>

                        <div className="form-control w-full">
                            <label className="label font-bold text-slate-700">Price*</label>
                            <input name="price" type="number" step="0.01" required className="input input-bordered w-full rounded-xl" />
                        </div>
                    </div>

                    <div className="form-control w-full mb-6">
                        <label className="label font-bold text-slate-700">Image URL*</label>
                        <input name="image" type="text" required className="input input-bordered w-full rounded-xl" />
                    </div>

                    <div className="form-control w-full mb-8">
                        <label className="label font-bold text-slate-700">Recipe Details*</label>
                        <textarea name="recipe" required className="textarea textarea-bordered h-24 rounded-xl"></textarea>
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