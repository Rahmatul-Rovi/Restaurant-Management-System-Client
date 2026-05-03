import { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth"; 

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const auth = getAuth();
    const user = auth.currentUser; 

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/api/user-orders?email=${user.email}`)
                .then(res => res.json())
                .then(data => setOrders(data));
        }
    }, [user]);

    return (
        <div className="p-8">
            <h2 className="text-3xl font-black mb-6">My <span className="text-[#ff6b08]">Orders</span></h2>
            <div className="overflow-x-auto bg-white rounded-3xl shadow-sm border border-slate-100">
                <table className="table w-full">
                    <thead className="bg-slate-50 text-slate-800 font-bold">
                        <tr>
                            <th className="py-4">#</th>
                            <th>Transaction ID</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                                    <td>{index + 1}</td>
                                    <td className="font-mono text-xs text-blue-600">{order.transactionId}</td>
                                    <td className="font-bold text-slate-700">${order.price}</td>
                                    <td>{new Date(order.date).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`badge border-none py-3 px-4 rounded-full font-bold text-[10px] uppercase ${order.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-slate-400 italic">No orders found yet!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;