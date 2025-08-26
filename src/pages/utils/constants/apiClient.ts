import axios from "axios";
import { BASE_URL } from "./appConstants";

export const CLIENT = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "*/*",
    "Access-Control-Allow-Origin": "*",
    "Origin": "*"
}
});