// components/WhyChooseUs.jsx
import { HiOutlineBadgeCheck, HiOutlineTruck, HiOutlineClock } from "react-icons/hi";

const WhyChooseUs = () => {
    const features = [
        { id: 1, title: "Quality Food", desc: "We ensure the best ingredients for every meal.", icon: <HiOutlineBadgeCheck className="text-4xl text-orange-500" /> },
        { id: 2, title: "Fast Delivery", desc: "Under 30 minutes delivery to your doorstep.", icon: <HiOutlineTruck className="text-4xl text-orange-500" /> },
        { id: 3, title: "24/7 Service", desc: "Order anytime, we are always ready to serve.", icon: <HiOutlineClock className="text-4xl text-orange-500" /> },
    ];

    return (
        <div className="py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map(f => (
                    <div key={f.id} className="p-10 bg-white border border-slate-100 rounded-[2.5rem] text-center hover:shadow-xl transition-all group">
                        <div className="bg-orange-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            {f.icon}
                        </div>
                        <h3 className="text-xl font-black text-slate-800 mb-3">{f.title}</h3>
                        <p className="text-slate-500 leading-relaxed">{f.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyChooseUs;