// import { useEffect, useState } from "react";

// import api from "../../api/axios";


// function HODAttendance() {

//     const [attendance, setAttendance] = useState([]);

//     const [search, setSearch] = useState("");

//     const [studentFilter, setStudentFilter] = useState("");

//     const [subjectFilter, setSubjectFilter] = useState("");

//     const [courseFilter, setCourseFilter] = useState("");

//     const [yearFilter, setYearFilter] = useState("");

//     const [statusFilter, setStatusFilter] = useState("");

//     const [dateFilter, setDateFilter] = useState("");

//     const [selectedAttendance, setSelectedAttendance] =
//         useState(null);

//     const [loading, setLoading] = useState(true);

//     const [error, setError] = useState("");


//     // ========================================================
//     // LOAD ATTENDANCE
//     // ========================================================

//     useEffect(() => {

//         loadAttendance();

//     }, []);


//     const loadAttendance = async () => {

//         try {

//             setLoading(true);

//             setError("");


//             const response = await api.get(
//                 "hod/attendance/?page_size=100"
//             );


//             console.log(
//                 "HOD ATTENDANCE:",
//                 response.data
//             );


//             setAttendance(
//                 response.data.results ||
//                 response.data ||
//                 []
//             );


//         } catch (error) {

//             console.error(
//                 "HOD Attendance Error:",
//                 error.response?.data || error
//             );


//             setAttendance([]);


//             setError(
//                 error.response?.data?.detail ||
//                 "Failed to load attendance."
//             );


//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // STUDENT OPTIONS
//     // ========================================================

//     const studentOptions = [

//         ...new Map(

//             attendance.map(
//                 (item) => [

//                     item.student,

//                     item.student_name ||
//                     item.student?.name ||
//                     item.student

//                 ]
//             )

//         ).entries()

//     ];


//     // ========================================================
//     // SUBJECT OPTIONS
//     // ========================================================

//     const subjectOptions = [

//         ...new Map(

//             attendance.map(
//                 (item) => [

//                     item.subject,

//                     item.subject_name ||
//                     item.subject?.name ||
//                     item.subject

//                 ]
//             )

//         ).entries()

//     ];


//     // ========================================================
//     // COURSE OPTIONS
//     // ========================================================

//     const courseOptions = [

//         ...new Map(

//             attendance.map(
//                 (item) => [

//                     item.course,

//                     item.course_name ||
//                     item.course?.name ||
//                     item.course

//                 ]
//             )

//         ).entries()

//     ];


//     // ========================================================
//     // YEAR OPTIONS
//     // ========================================================

//     const yearOptions = [

//         ...new Set(

//             attendance.map(
//                 (item) => item.year
//             )

//         )

//     ]

//         .filter(
//             (year) =>
//                 year !== null &&
//                 year !== undefined
//         )

//         .sort(
//             (a, b) =>
//                 a - b
//         );


//     // ========================================================
//     // FILTER ATTENDANCE
//     // ========================================================

//     const filteredAttendance =

//         attendance.filter(
//             (item) => {

//                 const searchValue =
//                     search
//                         .toLowerCase()
//                         .trim();


//                 const studentName =
//                     String(
//                         item.student_name ||
//                         item.student?.name ||
//                         item.student ||
//                         ""
//                     );


//                 const studentEmail =
//                     String(
//                         item.student_email ||
//                         item.student?.email ||
//                         ""
//                     );


//                 const subjectName =
//                     String(
//                         item.subject_name ||
//                         item.subject?.name ||
//                         item.subject ||
//                         ""
//                     );


//                 const subjectCode =
//                     String(
//                         item.subject_code ||
//                         item.subject?.code ||
//                         ""
//                     );


//                 const matchesSearch =

//                     searchValue === ""

//                     ||

//                     studentName
//                         .toLowerCase()
//                         .includes(searchValue)

//                     ||

//                     studentEmail
//                         .toLowerCase()
//                         .includes(searchValue)

//                     ||

//                     subjectName
//                         .toLowerCase()
//                         .includes(searchValue)

//                     ||

//                     subjectCode
//                         .toLowerCase()
//                         .includes(searchValue);


//                 const matchesStudent =

//                     studentFilter === ""

//                     ||

//                     String(
//                         item.student
//                     ) ===
//                     String(
//                         studentFilter
//                     );


//                 const matchesSubject =

//                     subjectFilter === ""

//                     ||

//                     String(
//                         item.subject
//                     ) ===
//                     String(
//                         subjectFilter
//                     );


