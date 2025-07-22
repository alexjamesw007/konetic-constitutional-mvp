import React from 'react';
import { ConstitutionalValidation } from '../../types';

interface QualityDashboardProps {
  validations: ConstitutionalValidation[];
}

export const QualityDashboard: React.FC<QualityDashboardProps> = ({ validations }) => {
  const getComplianceScore = (validation: ConstitutionalValidation) => {
    const checks = Object.values(validation.complianceChecks);
    const compliant = checks.filter(check => check).length;
    return (compliant / checks.length) * 100;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const latestValidation = validations[0];
  const averageScore = validations.length > 0
    ? validations.reduce((sum, v) => sum + getComplianceScore(v), 0) / validations.length
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Quality Assurance Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Overall Compliance</p>
          <p className={`text-3xl font-bold ${getScoreColor(averageScore)}`}>
            {averageScore.toFixed(1)}%
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Total Validations</p>
          <p className="text-3xl font-bold text-gray-800">{validations.length}</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Active Violations</p>
          <p className="text-3xl font-bold text-red-600">
            {latestValidation?.violations.length || 0}
          </p>
        </div>
      </div>

      {latestValidation && (
        <div className="space-y-4">
          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-700 mb-3">Latest Validation Report</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Timestamp</p>
                  <p className="font-medium">{new Date(latestValidation.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Validator</p>
                  <p className="font-medium">{latestValidation.validator}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(latestValidation.complianceChecks).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${value ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {latestValidation.violations.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-700 mb-3 text-red-600">Active Violations</h3>
              <ul className="space-y-2">
                {latestValidation.violations.map((violation, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-700">{violation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {latestValidation.recommendations.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-700 mb-3">Recommendations</h3>
              <ul className="space-y-2">
                {latestValidation.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-700">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};