import React, { useContext } from 'react';
import { HiStar, HiOutlineShoppingBag } from "react-icons/hi";
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import useCart from '../hooks/useCart';

const FoodCard = ({ item }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [, refetch] = useCart();

    if (!item) return null;

    const { name, image, price, recipe, rating, _id } = item;

    const handleAddToCart = () => {
        if (user && user.email) {
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            };

            fetch('http://localhost:5000/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                  Swal.fire({
    position: "center", 
    icon: "success",
    title: `${name} added to cart!`,
    showConfirmButton: false,
    timer: 1500,
    iconColor: '#ff6b08', 
    customClass: {
        popup: 'rounded-[2rem]', 
    }
});
                    
                    // TODO: Future work using TanStack Query  refetch 
                    refetch();
                }
            })
        } else {
            Swal.fire({
                title: "Please login to order food",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ff6b08",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login Now"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };

    return (
        <div className="bg-white rounded-[2rem] p-4 shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-50 relative overflow-hidden">
            {/* Price Tag */}
            <div className="absolute top-6 right-6 z-10 bg-[#ff6b08] text-white font-bold px-4 py-1 rounded-full shadow-lg">
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
                    <button 
                        onClick={handleAddToCart}
                        className="btn bg-[#ff6b08] hover:bg-slate-900 w-full rounded-xl text-white font-bold gap-2 shadow-lg shadow-orange-100 hover:shadow-orange-200 transition-all active:scale-95 border-none"
                    >
                        <HiOutlineShoppingBag className="text-xl" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;