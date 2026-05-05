import { useEffect, useState } from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, Cell, Legend 
} from "recharts";

const OrderChart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/admin/all-orders')
            .then(res => res.json())
            .then(data => {
                const formattedData = data.reduce((acc, curr) => {
                    const date = new Date(curr.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short'
                    });
                    const existing = acc.find(item => item.date === date);
                    if (existing) {
                        existing.revenue += parseFloat(curr.price);
                        existing.orders += 1;
                    } else {
                        acc.push({ date, revenue: parseFloat(curr.price), orders: 1 });
                    }
                    return acc;
                }, []);
                setChartData(formattedData);
            });
    }, []);

    // সুন্দর ভাইব্রেন্ট কালার প্যালেট
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981'];

    return (
        <div className="p-6 bg-white rounded-3xl shadow-xl border border-slate-50">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-800">
                        Revenue <span className="text-[#ff6b08]">Insights</span>
                    </h2>
                    <p className="text-slate-400 text-sm italic">Daily performance tracking</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-xl">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                        <span className="text-xs font-bold text-indigo-700">Total Revenue</span>
                    </div>
                </div>
            </div>

            <div className="w-full h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ff6b08" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#ff6b08" stopOpacity={0.6} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey="date" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip 
                            cursor={{ fill: '#f8fafc' }}
                            contentStyle={{ 
                                borderRadius: '16px', 
                                border: 'none', 
                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                padding: '12px'
                            }}
                            itemStyle={{ fontWeight: 'bold' }}
                        />
                        <Bar 
                            dataKey="revenue" 
                            radius={[10, 10, 0, 0]} 
                            barSize={50}
                            animationDuration={1500}
                        >
                            {chartData.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={colors[index % colors.length]} 
                                    className="hover:opacity-80 transition-opacity cursor-pointer"
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default OrderChart;