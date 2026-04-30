import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineUser, HiOutlineShoppingBag, HiOutlineArrowRight } from "react-icons/hi";
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart"; // কার্ট হুক ইমপোর্ট করলাম

const Checkout = () => {
    const { user } = useContext(AuthContext);
    const [cart] = useCart(); // সরাসরি আপনার কার্ট ডাটা নিয়ে আসলাম

    // কার্ট থেকে ডায়নামিক ক্যালকুলেশন
    const subtotal = cart.reduce((total, item) => total + item.price, 0);
    const shipping = cart.length > 0 ? 50 : 0; // কার্ট খালি থাকলে শিপিং ০
    const total = subtotal + shipping;

    const handleCheckout = (e) => {
        e.preventDefault();
        const form = e.target;
        const address = form.address.value;
        const phone = form.phone.value;

        // চেকআউট ডাটা অবজেক্ট
        const orderDetails = {
            customerName: user?.displayName,
            email: user?.email,
            phone,
            address,
            cartItems: cart.map(item => ({ name: item.name, price: item.price, id: item._id })), // সব আইটেম লিস্ট
            totalAmount: total,
            totalQuantity: cart.length,
            currency: 'BDT',
            status: 'Pending'
        };

        console.log("Real Cart Data for SSLCommerz:", orderDetails);

        Swal.fire({
            title: "Confirm Payment?",
            text: `You are paying ৳${total} for ${cart.length} items.`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#ff6b08",
            confirmButtonText: "Yes, Pay Now"
        }).then((result) => {
            if (result.isConfirmed) {
                // এখানে ব্যাকএন্ডে হিট করবো
                Swal.fire("Success!", "Connecting to Payment Gateway...", "success");
            }
        });
    };

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* --- বাম পাশ: শিপিং ফর্ম --- */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-orange-50">
                        <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                            <HiOutlineLocationMarker className="text-[#ff6b08]" /> Shipping Details
                        </h2>
                        
                        <form onSubmit={handleCheckout} id="checkout-form" className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Your Name</label>
                                    <div className="relative">
                                        <HiOutlineUser className="absolute left-4 top-4 text-slate-400" />
                                        <input 
                                            type="text" 
                                            defaultValue={user?.displayName}
                                            readOnly
                                            className="w-full p-3 pl-12 bg-slate-100 border border-slate-200 rounded-2xl cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Phone Number</label>
                                    <div className="relative">
                                        <HiOutlinePhone className="absolute left-4 top-4 text-slate-400" />
                                        <input 
                                            type="text" 
                                            name="phone"
                                            placeholder="017XXXXXXXX"
                                            required
                                            className="w-full p-3 pl-12 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Detailed Address</label>
                                <textarea 
                                    name="address"
                                    rows="3"
                                    placeholder="House, Road, Area..."
                                    required
                                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
                                ></textarea>
                            </div>
                        </form>
                    </div>
                </div>

                {/* --- ডান পাশ: কার্ট সামারি --- */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl sticky top-8">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <HiOutlineShoppingBag className="text-[#ff6b08]" /> Your Order ({cart.length})
                        </h2>
                        
                        <div className="space-y-4 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                            {cart.map(item => (
                                <div key={item._id} className="flex justify-between items-center border-b border-slate-800 pb-4">
                                    <div className="flex items-center gap-3">
                                        <img src={item.image} alt="" className="w-10 h-10 object-cover rounded-lg" />
                                        <div>
                                            <p className="font-bold text-sm leading-tight">{item.name}</p>
                                            <p className="text-[10px] text-slate-500 italic">Price included</p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-orange-400 text-sm">৳{item.price}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 space-y-3">
                            <div className="flex justify-between text-slate-400 font-medium">
                                <span>Subtotal</span>
                                <span>৳{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-400 font-medium">
                                <span>Delivery Fee</span>
                                <span>৳{shipping}</span>
                            </div>
                            <div className="flex justify-between text-xl font-black pt-4 border-t border-slate-700 text-white">
                                <span>Total Bill</span>
                                <span className="text-[#ff6b08]">৳{total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            form="checkout-form"
                            disabled={cart.length === 0}
                            className={`w-full mt-8 py-4 ${cart.length === 0 ? 'bg-slate-700' : 'bg-[#ff6b08] hover:bg-white hover:text-slate-900'} text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2 group`}
                        >
                            Confirm & Pay <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;