import { HiOutlineLocationMarker } from "react-icons/hi";

const Coverage = () => {
  
    const mapLocation = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.3282333418856!2d90.354117!3d23.806925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1109961a293%3A0x6d11b3336449179!2sMirpur%202!5e0!3m2!1sen!2sbd!4v1714567890123!5m2!1sen!2sbd";

    return (
        <div className="my-24 p-10 md:p-16 bg-slate-50 rounded-[3.5rem] border border-slate-100 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl -z-10"></div>
            
            <div className="flex flex-col lg:flex-row items-center gap-12">
                
                {/* Left Side: Real Interactive Map */}
                <div className="flex-1 w-full h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white rotate-1 hover:rotate-0 transition-transform duration-500">
                    <iframe
                        title="Restaurant Location"
                        src={mapLocation}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="grayscale hover:grayscale-0 transition-all duration-700"
                    ></iframe>
                </div>

                {/* Right Side: Text Content */}
                <div className="flex-1 text-center md:text-left space-y-6">
                    <div>
                        <span className="text-[#ff6b08] font-bold uppercase tracking-widest text-xs">Our Presence</span>
                        <h2 className="text-4xl font-black text-slate-800 mt-2 leading-tight">
                            We are currently serving in <span className="text-[#ff6b08]">Mirpur!</span>
                        </h2>
                    </div>

                    <div className="bg-white p-6 rounded-[2rem] border border-orange-100 inline-block shadow-sm">
                        <div className="flex items-center gap-4 text-slate-700">
                            <div className="bg-orange-50 p-3 rounded-xl">
                                <HiOutlineLocationMarker className="text-2xl text-[#ff6b08]" />
                            </div>
                            <div className="text-left">
                                <p className="font-black text-lg">House 17, Road 5, Block H</p>
                                <p className="text-sm text-slate-400 font-medium">Mirpur 2, Dhaka 1216</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-slate-500 font-medium leading-relaxed max-w-md">
                        We are currently ensuring the fastest delivery in Mirpur 2 and surrounding areas. Very soon, we will expand our premium food services across the entire Dhaka city.
                    </p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                        {["Mirpur 1", "Mirpur 2", "Mirpur 10", "Pallabi", "DOHS"].map((area) => (
                            <span key={area} className="px-5 py-2 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase text-slate-400 hover:border-[#ff6b08] hover:text-[#ff6b08] transition-all cursor-default">
                                {area}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Coverage;