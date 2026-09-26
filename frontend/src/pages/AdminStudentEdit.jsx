// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../api/axios";


// function AdminStudentEdit() {

//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [courses, setCourses] = useState([]);
//     const [departments, setDepartments] = useState([]);

//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         course: "",
//         department: "",
//         admission_year: "",
//         is_existing_student: false,
//     });

//     const [loading, setLoading] = useState(true);
//     const [saving, setSaving] = useState(false);
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");


//     // ========================================================
//     // LOAD DATA
//     // ========================================================

//     useEffect(() => {

//         loadStudent();
//         loadCourses();
//         loadDepartments();

//     }, [id]);


//     // ========================================================
//     // LOAD STUDENT
//     // ========================================================

//     const loadStudent = async () => {

//         try {

//             const response =
//                 await api.get(`students/${id}/`);

//             console.log(
//                 "Student:",
//                 response.data
//             );

//             const student = response.data;

//             setFormData({
//                 name: student.name || "",
//                 email: student.email || "",
//                 phone: student.phone || "",
//                 course: student.course || "",
//                 department: student.department || "",
//                 admission_year:
//                     student.admission_year || "",
//                 is_existing_student:
//                     student.is_existing_student || false,
//             });

//         } catch (error) {

//             console.log(
//                 "Student error:",
//                 error.response?.data
//             );

//             setError(
//                 "Unable to load student."
//             );

//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // LOAD COURSES
//     // ========================================================

//     const loadCourses = async () => {

//         try {

//             const response =
//                 await api.get("courses/");

//             console.log(
//                 "Courses:",
//                 response.data
//             );

//             const data =
//                 response.data.results ||
//                 response.data;

//             setCourses(data);

//         } catch (error) {

//             console.log(
//                 "Courses error:",
//                 error.response?.data
//             );

//         }

//     };


//     // ========================================================
//     // LOAD DEPARTMENTS
//     // ========================================================

//     const loadDepartments = async () => {

//         try {

//             const response =
//                 await api.get("departments/");

//             console.log(
//                 "Departments:",
//                 response.data
//             );

//             const data =
//                 response.data.results ||
//                 response.data;

//             setDepartments(data);

//         } catch (error) {

//             console.log(
//                 "Departments error:",
//                 error.response?.data
//             );

//         }

//     };


//     // ========================================================
//     // HANDLE CHANGE
//     // ========================================================

//     const handleChange = (e) => {

//         const {
//             name,
//             value,
//             type,
//             checked
//         } = e.target;

//         setFormData((previous) => ({
//             ...previous,
//             [name]:
//                 type === "checkbox"
//                     ? checked
//                     : value
//         }));

//     };


//     // ========================================================
//     // UPDATE STUDENT
//     // ========================================================

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         setError("");
//         setSuccess("");
//         setSaving(true);


//         try {

//             const data = {

//                 name:
//                     formData.name.trim(),

//                 email:
//                     formData.email.trim(),

//                 phone:
//                     formData.phone.trim(),

//                 course:
//                     Number(formData.course),

//                 department:
//                     Number(formData.department),

//                 admission_year:
//                     Number(formData.admission_year),

//                 is_existing_student:
//                     formData.is_existing_student,

//             };


//             console.log(
//                 "Updating student:",
//                 data
//             );


//             const response =
//                 await api.patch(
//                     `students/${id}/`,
//                     data
//                 );


//             console.log(
//                 "Updated student:",
//                 response.data
//             );


//             setSuccess(
//                 "Student updated successfully."
//             );


//             setTimeout(() => {

//                 navigate("/admin/students");

//             }, 1000);


//         } catch (error) {

//             console.log(
//                 "Update error:",
//                 error.response?.data
//             );


//             const backendError =
//                 error.response?.data;


//             if (
//                 typeof backendError === "object" &&
//                 backendError !== null
//             ) {

//                 const messages = [];


//                 Object.keys(
//                     backendError
//                 ).forEach((key) => {

//                     const value =
//                         backendError[key];


//                     if (Array.isArray(value)) {

//                         messages.push(
//                             `${key}: ${value.join(", ")}`
//                         );

//                     } else {

//                         messages.push(
//                             `${key}: ${value}`
//                         );

//                     }

//                 });


//                 setError(
//                     messages.join(" | ")
//                 );

//             } else {

//                 setError(
//                     "Unable to update student."
//                 );

//             }

//         } finally {

//             setSaving(false);

