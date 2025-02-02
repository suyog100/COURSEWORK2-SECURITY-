import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;

export const registerUserApi = (userData: {
  email: string;
  password: string;
  username: string;
  phone: string;
}) => api.post("/api/user/register", userData);

export const loginUserApi = (userData: { email: string; password: string }) =>
  api.post("/api/user/login", userData);

// Define the function with the queryParams object
export const getAllProjects = async (queryParams: {
  page: number;
  limit?: string;
  search?: string;
  categories?: string[];
  funding?: string[];
}) => {
  // Convert the object to a URLSearchParams string
  const params = new URLSearchParams({
    page: queryParams.page.toString(),
    limit: queryParams.limit || "8",
    search: queryParams.search || "",
    categories: queryParams.categories?.join(",") || "",
    funding: queryParams.funding?.join("P") || "",
  });

  return api.get(`/api/project/all?${params.toString()}`);
};
