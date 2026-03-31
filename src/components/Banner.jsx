const Banner = () => {
    return (
        <div className="hero min-h-[600px] bg-base-200 rounded-3xl overflow-hidden mt-6">
            <div className="hero-content flex-col lg:flex-row-reverse px-10">
                <img 
                    src="https://img.freepik.com/free-photo/delicious-pasta-plate_23-2150690695.jpg" 
                    className="max-w-sm md:max-w-md rounded-lg shadow-2xl transition-transform duration-500 hover:scale-105" 
                    alt="Delicious Pasta"
                />
                <div className="text-left">
                    <h1 className="text-6xl font-bold leading-tight">
                        Satisfy Your Cravings, <br />
                        <span className="text-primary">Anytime, Anywhere!</span>
                    </h1>
                    <p className="py-6 text-lg opacity-80 max-w-lg">
                        Experience the best culinary delights delivered straight to your table. 
                        Fresh ingredients, expert chefs, and a taste you'll never forget.
                    </p>
                    <div className="flex gap-4">
                        <div className="join">
                            <input className="input input-bordered join-item w-64" placeholder="Search your favorite food..."/>
                            <button className="btn btn-primary join-item rounded-r-full">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;