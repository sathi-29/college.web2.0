import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  School, 
  TrendingUp, 
  BookOpen, 
  BarChart3,
  User,
  Menu,
  X,
  Search
} from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/colleges', label: 'Colleges', icon: <School size={20} /> },
    { path: '/predictor', label: 'Predictor', icon: <TrendingUp size={20} /> },
    { path: '/coaching', label: 'Coaching', icon: <BookOpen size={20} /> },
    { path: '/syllabus', label: 'Syllabus', icon: <BarChart3 size={20} /> },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <School size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EduPathfinder</h1>
                <p className="text-xs text-gray-600">Your College Companion</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                className="px-4 py-2 text-gray-600 hover:text-primary-600 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium transition-colors"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t py-4">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                      location.pathname === item.path
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                <div className="pt-4 border-t">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 mt-2"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <School size={24} />
                <h2 className="text-xl font-bold">EduPathfinder</h2>
              </div>
              <p className="text-gray-400">
                Your complete admission companion for discovering colleges, 
                predicting admissions, and preparing for exams.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/colleges" className="hover:text-white">Browse Colleges</Link></li>
                <li><Link to="/predictor" className="hover:text-white">Admission Predictor</Link></li>
                <li><Link to="/coaching" className="hover:text-white">Coaching</Link></li>
                <li><Link to="/syllabus" className="hover:text-white">Syllabus</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Exams</h3>
              <ul className="space-y-2 text-gray-400">
                <li>JEE Main/Advanced</li>
                <li>NEET UG/PG</li>
                <li>CAT/MAT/XAT</li>
                <li>CLAT/AILET</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>support@edupathfinder.com</li>
                <li>+91 98765 43210</li>
                <li>Mumbai, India</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 EduPathfinder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout