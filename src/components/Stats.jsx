import { HiOutlineUserGroup, HiOutlineEmojiHappy, HiOutlineLightningBolt } from "react-icons/hi";

const Stats = () => {
    const statData = [
        { id: 1, count: "12K+", label: "Happy Customers", icon: <HiOutlineEmojiHappy className="text-3xl text-[#ff6b08]" /> },
        { id: 2, count: "50+", label: "Expert Chefs", icon: <HiOutlineUserGroup className="text-3xl text-[#ff6b08]" /> },
        { id: 3, count: "100%", label: "Fresh Ingredients", icon: <HiOutlineLightningBolt className="text-3xl text-[#ff6b08]" /> },
    ];

    return (
        <div className="my-24 py-16 px-10 bg-slate-50/50 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
            {/* ডেকোরেশনের জন্য হালকা অরেঞ্জ আভা */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-100/50 rounded-full blur-3xl -z-10"></div>
            
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                {statData.map((s, index) => (
                    <div 
                        key={s.id} 
                        className={`flex flex-col items-center text-center p-8 rounded-[2.5rem] transition-all duration-500 hover:bg-white hover:shadow-xl group`}
                    >
                        {/* আইকন বক্স - হালকা অরেঞ্জ শেড */}
                        <div className="mb-6 w-20 h-20 rounded-3xl bg-orange-100/30 flex items-center justify-center group-hover:bg-[#ff6b08] transition-all duration-500">
                            <span className="group-hover:text-white transition-colors">
                                {s.icon}
                            </span>
                        </div>
                        
                        {/* কাউন্ট - ডার্ক স্লেট */}
                        <h2 className="text-5xl font-black text-slate-800 mb-2 tracking-tighter">
                            {s.count}
                        </h2>
                        
                        {/* লেবেল - টেক্সট কালারটা একটু সফট */}
                        <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">
                            {s.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stats;