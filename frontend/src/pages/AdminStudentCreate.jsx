// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";


// function AdminStudentCreate() {

//     const navigate = useNavigate();

//     const [courses, setCourses] = useState([]);
//     const [departments, setDepartments] = useState([]);

//     const [formData, setFormData] = useState({
//         username: "",
//         password: "",
//         name: "",
//         email: "",
//         phone: "",
//         is_existing_student: false,
//         course: "",
//         department: "",
//         admission_year: "",
//     });

//     const [loading, setLoading] = useState(false);
//     const [loadingOptions, setLoadingOptions] = useState(true);
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");


//     // ========================================================
//     // LOAD COURSES + DEPARTMENTS
//     // ========================================================

//     useEffect(() => {

//         loadCourses();
//         loadDepartments();

//     }, []);


//     const loadCourses = async () => {

//         try {

//             const response = await api.get("courses/");

//             console.log(
//                 "Courses response:",
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

//             setError(
//                 "Unable to load courses."
//             );

//         }
//     };


//     const loadDepartments = async () => {

//         try {

//             const response =
//                 await api.get("departments/");

//             console.log(
//                 "Departments response:",
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

//             setError(
//                 "Unable to load departments."
//             );

//         } finally {

//             setLoadingOptions(false);

//         }
//     };


//     // ========================================================
//     // INPUT CHANGE
//     // ========================================================

//     const handleChange = (e) => {

//         const { name, value, type, checked } =
//             e.target;

//         setFormData((previous) => ({
//             ...previous,
//             [name]:
//                 type === "checkbox"
//                     ? checked
//                     : value
//         }));

//     };


//     // ========================================================
//     // SUBMIT
//     // ========================================================

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         setError("");
//         setSuccess("");
//         setLoading(true);


//         try {

//             const data = {

//                 username:
//                     formData.username.trim(),

//                 password:
//                     formData.password,

//                 name:
//                     formData.name.trim(),

//                 email:
//                     formData.email.trim(),

//                 phone:
//                     formData.phone.trim(),

//                 is_existing_student:
//                     formData.is_existing_student,

//                 course:
//                     Number(formData.course),

//                 department:
//                     Number(formData.department),

//                 admission_year:
//                     Number(formData.admission_year),

//             };


//             console.log(
//                 "Creating student:",
//                 data
//             );


//             const response = await api.post(
//                 "students/",
//                 data
//             );


//             console.log(
//                 "Student created:",
//                 response.data
//             );


//             setSuccess(
//                 "Student created successfully."
//             );


//             // Clear form

//             setFormData({
//                 username: "",
//                 password: "",
//                 name: "",
//                 email: "",
//                 phone: "",
//                 is_existing_student: false,
//                 course: "",
//                 department: "",
//                 admission_year: "",
//             });


//         } catch (error) {

//             console.log(
//                 "Create student error:",
//                 error.response?.data
//             );


//             const backendError =
//                 error.response?.data;


//             if (
//                 typeof backendError === "object" &&
//                 backendError !== null
//             ) {

//                 const messages = [];

//                 Object.keys(backendError).forEach(
//                     (key) => {

//                         const value =
//                             backendError[key];

//                         if (Array.isArray(value)) {

//                             messages.push(
//                                 `${key}: ${value.join(", ")}`
//                             );

//                         } else {

//                             messages.push(
//                                 `${key}: ${value}`
//                             );

//                         }

//                     }
//                 );


//                 setError(
//                     messages.join(" | ")
//                 );

//             } else {

//                 setError(
//                     "Unable to create student."
//                 );

//             }

//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loadingOptions) {

//         return (
//             <div>

//                 <h1>
//                     Add Student
//                 </h1>

//                 <p>
//                     Loading courses and departments...
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
//                 Add Student
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
//                         name="username"
//                         value={formData.username}
//                         onChange={handleChange}
//                         required
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
//                         required
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


//                 {/* BUTTON */}

//                 <button
//                     type="submit"
//                     disabled={loading}
//                 >

//                     {loading
//                         ? "Creating..."
//                         : "Create Student"
//                     }

//                 </button>


//                 {" "}


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


// export default AdminStudentCreate;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";


function AdminStudentCreate() {

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
        password: "",
        name: "",
        email: "",
        phone: "",
        is_existing_student: false,
        course: "",
        department: "",
        admission_year: ""
    });


    // ========================================================
    // UI STATE
    // ========================================================

    const [loading, setLoading] = useState(false);
    const [loadingOptions, setLoadingOptions] =
        useState(true);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // ========================================================
    // LOAD OPTIONS
    // ========================================================

    useEffect(() => {

        loadCourses();
        loadDepartments();

    }, []);


    // ========================================================
    // LOAD COURSES
    // ========================================================

    const loadCourses = async () => {

        try {

            const response =
                await api.get("courses/");


            console.log(
                "Courses response:",
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

            setError(
                "Unable to load courses."
            );

        }
    };


    // ========================================================
    // LOAD DEPARTMENTS
    // ========================================================

    const loadDepartments = async () => {

        try {

            const response =
                await api.get("departments/");


            console.log(
                "Departments response:",
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

            setError(
                "Unable to load departments."
            );

        } finally {

            setLoadingOptions(false);

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
    // CREATE STUDENT
    // ========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);


        try {

            const data = {

                username:
                    formData.username.trim(),

                password:
                    formData.password,

                name:
                    formData.name.trim(),

                email:
                    formData.email.trim(),

                phone:
                    formData.phone.trim(),

                is_existing_student:
                    formData.is_existing_student,

                course:
                    Number(formData.course),

                department:
                    Number(formData.department),

                admission_year:
                    Number(formData.admission_year)
            };


            console.log(
                "Creating student:",
                data
            );


            const response = await api.post(
                "students/",
                data
            );


            console.log(
                "Student created:",
                response.data
            );


            setSuccess(
                "Student created successfully."
            );


            // =================================================
            // RESET FORM
            // =================================================

            setFormData({
                username: "",
                password: "",
                name: "",
                email: "",
                phone: "",
                is_existing_student: false,
                course: "",
                department: "",
                admission_year: ""
            });

        } catch (error) {

            console.log(
                "Create student error:",
                error.response?.data
            );


            const backendError =
                error.response?.data;


            if (
                typeof backendError === "object" &&
                backendError !== null
            ) {

                const messages = [];


                Object.keys(backendError).forEach(
                    (key) => {

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

                    }
                );


                setError(
                    messages.join(" | ")
                );

            } else {

                setError(
                    "Unable to create student."
                );

            }

        } finally {

            setLoading(false);

        }
    };


    // ========================================================
    // LOADING OPTIONS
    // ========================================================

    if (loadingOptions) {

        return (

            <div className="admin-page admin-student-create-page">

                <div className="admin-page-header">

                    <h1>
                        Add Student
                    </h1>

                </div>

                <div className="admin-loading-state">
                    Loading courses and departments...
                </div>

            </div>
        );
    }


    // ========================================================
    // RENDER
    // ========================================================

    return (

        <div className="admin-page admin-student-create-page">

            {/* ================================================= */}
            {/* PAGE HEADER */}
            {/* ================================================= */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Add Student
                    </h1>

                    <p>
                        Create a new student account.
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
                            required
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
                            required
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
                            disabled={loading}
                        >
                            {loading
                                ? "Creating..."
                                : "Create Student"}
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


export default AdminStudentCreate;