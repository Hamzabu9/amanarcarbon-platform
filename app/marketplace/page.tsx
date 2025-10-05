'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface CarbonCredit {
  id: string
  serialNumber: string
  vintage: number
  quantity: number
  price: number
  status: string
  project: {
    id: string
    title: string
    location: string
    projectType: string
    standard: string
    images: string[]
    owner: {
      name: string
      image: string
      profile: {
        isVerified: boolean
      }
    }
    organization: {
      name: string
      logo: string
      isVerified: boolean
    } | null
    reviews: Array<{
      rating: number
      comment: string
      createdAt: string
      user: {
        name: string
        image: string
      }
    }>
    _count: {
      reviews: number
      credits: number
    }
  }
}

interface MarketplaceData {
  credits: CarbonCredit[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export default function MarketplacePage() {
  const [data, setData] = useState<MarketplaceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    projectType: '',
    standard: '',
    minPrice: '',
    maxPrice: '',
    vintage: '',
    search: ''
  })
  const [currentPage, setCurrentPage] = useState(1)

  const fetchCredits = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v))
      })

      const response = await fetch(`/api/credits?${params}`)
      const result = await response.json()
      
      if (result.success) {
        setData(result.data)
      }
    } catch (error) {
      console.error('Error fetching credits:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCredits()
  }, [currentPage, filters])

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  const getProjectTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      REFORESTATION: 'Reforestation',
      RENEWABLE_ENERGY: 'Renewable Energy',
      ENERGY_EFFICIENCY: 'Energy Efficiency',
      WASTE_MANAGEMENT: 'Waste Management',
      CARBON_CAPTURE: 'Carbon Capture',
      BLUE_CARBON: 'Blue Carbon',
      AGRICULTURE: 'Agriculture',
      OTHER: 'Other'
    }
    return labels[type] || type
  }

  const getStandardLabel = (standard: string) => {
    const labels: Record<string, string> = {
      VCS: 'VCS',
      GOLD_STANDARD: 'Gold Standard',
      CARBON_CREDIT_STANDARD: 'Carbon Credit Standard',
      ISO_14064: 'ISO 14064',
      OTHER: 'Other'
    }
    return labels[standard] || standard
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Carbon Credit Marketplace</h1>
          <p className="mt-2 text-gray-600">
            Discover and purchase verified carbon credits from high-quality projects worldwide
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Filter Credits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
              <select
                value={filters.projectType}
                onChange={(e) => handleFilterChange('projectType', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              >
                <option value="">All Types</option>
                <option value="REFORESTATION">Reforestation</option>
                <option value="RENEWABLE_ENERGY">Renewable Energy</option>
                <option value="ENERGY_EFFICIENCY">Energy Efficiency</option>
                <option value="WASTE_MANAGEMENT">Waste Management</option>
                <option value="CARBON_CAPTURE">Carbon Capture</option>
                <option value="BLUE_CARBON">Blue Carbon</option>
                <option value="AGRICULTURE">Agriculture</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Standard</label>
              <select
                value={filters.standard}
                onChange={(e) => handleFilterChange('standard', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              >
                <option value="">All Standards</option>
                <option value="VCS">VCS</option>
                <option value="GOLD_STANDARD">Gold Standard</option>
                <option value="CARBON_CREDIT_STANDARD">Carbon Credit Standard</option>
                <option value="ISO_14064">ISO 14064</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="Min price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="Max price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vintage</label>
              <input
                type="number"
                value={filters.vintage}
                onChange={(e) => handleFilterChange('vintage', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="Year"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="Search projects..."
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        ) : data && data.credits.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {data.credits.map((credit) => (
                <div key={credit.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    {/* Project Image */}
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      {credit.project.images.length > 0 ? (
                        <Image
                          src={credit.project.images[0]}
                          alt={credit.project.title}
                          width={400}
                          height={225}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {credit.project.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {credit.project.location}
                      </p>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {getProjectTypeLabel(credit.project.projectType)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {getStandardLabel(credit.project.standard)}
                        </span>
                      </div>
                    </div>

                    {/* Credit Details */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Price per credit:</span>
                        <span className="text-lg font-semibold text-gray-900">
                          ${credit.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Vintage:</span>
                        <span className="text-sm text-gray-900">{credit.vintage}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-600">Available:</span>
                        <span className="text-sm text-gray-900">{credit.quantity} credits</span>
                      </div>

                      {/* Owner Info */}
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex-shrink-0">
                          {credit.project.owner.image ? (
                            <Image
                              src={credit.project.owner.image}
                              alt={credit.project.owner.name}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                          ) : (
                            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {credit.project.owner.name}
                          </p>
                          {credit.project.owner.profile?.isVerified && (
                            <span className="text-xs text-green-600">✓ Verified</span>
                          )}
                        </div>
                      </div>

                      {/* Reviews */}
                      {credit.project.reviews.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center space-x-1 mb-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.round(credit.project.reviews.reduce((acc, review) => acc + review.rating, 0) / credit.project.reviews.length)
                                      ? 'text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              ({credit.project._count.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Purchase Button */}
                      <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                        Purchase Credits
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {data.pagination.pages > 1 && (
              <div className="flex justify-center">
                <nav className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {[...Array(data.pagination.pages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-2 border rounded-md text-sm font-medium ${
                        currentPage === i + 1
                          ? 'bg-green-600 text-white border-green-600'
                          : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(data.pagination.pages, prev + 1))}
                    disabled={currentPage === data.pagination.pages}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No credits found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later for new projects.</p>
          </div>
        )}
      </div>
    </div>
  )
}
