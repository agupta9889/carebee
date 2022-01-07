import axios from 'axios';

let URL = 'http://3.110.197.122:5000/api';  // Live API URL
if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  URL = 'http://192.168.137.1:5000/api'; // Development URL
}

const Axios = () => {
  const AxiosInstance = axios.create({
    baseURL: URL,
    timeout: 5000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-auth-token': JSON.parse(localStorage.getItem('userToken')),
    },
  });
  AxiosInstance.interceptors.request.use(function (config) {
    config.headers['x-auth-token'] = JSON.parse(localStorage.getItem('userToken'));
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  AxiosInstance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.response && error.response.status === 401) {
      //localStorage.removeItem("loginUserInfo");
      localStorage.clear();
      window.location.href = "http://localhost:3000/";
      //window.location.reload();
    }

    return Promise.reject(error);
  });

  return AxiosInstance;
};

export default Axios();
