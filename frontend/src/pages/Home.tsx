import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, TrendingUp, Star, BookOpen, Users, Award, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import CollegeCard from '../components/CollegeCard'
import { useQuery } from '@tanstack/react-query'
import { collegeService } from '../services/collegeService'

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const { data: featuredColleges, isLoading } = useQuery({
    queryKey: ['featured-colleges'],
    queryFn: collegeService.getFeaturedColleges,
  })

  const streamOptions = [
    'Engineering', 'Medical', 'Management', 'Law', 'Arts', 
    'Science', 'Commerce', 'Design', 'Architecture'
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20" />
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect College
              <span className="block text-secondary-500">Your Future Starts Here</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-primary-100">
              Discover 10,000+ colleges, compare them, and get accurate admission predictions
            </p>
            
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto bg-white rounded-full shadow-2xl p-2 mb-12">
              <div className="flex">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search colleges, courses, exams..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 text-gray-900 rounded-l-full focus:outline-none"
                  />
                </div>
                <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-r-full font-semibold flex items-center justify-center gap-2 transition-colors">
                  <Search size={20} />
                  Search
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">10,000+</div>
                <div className="text-gray-300">Colleges</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-gray-300">Exams</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">500K+</div>
                <div className="text-gray-300">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-gray-300">Accuracy</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose <span className="text-primary-600">EduPathfinder</span>?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Star className="w-12 h-12 text-primary-600" />,
                title: 'Smart College Match',
                description: 'AI-powered matching based on your preferences'
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-green-600" />,
                title: 'Admission Predictor',
                description: 'Get accurate admission chances'
              },
              {
                icon: <BookOpen className="w-12 h-12 text-purple-600" />,
                title: 'Integrated Learning',
                description: 'Coaching and study materials'
              },
              {
                icon: <Users className="w-12 h-12 text-orange-600" />,
                title: 'Expert Community',
                description: 'Connect with alumni and counselors'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Colleges */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold">Featured Colleges</h2>
              <p className="text-gray-600 mt-2">Top-rated institutions</p>
            </div>
            <Link
              to="/colleges"
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
            >
              View All <ChevronRight size={20} />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 animate-pulse h-64 rounded-xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredColleges?.map((college: any, index: number) => (
                <CollegeCard key={college._id} college={college} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your College Journey Today
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join 500,000+ students who found their dream college
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-700 hover:bg-gray-100 font-bold py-4 px-8 rounded-full text-lg transition-colors"
            >
              Create Free Account
            </Link>
            <Link
              to="/predictor"
              className="bg-transparent border-2 border-white hover:bg-white/10 font-bold py-4 px-8 rounded-full text-lg transition-colors"
            >
              Try Predictor Tool
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home