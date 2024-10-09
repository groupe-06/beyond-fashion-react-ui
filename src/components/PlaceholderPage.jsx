import React from 'react';

const PlaceholderPage = ({ pageName }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <h2 className="text-2xl font-bold text-gray-400">
        {pageName.charAt(0).toUpperCase() + pageName.slice(1)} Page en construction
      </h2>
    </div>
  );
};

export default PlaceholderPage;
