import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);

    const { data, isLoading } = useQuery({
        queryKey: ['admin', user?.email],
        enabled: !!user?.email && !loading, 
        queryFn: async () => {
            const res = await fetch(
                `https://tasty-twists-server.vercel.app/users/${user.email}`
            );
            if (!res.ok) throw new Error('Failed to fetch user role');
            return res.json();
        }
    });

    return [data?.role === 'admin', loading || isLoading];
};

export default useAdmin;