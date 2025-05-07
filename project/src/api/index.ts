import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Products API
export const productsApi = {
    getAll: (params?: any) => api.get('/products', { params }),
    getById: (id: string) => api.get(`/products/${id}`),
    create: (data: FormData) => api.post('/products', data),
    update: (id: string, data: FormData) => api.put(`/products/${id}`, data),
    delete: (id: string) => api.delete(`/products/${id}`),
    createReview: (id: string, data: { rating: number; comment: string }) =>
        api.post(`/products/${id}/reviews`, data),
    getFeatured: () => api.get('/products/featured'),
    getTopRated: () => api.get('/products/top-rated'),
    getByCategory: (categoryId: string) => api.get(`/products/category/${categoryId}`),
};

// Categories API
export const categoriesApi = {
    getAll: () => api.get('/categories'),
    getById: (id: string) => api.get(`/categories/${id}`),
    create: (data: FormData) => api.post('/categories', data),
    update: (id: string, data: FormData) => api.put(`/categories/${id}`, data),
    delete: (id: string) => api.delete(`/categories/${id}`),
};

// Orders API
export const ordersApi = {
    create: (data: any) => api.post('/orders', data),
    getById: (id: string) => api.get(`/orders/${id}`),
    getMyOrders: () => api.get('/orders/myorders'),
    getAllOrders: () => api.get('/orders'),
    updateStatus: (id: string, status: string) =>
        api.put(`/orders/${id}/status`, { status }),
    updateToPaid: (id: string, paymentResult: any) =>
        api.put(`/orders/${id}/pay`, paymentResult),
};

export default api;