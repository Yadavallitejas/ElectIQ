import React from 'react';
import StepCard from './StepCard';
import { electionSteps } from '../data/electionData';

const ElectionTimeline = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">How to Vote: Step by Step</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {electionSteps.map((step) => (
          <StepCard key={step.id} step={step} />
        ))}
      </div>
    </div>
  );
};

export default ElectionTimeline;
