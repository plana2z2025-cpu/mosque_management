import Service from "../services";

export const getMosquesApi = async () => {
  const response = await Service.fetchGet("/mosque/public/all");
  return response;
};
