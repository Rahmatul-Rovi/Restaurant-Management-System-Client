import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getAuth } from "firebase/auth";

const Checkout = ({ price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const auth = getAuth();
    const user = auth.currentUser;

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

        if (!stripe || !elements || !clientSecret) return;

        const card = elements.getElement(CardElement);
        if (card == null) return;

        setProcessing(true);
        setCardError('');

        // ১. স্ট্রাইপ পেমেন্ট কনফার্ম করা
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: { 
                    name: user?.displayName || form.name.value, 
                    email: user?.email || form.email.value 
                },
            },
        });

        if (confirmError) {
            setProcessing(false);
            setCardError(confirmError.message);
            Swal.fire({ icon: "error", title: "Oops...", text: confirmError.message });
        } else {
            if (paymentIntent.status === 'succeeded') {
                const orderDetails = {
                    transactionId: paymentIntent.id,
                    name: form.name.value, 
                    email: form.email.value, 
                    phone: form.phone.value, 
                    address: form.address.value, 
                    price,
                    date: new Date(),
                    status: 'pending'
                };

                // ২. ডাটাবেজে অর্ডারের তথ্য সেভ করা
                try {
                    const saveRes = await fetch('http://localhost:5000/api/save-order', {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(orderDetails)
                    });
                    const saveData = await saveRes.json();

                    if (saveData.insertedId || saveData.success) {
                        // ৩. পেমেন্ট সাকসেস হলে কার্ট ক্লিয়ার করা (নিশ্চিত করুন ব্যাকেন্ডে এই এপিআই আছে)
                        await fetch(`http://localhost:5000/api/clear-cart?email=${user?.email}`, {
                            method: 'DELETE'
                        });

                        setProcessing(false);
                        Swal.fire({
                            icon: "success",
                            title: "Order Placed!",
                            text: `Transaction ID: ${paymentIntent.id}`,
                            confirmButtonColor: '#ff6b08',
                        });
                        navigate('/dashboard/orders');
                    }
                } catch (error) {
                    console.error("Error saving order:", error);
                    setProcessing(false);
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5 text-left max-w-xl mx-auto p-4">
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="name" defaultValue={user?.displayName} placeholder="Full Name" className="p-4 border border-slate-200 rounded-2xl w-full outline-none focus:ring-2 focus:ring-[#ff6b08]" required />
                    <input type="email" name="email" defaultValue={user?.email} placeholder="Email" className="p-4 border border-slate-200 rounded-2xl w-full outline-none focus:ring-2 focus:ring-[#ff6b08]" required />
                </div>
                <input type="text" name="phone" placeholder="Phone Number" className="p-4 border border-slate-200 rounded-2xl w-full outline-none focus:ring-2 focus:ring-[#ff6b08]" required />
                <textarea name="address" rows="2" placeholder="Delivery Address" className="p-4 border border-slate-200 rounded-2xl w-full outline-none focus:ring-2 focus:ring-[#ff6b08]" required></textarea>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm transition-all focus-within:ring-2 focus-within:ring-[#ff6b08]">
                <CardElement options={{ style: { base: { fontSize: '16px', color: '#1e293b', '::placeholder': { color: '#94a3b8' } } } }} />
            </div>
            {cardError && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold italic">⚠️ {cardError}</p>}

            <button type="submit" disabled={!stripe || processing || !clientSecret} className="w-full bg-[#ff6b08] text-white py-5 rounded-[2rem] font-black text-lg shadow-lg hover:bg-slate-900 transition-all disabled:bg-slate-300 flex justify-center items-center gap-2">
                {processing ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : `Confirm Order ($${parseFloat(price).toFixed(2)})`}
            </button>
        </form>
    );
};

export default Checkout;