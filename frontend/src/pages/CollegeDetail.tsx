import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Star, MapPin, DollarSign, Users, Calendar, Globe, 
  Phone, Mail, Award, BookOpen, Building, CheckCircle,
  Bookmark, Share2, Download
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { collegeService } from '../services/collegeService'
import LoadingSpinner from '../components/common/LoadingSpinner'

const CollegeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  const { data: college, isLoading } = useQuery({
    queryKey: ['college', id],
    queryFn: () => collegeService.getCollegeById(id!),
    enabled: !!id,
  })

  if (isLoading) {
    return <LoadingSpinner fullScreen />
  }

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">College not found</h2>
          <button
            onClick={() => navigate('/colleges')}
            className="text-primary-600 hover:text-primary-700"
          >
            Browse Colleges
          </button>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Building size={18} /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen size={18} /> },
    { id: 'admissions', label: 'Admissions', icon: <Award size={18} /> },
    { id: 'placement', label: 'Placement', icon: <DollarSign size={18} /> },
    { id: 'facilities', label: 'Facilities', icon: <CheckCircle size={18} /> },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* College Header */}
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{college.name}</h1>
              <p className="text-gray-600 mb-4">{college.shortName}</p>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  college.type === 'Government' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {college.type}
                </span>
                {college.accreditation?.naacGrade && (
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    NAAC {college.accreditation.naacGrade}
                  </span>
                )}
                {college.isVerified && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Verified
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50">
                <Bookmark size={20} />
                Save
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <Share2 size={20} />
                Share
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Award size={20} className="text-primary-600" />
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Star size={16} className="text-yellow-500" />
                    Rating
                  </span>
                  <span className="font-semibold">{college.ratings?.overall || 'N/A'}/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <DollarSign size={16} className="text-green-500" />
                    Avg Package
                  </span>
                  <span className="font-semibold">
                    ₹{(college.placement?.averagePackage || 0) / 100000} LPA
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Users size={16} className="text-blue-500" />
                    Placement
                  </span>
                  <span className="font-semibold">{college.placement?.placementPercentage || 0}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Calendar size={16} className="text-purple-500" />
                    Established
                  </span>
                  <span className="font-semibold">{college.establishedYear}</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-gray-500" />
                  <span className="text-gray-700">{college.location?.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-gray-500" />
                  <span className="text-gray-700">{college.contact?.phone?.[0]}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-gray-500" />
                  <span className="text-gray-700">{college.contact?.email?.[0]}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-gray-500" />
                  <a 
                    href={college.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </div>

            {/* Download Brochure */}
            <button className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-lg transition-colors">
              <Download size={20} />
              Download Brochure
            </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg mb-6">
              <div className="flex flex-wrap border-b">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium ${
                      activeTab === tab.id
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-4">About College</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {college.description || `${college.name} is a premier educational institution established in ${college.establishedYear}.`}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4">Rankings</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {college.rankings?.map((rank: any, index: number) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-600">NIRF {rank.year}</div>
                            <div className="text-2xl font-bold text-primary-600">
                              #{rank.nirf?.overall || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-600">Overall</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'courses' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold mb-4">Available Courses</h3>
                    <div className="space-y-4">
                      {college.courses?.map((course: any, index: number) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 transition-colors">
                          <h4 className="text-lg font-semibold mb-2">{course.name}</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-gray-600">Degree: {course.degree}</p>
                              <p className="text-gray-600">Duration: {course.duration}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Total Fees: ₹{(course.fees?.total || 0) / 100000} Lakhs</p>
                              <p className="text-gray-600">Seats: {course.seats?.total || 'N/A'}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'placement' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold mb-4">Placement Statistics ({college.placement?.year})</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <div className="text-3xl font-bold text-primary-600 mb-2">
                          ₹{(college.placement?.averagePackage || 0) / 100000} LPA
                        </div>
                        <p className="text-gray-600">Average Package</p>
                      </div>
                      <div className="bg-green-50 p-6 rounded-lg">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          {college.placement?.placementPercentage || 0}%
                        </div>
                        <p className="text-gray-600">Placement Percentage</p>
                      </div>
                    </div>
                    
                    {college.placement?.topRecruiters && (
                      <div>
                        <h4 className="text-lg font-semibold mb-3">Top Recruiters</h4>
                        <div className="flex flex-wrap gap-2">
                          {college.placement.topRecruiters.map((recruiter: string, index: number) => (
                            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                              {recruiter}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollegeDetail