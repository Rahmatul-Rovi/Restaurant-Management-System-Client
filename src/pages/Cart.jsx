import { HiOutlineTrash } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import Swal from 'sweetalert2';

const Cart = () => {
    const [cart, refetch] = useCart(); // Cart data and refetch function

    // Calculate total price 
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ff6b08",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Delete Api Call
                fetch(`http://localhost:5000/carts/${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        refetch(); 
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your food has been removed.",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
            }
        });
    }

    return (
        <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto min-h-screen">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-black text-slate-800">
                    Your Food <span className="text-[#ff6b08]">Cart</span>
                </h2>
                <div className="w-20 h-1 bg-[#ff6b08] mx-auto mt-4 rounded-full"></div>
            </div>

            {cart.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Side: Item List */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div key={item._id} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-slate-800">{item.name}</h3>
                                    <p className="text-[#ff6b08] font-bold">৳{item.price}</p>
                                </div>
                                <button 
                                    onClick={() => handleDelete(item._id)}
                                    className="btn btn-circle btn-ghost text-red-500 hover:bg-red-50"
                                >
                                    <HiOutlineTrash className="text-2xl" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Summary */}
                    <div className="bg-slate-50 p-8 rounded-3xl h-fit border border-slate-100">
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">Order Summary</h3>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-slate-600 font-medium">
                                <span>Total Items:</span>
                                <span>{cart.length}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-slate-800 border-t pt-4">
                                <span>Total Price:</span>
                                <span className="text-[#ff6b08]">৳{totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <Link to="/dashboard/checkout">
                         <button className="btn bg-[#ff6b08] hover:bg-slate-900 border-none w-full text-white font-bold rounded-full py-4 shadow-lg shadow-orange-100">
                            Proceed to Checkout
                        </button>
                        </Link>
                       
                    </div>
                </div>
            ) : (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                    <p className="text-2xl font-bold text-slate-400 mb-6">Your cart is empty brother!</p>
                    <Link to="/menu" className="btn bg-[#ff6b08] text-white border-none rounded-full px-10">
                        Go To Menu
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Cart;