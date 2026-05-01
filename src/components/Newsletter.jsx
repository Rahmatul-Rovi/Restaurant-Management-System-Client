const Newsletter = () => {
    return (
        <div className="my-24 py-16 px-8 bg-orange-50 rounded-[3rem] text-center border border-orange-100 shadow-sm">
            {/* টেক্সট কালার এখন ডার্ক স্লট এবং অরেঞ্জ মিক্স */}
            <h2 className="text-4xl font-black mb-4 text-slate-800">
                Don't miss our <span className="text-[#ff6b08]">best deals!</span>
            </h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto font-medium">
                Subscribe to our newsletter and get the latest discount codes directly in your inbox.
            </p>
            
            <form className="max-w-lg mx-auto flex flex-col md:flex-row gap-4 bg-white p-2 rounded-[2rem] shadow-inner border border-orange-100">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 p-4 px-6 rounded-2xl bg-transparent text-slate-900 focus:outline-none"
                    required
                />
                <button className="bg-slate-900 text-white px-10 py-4 rounded-[1.5rem] font-black hover:bg-[#ff6b08] transition-all duration-300 shadow-lg">
                    Subscribe
                </button>
            </form>
            
            {/* ছোট একটা ডেকোরেশন */}
            <p className="mt-6 text-xs text-slate-400 font-medium">
                * We hate spam as much as you do.
            </p>
        </div>
    );
};

export default Newsletter;