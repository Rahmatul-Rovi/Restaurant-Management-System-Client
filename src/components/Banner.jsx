import React from 'react';

const Banner = () => {
    // সিগনেচার কালার কোড
    const brandColor = "#ff6b08";

    return (
        <div className="relative min-h-[650px] bg-white rounded-[3rem] overflow-hidden mt-8 flex items-center shadow-2xl shadow-orange-100/50 border border-orange-50">
            {/* Background Decoration - Updated with brand color and better opacity */}
            <div className={`absolute top-0 right-0 w-1/2 h-full bg-[#ff6b08]/5 -skew-x-12 transform origin-top-right rounded-full blur-3xl`}></div>
            
            <div className="container mx-auto px-6 md:px-16 z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    
                    {/* Left Side: Content */}
                    <div className="flex-1 text-left space-y-8">
                        {/* Discount Badge - Updated Colors */}
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-50 text-[#ff6b08] font-bold text-sm border border-orange-100 shadow-inner">
                            <span>🔥</span> 20% Discount on First Order
                        </div>
                        
                        {/* Main Heading - Updated with brand color */}
                        <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[1.05] tracking-tighter">
                            Satisfy Your <br />
                            <span className={`text-[#ff6b08] italic`}>Cravings,</span> <br />
                            Anytime!
                        </h1>
                        
                        {/* Description */}
                        <p className="text-slate-600 text-lg md:text-xl max-w-xl leading-relaxed font-medium">
                            Experience culinary excellence delivered to your doorstep. Fresh ingredients, 
                            expert chefs, and flavors that tell a delightful story.
                        </p>

                        {/* Search Bar - Updated to professional orange theme */}
                        <div className="relative max-w-xl mt-10 group">
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400 group-focus-within:text-[#ff6b08] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search for Kacchi, Bhorta, Pitha..." 
                                className="w-full pl-14 pr-40 py-6 bg-white border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-[#ff6b08] focus:ring-4 focus:ring-orange-100 shadow-xl shadow-orange-100/20 transition-all text-lg font-medium text-slate-800 placeholder:text-slate-400"
                            />
                            <button className="absolute right-3 top-3 bottom-3 px-10 bg-[#ff6b08] text-white rounded-xl font-extrabold hover:bg-slate-900 transition-all shadow-md active:scale-95 uppercase tracking-wider text-sm">
                                Find Food
                            </button>
                        </div>
                    </div>

                    {/* Right Side: Image with Floating Elements */}
                    <div className="flex-1 relative mt-12 lg:mt-0">
                        {/* Floating Rating Badge - Premium Look */}
                        <div className="absolute -top-10 -left-10 bg-white p-5 rounded-3xl shadow-2xl shadow-orange-100/50 z-20 animate-float flex items-center gap-4 border border-orange-50">
                            <div className="p-3 bg-orange-50 rounded-2xl text-3xl">⭐</div>
                            <div>
                                <p className="font-black text-slate-900 text-xl tracking-tight">4.9 Rating</p>
                                <p className="text-sm text-slate-500 font-medium">(2.5k+ Happy Reviews)</p>
                            </div>
                        </div>

                        {/* Main Image Container */}
                        <div className="relative group">
                            {/* Background Glow - Updated Color */}
                            <div className={`absolute inset-0 bg-[#ff6b08]/20 rounded-full blur-3xl -z-10 transform scale-110 group-hover:scale-125 transition-transform duration-700`}></div>
                            
                            {/* Main Image - Better frame, rotation, and animation */}
                            <img 
                                src="https://img.freepik.com/free-photo/delicious-pasta-plate_23-2150690695.jpg" 
                                className="w-full max-w-lg mx-auto rounded-[3rem] shadow-2xl border-[12px] border-white transform rotate-3 group-hover:rotate-0 transition-all duration-700 ease-in-out object-cover aspect-square" 
                                alt="Tasty Pasta Twist"
                            />
                        </div>
                    </div>

                    {/* Bottom Gradient Decoration (Optional for Pro look) */}
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-5"></div>

                </div>
            </div>
        </div>
    );
};

export default Banner;