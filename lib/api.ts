import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios"

// Create axios instance with base URL and default headers
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // This allows cookies to be sent with requests
})

// Add a request interceptor to add auth token to requests
api.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error) => {
    // Handle session expiration
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login if not already there
      if (typeof window !== "undefined" && !window.location.pathname.includes("/auth/login")) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location.href = "/auth/login"
      }
    }
    return Promise.reject(error)
  },
)

export default api
