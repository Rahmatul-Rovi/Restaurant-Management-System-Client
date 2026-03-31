const Categories = () => {
    const categories = [
        { name: 'Indian', img: 'https://cdn-icons-png.flaticon.com/512/706/706164.png' },
        { name: 'Italian', img: 'https://cdn-icons-png.flaticon.com/512/2713/2713931.png' },
        { name: 'Mexican', img: 'https://cdn-icons-png.flaticon.com/512/706/706195.png' },
        { name: 'Japanese', img: 'https://cdn-icons-png.flaticon.com/512/2252/2252439.png' },
        { name: 'Korean', img: 'https://cdn-icons-png.flaticon.com/512/2713/2713937.png' },
        { name: 'Bakery', img: 'https://cdn-icons-png.flaticon.com/512/3014/3014534.png' },
    ];

    return (
        <div className="my-16">
            <h2 className="text-3xl font-bold mb-8">Our Food Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {categories.map((item, index) => (
                    <div key={index} className="flex flex-col items-center p-4 bg-white shadow-sm rounded-2xl hover:shadow-md cursor-pointer transition-all border border-gray-100">
                        <img src={item.img} alt={item.name} className="w-16 h-16 mb-2" />
                        <span className="font-semibold">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;