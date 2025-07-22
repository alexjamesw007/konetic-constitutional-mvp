import React from 'react';
import { ClientAssessment, ROIAssessment } from '../../types';
import { SERVICE_TIERS } from '../../constants';

interface ROIAssessmentDisplayProps {
  assessment: ClientAssessment;
  onDownloadReport: () => void;
  onScheduleConsultation: () => void;
  onBack: () => void;
}

export const ROIAssessmentDisplay: React.FC<ROIAssessmentDisplayProps> = ({
  assessment,
  onDownloadReport,
  onScheduleConsultation,
  onBack
}) => {
  const serviceTier = assessment.serviceTier ? SERVICE_TIERS[assessment.serviceTier] : null;
  const roi = assessment.roiAssessment;

  if (!roi || !serviceTier) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Assessment Incomplete</h2>
          <p className="text-gray-600">Complete all phases to generate your ROI assessment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ROI Assessment Report</h1>
              <p className="text-sm text-gray-600 mt-1">Evidence-based business optimization recommendations</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Confidence Level</div>
                <div className="text-2xl font-bold text-green-600">{roi.confidenceLevel}%</div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Constitutional Compliance Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 mb-8">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Constitutional Compliance Verified</h2>
            <p className="text-blue-100 mb-4">
              This assessment is based entirely on your validated business data and evidence-first methodology
            </p>
            <div className="flex justify-center items-center space-x-6 text-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Evidence-Based
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tier-Appropriate
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Professionally Validated
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - ROI Metrics */}
          <div className="lg:col-span-2 space-y-8">
            {/* ROI Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  ${roi.projectedValue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Projected Annual Value</div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  ${roi.investmentRequired.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Investment Required</div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {roi.timeToValue} months
                </div>
                <div className="text-sm text-gray-600">Time to Value</div>
              </div>
            </div>

            {/* ROI Breakdown */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">ROI Analysis</h2>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Return Ratio</span>
                  <span className="font-semibold text-green-600">
                    {(roi.projectedValue / roi.investmentRequired).toFixed(1)}:1
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                    style={{ width: `${Math.min(100, (roi.projectedValue / roi.investmentRequired) * 20)}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Investment Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Engagement</span>
                      <span>${roi.investmentRequired.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Tier</span>
                      <span>{serviceTier.name}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Value Sources</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>• Process optimization gains</div>
                    <div>• Operational efficiency improvements</div>
                    <div>• Cost reduction opportunities</div>
                    <div>• Revenue enhancement potential</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence Sources */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Evidence Sources</h2>
              <p className="text-sm text-gray-600 mb-4">
                This ROI assessment is based on the following validated evidence from your responses:
              </p>
              
              <div className="space-y-3">
                {roi.evidenceSources.map((evidence, index) => (
                  <div key={evidence.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900 capitalize">
                        {evidence.type.replace('-', ' ')}
                      </span>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                        VALIDATED
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">Source: {evidence.source}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assumptions */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-900 mb-3">Key Assumptions</h3>
              <ul className="space-y-2 text-sm text-yellow-800">
                {roi.assumptions.map((assumption, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{assumption}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Service Information & Actions */}
          <div className="space-y-6">
            {/* Recommended Service Tier */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recommended Service</h3>
              <div className="border-2 border-blue-200 bg-blue-50 rounded-lg p-4">
                <h4 className="font-bold text-blue-900 mb-2">{serviceTier.name}</h4>
                <div className="text-2xl font-bold text-blue-600 mb-2">{serviceTier.price}</div>
                <p className="text-sm text-blue-800 mb-4">{serviceTier.description}</p>
                
                <ul className="space-y-2">
                  {serviceTier.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <svg className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-blue-800">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Strategic Recommendations</h3>
              <div className="space-y-3">
                {roi.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-700">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Next Steps</h3>
              
              <div className="space-y-3">
                <button
                  onClick={onScheduleConsultation}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
                >
                  Schedule Consultation
                </button>
                
                <button
                  onClick={onDownloadReport}
                  className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                >
                  Download Full Report
                </button>
                
                <button
                  onClick={onBack}
                  className="w-full bg-gray-100 text-gray-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all"
                >
                  ← Modify Assessment
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-gray-500 text-center">
                  This assessment is valid for 30 days and based on information provided during the constitutional compliance evaluation process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};