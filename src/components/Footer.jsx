import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    // Current Year for Copyright
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0f172a] text-slate-400 pt-20 pb-10 mt-24 relative overflow-hidden">
            {/* Background Decoration (Optional Glow) */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6b08] opacity-[0.03] blur-[100px]"></div>
            
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="text-3xl font-black text-white tracking-tighter block group">
                            Tasty<span className="text-[#ff6b08] group-hover:underline decoration-2 underline-offset-4 transition-all">Twists</span>
                        </Link>
                        <p className="text-sm leading-relaxed opacity-80 max-w-xs">
                            Bringing the heart of culinary excellence to your doorstep. 
                            Fresh ingredients, expert chefs, and flavors that tell a story.
                        </p>
                        {/* Social Icons with Orange Hover */}
                        <div className="flex gap-4 pt-2">
                            {[
                                { icon: <FaFacebookF />, link: "#" },
                                { icon: <FaInstagram />, link: "#" },
                                { icon: <FaTwitter />, link: "#" },
                                { icon: <FaLinkedinIn />, link: "#" }
                            ].map((social, idx) => (
                                <a 
                                    key={idx}
                                    href={social.link} 
                                    className="w-10 h-10 flex items-center justify-center bg-slate-800/50 rounded-xl hover:bg-[#ff6b08] hover:text-white hover:-translate-y-1 transition-all duration-300 border border-slate-700/50"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
                            Quick Links
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#ff6b08] rounded-full"></span>
                        </h4>
                        <ul className="space-y-4 text-sm">
                            {['Home', 'Our Menu', 'Special Offers', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <Link 
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`} 
                                        className="hover:text-[#ff6b08] transition-all hover:pl-2 flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-[#ff6b08] rounded-full opacity-0 group-hover:opacity-100 transition-all"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support & Legal */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
                            Support
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#ff6b08] rounded-full"></span>
                        </h4>
                        <ul className="space-y-4 text-sm">
                            {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Track Order'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-[#ff6b08] transition-all hover:pl-2 flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 bg-[#ff6b08] rounded-full opacity-0 group-hover:opacity-100 transition-all"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Install App Section */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
                            Install Our App
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#ff6b08] rounded-full"></span>
                        </h4>
                        <p className="text-xs text-slate-500 mb-6 font-bold uppercase tracking-[0.2em]">Available on Store</p>
                        <div className="space-y-4">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                                className="h-11 cursor-pointer hover:scale-105 transition-transform duration-300 shadow-xl" 
                                alt="Play Store" 
                            />
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                                className="h-11 cursor-pointer hover:scale-105 transition-transform duration-300 shadow-xl" 
                                alt="App Store" 
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800/60 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm opacity-60">
                        Copyright © {currentYear} - All rights reserved by <span className="text-[#ff6b08] font-bold">Rahmatul Munim</span>
                    </p>
                    <div className="flex gap-8 text-xs font-bold uppercase tracking-widest opacity-40">
                        <a href="#" className="hover:text-[#ff6b08] transition-colors">Cookies</a>
                        <a href="#" className="hover:text-[#ff6b08] transition-colors">Security</a>
                        <a href="#" className="hover:text-[#ff6b08] transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;