
import axios from "axios";

// ============================================================
// API BASE URL
// ============================================================

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "https://college-management-system-4e5u.onrender.com/api/";

// ============================================================
// AXIOS INSTANCE
// ============================================================

const api = axios.create({
    baseURL: API_BASE_URL,
});

// ============================================================
// REQUEST INTERCEPTOR
// ============================================================

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access");

        // Add JWT access token
        if (
            accessToken &&
            !config.url?.includes("login/") &&
            !config.url?.includes("token/refresh/")
        ) {
            config.headers = config.headers || {};

            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        // FormData upload:
        // Let Axios/browser set multipart boundary automatically.
        if (
            typeof FormData !== "undefined" &&
            config.data instanceof FormData
        ) {
            if (config.headers?.delete) {
                config.headers.delete("Content-Type");
            }

            delete config.headers["Content-Type"];
            delete config.headers["content-type"];
        } else if (config.data != null) {
            // JSON requests
            config.headers = config.headers || {};

            if (config.headers.set) {
                config.headers.set(
                    "Content-Type",
                    "application/json"
                );
            } else {
                config.headers["Content-Type"] =
                    "application/json";
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ============================================================
// RESPONSE INTERCEPTOR
// ============================================================

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        // Only handle 401 Unauthorized responses
        if (
            error.response?.status !== 401 ||
            originalRequest._retry ||
            originalRequest.url?.includes("login/") ||
            originalRequest.url?.includes("token/refresh/")
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("refresh");

        if (!refreshToken) {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");

            window.location.href = "/";

            return Promise.reject(error);
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}token/refresh/`,
                {
                    refresh: refreshToken,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const newAccessToken = response.data.access;

            if (!newAccessToken) {
                throw new Error(
                    "Access token missing from refresh response."
                );
            }

            localStorage.setItem("access", newAccessToken);

            originalRequest.headers =
                originalRequest.headers || {};

            if (originalRequest.headers.set) {
                originalRequest.headers.set(
                    "Authorization",
                    `Bearer ${newAccessToken}`
                );
            } else {
                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;
            }

            // Retry original request with refreshed token
            // Request interceptor will preserve FormData handling
            return api(originalRequest);
        } catch (refreshError) {
            console.error(
                "Refresh token failed:",
                refreshError.response?.data ||
                    refreshError.message
            );

            localStorage.removeItem("access");
            localStorage.removeItem("refresh");

            window.location.href = "/";

            return Promise.reject(refreshError);
        }
    }
);

export default api;
