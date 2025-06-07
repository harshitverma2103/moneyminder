"use client";
import React from "react";

const UpgradePage = () => {
  return (
    <div className="p-10 flex flex-col items-center min-h-screen bg-gray-50">
      <h2 className="font-bold text-3xl mb-6">Upgrade</h2>
      <div className="bg-white rounded-md shadow p-8 max-w-xl w-full text-center">
        <p className="text-lg mb-4">Unlock premium features and take your money management to the next level!</p>
        <div className="mb-4">
          <span className="inline-block bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">Coming Soon</span>
        </div>
        <p className="text-gray-500">Stay tuned for subscription options and exclusive features.</p>
      </div>
    </div>
  );
};

export default UpgradePage; 