//         }

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (

//             <div>

//                 <h1>
//                     Edit Student
//                 </h1>

//                 <p>
//                     Loading student...
//                 </p>

//             </div>

//         );

//     }


//     // ========================================================
//     // PAGE
//     // ========================================================

//     return (

//         <div>

//             <h1>
//                 Edit Student
//             </h1>

//             <hr />


//             {error && (

//                 <p>
//                     {error}
//                 </p>

//             )}


//             {success && (

//                 <p>
//                     {success}
//                 </p>

//             )}


//             <form
//                 onSubmit={handleSubmit}
//             >


//                 {/* USERNAME */}

//                 <div>

//                     <label>
//                         Username
//                     </label>

//                     <br />

//                     <input
//                         type="text"
//                         value={
//                             formData.username ||
//                             "Username cannot be changed"
//                         }
//                         disabled
//                     />

//                 </div>

//                 <br />


//                 {/* NAME */}

//                 <div>

//                     <label>
//                         Student Name
//                     </label>

//                     <br />

//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
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
//                         required
//                     />

//                 </div>

//                 <br />


//                 {/* PHONE */}

//                 <div>

//                     <label>
//                         Phone
//                     </label>

//                     <br />

//                     <input
//                         type="text"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         required
//                     />

//                 </div>

//                 <br />


//                 {/* COURSE */}

//                 <div>

//                     <label>
//                         Course
//                     </label>

//                     <br />

//                     <select
//                         name="course"
//                         value={formData.course}
//                         onChange={handleChange}
//                         required
//                     >

//                         <option value="">
//                             Select Course
//                         </option>


//                         {courses.map((course) => (

//                             <option
//                                 key={course.id}
//                                 value={course.id}
//                             >

//                                 {course.name}

//                             </option>

//                         ))}

//                     </select>

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
//                         required
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


//                 {/* ADMISSION YEAR */}

//                 <div>

//                     <label>
//                         Admission Year
//                     </label>

//                     <br />

//                     <input
//                         type="number"
//                         name="admission_year"
//                         value={
//                             formData.admission_year
//                         }
//                         onChange={handleChange}
//                         required
//                     />

//                 </div>

//                 <br />


//                 {/* EXISTING STUDENT */}

//                 <div>

//                     <label>

//                         <input
//                             type="checkbox"
//                             name="is_existing_student"
//                             checked={
//                                 formData.is_existing_student
//                             }
//                             onChange={handleChange}
//                         />

//                         {" "}
//                         Existing Student

//                     </label>

//                 </div>

//                 <br />


//                 {/* UPDATE */}

//                 <button
//                     type="submit"
//                     disabled={saving}
//                 >

//                     {saving
//                         ? "Updating..."
//                         : "Update Student"
//                     }

//                 </button>


//                 {" "}


//                 {/* CANCEL */}

//                 <button
//                     type="button"
//                     onClick={() =>
//                         navigate("/admin/students")
//                     }
//                 >

//                     Cancel

//                 </button>

//             </form>

//         </div>

//     );

// }


// export default AdminStudentEdit;



import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";


function AdminStudentEdit() {

    const { id } = useParams();

    const navigate = useNavigate();


    // ========================================================
    // OPTIONS
    // ========================================================

    const [courses, setCourses] = useState([]);
    const [departments, setDepartments] = useState([]);


    // ========================================================
    // FORM DATA
    // ========================================================

    const [formData, setFormData] = useState({
        username: "",
        name: "",
        email: "",
        phone: "",
        course: "",
        department: "",
        admission_year: "",
        is_existing_student: false
    });


    // ========================================================
    // UI STATE
    // ========================================================

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // ========================================================
    // LOAD DATA
    // ========================================================

    useEffect(() => {

        loadStudent();
        loadCourses();
        loadDepartments();

    }, [id]);


    // ========================================================
    // LOAD STUDENT
    // ========================================================

    const loadStudent = async () => {

        try {

            const response =
                await api.get(
                    `students/${id}/`
                );


            console.log(
                "Student:",
                response.data
            );


            const student =
                response.data;


            setFormData({

                username:
                    student.username || "",

                name:
                    student.name || "",

                email:
                    student.email || "",

                phone:
                    student.phone || "",

                course:
                    student.course || "",

                department:
                    student.department || "",

                admission_year:
                    student.admission_year || "",

                is_existing_student:
                    student.is_existing_student || false

            });

        } catch (error) {

            console.log(
                "Student error:",
                error.response?.data
            );

            setError(
                "Unable to load student."
            );

        } finally {

            setLoading(false);

        }
    };


    // ========================================================
    // LOAD COURSES
    // ========================================================

    const loadCourses = async () => {

        try {

            const response =
                await api.get(
                    "courses/"
                );


            console.log(
                "Courses:",
                response.data
            );


            const data =
                response.data.results ||
                response.data;


            setCourses(data);

        } catch (error) {

            console.log(
                "Courses error:",
                error.response?.data
            );

        }
    };


    // ========================================================
    // LOAD DEPARTMENTS
    // ========================================================

    const loadDepartments = async () => {

        try {

            const response =
                await api.get(
                    "departments/"
                );


            console.log(
                "Departments:",
                response.data
            );


            const data =
                response.data.results ||
                response.data;


            setDepartments(data);

        } catch (error) {

            console.log(
                "Departments error:",
                error.response?.data
            );

        }
    };


    // ========================================================
    // HANDLE INPUT
    // ========================================================

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;


        setFormData((previous) => ({
            ...previous,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));

    };


    // ========================================================
    // UPDATE STUDENT
    // ========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");
        setSaving(true);


        try {

            const data = {

                name:
                    formData.name.trim(),

                email:
                    formData.email.trim(),

                phone:
                    formData.phone.trim(),

                course:
                    Number(formData.course),

                department:
                    Number(formData.department),

                admission_year:
                    Number(formData.admission_year),

                is_existing_student:
                    formData.is_existing_student

            };


            console.log(
                "Updating student:",
                data
            );


            const response =
                await api.patch(
                    `students/${id}/`,
                    data
                );


            console.log(
                "Updated student:",
                response.data
            );


            setSuccess(
                "Student updated successfully."
            );


            // =================================================
            // REDIRECT
            // =================================================

            setTimeout(() => {

                navigate("/admin/students");

            }, 1000);


        } catch (error) {

            console.log(
                "Update error:",
                error.response?.data
            );


            const backendError =
                error.response?.data;


            if (
                typeof backendError === "object" &&
                backendError !== null
            ) {

                const messages = [];


                Object.keys(
                    backendError
                ).forEach((key) => {

                    const value =
                        backendError[key];


                    if (Array.isArray(value)) {

                        messages.push(
                            `${key}: ${value.join(", ")}`
                        );

                    } else {

                        messages.push(
                            `${key}: ${value}`
                        );

                    }

                });


                setError(
                    messages.join(" | ")
                );

            } else {

                setError(
                    "Unable to update student."
                );

            }

        } finally {

            setSaving(false);

        }
    };


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (

            <div className="admin-page admin-student-edit-page">

                <div className="admin-page-header">

                    <h1>
                        Edit Student
                    </h1>

                </div>

                <div className="admin-loading-state">
                    Loading student...
                </div>

            </div>
        );
    }


    // ========================================================
    // RENDER
    // ========================================================

    return (

        <div className="admin-page admin-student-edit-page">

            {/* ================================================= */}
            {/* PAGE HEADER */}
            {/* ================================================= */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Edit Student
                    </h1>

                    <p>
                        Update student information.
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
                            placeholder="Username cannot be changed"
                            disabled
                        />

                    </div>


                    {/* ========================================= */}
                    {/* NAME */}
                    {/* ========================================= */}

                    <div className="admin-form-group">

                        <label htmlFor="name">
                            Student Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
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
                            required
                        />

                    </div>


                    {/* ========================================= */}
                    {/* PHONE */}
                    {/* ========================================= */}

                    <div className="admin-form-group">

                        <label htmlFor="phone">
                            Phone
                        </label>

                        <input
                            id="phone"
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* ========================================= */}
                    {/* COURSE */}
                    {/* ========================================= */}

                    <div className="admin-form-group">

                        <label htmlFor="course">
                            Course
                        </label>

                        <select
                            id="course"
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Course
                            </option>


                            {courses.map((course) => (

                                <option
                                    key={course.id}
                                    value={course.id}
                                >
                                    {course.name}
                                </option>

                            ))}

                        </select>

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
                            required
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
                    {/* ADMISSION YEAR */}
                    {/* ========================================= */}

                    <div className="admin-form-group">

                        <label htmlFor="admission_year">
                            Admission Year
                        </label>

                        <input
                            id="admission_year"
                            type="number"
                            name="admission_year"
                            value={formData.admission_year}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* ========================================= */}
                    {/* EXISTING STUDENT */}
                    {/* ========================================= */}

                    <div className="admin-checkbox-group">

                        <label>

                            <input
                                type="checkbox"
                                name="is_existing_student"
                                checked={
                                    formData.is_existing_student
                                }
                                onChange={handleChange}
                            />

                            <span>
                                Existing Student
                            </span>

                        </label>

                    </div>


                    {/* ========================================= */}
                    {/* ACTIONS */}
                    {/* ========================================= */}

                    <div className="admin-form-actions">

                        <button
                            type="submit"
                            className="admin-primary-btn"
                            disabled={saving}
                        >
                            {saving
                                ? "Updating..."
                                : "Update Student"}
                        </button>


                        <button
                            type="button"
                            className="admin-secondary-btn"
                            onClick={() =>
                                navigate("/admin/students")
                            }
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </section>

        </div>
    );
}


export default AdminStudentEdit;