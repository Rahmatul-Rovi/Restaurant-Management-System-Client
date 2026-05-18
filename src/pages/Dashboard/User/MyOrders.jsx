import { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { HiOutlineShoppingBag, HiOutlineCash, HiOutlineCalendar, HiOutlineBadgeCheck } from "react-icons/hi";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalSpent: 0,
        todayOrders: 0,
        todaySpent: 0
    });
    
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/api/user-orders?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setOrders(data);
                    
                    // --- Status Calculation ---
                    let totalS = 0;
                    let todayO = 0;
                    let todayS = 0;
                    const todayDate = new Date().toLocaleDateString('en-GB');

                    data.forEach(order => {
                        const price = parseFloat(order.price) || 0;
                        totalS += price;

                        const orderDate = new Date(order.date).toLocaleDateString('en-GB');
                        if (orderDate === todayDate) {
                            todayO += 1;
                            todayS += price;
                        }
                    });

                    setStats({
                        totalOrders: data.length,
                        totalSpent: totalS.toFixed(2),
                        todayOrders: todayO,
                        todaySpent: todayS.toFixed(2)
                    });

                    setLoading(false);
                });
        }
    }, [user]);

    if (loading) return <div className="text-center py-20 font-bold text-slate-500 animate-pulse">Loading Your History...</div>;

    return (
        <div className="p-8 min-h-screen bg-[#f8fafc] space-y-10">
            {/* --- Header Section --- */}
            <div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                    Order <span className="text-[#ff6b08]">History</span>
                </h2>
                <p className="text-slate-400 mt-1 font-medium">Manage and track your recent purchases</p>
            </div>

            {/* ---Status Card Section --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card-1: Total Order */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                        <HiOutlineShoppingBag className="text-2xl" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Total Orders</p>
                        <h3 className="text-xl font-black text-slate-800">{stats.totalOrders}</h3>
                    </div>
                </div>

                {/* Card-2: Total Amount */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600">
                        <HiOutlineCash className="text-2xl" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Total Spent</p>
                        <h3 className="text-xl font-black text-slate-800">${stats.totalSpent}</h3>
                    </div>
                </div>

                {/* Card-3: Today's Order */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="bg-orange-100 p-3 rounded-2xl text-orange-600">
                        <HiOutlineCalendar className="text-2xl" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Today's Orders</p>
                        <h3 className="text-xl font-black text-slate-800">{stats.todayOrders}</h3>
                    </div>
                </div>

                {/* Card-4: Today's Cost */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600">
                        <HiOutlineBadgeCheck className="text-2xl" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Today's Cost</p>
                        <h3 className="text-xl font-black text-slate-800">${stats.todaySpent}</h3>
                    </div>
                </div>
            </div>

            {/* --- Table Section --- */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse">
                        <thead className="bg-slate-50/50 text-slate-800 border-b border-slate-100">
                            <tr>
                                <th className="py-6 px-8 text-left text-xs font-bold uppercase tracking-widest text-slate-400">#</th>
                                <th className="text-left text-xs font-bold uppercase tracking-widest text-slate-400">Transaction ID</th>
                                <th className="text-left text-xs font-bold uppercase tracking-widest text-slate-400">Price</th>
                                <th className="text-left text-xs font-bold uppercase tracking-widest text-slate-400">Date</th>
                                <th className="text-center text-xs font-bold uppercase tracking-widest text-slate-400">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {orders.length > 0 ? (
                                orders.map((order, index) => (
                                    <tr key={order._id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="py-5 px-8 text-slate-500 font-medium">{index + 1}</td>
                                        <td className="font-mono text-[11px] text-blue-600 font-bold">{order.transactionId}</td>
                                        <td className="font-black text-slate-700">${parseFloat(order.price).toFixed(2)}</td>
                                        <td className="text-slate-500 font-medium text-sm">
                                            {new Date(order.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="text-center">
                                            <span className={`py-1.5 px-4 rounded-full font-black text-[10px] uppercase tracking-tighter shadow-sm ${
                                                order.status === 'pending' 
                                                ? 'bg-orange-100 text-orange-600' 
                                                : 'bg-emerald-100 text-emerald-600'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-24">
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <div className="bg-slate-100 p-4 rounded-full">
                                                <HiOutlineShoppingBag className="text-4xl text-slate-300" />
                                            </div>
                                            <p className="text-slate-400 font-bold">No orders found in your history!</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyOrders;