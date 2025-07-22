import React, { useState } from 'react';
import { Phase1Data } from '../../types';

interface Phase1QuestionnaireProps {
  onComplete: (data: Phase1Data) => void;
  onBack: () => void;
  initialData?: Phase1Data;
}

export const Phase1Questionnaire: React.FC<Phase1QuestionnaireProps> = ({ 
  onComplete, 
  onBack, 
  initialData 
}) => {
  const [formData, setFormData] = useState<Phase1Data>({
    businessContext: initialData?.businessContext || '',
    primaryChallenges: initialData?.primaryChallenges || '',
    currentSolutions: initialData?.currentSolutions || '',
    keyStakeholders: initialData?.keyStakeholders || '',
    successMetrics: initialData?.successMetrics || '',
    timeline: initialData?.timeline || ''
  });

  const [errors, setErrors] = useState<Partial<Phase1Data>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Phase1Data> = {};
    
    if (!formData.businessContext.trim()) newErrors.businessContext = 'Business context is required';
    if (!formData.primaryChallenges.trim()) newErrors.primaryChallenges = 'Primary challenges are required';
    if (!formData.keyStakeholders.trim()) newErrors.keyStakeholders = 'Key stakeholders are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onComplete(formData);
    }
  };

  const updateField = (field: keyof Phase1Data, value: string) => {
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
              <h1 className="text-2xl font-bold text-gray-900">Phase 1: Open-ended Business Exploration</h1>
              <p className="text-sm text-gray-600 mt-1">Professional challenge assessment and opportunity identification</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Progress</div>
              <div className="text-lg font-bold text-blue-600">{Math.round(progress)}%</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Constitutional Compliance Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-yellow-800">
              <strong>Constitutional Protocol:</strong> All responses will be used for evidence-based business analysis. 
              No recommendations will be made without sufficient data validation.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Business Context */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              1. Business Context & Overview
              <span className="text-red-500 ml-1">*</span>
            </label>
            <p className="text-sm text-gray-600 mb-4">
              Describe your business, industry, and current market position. Include company size, 
              primary revenue streams, and competitive landscape.
            </p>
            <textarea
              value={formData.businessContext}
              onChange={(e) => updateField('businessContext', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.businessContext ? 'border-red-300' : 'border-gray-300'
              }`}
              rows={5}
              placeholder="e.g., We are a mid-sized manufacturing company specializing in automotive components..."
            />
            {errors.businessContext && (
              <p className="text-red-600 text-sm mt-1">{errors.businessContext}</p>
            )}
          </div>

          {/* Primary Challenges */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              2. Primary Business Challenges
              <span className="text-red-500 ml-1">*</span>
            </label>
            <p className="text-sm text-gray-600 mb-4">
              What are the main obstacles preventing your business from achieving its goals? 
              Focus on operational, strategic, or market-related challenges.
            </p>
            <textarea
              value={formData.primaryChallenges}
              onChange={(e) => updateField('primaryChallenges', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.primaryChallenges ? 'border-red-300' : 'border-gray-300'
              }`}
              rows={5}
              placeholder="e.g., Declining profit margins, supply chain inefficiencies, talent retention issues..."
            />
            {errors.primaryChallenges && (
              <p className="text-red-600 text-sm mt-1">{errors.primaryChallenges}</p>
            )}
          </div>

          {/* Current Solutions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              3. Current Solutions & Initiatives
            </label>
            <p className="text-sm text-gray-600 mb-4">
              What solutions have you already implemented or are currently trying? 
              Include both successful and unsuccessful attempts.
            </p>
            <textarea
              value={formData.currentSolutions}
              onChange={(e) => updateField('currentSolutions', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="e.g., Implemented lean manufacturing, hired process improvement consultant..."
            />
          </div>

          {/* Key Stakeholders */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              4. Key Stakeholders & Decision Makers
              <span className="text-red-500 ml-1">*</span>
            </label>
            <p className="text-sm text-gray-600 mb-4">
              Who are the key people involved in decision-making for business optimization initiatives? 
              Include roles and their primary concerns.
            </p>
            <textarea
              value={formData.keyStakeholders}
              onChange={(e) => updateField('keyStakeholders', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.keyStakeholders ? 'border-red-300' : 'border-gray-300'
              }`}
              rows={4}
              placeholder="e.g., CEO (cost reduction), COO (operational efficiency), CFO (ROI validation)..."
            />
            {errors.keyStakeholders && (
              <p className="text-red-600 text-sm mt-1">{errors.keyStakeholders}</p>
            )}
          </div>

          {/* Success Metrics */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              5. Success Metrics & KPIs
            </label>
            <p className="text-sm text-gray-600 mb-4">
              How do you currently measure success? What metrics would indicate that 
              a business optimization initiative has been effective?
            </p>
            <textarea
              value={formData.successMetrics}
              onChange={(e) => updateField('successMetrics', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="e.g., Profit margin improvement, operational efficiency gains, customer satisfaction..."
            />
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              6. Timeline & Urgency
            </label>
            <p className="text-sm text-gray-600 mb-4">
              What is your timeline for addressing these challenges? Are there any 
              urgent deadlines or external pressures driving the need for change?
            </p>
            <textarea
              value={formData.timeline}
              onChange={(e) => updateField('timeline', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="e.g., Need improvements within 6 months due to market pressures..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-6">
            <button
              type="button"
              onClick={onBack}
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
            >
              ← Back to Start
            </button>
            
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Next: Pain Point Analysis</div>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
              >
                Continue to Phase 2 →
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};