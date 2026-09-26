import axios from "axios";


const API_BASE_URL =
    "http://127.0.0.1:8000/api/";


const api = axios.create({

    baseURL: API_BASE_URL,

});


// ============================================================
// REQUEST INTERCEPTOR
// ============================================================

api.interceptors.request.use(

    (config) => {

        const accessToken =
            localStorage.getItem("access");


        // ----------------------------------------------------
        // Attach access token
        // ----------------------------------------------------

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

    (error) => {

        return Promise.reject(error);

    }

);


// ============================================================
// RESPONSE INTERCEPTOR
// ============================================================

api.interceptors.response.use(

    (response) => {

        return response;

    },


    async (error) => {

        const originalRequest =
            error.config;


        // ====================================================
        // REQUEST / CONFIG CHECK
        // ====================================================

        if (!originalRequest) {

            return Promise.reject(error);

        }


        // ====================================================
        // ONLY HANDLE 401
        // ====================================================

        if (
            error.response?.status !== 401 ||
            originalRequest._retry ||
            originalRequest.url?.includes("login/") ||
            originalRequest.url?.includes("token/refresh/")
        ) {

            return Promise.reject(error);

        }


        originalRequest._retry = true;


        // ====================================================
        // GET REFRESH TOKEN
        // ====================================================

        const refreshToken =
            localStorage.getItem("refresh");


        if (!refreshToken) {

            localStorage.removeItem("access");
            localStorage.removeItem("refresh");

            window.location.href = "/";

            return Promise.reject(error);

        }


        // ====================================================
        // REFRESH ACCESS TOKEN
        // ====================================================

        try {

            const response = await axios.post(

                `${API_BASE_URL}token/refresh/`,

                {
                    refresh: refreshToken
                }

            );


            const newAccessToken =
                response.data.access;


            // ------------------------------------------------
            // Save new access token
            // ------------------------------------------------

            localStorage.setItem(
                "access",
                newAccessToken
            );


            // ------------------------------------------------
            // Attach new token
            // ------------------------------------------------

            originalRequest.headers =
                originalRequest.headers || {};


            originalRequest.headers.Authorization =
                `Bearer ${newAccessToken}`;


            // ------------------------------------------------
            // Retry original request
            // ------------------------------------------------

            return api(
                originalRequest
            );

        }

        catch (refreshError) {

            console.error(
                "Refresh token failed:",
                refreshError
            );


            // ------------------------------------------------
            // Clear invalid tokens
            // ------------------------------------------------

            localStorage.removeItem(
                "access"
            );

            localStorage.removeItem(
                "refresh"
            );


            // ------------------------------------------------
            // Redirect login
            // ------------------------------------------------

            window.location.href = "/";


            return Promise.reject(
                refreshError
            );

        }

    }

);


export default api;
