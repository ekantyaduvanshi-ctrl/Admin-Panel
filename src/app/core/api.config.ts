export const API_CONFIG = {
  BASE_URL: 'https://backend.cshare.in/v2',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/loginV2',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout'
    },
    TEMPLATES: {
      FILTER: '/template/filter',
      LIST: '/templates',
      CREATE: '/templates',
      UPDATE: (id: string) => `/templates/${id}`,
      DELETE: (id: string) => `/templates/${id}`,
      GET: (id: string) => `/templates/${id}`
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
    }
  }
}; 