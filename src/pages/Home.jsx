import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Contact from "../components/Contact";
import Newsletter from "../components/Newsletter";
import PopularFoods from "../components/PopularFoods";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
    
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,          
            offset: 80,
            easing: 'ease-out-cubic',
            delay: 0,
        });

        // Route change or re-render AOS refresh
        AOS.refresh();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 overflow-x-hidden no-scrollbar">
            <style>
                {`
                    .no-scrollbar::-webkit-scrollbar { display: none; }
                    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `}
            </style>

            {/* Banner — A big duration */}
            <div data-aos="fade-down" data-aos-duration="1000" data-aos-easing="ease-out-back">
                <Banner />
            </div>

            {/* Categories — A Small delay */}
            <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
                <Categories />
            </div>

            {/* PopularFoods — zoom in With some delay  */}
            <div className="text-center my-20"
                data-aos="zoom-in-up"
                data-aos-duration="900"
                data-aos-delay="150"
                data-aos-easing="ease-out-quad">
                <PopularFoods />
            </div>

            {/* WhyChooseUs — Left to Right, flip effect */}
            <div data-aos="fade-right"
                data-aos-duration="900"
                data-aos-delay="100"
                data-aos-easing="ease-out-sine">
                <WhyChooseUs />
            </div>

            {/* Stats — Right to Left */}
            <div data-aos="fade-left"
                data-aos-duration="900"
                data-aos-delay="100"
                data-aos-easing="ease-out-sine">
                <Stats />
            </div>

            {/* Testimonials — flip */}
            <div data-aos="flip-up"
                data-aos-duration="1000"
                data-aos-delay="100"
                data-aos-easing="ease-out-back">
                <Testimonials />
            </div>

            {/* Newsletter — zoom  */}
            <div data-aos="zoom-in"
                data-aos-duration="800"
                data-aos-delay="50"
                data-aos-easing="ease-out-cubic">
                <Newsletter />
            </div>

            {/* Contact — fade up */}
            <div data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="100">
                <Contact />
            </div>
        </div>
    );
};

export default Home;