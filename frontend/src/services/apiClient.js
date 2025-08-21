// src/services/api.js
import { supabase } from './supabase';

class ApiService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || '';
  }

  async request(url, options = {}) {
    const { data: { session } } = await supabase.auth.getSession();
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(session?.access_token && {
          Authorization: `Bearer ${session.access_token}`,
        }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${this.baseURL}${url}`, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get(url, options = {}) {
    return this.request(url, { method: 'GET', ...options });
  }

  async post(url, data, options = {}) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }

  async put(url, data, options = {}) {
    return this.request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }

  async delete(url, options = {}) {
    return this.request(url, { method: 'DELETE', ...options });
  }
}

export const apiService = new ApiService();
