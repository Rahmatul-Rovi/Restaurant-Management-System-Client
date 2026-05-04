import { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth"; 

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const user = auth.currentUser; 

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/api/user-orders?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setOrders(data);
                    setLoading(false);
                });
        }
    }, [user]);

    if (loading) return <div className="text-center py-20 font-bold">Loading Orders...</div>;

    return (
        <div className="p-8 min-h-screen">
            <h2 className="text-3xl font-black mb-6">Order <span className="text-[#ff6b08]">History</span></h2>
            <div className="overflow-x-auto bg-white rounded-3xl shadow-sm border border-slate-100">
                <table className="table w-full border-collapse">
                    <thead className="bg-slate-50 text-slate-800">
                        <tr>
                            <th className="py-5 px-6 text-left">#</th>
                            <th className="text-left">Transaction ID</th>
                            <th className="text-left">Price</th>
                            <th className="text-left">Date</th>
                            <th className="text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={order._id} className="hover:bg-slate-50 transition-colors border-b border-slate-100">
                                    <td className="py-4 px-6">{index + 1}</td>
                                    <td className="font-mono text-xs text-blue-600">{order.transactionId}</td>
                                    <td className="font-bold text-slate-700">${parseFloat(order.price).toFixed(2)}</td>
                                    <td>{new Date(order.date).toLocaleDateString('en-GB')}</td>
                                    <td className="text-center">
                                        <span className={`py-1 px-4 rounded-full font-bold text-[10px] uppercase tracking-wider ${order.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-20">
                                    <p className="text-slate-400 italic text-lg">No orders found in your history!</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;