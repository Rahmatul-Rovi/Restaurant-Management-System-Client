import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// আপনার প্রজেক্টের Auth Context অনুযায়ী নিচের লাইনটি আনকমেন্ট করতে পারেন
// import useAuth from '../../../hooks/useAuth'; 

const Checkout = ({ price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    // const { user } = useAuth(); // ইউজারের তথ্য নেওয়ার জন্য

    // ১. পেমেন্ট ইন্টেন্ট তৈরি করা (পেজ লোড হতেই সিক্রেট নিয়ে আসা ভালো)
    useEffect(() => {
        if (price > 0) {
            fetch('http://localhost:5000/api/order', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ price })
            })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));
        }
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const address = form.address.value;

        if (!stripe || !elements || !clientSecret) return;

        const card = elements.getElement(CardElement);
        if (card == null) return;

        setProcessing(true);
        setCardError('');

        // ২. স্ট্রাইপ পেমেন্ট কনফার্ম করা
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: { name, email },
            },
        });

        if (confirmError) {
            setProcessing(false);
            setCardError(confirmError.message);
            Swal.fire("Error", confirmError.message, "error");
        } else {
            if (paymentIntent.status === 'succeeded') {
                const orderDetails = {
                    transactionId: paymentIntent.id,
                    name, 
                    email, 
                    phone, 
                    address, 
                    price,
                    date: new Date(),
                    status: 'pending'
                };

                // ৩. ডাটাবেজে অর্ডারের তথ্য সেভ করা
                const saveRes = await fetch('http://localhost:5000/api/save-order', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(orderDetails)
                });
                const data = await saveRes.json();

                if (data.success || data.insertedId) {
                    setProcessing(false);
                    Swal.fire({
                        icon: "success",
                        title: "Order Successful!",
                        text: `Transaction ID: ${paymentIntent.id}`,
                        confirmButtonColor: '#ff6b08',
                    });
                    navigate('/dashboard/user/my-orders');
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5 text-left max-w-xl mx-auto">
            {/* কাস্টমার ডিটেইলস */}
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Full Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            defaultValue="" // এখানে user?.displayName দিতে পারেন
                            placeholder="Your Name" 
                            className="p-4 border border-slate-200 rounded-2xl w-full focus:ring-2 focus:ring-[#ff6b08] focus:border-none outline-none transition-all bg-white" 
                            required 
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            defaultValue="" // এখানে user?.email দিতে পারেন
                            placeholder="Email" 
                            className="p-4 border border-slate-200 rounded-2xl w-full focus:ring-2 focus:ring-[#ff6b08] focus:border-none outline-none transition-all bg-white" 
                            required 
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Phone Number</label>
                    <input type="text" name="phone" placeholder="+880 1XXX XXXXXX" className="p-4 border border-slate-200 rounded-2xl w-full focus:ring-2 focus:ring-[#ff6b08] focus:border-none outline-none transition-all bg-white" required />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Delivery Address</label>
                    <textarea name="address" rows="2" placeholder="House 17, Road 5, Block H, Mirpur 2" className="p-4 border border-slate-200 rounded-2xl w-full focus:ring-2 focus:ring-[#ff6b08] focus:border-none outline-none transition-all bg-white" required></textarea>
                </div>
            </div>

            {/* কার্ড ইনপুট বক্স */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Card Information</label>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm transition-all focus-within:ring-2 focus-within:ring-[#ff6b08]">
                    <CardElement options={{ 
                        style: { 
                            base: { 
                                fontSize: '16px', 
                                color: '#1e293b',
                                '::placeholder': { color: '#94a3b8' } 
                            } 
                        } 
                    }} />
                </div>
                {cardError && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold italic">⚠️ {cardError}</p>}
            </div>

            <button 
                type="submit" 
                disabled={!stripe || processing || !clientSecret}
                className="w-full bg-[#ff6b08] text-white py-5 rounded-[2rem] font-black text-lg shadow-lg shadow-orange-100 hover:bg-slate-900 transition-all disabled:bg-slate-300 disabled:shadow-none flex justify-center items-center gap-2"
            >
                {processing ? (
                    <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Processing...
                    </>
                ) : (
                    `Pay Now ($${parseFloat(price).toFixed(2)})`
                )}
            </button>
        </form>
    );
};

export default Checkout;