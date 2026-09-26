// import { useEffect, useState } from "react";

// import api from "../../api/axios";


// function PrincipalStudents() {

//     const [students, setStudents] = useState([]);

//     const [search, setSearch] = useState("");

//     const [courseFilter, setCourseFilter] = useState("");

//     const [departmentFilter, setDepartmentFilter] = useState("");

//     const [yearFilter, setYearFilter] = useState("");

//     const [selectedStudent, setSelectedStudent] =
//         useState(null);

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
//                 "principal/students/?page_size=100"
//             );


//             console.log(
//                 "Principal Students:",
//                 response.data
//             );


//             setStudents(
//                 response.data.results ||
//                 response.data ||
//                 []
//             );


//         } catch (error) {

//             console.error(
//                 "Principal Students Error:",
//                 error.response?.data || error
//             );


//             setStudents([]);


//             setError(
//                 error.response?.data?.detail ||
//                 "Unable to load students."
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

//                     student.course_name ||
//                     student.course?.name ||
//                     student.course ||
//                     "-"

//                 ]
//             )

//         ).entries()

//     ].filter(
//         ([id]) =>
//             id !== null &&
//             id !== undefined
//     );


//     // ========================================================
//     // DEPARTMENT OPTIONS
//     // ========================================================

//     const departmentOptions = [

//         ...new Map(

//             students.map(
//                 (student) => [

//                     student.department,

//                     student.department_name ||
//                     student.department?.name ||
//                     student.department ||
//                     "-"

//                 ]
//             )

//         ).entries()

//     ].filter(
//         ([id]) =>
//             id !== null &&
//             id !== undefined
//     );


//     // ========================================================
//     // YEAR OPTIONS
//     // ========================================================

//     const yearOptions = [

//         ...new Set(

//             students.map(
//                 (student) =>
//                     student.current_year ??
//                     student.year
//             )

//         )

//     ]
//         .filter(
//             (year) =>
//                 year !== null &&
//                 year !== undefined
//         )
//         .sort(
//             (a, b) => a - b
//         );


//     // ========================================================
//     // FILTER STUDENTS
//     // ========================================================

//     const filteredStudents =
//         students.filter(
//             (student) => {

//                 const searchValue =
//                     search
//                         .toLowerCase()
//                         .trim();


//                 const studentName =
//                     String(
//                         student.name ||
//                         student.student_name ||
//                         ""
//                     );


//                 const studentEmail =
//                     String(
//                         student.email ||
//                         ""
//                     );


//                 const courseName =
//                     String(
//                         student.course_name ||
//                         student.course?.name ||
//                         student.course ||
//                         ""
//                     );


//                 const departmentName =
//                     String(
//                         student.department_name ||
//                         student.department?.name ||
//                         student.department ||
//                         ""
//                     );


//                 const matchesSearch =

//                     searchValue === ""

//                     ||

//                     studentName
//                         .toLowerCase()
//                         .includes(
//                             searchValue
//                         )

//                     ||

//                     studentEmail
//                         .toLowerCase()
//                         .includes(
//                             searchValue
//                         )

//                     ||

//                     courseName
//                         .toLowerCase()
//                         .includes(
//                             searchValue
//                         )

//                     ||

//                     departmentName
//                         .toLowerCase()
//                         .includes(
//                             searchValue
//                         );


//                 const matchesCourse =

//                     courseFilter === ""

//                     ||

//                     String(
//                         student.course
//                     ) ===
//                     String(
//                         courseFilter
//                     );


//                 const matchesDepartment =

//                     departmentFilter === ""

//                     ||

//                     String(
//                         student.department
//                     ) ===
//                     String(
//                         departmentFilter
//                     );


//                 const studentYear =
//                     student.current_year ??
//                     student.year;


//                 const matchesYear =

//                     yearFilter === ""

//                     ||

//                     String(
//                         studentYear
//                     ) ===
//                     String(
//                         yearFilter
//                     );


//                 return (

//                     matchesSearch

//                     &&

//                     matchesCourse

//                     &&

//                     matchesDepartment

//                     &&

//                     matchesYear

//                 );

//             }
//         );


//     // ========================================================
//     // VIEW DETAILS
//     // ========================================================

//     const handleView = (
//         student
//     ) => {

//         setSelectedStudent(
//             student
//         );

//     };


//     // ========================================================
//     // CLOSE DETAILS
//     // ========================================================

//     const handleClose = () => {

//         setSelectedStudent(
//             null
//         );

//     };


//     // ========================================================
//     // CLEAR FILTERS
//     // ========================================================

