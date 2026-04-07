import React, { useEffect, useState } from 'react';
import FoodCard from '../components/FoodCard';

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch Data from Database 
        fetch('http://localhost:5000/menu')
            .then(res => res.json())
            .then(data => {
                setMenu(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    if (loading) return <div className="text-center py-20 font-bold text-2xl">Loading Food menu...</div>;

    return (
        <div className="pt-20 pb-16 px-6 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h2 className="text-5xl font-black text-slate-800">Our Full <span className="text-primary">Menu</span></h2>
                <p className="text-gray-500 mt-4 text-lg">Taste the best deshi flavors from our kitchen</p>
                <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
            </div>

            {/* All Foods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {menu.map(item => (
                    <FoodCard key={item._id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Menu;