// components/Newsletter.jsx
const Newsletter = () => {
    return (
        <div className="my-24 py-16 px-8 bg-[#ff6b08] rounded-[3rem] text-center text-white">
            <h2 className="text-4xl font-black mb-4">Don't miss our best deals!</h2>
            <p className="text-orange-100 mb-8 max-w-md mx-auto font-medium">
                Subscribe to our newsletter and get the latest discount codes directly in your inbox.
            </p>
            <form className="max-w-lg mx-auto flex flex-col md:flex-row gap-4">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 p-4 rounded-2xl bg-white text-slate-900 focus:outline-none"
                    required
                />
                <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-white hover:text-slate-900 transition-all">
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default Newsletter;