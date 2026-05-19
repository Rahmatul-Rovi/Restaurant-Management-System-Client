import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const useCart = () => {
    const { user } = useContext(AuthContext);

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await fetch(
                `https://tasty-twists-server.vercel.app/carts?email=${user?.email}`
            );
            
            if (!res.ok) throw new Error('Failed to fetch cart');
            return res.json();
        },
    });

    return [cart, refetch];
};

export default useCart;