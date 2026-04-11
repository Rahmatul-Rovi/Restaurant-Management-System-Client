// src/Layout/DashboardLayout.jsx
import { NavLink, Outlet } from "react-router-dom";
import { HiOutlineShoppingCart, HiOutlineHome, HiOutlineUser, HiOutlineClipboardList } from "react-icons/hi";

const DashboardLayout = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-slate-900 text-white p-6">
                <div className="mb-10 text-center">
                    <h2 className="text-2xl font-black italic">Tasty<span className="text-[#ff6b08]">Twists</span></h2>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mt-1 font-bold">User Dashboard</p>
                </div>

                <ul className="space-y-2 font-medium">
                    <li>
                        <NavLink to="/dashboard/userHome" className={({ isActive }) => `flex items-center gap-3 p-4 rounded-2xl transition-all ${isActive ? 'bg-[#ff6b08] text-white' : 'hover:bg-slate-800 text-slate-400'}`}>
                            <HiOutlineUser className="text-xl" /> User Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myCart" className={({ isActive }) => `flex items-center gap-3 p-4 rounded-2xl transition-all ${isActive ? 'bg-[#ff6b08] text-white' : 'hover:bg-slate-800 text-slate-400'}`}>
                            <HiOutlineShoppingCart className="text-xl" /> My Cart
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/orders" className={({ isActive }) => `flex items-center gap-3 p-4 rounded-2xl transition-all ${isActive ? 'bg-[#ff6b08] text-white' : 'hover:bg-slate-800 text-slate-400'}`}>
                            <HiOutlineClipboardList className="text-xl" /> Order History
                        </NavLink>
                    </li>

                    <div className="divider bg-slate-700 h-[1px] my-6"></div>

                    {/* Shared Links */}
                    <li>
                        <NavLink to="/" className="flex items-center gap-3 p-4 rounded-2xl text-slate-400 hover:bg-slate-800 transition-all">
                            <HiOutlineHome className="text-xl" /> Back to Home
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 p-6 md:p-12">
                <Outlet /> {/* এখানে ড্যাশবোর্ডের আলাদা আলাদা পেজ শো করবে */}
            </div>
        </div>
    );
};

export default DashboardLayout;