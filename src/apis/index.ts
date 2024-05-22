import { QueryCache, QueryClient } from "@tanstack/react-query";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_HOST = "http://15.165.202.64" ?? "http://localhost:8080";

export const fetcher = axios.create({
  baseURL: API_HOST,
  withCredentials: true,
})

const defaultErrorHandler = (err: any) => {
  console.error(err);
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 5 * 1000,
    },
  },
  queryCache: new QueryCache({
    onError: defaultErrorHandler,
  }),
});
