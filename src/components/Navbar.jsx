import { Link, NavLink } from "react-router-dom";
import { HiOutlineShoppingBag, HiOutlineSearch, HiOutlineGlobeAlt } from "react-icons/hi";

const Navbar = () => {

    const navOptions = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "text-primary font-bold" : "hover:text-primary transition-colors"}>Home</NavLink></li>
            <li><NavLink to="/menu" className={({ isActive }) => isActive ? "text-primary font-bold" : "hover:text-primary transition-colors"}>Menu</NavLink></li>
            <li><NavLink to="/offers" className={({ isActive }) => isActive ? "text-primary font-bold" : "hover:text-primary transition-colors"}>Offers</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? "text-primary font-bold" : "hover:text-primary transition-colors"}>Contact</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-white/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-12 py-4 border-b border-gray-100">
            {/* Logo Section */}
            <div className="navbar-start">
                <div className="dropdown lg:hidden">
                    <label tabIndex={0} className="btn btn-ghost p-0 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-white rounded-2xl w-52 font-medium">
                        {navOptions}
                    </ul>
                </div>
                <Link to="/" className="flex items-center gap-2">
                   <span className="text-3xl italic font-black text-slate-800 tracking-tighter">
                        Tasty<span className="text-primary underline decoration-yellow-400">Twists</span>
                   </span>
                </Link>
            </div>

            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-6 font-semibold text-gray-600">
                    {navOptions}
                </ul>
            </div>

            {/* End Section: Icons & Buttons */}
            <div className="navbar-end gap-3 md:gap-5">
                {/* Search & Language (Optional but Pro look) */}
                <div className="hidden md:flex items-center gap-4 text-gray-500 mr-2">
                    <button className="hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium">
                        <HiOutlineGlobeAlt className="text-xl" /> English
                    </button>
                    <button className="hover:text-primary transition-colors">
                        <HiOutlineSearch className="text-2xl" />
                    </button>
                </div>

                {/* Cart Icon */}
                <div className="indicator cursor-pointer group">
                    <span className="indicator-item badge badge-primary badge-sm text-white font-bold px-1 py-2">3</span>
                    <div className="p-2 bg-gray-100 rounded-full group-hover:bg-primary/10 transition-colors">
                        <HiOutlineShoppingBag className="text-2xl text-slate-700 group-hover:text-primary" />
                    </div>
                </div>

                {/* Login & Sign Up Section */}
                <div className="flex items-center gap-2 ml-2">
                    <Link to="/login" className="btn btn-ghost btn-sm hidden md:flex font-bold text-slate-600">
                        Sign In
                    </Link>
                    <Link to="/signup" className="btn btn-primary btn-sm md:btn-md rounded-full px-6 md:px-8 shadow-lg shadow-orange-200 text-white font-bold">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;