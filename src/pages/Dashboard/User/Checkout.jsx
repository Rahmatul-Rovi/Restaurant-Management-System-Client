import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // সুন্দর অ্যালার্টের জন্য

const Checkout = ({ price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const address = form.address.value;

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card == null) return;

        setProcessing(true);

        // ১. সার্ভার থেকে Client Secret নিয়ে আসা
        const res = await fetch('http://localhost:5000/api/order', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ price })
        });
        const { clientSecret } = await res.json();

        // ২. পেমেন্ট কনফার্ম করা
        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: { name, email },
            },
        });

        if (error) {
            setProcessing(false);
            Swal.fire("Error", error.message, "error");
        } else {
            if (paymentIntent.status === 'succeeded') {
                // ৩. পেমেন্ট সাকসেস হলে ডাটাবেজে অর্ডারের তথ্য সেভ করা
                const orderDetails = {
                    transactionId: paymentIntent.id,
                    name,
                    email,
                    phone,
                    address,
                    price,
                    date: new Date(),
                    status: 'pending' // ডেলিভারি স্ট্যাটাস
                };

                // আপনার সার্ভারে অর্ডারের তথ্য সেভ করার জন্য একটি API কল
                fetch('http://localhost:5000/api/save-order', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(orderDetails)
                })
                .then(res => res.json())
                .then(data => {
                    setProcessing(false);
                    Swal.fire("Success!", "Order placed successfully!", "success");
                    navigate('/dashboard/user/my-orders'); // সাকসেস হলে এখানে যাবে
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* কাস্টমার ইনফরমেশন */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Full Name" className="p-3 border rounded-xl w-full outline-[#ff6b08]" required />
                <input type="email" name="email" placeholder="Email Address" className="p-3 border rounded-xl w-full outline-[#ff6b08]" required />
            </div>
            <input type="text" name="phone" placeholder="Phone Number" className="p-3 border rounded-xl w-full outline-[#ff6b08]" required />
            <textarea name="address" placeholder="Delivery Address (House, Road, Block)" className="p-3 border rounded-xl w-full outline-[#ff6b08]" required></textarea>

            {/* কার্ড ইনপুট */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-4">
                <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
            </div>

            <button 
                type="submit" 
                disabled={!stripe || processing}
                className="w-full bg-[#ff6b08] text-white py-4 rounded-2xl font-black hover:bg-slate-900 transition-all disabled:bg-slate-300"
            >
                {processing ? "Processing..." : `Pay $${price} & Confirm Order`}
            </button>
        </form>
    );
};

export default Checkout;