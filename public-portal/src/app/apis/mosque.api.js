import Service from "../services";

export const getMosquesApi = async (queryParams) => {
  const { page, limit = 15 } = queryParams;
  let query = `?page=${page}&limit=${limit}`;
  const response = await Service.fetchGet(`/mosque/public/all${query}`);
  return response;
};
