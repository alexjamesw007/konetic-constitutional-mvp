import React, { useState } from 'react';
import { Phase2Data, PainPoint } from '../../types';

interface Phase2QuestionnaireProps {
  onComplete: (data: Phase2Data) => void;
  onBack: () => void;
  initialData?: Phase2Data;
}

const PAIN_POINT_STAGES = [
  { id: 'discovery', name: 'Discovery & Assessment', description: 'Identifying and understanding problems' },
  { id: 'analysis', name: 'Analysis & Prioritization', description: 'Evaluating impact and urgency' },
  { id: 'planning', name: 'Solution Planning', description: 'Developing intervention strategies' },
  { id: 'implementation', name: 'Implementation & Execution', description: 'Deploying solutions effectively' },
  { id: 'monitoring', name: 'Monitoring & Optimization', description: 'Tracking results and improvements' }
];

export const Phase2Questionnaire: React.FC<Phase2QuestionnaireProps> = ({ 
  onComplete, 
  onBack, 
  initialData 
}) => {
  const [formData, setFormData] = useState<Phase2Data>({
    painPoints: initialData?.painPoints || [],
    priorityMatrix: initialData?.priorityMatrix || {},
    businessImpact: initialData?.businessImpact || '',
    resourceConstraints: initialData?.resourceConstraints || ''
  });

  const [currentStage, setCurrentStage] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  const addPainPoint = (stage: string, painPoint: Omit<PainPoint, 'stage'>) => {
    const newPainPoint: PainPoint = { ...painPoint, stage };
    setFormData(prev => ({
      ...prev,
      painPoints: [...prev.painPoints.filter(p => p.stage !== stage), newPainPoint]
    }));
  };

  const updatePriorityMatrix = (stage: string, priority: number) => {
    setFormData(prev => ({
      ...prev,
      priorityMatrix: { ...prev.priorityMatrix, [stage]: priority }
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    
    if (formData.painPoints.length === 0) {
      newErrors.push('At least one pain point is required');
    }
    
    if (!formData.businessImpact.trim()) {
      newErrors.push('Business impact assessment is required');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onComplete(formData);
    }
  };

  const progress = ((currentStage + 1) / PAIN_POINT_STAGES.length) * 60 + 
    (formData.businessImpact ? 20 : 0) + 
    (formData.resourceConstraints ? 20 : 0);

  const getCurrentStagePainPoint = () => {
    const stage = PAIN_POINT_STAGES[currentStage];
    return formData.painPoints.find(p => p.stage === stage.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Phase 2: Systematic Business Intelligence</h1>
              <p className="text-sm text-gray-600 mt-1">5-stage pain point analysis and prioritization</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Progress</div>
              <div className="text-lg font-bold text-purple-600">{Math.round(progress)}%</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Constitutional Compliance Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.5-1.5a2.121 2.121 0 00-3-3L10.5 9.5l-1-1-3.5 3.5a2.121 2.121 0 003 3l.5-.5a2.121 2.121 0 003 3L15.5 15.5 19 12l-1-1zm-1.5 1.5L9 21.5a2.121 2.121 0 01-3-3l1-1-1-1a2.121 2.121 0 013-3L15.5 8.5l1 1 3.5-3.5a2.121 2.121 0 00-3-3l-.5.5a2.121 2.121 0 00-3-3L8.5 8.5 5 12l1 1z" />
            </svg>
            <p className="text-sm text-blue-800">
              <strong>Evidence Collection:</strong> This systematic analysis will identify quantifiable pain points 
              for evidence-based solution prioritization and ROI calculation.
            </p>
          </div>
        </div>

        {/* Stage Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pain Point Analysis Stages</h2>
          <div className="flex flex-wrap gap-2">
            {PAIN_POINT_STAGES.map((stage, index) => (
              <button
                key={stage.id}
                onClick={() => setCurrentStage(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  index === currentStage
                    ? 'bg-purple-600 text-white'
                    : formData.painPoints.some(p => p.stage === stage.id)
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}. {stage.name}
                {formData.painPoints.some(p => p.stage === stage.id) && (
                  <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Current Stage Pain Point */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Stage {currentStage + 1}: {PAIN_POINT_STAGES[currentStage].name}
              </h3>
              <p className="text-sm text-gray-600">{PAIN_POINT_STAGES[currentStage].description}</p>
            </div>

            <PainPointForm
              stage={PAIN_POINT_STAGES[currentStage]}
              existingPainPoint={getCurrentStagePainPoint()}
              onSave={(painPoint) => addPainPoint(PAIN_POINT_STAGES[currentStage].id, painPoint)}
            />

            {/* Navigation between stages */}
            <div className="flex justify-between mt-6 pt-6 border-t">
              <button
                type="button"
                onClick={() => setCurrentStage(Math.max(0, currentStage - 1))}
                disabled={currentStage === 0}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors disabled:opacity-50"
              >
                ← Previous Stage
              </button>
              
              <button
                type="button"
                onClick={() => setCurrentStage(Math.min(PAIN_POINT_STAGES.length - 1, currentStage + 1))}
                disabled={currentStage === PAIN_POINT_STAGES.length - 1}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                Next Stage →
              </button>
            </div>
          </div>

          {/* Priority Matrix */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Matrix</h3>
            <p className="text-sm text-gray-600 mb-4">
              Rank each stage by priority (1 = highest priority, 5 = lowest priority)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PAIN_POINT_STAGES.map((stage) => (
                <div key={stage.id} className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{stage.name}</h4>
                  <select
                    value={formData.priorityMatrix[stage.id] || ''}
                    onChange={(e) => updatePriorityMatrix(stage.id, parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Priority</option>
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? '(Highest)' : num === 5 ? '(Lowest)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Business Impact Assessment */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Overall Business Impact Assessment
              <span className="text-red-500 ml-1">*</span>
            </label>
            <p className="text-sm text-gray-600 mb-4">
              Describe the cumulative impact of these pain points on your business. 
              Include quantifiable metrics where possible (costs, time, efficiency losses).
            </p>
            <textarea
              value={formData.businessImpact}
              onChange={(e) => setFormData(prev => ({ ...prev, businessImpact: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={5}
              placeholder="e.g., These pain points collectively cost approximately $50K monthly in inefficiencies..."
            />
          </div>

          {/* Resource Constraints */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Resource Constraints & Limitations
            </label>
            <p className="text-sm text-gray-600 mb-4">
              What constraints do you face in addressing these pain points? 
              (Budget, personnel, time, technology, organizational, etc.)
            </p>
            <textarea
              value={formData.resourceConstraints}
              onChange={(e) => setFormData(prev => ({ ...prev, resourceConstraints: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
              placeholder="e.g., Limited IT budget, shortage of skilled personnel, regulatory compliance requirements..."
            />
          </div>

          {/* Error Display */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-red-800">Please address the following:</h3>
                  <ul className="mt-2 text-sm text-red-700">
                    {errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-6">
            <button
              type="button"
              onClick={onBack}
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
            >
              ← Back to Phase 1
            </button>
            
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Next: Investment Capacity</div>
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
              >
                Continue to Phase 3 →
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Pain Point Form Component
interface PainPointFormProps {
  stage: typeof PAIN_POINT_STAGES[0];
  existingPainPoint?: PainPoint;
  onSave: (painPoint: Omit<PainPoint, 'stage'>) => void;
}

const PainPointForm: React.FC<PainPointFormProps> = ({ stage, existingPainPoint, onSave }) => {
  const [painPoint, setPainPoint] = useState<Omit<PainPoint, 'stage'>>({
    description: existingPainPoint?.description || '',
    impact: existingPainPoint?.impact || 'medium',
    frequency: existingPainPoint?.frequency || 'weekly',
    cost: existingPainPoint?.cost || ''
  });

  const handleSave = () => {
    if (painPoint.description.trim()) {
      onSave(painPoint);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pain Point Description
        </label>
        <textarea
          value={painPoint.description}
          onChange={(e) => setPainPoint(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows={3}
          placeholder={`Describe pain points in the ${stage.name.toLowerCase()} stage...`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Impact Level</label>
          <select
            value={painPoint.impact}
            onChange={(e) => setPainPoint(prev => ({ ...prev, impact: e.target.value as PainPoint['impact'] }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="low">Low Impact</option>
            <option value="medium">Medium Impact</option>
            <option value="high">High Impact</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
          <select
            value={painPoint.frequency}
            onChange={(e) => setPainPoint(prev => ({ ...prev, frequency: e.target.value as PainPoint['frequency'] }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Cost</label>
          <input
            type="text"
            value={painPoint.cost}
            onChange={(e) => setPainPoint(prev => ({ ...prev, cost: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="$5K/month"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleSave}
        className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
      >
        Save Pain Point
      </button>
    </div>
  );
};