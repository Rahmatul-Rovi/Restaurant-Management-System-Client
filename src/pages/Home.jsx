import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Contact from "../components/Contact";
import FoodCard from "../components/FoodCard";
import PopularFoods from "../components/PopularFoods";
import Stats from "../components/Stats";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
    return (
        <div className="max-w-7xl mx-auto px-4">
            <Banner />
          <Categories/>
         
              {/* Popular Foods Grid */}
            <div className="text-center my-20">
                <PopularFoods/>
            </div>

         <WhyChooseUs/>

         <Stats/>
           

             <Contact/>
        </div>
    );
};

export default Home;