import http from './http.js';

export async function getPublicProfileById(id) {
  const { data } = await http.get(`/public/profiles/${id}`);
  return data;
}

export async function getPublicProfileReviews(id) {
  const { data } = await http.get(`/public/profiles/${id}/reviews`);
  return data;
}
