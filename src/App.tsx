import React, { useState } from 'react';
import { ComplianceMonitor } from './components/constitutional/ComplianceMonitor';
import { ServiceTierDisplay } from './components/service-boundary/ServiceTierDisplay';
import { EvidenceValidator } from './components/evidence-protocol/EvidenceValidator';
import { PhaseTracker } from './components/business-intelligence/PhaseTracker';
import { QualityDashboard } from './components/quality-assurance/QualityDashboard';
import { ComplianceStatus, EvidenceItem, QualityMetric, ConstitutionalValidation, BusinessPhase } from './types';
import { SERVICE_TIERS } from './constants';

function App() {
  const [selectedTier, setSelectedTier] = useState<keyof typeof SERVICE_TIERS>('advisory');
  const [currentPhase, setCurrentPhase] = useState(1);
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  
  const [complianceStatus] = useState<ComplianceStatus>({
    serviceBoundary: true,
    evidenceProtocol: true,
    professionalStandards: true,
    qualityAssurance: false
  });

  const [phaseStatuses] = useState<Record<number, BusinessPhase['status']>>({
    1: 'active',
    2: 'pending',
    3: 'pending',
    4: 'pending',
    5: 'pending'
  });

  const [qualityMetrics] = useState<QualityMetric[]>([
    { metric: 'Service Boundary Compliance', score: 95, threshold: 90, status: 'pass' },
    { metric: 'Evidence Validation Rate', score: 88, threshold: 85, status: 'pass' },
    { metric: 'Professional Standards', score: 92, threshold: 90, status: 'pass' },
    { metric: 'Quality Assurance Coverage', score: 78, threshold: 80, status: 'warning' }
  ]);

  const [validations] = useState<ConstitutionalValidation[]>([
    {
      timestamp: new Date(),
      validator: 'System Auto-Check',
      complianceChecks: complianceStatus,
      violations: ['Quality Assurance monitoring not fully implemented'],
      recommendations: [
        'Implement automated compliance checking',
        'Add real-time violation alerts',
        'Create compliance audit trail'
      ]
    }
  ]);

  const handleAddEvidence = (newEvidence: EvidenceItem) => {
    setEvidence([...evidence, { ...newEvidence, validated: true }]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Konetic Constitutional MVP</h1>
              <p className="text-sm text-gray-600 mt-1">Evidence-Based Business Optimization Solutions</p>
              <div className="flex items-center mt-2">
                <div className="flex items-center mr-4">
                  <svg className="w-4 h-4 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.5-1.5a2.121 2.121 0 00-3-3L10.5 9.5l-1-1-3.5 3.5a2.121 2.121 0 003 3l.5-.5a2.121 2.121 0 003 3L15.5 15.5 19 12l-1-1zm-1.5 1.5L9 21.5a2.121 2.121 0 01-3-3l1-1-1-1a2.121 2.121 0 013-3L15.5 8.5l1 1 3.5-3.5a2.121 2.121 0 00-3-3l-.5.5a2.121 2.121 0 00-3-3L8.5 8.5 5 12l1 1z" />
                  </svg>
                  <span className="text-xs text-blue-600 font-medium">TIER-BASED PRICING</span>
                </div>
                <div className="flex items-center mr-4">
                  <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-xs text-green-600 font-medium">EVIDENCE-FIRST</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-purple-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-xs text-purple-600 font-medium">BUSINESS FOCUS</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-sm text-gray-500 block">Constitutional Compliance</span>
                <div className="flex items-center justify-end mt-1">
                  {Object.entries(complianceStatus).map(([key, value]) => (
                    <div
                      key={key}
                      className={`w-3 h-3 rounded-full mr-1 ${value ? 'bg-green-500' : 'bg-red-500'}`}
                      title={key.replace(/([A-Z])/g, ' $1').trim()}
                    />
                  ))}
                  <span className="text-xs text-gray-600 ml-2 font-medium">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Professional Business Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Professional Business Optimization Services</h2>
            <p className="text-blue-100 mb-4">
              Transparent pricing • Evidence-based recommendations • Constitutional compliance guaranteed
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                No Hidden Costs
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Data-Driven Results
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Business Focus Only
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <ServiceTierDisplay selectedTier={selectedTier} onTierSelect={setSelectedTier} />
            <EvidenceValidator evidence={evidence} onAddEvidence={handleAddEvidence} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <ComplianceMonitor status={complianceStatus} metrics={qualityMetrics} />
            <PhaseTracker 
              currentPhase={currentPhase} 
              phaseStatuses={phaseStatuses}
              onPhaseClick={setCurrentPhase}
            />
          </div>
        </div>

        {/* Full Width Bottom Section */}
        <div className="mt-8">
          <QualityDashboard validations={validations} />
        </div>
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>Constitutional Compliance System v1.0.0</p>
            <p className="mt-1">Ensuring professional standards and evidence-based business optimization</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;