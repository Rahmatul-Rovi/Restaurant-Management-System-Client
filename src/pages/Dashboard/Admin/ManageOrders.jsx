import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/admin/all-orders')
            .then(res => res.json())
            .then(data => setOrders(data));
    }, []);

    const handleUpdateStatus = (id) => {
        fetch(`http://localhost:5000/api/admin/order-status/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ status: 'confirmed' })
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                Swal.fire("Success!", "Order Confirmed", "success");
                // লোকাল স্টেট আপডেট যাতে রিলোড ছাড়া চেঞ্জ দেখা যায়
                const remaining = orders.map(order => order._id === id ? {...order, status: 'confirmed'} : order);
                setOrders(remaining);
            }
        });
    };

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-5">Manage All Orders</h2>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td>{order.email}</td>
                                <td>${order.price}</td>
                                <td>
                                    <span className={`badge ${order.status === 'pending' ? 'badge-warning' : 'badge-success'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    {order.status === 'pending' && (
                                        <button onClick={() => handleUpdateStatus(order._id)} className="btn btn-xs btn-primary">Confirm</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;