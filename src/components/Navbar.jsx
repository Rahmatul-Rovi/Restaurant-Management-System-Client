import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag, HiOutlineSearch } from "react-icons/hi";
import { AuthContext } from "../providers/AuthProvider";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isAdmin] = useAdmin();

    const [cart] = useCart();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log("User Logged Out");
                navigate('/login');
            })
            .catch(err => console.error(err));
    };



    const navOptions = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "text-[#ff6b08] font-bold" : "hover:text-[#ff6b08] transition-colors"}>Home</NavLink></li>
            <li><NavLink to="/menu" className={({ isActive }) => isActive ? "text-[#ff6b08] font-bold" : "hover:text-[#ff6b08] transition-colors"}>Menu</NavLink></li>
            <li><NavLink to="/coverage" className={({ isActive }) => isActive ? "text-[#ff6b08] font-bold" : "hover:text-[#ff6b08] transition-colors"}>Coverage</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? "text-[#ff6b08] font-bold" : "hover:text-[#ff6b08] transition-colors"}>Contact</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? "text-[#ff6b08] font-bold" : "hover:text-[#ff6b08] transition-colors"}>About</NavLink></li>

            {user && (
            <li>
                <NavLink 
                    
                    to={isAdmin ? "/admin-dashboard/home" : "/dashboard/user/home"} 
                    className={({ isActive }) => isActive ? "text-[#ff6b08] font-bold" : "hover:text-[#ff6b08] transition-colors"}
                >
                    Dashboard
                </NavLink>
            </li>
        )}
        </>
    );

    return (
        <div className="navbar bg-white/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-12 py-4 border-b border-gray-100">
            {/* Logo Section */}
            <div className="navbar-start">
                <div className="dropdown lg:hidden">
                    <label tabIndex={0} className="btn btn-ghost p-0 mr-2 text-[#ff6b08]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-white rounded-2xl w-52 font-medium">
                        {navOptions}
                    </ul>
                </div>
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-2xl md:text-3xl italic font-black text-slate-800 tracking-tighter">
                        Tasty<span className="text-[#ff6b08] underline decoration-yellow-400">Twists</span>
                    </span>
                </Link>
            </div>

            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-6 font-semibold text-gray-600">
                    {navOptions}
                </ul>
            </div>

            {/* End Section */}
            <div className="navbar-end gap-3 md:gap-5">
                {/* Search Field */}
                <div className="hidden md:flex relative items-center group">
                    <input 
                        type="text" 
                        placeholder="Search food..." 
                        className="bg-slate-100 py-2 pl-10 pr-4 rounded-full text-sm outline-none border-2 border-transparent focus:border-[#ff6b08] focus:bg-white w-32 focus:w-48 transition-all duration-300"
                    />
                    <HiOutlineSearch className="absolute left-3 text-gray-400 group-focus-within:text-[#ff6b08] text-xl" />
                </div>

                {/* Cart Icon */}
                <Link to="/cart" className="indicator cursor-pointer group">
                    <span className="indicator-item badge badge-primary bg-[#ff6b08] border-none badge-sm text-white font-bold">{cart?.length||0}</span>
                    <div className="p-2.5 bg-gray-100 rounded-full group-hover:bg-orange-50 transition-colors">
                        <HiOutlineShoppingBag className="text-2xl text-slate-700 group-hover:text-[#ff6b08]" />
                    </div>
                </Link>

                {/* Conditional Login/User Profile */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-[#ff6b08]">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL || "https://i.ibb.co/mJR65fc/user.png"} alt="profile" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-white rounded-2xl w-52">
                                <li className="px-2 pb-2 font-bold text-slate-800 border-b mb-2">{user?.displayName || "User"}</li>
                                <li><Link to="#">My Profile</Link></li>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                <li><button onClick={handleLogOut} className="text-red-500 font-bold">Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1">
                            <Link to="/login" className="btn btn-ghost btn-sm hidden md:flex font-bold text-slate-600 hover:text-[#ff6b08]">
                                Sign In
                            </Link>
                            <Link to="/signup" className="btn bg-[#ff6b08] hover:bg-slate-900 border-none btn-sm md:btn-md rounded-full px-6 md:px-8 shadow-lg shadow-orange-100 text-white font-bold">
                                Join Now
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;