import React from 'react';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";

const Contact = () => {
    return (
        <div className="bg-white min-h-screen py-12 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">Get in <span className="text-primary">Touch</span></h2>
                    <p className="text-gray-500 max-w-2xl mx-auto italic">Have a question or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Left Side: Contact Info */}
                    <div className="space-y-8">
                        <div className="flex items-start gap-5 p-6 bg-slate-50 rounded-3xl hover:shadow-md transition-shadow">
                            <div className="p-4 bg-primary/10 rounded-2xl text-primary text-2xl">
                                <HiOutlineMail />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-lg">Email Us</h4>
                                <p className="text-gray-500">support@tastytwists.com</p>
                                <p className="text-gray-500">info@tastytwists.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5 p-6 bg-slate-50 rounded-3xl hover:shadow-md transition-shadow">
                            <div className="p-4 bg-orange-100 rounded-2xl text-orange-600 text-2xl">
                                <HiOutlinePhone />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-lg">Call Us</h4>
                                <p className="text-gray-500">+880 1234 567 890</p>
                                <p className="text-gray-500">Mon - Sat (9am - 10pm)</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5 p-6 bg-slate-50 rounded-3xl hover:shadow-md transition-shadow">
                            <div className="p-4 bg-green-100 rounded-2xl text-green-600 text-2xl">
                                <HiOutlineLocationMarker />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-lg">Visit Us</h4>
                                <p className="text-gray-500">123 Foodie Street, Dhaka,</p>
                                <p className="text-gray-500">Bangladesh - 1216</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-gray-50">
                        <form className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="form-control">
                                    <label className="label text-sm font-semibold text-slate-700">Full Name</label>
                                    <input type="text" placeholder="Enter Your Name" className="input input-bordered bg-slate-50 border-none focus:ring-2 focus:ring-primary transition-all rounded-xl" />
                                </div>
                                <div className="form-control">
                                    <label className="label text-sm font-semibold text-slate-700">Email Address</label>
                                    <input type="email" placeholder="Enter Your Email" className="input input-bordered bg-slate-50 border-none focus:ring-2 focus:ring-primary transition-all rounded-xl" />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label text-sm font-semibold text-slate-700">Subject</label>
                                <input type="text" placeholder="How can we help?" className="input input-bordered bg-slate-50 border-none focus:ring-2 focus:ring-primary transition-all rounded-xl" />
                            </div>
                            <div className="form-control">
                                <label className="label text-sm font-semibold text-slate-700">Message</label>
                                <textarea className="textarea textarea-bordered bg-slate-50 border-none focus:ring-2 focus:ring-primary transition-all rounded-xl h-32" placeholder="Write your message here..."></textarea>
                            </div>
                            <button className="btn btn-primary w-full rounded-xl text-white font-bold shadow-lg shadow-orange-200 mt-4">
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