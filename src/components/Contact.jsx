import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS এর স্টাইল ইমপোর্ট করা জরুরি
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";

const Contact = () => {

    useEffect(() => {
        // AOS ইনিশিয়ালাইজ করা (হোম/অ্যাবাউট পেজের মতোই)
        AOS.init({
            duration: 1000,
            once: false,
        });
    }, []);

    return (
        <div className="bg-white min-h-screen py-16 px-6 md:px-12 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header Section - স্লাইড হয়ে আসবে */}
                <div className="text-center mb-20" data-aos="fade-down">
                    <span className="text-[#ff6b08] font-extrabold uppercase tracking-widest text-xs mb-3 block">
                        Support Center
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6">
                        Get in <span className="text-[#ff6b08]">Touch</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Have a question about our menu or want to give feedback? 
                        We're here to help you experience the best flavors.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Left Side: Contact Info Cards - বাম দিক থেকে ভেসে আসবে */}
                    <div className="space-y-6" data-aos="fade-right">
                        {/* Email Card */}
                        <div className="flex items-center gap-6 p-8 bg-orange-50/50 rounded-[2rem] border border-orange-100 hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300 group">
                            <div className="p-4 bg-white rounded-2xl text-[#ff6b08] text-3xl shadow-sm group-hover:bg-[#ff6b08] group-hover:text-white transition-all">
                                <HiOutlineMail />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-800 text-xl tracking-tight">Email Us</h4>
                                <p className="text-slate-600 font-medium">support@tastytwists.com</p>
                            </div>
                        </div>

                        {/* Phone Card */}
                        <div className="flex items-center gap-6 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 group">
                            <div className="p-4 bg-white rounded-2xl text-[#ff6b08] text-3xl shadow-sm group-hover:bg-[#ff6b08] group-hover:text-white transition-all">
                                <HiOutlinePhone />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-800 text-xl tracking-tight">Call Us</h4>
                                <p className="text-slate-600 font-medium">+880 1234 567 890</p>
                            </div>
                        </div>

                        {/* Location Card */}
                        <div className="flex items-center gap-6 p-8 bg-orange-50/50 rounded-[2rem] border border-orange-100 hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300 group">
                            <div className="p-4 bg-white rounded-2xl text-[#ff6b08] text-3xl shadow-sm group-hover:bg-[#ff6b08] group-hover:text-white transition-all">
                                <HiOutlineLocationMarker />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-800 text-xl tracking-tight">Visit Us</h4>
                                <p className="text-slate-600 font-medium">123 Foodie Street, Dhaka - 1216</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Professional Contact Form - জুম-ইন হয়ে আসবে */}
                    <div 
                        className="bg-white p-10 md:p-12 rounded-[3rem] shadow-2xl shadow-orange-100 border border-orange-50 relative overflow-hidden"
                        data-aos="zoom-in"
                        data-aos-delay="200" // কার্ড আসার পর ফর্ম আসবে
                    >
                        {/* Background Decoration */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-50 rounded-full blur-3xl opacity-50"></div>
                        
                        <form className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-[#ff6b08] focus:bg-white outline-none transition-all rounded-2xl font-medium" />
                                </div>
                                <div className="form-control">
                                    <label className="label text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                                    <input type="email" placeholder="john@example.com" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-[#ff6b08] focus:bg-white outline-none transition-all rounded-2xl font-medium" />
                                </div>
                            </div>
                            
                            <div className="form-control">
                                <label className="label text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Subject</label>
                                <input type="text" placeholder="How can we help?" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-[#ff6b08] focus:bg-white outline-none transition-all rounded-2xl font-medium" />
                            </div>

                            <div className="form-control">
                                <label className="label text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Your Message</label>
                                <textarea rows="4" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-[#ff6b08] focus:bg-white outline-none transition-all rounded-2xl font-medium resize-none" placeholder="Share your thoughts..."></textarea>
                            </div>

                            <button className="w-full py-5 bg-[#ff6b08] text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-orange-200 hover:bg-slate-900 hover:shadow-slate-200 transition-all duration-300 transform active:scale-95">
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;