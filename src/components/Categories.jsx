import React from 'react';

const Categories = () => {
    // Deshi food categories sathe relevant icon links
    const categories = [
        { name: 'Biryani', img: 'https://cdn-icons-png.flaticon.com/512/3449/3449339.png' },
        { name: 'Curry', img: 'https://cdn-icons-png.flaticon.com/512/3014/3014631.png' },
        { name: 'Vortas', img: 'https://cdn-icons-png.flaticon.com/512/2713/2713931.png' },
        { name: 'Snacks', img: 'https://cdn-icons-png.flaticon.com/512/3014/3014534.png' },
        { name: 'Desserts', img: 'https://cdn-icons-png.flaticon.com/512/2252/2252439.png' },
        { name: 'Drinks', img: 'https://cdn-icons-png.flaticon.com/512/2713/2713937.png' },
    ];

    return (
        <section className="py-16 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10">
                <div>
                    <span className="text-primary font-bold uppercase tracking-widest text-sm">Delicious Selection</span>
                    <h2 className="text-4xl font-black text-slate-800 mt-2">Explore <span className="text-primary">Categories</span></h2>
                </div>
                <button className="hidden md:block text-primary font-bold hover:underline decoration-2 underline-offset-8">View All →</button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {categories.map((item, index) => (
                    <div 
                        key={index} 
                        className="flex flex-col items-center p-6 bg-white shadow-sm rounded-[2rem] hover:shadow-xl hover:-translate-y-2 cursor-pointer transition-all duration-300 border border-orange-50 group"
                    >
                        <div className="bg-orange-50 p-4 rounded-full group-hover:bg-primary transition-colors duration-300">
                            <img 
                                src={item.img} 
                                alt={item.name} 
                                className="w-12 h-12 object-contain group-hover:invert shadow-sm" 
                            />
                        </div>
                        <span className="font-bold text-slate-700 mt-4 text-lg">{item.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;