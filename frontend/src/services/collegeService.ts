import api from './api'

export const collegeService = {
  getColleges: async (params?: {
    page?: number
    limit?: number
    search?: string
    stream?: string
    state?: string
  }) => {
    const response = await api.get('/colleges', { params })
    return response.data
  },

  getCollegeById: async (id: string) => {
    const response = await api.get(`/colleges/${id}`)
    return response.data.data
  },

  getFeaturedColleges: async () => {
    const response = await api.get('/colleges', { params: { limit: 6, featured: true } })
    return response.data.data
  },

  saveCollege: async (collegeId: string) => {
    const response = await api.post(`/colleges/${collegeId}/save`)
    return response.data
  },

  compareColleges: async (collegeIds: string[]) => {
    const response = await api.post('/colleges/compare', { collegeIds })
    return response.data
  }
}