//                 const matchesCourse =

//                     courseFilter === ""

//                     ||

//                     String(
//                         item.course
//                     ) ===
//                     String(
//                         courseFilter
//                     );


//                 const matchesYear =

//                     yearFilter === ""

//                     ||

//                     String(
//                         item.year
//                     ) ===
//                     String(
//                         yearFilter
//                     );


//                 const matchesStatus =

//                     statusFilter === ""

//                     ||

//                     String(
//                         item.status
//                     )
//                         .toUpperCase()
//                     ===
//                     statusFilter.toUpperCase();


//                 const matchesDate =

//                     dateFilter === ""

//                     ||

//                     String(
//                         item.date
//                     ) ===
//                     String(
//                         dateFilter
//                     );


//                 return (

//                     matchesSearch

//                     &&

//                     matchesStudent

//                     &&

//                     matchesSubject

//                     &&

//                     matchesCourse

//                     &&

//                     matchesYear

//                     &&

//                     matchesStatus

//                     &&

//                     matchesDate

//                 );

//             }
//         );


//     // ========================================================
//     // VIEW DETAILS
//     // ========================================================

//     const handleView = (
//         item
//     ) => {

//         setSelectedAttendance(
//             item
//         );

//     };


//     // ========================================================
//     // CLOSE DETAILS
//     // ========================================================

//     const handleClose = () => {

//         setSelectedAttendance(
//             null
//         );

//     };


//     // ========================================================
//     // CLEAR FILTERS
//     // ========================================================

//     const clearFilters = () => {

//         setSearch("");

//         setStudentFilter("");

//         setSubjectFilter("");

//         setCourseFilter("");

//         setYearFilter("");

//         setStatusFilter("");

//         setDateFilter("");

//     };


//     // ========================================================
//     // REFRESH
//     // ========================================================

//     const refreshAttendance = () => {

//         loadAttendance();

//     };


//     // ========================================================
//     // STATUS TEXT
//     // ========================================================

//     const getStatusText = (
//         status
//     ) => {

//         if (status === "PRESENT") {

//             return "Present";

//         }

//         if (status === "ABSENT") {

//             return "Absent";

//         }

