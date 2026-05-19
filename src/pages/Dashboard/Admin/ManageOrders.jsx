import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { HiCheckCircle, HiClock, HiOutlineMail, HiCurrencyDollar } from "react-icons/hi";

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('https://tasty-twists-server.vercel.app/api/admin/all-orders')
            .then(res => res.json())
            .then(data => setOrders(data));
    }, []);

    const handleUpdateStatus = (id) => {
        fetch(`https://tasty-twists-server.vercel.app/api/admin/order-status/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ status: 'confirmed' })
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: "Confirmed!",
                    text: "The order is being prepared.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });
                const remaining = orders.map(order => order._id === id ? {...order, status: 'confirmed'} : order);
                setOrders(remaining);
            }
        });
    };

    return (
        <div className="p-8 min-h-screen">
            <div className="mb-10">
                <h2 className="text-4xl font-black text-slate-800">Order <span className="text-[#ff6b08]">Management</span></h2>
                <p className="text-slate-500 mt-2">Monitor and manage customer orders seamlessly.</p>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse">
                        <thead className="bg-slate-50 text-slate-600 uppercase text-xs tracking-widest font-bold">
                            <tr>
                                <th className="py-6 px-8 text-left">#</th>
                                <th className="text-left">Customer Details</th>
                                <th className="text-left">Price</th>
                                <th className="text-center">Status</th>
                                <th className="text-right px-8">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {orders.length > 0 ? (
                                orders.map((order, index) => (
                                    <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-6 px-8 font-bold text-slate-400">{index + 1}</td>
                                        <td>
                                            <div className="flex flex-col">
                                                <span className="flex items-center gap-2 font-bold text-slate-700">
                                                    <HiOutlineMail className="text-indigo-400" /> {order.email}
                                                </span>
                                                <span className="text-[10px] text-slate-400 font-mono mt-1">ID: {order.transactionId}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-1 font-black text-slate-800 text-lg">
                                                <HiCurrencyDollar className="text-emerald-500" />
                                                {parseFloat(order.price).toFixed(2)}
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            {order.status === 'pending' ? (
                                                <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-tighter">
                                                    <HiClock className="text-sm" /> Pending
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-tighter">
                                                    <HiCheckCircle className="text-sm" /> Confirmed
                                                </span>
                                            )}
                                        </td>
                                        <td className="text-right px-8">
                                            {order.status === 'pending' ? (
                                                <button 
                                                    onClick={() => handleUpdateStatus(order._id)} 
                                                    className="bg-[#ff6b08] hover:bg-[#e85a00] text-white px-6 py-2 rounded-xl text-xs font-bold transition-all transform hover:scale-105 shadow-lg shadow-orange-200"
                                                >
                                                    Confirm
                                                </button>
                                            ) : (
                                                <button disabled className="bg-slate-100 text-slate-400 px-6 py-2 rounded-xl text-xs font-bold cursor-not-allowed border border-slate-200">
                                                    Done
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-32">
                                        <p className="text-slate-300 italic text-xl">No orders available today!</p>
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

export default ManageOrders;