

export default function Hero() {
    return (
        <section className=" container my-16">
            <h1 className="text-5xl font-bold text-center">
                Find your dream job
            </h1>
            <p className="text-center mt-2 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod dignissimos cupiditate obcaecati odio officia enim ea est repudiandae provident labore.
            </p>
            <form className="flex max-w-md mx-auto gap-3 mt-4">
                <input type="search" 
                className="border w-full px-3 py-2 rounded-md border-gray-500" 
                placeholder="Search for a job..." />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Search</button>
            </form>
            
        </section>
    );
}