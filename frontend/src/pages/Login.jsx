import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";


function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    // ========================================================
    // LOGIN
    // ========================================================

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");

        setLoading(true);


        try {

            const response = await api.post(
                "login/",
                {
                    username: username,
                    password: password
                }
            );


            console.log(
                "Login response:",
                response.data
            );


            // =================================================
            // SAVE ACCESS TOKEN
            // =================================================

            localStorage.setItem(
                "access",
                response.data.access
            );


            // =================================================
            // SAVE REFRESH TOKEN
            // =================================================

            localStorage.setItem(
                "refresh",
                response.data.refresh
            );


            // =================================================
            // GET USER ROLE
            // =================================================

            const role = response.data.role;


            console.log(
                "User role:",
                role
            );


            // =================================================
            // ROLE BASED DASHBOARD
            // =================================================

            if (role === "Student") {

                navigate("/dashboard");

            }


            else if (role === "Staff") {

                navigate("/staff/dashboard");

            }


            else if (role === "HOD") {

                navigate("/hod/dashboard");

            }


            else if (role === "Admin") {

                navigate("/admin/dashboard");

            }


            else if (role === "Principal") {

                navigate("/principal/dashboard");

            }


            else {

                setError(
                    "Invalid user role."
                );

            }


        } catch (error) {

            console.log(
                "Login error:",
                error.response?.data
            );


            if (error.response?.data) {

                setError(
                    error.response.data.detail ||
                    "Invalid username or password"
                );

            }

            else {

                setError(
                    "Unable to connect to server"
                );

            }

        }

        finally {

            setLoading(false);

        }

    };


    // ========================================================
    // LOGIN PAGE
    // ========================================================

    return (

        <div>

            <h1>
                Student Management System
            </h1>


            <h2>
                Login
            </h2>


            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {error && (

                <p>
                    {error}
                </p>

            )}


            {/* =================================================
                LOGIN FORM
            ================================================= */}

            <form onSubmit={handleLogin}>


                {/* =============================================
                    USERNAME
                ============================================= */}

                <div>

                    <label>
                        Username
                    </label>

                    <br />

                    <input
                        type="text"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        required
                    />

                </div>


                <br />


                {/* =============================================
                    PASSWORD
                ============================================= */}

                <div>

                    <label>
                        Password
                    </label>

                    <br />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                </div>


                <br />


                {/* =============================================
                    LOGIN BUTTON
                ============================================= */}

                <button
                    type="submit"
                    disabled={loading}
                >

                    {loading
                        ? "Logging in..."
                        : "Login"
                    }

                </button>


            </form>

        </div>

    );

}


export default Login;