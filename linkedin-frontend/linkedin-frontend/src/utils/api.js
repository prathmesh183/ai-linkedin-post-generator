import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Generate a LinkedIn post
export const generatePost = (data) => api.post('/generate', data);

// Save a post
export const savePost = (data) => api.post('/posts', data);

// Get all saved posts
export const getSavedPosts = (params) => api.get('/posts', { params });

// Delete a post
export const deletePost = (id) => api.delete(`/posts/${id}`);

// Clear all posts
export const clearAllPosts = () => api.delete('/posts');

export default api;
