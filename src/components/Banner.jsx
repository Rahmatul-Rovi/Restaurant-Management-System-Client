import React from 'react';

const Banner = () => {
    return (
        <div className="relative min-h-[600px] bg-white rounded-3xl overflow-hidden mt-6 flex items-center">
            {/* Background Decoration - eita design ke professional look dibe */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top-right"></div>
            
            <div className="container mx-auto px-6 md:px-12 z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    
                    {/* Left Side: Content */}
                    <div className="flex-1 text-left space-y-6">
                        <div className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm">
                            🔥 20% Discount on First Order
                        </div>
                        
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-800 leading-[1.1]">
                            Satisfy Your <br />
                            <span className="text-primary italic">Cravings,</span> <br />
                            Anytime!
                        </h1>
                        
                        <p className="text-gray-500 text-lg md:text-xl max-w-md leading-relaxed">
                            Experience culinary excellence delivered to your doorstep. Fresh ingredients, 
                            expert chefs, and flavors that tell a story.
                        </p>

                        {/* Search Bar: Aro modern look */}
                        <div className="relative max-w-md mt-8 group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input 
                                type="text" 
                                placeholder="What are you hungry for?" 
                                className="w-full pl-12 pr-32 py-5 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-primary shadow-lg transition-all"
                            />
                            <button className="absolute right-2 top-2 bottom-2 px-6 bg-primary text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-md active:scale-95">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Right Side: Image with Floating Elements */}
                    <div className="flex-1 relative">
                        {/* Floating Badge */}
                        <div className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-xl z-20 animate-bounce flex items-center gap-3">
                            <div className="p-2 bg-yellow-100 rounded-lg text-2xl">⭐</div>
                            <div>
                                <p className="font-bold text-slate-800">4.9 Rating</p>
                                <p className="text-xs text-gray-400">2k+ Reviews</p>
                            </div>
                        </div>

                        {/* Main Image Container */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl -z-10"></div>
                            <img 
                                src="https://img.freepik.com/free-photo/delicious-pasta-plate_23-2150690695.jpg" 
                                className="w-full max-w-lg mx-auto rounded-[2.5rem] shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-all duration-700 object-cover aspect-square" 
                                alt="Delicious Pasta"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Banner;