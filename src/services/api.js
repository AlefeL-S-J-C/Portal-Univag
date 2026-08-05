import axios from 'axios'

const API_BASE_URL = process.env.VUE_APP_API_URL || 'https://localhost:7001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth Services
export const authService = {
  login: (cpf, senha) => {
    return api.post('/auth/login', { cpf, senha })
  },

  validateUser: (cpf, matricula) => {
    return api.post('/auth/validate', { cpf, matricula })
  },

  verifyToken: (cpf, token) => {
    return api.post('/auth/verify-token', { cpf, token })
  },

  createPassword: (cpf, novaSenha) => {
    return api.post('/auth/create-password', { cpf, novaSenha })
  },

  resendToken: (cpf) => {
    return api.post('/auth/resend-token', { cpf })
  },

  logout: () => {
    localStorage.removeItem('token')
    return api.post('/auth/logout')
  }
}

// User Services
export const userService = {
  getProfile: () => {
    return api.get('/users/profile')
  },

  updateProfile: (data) => {
    return api.put('/users/profile', data)
  },

  changePassword: (oldPassword, newPassword) => {
    return api.post('/users/change-password', {
      oldPassword,
      newPassword
    })
  }
}

// Password Recovery Services
export const passwordRecoveryService = {
  requestRecovery: (email) => {
    return api.post('/auth/password-recovery/request', { email })
  },

  verifyRecoveryToken: (email, token) => {
    return api.post('/auth/password-recovery/verify-token', { email, token })
  },

  resetPassword: (email, novaSenha) => {
    return api.post('/auth/password-recovery/reset', { email, novaSenha })
  },

  resendRecoveryToken: (email) => {
    return api.post('/auth/password-recovery/resend-token', { email })
  }
}

export default api
