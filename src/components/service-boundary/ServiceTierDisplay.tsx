import React from 'react';
import { SERVICE_TIERS } from '../../constants';

interface ServiceTierDisplayProps {
  selectedTier?: keyof typeof SERVICE_TIERS;
  onTierSelect?: (tier: keyof typeof SERVICE_TIERS) => void;
}

export const ServiceTierDisplay: React.FC<ServiceTierDisplayProps> = ({ selectedTier, onTierSelect }) => {
  const tiers = Object.entries(SERVICE_TIERS) as [keyof typeof SERVICE_TIERS, typeof SERVICE_TIERS[keyof typeof SERVICE_TIERS]][];

  const getTierBadge = (key: string) => {
    const badges = {
      advisory: { color: 'bg-blue-100 text-blue-800', text: 'CONSTITUTIONAL TIER 1' },
      discovery: { color: 'bg-purple-100 text-purple-800', text: 'CONSTITUTIONAL TIER 2' },
      implementation: { color: 'bg-green-100 text-green-800', text: 'CONSTITUTIONAL TIER 3' }
    };
    return badges[key as keyof typeof badges];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Constitutional Service Boundaries</h2>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600 font-medium">ENFORCED</span>
        </div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-yellow-800">
            <strong>Constitutional Compliance:</strong> All services strictly adhere to defined tiers with transparent, evidence-based pricing. No custom pricing without validated business case.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map(([key, tier]) => (
          <div
            key={key}
            className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all ${
              selectedTier === key
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
            onClick={() => onTierSelect?.(key)}
          >
            <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold ${getTierBadge(key).color}`}>
              {getTierBadge(key).text}
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2 pr-20">{tier.name}</h3>
            <p className="text-3xl font-bold text-blue-600 mb-1">{tier.price}</p>
            {'range' in tier && tier.range && (
              <p className="text-sm text-gray-500 mb-1">{tier.range}</p>
            )}
            <div className="flex items-center mb-3">
              <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-green-600 font-medium">CONSTITUTIONALLY COMPLIANT</span>
            </div>
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