//         return status || "-";

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (

//             <div>

//                 <h1>
//                     HOD Attendance
//                 </h1>

//                 <p>
//                     Loading attendance...
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
//                 HOD Attendance
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
//                             refreshAttendance
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
//                     placeholder="Search student / email / subject / code..."
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
//                 STUDENT FILTER
//             ================================================= */}

//             <div>

//                 <label>
//                     Student
//                 </label>

//                 {" "}


//                 <select
//                     value={studentFilter}
//                     onChange={(e) =>
//                         setStudentFilter(
//                             e.target.value
//                         )
//                     }
//                 >

//                     <option value="">
//                         All Students
//                     </option>


//                     {studentOptions.map(
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
//                 SUBJECT FILTER
//             ================================================= */}

//             <div>

//                 <label>
//                     Subject
//                 </label>

//                 {" "}


//                 <select
//                     value={subjectFilter}
//                     onChange={(e) =>
//                         setSubjectFilter(
//                             e.target.value
//                         )
//                     }
//                 >

//                     <option value="">
//                         All Subjects
//                     </option>


//                     {subjectOptions.map(
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
//                 COURSE FILTER
//             ================================================= */}

//             <div>

//                 <label>
//                     Course
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
//                 YEAR FILTER
//             ================================================= */}

//             <div>

//                 <label>
//                     Year
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
//                 STATUS FILTER
//             ================================================= */}

//             <div>

//                 <label>
//                     Status
//                 </label>

//                 {" "}


//                 <select
//                     value={statusFilter}
//                     onChange={(e) =>
//                         setStatusFilter(
//                             e.target.value
//                         )
//                     }
//                 >

//                     <option value="">
//                         All Status
//                     </option>


//                     <option value="PRESENT">
//                         Present
//                     </option>


//                     <option value="ABSENT">
//                         Absent
//                     </option>

//                 </select>

//             </div>


//             <br />


//             {/* =================================================
//                 DATE FILTER
//             ================================================= */}

//             <div>

//                 <label>
//                     Date
//                 </label>

//                 {" "}


//                 <input
//                     type="date"
//                     value={dateFilter}
//                     onChange={(e) =>
//                         setDateFilter(
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
//                     clearFilters
//                 }
//             >
//                 Clear Filters
//             </button>


//             {" "}


//             <button
//                 type="button"
//                 onClick={
//                     refreshAttendance
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
//                     filteredAttendance.length
//                 }

//                 {" "}
//                 attendance record(s)

//             </p>


//             {/* =================================================
//                 ATTENDANCE TABLE
//             ================================================= */}

//             <table
//                 border="1"
//                 cellPadding="10"
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
//                             Subject
//                         </th>

//                         <th>
//                             Subject Code
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
//                             Status
//                         </th>

//                         <th>
//                             Date
//                         </th>

//                         <th>
//                             Marked By
//                         </th>

//                         <th>
//                             Action
//                         </th>

//                     </tr>

//                 </thead>


//                 <tbody>

//                     {filteredAttendance.length === 0 ? (

//                         <tr>

//                             <td colSpan="12">

//                                 No attendance records found.

//                             </td>

//                         </tr>

//                     ) : (

//                         filteredAttendance.map(
//                             (item) => (

//                                 <tr
//                                     key={
//                                         item.id
//                                     }
//                                 >

//                                     <td>
//                                         {
//                                             item.id
//                                         }
//                                     </td>


//                                     <td>

//                                         {
//                                             item.student_name
//                                             ||
//                                             item.student?.name
//                                             ||
//                                             item.student
//                                             ||
//                                             "-"
//                                         }

//                                     </td>


//                                     <td>

//                                         {
//                                             item.student_email
//                                             ||
//                                             item.student?.email
//                                             ||
//                                             "-"
//                                         }

//                                     </td>


//                                     <td>

//                                         {
//                                             item.subject_name
//                                             ||
//                                             item.subject?.name
//                                             ||
//                                             item.subject
//                                             ||
//                                             "-"
//                                         }

//                                     </td>


//                                     <td>

//                                         {
//                                             item.subject_code
//                                             ||
//                                             item.subject?.code
//                                             ||
//                                             "-"
//                                         }

//                                     </td>


//                                     <td>

//                                         {
//                                             item.course_name
//                                             ||
//                                             item.course?.name
//                                             ||
//                                             item.course
//                                             ||
//                                             "-"
//                                         }

//                                     </td>


//                                     <td>

//                                         {
//                                             item.department_name
//                                             ||
//                                             item.department?.name
//                                             ||
//                                             item.department
//                                             ||
//                                             "-"
//                                         }

//                                     </td>


//                                     <td>

//                                         {
//                                             item.year ??
//                                             "-"
//                                         }

//                                     </td>


//                                     <td>

//                                         {
//                                             getStatusText(
//                                                 item.status
//                                             )
//                                         }

//                                     </td>


//                                     <td>

//                                         {
//                                             item.date ||
//                                             "-"
//                                         }

//                                     </td>


//                                     <td>

//                                         {
//                                             item.marked_by_name
//                                             ||
//                                             item.marked_by?.username
//                                             ||
//                                             item.marked_by
//                                             ||
//                                             "-"
//                                         }

//                                     </td>


//                                     <td>

//                                         <button
//                                             type="button"
//                                             onClick={() =>
//                                                 handleView(
//                                                     item
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
//                 DETAILS
//             ================================================= */}

//             {selectedAttendance && (

//                 <div>

//                     <hr />

//                     <h2>
//                         Attendance Details
//                     </h2>


//                     <p>

//                         <strong>
//                             ID:
//                         </strong>{" "}

//                         {
//                             selectedAttendance.id
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Student:
//                         </strong>{" "}

//                         {
//                             selectedAttendance.student_name
//                             ||
//                             selectedAttendance.student?.name
//                             ||
//                             selectedAttendance.student
//                             ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Email:
//                         </strong>{" "}

//                         {
//                             selectedAttendance.student_email
//                             ||
//                             selectedAttendance.student?.email
//                             ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Subject:
//                         </strong>{" "}

//                         {
//                             selectedAttendance.subject_name
//                             ||
//                             selectedAttendance.subject?.name
//                             ||
//                             selectedAttendance.subject
//                             ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Subject Code:
//                         </strong>{" "}

//                         {
//                             selectedAttendance.subject_code
//                             ||
//                             selectedAttendance.subject?.code
//                             ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Course / Class:
//                         </strong>{" "}

//                         {
//                             selectedAttendance.course_name
//                             ||
//                             selectedAttendance.course?.name
//                             ||
//                             selectedAttendance.course
//                             ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Department:
//                         </strong>{" "}

//                         {
//                             selectedAttendance.department_name
//                             ||
//                             selectedAttendance.department?.name
//                             ||
//                             selectedAttendance.department
//                             ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Year:
//                         </strong>{" "}

//                         {
//                             selectedAttendance.year ??
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Status:
//                         </strong>{" "}

//                         {
//                             getStatusText(
//                                 selectedAttendance.status
//                             )
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Date:
//                         </strong>{" "}

//                         {
//                             selectedAttendance.date ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Marked By:
//                         </strong>{" "}

//                         {
//                             selectedAttendance.marked_by_name
//                             ||
//                             selectedAttendance.marked_by?.username
//                             ||
//                             selectedAttendance.marked_by
//                             ||
//                             "-"
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


// export default HODAttendance;
import { useEffect, useState } from "react";
import api from "../../api/axios";

function HODAttendance() {
    const [attendance, setAttendance] = useState([]);
    const [search, setSearch] = useState("");
    const [studentFilter, setStudentFilter] = useState("");
    const [subjectFilter, setSubjectFilter] = useState("");
    const [courseFilter, setCourseFilter] = useState("");
    const [yearFilter, setYearFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [selectedAttendance, setSelectedAttendance] =
        useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadAttendance();
    }, []);

    const loadAttendance = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "hod/attendance/?page_size=100"
            );

            console.log(
                "HOD ATTENDANCE:",
                response.data
            );

            setAttendance(
                response.data.results ||
                response.data ||
                []
            );
        } catch (error) {
            console.error(
                "HOD Attendance Error:",
                error.response?.data || error
            );

            setAttendance([]);

            setError(
                error.response?.data?.detail ||
                "Failed to load attendance."
            );
        } finally {
            setLoading(false);
        }
    };

    const studentOptions = [
        ...new Map(
            attendance.map((item) => [
                item.student,
                item.student_name ||
                item.student?.name ||
                item.student
            ])
        ).entries()
    ];

    const subjectOptions = [
        ...new Map(
            attendance.map((item) => [
                item.subject,
                item.subject_name ||
                item.subject?.name ||
                item.subject
            ])
        ).entries()
    ];

    const courseOptions = [
        ...new Map(
            attendance.map((item) => [
                item.course,
                item.course_name ||
                item.course?.name ||
                item.course
            ])
        ).entries()
    ];

    const yearOptions = [
        ...new Set(
            attendance.map(
                (item) => item.year
            )
        )
    ]
        .filter(
            (year) =>
                year !== null &&
                year !== undefined
        )
        .sort((a, b) => a - b);

    const filteredAttendance =
        attendance.filter((item) => {

            const searchValue =
                search.toLowerCase().trim();

            const studentName = String(
                item.student_name ||
                item.student?.name ||
                item.student ||
                ""
            );

            const studentEmail = String(
                item.student_email ||
                item.student?.email ||
                ""
            );

            const subjectName = String(
                item.subject_name ||
                item.subject?.name ||
                item.subject ||
                ""
            );

            const subjectCode = String(
                item.subject_code ||
                item.subject?.code ||
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
                subjectName
                    .toLowerCase()
                    .includes(searchValue) ||
                subjectCode
                    .toLowerCase()
                    .includes(searchValue);

            const matchesStudent =
                studentFilter === "" ||
                String(item.student) ===
                String(studentFilter);

            const matchesSubject =
                subjectFilter === "" ||
                String(item.subject) ===
                String(subjectFilter);

            const matchesCourse =
                courseFilter === "" ||
                String(item.course) ===
                String(courseFilter);

            const matchesYear =
                yearFilter === "" ||
                String(item.year) ===
                String(yearFilter);

            const matchesStatus =
                statusFilter === "" ||
                String(item.status)
                    .toUpperCase() ===
                statusFilter.toUpperCase();

            const matchesDate =
                dateFilter === "" ||
                String(item.date) ===
                String(dateFilter);

            return (
                matchesSearch &&
                matchesStudent &&
                matchesSubject &&
                matchesCourse &&
                matchesYear &&
                matchesStatus &&
                matchesDate
            );
        });

    const handleView = (item) => {
        setSelectedAttendance(item);
    };

    const handleClose = () => {
        setSelectedAttendance(null);
    };

    const clearFilters = () => {
        setSearch("");
        setStudentFilter("");
        setSubjectFilter("");
        setCourseFilter("");
        setYearFilter("");
        setStatusFilter("");
        setDateFilter("");
    };

    const refreshAttendance = () => {
        loadAttendance();
    };

    const getStatusText = (status) => {
        if (status === "PRESENT") {
            return "Present";
        }

        if (status === "ABSENT") {
            return "Absent";
        }

        return status || "-";
    };

    if (loading) {
        return (
            <div className="hod-page hod-attendance-page">
                <div className="hod-state-card">
                    <div className="hod-loading-icon">📅</div>
                    <h2>HOD Attendance</h2>
                    <p>Loading attendance...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="hod-page hod-attendance-page">

            {/* HEADER */}
            <div className="hod-page-header">
                <div>
                    <h1 className="hod-page-title">
                        HOD Attendance
                    </h1>

                    <p className="hod-page-subtitle">
                        View attendance records of students in your department.
                    </p>
                </div>

                <div className="hod-header-badge">
                    📅 {filteredAttendance.length} Records
                </div>
            </div>

            {/* ERROR */}
            {error && (
                <div className="hod-alert hod-alert-error">
                    <div>
                        <strong>
                            Unable to load attendance
                        </strong>
                        <p>{error}</p>
                    </div>

                    <button
                        type="button"
                        className="hod-btn hod-btn-danger"
                        onClick={refreshAttendance}
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* FILTERS */}
            <div className="hod-section">

                <div className="hod-section-header">
                    <div>
                        <h2 className="hod-section-title">
                            Attendance Filters
                        </h2>

                        <p className="hod-section-subtitle">
                            Filter attendance records using the options below.
                        </p>
                    </div>
                </div>

                <div className="hod-filter-grid">

                    <div className="hod-field hod-field-wide">
                        <label className="hod-form-label">
                            Search
                        </label>

                        <input
                            type="text"
                            className="hod-input"
                            placeholder="Student / email / subject / code..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />
                    </div>

                    <div className="hod-field">
                        <label className="hod-form-label">
                            Student
                        </label>

                        <select
                            className="hod-select"
                            value={studentFilter}
                            onChange={(e) =>
                                setStudentFilter(
                                    e.target.value
                                )
                            }
                        >
                            <option value="">
                                All Students
                            </option>

                            {studentOptions.map(
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

                    <div className="hod-field">
                        <label className="hod-form-label">
                            Subject
                        </label>

                        <select
                            className="hod-select"
                            value={subjectFilter}
                            onChange={(e) =>
                                setSubjectFilter(
                                    e.target.value
                                )
                            }
                        >
                            <option value="">
                                All Subjects
                            </option>

                            {subjectOptions.map(
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

                    <div className="hod-field">
                        <label className="hod-form-label">
                            Course
                        </label>

                        <select
                            className="hod-select"
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

                    <div className="hod-field">
                        <label className="hod-form-label">
                            Year
                        </label>

                        <select
                            className="hod-select"
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

                    <div className="hod-field">
                        <label className="hod-form-label">
                            Status
                        </label>

                        <select
                            className="hod-select"
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(
                                    e.target.value
                                )
                            }
                        >
                            <option value="">
                                All Status
                            </option>

                            <option value="PRESENT">
                                Present
                            </option>

                            <option value="ABSENT">
                                Absent
                            </option>
                        </select>
                    </div>

                    <div className="hod-field">
                        <label className="hod-form-label">
                            Date
                        </label>

                        <input
                            type="date"
                            className="hod-input"
                            value={dateFilter}
                            onChange={(e) =>
                                setDateFilter(
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="hod-filter-actions">

                        <button
                            type="button"
                            className="hod-btn hod-btn-secondary"
                            onClick={clearFilters}
                        >
                            ↻ Clear
                        </button>

                        <button
                            type="button"
                            className="hod-btn hod-btn-primary"
                            onClick={refreshAttendance}
                        >
                            ⟳ Refresh
                        </button>

                    </div>

                </div>
            </div>

            {/* COUNT */}
            <div className="hod-count-bar">
                Showing{" "}
                <strong>
                    {filteredAttendance.length}
                </strong>{" "}
                attendance record(s)
            </div>

            {/* TABLE */}
            <div className="hod-table-card">

                <div className="hod-table-header">
                    <div>
                        <h2>Attendance Records</h2>
                        <span>
                            Student attendance information
                        </span>
                    </div>
                </div>

                <div className="hod-table-wrap">

                    <table className="hod-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Student</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Subject Code</th>
                                <th>Course / Class</th>
                                <th>Department</th>
                                <th>Year</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Marked By</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredAttendance.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="12"
                                        className="hod-empty"
                                    >
                                        No attendance records found.
                                    </td>
                                </tr>
                            ) : (
                                filteredAttendance.map(
                                    (item) => (
                                        <tr
                                            key={item.id}
                                        >
                                            <td>
                                                #{item.id}
                                            </td>

                                            <td>
                                                <strong>
                                                    {
                                                        item.student_name ||
                                                        item.student?.name ||
                                                        item.student ||
                                                        "-"
                                                    }
                                                </strong>
                                            </td>

                                            <td>
                                                {
                                                    item.student_email ||
                                                    item.student?.email ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.subject_name ||
                                                    item.subject?.name ||
                                                    item.subject ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                <span className="hod-code-badge">
                                                    {
                                                        item.subject_code ||
                                                        item.subject?.code ||
                                                        "-"
                                                    }
                                                </span>
                                            </td>

                                            <td>
                                                {
                                                    item.course_name ||
                                                    item.course?.name ||
                                                    item.course ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.department_name ||
                                                    item.department?.name ||
                                                    item.department ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                Year {item.year ?? "-"}
                                            </td>

                                            <td>
                                                <span
                                                    className={
                                                        item.status === "PRESENT"
                                                            ? "hod-status hod-status-present"
                                                            : item.status === "ABSENT"
                                                                ? "hod-status hod-status-absent"
                                                                : "hod-status"
                                                    }
                                                >
                                                    {getStatusText(
                                                        item.status
                                                    )}
                                                </span>
                                            </td>

                                            <td>
                                                {item.date || "-"}
                                            </td>

                                            <td>
                                                {
                                                    item.marked_by_name ||
                                                    item.marked_by?.username ||
                                                    item.marked_by ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                <button
                                                    type="button"
                                                    className="hod-btn hod-btn-primary hod-btn-small"
                                                    onClick={() =>
                                                        handleView(item)
                                                    }
                                                >
                                                    👁 View
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
            {selectedAttendance && (
                <div className="hod-detail-card">

                    <div className="hod-detail-header">
                        <div>
                            <h2>Attendance Details</h2>
                            <p>
                                Complete attendance information
                            </p>
                        </div>

                        <button
                            type="button"
                            className="hod-close-btn"
                            onClick={handleClose}
                        >
                            ✕
                        </button>
                    </div>

                    <div className="hod-detail-grid">

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                ID
                            </span>
                            <strong>
                                #{selectedAttendance.id}
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Student
                            </span>
                            <strong>
                                {
                                    selectedAttendance.student_name ||
                                    selectedAttendance.student?.name ||
                                    selectedAttendance.student ||
                                    "-"
                                }
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Email
                            </span>
                            <strong>
                                {
                                    selectedAttendance.student_email ||
                                    selectedAttendance.student?.email ||
                                    "-"
                                }
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Subject
                            </span>
                            <strong>
                                {
                                    selectedAttendance.subject_name ||
                                    selectedAttendance.subject?.name ||
                                    selectedAttendance.subject ||
                                    "-"
                                }
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Subject Code
                            </span>
                            <strong>
                                {
                                    selectedAttendance.subject_code ||
                                    selectedAttendance.subject?.code ||
                                    "-"
                                }
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Course / Class
                            </span>
                            <strong>
                                {
                                    selectedAttendance.course_name ||
                                    selectedAttendance.course?.name ||
                                    selectedAttendance.course ||
                                    "-"
                                }
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Department
                            </span>
                            <strong>
                                {
                                    selectedAttendance.department_name ||
                                    selectedAttendance.department?.name ||
                                    selectedAttendance.department ||
                                    "-"
                                }
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Year
                            </span>
                            <strong>
                                {selectedAttendance.year ?? "-"}
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Status
                            </span>
                            <strong>
                                {getStatusText(
                                    selectedAttendance.status
                                )}
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Date
                            </span>
                            <strong>
                                {selectedAttendance.date || "-"}
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Marked By
                            </span>
                            <strong>
                                {
                                    selectedAttendance.marked_by_name ||
                                    selectedAttendance.marked_by?.username ||
                                    selectedAttendance.marked_by ||
                                    "-"
                                }
                            </strong>
                        </div>

                    </div>

                    <div className="hod-detail-footer">
                        <button
                            type="button"
                            className="hod-btn hod-btn-secondary"
                            onClick={handleClose}
                        >
                            Close
                        </button>
                    </div>

                </div>
            )}

        </div>
    );
}

export default HODAttendance;