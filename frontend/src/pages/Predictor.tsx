import React, { useState } from 'react'
import { Target, TrendingUp, BarChart3 } from 'lucide-react'
import { toast } from 'react-hot-toast'

const Predictor: React.FC = () => {
  const [formData, setFormData] = useState({
    exam: 'JEE Main',
    rank: '',
    category: 'General'
  })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Mock prediction
    setTimeout(() => {
      const chance = Math.floor(Math.random() * 30) + 60
      setResult({
        chancePercentage: chance,
        confidence: 85,
        factors: [
          { factor: 'Historical Cutoff', impact: 'positive', weight: 70 },
          { factor: 'Competition Level', impact: 'medium', weight: 20 },
          { factor: 'Seat Availability', impact: 'positive', weight: 10 }
        ],
        recommendations: [
          { college: 'IIT Bombay', chance: 85 },
          { college: 'IIT Delhi', chance: 78 },
          { college: 'IIT Madras', chance: 72 }
        ]
      })
      setLoading(false)
      toast.success('Prediction calculated!')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Target className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold">Admission Predictor</h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-bold mb-6">Enter Your Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Exam
                  </label>
                  <select
                    value={formData.exam}
                    onChange={(e) => setFormData({...formData, exam: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="JEE Main">JEE Main</option>
                    <option value="JEE Advanced">JEE Advanced</option>
                    <option value="NEET UG">NEET UG</option>
                    <option value="CAT">CAT</option>
                    <option value="CLAT">CLAT</option>
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

            {/* Results */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              {result ? (
                <>
                  <div className="text-center mb-8">
                    <div className={`text-5xl font-bold mb-2 ${
                      result.chancePercentage >= 80 ? 'text-green-600' :
                      result.chancePercentage >= 60 ? 'text-yellow-600' :
                      'text-orange-600'
                    }`}>
                      {result.chancePercentage}%
                    </div>
                    <div className="text-xl font-semibold">
                      {result.chancePercentage >= 80 ? 'High Chance' :
                       result.chancePercentage >= 60 ? 'Good Chance' :
                       'Moderate Chance'}
                    </div>
                    <div className="text-gray-600 mt-2">
                      Confidence: {result.confidence}%
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                        <BarChart3 size={20} />
                        Key Factors
                      </h3>
                      {result.factors.map((factor: any, index: number) => (
                        <div key={index} className="mb-4">
                          <div className="flex justify-between mb-1">
                            <span>{factor.factor}</span>
                            <span className={`px-2 py-1 rounded text-xs ${
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
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Recommended Colleges</h3>
                      <div className="space-y-3">
                        {result.recommendations.map((rec: any, index: number) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{rec.college}</span>
                              <span className="text-primary-600 font-bold">{rec.chance}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8">
                  <Target className="w-16 h-16 mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold mb-2">No Prediction Yet</h3>
                  <p className="text-center">
                    Enter your exam details to get admission predictions for top colleges
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Predictor