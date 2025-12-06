import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, TrendingUp, BarChart3, Download } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { predictionService } from '../../services/predictionService'

const AdmissionPredictor: React.FC = () => {
  const [formData, setFormData] = useState({
    exam: 'JEE Main',
    rank: '',
    category: 'General',
    year: new Date().getFullYear(),
  })
  const [predictionResult, setPredictionResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const result = await predictionService.calculatePrediction(formData)
      setPredictionResult(result)
      toast.success('Prediction calculated successfully!')
    } catch (error) {
      toast.error('Failed to calculate prediction')
    } finally {
      setLoading(false)
    }
  }

  const getChanceColor = (chance: number) => {
    if (chance >= 80) return 'text-green-600'
    if (chance >= 60) return 'text-yellow-600'
    if (chance >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getChanceLabel = (chance: number) => {
    if (chance >= 80) return 'High Chance'
    if (chance >= 60) return 'Good Chance'
    if (chance >= 40) return 'Moderate Chance'
    if (chance >= 20) return 'Low Chance'
    return 'Very Low Chance'
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center gap-3 mb-8">
        <Target className="w-8 h-8 text-primary-600" />
        <h2 className="text-2xl font-bold">Admission Predictor</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Entrance Exam
              </label>
              <select
                value={formData.exam}
                onChange={(e) => setFormData({...formData, exam: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="JEE Main">JEE Main</option>
                <option value="JEE Advanced">JEE Advanced</option>
                <option value="NEET UG">NEET UG</option>
                <option value="NEET PG">NEET PG</option>
                <option value="CAT">CAT</option>
                <option value="MAT">MAT</option>
                <option value="XAT">XAT</option>
                <option value="CLAT">CLAT</option>
                <option value="AILET">AILET</option>
                <option value="NIFT">NIFT</option>
                <option value="NID">NID</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Rank/Score
              </label>
              <input
                type="number"
                value={formData.rank}
                onChange={(e) => setFormData({...formData, rank: e.target.value})}
                placeholder="e.g., 15000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
                <option value="PwD">PwD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year of Exam
              </label>
              <select
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {[2024, 2023, 2022, 2021, 2020].map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <TrendingUp size={20} />
                  Calculate Admission Chance
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div>
          {predictionResult ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <div className={`text-5xl font-bold mb-2 ${getChanceColor(predictionResult.chancePercentage)}`}>
                  {predictionResult.chancePercentage}%
                </div>
                <div className="text-xl font-semibold">
                  {getChanceLabel(predictionResult.chancePercentage)}
                </div>
                <div className="text-gray-600 mt-2">
                  Confidence: {predictionResult.confidence}%
                </div>
              </div>

              {/* Chance Factors */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <BarChart3 size={20} />
                  Key Factors
                </h3>
                {predictionResult.factors.map((factor: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{factor.factor}</span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        factor.impact === 'positive' ? 'bg-green-100 text-green-800' :
                        factor.impact === 'negative' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {factor.impact}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${factor.weight}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommendations */}
              {predictionResult.recommendations?.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recommended Colleges</h3>
                  <div className="space-y-3">
                    {predictionResult.recommendations.slice(0, 3).map((rec: any) => (
                      <div key={rec.collegeId} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{rec.reason}</span>
                          <span className="text-primary-600 font-bold">{rec.chancePercentage}%</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {rec.type === 'similar_college' ? 'Similar College' : 
                           rec.type === 'backup_option' ? 'Backup Option' : 'Reach College'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button className="w-full border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <Download size={20} />
                Download Detailed Report
              </button>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8">
              <Target className="w-16 h-16 mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">No Prediction Yet</h3>
              <p className="text-center">
                Enter your exam details to get admission predictions for colleges across India
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdmissionPredictor