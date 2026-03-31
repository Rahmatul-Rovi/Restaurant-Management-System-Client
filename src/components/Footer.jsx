import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 mt-20">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link to="/" className="text-3xl italic font-black text-white tracking-tighter">
                            Tasty<span className="text-primary underline decoration-yellow-400">Twists</span>
                        </Link>
                        <p className="text-sm leading-relaxed opacity-70">
                            Enjoy incredible food from the comfort of your home. 
                            Fresh ingredients, expert chefs, and lightning-fast delivery.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary hover:text-white transition-all"><FaFacebookF /></a>
                            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary hover:text-white transition-all"><FaInstagram /></a>
                            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary hover:text-white transition-all"><FaTwitter /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link to="/menu" className="hover:text-primary transition-colors">Our Menu</Link></li>
                            <li><Link to="/offers" className="hover:text-primary transition-colors">Special Offers</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Support & Legal */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Support</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Refund Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Track Order</a></li>
                        </ul>
                    </div>

                    {/* Install App Section (Pro Look) */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Install Our App</h4>
                        <p className="text-xs opacity-60 mb-4 font-medium uppercase tracking-widest">Available on Store</p>
                        <div className="space-y-3">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" className="h-10 cursor-pointer hover:opacity-80 transition-opacity" alt="Play Store" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" className="h-10 cursor-pointer hover:opacity-80 transition-opacity" alt="App Store" />
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm opacity-50">
                        Copyright © {new Date().getFullYear()} - All rights reserved by <span className="text-white font-semibold">Rahmatul Munim</span>
                    </p>
                    <div className="flex gap-6 text-xs font-medium opacity-50">
                        <a href="#" className="hover:text-white">Cookies</a>
                        <a href="#" className="hover:text-white">Security</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;