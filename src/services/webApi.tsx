import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const instanceConfig: AxiosRequestConfig = {
  baseURL: "https://rickandmortyapi.com/api",
};
const instance: AxiosInstance = axios.create(instanceConfig);

export default {
  characters: {
    getCharacters: (params?: any) => {
      return instance.get("/character", { params });
    },
  },
  locations: {
    getLocations: (params?: any) => {
      return instance.get("/location", { params });
    },
  },
  episodes: {
    getEpisodes: (params?: any) => {
      return instance.get("/episode", { params });
    },
  },
};
