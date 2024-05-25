import Axios from 'axios';

const defaultBaseURL = 'http://localhost:3500';

export const createAxiosInstance = (baseURL = defaultBaseURL) => {
  return Axios.create({
    baseURL,
    timeout: 90000,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