//     const clearFilters = () => {

//         setSearch("");

//         setCourseFilter("");

//         setDepartmentFilter("");

//         setYearFilter("");

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (

//             <div>

//                 <h1>
//                     Principal Students
//                 </h1>

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

//             {/* =================================================
//                 TITLE
//             ================================================= */}

//             <h1>
//                 Principal Students
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
//                             loadStudents
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
//                     placeholder="Search student / email / course / department..."
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
//                 COURSE
//             ================================================= */}

//             <div>

//                 <label>
//                     Course:
//                 </label>

//                 {" "}


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


//             <br />


//             {/* =================================================
//                 DEPARTMENT
//             ================================================= */}

//             <div>

//                 <label>
//                     Department:
//                 </label>

//                 {" "}


//                 <select
//                     value={departmentFilter}
//                     onChange={(e) =>
//                         setDepartmentFilter(
//                             e.target.value
//                         )
//                     }
//                 >

//                     <option value="">
//                         All Departments
//                     </option>


//                     {departmentOptions.map(
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


//             <br />


//             {/* =================================================
//                 YEAR
//             ================================================= */}

//             <div>

//                 <label>
//                     Year:
//                 </label>

//                 {" "}


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


//             <br />


//             {/* =================================================
//                 BUTTONS
//             ================================================= */}

//             <button
//                 type="button"
//                 onClick={
//                     clearFilters
//                 }
//             >
//                 Clear Filters
//             </button>


//             {" "}


//             <button
//                 type="button"
//                 onClick={
//                     loadStudents
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
//                     filteredStudents.length
//                 }

//                 {" "}
//                 student(s)

//             </p>


//             {/* =================================================
//                 TABLE
//             ================================================= */}

//             <table
//                 border="1"
//                 cellPadding="8"
//                 cellSpacing="0"
//             >

//                 <thead>

//                     <tr>

//                         <th>
//                             ID
//                         </th>

//                         <th>
//                             Student
//                         </th>

//                         <th>
//                             Email
//                         </th>

//                         <th>
//                             Phone
//                         </th>

//                         <th>
//                             Course / Class
//                         </th>

//                         <th>
//                             Department
//                         </th>

//                         <th>
//                             Year
//                         </th>

//                         <th>
//                             Admission Year
//                         </th>

//                         <th>
//                             Existing Student
//                         </th>

//                         <th>
//                             Action
//                         </th>

//                     </tr>

//                 </thead>


//                 <tbody>

//                     {filteredStudents.length === 0 ? (

//                         <tr>

//                             <td colSpan="10">
//                                 No students found.
//                             </td>

//                         </tr>

//                     ) : (

//                         filteredStudents.map(
//                             (student) => (

//                                 <tr
//                                     key={
//                                         student.id
//                                     }
//                                 >

//                                     <td>
//                                         {
//                                             student.id
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             student.name ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             student.email ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             student.phone ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             student.course_name ||
//                                             student.course?.name ||
//                                             student.course ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             student.department_name ||
//                                             student.department?.name ||
//                                             student.department ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             student.current_year ??
//                                             student.year ??
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             student.admission_year ??
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             student.is_existing_student
//                                                 ? "Yes"
//                                                 : "No"
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
//                                             View Details
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

//                     <hr />


//                     <h2>
//                         Student Details
//                     </h2>


//                     <p>

//                         <strong>
//                             ID:
//                         </strong>{" "}

//                         {
//                             selectedStudent.id
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Name:
//                         </strong>{" "}

//                         {
//                             selectedStudent.name ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Email:
//                         </strong>{" "}

//                         {
//                             selectedStudent.email ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Phone:
//                         </strong>{" "}

//                         {
//                             selectedStudent.phone ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Course / Class:
//                         </strong>{" "}

//                         {
//                             selectedStudent.course_name ||
//                             selectedStudent.course?.name ||
//                             selectedStudent.course ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Department:
//                         </strong>{" "}

//                         {
//                             selectedStudent.department_name ||
//                             selectedStudent.department?.name ||
//                             selectedStudent.department ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Current Year:
//                         </strong>{" "}

//                         {
//                             selectedStudent.current_year ??
//                             selectedStudent.year ??
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Admission Year:
//                         </strong>{" "}

//                         {
//                             selectedStudent.admission_year ??
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Existing Student:
//                         </strong>{" "}

//                         {
//                             selectedStudent.is_existing_student
//                                 ? "Yes"
//                                 : "No"
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


// export default PrincipalStudents;
import { useEffect, useState } from "react";
import api from "../../api/axios";

function PrincipalStudents() {
    const [students, setStudents] = useState([]);

    const [search, setSearch] = useState("");
    const [courseFilter, setCourseFilter] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [yearFilter, setYearFilter] = useState("");

    const [selectedStudent, setSelectedStudent] =
        useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ========================================================
    // LOAD STUDENTS
    // ========================================================

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "principal/students/?page_size=100"
            );

            console.log(
                "Principal Students:",
                response.data
            );

            setStudents(
                response.data.results ||
                response.data ||
                []
            );
        } catch (error) {
            console.error(
                "Principal Students Error:",
                error.response?.data || error
            );

            setStudents([]);

            setError(
                error.response?.data?.detail ||
                "Unable to load students."
            );
        } finally {
            setLoading(false);
        }
    };

    // ========================================================
    // OPTIONS
    // ========================================================

    const courseOptions = [
        ...new Map(
            students.map((student) => [
                student.course,
                student.course_name ||
                student.course?.name ||
                student.course ||
                "-"
            ])
        ).entries()
    ].filter(
        ([id]) =>
            id !== null &&
            id !== undefined
    );

    const departmentOptions = [
        ...new Map(
            students.map((student) => [
                student.department,
                student.department_name ||
                student.department?.name ||
                student.department ||
                "-"
            ])
        ).entries()
    ].filter(
        ([id]) =>
            id !== null &&
            id !== undefined
    );

    const yearOptions = [
        ...new Set(
            students.map(
                (student) =>
                    student.current_year ??
                    student.year
            )
        )
    ]
        .filter(
            (year) =>
                year !== null &&
                year !== undefined
        )
        .sort((a, b) => a - b);

    // ========================================================
    // FILTER STUDENTS
    // ========================================================

    const filteredStudents = students.filter(
        (student) => {
            const searchValue = search
                .toLowerCase()
                .trim();

            const studentName = String(
                student.name ||
                student.student_name ||
                ""
            );

            const studentEmail = String(
                student.email || ""
            );

            const courseName = String(
                student.course_name ||
                student.course?.name ||
                student.course ||
                ""
            );

            const departmentName = String(
                student.department_name ||
                student.department?.name ||
                student.department ||
                ""
            );

            const matchesSearch =
                searchValue === "" ||
                studentName
                    .toLowerCase()
                    .includes(searchValue) ||
                studentEmail
                    .toLowerCase()
                    .includes(searchValue) ||
                courseName
                    .toLowerCase()
                    .includes(searchValue) ||
                departmentName
                    .toLowerCase()
                    .includes(searchValue);

            const matchesCourse =
                courseFilter === "" ||
                String(student.course) ===
                String(courseFilter);

            const matchesDepartment =
                departmentFilter === "" ||
                String(student.department) ===
                String(departmentFilter);

            const studentYear =
                student.current_year ??
                student.year;

            const matchesYear =
                yearFilter === "" ||
                String(studentYear) ===
                String(yearFilter);

            return (
                matchesSearch &&
                matchesCourse &&
                matchesDepartment &&
                matchesYear
            );
        }
    );

    // ========================================================
    // ACTIONS
    // ========================================================

    const handleView = (student) => {
        setSelectedStudent(student);
    };

    const handleClose = () => {
        setSelectedStudent(null);
    };

    const clearFilters = () => {
        setSearch("");
        setCourseFilter("");
        setDepartmentFilter("");
        setYearFilter("");
    };

    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {
        return (
            <div className="principal-page principal-state-card">
                <h1>Principal Students</h1>
                <p>Loading students...</p>
            </div>
        );
    }

    // ========================================================
    // UI
    // ========================================================

    return (
        <div className="principal-page principal-students-page">

            <div className="principal-page-header">
                <div>
                    <h1 className="principal-page-title">
                        Student Management
                    </h1>

                    <p className="principal-page-subtitle">
                        View student records, courses and academic details.
                    </p>
                </div>
            </div>

            {/* ERROR */}

            {error && (
                <div className="principal-alert principal-alert-error">
                    <span>{error}</span>

                    <button
                        type="button"
                        className="principal-btn principal-btn-danger principal-btn-sm"
                        onClick={loadStudents}
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* FILTERS */}

            <div className="principal-toolbar">

                <div className="principal-field principal-field-wide">
                    <label>Search</label>

                    <input
                        type="text"
                        className="principal-input"
                        placeholder="Search student / email / course / department..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />
                </div>

                <div className="principal-field">
                    <label>Course</label>

                    <select
                        className="principal-select"
                        value={courseFilter}
                        onChange={(e) =>
                            setCourseFilter(
                                e.target.value
                            )
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

                <div className="principal-field">
                    <label>Department</label>

                    <select
                        className="principal-select"
                        value={departmentFilter}
                        onChange={(e) =>
                            setDepartmentFilter(
                                e.target.value
                            )
                        }
                    >
                        <option value="">
                            All Departments
                        </option>

                        {departmentOptions.map(
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

                <div className="principal-field">
                    <label>Year</label>

                    <select
                        className="principal-select"
                        value={yearFilter}
                        onChange={(e) =>
                            setYearFilter(
                                e.target.value
                            )
                        }
                    >
                        <option value="">
                            All Years
                        </option>

                        {yearOptions.map((year) => (
                            <option
                                key={year}
                                value={year}
                            >
                                Year {year}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="principal-actions">

                    <button
                        type="button"
                        className="principal-btn principal-btn-secondary"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>

                    <button
                        type="button"
                        className="principal-btn principal-btn-primary"
                        onClick={loadStudents}
                    >
                        Refresh
                    </button>

                </div>

            </div>

            <p className="principal-count">
                Showing {filteredStudents.length} student(s)
            </p>

            {/* TABLE */}

            <div className="principal-table-card">
                <div className="principal-table-wrap">

                    <table className="principal-table principal-table-wide">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Student</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Course / Class</th>
                                <th>Department</th>
                                <th>Year</th>
                                <th>Admission Year</th>
                                <th>Existing Student</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredStudents.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="10"
                                        className="principal-empty"
                                    >
                                        No students found.
                                    </td>
                                </tr>
                            ) : (
                                filteredStudents.map(
                                    (student) => (
                                        <tr key={student.id}>

                                            <td>
                                                {student.id}
                                            </td>

                                            <td>
                                                {student.name || "-"}
                                            </td>

                                            <td>
                                                {student.email || "-"}
                                            </td>

                                            <td>
                                                {student.phone || "-"}
                                            </td>

                                            <td>
                                                {student.course_name ||
                                                    student.course?.name ||
                                                    student.course ||
                                                    "-"}
                                            </td>

                                            <td>
                                                {student.department_name ||
                                                    student.department?.name ||
                                                    student.department ||
                                                    "-"}
                                            </td>

                                            <td>
                                                {student.current_year ??
                                                    student.year ??
                                                    "-"}
                                            </td>

                                            <td>
                                                {student.admission_year ??
                                                    "-"}
                                            </td>

                                            <td>
                                                <span
                                                    className={
                                                        student.is_existing_student
                                                            ? "principal-status principal-status-present"
                                                            : "principal-status principal-status-absent"
                                                    }
                                                >
                                                    {student.is_existing_student
                                                        ? "Yes"
                                                        : "No"}
                                                </span>
                                            </td>

                                            <td>
                                                <button
                                                    type="button"
                                                    className="principal-btn principal-btn-primary principal-btn-sm"
                                                    onClick={() =>
                                                        handleView(
                                                            student
                                                        )
                                                    }
                                                >
                                                    View Details
                                                </button>
                                            </td>

                                        </tr>
                                    )
                                )
                            )}

                        </tbody>

                    </table>

                </div>
            </div>

            {/* DETAILS */}

            {selectedStudent && (
                <div className="principal-detail-card">

                    <div className="principal-detail-header">

                        <div>
                            <h2>Student Details</h2>
                            <p>
                                Complete student information
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
                                {selectedStudent.id}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Name
                            </span>
                            <span className="principal-detail-value">
                                {selectedStudent.name || "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Email
                            </span>
                            <span className="principal-detail-value">
                                {selectedStudent.email || "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Phone
                            </span>
                            <span className="principal-detail-value">
                                {selectedStudent.phone || "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Course / Class
                            </span>
                            <span className="principal-detail-value">
                                {selectedStudent.course_name ||
                                    selectedStudent.course?.name ||
                                    selectedStudent.course ||
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Department
                            </span>
                            <span className="principal-detail-value">
                                {selectedStudent.department_name ||
                                    selectedStudent.department?.name ||
                                    selectedStudent.department ||
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Current Year
                            </span>
                            <span className="principal-detail-value">
                                {selectedStudent.current_year ??
                                    selectedStudent.year ??
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Admission Year
                            </span>
                            <span className="principal-detail-value">
                                {selectedStudent.admission_year ??
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Existing Student
                            </span>
                            <span className="principal-detail-value">
                                {selectedStudent.is_existing_student
                                    ? "Yes"
                                    : "No"}
                            </span>
                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default PrincipalStudents;