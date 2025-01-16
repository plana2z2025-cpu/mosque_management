import Service from "../services";

export const getMosquesApi = async () => {
  const response = await Service.fetchGet("/mosque/mosques");
  return response;
};
