import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, DollarSign, Star, Users, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

interface CollegeCardProps {
  college: any
  index: number
}

const CollegeCard: React.FC<CollegeCardProps> = ({ college, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{college.name}</h3>
            <p className="text-gray-600">{college.shortName}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            college.type === 'Government' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {college.type}
          </span>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} />
            <span>{college.location?.city}, {college.location?.state}</span>
          </div>
          
          {college.rankings?.[0]?.nirf?.overall && (
            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-500" />
              <span className="font-semibold">NIRF #{college.rankings[0].nirf.overall}</span>
            </div>
          )}

          {college.placement?.averagePackage && (
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-green-500" />
              <span className="font-semibold">
                ₹{(college.placement.averagePackage / 100000).toFixed(1)} LPA
              </span>
            </div>
          )}

          {college.placement?.placementPercentage && (
            <div className="flex items-center gap-2">
              <Users size={16} className="text-blue-500" />
              <span>{college.placement.placementPercentage}% Placement</span>
            </div>
          )}
        </div>

        {college.courses?.[0] && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={16} className="text-gray-500" />
              <span className="text-sm font-semibold">Popular Course</span>
            </div>
            <p className="text-gray-700">{college.courses[0].name}</p>
            <p className="text-gray-600 text-sm mt-1">
              Fees: ₹{(college.courses[0].fees?.total || 0) / 100000} Lakhs
            </p>
          </div>
        )}

        <Link
          to={`/colleges/${college._id}`}
          className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  )
}

export default CollegeCard