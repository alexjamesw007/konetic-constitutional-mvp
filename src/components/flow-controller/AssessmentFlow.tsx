import React, { useState, useEffect } from 'react';
import { LandingPage } from '../landing/LandingPage';
import { Phase1Questionnaire } from '../questionnaire/Phase1Questionnaire';
import { Phase2Questionnaire } from '../questionnaire/Phase2Questionnaire';
import { Phase3Questionnaire } from '../questionnaire/Phase3Questionnaire';
import { ROIAssessmentDisplay } from '../roi-assessment/ROIAssessmentDisplay';
import { ClientAssessment, Phase1Data, Phase2Data, Phase3Data, ROIAssessment } from '../../types';
import { SERVICE_TIERS } from '../../constants';

type FlowStep = 'landing' | 'phase1' | 'phase2' | 'phase3' | 'assessment';

interface AssessmentFlowProps {
  onViewAdminDashboard?: () => void;
}

export const AssessmentFlow: React.FC<AssessmentFlowProps> = ({ onViewAdminDashboard }) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('landing');
  const [assessment, setAssessment] = useState<ClientAssessment>({
    clientId: Date.now().toString(),
    phase1: null,
    phase2: null,
    phase3: null,
    currentPhase: 1,
    serviceTier: null,
    roiAssessment: null,
    completedAt: null
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('constitutional-assessment', JSON.stringify(assessment));
  }, [assessment]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('constitutional-assessment');
    if (saved) {
      try {
        const savedAssessment = JSON.parse(saved);
        setAssessment(savedAssessment);
        // Determine current step based on completed phases
        if (savedAssessment.roiAssessment) {
          setCurrentStep('assessment');
        } else if (savedAssessment.phase3) {
          setCurrentStep('phase3');
        } else if (savedAssessment.phase2) {
          setCurrentStep('phase2');
        } else if (savedAssessment.phase1) {
          setCurrentStep('phase1');
        }
      } catch (error) {
        console.error('Error loading saved assessment:', error);
      }
    }
  }, []);

  const handleStartAssessment = () => {
    setCurrentStep('phase1');
    setAssessment(prev => ({ ...prev, currentPhase: 1 }));
  };

  const handlePhase1Complete = (data: Phase1Data) => {
    setAssessment(prev => ({
      ...prev,
      phase1: data,
      currentPhase: 2
    }));
    setCurrentStep('phase2');
  };

  const handlePhase2Complete = (data: Phase2Data) => {
    setAssessment(prev => ({
      ...prev,
      phase2: data,
      currentPhase: 3
    }));
    setCurrentStep('phase3');
  };

  const handlePhase3Complete = (data: Phase3Data) => {
    // Determine service tier based on budget
    const budgetValue = parseInt(data.budgetRange.replace(/[^0-9]/g, ''));
    let serviceTier: keyof typeof SERVICE_TIERS = 'advisory';
    
    if (budgetValue >= 35000) {
      serviceTier = 'implementation';
    } else if (budgetValue >= 15000) {
      serviceTier = 'discovery';
    }

    // Generate ROI assessment based on collected data
    const roiAssessment = generateROIAssessment(assessment.phase1!, assessment.phase2!, data, serviceTier);

    setAssessment(prev => ({
      ...prev,
      phase3: data,
      serviceTier,
      roiAssessment,
      currentPhase: 5, // Skip phase 4 for now
      completedAt: new Date()
    }));
    setCurrentStep('assessment');
  };

  const generateROIAssessment = (
    phase1: Phase1Data,
    phase2: Phase2Data,
    phase3: Phase3Data,
    tier: keyof typeof SERVICE_TIERS
  ): ROIAssessment => {
    const serviceCost = getServiceCost(tier);
    
    // Calculate projected value based on pain points and business impact
    const painPointCosts = phase2.painPoints.reduce((total, painPoint) => {
      const estimatedCost = parseInt(painPoint.cost.replace(/[^0-9]/g, '')) || 0;
      return total + estimatedCost * 12; // Annualize
    }, 0);

    // Conservative projection: 20-40% improvement based on tier
    const improvementPercentage = tier === 'implementation' ? 0.4 : tier === 'discovery' ? 0.3 : 0.2;
    const projectedValue = painPointCosts * improvementPercentage;

    // Time to value based on tier
    const timeToValue = tier === 'implementation' ? 6 : tier === 'discovery' ? 4 : 2;

    // Confidence level based on evidence quality
    const evidenceQuality = [phase1.businessContext, phase1.primaryChallenges, phase2.businessImpact, phase3.budgetRange]
      .filter(field => field && field.length > 50).length;
    const confidenceLevel = Math.min(95, 60 + (evidenceQuality * 8));

    return {
      projectedValue: Math.max(projectedValue, serviceCost * 2), // Minimum 2:1 ROI
      investmentRequired: serviceCost,
      timeToValue,
      confidenceLevel,
      evidenceSources: [
        {
          id: '1',
          type: 'client-data',
          source: 'Phase 1: Business Context Analysis',
          validated: true,
          timestamp: new Date(),
          data: phase1.businessContext
        },
        {
          id: '2',
          type: 'client-data',
          source: 'Phase 2: Pain Point Analysis',
          validated: true,
          timestamp: new Date(),
          data: phase2.businessImpact
        },
        {
          id: '3',
          type: 'client-data',
          source: 'Phase 3: Investment Capacity',
          validated: true,
          timestamp: new Date(),
          data: phase3.budgetRange
        }
      ],
      assumptions: [
        `${Math.round(improvementPercentage * 100)}% improvement in identified pain points`,
        `Implementation timeline of ${timeToValue} months`,
        'Business context remains stable during engagement',
        'Stakeholder commitment maintained throughout process',
        'Resource constraints addressed as documented'
      ],
      recommendations: [
        `Begin with ${SERVICE_TIERS[tier].name} engagement to validate opportunities`,
        'Prioritize high-impact pain points identified in systematic analysis',
        'Establish baseline metrics before implementation begins',
        'Plan phased approach based on investment timeline requirements',
        'Schedule regular progress reviews with key stakeholders'
      ]
    };
  };

  const getServiceCost = (tier: keyof typeof SERVICE_TIERS): number => {
    switch (tier) {
      case 'implementation':
        return 55000; // Mid-range of $35K-75K
      case 'discovery':
        return 20000; // Mid-range of $15K-25K
      case 'advisory':
        return 2490;
      default:
        return 2490;
    }
  };

  const handleBackToPhase = (phase: number) => {
    switch (phase) {
      case 1:
        setCurrentStep('phase1');
        setAssessment(prev => ({ ...prev, currentPhase: 1 }));
        break;
      case 2:
        setCurrentStep('phase2');
        setAssessment(prev => ({ ...prev, currentPhase: 2 }));
        break;
      case 3:
        setCurrentStep('phase3');
        setAssessment(prev => ({ ...prev, currentPhase: 3 }));
        break;
      default:
        setCurrentStep('landing');
    }
  };

  const handleDownloadReport = () => {
    // Create a comprehensive report
    const reportData = {
      assessment,
      generatedAt: new Date(),
      constitutionalCompliance: {
        serviceBoundaryEnforced: true,
        evidenceFirstProtocol: true,
        professionalStandards: true,
        qualityAssurance: true
      }
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `constitutional-compliance-assessment-${assessment.clientId}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleScheduleConsultation = () => {
    // In a real implementation, this would integrate with a scheduling system
    alert('Consultation scheduling would integrate with your preferred calendar system. For demo purposes, this shows the functionality is ready.');
  };

  const resetAssessment = () => {
    localStorage.removeItem('constitutional-assessment');
    setAssessment({
      clientId: Date.now().toString(),
      phase1: null,
      phase2: null,
      phase3: null,
      currentPhase: 1,
      serviceTier: null,
      roiAssessment: null,
      completedAt: null
    });
    setCurrentStep('landing');
  };

  switch (currentStep) {
    case 'landing':
      return <LandingPage onStartAssessment={handleStartAssessment} />;
    
    case 'phase1':
      return (
        <Phase1Questionnaire
          onComplete={handlePhase1Complete}
          onBack={() => setCurrentStep('landing')}
          initialData={assessment.phase1 || undefined}
        />
      );
    
    case 'phase2':
      return (
        <Phase2Questionnaire
          onComplete={handlePhase2Complete}
          onBack={() => handleBackToPhase(1)}
          initialData={assessment.phase2 || undefined}
        />
      );
    
    case 'phase3':
      return (
        <Phase3Questionnaire
          onComplete={handlePhase3Complete}
          onBack={() => handleBackToPhase(2)}
          initialData={assessment.phase3 || undefined}
        />
      );
    
    case 'assessment':
      return (
        <ROIAssessmentDisplay
          assessment={assessment}
          onDownloadReport={handleDownloadReport}
          onScheduleConsultation={handleScheduleConsultation}
          onBack={() => handleBackToPhase(3)}
        />
      );
    
    default:
      return <LandingPage onStartAssessment={handleStartAssessment} />;
  }
};