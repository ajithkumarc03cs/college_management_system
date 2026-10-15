// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import api from "../api/axios";


// function Login() {

//     const navigate = useNavigate();

//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");

//     const [error, setError] = useState("");

//     const [loading, setLoading] = useState(false);


//     // ========================================================
//     // LOGIN
//     // ========================================================

//     const handleLogin = async (e) => {

//         e.preventDefault();

//         setError("");

//         setLoading(true);


//         try {

//             const response = await api.post(
//                 "login/",
//                 {
//                     username: username,
//                     password: password
//                 }
//             );


//             console.log(
//                 "Login response:",
//                 response.data
//             );


//             // =================================================
//             // SAVE ACCESS TOKEN
//             // =================================================

//             localStorage.setItem(
//                 "access",
//                 response.data.access
//             );


//             // =================================================
//             // SAVE REFRESH TOKEN
//             // =================================================

//             localStorage.setItem(
//                 "refresh",
//                 response.data.refresh
//             );


//             // =================================================
//             // GET USER ROLE
//             // =================================================

//             const role = response.data.role;


//             console.log(
//                 "User role:",
//                 role
//             );


//             // =================================================
//             // ROLE BASED DASHBOARD
//             // =================================================

//             if (role === "Student") {

//                 navigate("/dashboard");

//             }


//             else if (role === "Staff") {

//                 navigate("/staff/dashboard");

//             }


//             else if (role === "HOD") {

//                 navigate("/hod/dashboard");

//             }


//             else if (role === "Admin") {

//                 navigate("/admin/dashboard");

//             }


//             else if (role === "Principal") {

//                 navigate("/principal/dashboard");

//             }


//             else {

//                 setError(
//                     "Invalid user role."
//                 );

//             }


//         } catch (error) {

//             console.log(
//                 "Login error:",
//                 error.response?.data
//             );


//             if (error.response?.data) {

//                 setError(
//                     error.response.data.detail ||
//                     "Invalid username or password"
//                 );

//             }

//             else {

//                 setError(
//                     "Unable to connect to server"
//                 );

//             }

//         }

//         finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // LOGIN PAGE
//     // ========================================================

//     return (

//         <div>

//             <h1>
//                 College Management System
//             </h1>


//             <h2>
//                 Login
//             </h2>


//             {/* =================================================
//                 ERROR MESSAGE
//             ================================================= */}

//             {error && (

//                 <p>
//                     {error}
//                 </p>

//             )}


//             {/* =================================================
//                 LOGIN FORM
//             ================================================= */}

//             <form onSubmit={handleLogin}>


//                 {/* =============================================
//                     USERNAME
//                 ============================================= */}

//                 <div>

//                     <label>
//                         Username
//                     </label>

//                     <br />

//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) =>
//                             setUsername(e.target.value)
//                         }
//                         required
//                     />

//                 </div>


//                 <br />


//                 {/* =============================================
//                     PASSWORD
//                 ============================================= */}

//                 <div>

//                     <label>
//                         Password
//                     </label>

//                     <br />

//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) =>
//                             setPassword(e.target.value)
//                         }
//                         required
//                     />

//                 </div>


//                 <br />


//                 {/* =============================================
//                     LOGIN BUTTON
//                 ============================================= */}

//                 <button
//                     type="submit"
//                     disabled={loading}
//                 >

//                     {loading
//                         ? "Logging in..."
//                         : "Login"
//                     }

//                 </button>


//             </form>

//         </div>

//     );

// }


// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [role, setRole] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await api.post("login/", {
                username,
                password,
                role,
            });

            // Backend returns the actual authenticated role
            const actualRole = response.data.role;

            if (
                !actualRole ||
                actualRole.toLowerCase() !== role.toLowerCase()
            ) {
                setError(
                    "Selected role does not match your account role."
                );
                return;
            }

            // Store tokens only after role verification
            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);

            const roleRoutes = {
                student: "/dashboard",
                staff: "/staff/dashboard",
                hod: "/hod/dashboard",
                admin: "/admin/dashboard",
                principal: "/principal/dashboard",
            };

            navigate(roleRoutes[actualRole.toLowerCase()]);
        } catch (error) {
            console.log("Login error:", error.response?.data);

            if (error.response?.data) {
                setError(
                    error.response.data.detail ||
                    error.response.data.non_field_errors?.[0] ||
                    "Invalid username, password, or role."
                );
            } else {
                setError("Unable to connect to server.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">

                <div className="login-icon">🎓</div>

                <h1>College Portal</h1>

                <p className="login-subtitle">
                    College Management System
                </p>

                <div className="login-divider"></div>

                <h2>Welcome Back!</h2>

                <p className="login-description">
                    Sign in to access your account
                </p>

                {error && (
                    <div className="login-error" role="alert">
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>

                    {/* Select Role */}
                    <div className="form-group">
                        <label htmlFor="role">
                            Login As
                        </label>

                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="">
                                Select your role
                            </option>
                            <option value="Student">Student</option>
                            <option value="Staff">Staff</option>
                            <option value="HOD">HOD</option>
                            <option value="Admin">Admin</option>
                            <option value="Principal">Principal</option>
                        </select>
                    </div>

                    {/* Username */}
                    <div className="form-group">
                        <label htmlFor="username">
                            Username
                        </label>

                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            autoComplete="username"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Sign In"}
                    </button>

                </form>

                <p className="login-footer">
                    © 2026 College Management System
                </p>

            </div>
        </div>
    );
}

export default Login;
