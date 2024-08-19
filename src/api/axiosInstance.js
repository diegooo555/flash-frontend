import axios from "axios";
import { REACT_APP_URL } from "../config.js";

const instanceAxios = axios.create({
  baseURL: REACT_APP_URL,
  withCredentials: true,
});

export default instanceAxios;
