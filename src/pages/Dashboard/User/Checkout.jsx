import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const Checkout = ({ price }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card == null) return;

        // ১. সার্ভার থেকে Client Secret নিয়ে আসা
        const res = await fetch('http://localhost:5000/api/create-payment-intent', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ price })
        });
        const { clientSecret } = await res.json();

        // ২. পেমেন্ট কনফার্ম করা
        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: 'Customer Name', // এখানে ইউজারের নাম দিবেন
                },
            },
        });

        if (error) {
            console.log('[error]', error);
            alert(error.message);
        } else {
            if (paymentIntent.status === 'succeeded') {
                alert('Payment Success! Transaction ID: ' + paymentIntent.id);
                // এখানে ডাটাবেজে অর্ডারের তথ্য সেভ করবেন
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': { color: '#aab7c4' },
                        },
                        invalid: { color: '#9e2146' },
                    },
                }}
            />
            <button 
                type="submit" 
                disabled={!stripe}
                className="mt-6 w-full bg-[#ff6b08] text-white py-4 rounded-2xl font-black hover:bg-slate-900 transition-all"
            >
                Pay Now
            </button>
        </form>
    );
};

export default Checkout;