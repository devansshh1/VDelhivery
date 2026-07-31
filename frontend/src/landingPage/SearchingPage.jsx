import React from "react";

const Searching = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-500 mx-auto mb-6"></div>

        <h1 className="text-4xl font-bold">
          Searching for Delivery Partner...
        </h1>

        <p className="text-gray-400 mt-4">
          Please wait while we find a nearby delivery partner.
        </p>
      </div>
    </div>
  );
};

export default Searching;
