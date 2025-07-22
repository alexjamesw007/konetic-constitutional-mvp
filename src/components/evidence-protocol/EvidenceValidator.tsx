import React, { useState } from 'react';
import { EvidenceItem } from '../../types';

interface EvidenceValidatorProps {
  evidence: EvidenceItem[];
  onAddEvidence: (evidence: EvidenceItem) => void;
}

export const EvidenceValidator: React.FC<EvidenceValidatorProps> = ({ evidence, onAddEvidence }) => {
  const [newEvidence, setNewEvidence] = useState<Partial<EvidenceItem>>({
    type: 'client-data',
    source: '',
    data: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvidence.source && newEvidence.data) {
      onAddEvidence({
        id: Date.now().toString(),
        type: newEvidence.type as EvidenceItem['type'],
        source: newEvidence.source,
        validated: false,
        timestamp: new Date(),
        data: newEvidence.data
      });
      setNewEvidence({ type: 'client-data', source: '', data: '' });
    }
  };

  const getTypeColor = (type: EvidenceItem['type']) => {
    const colors = {
      'client-data': 'bg-blue-100 text-blue-800',
      'market-analysis': 'bg-purple-100 text-purple-800',
      'historical-performance': 'bg-green-100 text-green-800',
      'benchmark': 'bg-yellow-100 text-yellow-800'
    };
    return colors[type];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Evidence-First Protocol</h2>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600 font-medium">REQUIRED</span>
        </div>
      </div>
      
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <p className="text-sm text-red-800 font-semibold mb-1">CONSTITUTIONAL REQUIREMENT</p>
            <p className="text-sm text-red-700">
              All ROI calculations, projections, and business recommendations MUST be backed by validated client data and evidence. No estimates without proof.
            </p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Evidence Type
            </label>
            <select
              value={newEvidence.type}
              onChange={(e) => setNewEvidence({ ...newEvidence, type: e.target.value as EvidenceItem['type'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="client-data">Client Data</option>
              <option value="market-analysis">Market Analysis</option>
              <option value="historical-performance">Historical Performance</option>
              <option value="benchmark">Benchmark</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Source
            </label>
            <input
              type="text"
              value={newEvidence.source}
              onChange={(e) => setNewEvidence({ ...newEvidence, source: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Client CRM, Market Report"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data/Description
            </label>
            <input
              type="text"
              value={newEvidence.data}
              onChange={(e) => setNewEvidence({ ...newEvidence, data: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Evidence details"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Evidence
        </button>
      </form>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-700">Evidence Repository</h3>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Items: {evidence.length}</span>
            <div className={`w-2 h-2 rounded-full ${evidence.length > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
        </div>
        {evidence.length === 0 ? (
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-600 font-medium">No Evidence Submitted</p>
            <p className="text-gray-500 text-sm mt-1">⚠️ Constitutional Violation: All ROI calculations require validated evidence</p>
          </div>
        ) : (
          <div className="space-y-3">
            {evidence.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                    {item.type.replace('-', ' ').toUpperCase()}
                  </span>
                  <span className={`text-xs ${item.validated ? 'text-green-600' : 'text-orange-600'}`}>
                    {item.validated ? 'Validated' : 'Pending Validation'}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700">Source: {item.source}</p>
                <p className="text-sm text-gray-600 mt-1">{item.data}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Added: {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};