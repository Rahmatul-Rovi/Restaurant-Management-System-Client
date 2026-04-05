import React from 'react';
import FoodCard from './FoodCard';

const PopularFoods = () => {
    // Dummy Data (Pore apni database theke anben)
    const foods = [
        { id: 1, name: "Chicken Fettuccine", price: 12.99, rating: 4.8, image: "https://img.freepik.com/free-photo/delicious-pasta-plate_23-2150690695.jpg", recipe: "Creamy pasta with grilled chicken and parmesan cheese." },
        { id: 2, name: "Cheese Burst Pizza", price: 15.50, rating: 4.9, image: "https://img.freepik.com/free-photo/top-view-pepperoni-pizza-with-mushroom-sausages-bell-pepper-olive-corn-black-wooden_141793-2158.jpg", recipe: "Loaded with extra cheese, pepperoni, and fresh herbs." },
        { id: 3, name: "Double Patty Burger", price: 8.99, rating: 4.7, image: "https://img.freepik.com/free-photo/fresh-tasty-burger-with-onions-black-surface_1150-42355.jpg", recipe: "Juicy beef patties with secret sauce and cheddar." },
        { id: 4, name: "Grilled Salmon", price: 18.00, rating: 4.9, image: "https://img.freepik.com/free-photo/grilled-salmon-fillet-with-vegetables_2829-14022.jpg", recipe: "Fresh salmon served with roasted veggies and lemon butter." }
    ];

    return (
        <section className="py-20 px-6 md:px-12 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div className="space-y-2">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm">Popular Menu</span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-800">Our Best Seller <span className="text-primary">Dishes</span></h2>
                    </div>
                    <button className="btn btn-ghost text-primary font-bold hover:bg-orange-50">View All Menu →</button>
                </div>

                {/* Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {foods.map(food => (
                        <FoodCard key={food.id} item={food} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularFoods;