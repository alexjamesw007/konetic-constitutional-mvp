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
              <p className="text-sm text-gray-600 mt-1">Professional Business Optimization Platform</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Compliance Status:</span>
              <div className="flex gap-2">
                {Object.entries(complianceStatus).map(([key, value]) => (
                  <div
                    key={key}
                    className={`w-3 h-3 rounded-full ${value ? 'bg-green-500' : 'bg-red-500'}`}
                    title={key}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

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