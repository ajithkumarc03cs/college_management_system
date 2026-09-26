// import { useEffect, useState } from "react";

// import { useNavigate, useParams } from "react-router-dom";

// import api from "../api/axios";


// function AdminStaffEdit() {

//     const { id } = useParams();

//     const navigate = useNavigate();


//     const [departments, setDepartments] = useState([]);

//     const [formData, setFormData] = useState({
//         username: "",
//         email: "",
//         department: ""
//     });


//     const [loading, setLoading] = useState(false);

//     const [error, setError] = useState("");

//     const [success, setSuccess] = useState("");


//     // ========================================================
//     // LOAD STAFF + DEPARTMENTS
//     // ========================================================

//     useEffect(() => {

//         loadStaff();

//         loadDepartments();

//     }, [id]);


//     // ========================================================
//     // LOAD STAFF
//     // ========================================================

//     const loadStaff = async () => {

//         try {

//             setError("");


//             const response =
//                 await api.get("admin/staff/");


//             const data =
//                 response.data.results ||
//                 response.data;


//             const selectedStaff =
//                 data.find(
//                     (member) =>
//                         Number(member.id) === Number(id)
//                 );


//             if (!selectedStaff) {

//                 setError(
//                     "Staff not found."
//                 );

//                 return;
//             }


//             setFormData({

//                 username:
//                     selectedStaff.username || "",

//                 email:
//                     selectedStaff.email || "",

//                 department:
//                     selectedStaff.department_id || ""

//             });


//         } catch (error) {

//             console.log(
//                 "Load Staff Error:",
//                 error.response?.data
//             );


//             setError(
//                 "Unable to load staff."
//             );

//         }

//     };


//     // ========================================================
//     // LOAD DEPARTMENTS
//     // ========================================================

//     const loadDepartments = async () => {

//         try {

//             const response =
//                 await api.get(
//                     "departments/"
//                 );


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
//     // UPDATE STAFF
//     // ========================================================

//     const handleSubmit = async (e) => {

//         e.preventDefault();


//         setLoading(true);

//         setError("");

//         setSuccess("");


//         if (!formData.email.trim()) {

//             setError(
//                 "Email is required."
//             );

//             setLoading(false);

//             return;
//         }


//         if (!formData.department) {

//             setError(
//                 "Please select a department."
//             );

//             setLoading(false);

//             return;
//         }


//         try {

//             const response =
//                 await api.patch(
//                     `admin/users/${id}/update/`,
//                     {
//                         email:
//                             formData.email,

//                         department:
//                             Number(
//                                 formData.department
//                             )
//                     }
//                 );


//             console.log(
//                 "Staff Updated:",
//                 response.data
//             );


//             setSuccess(
//                 "Staff updated successfully."
//             );


//         } catch (error) {

//             console.log(
//                 "Update Staff Error:",
//                 error.response?.data
//             );


//             const data =
//                 error.response?.data;


//             if (data?.email) {

//                 setError(
//                     Array.isArray(data.email)
//                         ? data.email[0]
//                         : data.email
//                 );

//             } else if (data?.department) {

//                 setError(
//                     Array.isArray(
//                         data.department
//                     )
//                         ? data.department[0]
//                         : data.department
//                 );

//             } else {

//                 setError(
//                     "Unable to update staff."
//                 );

//             }

//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // BACK
//     // ========================================================

//     const handleBack = () => {

//         navigate("/admin/staff");

//     };


//     return (

//         <div>

//             <h1>
//                 Edit Staff
//             </h1>


//             <hr />


//             {/* ================================================= */}
//             {/* ERROR */}
//             {/* ================================================= */}

//             {error && (

//                 <p
//                     style={{
//                         color: "red"
//                     }}
//                 >
//                     {error}
//                 </p>

//             )}


//             {/* ================================================= */}
//             {/* SUCCESS */}
//             {/* ================================================= */}

//             {success && (

//                 <p
//                     style={{
//                         color: "green"
//                     }}
//                 >
//                     {success}
//                 </p>

//             )}


//             <form onSubmit={handleSubmit}>


//                 {/* ================================================= */}
//                 {/* USERNAME */}
//                 {/* ================================================= */}

//                 <div>

//                     <label>
//                         Username
//                     </label>

//                     <br />

//                     <input
//                         type="text"
//                         value={
//                             formData.username
//                         }
//                         disabled
//                     />

