// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";

// function AdminStaffCreate() {

//     const navigate = useNavigate();

//     const [departments, setDepartments] = useState([]);

//     const [formData, setFormData] = useState({
//         username: "",
//         email: "",
//         password: "",
//         department: ""
//     });

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");


//     // ========================================================
//     // LOAD DEPARTMENTS
//     // ========================================================

//     useEffect(() => {

//         loadDepartments();

//     }, []);


//     const loadDepartments = async () => {

//         try {

//             const response = await api.get(
//                 "departments/"
//             );

//             const data =
//                 response.data.results ||
//                 response.data;

//             setDepartments(data);

//         } catch (error) {

//             console.log(
//                 "Department Error:",
//                 error.response?.data
//             );

//             setError(
//                 "Unable to load departments."
//             );
//         }
//     };


//     // ========================================================
//     // HANDLE INPUT
//     // ========================================================

//     const handleChange = (e) => {

//         const { name, value } = e.target;

//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };


//     // ========================================================
//     // CREATE STAFF
//     // ========================================================

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         setError("");
//         setSuccess("");

//         if (!formData.username.trim()) {

//             setError("Username is required.");

//             return;
//         }

//         if (!formData.email.trim()) {

//             setError("Email is required.");

//             return;
//         }

//         if (!formData.password) {

//             setError("Password is required.");

//             return;
//         }

//         if (!formData.department) {

//             setError("Please select a department.");

//             return;
//         }


//         try {

//             setLoading(true);

//             const response = await api.post(
//                 "admin/staff/create/",
//                 {
//                     username: formData.username,
//                     email: formData.email,
//                     password: formData.password,
//                     department: Number(formData.department)
//                 }
//             );

//             console.log(
//                 "Staff Created:",
//                 response.data
//             );

//             setSuccess(
//                 "Staff created successfully."
//             );

//             setFormData({
//                 username: "",
//                 email: "",
//                 password: "",
//                 department: ""
//             });

//         } catch (error) {

//             console.log(
//                 "Create Staff Error:",
//                 error.response?.data
//             );

//             const data = error.response?.data;

//             if (data) {

//                 if (data.username) {
//                     setError(
//                         Array.isArray(data.username)
//                             ? data.username[0]
//                             : data.username
//                     );
//                 }

//                 else if (data.email) {
//                     setError(
//                         Array.isArray(data.email)
//                             ? data.email[0]
//                             : data.email
//                     );
//                 }

//                 else if (data.password) {
//                     setError(
//                         Array.isArray(data.password)
//                             ? data.password[0]
//                             : data.password
//                     );
//                 }

//                 else if (data.department) {
//                     setError(
//                         Array.isArray(data.department)
//                             ? data.department[0]
//                             : data.department
//                     );
//                 }

//                 else if (data.role) {
//                     setError(
//                         Array.isArray(data.role)
//                             ? data.role[0]
//                             : data.role
//                     );
//                 }

//                 else {
//                     setError(
//                         "Unable to create staff."
//                     );
//                 }

//             } else {

//                 setError(
//                     "Unable to create staff."
//                 );
//             }

//         } finally {

//             setLoading(false);
//         }
//     };


//     // ========================================================
//     // BACK TO STAFF LIST
//     // ========================================================

//     const handleBack = () => {

//         navigate("/admin/staff");
//     };


//     return (

//         <div>

//             <h1>Add Staff</h1>

//             <hr />


//             {error && (
//                 <p style={{ color: "red" }}>
//                     {error}
//                 </p>
//             )}


//             {success && (
//                 <p style={{ color: "green" }}>
//                     {success}
//                 </p>
//             )}


//             <form onSubmit={handleSubmit}>

//                 {/* USERNAME */}

//                 <div>

//                     <label>
//                         Username
//                     </label>

//                     <br />

//                     <input
//                         type="text"
//                         name="username"
//                         value={formData.username}
//                         onChange={handleChange}
//                         placeholder="Enter username"
//                     />

//                 </div>

//                 <br />


//                 {/* EMAIL */}

//                 <div>

//                     <label>
//                         Email
//                     </label>

//                     <br />

//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder="Enter email"
//                     />

//                 </div>

//                 <br />


//                 {/* PASSWORD */}

//                 <div>

//                     <label>
//                         Password
//                     </label>

//                     <br />

//                     <input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         placeholder="Enter password"
//                     />

//                 </div>

//                 <br />


//                 {/* DEPARTMENT */}

//                 <div>

//                     <label>
//                         Department
//                     </label>

//                     <br />

//                     <select
//                         name="department"
//                         value={formData.department}
//                         onChange={handleChange}
//                     >

//                         <option value="">
//                             Select Department
//                         </option>

//                         {departments.map(
//                             (department) => (

//                                 <option
//                                     key={department.id}
//                                     value={department.id}
//                                 >
//                                     {department.name}
//                                 </option>

//                             )
//                         )}

//                     </select>

//                 </div>

//                 <br />


//                 {/* BUTTONS */}

//                 <button
//                     type="submit"
//                     disabled={loading}
//                 >
//                     {loading
//                         ? "Creating..."
//                         : "Create Staff"}
//                 </button>

//                 {" "}

//                 <button
//                     type="button"
//                     onClick={handleBack}
//                 >
//                     Back
//                 </button>

//             </form>

//         </div>
//     );
// }

