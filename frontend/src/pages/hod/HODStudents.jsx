// import { useEffect, useState } from "react";

// import api from "../../api/axios";


// function HODStudents() {

//     const [students, setStudents] = useState([]);

//     const [search, setSearch] = useState("");

//     const [courseFilter, setCourseFilter] = useState("");

//     const [yearFilter, setYearFilter] = useState("");

//     const [selectedStudent, setSelectedStudent] = useState(null);

//     const [loading, setLoading] = useState(true);

//     const [error, setError] = useState("");


//     // ========================================================
//     // LOAD STUDENTS
//     // ========================================================

//     useEffect(() => {

//         loadStudents();

//     }, []);


//     const loadStudents = async () => {

//         try {

//             setLoading(true);

//             setError("");

//             const response = await api.get(
//                 "hod/students/"
//             );

//             setStudents(
//                 response.data.results || response.data
//             );

//         } catch (error) {

//             console.error(error);

//             setError(
//                 "Failed to load students."
//             );

//         } finally {

//             setLoading(false);

//         }
//     };


//     // ========================================================
//     // COURSE OPTIONS
//     // ========================================================

//     const courseOptions = [
//         ...new Map(

//             students.map(
//                 (student) => [
//                     student.course,
//                     student.course_name
//                 ]
//             )

//         ).entries()
//     ];


//     // ========================================================
//     // YEAR OPTIONS
//     // ========================================================

//     const yearOptions = [
//         ...new Set(

//             students.map(
//                 (student) => student.current_year
//             )

//         )
//     ].sort(
//         (a, b) => a - b
//     );


//     // ========================================================
//     // FILTER STUDENTS
//     // ========================================================

//     const filteredStudents = students.filter(
//         (student) => {

//             const searchValue =
//                 search.toLowerCase().trim();


//             const matchesSearch =

//                 student.username
//                     ?.toLowerCase()
//                     .includes(searchValue)

//                 ||

//                 student.name
//                     ?.toLowerCase()
//                     .includes(searchValue)

//                 ||

//                 student.email
//                     ?.toLowerCase()
//                     .includes(searchValue)

//                 ||

//                 student.phone
//                     ?.toLowerCase()
//                     .includes(searchValue);


//             const matchesCourse =

//                 courseFilter === ""

//                 ||

//                 String(student.course)
//                     === String(courseFilter);


//             const matchesYear =

//                 yearFilter === ""

//                 ||

//                 String(student.current_year)
//                     === String(yearFilter);


//             return (

//                 matchesSearch

//                 &&

//                 matchesCourse

//                 &&

//                 matchesYear

//             );

//         }
//     );


//     // ========================================================
//     // VIEW STUDENT
//     // ========================================================

//     const handleView = (student) => {

//         setSelectedStudent(student);

//     };


//     // ========================================================
//     // CLOSE DETAILS
//     // ========================================================

//     const handleClose = () => {

//         setSelectedStudent(null);

//     };


//     // ========================================================
//     // CLEAR FILTERS
//     // ========================================================

//     const clearFilters = () => {

//         setSearch("");

//         setCourseFilter("");

