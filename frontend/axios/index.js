import axios from 'axios';

const axiosWithAuth = () => {
  // get the token from local storage
  const token = window.localStorage.getItem('token');

  // create a new "instance" of axios with the desired configs
  const instance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return instance;
};

export default axiosWithAuth;
