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
                        className="group relative p-10 bg-slate-900 rounded-[3rem] text-center transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,107,8,0.2)] border-b-4 border-transparent hover:border-[#ff6b08]"
                    >
                        {/* আইকন বক্স - ডার্ক ব্যাকগ্রাউন্ডে অরেঞ্জ গ্লো */}
                        <div className="w-24 h-24 rounded-[2rem] bg-slate-800 flex items-center justify-center mx-auto mb-8 shadow-inner group-hover:bg-[#ff6b08]/10 transition-colors duration-500">
                            {f.icon}
                        </div>
                        
                        {/* টেক্সট - পিওর হোয়াইট আর স্লিম ফন্ট */}
                        <h3 className="text-2xl font-black text-white mb-4 tracking-tight">
                            {f.title}
                        </h3>
                        <p className="text-slate-400 leading-relaxed font-medium px-4">
                            {f.desc}
                        </p>

                        {/* ছোট একটা ডেকোরেশন লাইন - হোভারে আসবে */}
                        <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-[#ff6b08] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyChooseUs;