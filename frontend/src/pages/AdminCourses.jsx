// import { useEffect, useState } from "react";

// import api from "../api/axios";


// function AdminCourses() {

//     const [courses, setCourses] = useState([]);

//     const [search, setSearch] = useState("");

//     const [loading, setLoading] = useState(false);

//     const [error, setError] = useState("");


//     // ========================================================
//     // LOAD COURSES
//     // ========================================================

//     const loadCourses = async () => {

//         try {

//             setLoading(true);

//             setError("");


//             let url = "courses/";


//             if (search.trim()) {

//                 url +=
//                     `?search=${encodeURIComponent(
//                         search.trim()
//                     )}`;

//             }


//             const response =
//                 await api.get(url);


//             console.log(
//                 "Admin Courses:",
//                 response.data
//             );


//             const data =
//                 response.data.results ||
//                 response.data;


//             setCourses(data);


//         } catch (error) {

//             console.log(
//                 "Course Error:",
//                 error.response?.data
//             );


//             setError(
//                 "Unable to load courses."
//             );


//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // LOAD WHEN SEARCH CHANGES
//     // ========================================================

//     useEffect(() => {

//         loadCourses();

//     }, [search]);


//     // ========================================================
//     // ADD COURSE
//     // ========================================================

//     const handleAddCourse = () => {

//         window.location.href =
//             "/admin/courses/create";

//     };


//     // ========================================================
//     // EDIT COURSE
//     // ========================================================

//     const handleEdit = (courseId) => {

//         window.location.href =
//             `/admin/courses/${courseId}/edit`;

//     };


//     // ========================================================
//     // DELETE COURSE
//     // ========================================================

//     const handleDelete = async (courseId) => {

//         const confirmDelete =
//             window.confirm(
//                 "Are you sure you want to delete this course?"
//             );


//         if (!confirmDelete) {

//             return;

//         }


//         try {

//             setLoading(true);

//             setError("");


//             await api.delete(
//                 `courses/${courseId}/`
//             );


//             alert(
//                 "Course deleted successfully."
//             );


//             await loadCourses();


//         } catch (error) {

//             console.log(
//                 "Delete Course Error:",
//                 error.response?.data
//             );


//             setError(
//                 "Unable to delete course. It may be used by other records."
//             );


//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // UI
//     // ========================================================

//     return (

//         <div>

//             <h1>
//                 Course Management
//             </h1>


//             {/* ================================================= */}
//             {/* ADD COURSE */}
//             {/* ================================================= */}

//             <button
//                 onClick={handleAddCourse}
//             >
//                 Add Course
//             </button>


//             <br />
//             <br />


//             {/* ================================================= */}
//             {/* SEARCH */}
//             {/* ================================================= */}

//             <input
//                 type="text"
//                 placeholder="Search course..."
//                 value={search}
//                 onChange={(e) =>
//                     setSearch(e.target.value)
//                 }
//             />


//             <br />
//             <br />


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
//             {/* LOADING */}
//             {/* ================================================= */}

//             {loading && (

//                 <p>
//                     Loading courses...
//                 </p>

//             )}


//             {/* ================================================= */}
//             {/* COURSE TABLE */}
//             {/* ================================================= */}

//             {!loading && (

//                 <table border="1">

//                     <thead>

//                         <tr>

//                             <th>
//                                 ID
//                             </th>

//                             <th>
//                                 Name
//                             </th>

//                             <th>
//                                 Code
//                             </th>

//                             <th>
//                                 Level
//                             </th>

//                             <th>
//                                 Duration
//                             </th>

//                             <th>
//                                 Description
//                             </th>

//                             <th>
//                                 Action
//                             </th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {courses.length === 0 ? (

//                             <tr>

//                                 <td colSpan="7">

//                                     No courses found.

//                                 </td>

//                             </tr>

//                         ) : (

//                             courses.map(
//                                 (course) => (

//                                     <tr
//                                         key={
//                                             course.id
//                                         }
//                                     >

//                                         <td>
//                                             {
//                                                 course.id
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 course.name
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 course.code
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 course.level_name ||
//                                                 course.level
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 course.duration
//                                             }{" "}
//                                             Years
//                                         </td>


//                                         <td>
//                                             {
//                                                 course.description ||
//                                                 "-"
//                                             }
//                                         </td>


//                                         <td>

//                                             {/* EDIT */}

//                                             <button
//                                                 onClick={() =>
//                                                     handleEdit(
//                                                         course.id
//                                                     )
//                                                 }
//                                             >
//                                                 Edit
//                                             </button>


//                                             {" "}


//                                             {/* DELETE */}

//                                             <button
//                                                 onClick={() =>
//                                                     handleDelete(
//                                                         course.id
//                                                     )
//                                                 }
//                                             >
//                                                 Delete
//                                             </button>

//                                         </td>

