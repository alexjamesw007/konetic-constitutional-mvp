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

export interface QuestionnaireResponse {
  id: string;
  phase: number;
  question: string;
  answer: string;
  timestamp: Date;
}

export interface Phase1Data {
  businessContext: string;
  primaryChallenges: string;
  currentSolutions: string;
  keyStakeholders: string;
  successMetrics: string;
  timeline: string;
}

export interface PainPoint {
  stage: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  cost: string;
}

export interface Phase2Data {
  painPoints: PainPoint[];
  priorityMatrix: Record<string, number>;
  businessImpact: string;
  resourceConstraints: string;
}

export interface Phase3Data {
  budgetRange: string;
  investmentTimeframe: string;
  decisionMakers: string;
  previousInvestments: string;
  expectedROI: string;
  evidenceRequirements: string;
}

export interface ClientAssessment {
  clientId: string;
  phase1: Phase1Data | null;
  phase2: Phase2Data | null;
  phase3: Phase3Data | null;
  currentPhase: number;
  serviceTier: keyof typeof import('../constants').SERVICE_TIERS | null;
  roiAssessment: ROIAssessment | null;
  completedAt: Date | null;
}

export interface ROIAssessment {
  projectedValue: number;
  investmentRequired: number;
  timeToValue: number;
  confidenceLevel: number;
  evidenceSources: EvidenceItem[];
  assumptions: string[];
  recommendations: string[];
}