// export default AdminStaffCreate;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";


function AdminStaffCreate() {

    const navigate = useNavigate();


    // ========================================================
    // DATA
    // ========================================================

    const [departments, setDepartments] = useState([]);


    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        department: ""
    });


    // ========================================================
    // UI STATE
    // ========================================================

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // ========================================================
    // LOAD DEPARTMENTS
    // ========================================================

    useEffect(() => {

        loadDepartments();

    }, []);


    const loadDepartments = async () => {

        try {

            const response = await api.get(
                "departments/"
            );


            const data =
                response.data.results ||
                response.data;


            setDepartments(data);

        } catch (error) {

            console.log(
                "Department Error:",
                error.response?.data
            );

            setError(
                "Unable to load departments."
            );

        }
    };


    // ========================================================
    // HANDLE INPUT
    // ========================================================

    const handleChange = (e) => {

        const { name, value } = e.target;


        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };


    // ========================================================
    // CREATE STAFF
    // ========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        // ====================================================
        // VALIDATION
        // ====================================================

        if (!formData.username.trim()) {

            setError(
                "Username is required."
            );

            return;
        }


        if (!formData.email.trim()) {

            setError(
                "Email is required."
            );

            return;
        }


        if (!formData.password) {

            setError(
                "Password is required."
            );

            return;
        }


        if (!formData.department) {

            setError(
                "Please select a department."
            );

            return;
        }


        // ====================================================
        // API REQUEST
        // ====================================================

        try {

            setLoading(true);


            const response = await api.post(
                "admin/staff/create/",
                {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    department: Number(
                        formData.department
                    )
                }
            );


            console.log(
                "Staff Created:",
                response.data
            );


            setSuccess(
                "Staff created successfully."
            );


            // =================================================
            // RESET FORM
            // =================================================

            setFormData({
                username: "",
                email: "",
                password: "",
                department: ""
            });

        } catch (error) {

            console.log(
                "Create Staff Error:",
                error.response?.data
            );


            const data =
                error.response?.data;


            // =================================================
            // API VALIDATION ERRORS
            // =================================================

            if (data) {

                if (data.username) {

                    setError(
                        Array.isArray(data.username)
                            ? data.username[0]
                            : data.username
                    );

                }

                else if (data.email) {

                    setError(
                        Array.isArray(data.email)
                            ? data.email[0]
                            : data.email
                    );

                }

                else if (data.password) {

                    setError(
                        Array.isArray(data.password)
                            ? data.password[0]
                            : data.password
                    );

                }

                else if (data.department) {

                    setError(
                        Array.isArray(data.department)
                            ? data.department[0]
                            : data.department
                    );

                }

                else if (data.role) {

                    setError(
                        Array.isArray(data.role)
                            ? data.role[0]
                            : data.role
                    );

                }

                else {

                    setError(
                        "Unable to create staff."
                    );

                }

            } else {

                setError(
                    "Unable to create staff."
                );

            }

        } finally {

            setLoading(false);

        }
    };


    // ========================================================
    // BACK
    // ========================================================

    const handleBack = () => {

        navigate("/admin/staff");

    };


    // ========================================================
    // RENDER
    // ========================================================

    return (

        <div className="admin-page admin-staff-create-page">

            {/* ================================================= */}
            {/* PAGE HEADER */}
            {/* ================================================= */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Add Staff
                    </h1>

                    <p>
                        Create a new staff account.
                    </p>

                </div>

            </div>


            {/* ================================================= */}
            {/* ALERTS */}
            {/* ================================================= */}

            {error && (

                <div className="admin-alert admin-alert-error">
                    {error}
                </div>

            )}


            {success && (

                <div className="admin-alert admin-alert-success">
                    {success}
                </div>

            )}


            {/* ================================================= */}
            {/* FORM */}
            {/* ================================================= */}

            <section className="admin-form-card">

                <form onSubmit={handleSubmit}>

                    {/* ========================================= */}
                    {/* USERNAME */}
                    {/* ========================================= */}

                    <div className="admin-form-group">

                        <label htmlFor="username">
                            Username
                        </label>

                        <input
                            id="username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                        />

                    </div>


                    {/* ========================================= */}
                    {/* EMAIL */}
                    {/* ========================================= */}

                    <div className="admin-form-group">

                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                        />

                    </div>


                    {/* ========================================= */}
                    {/* PASSWORD */}
                    {/* ========================================= */}

                    <div className="admin-form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                        />

                    </div>


                    {/* ========================================= */}
                    {/* DEPARTMENT */}
                    {/* ========================================= */}

                    <div className="admin-form-group">

                        <label htmlFor="department">
                            Department
                        </label>

                        <select
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                        >

                            <option value="">
                                Select Department
                            </option>


                            {departments.map(
                                (department) => (

                                    <option
                                        key={department.id}
                                        value={department.id}
                                    >
                                        {department.name}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* ========================================= */}
                    {/* ACTIONS */}
                    {/* ========================================= */}

                    <div className="admin-form-actions">

                        <button
                            type="submit"
                            className="admin-primary-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating..."
                                : "Create Staff"}
                        </button>


                        <button
                            type="button"
                            className="admin-secondary-btn"
                            onClick={handleBack}
                        >
                            Back
                        </button>

                    </div>

                </form>

            </section>

        </div>
    );
}


export default AdminStaffCreate;