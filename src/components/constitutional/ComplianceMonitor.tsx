import React from 'react';
import { ComplianceStatus, QualityMetric } from '../../types';
import { CONSTITUTIONAL_REQUIREMENTS } from '../../constants';

interface ComplianceMonitorProps {
  status: ComplianceStatus;
  metrics: QualityMetric[];
}

export const ComplianceMonitor: React.FC<ComplianceMonitorProps> = ({ status, metrics }) => {
  const getStatusColor = (isCompliant: boolean) => {
    return isCompliant ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getMetricColor = (metric: QualityMetric) => {
    switch (metric.status) {
      case 'pass': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'fail': return 'text-red-600';
    }
  };

  const overallCompliance = Object.values(status).filter(Boolean).length / Object.values(status).length * 100;
  const complianceColor = overallCompliance >= 75 ? 'text-green-600' : overallCompliance >= 50 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Constitutional Compliance Monitor</h2>
        <div className="text-right">
          <div className={`text-3xl font-bold ${complianceColor}`}>{overallCompliance.toFixed(0)}%</div>
          <div className="text-sm text-gray-500">Overall Compliance</div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.5-1.5a2.121 2.121 0 00-3-3L10.5 9.5l-1-1-3.5 3.5a2.121 2.121 0 003 3l.5-.5a2.121 2.121 0 003 3L15.5 15.5 19 12l-1-1zm-1.5 1.5L9 21.5a2.121 2.121 0 01-3-3l1-1-1-1a2.121 2.121 0 013-3L15.5 8.5l1 1 3.5-3.5a2.121 2.121 0 00-3-3l-.5.5a2.121 2.121 0 00-3-3L8.5 8.5 5 12l1 1z" />
          </svg>
          <p className="text-sm text-blue-800">
            <strong>Real-time Monitoring:</strong> Constitutional compliance is actively monitored and enforced across all business operations and client interactions.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {Object.entries(CONSTITUTIONAL_REQUIREMENTS).map(([key, requirement]) => (
          <div key={key} className={`border-2 rounded-lg p-4 transition-all ${
            status[key as keyof ComplianceStatus] 
              ? 'border-green-200 bg-green-50' 
              : 'border-red-200 bg-red-50'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800">{requirement.name}</h3>
              <div className="flex items-center">
                {status[key as keyof ComplianceStatus] ? (
                  <svg className="w-5 h-5 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-red-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(status[key as keyof ComplianceStatus])}`}>
                  {status[key as keyof ComplianceStatus] ? 'ACTIVE' : 'VIOLATION'}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-3">{requirement.description}</p>
            <div className="text-xs text-gray-600">
              <div className="font-medium mb-1">Validation Rules:</div>
              <ul className="list-disc list-inside space-y-1">
                {requirement.validationRules.slice(0, 2).map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold text-gray-700 mb-3">Quality Metrics</h3>
        <div className="space-y-2">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{metric.metric}</span>
              <div className="flex items-center gap-2">
                <span className={`font-medium ${getMetricColor(metric)}`}>
                  {metric.score}/{metric.threshold}
                </span>
                <span className={`text-xs ${getMetricColor(metric)}`}>
                  {metric.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};