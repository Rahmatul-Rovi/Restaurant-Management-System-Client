const Testimonials = () => {
    const reviews = [
        { id: 1, name: "Anisur Rahman", role: "Food Blogger", review: "The pizza was incredibly fresh and arrived earlier than expected!", img: "https://i.pravatar.cc/150?u=1" },
        { id: 2, name: "Sarah Khan", role: "Regular Customer", review: "TastyTwists has the best customer service. Highly recommended!", img: "https://i.pravatar.cc/150?u=2" },
        { id: 3, name: "Tanvir Hasan", role: "Chef", review: "Authentic taste and premium packaging. Best in the city.", img: "https://i.pravatar.cc/150?u=3" },
    ];

    return (
        <div className="py-24">
            <div className="text-center mb-16">
                <span className="text-[#ff6b08] font-bold uppercase tracking-[0.3em] text-xs">Testimonials</span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3">
                    What Our <span className="text-[#ff6b08]">Fans</span> Say
                </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {reviews.map(r => (
                    <div 
                        key={r.id} 
                        className="bg-slate-50 p-10 rounded-[3rem] border border-slate-200/60 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 group"
                    >
                        {/* কোটেশন মার্ক আইকন */}
                        <div className="text-4xl text-slate-200 font-serif leading-none mb-4 group-hover:text-orange-200 transition-colors">“</div>
                        
                        <p className="text-slate-600 leading-relaxed italic mb-8 relative z-10">
                            {r.review}
                        </p>
                        
                        <div className="flex items-center gap-4 pt-6 border-t border-slate-200/50">
                            <img 
                                src={r.img} 
                                alt={r.name} 
                                className="w-12 h-12 rounded-full ring-2 ring-[#ff6b08]/10 group-hover:ring-[#ff6b08]/30 transition-all" 
                            />
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">{r.name}</h4>
                                <p className="text-[10px] text-[#ff6b08] font-black uppercase tracking-widest">{r.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;