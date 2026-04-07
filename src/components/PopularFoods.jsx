import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard';
import { Link } from 'react-router-dom';

const PopularFoods = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Database theke data fetch korchi
        fetch('http://localhost:5000/menu/popular') 
            .then(res => res.json())
            .then(data => {
                setFoods(data.slice(0, 8)); 
                setLoading(false);
            })
            .catch(err => {
                console.error("Data fetch error:", err);
                setLoading(false);
            });
    }, []);

    // Loading state with Orange Spinner
    if (loading) return (
        <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-[#ff6b08]"></span>
            <p className="ml-4 text-xl font-semibold text-slate-700">Hungry? Foods are Coming...</p>
        </div>
    );

    return (
        <section className="py-16 px-6 max-w-7xl mx-auto">
            {/* Header Section with Orange Theme */}
            <div className="text-center mb-12">
                <span className="text-[#ff6b08] font-bold uppercase tracking-widest text-sm">Customer Favorites</span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-800 mt-2">
                    Our <span className="text-[#ff6b08]">Popular</span> Items
                </h2>
                <div className="w-24 h-1 bg-[#ff6b08] mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Grid for Food Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {foods.map(food => (
                    <FoodCard key={food._id} item={food} />
                ))}
            </div>

            {/* View Full Menu Button Section (Skewed Style) */}
           <div className="mt-16 text-center">
                <Link to="/menu" className="inline-block group relative">
                  
                    <div className="absolute inset-0 bg-[#ff6b08] opacity-10 blur-xl group-hover:opacity-30 transition-opacity rounded-md"></div>
                    
                    <button className="relative px-12 py-4 font-bold bg-[#ff6b08] text-white hover:bg-black transition-all duration-300 uppercase tracking-widest text-sm rounded-md shadow-lg border-none">
                        Explore Full Menu
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default PopularFoods;