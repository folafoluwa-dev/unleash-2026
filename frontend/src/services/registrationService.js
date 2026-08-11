import axiosInstance from './axiosInstance';

export const getRegistrations = () =>
  axiosInstance.get('/api/registrations/admin/').then(res => res.data);

export const getRegistration = (id) =>
  axiosInstance.get(`/api/registrations/admin/${id}/`).then(res => res.data);

export const updateRegistrationStatus = (id, status) =>
  axiosInstance.patch(`/api/registrations/admin/${id}/`, { status }).then(res => res.data);
export const registerAttendee = (data) =>
  axiosInstance.post('/api/registrations/', data).then(res => res.data);

export const lookupRegistration = (registrationId) =>
  axiosInstance.get(`/api/registrations/admin/lookup/${registrationId}/`).then(res => res.data);

// Check-in an attendee
export const checkInRegistration = (registrationId) =>
  axiosInstance.post(`/api/registrations/admin/check-in/${registrationId}/`).then(res => res.data);