import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom'; 
import Checkout from '../pages/Dashboard/User/Checkout'; 

// Environment Variable for vite 
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); 

const Payment = () => {
    const location = useLocation();
    
    const price = location.state?.price || 0;
    const finalPrice = parseFloat(price).toFixed(2);

    return (
        <div className="max-w-2xl mx-auto my-20 p-8 md:p-12 bg-slate-50 rounded-[3rem] border border-slate-100">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-black text-slate-800">
                    Complete Your <span className="text-[#ff6b08]">Payment</span>
                </h2>
                <p className="text-slate-500 mt-2 font-medium">
                    Total Amount: <span className="text-slate-900 font-bold">৳{finalPrice}</span>
                </p>
            </div>
            
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-orange-50">
                <Elements stripe={stripePromise}>
                    {/* Dynamic Price */}
                    <Checkout price={price} /> 
                </Elements>
            </div>

            <p className="text-center mt-6 text-xs text-slate-400 font-medium">
                🔒 Your card information is encrypted and never stored on our servers.
            </p>
        </div>
    );
};

export default Payment;