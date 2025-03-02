import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response, // Return the response if it's successful
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is a 401 Unauthorized and if we have a refresh token
    if (
      error.response.status &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          // Make the PUT request to refresh the access token
          const refreshResponse = await api.put("/auth/token", {
            refreshToken: refreshToken,
          });

          const { accessToken } = refreshResponse.data;

          // Save the new access token in local storage
          localStorage.setItem("accessToken", accessToken);

          // Update the Authorization header with the new access token
          api.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

          // Retry the original request with the new access token
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Handle the error when refreshing the token (e.g., log out the user)
          console.error("Token refresh failed:", refreshError);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          // Navigate to login page (this part will be handled in the component)
          return Promise.reject(refreshError);
        }
      } else {
        // If no refresh token is found, redirect to login (this part will be handled in the component)
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
