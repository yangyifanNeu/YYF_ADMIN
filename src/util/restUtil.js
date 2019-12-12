import axios from 'axios';
const API_PREFIX_URL = 'http://10.4.50.59:8999';
export default {
  get: (option) => {
    const resetUrl = API_PREFIX_URL + option.url;
    return axios.get(resetUrl);
  },
  post: (option) => {
    const resetUrl = API_PREFIX_URL + option.url;
    const data = option.data;
    return axios.post(resetUrl, data);
  },
  downLoad: (option) => {
    const resetUrl = API_PREFIX_URL + option.url;
    const data = option.data;
    return axios.post(resetUrl, data, {responseType: 'blob'});
  },
};
