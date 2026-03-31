import Banner from "../components/Banner";
import Categories from "../components/Categories";

const Home = () => {
    return (
        <div className="max-w-7xl mx-auto px-4">
            <Banner />
          <Categories/>
            
            {/* Pore amra eikhane Popular Dishes ar onno section gula add korbo */}
            <div className="text-center my-20">
                <h3 className="text-2xl font-bold">Popular Dishes section coming soon...</h3>
            </div>
        </div>
    );
};

export default Home;