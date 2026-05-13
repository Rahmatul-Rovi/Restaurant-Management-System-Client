import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { HiOutlineLightBulb, HiOutlineUserGroup, HiOutlineGlobeAlt, HiOutlineRocketLaunch } from "react-icons/hi2";

const About = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-16 space-y-24 overflow-x-hidden">
            
            {/* Hero Section */}
            <div className="text-center space-y-4" data-aos="fade-down">
                <h2 className="text-5xl font-black text-slate-800">
                    Beyond The <span className="text-[#ff6b08]">Plate</span>
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto font-medium">
                    We are more than just a food delivery service. We are a team of foodies, 
                    tech enthusiasts, and community builders dedicated to bringing joy to your doorstep.
                </p>
            </div>

            {/* Our Story Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative" data-aos="fade-right">
                    <img 
                        src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                        alt="Our Kitchen" 
                        className="rounded-[3rem] shadow-2xl shadow-orange-100"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-50 hidden md:block">
                        <p className="text-4xl font-black text-[#ff6b08]">5+</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Years of Excellence</p>
                    </div>
                </div>
                
                <div className="space-y-6" data-aos="fade-left">
                    <h3 className="text-3xl font-bold text-slate-800">Our Journey Started with a <span className="text-[#ff6b08]">Simple Vision</span></h3>
                    <p className="text-slate-600 leading-relaxed">
                        Founded in 2021, we noticed a gap between high-quality restaurant food and the convenience of home dining. 
                        What started as a small local initiative in Dhaka has now grown into a platform serving thousands of happy customers every day.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                        We believe that everyone deserves access to fresh, healthy, and delicious meals without compromising their busy schedules. 
                        That's why we partner with only the best local vendors.
                    </p>
                    <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg active:scale-95">
                        Learn More
                    </button>
                </div>
            </div>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <ValueCard 
                    icon={<HiOutlineLightBulb />} 
                    title="Innovation" 
                    desc="Using the latest tech to ensure your food stays fresh and hot."
                    delay="100"
                />
                <ValueCard 
                    icon={<HiOutlineUserGroup />} 
                    title="Community" 
                    desc="Supporting local farmers and small restaurant owners."
                    delay="200"
                />
                <ValueCard 
                    icon={<HiOutlineGlobeAlt />} 
                    title="Sustainability" 
                    desc="Moving towards 100% eco-friendly packaging by 2027."
                    delay="300"
                />
                <ValueCard 
                    icon={<HiOutlineRocketLaunch />} 
                    title="Fast Delivery" 
                    desc="Our average delivery time is under 30 minutes."
                    delay="400"
                />
            </div>

            {/* Mission & Vision Banner */}
            <div className="bg-slate-900 rounded-[3rem] p-12 text-center text-white space-y-6 relative overflow-hidden" data-aos="zoom-in">
                <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
                
                <h3 className="text-3xl font-black italic">"Our mission is to nourish people and the planet, one meal at a time."</h3>
                <p className="text-slate-400 font-medium">— The Founder's Note</p>
            </div>
        </div>
    );
};

// Value Card Component
const ValueCard = ({ icon, title, desc, delay }) => (
    <div 
        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
        data-aos="fade-up"
        data-aos-delay={delay}
    >
        <div className="w-14 h-14 bg-slate-50 text-[#ff6b08] text-3xl rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#ff6b08] group-hover:text-white transition-colors">
            {icon}
        </div>
        <h4 className="text-xl font-bold text-slate-800 mb-3">{title}</h4>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
);

export default About;