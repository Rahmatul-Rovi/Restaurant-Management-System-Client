import React, { useEffect, useState } from 'react';
import FoodCard from '../components/FoodCard';

const Menu = () => {
    const [allMenu, setAllMenu] = useState([]); 
    const [filteredMenu, setFilteredMenu] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All'); 

    const categories = ['All', 'Biryani', 'Curry', 'Vortas', 'Fish', 'Desserts'];

    useEffect(() => {
        // Fetch All Data Once
        fetch('http://localhost:5000/menu')
            .then(res => res.json())
            .then(data => {
                setAllMenu(data);
                setFilteredMenu(data); 
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // Filter Logic Function
    const handleFilter = (category) => {
        setActiveCategory(category);
        if (category === 'All') {
            setFilteredMenu(allMenu);
        } else {
            const filtered = allMenu.filter(item => item.category === category);
            setFilteredMenu(filtered);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center py-40">
            <span className="loading loading-spinner loading-lg text-[#ff6b08]"></span>
            <p className="ml-4 text-xl font-bold text-slate-700">Loading Menu...</p>
        </div>
    );

    return (
        <div className="pt-28 pb-16 px-6 max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="text-center mb-12">
                <span className="text-[#ff6b08] font-bold text-3xl uppercase tracking-[0.3em] text-xs">Menu Selection</span>
                <h2 className="text-5xl font-black text-slate-800 mt-2">
                    Our Full <span className="text-[#ff6b08]">Menu</span>
                </h2>
                <p className="text-slate-500 mt-4 text-lg max-w-xl mx-auto italic">
                    Explore our wide variety of dishes, carefully curated for your taste buds.
                </p>
                <div className="w-24 h-1.5 bg-[#ff6b08] mx-auto mt-6 rounded-full"></div>
            </div>

            {/* Category Filter Bar - Modern & Sticky on Desktop */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleFilter(cat)}
                        className={`px-8 py-3 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-sm border-2
                            ${activeCategory === cat 
                                ? 'bg-[#ff6b08] border-[#ff6b08] text-white shadow-lg shadow-orange-100 scale-105' 
                                : 'bg-white border-slate-100 text-slate-500 hover:border-[#ff6b08] hover:text-[#ff6b08]'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* All Foods Grid with Animation Feel */}
            {filteredMenu.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredMenu.map(item => (
                        <FoodCard key={item._id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-2xl font-bold text-slate-400">Oops! No items found in <span className="text-[#ff6b08]">{activeCategory}</span></p>
                </div>
            )}
        </div>
    );
};

export default Menu;