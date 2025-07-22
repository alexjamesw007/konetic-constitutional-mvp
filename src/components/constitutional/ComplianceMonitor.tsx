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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Constitutional Compliance Monitor</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {Object.entries(CONSTITUTIONAL_REQUIREMENTS).map(([key, requirement]) => (
          <div key={key} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-700">{requirement.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status[key as keyof ComplianceStatus])}`}>
                {status[key as keyof ComplianceStatus] ? 'Compliant' : 'Non-Compliant'}
              </span>
            </div>
            <p className="text-sm text-gray-600">{requirement.description}</p>
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