'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface RiskAssessment {
  id: string
  location: string
  coordinates: { lat: number, lng: number }
  riskScore: number
  riskCategory: string
  factors: any
  recommendations: string
  assessedAt: string
  expiresAt: string
}

interface SatelliteData {
  id: string
  location: string
  dataType: string
  value: number
  unit: string
  timestamp: string
}

export default function ClimateRiskDashboard() {
  const { data: session } = useSession()
  const [assessments, setAssessments] = useState<RiskAssessment[]>([])
  const [satelliteData, setSatelliteData] = useState<SatelliteData[]>([])
  const [loading, setLoading] = useState(true)
  const [newAssessment, setNewAssessment] = useState({
    location: '',
    coordinates: { lat: '', lng: '' },
    assessmentType: 'GENERAL'
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [assessmentsRes, satelliteRes] = await Promise.all([
        fetch('/api/climate-risk'),
        fetch('/api/satellite-data')
      ])

      if (assessmentsRes.ok) {
        const assessmentsData = await assessmentsRes.json()
        setAssessments(assessmentsData.data.assessments)
      }

      if (satelliteRes.ok) {
        const satelliteData = await satelliteRes.json()
        setSatelliteData(satelliteData.data.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAssessment = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/climate-risk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newAssessment,
          coordinates: {
            lat: parseFloat(newAssessment.coordinates.lat),
            lng: parseFloat(newAssessment.coordinates.lng)
          }
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setAssessments(prev => [result.data, ...prev])
        setNewAssessment({
          location: '',
          coordinates: { lat: '', lng: '' },
          assessmentType: 'GENERAL'
        })
      }
    } catch (error) {
      console.error('Error creating assessment:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (category: string) => {
    switch (category) {
      case 'LOW': return 'text-green-600 bg-green-100'
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100'
      case 'HIGH': return 'text-orange-600 bg-orange-100'
      case 'CRITICAL': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-600'
    if (score >= 60) return 'text-orange-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-green-600'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Climate Risk Intelligence</h1>
          <p className="mt-2 text-gray-600">
            AI-powered climate risk assessment and satellite data analysis
          </p>
        </div>

        {/* New Assessment Form */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Create Risk Assessment</h2>
          </div>
          <form onSubmit={handleCreateAssessment} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={newAssessment.location}
                  onChange={(e) => setNewAssessment(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  placeholder="Enter location"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={newAssessment.coordinates.lat}
                  onChange={(e) => setNewAssessment(prev => ({ 
                    ...prev, 
                    coordinates: { ...prev.coordinates, lat: e.target.value }
                  }))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  placeholder="e.g., 40.7128"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={newAssessment.coordinates.lng}
                  onChange={(e) => setNewAssessment(prev => ({ 
                    ...prev, 
                    coordinates: { ...prev.coordinates, lng: e.target.value }
                  }))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  placeholder="e.g., -74.0060"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assessment Type
              </label>
              <select
                value={newAssessment.assessmentType}
                onChange={(e) => setNewAssessment(prev => ({ ...prev, assessmentType: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              >
                <option value="GENERAL">General Assessment</option>
                <option value="AGRICULTURE">Agriculture</option>
                <option value="INFRASTRUCTURE">Infrastructure</option>
                <option value="HEALTH">Health</option>
                <option value="ECOSYSTEM">Ecosystem</option>
              </select>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Assessment'}
              </button>
            </div>
          </form>
        </div>

        {/* Risk Assessments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Risk Assessments</h3>
            </div>
            <div className="p-6">
              {assessments.length > 0 ? (
                <div className="space-y-4">
                  {assessments.slice(0, 5).map((assessment) => (
                    <div key={assessment.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{assessment.location}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(assessment.riskCategory)}`}>
                          {assessment.riskCategory}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="text-sm text-gray-600">Risk Score:</span>
                        <span className={`text-lg font-semibold ${getRiskScoreColor(assessment.riskScore)}`}>
                          {assessment.riskScore.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Assessed: {new Date(assessment.assessedAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No risk assessments yet. Create your first assessment above.
                </p>
              )}
            </div>
          </div>

          {/* Satellite Data */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Satellite Data</h3>
            </div>
            <div className="p-6">
              {satelliteData.length > 0 ? (
                <div className="space-y-4">
                  {satelliteData.slice(0, 5).map((data) => (
                    <div key={data.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{data.location}</h4>
                        <span className="text-sm text-gray-500">{data.dataType}</span>
                      </div>
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="text-sm text-gray-600">Value:</span>
                        <span className="text-lg font-semibold text-gray-900">
                          {data.value.toFixed(2)} {data.unit}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {new Date(data.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No satellite data available.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-white rounded-lg shadow p-6 text-left hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">📊</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Generate Report</h3>
                <p className="text-sm text-gray-600">Create comprehensive climate risk report</p>
              </div>
            </div>
          </button>

          <button className="bg-white rounded-lg shadow p-6 text-left hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🌍</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Satellite Analysis</h3>
                <p className="text-sm text-gray-600">Request satellite data analysis</p>
              </div>
            </div>
          </button>

          <button className="bg-white rounded-lg shadow p-6 text-left hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🔔</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Set Alerts</h3>
                <p className="text-sm text-gray-600">Configure climate risk alerts</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
