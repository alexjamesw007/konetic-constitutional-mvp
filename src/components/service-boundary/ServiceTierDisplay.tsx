import React from 'react';
import { SERVICE_TIERS } from '../../constants';

interface ServiceTierDisplayProps {
  selectedTier?: keyof typeof SERVICE_TIERS;
  onTierSelect?: (tier: keyof typeof SERVICE_TIERS) => void;
}

export const ServiceTierDisplay: React.FC<ServiceTierDisplayProps> = ({ selectedTier, onTierSelect }) => {
  const tiers = Object.entries(SERVICE_TIERS) as [keyof typeof SERVICE_TIERS, typeof SERVICE_TIERS[keyof typeof SERVICE_TIERS]][];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Service Boundaries</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map(([key, tier]) => (
          <div
            key={key}
            className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
              selectedTier === key
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onTierSelect?.(key)}
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">{tier.name}</h3>
            <p className="text-2xl font-bold text-blue-600 mb-1">{tier.price}</p>
            {tier.range && (
              <p className="text-sm text-gray-500 mb-3">{tier.range}</p>
            )}
            <p className="text-sm text-gray-600 mb-4">{tier.description}</p>
            
            <ul className="space-y-2">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};