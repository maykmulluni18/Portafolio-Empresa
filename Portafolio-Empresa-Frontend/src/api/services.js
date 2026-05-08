import api from './axios';

export const authService = {
  login:    (credentials) => api.post('/auth/login', credentials),
  register: (data)        => api.post('/auth/register', data),
  logout:   ()            => api.post('/auth/logout'),
  me:       ()            => api.get('/auth/me'),
};

export const companyService = {
  getAll:  ()           => api.get('/companies'),
  getOne:  (id)         => api.get(`/companies/${id}`),
  create:  (data)       => api.post('/companies', data),
  update:  (id, data)   => api.put(`/companies/${id}`, data),
  destroy: (id)         => api.delete(`/companies/${id}`),
};

export const companySocialService = {
  getAll:  (params)     => api.get('/company-socials', { params }),
  create:  (data)       => api.post('/company-socials', data),
  update:  (id, data)   => api.put(`/company-socials/${id}`, data),
  destroy: (id)         => api.delete(`/company-socials/${id}`),
};

export const companyTimelineService = {
  getAll:  (params)     => api.get('/company-timelines', { params }),
  create:  (data)       => api.post('/company-timelines', data),
  update:  (id, data)   => api.put(`/company-timelines/${id}`, data),
  destroy: (id)         => api.delete(`/company-timelines/${id}`),
};

export const serviceService = {
  getAll:  (params)     => api.get('/services', { params }),
  create:  (data)       => api.post('/services', data),
  update:  (id, data)   => api.put(`/services/${id}`, data),
  destroy: (id)         => api.delete(`/services/${id}`),
};

export const clientService = {
  getAll:  ()           => api.get('/clients'),
  getOne:  (id)         => api.get(`/clients/${id}`),
  create:  (data)       => api.post('/clients', data),
  update:  (id, data)   => api.put(`/clients/${id}`, data),
  destroy: (id)         => api.delete(`/clients/${id}`),
};

export const requestService = {
  getAll:  ()           => api.get('/requests'),
  create:  (data)       => api.post('/requests', data),
  update:  (id, data)   => api.put(`/requests/${id}`, data),
  destroy: (id)         => api.delete(`/requests/${id}`),
};

export const projectService = {
  getAll:  (params)     => api.get('/projects', { params }),
  getOne:  (id)         => api.get(`/projects/${id}`),
  create:  (data)       => api.post('/projects', data),
  update:  (id, data)   => api.put(`/projects/${id}`, data),
  destroy: (id)         => api.delete(`/projects/${id}`),
};

export const technologyService = {
  getAll:  ()           => api.get('/technologies'),
  create:  (data)       => api.post('/technologies', data),
  update:  (id, data)   => api.put(`/technologies/${id}`, data),
  destroy: (id)         => api.delete(`/technologies/${id}`),
};

export const deliverableService = {
  getAll:  (params)     => api.get('/deliverables', { params }),
  create:  (data)       => api.post('/deliverables', data),
  update:  (id, data)   => api.put(`/deliverables/${id}`, data),
  destroy: (id)         => api.delete(`/deliverables/${id}`),
};

export const paymentService = {
  getAll:  (params)     => api.get('/payments', { params }),
  create:  (data)       => api.post('/payments', data),
  update:  (id, data)   => api.put(`/payments/${id}`, data),
  destroy: (id)         => api.delete(`/payments/${id}`),
};

export const portfolioService = {
  getAll:  ()           => api.get('/portfolio'),
  getOne:  (id)         => api.get(`/portfolio/${id}`),
  create:  (data)       => api.post('/portfolio', data),
  update:  (id, data)   => api.put(`/portfolio/${id}`, data),
  destroy: (id)         => api.delete(`/portfolio/${id}`),
};

export const testimonialService = {
  getAll:  (params)     => api.get('/testimonials', { params }),
  create:  (data)       => api.post('/testimonials', data),
  update:  (id, data)   => api.put(`/testimonials/${id}`, data),
  destroy: (id)         => api.delete(`/testimonials/${id}`),
};

export const contactService = {
  getAll:  ()           => api.get('/contacts'),
  send:    (data)       => api.post('/contacts', data),
  destroy: (id)         => api.delete(`/contacts/${id}`),
};

export const userService = {
  getAll:  ()           => api.get('/users'),
  getOne:  (id)         => api.get(`/users/${id}`),
  create:  (data)       => api.post('/users', data),
  update:  (id, data)   => api.put(`/users/${id}`, data),
  destroy: (id)         => api.delete(`/users/${id}`),
};

export const roleService = {
  getAll:  ()           => api.get('/roles'),
  create:  (data)       => api.post('/roles', data),
  update:  (id, data)   => api.put(`/roles/${id}`, data),
  destroy: (id)         => api.delete(`/roles/${id}`),
};
