const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-400">Loading weather data...</span>
        </div>
    );
};

export default LoadingSpinner;
