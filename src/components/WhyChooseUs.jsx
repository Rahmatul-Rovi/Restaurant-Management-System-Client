import { HiOutlineBadgeCheck, HiOutlineTruck, HiOutlineClock } from "react-icons/hi";

const WhyChooseUs = () => {
    const features = [
        { 
            id: 1, 
            title: "Quality Food", 
            desc: "We ensure the best ingredients for every meal.", 
            icon: <HiOutlineBadgeCheck className="text-4xl text-[#ff6b08]" /> 
        },
        { 
            id: 2, 
            title: "Fast Delivery", 
            desc: "Under 30 minutes delivery to your doorstep.", 
            icon: <HiOutlineTruck className="text-4xl text-[#ff6b08]" /> 
        },
        { 
            id: 3, 
            title: "24/7 Service", 
            desc: "Order anytime, we are always ready to serve.", 
            icon: <HiOutlineClock className="text-4xl text-[#ff6b08]" /> 
        },
    ];

    return (
        <div className="py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {features.map(f => (
                    <div 
                        key={f.id} 
                        className="group p-10 bg-orange-50 rounded-[3rem] text-center border border-orange-100 transition-all duration-500 hover:bg-white hover:shadow-[0_20px_50px_rgba(255,107,8,0.1)] hover:-translate-y-2"
                    >
                        {/* আইকন বক্স - সাদার ওপর হালকা অরেঞ্জ আভা */}
                        <div className="w-24 h-24 rounded-[2rem] bg-white flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                            {f.icon}
                        </div>
                        
                        {/* টেক্সট - ডার্ক স্লট কালার যা হালকা অরেঞ্জের ওপর দারুণ ফুটে ওঠে */}
                        <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">
                            {f.title}
                        </h3>
                        <p className="text-slate-500 leading-relaxed font-medium px-4">
                            {f.desc}
                        </p>

                        {/* নিচে ছোট্ট একটা ডিজাইন লাইন */}
                        <div className="w-12 h-1 bg-orange-200 mx-auto mt-6 rounded-full group-hover:w-20 group-hover:bg-[#ff6b08] transition-all duration-500"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyChooseUs;