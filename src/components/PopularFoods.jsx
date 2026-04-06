import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard';

const PopularFoods = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        fetch('http://localhost:5000/menu')
            .then(res => res.json())
            .then(data => {
                
                const popular = data.filter(item => item.category === 'popular').slice(0, 8);
                setFoods(popular);
                setLoading(false);
            })
    }, []);

    if (loading) return <div className="text-center py-20">Loading Deshi Food...</div>;

    return (
        <section className="py-16 px-6 max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-10 text-center text-slate-800">
                Our <span className="text-primary">Popular</span> Items
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {foods.map(food => <FoodCard key={food._id} item={food} />)}
            </div>
        </section>
    );
};

export default PopularFoods;