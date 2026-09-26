// import { useEffect, useState } from "react";

// import api from "../../api/axios";


// function PrincipalCourses() {

//     // ========================================================
//     // DATA
//     // ========================================================

//     const [courses, setCourses] = useState([]);

//     // ========================================================
//     // FILTER
//     // ========================================================

//     const [search, setSearch] = useState("");

//     // ========================================================
//     // SELECTED COURSE
//     // ========================================================

//     const [selectedCourse, setSelectedCourse] =
//         useState(null);

//     // ========================================================
//     // UI
//     // ========================================================

//     const [loading, setLoading] = useState(true);

//     const [error, setError] = useState("");


//     // ========================================================
//     // LOAD COURSES
//     // ========================================================

//     useEffect(() => {

//         loadCourses();

//     }, []);


//     const loadCourses = async () => {

//         try {

//             setLoading(true);

//             setError("");


//             const response = await api.get(
//                 "principal/courses/?page_size=100"
//             );


//             console.log(
//                 "Principal Courses:",
//                 response.data
//             );


//             setCourses(
//                 response.data.results ||
//                 response.data ||
//                 []
//             );


//         } catch (error) {

//             console.error(
//                 "Principal Courses Error:",
//                 error.response?.data || error
//             );


//             setCourses([]);


//             setError(
//                 error.response?.data?.detail ||
//                 "Unable to load courses."
//             );


//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // FILTER COURSES
//     // ========================================================

//     const filteredCourses =
//         courses.filter(
//             (course) => {

//                 const searchValue =
//                     search
//                         .toLowerCase()
//                         .trim();


//                 const name =
//                     String(
//                         course.name ||
//                         ""
//                     );


//                 const code =
//                     String(
//                         course.code ||
//                         ""
//                     );


//                 const duration =
//                     String(
//                         course.duration ||
//                         ""
//                     );


//                 return (

//                     searchValue === ""

//                     ||

//                     name
//                         .toLowerCase()
//                         .includes(
//                             searchValue
//                         )

//                     ||

//                     code
//                         .toLowerCase()
//                         .includes(
//                             searchValue
//                         )

//                     ||

//                     duration
//                         .toLowerCase()
//                         .includes(
//                             searchValue
//                         )

//                 );

//             }
//         );


//     // ========================================================
//     // VIEW DETAILS
//     // ========================================================

//     const handleView = (
//         course
//     ) => {

//         setSelectedCourse(
//             course
//         );

//     };


//     // ========================================================
//     // CLOSE DETAILS
//     // ========================================================

//     const handleClose = () => {

//         setSelectedCourse(
//             null
//         );

//     };


//     // ========================================================
//     // CLEAR SEARCH
//     // ========================================================

//     const clearSearch = () => {

//         setSearch("");

//     };


//     // ========================================================
//     // REFRESH
//     // ========================================================

//     const refreshCourses = () => {

