import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar bg-primary text-primary-content shadow-lg px-8">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl font-bold">
                    Munim's Restaurant
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/menu">Menu</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;