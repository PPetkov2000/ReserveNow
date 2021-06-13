import axios from "axios";
import addInterceptors from "./api-interceptors";

const instance = axios.create({
  baseURL: "http://localhost:4000",
  headers: { "Content-type": "application/json" },
});

addInterceptors(instance);

export default instance;
