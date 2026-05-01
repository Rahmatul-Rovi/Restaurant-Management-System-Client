// components/Testimonials.jsx
const Testimonials = () => {
    const reviews = [
        { id: 1, name: "Anisur Rahman", role: "Food Blogger", review: "The pizza was incredibly fresh and arrived earlier than expected!", img: "https://i.pravatar.cc/150?u=1" },
        { id: 2, name: "Sarah Khan", role: "Regular Customer", review: "TastyTwists has the best customer service. Highly recommended!", img: "https://i.pravatar.cc/150?u=2" },
        { id: 3, name: "Tanvir Hasan", role: "Chef", review: "Authentic taste and premium packaging. Best in the city.", img: "https://i.pravatar.cc/150?u=3" },
    ];

    return (
        <div className="py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-slate-800">What Our <span className="text-[#ff6b08]">Fans</span> Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {reviews.map(r => (
                    <div key={r.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl transition-all group">
                        <div className="flex items-center gap-4 mb-6">
                            <img src={r.img} alt="" className="w-14 h-14 rounded-2xl object-cover" />
                            <div>
                                <h4 className="font-bold text-slate-800">{r.name}</h4>
                                <p className="text-xs text-[#ff6b08] font-bold">{r.role}</p>
                            </div>
                        </div>
                        <p className="text-slate-500 italic">"{r.review}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;