const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:3000') as string

export function apiFetch(endpoint: string, options?: RequestInit): Promise<Response> {
  const url = endpoint.startsWith('/')
    ? `${API_BASE_URL}${endpoint}`
    : `${API_BASE_URL}/${endpoint}`
  return fetch(url, options)
}

export { API_BASE_URL }
