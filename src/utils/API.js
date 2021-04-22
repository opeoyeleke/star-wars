import axios from "axios";

export const instance = axios.create({
  baseURL:
    "https://astro-cors-server.herokuapp.com/fetch/https://swapi.dev/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
