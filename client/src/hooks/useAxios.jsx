import axios from "axios";

const axiosURL = axios.create({
  baseURL: "https://taskmate-tan-zeta.vercel.app",
});

const useAxios = () => {
  return axiosURL;
};

export default useAxios;