//                                     </tr>

//                                 )
//                             )

//                         )}

//                     </tbody>

//                 </table>

//             )}

//         </div>

//     );

// }


// export default AdminCourses;





import { useEffect, useState } from "react";

import api from "../api/axios";


function AdminCourses() {

    // ========================================================
    // DATA
    // ========================================================

    const [courses, setCourses] = useState([]);


    // ========================================================
    // FILTER
    // ========================================================

    const [search, setSearch] = useState("");


    // ========================================================
    // UI STATE
    // ========================================================

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // ========================================================
    // LOAD COURSES
    // ========================================================

    const loadCourses = async () => {

        try {

            setLoading(true);
            setError("");


            let url = "courses/";


            if (search.trim()) {

                url +=
                    `?search=${encodeURIComponent(
                        search.trim()
                    )}`;

            }


            const response =
                await api.get(url);


            console.log(
                "Admin Courses:",
                response.data
            );


            const data =
                response.data.results ||
                response.data;


            setCourses(data);

        } catch (error) {

            console.log(
                "Course Error:",
                error.response?.data
            );

            setError(
                "Unable to load courses."
            );

        } finally {

            setLoading(false);

        }
    };


    // ========================================================
    // LOAD WHEN SEARCH CHANGES
    // ========================================================

    useEffect(() => {

        loadCourses();

    }, [search]);


    // ========================================================
    // ADD COURSE
    // ========================================================

    const handleAddCourse = () => {

        window.location.href =
            "/admin/courses/create";

    };


    // ========================================================
    // EDIT COURSE
    // ========================================================

    const handleEdit = (courseId) => {

        window.location.href =
            `/admin/courses/${courseId}/edit`;

    };


    // ========================================================
    // DELETE COURSE
    // ========================================================

    const handleDelete = async (courseId) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this course?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            setLoading(true);
            setError("");


            await api.delete(
                `courses/${courseId}/`
            );


            alert(
                "Course deleted successfully."
            );


            await loadCourses();

        } catch (error) {

            console.log(
                "Delete Course Error:",
                error.response?.data
            );


            setError(
                "Unable to delete course. It may be used by other records."
            );

        } finally {

            setLoading(false);

        }
    };


    // ========================================================
    // RENDER
    // ========================================================

    return (

        <div className="admin-page admin-courses-page">

            {/* ================================================= */}
            {/* PAGE HEADER */}
            {/* ================================================= */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Course Management
                    </h1>

                    <p>
                        Manage courses and course information.
                    </p>

                </div>


                <button
                    type="button"
                    className="admin-primary-btn"
                    onClick={handleAddCourse}
                >
                    Add Course
                </button>

            </div>


            {/* ================================================= */}
            {/* SEARCH */}
            {/* ================================================= */}

            <div className="admin-toolbar">

                <div className="admin-form-group">

                    <label htmlFor="course-search">
                        Search Course
                    </label>

                    <input
                        id="course-search"
                        type="text"
                        placeholder="Search course..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

            </div>


            {/* ================================================= */}
            {/* ERROR */}
            {/* ================================================= */}

            {error && (

                <div className="admin-alert admin-alert-error">
                    {error}
                </div>

            )}


            {/* ================================================= */}
            {/* LOADING */}
            {/* ================================================= */}

            {loading && (

                <div className="admin-loading-state">
                    Loading courses...
                </div>

            )}


            {/* ================================================= */}
            {/* TABLE */}
            {/* ================================================= */}

            {!loading && (

                <div className="admin-table-card">

                    <div className="admin-table-wrapper">

                        <table className="admin-table">

                            <thead>

                                <tr>

                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Code</th>
                                    <th>Level</th>
                                    <th>Duration</th>
                                    <th>Description</th>
                                    <th>Action</th>

                                </tr>

                            </thead>


                            <tbody>

                                {courses.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="admin-empty-cell"
                                        >
                                            No courses found.
                                        </td>

                                    </tr>

                                ) : (

                                    courses.map(
                                        (course) => (

                                            <tr
                                                key={course.id}
                                            >

                                                <td>
                                                    {course.id}
                                                </td>


                                                <td>
                                                    {course.name}
                                                </td>


                                                <td>
                                                    {course.code}
                                                </td>


                                                <td>
                                                    {
                                                        course.level_name ||
                                                        course.level
                                                    }
                                                </td>


                                                <td>
                                                    {course.duration} Years
                                                </td>


                                                <td>
                                                    {
                                                        course.description ||
                                                        "-"
                                                    }
                                                </td>


                                                <td>

                                                    <div className="admin-action-group">

                                                        <button
                                                            type="button"
                                                            className="admin-secondary-btn"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    course.id
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>


                                                        <button
                                                            type="button"
                                                            className="admin-danger-btn"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    course.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}

        </div>
    );
}


export default AdminCourses;