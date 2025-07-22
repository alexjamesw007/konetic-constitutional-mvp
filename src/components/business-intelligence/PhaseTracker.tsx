import React from 'react';
import { BusinessPhase } from '../../types';
import { BUSINESS_PHASES } from '../../constants';

interface PhaseTrackerProps {
  currentPhase: number;
  phaseStatuses: Record<number, BusinessPhase['status']>;
  onPhaseClick?: (phase: number) => void;
}

export const PhaseTracker: React.FC<PhaseTrackerProps> = ({ currentPhase, phaseStatuses, onPhaseClick }) => {
  const getPhaseColor = (phase: number, status: BusinessPhase['status']) => {
    if (phase === currentPhase) return 'bg-blue-600 text-white';
    if (status === 'completed') return 'bg-green-600 text-white';
    if (status === 'active') return 'bg-yellow-500 text-white';
    return 'bg-gray-300 text-gray-600';
  };

  const getLineColor = (phase: number) => {
    const status = phaseStatuses[phase];
    if (status === 'completed') return 'bg-green-600';
    if (status === 'active') return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Business Intelligence Integration</h2>
      
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-10 left-0 right-0 h-1 bg-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-green-600 to-blue-600 transition-all duration-500"
            style={{ width: `${((currentPhase - 1) / (BUSINESS_PHASES.length - 1)) * 100}%` }}
          />
        </div>

        {/* Phase Nodes */}
        <div className="relative flex justify-between mb-8">
          {BUSINESS_PHASES.map((phase) => (
            <div
              key={phase.phase}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => onPhaseClick?.(phase.phase)}
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center font-bold text-lg transition-all ${getPhaseColor(phase.phase, phaseStatuses[phase.phase] || 'pending')}`}>
                {phaseStatuses[phase.phase] === 'completed' ? (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  phase.phase
                )}
              </div>
              <span className="text-xs font-medium text-gray-700 mt-2 text-center max-w-[100px]">
                {phase.name}
              </span>
            </div>
          ))}
        </div>

        {/* Current Phase Details */}
        <div className="border-t pt-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Phase {currentPhase}: {BUSINESS_PHASES[currentPhase - 1].name}
            </h3>
            <p className="text-gray-600">{BUSINESS_PHASES[currentPhase - 1].description}</p>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Completion Criteria:</h4>
            <ul className="space-y-2">
              {BUSINESS_PHASES[currentPhase - 1].completionCriteria.map((criteria, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{criteria}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};