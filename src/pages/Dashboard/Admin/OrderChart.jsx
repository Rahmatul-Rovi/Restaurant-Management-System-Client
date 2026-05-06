import { useEffect, useState } from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, Cell 
} from "recharts";
import { HiTrendingUp, HiCurrencyDollar, HiShoppingCart } from "react-icons/hi";

const OrderChart = () => {
    const [chartData, setChartData] = useState([]);
    const [stats, setStats] = useState({ totalRevenue: 0, todayRevenue: 0, totalOrders: 0 });

    useEffect(() => {
        fetch('http://localhost:5000/api/admin/all-orders')
            .then(res => res.json())
            .then(data => {
                let total = 0;
                let today = 0;
                const todayDate = new Date().toLocaleDateString('en-GB');

                const formattedData = data.reduce((acc, curr) => {
                    const date = new Date(curr.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short'
                    });
                    
                    const price = parseFloat(curr.price) || 0;
                    total += price;
                    if (new Date(curr.date).toLocaleDateString('en-GB') === todayDate) {
                        today += price;
                    }

                    const existing = acc.find(item => item.date === date);
                    if (existing) {
                        existing.amount += price;
                    } else {
                        acc.push({ date, amount: price });
                    }
                    return acc;
                }, []);

                // চার্ট ডেটা সেট করা
                setChartData(formattedData);
                
                // স্ট্যাটাস কার্ডের ডেটা সেট করা
                setStats({
                    totalRevenue: total.toFixed(2),
                    todayRevenue: today.toFixed(2),
                    totalOrders: data.length
                });
            });
    }, []);

    return (
        <div className="p-8 space-y-10 bg-[#f8fafc] min-h-screen">
            {/* --- উপরে ৩টি স্ট্যাটাস কার্ড --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* কার্ড ১: মোট আয় */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6">
                    <div className="bg-indigo-100 p-4 rounded-2xl text-indigo-600">
                        <HiCurrencyDollar className="text-4xl" />
                    </div>
                    <div>
                        <p className="text-slate-500 font-medium uppercase tracking-wider text-xs">Total Revenue</p>
                        <h3 className="text-3xl font-black text-slate-800">${stats.totalRevenue}</h3>
                    </div>
                </div>

                {/* কার্ড ২: আজকের আয় */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6">
                    <div className="bg-orange-100 p-4 rounded-2xl text-[#ff6b08]">
                        <HiTrendingUp className="text-4xl" />
                    </div>
                    <div>
                        <p className="text-slate-500 font-medium uppercase tracking-wider text-xs">Today's Earnings</p>
                        <h3 className="text-3xl font-black text-slate-800">${stats.todayRevenue}</h3>
                    </div>
                </div>

                {/* কার্ড ৩: মোট অর্ডার */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6">
                    <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600">
                        <HiShoppingCart className="text-4xl" />
                    </div>
                    <div>
                        <p className="text-slate-500 font-medium uppercase tracking-wider text-xs">Total Orders</p>
                        <h3 className="text-3xl font-black text-slate-800">{stats.totalOrders}</h3>
                    </div>
                </div>
            </div>

            {/* --- নিচে মেইন বার চার্ট --- */}
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Revenue <span className="text-[#ff6b08]">Statistics</span></h2>
                    <p className="text-slate-400 mt-1 font-medium italic">Daily income analysis based on orders</p>
                </div>

                <div className="w-full h-[450px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis 
                                dataKey="date" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#64748b', fontSize: 13, fontWeight: 600 }}
                                dy={15}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip 
                                cursor={{ fill: '#f1f5f9' }}
                                contentStyle={{ 
                                    borderRadius: '16px', 
                                    border: 'none', 
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                    padding: '12px'
                                }}
                            />
                            <Bar 
                                dataKey="amount" 
                                radius={[12, 12, 0, 0]} 
                                barSize={45}
                                animationDuration={1500}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={index === chartData.length - 1 ? '#ff6b08' : '#6366f1'} 
                                        className="transition-all duration-300 hover:opacity-80"
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default OrderChart;