import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard';
import { Link } from 'react-router-dom';

const PopularFoods = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
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

    if (loading) return (
        <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="ml-4 text-xl font-semibold">Hungry? Foods are Coming...</p>
        </div>
    );

    return (
        <section className="py-16 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <span className="text-primary font-bold uppercase tracking-widest text-sm">Customer Favorites</span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-800 mt-2">
                    Our <span className="text-primary">Popular</span> Items
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {foods.map(food => (
                    <FoodCard key={food._id} item={food} />
                ))}
            </div>
            {/* ২. View Full Menu Button Section */}
          <div className="mt-16 text-center">
    <Link to="/menu">
      <button className="px-10 py-3 font-bold border-2 border-[#ff6b08] text-[#ff6b08] hover:bg-[#ff6b08] hover:text-white transition-all duration-300 uppercase tracking-widest text-sm rounded-md">
    Explore Full Menu
</button>
    </Link>
</div>
        </section>
    );
};

export default PopularFoods;