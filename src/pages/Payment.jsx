import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../pages/Dashboard/User/Checkout'; 

// Stripe Dashboard থেকে পাওয়া আপনার আসল Publishable Key এখানে দিন
const stripePromise = loadStripe(Process.env.Publishable_Able); 

const Payment = () => {
    // আপনি চাইলে ইউজার কত টাকা পেমেন্ট করবে সেটা রাউটার থেকে ডাইনামিকলি নিতে পারেন
    // const price = 50; // আপাতত স্ট্যাটিক ৫০ দিলাম

    return (
        <div className="max-w-2xl mx-auto my-20 p-8 md:p-12 bg-slate-50 rounded-[3rem] border border-slate-100">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-black text-slate-800">
                    Complete Your <span className="text-[#ff6b08]">Payment</span>
                </h2>
                <p className="text-slate-500 mt-2 font-medium">Safe and secure transaction via Stripe</p>
            </div>
            
            {/* পেমেন্ট বক্স */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-orange-50">
                <Elements stripe={stripePromise}>
                    <CheckoutForm price={50} /> 
                </Elements>
            </div>

            {/* সিকিউরিটি নোট */}
            <p className="text-center mt-6 text-xs text-slate-400 font-medium">
                🔒 Your card information is encrypted and never stored on our servers.
            </p>
        </div>
    );
};

export default Payment;