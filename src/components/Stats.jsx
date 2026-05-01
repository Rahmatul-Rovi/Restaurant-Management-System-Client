// components/Stats.jsx
const Stats = () => {
    return (
        <div className="bg-slate-900 rounded-[3rem] p-12 my-20 flex flex-wrap justify-around gap-8 text-white">
            <div className="text-center">
                <h2 className="text-5xl font-black text-orange-500">12K+</h2>
                <p className="text-slate-400 mt-2 font-medium uppercase tracking-widest text-xs">Happy Customers</p>
            </div>
            <div className="text-center border-x border-slate-800 px-12">
                <h2 className="text-5xl font-black text-orange-500">50+</h2>
                <p className="text-slate-400 mt-2 font-medium uppercase tracking-widest text-xs">Expert Chefs</p>
            </div>
            <div className="text-center">
                <h2 className="text-5xl font-black text-orange-500">100%</h2>
                <p className="text-slate-400 mt-2 font-medium uppercase tracking-widest text-xs">Fresh Ingredients</p>
            </div>
        </div>
    );
};

export default Stats;