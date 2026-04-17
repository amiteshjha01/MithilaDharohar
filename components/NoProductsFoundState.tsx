import React from 'react';

const NoProductsFoundState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
      <p className="text-gray-500 max-w-sm">
        We couldn't find any products matching your criteria. Try adjusting your filters or browse our other collections.
      </p>
    </div>
  );
};

export default NoProductsFoundState;
