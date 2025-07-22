export const SERVICE_TIERS = {
  advisory: {
    name: 'AI Advisory',
    price: '$2,490',
    description: 'Strategic AI consultation and roadmap development',
    features: [
      'Business challenge assessment',
      'AI opportunity identification',
      'Strategic roadmap creation',
      'Implementation guidance'
    ]
  },
  discovery: {
    name: 'Discovery',
    price: '$15K-25K',
    range: '$15,000 - $25,000',
    description: 'Comprehensive business analysis and solution design',
    features: [
      'Deep-dive business analysis',
      'Technical feasibility study',
      'Solution architecture design',
      'ROI modeling with evidence'
    ]
  },
  implementation: {
    name: 'Implementation',
    price: '$35K-75K',
    range: '$35,000 - $75,000',
    description: 'Full solution development and deployment',
    features: [
      'Custom solution development',
      'Integration with existing systems',
      'Testing and quality assurance',
      'Deployment and optimization'
    ]
  }
};

export const BUSINESS_PHASES = [
  {
    phase: 1,
    name: 'Open-ended Business Exploration',
    description: 'Professional challenge assessment and opportunity identification',
    completionCriteria: [
      'Initial business context understood',
      'Key stakeholders identified',
      'Primary challenges documented',
      'Exploration questions answered'
    ]
  },
  {
    phase: 2,
    name: 'Systematic Business Intelligence',
    description: '5-stage pain point analysis and prioritization',
    completionCriteria: [
      'Pain points identified across 5 stages',
      'Impact assessment completed',
      'Priority matrix established',
      'Solution opportunities mapped'
    ]
  },
  {
    phase: 3,
    name: 'Investment Capacity Qualification',
    description: 'Evidence-first methodology for budget validation',
    completionCriteria: [
      'Budget parameters established',
      'Evidence gathered and validated',
      'Investment capacity confirmed',
      'Service tier alignment completed'
    ]
  },
  {
    phase: 4,
    name: 'Solution Design',
    description: 'Technical architecture and implementation planning',
    completionCriteria: [
      'Technical requirements documented',
      'Architecture design completed',
      'Implementation timeline created',
      'Resource allocation planned'
    ]
  },
  {
    phase: 5,
    name: 'Human Handoff Preparation',
    description: 'Constitutional compliance documentation and transition',
    completionCriteria: [
      'Compliance documentation complete',
      'Handoff materials prepared',
      'Stakeholder briefing conducted',
      'Transition plan executed'
    ]
  }
];

export const CONSTITUTIONAL_REQUIREMENTS = {
  serviceBoundary: {
    name: 'Service Boundary Enforcement',
    description: 'Ensures all services stay within defined tiers and pricing',
    validationRules: [
      'Service must align with one of three tiers',
      'Pricing must match tier guidelines',
      'No custom pricing without evidence',
      'Clear tier progression path'
    ]
  },
  evidenceProtocol: {
    name: 'Evidence-first Protocol',
    description: 'No ROI calculations without actual client data',
    validationRules: [
      'All claims must be evidence-based',
      'Client data required for projections',
      'Historical performance documented',
      'Benchmarks properly sourced'
    ]
  },
  professionalStandards: {
    name: 'Professional Business Standards',
    description: 'Business optimization focus only',
    validationRules: [
      'Business value clearly articulated',
      'Professional language maintained',
      'Focus on optimization outcomes',
      'Avoid technical jargon'
    ]
  },
  qualityAssurance: {
    name: 'Quality Assurance Monitoring',
    description: 'Constitutional compliance tracking',
    validationRules: [
      'Regular compliance audits',
      'Violation tracking and remediation',
      'Performance metrics monitoring',
      'Continuous improvement process'
    ]
  }
};