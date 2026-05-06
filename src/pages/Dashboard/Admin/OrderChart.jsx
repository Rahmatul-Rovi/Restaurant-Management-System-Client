import { useEffect, useState } from 'react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
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

                setChartData(formattedData);
                setStats({
                    totalRevenue: total.toFixed(2),
                    todayRevenue: today.toFixed(2),
                    totalOrders: data.length
                });
            });
    }, []);

    return (
        <div className="p-8 space-y-8">
            {/* --- Stats Section --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 rounded-[2rem] text-white shadow-xl shadow-indigo-100 flex items-center justify-between">
                    <div>
                        <p className="text-indigo-100 text-sm font-medium">Total Revenue</p>
                        <h3 className="text-3xl font-black">${stats.totalRevenue}</h3>
                    </div>
                    <div className="bg-white/20 p-4 rounded-2xl">
                        <HiCurrencyDollar className="text-3xl" />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-[#ff6b08] to-[#ff8e3c] p-6 rounded-[2rem] text-white shadow-xl shadow-orange-100 flex items-center justify-between">
                    <div>
                        <p className="text-orange-100 text-sm font-medium">Today's Earn</p>
                        <h3 className="text-3xl font-black">${stats.todayRevenue}</h3>
                    </div>
                    <div className="bg-white/20 p-4 rounded-2xl">
                        <HiTrendingUp className="text-3xl" />
                    </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-[2rem] text-white shadow-xl shadow-emerald-100 flex items-center justify-between">
                    <div>
                        <p className="text-emerald-100 text-sm font-medium">Total Orders</p>
                        <h3 className="text-3xl font-black">{stats.statsOrders || stats.totalOrders}</h3>
                    </div>
                    <div className="bg-white/20 p-4 rounded-2xl">
                        <HiShoppingCart className="text-3xl" />
                    </div>
                </div>
            </div>

            {/* --- Chart Section --- */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div className="mb-10">
                    <h2 className="text-2xl font-black text-slate-800">Earnings <span className="text-[#ff6b08]">Flow</span></h2>
                    <p className="text-slate-400 text-sm italic">Growth of revenue over time</p>
                </div>

                <div className="w-full h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis 
                                dataKey="date" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                                dy={10}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip 
                                contentStyle={{ 
                                    borderRadius: '20px', 
                                    border: 'none', 
                                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                                    padding: '15px'
                                }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="amount" 
                                stroke="#6366f1" 
                                strokeWidth={4}
                                fillOpacity={1} 
                                fill="url(#colorAmt)" 
                                animationDuration={2000}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default OrderChart;