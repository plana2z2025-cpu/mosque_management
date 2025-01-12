import axios from 'axios';

export class AxiosConfig {
  constructor() {
    this.config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  addConfig(key, value) {
    this.config[key] = value;
  }

  removeConfig(key) {
    if (this.config.hasOwnProperty(key)) {
      delete this.config[key];
    }
  }

  addConfigHeader(key, value) {
    this.config.headers[key] = value;
  }

  removeConfigHeader(key) {
    if (this.config.headers.hasOwnProperty(key)) {
      delete this.config.headers[key];
    }
  }

  removeContentType() {
    this.removeConfig('Content-Type');
  }

  addAuthorization(token) {
    this.addConfigHeader('Authorization', `Bearer ${token}`);
  }

  getConfig() {
    return this.config;
  }
}

export class RequestMethodInstance {
  constructor() {}

  async getMethod(url, headers) {
    return await axios.get(url, headers);
  }
  async postMethod(url, body, headers) {
    return await axios.post(url, body, headers);
  }
  async putMethod(url, body, headers) {
    return await axios.put(url, body, headers);
  }
  async deleteMethod(url, body, headers) {
    return await axios.delete(url, headers);
  }
}
