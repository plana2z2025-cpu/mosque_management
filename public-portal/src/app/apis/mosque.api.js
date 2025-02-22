import Service from "../services";

export const getMosquesApi = async (queryParams) => {
  const { page, limit = 15, search = null } = queryParams;
  let query = `?page=${page}&limit=${limit}`;
  if (search) {
    query += `&name=${search}`;
  }
  const response = await Service.fetchGet(`/mosque/public/all${query}`);
  return response;
};

export const getSingleMosqueApi = async (slug) => {
  const response = await Service.fetchGet(`/mosque/public/${slug}`);
  return response;
};
