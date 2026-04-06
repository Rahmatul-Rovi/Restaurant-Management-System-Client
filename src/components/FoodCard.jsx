import React from 'react';
import { HiStar, HiOutlineShoppingBag } from "react-icons/hi";

const FoodCard = ({ item }) => {
    // Safety Check: Jodi item undefined hoy, tahole error na diye kisu show korbe na
    if (!item) {
        return null;
    }

    const { name, image, price, recipe, rating } = item;

    return (
        <div className="bg-white rounded-[2rem] p-4 shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-50 relative overflow-hidden">
            {/* Price Tag */}
           <div className="absolute top-6 right-6 z-10 bg-primary text-white font-bold px-4 py-1 rounded-full shadow-lg">
    ৳{price}
</div>

            {/* Image Section */}
            <div className="overflow-hidden rounded-2xl aspect-square mb-4">
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            {/* Content Section */}
            <div className="space-y-2 px-2">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">{name}</h3>
                    <div className="flex items-center gap-1 text-yellow-500 font-bold">
                        <HiStar /> <span>{rating}</span>
                    </div>
                </div>
                
                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                    {recipe}
                </p>

                {/* Add to Cart Button */}
                <div className="pt-4">
                    <button className="btn btn-primary w-full rounded-xl text-white font-bold gap-2 shadow-lg shadow-orange-100 hover:shadow-orange-200 transition-all active:scale-95 border-none">
                        <HiOutlineShoppingBag className="text-xl" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;