//         loadCourses();

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (

//             <div>

//                 <h1>
//                     Principal Courses
//                 </h1>

//                 <p>
//                     Loading courses...
//                 </p>

//             </div>

//         );

//     }


//     // ========================================================
//     // UI
//     // ========================================================

//     return (

//         <div>

//             {/* =================================================
//                 TITLE
//             ================================================= */}

//             <h1>
//                 Principal Courses
//             </h1>


//             {/* =================================================
//                 ERROR
//             ================================================= */}

//             {error && (

//                 <div>

//                     <p
//                         style={{
//                             color: "red"
//                         }}
//                     >
//                         {error}
//                     </p>


//                     <button
//                         type="button"
//                         onClick={
//                             refreshCourses
//                         }
//                     >
//                         Retry
//                     </button>

//                 </div>

//             )}


//             {/* =================================================
//                 SEARCH
//             ================================================= */}

//             <div>

//                 <input
//                     type="text"
//                     placeholder="Search course / code..."
//                     value={search}
//                     onChange={(e) =>
//                         setSearch(
//                             e.target.value
//                         )
//                     }
//                 />

//             </div>


//             <br />


//             {/* =================================================
//                 BUTTONS
//             ================================================= */}

//             <button
//                 type="button"
//                 onClick={
//                     clearSearch
//                 }
//             >
//                 Clear Search
//             </button>


//             {" "}


//             <button
//                 type="button"
//                 onClick={
//                     refreshCourses
//                 }
//             >
//                 Refresh
//             </button>


//             {/* =================================================
//                 COUNT
//             ================================================= */}

//             <p>

//                 Showing{" "}

//                 {
//                     filteredCourses.length
//                 }

//                 {" "}
//                 course(s)

//             </p>


//             {/* =================================================
//                 COURSE TABLE
//             ================================================= */}

//             {filteredCourses.length === 0 ? (

//                 <p>
//                     No courses found.
//                 </p>

//             ) : (

//                 <table
//                     border="1"
//                     cellPadding="8"
//                     cellSpacing="0"
//                 >

//                     <thead>

//                         <tr>

//                             <th>
//                                 ID
//                             </th>

//                             <th>
//                                 Course Name
//                             </th>

//                             <th>
//                                 Code
//                             </th>

//                             <th>
//                                 Duration
//                             </th>

//                             <th>
//                                 Action
//                             </th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {filteredCourses.map(
//                             (course) => (

//                                 <tr
//                                     key={
//                                         course.id
//                                     }
//                                 >

//                                     <td>
//                                         {
//                                             course.id
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             course.name ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             course.code ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             course.duration ??
//                                             "-"
//                                         }
//                                         {
//                                             course.duration
//                                                 ? " years"
//                                                 : ""
//                                         }
//                                     </td>


//                                     <td>

//                                         <button
//                                             type="button"
//                                             onClick={() =>
//                                                 handleView(
//                                                     course
//                                                 )
//                                             }
//                                         >
//                                             View Details
//                                         </button>

//                                     </td>

//                                 </tr>

//                             )
//                         )}

//                     </tbody>

//                 </table>

//             )}


//             {/* =================================================
//                 COURSE DETAILS
//             ================================================= */}

//             {selectedCourse && (

//                 <div>

//                     <hr />


//                     <h2>
//                         Course Details
//                     </h2>


//                     <p>

//                         <strong>
//                             ID:
//                         </strong>{" "}

//                         {
//                             selectedCourse.id
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Course Name:
//                         </strong>{" "}

//                         {
//                             selectedCourse.name ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Code:
//                         </strong>{" "}

//                         {
//                             selectedCourse.code ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Duration:
//                         </strong>{" "}

//                         {
//                             selectedCourse.duration ??
//                             "-"
//                         }

//                         {
//                             selectedCourse.duration
//                                 ? " years"
//                                 : ""
//                         }

//                     </p>


//                     <button
//                         type="button"
//                         onClick={
//                             handleClose
//                         }
//                     >
//                         Close
//                     </button>

//                 </div>

//             )}

//         </div>

//     );

// }


// export default PrincipalCourses;

import { useEffect, useState } from "react";
import api from "../../api/axios";

function PrincipalCourses() {

    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCourse, setSelectedCourse] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ========================================================
    // LOAD COURSES
    // ========================================================

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "principal/courses/?page_size=100"
            );

            console.log(
                "Principal Courses:",
                response.data
            );

            setCourses(
                response.data.results ||
                response.data ||
                []
            );

        } catch (error) {

            console.error(
                "Principal Courses Error:",
                error.response?.data || error
            );

            setCourses([]);

            setError(
                error.response?.data?.detail ||
                "Unable to load courses."
            );

        } finally {
            setLoading(false);
        }
    };

    // ========================================================
    // FILTER COURSES
    // ========================================================

    const filteredCourses = courses.filter(
        (course) => {

            const searchValue =
                search.toLowerCase().trim();

            const name = String(
                course.name || ""
            );

            const code = String(
                course.code || ""
            );

            const duration = String(
                course.duration || ""
            );

            return (
                searchValue === "" ||
                name.toLowerCase().includes(searchValue) ||
                code.toLowerCase().includes(searchValue) ||
                duration.toLowerCase().includes(searchValue)
            );
        }
    );

    // ========================================================
    // ACTIONS
    // ========================================================

    const handleView = (course) => {
        setSelectedCourse(course);
    };

    const handleClose = () => {
        setSelectedCourse(null);
    };

    const clearSearch = () => {
        setSearch("");
    };

    const refreshCourses = () => {
        loadCourses();
    };

    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {
        return (
            <div className="principal-page principal-courses-page">

                <div className="principal-state-card">

                    <div className="principal-loading-icon">
                        ⏳
                    </div>

                    <h2>
                        Principal Courses
                    </h2>

                    <p>
                        Loading courses...
                    </p>

                </div>

            </div>
        );
    }

    // ========================================================
    // UI
    // ========================================================

    return (
        <div className="principal-page principal-courses-page">

            {/* PAGE HEADER */}

            <div className="principal-page-header">

                <div>
                    <h1 className="principal-page-title">
                        Principal Courses
                    </h1>

                    <p className="principal-page-subtitle">
                        View and monitor all academic courses
                    </p>
                </div>

                <div className="principal-header-badge">
                    Courses
                </div>

            </div>

            {/* ERROR */}

            {error && (
                <div className="principal-alert principal-alert-error">

                    <span>
                        {error}
                    </span>

                    <button
                        type="button"
                        className="principal-btn principal-btn-danger principal-btn-sm"
                        onClick={refreshCourses}
                    >
                        Retry
                    </button>

                </div>
            )}

            {/* SEARCH TOOLBAR */}

            <div className="principal-toolbar principal-simple-toolbar">

                <div className="principal-field principal-field-wide">

                    <label>
                        Search Course
                    </label>

                    <input
                        type="text"
                        className="principal-input"
                        placeholder="Search course / code..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                <div className="principal-actions">

                    <button
                        type="button"
                        className="principal-btn principal-btn-secondary"
                        onClick={clearSearch}
                    >
                        Clear Search
                    </button>

                    <button
                        type="button"
                        className="principal-btn principal-btn-primary"
                        onClick={refreshCourses}
                    >
                        ↻ Refresh
                    </button>

                </div>

            </div>

            {/* COUNT */}

            <div className="principal-count">
                Showing{" "}
                <strong>
                    {filteredCourses.length}
                </strong>{" "}
                course(s)
            </div>

            {/* TABLE */}

            {filteredCourses.length === 0 ? (

                <div className="principal-state-card">

                    <div className="principal-empty-icon">
                        📚
                    </div>

                    <h3>
                        No courses found
                    </h3>

                    <p>
                        No courses match your current search.
                    </p>

                </div>

            ) : (

                <div className="principal-table-card">

                    <div className="principal-table-wrap">

                        <table className="principal-table principal-course-table">

                            <thead>

                                <tr>
                                    <th>ID</th>
                                    <th>Course Name</th>
                                    <th>Code</th>
                                    <th>Duration</th>
                                    <th>Action</th>
                                </tr>

                            </thead>

                            <tbody>

                                {filteredCourses.map(
                                    (course) => (

                                        <tr key={course.id}>

                                            <td>
                                                <span className="principal-id">
                                                    {course.id}
                                                </span>
                                            </td>

                                            <td>
                                                <strong>
                                                    {course.name || "-"}
                                                </strong>
                                            </td>

                                            <td>
                                                {course.code || "-"}
                                            </td>

                                            <td>
                                                {course.duration ?? "-"}
                                                {course.duration
                                                    ? " years"
                                                    : ""}
                                            </td>

                                            <td>

                                                <button
                                                    type="button"
                                                    className="principal-btn principal-btn-secondary principal-btn-sm"
                                                    onClick={() =>
                                                        handleView(course)
                                                    }
                                                >
                                                    View
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}

            {/* DETAILS */}

            {selectedCourse && (

                <div className="principal-detail-card">

                    <div className="principal-detail-header">

                        <div>
                            <h2>
                                Course Details
                            </h2>

                            <p>
                                Complete course information
                            </p>
                        </div>

                        <button
                            type="button"
                            className="principal-btn principal-btn-secondary"
                            onClick={handleClose}
                        >
                            Close
                        </button>

                    </div>

                    <div className="principal-detail-grid">

                        <div className="principal-detail-item">

                            <span className="principal-detail-label">
                                ID
                            </span>

                            <span className="principal-detail-value">
                                {selectedCourse.id}
                            </span>

                        </div>

                        <div className="principal-detail-item">

                            <span className="principal-detail-label">
                                Course Name
                            </span>

                            <span className="principal-detail-value">
                                {selectedCourse.name || "-"}
                            </span>

                        </div>

                        <div className="principal-detail-item">

                            <span className="principal-detail-label">
                                Code
                            </span>

                            <span className="principal-detail-value">
                                {selectedCourse.code || "-"}
                            </span>

                        </div>

                        <div className="principal-detail-item">

                            <span className="principal-detail-label">
                                Duration
                            </span>

                            <span className="principal-detail-value">
                                {selectedCourse.duration ?? "-"}
                                {selectedCourse.duration
                                    ? " years"
                                    : ""}
                            </span>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default PrincipalCourses;