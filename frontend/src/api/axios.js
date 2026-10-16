import axios from "axios";

// ============================================================
// API BASE URL
// ============================================================

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "https://college-management-system-4e5u.onrender.com/api/";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// ============================================================
// REQUEST INTERCEPTOR
// ============================================================

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access");

        if (
            accessToken &&
            !config.url?.includes("login/") &&
            !config.url?.includes("token/refresh/")
        ) {
            config.headers = config.headers || {};

            config.headers.Authorization =
                `Bearer ${accessToken}`;
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

            originalRequest.headers.Authorization =
                `Bearer ${newAccessToken}`;

            // Retry the original API request
            return api(originalRequest);
        } catch (refreshError) {
            console.error(
                "Refresh token failed:",
                refreshError.response?.data || refreshError.message
            );

            localStorage.removeItem("access");
            localStorage.removeItem("refresh");

            window.location.href = "/";

            return Promise.reject(refreshError);
        }
    }
);

export default api;
