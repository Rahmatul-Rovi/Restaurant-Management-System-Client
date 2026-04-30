import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineUser, HiOutlineShoppingBag, HiOutlineArrowRight } from "react-icons/hi";
import Swal from "sweetalert2";

const Checkout = () => {
    const { user } = useContext(AuthContext);

    // ধরি তোমার কার্টে কিছু স্যাম্পল ডাটা আছে (পরবর্তীতে এটা ডায়নামিক হবে)
    const cartItems = [
        { id: 1, name: "Premium Web Service", price: 1200, qty: 1 },
    ];
    const subtotal = 1200;
    const shipping = 50;
    const total = subtotal + shipping;

    const handleCheckout = (e) => {
        e.preventDefault();
        const form = e.target;
        const address = form.address.value;
        const phone = form.phone.value;

        const orderDetails = {
            customerName: user?.displayName,
            email: user?.email,
            phone,
            address,
            amount: total,
            currency: 'BDT',
            status: 'Pending'
        };

        console.log("Order Details Ready for SSLCommerz:", orderDetails);

        // এখানে আমরা পরে SSLCommerz এর API কল করবো
        Swal.fire({
            title: "Proceed to Payment?",
            text: `You are paying ৳${total}`,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#ff6b08",
            confirmButtonText: "Pay Now"
        }).then((result) => {
            if (result.isConfirmed) {
                // SSLCommerz API logic will go here
                Swal.fire("Redirecting...", "Wait while we connect to SSLCommerz", "success");
            }
        });
    };

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* --- বাম পাশ: শিপিং ডিটেইলস ফর্ম --- */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-orange-50">
                        <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                            <HiOutlineLocationMarker className="text-[#ff6b08]" /> Shipping Information
                        </h2>
                        
                        <form onSubmit={handleCheckout} id="checkout-form" className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Full Name</label>
                                    <div className="relative">
                                        <HiOutlineUser className="absolute left-4 top-4 text-slate-400" />
                                        <input 
                                            type="text" 
                                            defaultValue={user?.displayName}
                                            readOnly
                                            className="w-full p-3 pl-12 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none cursor-not-allowed"
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
                                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Shipping Address</label>
                                <textarea 
                                    name="address"
                                    rows="3"
                                    placeholder="Enter your full address here..."
                                    required
                                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
                                ></textarea>
                            </div>
                        </form>
                    </div>
                </div>

                {/* --- ডান পাশ: অর্ডার সামারি --- */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl sticky top-8">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <HiOutlineShoppingBag className="text-[#ff6b08]" /> Order Summary
                        </h2>
                        
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center border-b border-slate-700 pb-4">
                                    <div>
                                        <p className="font-bold">{item.name}</p>
                                        <p className="text-xs text-slate-400 font-medium">Qty: {item.qty}</p>
                                    </div>
                                    <p className="font-bold text-orange-400">৳{item.price}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 space-y-3">
                            <div className="flex justify-between text-slate-400 font-medium">
                                <span>Subtotal</span>
                                <span>৳{subtotal}</span>
                            </div>
                            <div className="flex justify-between text-slate-400 font-medium">
                                <span>Shipping Fee</span>
                                <span>৳{shipping}</span>
                            </div>
                            <div className="flex justify-between text-xl font-black pt-4 border-t border-slate-700 text-white">
                                <span>Total</span>
                                <span className="text-[#ff6b08]">৳{total}</span>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            form="checkout-form"
                            className="w-full mt-8 py-4 bg-[#ff6b08] hover:bg-white hover:text-slate-900 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2 group"
                        >
                            Confirm & Pay <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <p className="text-[10px] text-center mt-4 text-slate-500 uppercase tracking-widest font-bold">
                            Secured by SSLCommerz
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;