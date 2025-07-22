export interface ServiceTier {
  name: string;
  price: string;
  range?: string;
  description: string;
  features: string[];
}

export interface ComplianceStatus {
  serviceBoundary: boolean;
  evidenceProtocol: boolean;
  professionalStandards: boolean;
  qualityAssurance: boolean;
}

export interface BusinessPhase {
  phase: number;
  name: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
  completionCriteria: string[];
}

export interface EvidenceItem {
  id: string;
  type: 'client-data' | 'market-analysis' | 'historical-performance' | 'benchmark';
  source: string;
  validated: boolean;
  timestamp: Date;
  data: any;
}

export interface QualityMetric {
  metric: string;
  score: number;
  threshold: number;
  status: 'pass' | 'warning' | 'fail';
}

export interface ConstitutionalValidation {
  timestamp: Date;
  validator: string;
  complianceChecks: ComplianceStatus;
  violations: string[];
  recommendations: string[];
}