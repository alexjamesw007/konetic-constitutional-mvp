import React, { useState } from 'react';
import { Phase3Data } from '../../types';
import { SERVICE_TIERS } from '../../constants';

interface Phase3QuestionnaireProps {
  onComplete: (data: Phase3Data) => void;
  onBack: () => void;
  initialData?: Phase3Data;
}

export const Phase3Questionnaire: React.FC<Phase3QuestionnaireProps> = ({ 
  onComplete, 
  onBack, 
  initialData 
}) => {
  const [formData, setFormData] = useState<Phase3Data>({
    budgetRange: initialData?.budgetRange || '',
    investmentTimeframe: initialData?.investmentTimeframe || '',
    decisionMakers: initialData?.decisionMakers || '',
    previousInvestments: initialData?.previousInvestments || '',
    expectedROI: initialData?.expectedROI || '',
    evidenceRequirements: initialData?.evidenceRequirements || ''
  });

  const [errors, setErrors] = useState<Partial<Phase3Data>>({});
  const [recommendedTier, setRecommendedTier] = useState<keyof typeof SERVICE_TIERS | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Partial<Phase3Data> = {};
    
    if (!formData.budgetRange.trim()) newErrors.budgetRange = 'Budget range is required';
    if (!formData.investmentTimeframe.trim()) newErrors.investmentTimeframe = 'Investment timeframe is required';
    if (!formData.decisionMakers.trim()) newErrors.decisionMakers = 'Decision makers information is required';
    if (!formData.evidenceRequirements.trim()) newErrors.evidenceRequirements = 'Evidence requirements are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateRecommendedTier = (budget: string): keyof typeof SERVICE_TIERS | null => {
    const budgetValue = parseInt(budget.replace(/[^0-9]/g, ''));
    
    if (budgetValue >= 35000) return 'implementation';
    if (budgetValue >= 15000) return 'discovery';
    if (budgetValue >= 2490) return 'advisory';
    
    return null;
  };

  const handleBudgetChange = (value: string) => {
    setFormData(prev => ({ ...prev, budgetRange: value }));
    const tier = calculateRecommendedTier(value);
    setRecommendedTier(tier);
    
    if (errors.budgetRange) {
      setErrors(prev => ({ ...prev, budgetRange: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onComplete(formData);
    }
  };

  const updateField = (field: keyof Phase3Data, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const progress = Object.values(formData).filter(value => value.trim()).length / 6 * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Phase 3: Investment Capacity Qualification</h1>
              <p className="text-sm text-gray-600 mt-1">Evidence-first methodology for budget validation</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Progress</div>
              <div className="text-lg font-bold text-green-600">{Math.round(progress)}%</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Constitutional Compliance Notice */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-sm text-red-800">
              <strong>Constitutional Requirement:</strong> Investment recommendations will only be made based on 
              validated evidence from your responses. No projections without documented business case.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Budget Range */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              1. Investment Budget Range
              <span className="text-red-500 ml-1">*</span>
            </label>
            <p className="text-sm text-gray-600 mb-4">
              What is your available budget range for business optimization initiatives? 
              This helps us recommend the appropriate service tier.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {[
                { value: '$2,490', label: '$2,490 (Advisory Tier)' },
                { value: '$15,000-25,000', label: '$15K-25K (Discovery Tier)' },
                { value: '$35,000-75,000', label: '$35K-75K (Implementation Tier)' },
                { value: '$75,000+', label: '$75K+ (Custom Engagement)' },
                { value: 'other', label: 'Other Amount' }
              ].map((option) => (
                <label key={option.value} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    value={option.value}
                    checked={formData.budgetRange === option.value}
                    onChange={(e) => handleBudgetChange(e.target.value)}
                    className="mr-3"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>

            {formData.budgetRange === 'other' && (
              <input
                type="text"
                placeholder="Enter your budget range"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mt-4"
                onChange={(e) => handleBudgetChange(e.target.value)}
              />
            )}

            {errors.budgetRange && (
              <p className="text-red-600 text-sm mt-1">{errors.budgetRange}</p>
            )}

            {/* Tier Recommendation */}
            {recommendedTier && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-blue-800">
                    <strong>Recommended Service Tier:</strong> {SERVICE_TIERS[recommendedTier].name} - {SERVICE_TIERS[recommendedTier].description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Investment Timeframe */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              2. Investment Timeframe & Implementation Timeline
              <span className="text-red-500 ml-1">*</span>
            </label>
            <p className="text-sm text-gray-600 mb-4">
              When do you need to see results? What are your implementation timeline expectations?
            </p>
            <textarea
              value={formData.investmentTimeframe}
              onChange={(e) => updateField('investmentTimeframe', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.investmentTimeframe ? 'border-red-300' : 'border-gray-300'
              }`}
              rows={4}
              placeholder="e.g., Need results within 6 months, implementation can start immediately..."
            />
            {errors.investmentTimeframe && (
              <p className="text-red-600 text-sm mt-1">{errors.investmentTimeframe}</p>
            )}
          </div>

          {/* Decision Makers */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              3. Decision Making Process & Stakeholders
              <span className="text-red-500 ml-1">*</span>
            </label>
            <p className="text-sm text-gray-600 mb-4">
              Who needs to approve this investment? What is the decision-making process and timeline?
            </p>
            <textarea
              value={formData.decisionMakers}
              onChange={(e) => updateField('decisionMakers', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.decisionMakers ? 'border-red-300' : 'border-gray-300'
              }`}
              rows={4}
              placeholder="e.g., CEO approval required, CFO needs ROI justification, Board meeting next month..."
            />
            {errors.decisionMakers && (
              <p className="text-red-600 text-sm mt-1">{errors.decisionMakers}</p>
            )}
          </div>

          {/* Previous Investments */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              4. Previous Business Optimization Investments
            </label>
            <p className="text-sm text-gray-600 mb-4">
              What have you invested in previously for business optimization? 
              What worked, what didn't, and what were the outcomes?
            </p>
            <textarea
              value={formData.previousInvestments}
              onChange={(e) => updateField('previousInvestments', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={5}
              placeholder="e.g., Invested $30K in process consulting last year, achieved 15% efficiency gain..."
            />
          </div>

          {/* Expected ROI */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              5. Expected Return on Investment (ROI)
            </label>
            <p className="text-sm text-gray-600 mb-4">
              What ROI expectations do you have? What would justify the investment from your perspective?
            </p>
            <textarea
              value={formData.expectedROI}
              onChange={(e) => updateField('expectedROI', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={4}
              placeholder="e.g., Expect 3:1 ROI within 12 months, cost savings of $10K monthly would justify investment..."
            />
          </div>

          {/* Evidence Requirements */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              6. Evidence & Documentation Requirements
              <span className="text-red-500 ml-1">*</span>
            </label>
            <p className="text-sm text-gray-600 mb-4">
              What evidence do you need to justify this investment to stakeholders? 
              What documentation or proof points are required for approval?
            </p>
            <textarea
              value={formData.evidenceRequirements}
              onChange={(e) => updateField('evidenceRequirements', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.evidenceRequirements ? 'border-red-300' : 'border-gray-300'
              }`}
              rows={5}
              placeholder="e.g., Need detailed ROI analysis, case studies, implementation timeline, risk assessment..."
            />
            {errors.evidenceRequirements && (
              <p className="text-red-600 text-sm mt-1">{errors.evidenceRequirements}</p>
            )}
          </div>

          {/* Constitutional Compliance Summary */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 mb-3">Constitutional Compliance Checkpoint</h3>
            <div className="space-y-2 text-sm text-green-800">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Service tier will be determined by validated budget evidence
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ROI projections will only use data from your responses
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                All recommendations will maintain professional business standards
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Quality assurance monitoring will track compliance throughout
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-6">
            <button
              type="button"
              onClick={onBack}
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
            >
              ← Back to Phase 2
            </button>
            
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Generate: ROI Assessment</div>
              <button
                type="submit"
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all shadow-lg"
              >
                Generate Assessment →
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};