//                 </div>


//                 <br />


//                 {/* ================================================= */}
//                 {/* EMAIL */}
//                 {/* ================================================= */}

//                 <div>

//                     <label>
//                         Email
//                     </label>

//                     <br />

//                     <input
//                         type="email"
//                         name="email"
//                         value={
//                             formData.email
//                         }
//                         onChange={
//                             handleChange
//                         }
//                     />

//                 </div>


//                 <br />


//                 {/* ================================================= */}
//                 {/* DEPARTMENT */}
//                 {/* ================================================= */}

//                 <div>

//                     <label>
//                         Department
//                     </label>

//                     <br />

//                     <select
//                         name="department"
//                         value={
//                             formData.department
//                         }
//                         onChange={
//                             handleChange
//                         }
//                     >

//                         <option value="">
//                             Select Department
//                         </option>


//                         {departments.map(
//                             (department) => (

//                                 <option
//                                     key={
//                                         department.id
//                                     }
//                                     value={
//                                         department.id
//                                     }
//                                 >
//                                     {
//                                         department.name
//                                     }
//                                 </option>

//                             )
//                         )}

//                     </select>

//                 </div>


//                 <br />


//                 {/* ================================================= */}
//                 {/* BUTTONS */}
//                 {/* ================================================= */}

//                 <button
//                     type="submit"
//                     disabled={loading}
//                 >
//                     {loading
//                         ? "Updating..."
//                         : "Update Staff"}
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


// export default AdminStaffEdit;


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";


function AdminStaffEdit() {

    const { id } = useParams();

    const navigate = useNavigate();


    // ========================================================
    // DATA
    // ========================================================

    const [departments, setDepartments] = useState([]);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        department: ""
    });


    // ========================================================
    // UI STATE
    // ========================================================

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // ========================================================
    // LOAD DATA
    // ========================================================

    useEffect(() => {

        loadStaff();
        loadDepartments();

    }, [id]);


    // ========================================================
    // LOAD STAFF
    // ========================================================

    const loadStaff = async () => {

        try {

            setError("");


            const response = await api.get(
                "admin/staff/"
            );


            const data =
                response.data.results ||
                response.data;


            const selectedStaff = data.find(
                (member) =>
                    Number(member.id) === Number(id)
            );


            if (!selectedStaff) {

                setError(
                    "Staff not found."
                );

                return;
            }


            setFormData({
                username:
                    selectedStaff.username || "",

                email:
                    selectedStaff.email || "",

                department:
                    selectedStaff.department_id || ""
            });


        } catch (error) {

            console.log(
                "Load Staff Error:",
                error.response?.data
            );

            setError(
                "Unable to load staff."
            );

        }
    };


    // ========================================================
    // LOAD DEPARTMENTS
    // ========================================================

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
    // UPDATE STAFF
    // ========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");


        // ====================================================
        // VALIDATION
        // ====================================================

        if (!formData.email.trim()) {

            setError(
                "Email is required."
            );

            setLoading(false);

            return;
        }


        if (!formData.department) {

            setError(
                "Please select a department."
            );

            setLoading(false);

            return;
        }


        // ====================================================
        // API REQUEST
        // ====================================================

        try {

            const response = await api.patch(
                `admin/users/${id}/update/`,
                {
                    email: formData.email,

                    department:
                        Number(formData.department)
                }
            );


            console.log(
                "Staff Updated:",
                response.data
            );


            setSuccess(
                "Staff updated successfully."
            );


        } catch (error) {

            console.log(
                "Update Staff Error:",
                error.response?.data
            );


            const data =
                error.response?.data;


            if (data?.email) {

                setError(
                    Array.isArray(data.email)
                        ? data.email[0]
                        : data.email
                );

            } else if (data?.department) {

                setError(
                    Array.isArray(data.department)
                        ? data.department[0]
                        : data.department
                );

            } else {

                setError(
                    "Unable to update staff."
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

        <div className="admin-page admin-staff-edit-page">

            {/* ================================================= */}
            {/* PAGE HEADER */}
            {/* ================================================= */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Edit Staff
                    </h1>

                    <p>
                        Update staff account details.
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
                            value={formData.username}
                            disabled
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
                                ? "Updating..."
                                : "Update Staff"}
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


export default AdminStaffEdit;