//         setYearFilter("");

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (
//             <div>
//                 <h1>HOD Students</h1>

//                 <p>
//                     Loading students...
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
//                 HOD Students
//             </h1>


//             {/* =================================================
//                 ERROR
//             ================================================= */}

//             {error && (

//                 <p>
//                     {error}
//                 </p>

//             )}


//             {/* =================================================
//                 SEARCH
//             ================================================= */}

//             <div>

//                 <input

//                     type="text"

//                     placeholder="Search student..."

//                     value={search}

//                     onChange={(e) =>
//                         setSearch(
//                             e.target.value
//                         )
//                     }

//                 />

//             </div>


//             {/* =================================================
//                 COURSE FILTER
//             ================================================= */}

//             <div>

//                 <label>
//                     Course
//                 </label>


//                 <select

//                     value={courseFilter}

//                     onChange={(e) =>
//                         setCourseFilter(
//                             e.target.value
//                         )
//                     }

//                 >

//                     <option value="">
//                         All Courses
//                     </option>


//                     {courseOptions.map(
//                         ([id, name]) => (

//                             <option
//                                 key={id}
//                                 value={id}
//                             >

//                                 {name}

//                             </option>

//                         )
//                     )}

//                 </select>

//             </div>


//             {/* =================================================
//                 YEAR FILTER
//             ================================================= */}

//             <div>

//                 <label>
//                     Year
//                 </label>


//                 <select

//                     value={yearFilter}

//                     onChange={(e) =>
//                         setYearFilter(
//                             e.target.value
//                         )
//                     }

//                 >

//                     <option value="">
//                         All Years
//                     </option>


//                     {yearOptions.map(
//                         (year) => (

//                             <option
//                                 key={year}
//                                 value={year}
//                             >

//                                 Year {year}

//                             </option>

//                         )
//                     )}

//                 </select>

//             </div>


//             {/* =================================================
//                 CLEAR FILTER
//             ================================================= */}

//             <div>

//                 <button
//                     type="button"
//                     onClick={clearFilters}
//                 >
//                     Clear Filters
//                 </button>

//             </div>


//             {/* =================================================
//                 RESULT COUNT
//             ================================================= */}

//             <p>

//                 Showing{" "}
//                 {filteredStudents.length}
//                 {" "}student(s)

//             </p>


//             {/* =================================================
//                 STUDENT TABLE
//             ================================================= */}

//             <table>

//                 <thead>

//                     <tr>

//                         <th>
//                             ID
//                         </th>

//                         <th>
//                             Username
//                         </th>

//                         <th>
//                             Name
//                         </th>

//                         <th>
//                             Email
//                         </th>

//                         <th>
//                             Phone
//                         </th>

//                         <th>
//                             Course
//                         </th>

//                         <th>
//                             Department
//                         </th>

//                         <th>
//                             Year
//                         </th>

//                         <th>
//                             Action
//                         </th>

//                     </tr>

//                 </thead>


//                 <tbody>

//                     {filteredStudents.length === 0 ? (

//                         <tr>

//                             <td colSpan="9">

//                                 No students found.

//                             </td>

//                         </tr>

//                     ) : (

//                         filteredStudents.map(
//                             (student) => (

//                                 <tr
//                                     key={student.id}
//                                 >

//                                     <td>
//                                         {student.id}
//                                     </td>

//                                     <td>
//                                         {student.username || "-"}
//                                     </td>

//                                     <td>
//                                         {student.name}
//                                     </td>

//                                     <td>
//                                         {student.email}
//                                     </td>

//                                     <td>
//                                         {student.phone}
//                                     </td>

//                                     <td>
//                                         {
//                                             student.course_name
//                                             ||
//                                             student.course
//                                         }
//                                     </td>

//                                     <td>
//                                         {
//                                             student.department_name
//                                             ||
//                                             student.department
//                                         }
//                                     </td>

//                                     <td>
//                                         {
//                                             student.current_year
//                                             ||
//                                             student.year
//                                         }
//                                     </td>

//                                     <td>

//                                         <button

//                                             type="button"

//                                             onClick={() =>
//                                                 handleView(
//                                                     student
//                                                 )
//                                             }

//                                         >

//                                             View

//                                         </button>

//                                     </td>

//                                 </tr>

//                             )
//                         )

//                     )}

//                 </tbody>

//             </table>


//             {/* =================================================
//                 STUDENT DETAILS
//             ================================================= */}

//             {selectedStudent && (

//                 <div>

//                     <h2>
//                         Student Details
//                     </h2>


//                     <p>
//                         <strong>ID:</strong>{" "}
//                         {selectedStudent.id}
//                     </p>


//                     <p>
//                         <strong>Username:</strong>{" "}
//                         {selectedStudent.username || "-"}
//                     </p>


//                     <p>
//                         <strong>Name:</strong>{" "}
//                         {selectedStudent.name}
//                     </p>


//                     <p>
//                         <strong>Email:</strong>{" "}
//                         {selectedStudent.email}
//                     </p>


//                     <p>
//                         <strong>Phone:</strong>{" "}
//                         {selectedStudent.phone}
//                     </p>


//                     <p>
//                         <strong>Course:</strong>{" "}
//                         {
//                             selectedStudent.course_name
//                             ||
//                             selectedStudent.course
//                         }
//                     </p>


//                     <p>
//                         <strong>Department:</strong>{" "}
//                         {
//                             selectedStudent.department_name
//                             ||
//                             selectedStudent.department
//                         }
//                     </p>


//                     <p>
//                         <strong>Admission Year:</strong>{" "}
//                         {
//                             selectedStudent.admission_year
//                             ||
//                             "-"
//                         }
//                     </p>


//                     <p>
//                         <strong>Current Year:</strong>{" "}
//                         {
//                             selectedStudent.current_year
//                             ||
//                             selectedStudent.year
//                         }
//                     </p>


//                     <button
//                         type="button"
//                         onClick={handleClose}
//                     >
//                         Close
//                     </button>

//                 </div>

//             )}

//         </div>

//     );

// }


// export default HODStudents;
import { useEffect, useState } from "react";

import api from "../../api/axios";


function HODStudents() {

    const [students, setStudents] = useState([]);

    const [search, setSearch] = useState("");

    const [courseFilter, setCourseFilter] = useState("");

    const [yearFilter, setYearFilter] = useState("");

    const [selectedStudent, setSelectedStudent] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        loadStudents();

    }, []);


    const loadStudents = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await api.get(
                "hod/students/"
            );

            setStudents(
                response.data.results || response.data
            );

        } catch (error) {

            console.error(error);

            setError(
                "Failed to load students."
            );

        } finally {

            setLoading(false);

        }

    };


    const courseOptions = [

        ...new Map(

            students.map(
                (student) => [
                    student.course,
                    student.course_name
                ]
            )

        ).entries()

    ];


    const yearOptions = [

        ...new Set(

            students.map(
                (student) => student.current_year
            )

        )

    ].sort(
        (a, b) => a - b
    );


    const filteredStudents = students.filter(
        (student) => {

            const searchValue =
                search.toLowerCase().trim();


            const matchesSearch =

                student.username
                    ?.toLowerCase()
                    .includes(searchValue)

                ||

                student.name
                    ?.toLowerCase()
                    .includes(searchValue)

                ||

                student.email
                    ?.toLowerCase()
                    .includes(searchValue)

                ||

                student.phone
                    ?.toLowerCase()
                    .includes(searchValue);


            const matchesCourse =
                courseFilter === "" ||
                String(student.course) ===
                String(courseFilter);


            const matchesYear =
                yearFilter === "" ||
                String(student.current_year) ===
                String(yearFilter);


            return (
                matchesSearch &&
                matchesCourse &&
                matchesYear
            );

        }
    );


    const handleView = (student) => {

        setSelectedStudent(student);

    };


    const handleClose = () => {

        setSelectedStudent(null);

    };


    const clearFilters = () => {

        setSearch("");

        setCourseFilter("");

        setYearFilter("");

    };


    if (loading) {

        return (

            <div className="hod-page hod-students-page">

                <div className="hod-page-header">

                    <div>

                        <h1 className="hod-page-title">
                            HOD Students
                        </h1>

                        <p className="hod-page-subtitle">
                            Loading students...
                        </p>

                    </div>

                </div>

                <div className="hod-loading-card">
                    Loading students...
                </div>

            </div>

        );

    }


    return (

        <div className="hod-page hod-students-page">

            {/* HEADER */}

            <div className="hod-page-header">

                <div>

                    <h1 className="hod-page-title">
                        HOD Students
                    </h1>

                    <p className="hod-page-subtitle">
                        View students in your department
                    </p>

                </div>

                <button
                    className="hod-btn hod-btn-primary"
                    type="button"
                    onClick={loadStudents}
                >
                    Refresh
                </button>

            </div>


            {/* ERROR */}

            {error && (

                <div className="hod-alert hod-alert-error">

                    {error}

                </div>

            )}


            {/* FILTERS */}

            <div className="hod-card hod-filter-card">

                <div className="hod-filter-header">

                    <div>

                        <h2>
                            Search & Filters
                        </h2>

                        <p>
                            Search students by name, email or phone
                        </p>

                    </div>

                </div>


                <div className="hod-filter-grid">

                    {/* SEARCH */}

                    <div className="hod-field hod-field-wide">

                        <label>
                            Search Student
                        </label>

                        <input
                            className="hod-input"
                            type="text"
                            placeholder="Search student..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>


                    {/* COURSE */}

                    <div className="hod-field">

                        <label>
                            Course
                        </label>

                        <select
                            className="hod-select"
                            value={courseFilter}
                            onChange={(e) =>
                                setCourseFilter(e.target.value)
                            }
                        >

                            <option value="">
                                All Courses
                            </option>

                            {courseOptions.map(
                                ([id, name]) => (

                                    <option
                                        key={id}
                                        value={id}
                                    >
                                        {name}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* YEAR */}

                    <div className="hod-field">

                        <label>
                            Year
                        </label>

                        <select
                            className="hod-select"
                            value={yearFilter}
                            onChange={(e) =>
                                setYearFilter(e.target.value)
                            }
                        >

                            <option value="">
                                All Years
                            </option>

                            {yearOptions.map(
                                (year) => (

                                    <option
                                        key={year}
                                        value={year}
                                    >
                                        Year {year}
                                    </option>

                                )
                            )}

                        </select>

                    </div>

                </div>


                <div className="hod-filter-actions">

                    <button
                        className="hod-btn hod-btn-secondary"
                        type="button"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>

                </div>

            </div>


            {/* COUNT */}

            <div className="hod-result-bar">

                <strong>
                    Showing {filteredStudents.length} student(s)
                </strong>

            </div>


            {/* TABLE */}

            <div className="hod-table-card">

                <table className="hod-table">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Course</th>
                            <th>Department</th>
                            <th>Year</th>
                            <th>Action</th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredStudents.length === 0 ? (

                            <tr>

                                <td colSpan="9">

                                    <div className="hod-table-empty">
                                        No students found.
                                    </div>

                                </td>

                            </tr>

                        ) : (

                            filteredStudents.map(
                                (student) => (

                                    <tr
                                        key={student.id}
                                    >

                                        <td>
                                            {student.id}
                                        </td>

                                        <td>
                                            {student.username || "-"}
                                        </td>

                                        <td>
                                            {student.name}
                                        </td>

                                        <td>
                                            {student.email}
                                        </td>

                                        <td>
                                            {student.phone}
                                        </td>

                                        <td>
                                            {
                                                student.course_name ||
                                                student.course
                                            }
                                        </td>

                                        <td>
                                            {
                                                student.department_name ||
                                                student.department
                                            }
                                        </td>

                                        <td>
                                            {
                                                student.current_year ||
                                                student.year
                                            }
                                        </td>

                                        <td>

                                            <button
                                                className="hod-btn hod-btn-small hod-btn-primary"
                                                type="button"
                                                onClick={() =>
                                                    handleView(student)
                                                }
                                            >
                                                View
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>


            {/* DETAILS */}

            {selectedStudent && (

                <div className="hod-detail-card">

                    <div className="hod-detail-header">

                        <div>

                            <h2>
                                Student Details
                            </h2>

                            <p>
                                Complete student information
                            </p>

                        </div>

                        <button
                            className="hod-btn hod-btn-secondary"
                            type="button"
                            onClick={handleClose}
                        >
                            Close
                        </button>

                    </div>


                    <div className="hod-detail-grid">

                        <div>
                            <span>ID</span>
                            <strong>
                                {selectedStudent.id}
                            </strong>
                        </div>

                        <div>
                            <span>Username</span>
                            <strong>
                                {selectedStudent.username || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>Name</span>
                            <strong>
                                {selectedStudent.name}
                            </strong>
                        </div>

                        <div>
                            <span>Email</span>
                            <strong>
                                {selectedStudent.email}
                            </strong>
                        </div>

                        <div>
                            <span>Phone</span>
                            <strong>
                                {selectedStudent.phone}
                            </strong>
                        </div>

                        <div>
                            <span>Course</span>
                            <strong>
                                {
                                    selectedStudent.course_name ||
                                    selectedStudent.course
                                }
                            </strong>
                        </div>

                        <div>
                            <span>Department</span>
                            <strong>
                                {
                                    selectedStudent.department_name ||
                                    selectedStudent.department
                                }
                            </strong>
                        </div>

                        <div>
                            <span>Admission Year</span>
                            <strong>
                                {selectedStudent.admission_year || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>Current Year</span>
                            <strong>
                                {
                                    selectedStudent.current_year ||
                                    selectedStudent.year
                                }
                            </strong>
                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}


export default HODStudents;