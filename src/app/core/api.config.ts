import { environment } from '../../environments/environment';

export const API_CONFIG = {
  BASE_URL: environment.apiUrl,
  COMPANY_ID: '65ca007ff956d27b357649bd',
  EXTERNAL_APIS: {
    // External API endpoints
    AUTH: {
      LOGIN: 'https://backend.cshare.in/v2/loginV2',
      REGISTER: 'https://backend.cshare.in/v2/register',
      LOGOUT: 'https://backend.cshare.in/v2/logout'
    },
    USERS: {
      LIST: 'https://backend.cshare.in/v2/users',
      CREATE: 'https://backend.cshare.in/v2/users',
      UPDATE: (id: string) => `https://backend.cshare.in/v2/users/${id}`,
      DELETE: (id: string) => `https://backend.cshare.in/v2/users/${id}`,
      GET: (id: string) => `https://backend.cshare.in/v2/users/${id}`
    },
    PRODUCTS: {
      LIST: 'https://backend.cshare.in/v2/products',
      CREATE: 'https://backend.cshare.in/v2/products',
      UPDATE: (id: string) => `https://backend.cshare.in/v2/products/${id}`,
      DELETE: (id: string) => `https://backend.cshare.in/v2/products/${id}`,
      GET: (id: string) => `https://backend.cshare.in/v2/products/${id}`
    },
    ORDERS: {
      LIST: 'https://backend.cshare.in/v2/orders',
      CREATE: 'https://backend.cshare.in/v2/orders',
      UPDATE: (id: string) => `https://backend.cshare.in/v2/orders/${id}`,
      DELETE: (id: string) => `https://backend.cshare.in/v2/orders/${id}`,
      GET: (id: string) => `https://backend.cshare.in/v2/orders/${id}`,
      HISTORY: 'https://backend.cshare.in/v2/orders/history'
    },
    TEMPLATES: {
      LIST: 'https://backend.cshare.in/v2/templates',
      CREATE: 'https://backend.cshare.in/v2/template/create',
      UPDATE: 'https://backend.cshare.in/v2/template/update',
      DELETE: (id: string) => `https://backend.cshare.in/v2/templates/${id}`,
      GET: (id: string) => `https://backend.cshare.in/v2/templates/${id}`,
      FILTER: 'https://backend.cshare.in/v2/template/filter'
    }
  },
  // Local backend endpoints
  LOCAL_ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/loginV2',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout'
    },
    USERS: {
      LIST: '/users',
      CREATE: '/users',
      UPDATE: (id: string) => `/users/${id}`,
      DELETE: (id: string) => `/users/${id}`,
      GET: (id: string) => `/users/${id}`
    },
    PRODUCTS: {
      LIST: '/products',
      CREATE: '/products',
      UPDATE: (id: string) => `/products/${id}`,
      DELETE: (id: string) => `/products/${id}`,
      GET: (id: string) => `/products/${id}`
    },
    ORDERS: {
      LIST: '/orders',
      CREATE: '/orders',
      UPDATE: (id: string) => `/orders/${id}`,
      DELETE: (id: string) => `/orders/${id}`,
      GET: (id: string) => `/orders/${id}`,
      HISTORY: '/orders/history'
    },
    TEMPLATES: {
      LIST: '/templates',
      CREATE: '/templates',
      UPDATE: (id: string) => `/templates/${id}`,
      DELETE: (id: string) => `/templates/${id}`,
      GET: (id: string) => `/templates/${id}`,
      FILTER: '/templates/filter'
    }
  }
}; 