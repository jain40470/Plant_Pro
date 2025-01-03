import React from "react";
function Agriheritage() {

    return (
        <>
            <div className="bg-green-50 py-16">
                <div className="max-w-screen-lg mx-auto">
                    <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Agricultural Heritage</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
                            <h3 className="text-lg font-semibold text-green-800 mb-4">Ancient Farming Techniques</h3>
                            <p className="text-gray-700">Discover the ancient methods and tools used by early farmers to cultivate crops and raise livestock, laying the foundation for modern agricultural practices.</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
                            <h3 className="text-lg font-semibold text-green-800 mb-4">Traditional Crop Varieties</h3>
                            <p className="text-gray-700">Learn about traditional crop varieties and heirloom seeds that have been passed down through generations, preserving biodiversity and cultural heritage.</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
                            <h3 className="text-lg font-semibold text-green-800 mb-4">Rural Festivals and Celebrations</h3>
                            <p className="text-gray-700">Explore the vibrant festivals and celebrations that honor agricultural traditions, harvests, and seasonal cycles, bringing communities together in joyful gatherings.</p>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );

}

export default Agriheritage;