import axios from "axios";

const axiosURL = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxios = () => {
  return axiosURL;
};

export default useAxios;
