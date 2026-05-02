import React from 'react';

const StepCard = ({ step }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center border-t-4 border-orange-500 hover:shadow-lg transition-shadow duration-300">
      <div className="text-4xl mb-4">{step.icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
      <p className="text-gray-600">{step.description}</p>
    </div>
  );
};

export default StepCard;
