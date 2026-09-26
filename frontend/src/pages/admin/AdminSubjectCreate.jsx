// import { useEffect, useState } from "react";

// import api from "../../api/axios";


// function AdminSubjectCreate() {

//     const [courses, setCourses] = useState([]);

//     const [departments, setDepartments] = useState([]);

//     const [formData, setFormData] = useState({
//         name: "",
//         code: "",
//         course: "",
//         department: "",
//         year: ""
//     });

//     const [loading, setLoading] = useState(false);

//     const [pageLoading, setPageLoading] = useState(true);

//     const [error, setError] = useState("");


//     // ========================================================
//     // LOAD COURSES + DEPARTMENTS
//     // ========================================================

//     useEffect(() => {

//         const loadData = async () => {

//             try {

//                 const [
//                     coursesResponse,
//                     departmentsResponse
//                 ] = await Promise.all([

//                     api.get("courses/"),

//                     api.get("departments/")

//                 ]);


//                 setCourses(
//                     coursesResponse.data.results ||
//                     coursesResponse.data
//                 );


//                 setDepartments(
//                     departmentsResponse.data.results ||
//                     departmentsResponse.data
//                 );


//             } catch (error) {

//                 console.log(
//                     "Subject Create Load Error:",
//                     error.response?.data
//                 );


//                 setError(
//                     "Unable to load courses or departments."
//                 );


//             } finally {

//                 setPageLoading(false);

//             }

//         };


//         loadData();

//     }, []);


//     // ========================================================
//     // HANDLE CHANGE
//     // ========================================================

//     const handleChange = (e) => {

//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });

//     };


//     // ========================================================
//     // CREATE SUBJECT
//     // ========================================================

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         setError("");


//         if (!formData.name.trim()) {

//             setError(
//                 "Subject name is required."
//             );

//             return;

//         }


//         if (!formData.code.trim()) {

//             setError(
//                 "Subject code is required."
//             );

//             return;

//         }


//         if (!formData.course) {

//             setError(
//                 "Please select a course."
//             );

//             return;

//         }


//         if (!formData.department) {

//             setError(
//                 "Please select a department."
//             );

//             return;

//         }


//         if (!formData.year || Number(formData.year) <= 0) {

//             setError(
//                 "Please enter a valid year."
//             );

//             return;

//         }


//         try {

//             setLoading(true);


//             await api.post(
//                 "subjects/",
//                 {
//                     name: formData.name.trim(),

//                     code: formData.code.trim(),

//                     course: Number(formData.course),

//                     department: Number(formData.department),

//                     year: Number(formData.year)
//                 }
//             );


//             alert(
//                 "Subject created successfully."
//             );


//             window.location.href =
//                 "/admin/subjects";


//         } catch (error) {

//             console.log(
//                 "Create Subject Error:",
//                 error.response?.data
//             );


//             const backendError =
//                 error.response?.data;


//             if (backendError) {

//                 setError(
//                     JSON.stringify(
//                         backendError
//                     )
//                 );

//             } else {

//                 setError(
//                     "Unable to create subject."
//                 );

//             }


//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // PAGE LOADING
//     // ========================================================

//     if (pageLoading) {

//         return (

//             <div>

//                 <h1>
//                     Add Subject
//                 </h1>

//                 <p>
//                     Loading...
//                 </p>

//             </div>

//         );

//     }


//     // ========================================================
//     // UI
//     // ========================================================

//     return (

//         <div>

//             <h1>
//                 Add Subject
//             </h1>


//             {/* ERROR */}

//             {error && (

//                 <p
//                     style={{
//                         color: "red"
//                     }}
//                 >
//                     {error}
//                 </p>

//             )}


//             <form
//                 onSubmit={handleSubmit}
//             >


//                 {/* ================================================= */}
//                 {/* SUBJECT NAME */}
//                 {/* ================================================= */}

//                 <div>

//                     <label>
//                         Subject Name
//                     </label>

//                     <br />

//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         placeholder="Enter subject name"
//                     />

//                 </div>


//                 <br />


//                 {/* ================================================= */}
//                 {/* SUBJECT CODE */}
//                 {/* ================================================= */}

//                 <div>

//                     <label>
//                         Subject Code
//                     </label>

//                     <br />

//                     <input
//                         type="text"
//                         name="code"
//                         value={formData.code}
//                         onChange={handleChange}
//                         placeholder="Enter subject code"
//                     />

//                 </div>


//                 <br />


//                 {/* ================================================= */}
//                 {/* COURSE */}
//                 {/* ================================================= */}

//                 <div>

//                     <label>
//                         Course
//                     </label>

//                     <br />

//                     <select
//                         name="course"
//                         value={formData.course}
//                         onChange={handleChange}
//                     >

//                         <option value="">
//                             Select Course
//                         </option>


//                         {courses.map(
//                             (course) => (

//                                 <option
//                                     key={course.id}
//                                     value={course.id}
//                                 >
//                                     {course.name}
//                                 </option>

//                             )
//                         )}

//                     </select>

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


//                 {/* ================================================= */}
//                 {/* YEAR */}
//                 {/* ================================================= */}

//                 <div>

//                     <label>
//                         Year
//                     </label>

