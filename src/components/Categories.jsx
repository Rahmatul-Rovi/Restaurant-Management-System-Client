import React from 'react';
import { Link } from 'react-router';

const Categories = () => {
    // Deshi food categories with relevant icons
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
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                    <span className="text-[#ff6b08] font-extrabold uppercase tracking-widest text-xs">
                        Delicious Selection
                    </span>
                    <h2 className="text-4xl font-black text-slate-800 mt-2">
                        Explore <span className="text-[#ff6b08]">Categories</span>
                    </h2>
                </div>
                {/* View All Button with Orange Theme */}
              <Link to="/menu">
                <button className="hidden md:block text-[#ff6b08] font-bold hover:underline decoration-2 underline-offset-8 transition-all">
                    View All Categories →
                </button>
              </Link>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {categories.map((item, index) => (
                    <div 
                        key={index} 
                        className="flex flex-col items-center p-8 bg-white shadow-sm rounded-[2.5rem] hover:shadow-2xl hover:-translate-y-3 cursor-pointer transition-all duration-500 border border-orange-50 group"
                    >
                        {/* Icon Container */}
                        <div className="bg-orange-50 p-5 rounded-full group-hover:bg-[#ff6b08] transition-all duration-500 ease-in-out transform group-hover:rotate-12">
                            <img 
                                src={item.img} 
                                alt={item.name} 
                                className="w-12 h-12 object-contain group-hover:invert transition-all duration-500" 
                            />
                        </div>
                        
                        {/* Category Name */}
                        <span className="font-black text-slate-700 mt-5 text-lg group-hover:text-[#ff6b08] transition-colors">
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;