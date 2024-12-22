import { AxiosConfig, RequestMethodInstance } from './axiosInstance';
import { API_URL } from './config';

const handleHeaders = (token, contentType) => {
  const axiosConfig = new AxiosConfig();
  if (!contentType) {
    axiosConfig.removeContentType();
  } else if (contentType === 'formData') {
    axiosConfig.setContentType('multipart/form-data');
  }
  if (token) {
    axiosConfig.addAuthorization(token);
  }
  return axiosConfig.getConfig();
};

const processResponse = async (response) => {
  if (response?.message === 'Network Error') {
    return [false, { message: response.message, statusCode: 500 }, 500];
  }

  if (response.status === 200) {
    return [true, response.data, response.status];
  } else if (response.status === 401) {
    onUserKickedOut();
    return [false, response.data, response.status];
  } else {
    return [response.status, response.data, response.status];
  }
};

const apiFetch = new RequestMethodInstance();
const Service = {
  fetchGet: async (url, token = null, contentType = null) => {
    try {
      const endpoint = API_URL + url;
      console.log(token);

      const headers = handleHeaders(token, contentType);
      const response = await apiFetch.getMethod(endpoint, headers);
      return processResponse(response);
    } catch (error) {
      onFailure('network', url);
      return processResponse(error?.response || error);
    }
  },

  fetchPost: async (url, body, token = null, contentType = 'json') => {
    try {
      const endpoint = API_URL + url;
      const headers = handleHeaders(token, contentType);
      const response = await apiFetch.postMethod(endpoint, body, headers);
      return processResponse(response);
    } catch (error) {
      onFailure('network', url);
      return processResponse(error?.response || error);
    }
  },

  fetchPut: async (url, body = null, token = null, contentType = 'json') => {
    try {
      const endpoint = API_URL + url;
      const headers = handleHeaders(token, contentType);
      const response = await apiFetch.putMethod(endpoint, body, headers);
      return processResponse(response);
    } catch (error) {
      onFailure('network', url);
      return processResponse(error?.response || error);
    }
  },

  fetchDelete: async (url, token = null, body = {}, contentType = 'json') => {
    try {
      const endpoint = API_URL + url;
      const headers = handleHeaders(token, contentType);
      console.log(headers);

      const response = await apiFetch.deleteMethod(endpoint, body, headers);
      return processResponse(response);
    } catch (error) {
      onFailure('network', url);
      return processResponse(error?.response || error);
    }
  },
};

const onFailure = async (res, url) => {
  console.log('API FAILED ' + url);
};

const onUserKickedOut = async () => {
  // localStorage.clear();
  // window.location.reload();
};

export default Service;