//                     <br />

//                     <input
//                         type="number"
//                         name="year"
//                         value={formData.year}
//                         onChange={handleChange}
//                         min="1"
//                         placeholder="Enter year"
//                     />

//                 </div>


//                 <br />


//                 {/* ================================================= */}
//                 {/* BUTTON */}
//                 {/* ================================================= */}

//                 <button
//                     type="submit"
//                     disabled={loading}
//                 >

//                     {loading
//                         ? "Creating..."
//                         : "Create Subject"}

//                 </button>


//                 {" "}


//                 <button
//                     type="button"
//                     onClick={() =>
//                         window.location.href =
//                             "/admin/subjects"
//                     }
//                 >

//                     Cancel

//                 </button>


//             </form>

//         </div>

//     );

// }


// export default AdminSubjectCreate;






import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";


function AdminSubjectCreate() {

    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        code: "",
        course: "",
        department: "",
        year: ""
    });

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    const [error, setError] = useState("");


    // ========================================================
    // LOAD COURSES + DEPARTMENTS
    // ========================================================

    useEffect(() => {

        const loadData = async () => {

            try {

                const [
                    coursesResponse,
                    departmentsResponse
                ] = await Promise.all([

                    api.get("courses/"),
                    api.get("departments/")

                ]);

                setCourses(
                    coursesResponse.data.results ||
                    coursesResponse.data
                );

                setDepartments(
                    departmentsResponse.data.results ||
                    departmentsResponse.data
                );

            } catch (error) {

                console.log(
                    "Subject Create Load Error:",
                    error.response?.data
                );

                setError(
                    "Unable to load courses or departments."
                );

            } finally {

                setPageLoading(false);

            }

        };

        loadData();

    }, []);


    // ========================================================
    // HANDLE CHANGE
    // ========================================================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    // ========================================================
    // CREATE SUBJECT
    // ========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        if (!formData.name.trim()) {

            setError(
                "Subject name is required."
            );

            return;

        }


        if (!formData.code.trim()) {

            setError(
                "Subject code is required."
            );

            return;

        }


        if (!formData.course) {

            setError(
                "Please select a course."
            );

            return;

        }


        if (!formData.department) {

            setError(
                "Please select a department."
            );

            return;

        }


        if (
            !formData.year ||
            Number(formData.year) <= 0
        ) {

            setError(
                "Please enter a valid year."
            );

            return;

        }


        try {

            setLoading(true);

            await api.post(
                "subjects/",
                {
                    name: formData.name.trim(),
                    code: formData.code.trim(),
                    course: Number(formData.course),
                    department: Number(formData.department),
                    year: Number(formData.year)
                }
            );

            alert(
                "Subject created successfully."
            );

            navigate("/admin/subjects");

        } catch (error) {

            console.log(
                "Create Subject Error:",
                error.response?.data
            );

            const backendError =
                error.response?.data;

            if (backendError) {

                setError(
                    JSON.stringify(backendError)
                );

            } else {

                setError(
                    "Unable to create subject."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // PAGE LOADING
    // ========================================================

    if (pageLoading) {

        return (

            <div className="admin-page admin-subject-create-page">

                <div className="admin-page-header">

                    <h1>
                        Add Subject
                    </h1>

                </div>

                <div className="admin-loading-state">
                    Loading...
                </div>

            </div>

        );

    }


    // ========================================================
    // UI
    // ========================================================

    return (

        <div className="admin-page admin-subject-create-page">

            {/* PAGE HEADER */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Add Subject
                    </h1>

                    <p>
                        Create a new subject.
                    </p>

                </div>

            </div>


            {/* ERROR */}

            {error && (

                <div className="admin-alert admin-alert-error">
                    {error}
                </div>

            )}


            {/* FORM */}

            <div className="admin-form-card">

                <form onSubmit={handleSubmit}>

                    <div className="admin-form-grid">

                        {/* SUBJECT NAME */}

                        <div className="admin-form-group">

                            <label>
                                Subject Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter subject name"
                            />

                        </div>


                        {/* SUBJECT CODE */}

                        <div className="admin-form-group">

                            <label>
                                Subject Code
                            </label>

                            <input
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                placeholder="Enter subject code"
                            />

                        </div>


                        {/* COURSE */}

                        <div className="admin-form-group">

                            <label>
                                Course
                            </label>

                            <select
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Course
                                </option>

                                {courses.map(
                                    (course) => (

                                        <option
                                            key={course.id}
                                            value={course.id}
                                        >
                                            {course.name}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* DEPARTMENT */}

                        <div className="admin-form-group">

                            <label>
                                Department
                            </label>

                            <select
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


                        {/* YEAR */}

                        <div className="admin-form-group">

                            <label>
                                Year
                            </label>

                            <input
                                type="number"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                min="1"
                                placeholder="Enter year"
                            />

                        </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="admin-form-actions">

                        <button
                            type="submit"
                            className="admin-primary-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating..."
                                : "Create Subject"}
                        </button>

                        <button
                            type="button"
                            className="admin-secondary-btn"
                            onClick={() =>
                                navigate("/admin/subjects")
                            }
                            disabled={loading}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}


export default AdminSubjectCreate;