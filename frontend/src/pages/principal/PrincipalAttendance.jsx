// import { useEffect, useState } from "react";

// import api from "../../api/axios";


// function PrincipalAttendance() {

//     // ========================================================
//     // DATA
//     // ========================================================

//     const [attendance, setAttendance] = useState([]);

//     // ========================================================
//     // FILTERS
//     // ========================================================

//     const [search, setSearch] = useState("");

//     const [subjectFilter, setSubjectFilter] =
//         useState("");

//     const [courseFilter, setCourseFilter] =
//         useState("");

//     const [departmentFilter, setDepartmentFilter] =
//         useState("");

//     const [yearFilter, setYearFilter] =
//         useState("");

//     const [statusFilter, setStatusFilter] =
//         useState("");

//     const [dateFilter, setDateFilter] =
//         useState("");


//     // ========================================================
//     // SELECTED ATTENDANCE
//     // ========================================================

//     const [selectedAttendance, setSelectedAttendance] =
//         useState(null);


//     // ========================================================
//     // UI
//     // ========================================================

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
//                 "principal/attendance/?page_size=100"
//             );


//             console.log(
//                 "Principal Attendance:",
//                 response.data
//             );


//             setAttendance(
//                 response.data.results ||
//                 response.data ||
//                 []
//             );


//         } catch (error) {

//             console.error(
//                 "Principal Attendance Error:",
//                 error.response?.data || error
//             );


//             setAttendance([]);


//             setError(
//                 error.response?.data?.detail ||
//                 "Unable to load attendance."
//             );


//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // SUBJECT OPTIONS
//     // ========================================================

//     const subjectOptions = [

//         ...new Map(

//             attendance.map(
//                 (item) => [

//                     item.subject_id ??
//                     item.subject,

//                     item.subject_name ||
//                     item.subject?.name ||
//                     item.subject ||
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
//     // COURSE OPTIONS
//     // ========================================================

//     const courseOptions = [

//         ...new Map(

//             attendance.map(
//                 (item) => [

//                     item.course_id ??
//                     item.course,

//                     item.course_name ||
//                     item.course?.name ||
//                     item.course ||
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

//             attendance.map(
//                 (item) => [

//                     item.department_id ??
//                     item.department,

//                     item.department_name ||
//                     item.department?.name ||
//                     item.department ||
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

//             attendance
//                 .map(
//                     (item) => item.year
//                 )
//                 .filter(
//                     (year) =>
//                         year !== null &&
//                         year !== undefined
//                 )

//         )

//     ].sort(
//         (a, b) => a - b
//     );


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


//                 const courseName =
//                     String(
//                         item.course_name ||
//                         item.course?.name ||
//                         item.course ||
//                         ""
//                     );


//                 const departmentName =
//                     String(
//                         item.department_name ||
//                         item.department?.name ||
//                         item.department ||
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

//                     subjectName
//                         .toLowerCase()
//                         .includes(
//                             searchValue
//                         )

//                     ||

//                     subjectCode
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


//                 const matchesSubject =

//                     subjectFilter === ""

//                     ||

//                     String(
//                         item.subject_id ??
//                         item.subject
//                     ) ===
//                     String(
//                         subjectFilter
//                     );


//                 const matchesCourse =

//                     courseFilter === ""

//                     ||

//                     String(
//                         item.course_id ??
//                         item.course
//                     ) ===
//                     String(
//                         courseFilter
//                     );


//                 const matchesDepartment =

//                     departmentFilter === ""

//                     ||

//                     String(
//                         item.department_id ??
//                         item.department
//                     ) ===
//                     String(
//                         departmentFilter
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
//                     ).toUpperCase() ===
//                     String(
//                         statusFilter
//                     ).toUpperCase();


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

//                     matchesSubject

//                     &&

//                     matchesCourse

//                     &&

//                     matchesDepartment

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

//         setSubjectFilter("");

//         setCourseFilter("");

//         setDepartmentFilter("");

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
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (

//             <div>

//                 <h1>
//                     Principal Attendance
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
//                 Principal Attendance
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
//                     placeholder="Search student / email / subject / course..."
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
//                 SUBJECT FILTER
//             ================================================= */}

//             <div>

//                 <label>
//                     Subject:
//                 </label>

//                 {" "}


//                 <select
//                     value={
//                         subjectFilter
//                     }
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
//                     Course:
//                 </label>

//                 {" "}


//                 <select
//                     value={
//                         courseFilter
//                     }
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
//                 DEPARTMENT FILTER
//             ================================================= */}

//             <div>

//                 <label>
//                     Department:
//                 </label>

//                 {" "}


//                 <select
//                     value={
//                         departmentFilter
//                     }
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
//                 YEAR FILTER
//             ================================================= */}

//             <div>

//                 <label>
//                     Year:
//                 </label>

//                 {" "}


//                 <select
//                     value={
//                         yearFilter
//                     }
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
//                     Status:
//                 </label>

//                 {" "}


//                 <select
//                     value={
//                         statusFilter
//                     }
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
//                     Date:
//                 </label>

//                 {" "}


//                 <input
//                     type="date"
//                     value={
//                         dateFilter
//                     }
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

//             {filteredAttendance.length === 0 ? (

//                 <p>
//                     No attendance records found.
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
//                                 Date
//                             </th>

//                             <th>
//                                 Student
//                             </th>

//                             <th>
//                                 Email
//                             </th>

//                             <th>
//                                 Subject
//                             </th>

//                             <th>
//                                 Subject Code
//                             </th>

//                             <th>
//                                 Course
//                             </th>

//                             <th>
//                                 Department
//                             </th>

//                             <th>
//                                 Year
//                             </th>

//                             <th>
//                                 Status
//                             </th>

//                             <th>
//                                 Marked By
//                             </th>

//                             <th>
//                                 Action
//                             </th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {filteredAttendance.map(
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
//                                             item.date ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.student_name ||
//                                             item.student?.name ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.student_email ||
//                                             item.student?.email ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.subject_name ||
//                                             item.subject?.name ||
//                                             item.subject ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.subject_code ||
//                                             item.subject?.code ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.course_name ||
//                                             item.course?.name ||
//                                             item.course ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.department_name ||
//                                             item.department?.name ||
//                                             item.department ||
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
//                                             item.status ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.marked_by_name ||
//                                             item.marked_by ||
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
//                 ATTENDANCE DETAILS
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
//                             Date:
//                         </strong>{" "}

//                         {
//                             selectedAttendance.date ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Student:
//                         </strong>{" "}

//                         {
//                             selectedAttendance.student_name ||
//                             selectedAttendance.student?.name ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Email:
//                         </strong>{" "}

//                         {
//                             selectedAttendance.student_email ||
//                             selectedAttendance.student?.email ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Subject:
//                         </strong>{" "}

//                         {
//                             selectedAttendance.subject_name ||
//                             selectedAttendance.subject?.name ||
//                             selectedAttendance.subject ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Subject Code:
//                         </strong>{" "}

//                         {
//                             selectedAttendance.subject_code ||
//                             selectedAttendance.subject?.code ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Course:
//                         </strong>{" "}

//                         {
//                             selectedAttendance.course_name ||
//                             selectedAttendance.course?.name ||
//                             selectedAttendance.course ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Department:
//                         </strong>{" "}

//                         {
//                             selectedAttendance.department_name ||
//                             selectedAttendance.department?.name ||
//                             selectedAttendance.department ||
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
//                             selectedAttendance.status ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Marked By:
//                         </strong>{" "}

//                         {
//                             selectedAttendance.marked_by_name ||
//                             selectedAttendance.marked_by ||
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


// export default PrincipalAttendance;
import { useEffect, useState } from "react";
import api from "../../api/axios";

function PrincipalAttendance() {

    // ========================================================
    // DATA
    // ========================================================

    const [attendance, setAttendance] = useState([]);

    // ========================================================
    // FILTERS
    // ========================================================

    const [search, setSearch] = useState("");
    const [subjectFilter, setSubjectFilter] = useState("");
    const [courseFilter, setCourseFilter] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [yearFilter, setYearFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");

    // ========================================================
    // SELECTED ATTENDANCE
    // ========================================================

    const [selectedAttendance, setSelectedAttendance] =
        useState(null);

    // ========================================================
    // UI
    // ========================================================

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ========================================================
    // LOAD ATTENDANCE
    // ========================================================

    useEffect(() => {
        loadAttendance();
    }, []);

    const loadAttendance = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "principal/attendance/?page_size=100"
            );

            console.log(
                "Principal Attendance:",
                response.data
            );

            setAttendance(
                response.data.results ||
                response.data ||
                []
            );

        } catch (error) {

            console.error(
                "Principal Attendance Error:",
                error.response?.data || error
            );

            setAttendance([]);

            setError(
                error.response?.data?.detail ||
                "Unable to load attendance."
            );

        } finally {
            setLoading(false);
        }
    };

    // ========================================================
    // OPTIONS
    // ========================================================

    const subjectOptions = [
        ...new Map(
            attendance.map((item) => [
                item.subject_id ?? item.subject,
                item.subject_name ||
                item.subject?.name ||
                item.subject ||
                "-"
            ])
        ).entries()
    ].filter(
        ([id]) =>
            id !== null &&
            id !== undefined
    );

    const courseOptions = [
        ...new Map(
            attendance.map((item) => [
                item.course_id ?? item.course,
                item.course_name ||
                item.course?.name ||
                item.course ||
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
            attendance.map((item) => [
                item.department_id ?? item.department,
                item.department_name ||
                item.department?.name ||
                item.department ||
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
            attendance
                .map((item) => item.year)
                .filter(
                    (year) =>
                        year !== null &&
                        year !== undefined
                )
        )
    ].sort((a, b) => a - b);

    // ========================================================
    // FILTER ATTENDANCE
    // ========================================================

    const filteredAttendance = attendance.filter(
        (item) => {

            const searchValue =
                search.toLowerCase().trim();

            const studentName = String(
                item.student_name ||
                item.student?.name ||
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

            const courseName = String(
                item.course_name ||
                item.course?.name ||
                item.course ||
                ""
            );

            const departmentName = String(
                item.department_name ||
                item.department?.name ||
                item.department ||
                ""
            );

            const matchesSearch =
                searchValue === "" ||
                studentName.toLowerCase().includes(searchValue) ||
                studentEmail.toLowerCase().includes(searchValue) ||
                subjectName.toLowerCase().includes(searchValue) ||
                subjectCode.toLowerCase().includes(searchValue) ||
                courseName.toLowerCase().includes(searchValue) ||
                departmentName.toLowerCase().includes(searchValue);

            const matchesSubject =
                subjectFilter === "" ||
                String(
                    item.subject_id ??
                    item.subject
                ) === String(subjectFilter);

            const matchesCourse =
                courseFilter === "" ||
                String(
                    item.course_id ??
                    item.course
                ) === String(courseFilter);

            const matchesDepartment =
                departmentFilter === "" ||
                String(
                    item.department_id ??
                    item.department
                ) === String(departmentFilter);

            const matchesYear =
                yearFilter === "" ||
                String(item.year) ===
                String(yearFilter);

            const matchesStatus =
                statusFilter === "" ||
                String(item.status).toUpperCase() ===
                String(statusFilter).toUpperCase();

            const matchesDate =
                dateFilter === "" ||
                String(item.date) ===
                String(dateFilter);

            return (
                matchesSearch &&
                matchesSubject &&
                matchesCourse &&
                matchesDepartment &&
                matchesYear &&
                matchesStatus &&
                matchesDate
            );
        }
    );

    // ========================================================
    // ACTIONS
    // ========================================================

    const handleView = (item) => {
        setSelectedAttendance(item);
    };

    const handleClose = () => {
        setSelectedAttendance(null);
    };

    const clearFilters = () => {
        setSearch("");
        setSubjectFilter("");
        setCourseFilter("");
        setDepartmentFilter("");
        setYearFilter("");
        setStatusFilter("");
        setDateFilter("");
    };

    const refreshAttendance = () => {
        loadAttendance();
    };

    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {
        return (
            <div className="principal-page principal-attendance-page">
                <div className="principal-state-card">

                    <div className="principal-loading-icon">
                        ⏳
                    </div>

                    <h2>
                        Principal Attendance
                    </h2>

                    <p>
                        Loading attendance...
                    </p>

                </div>
            </div>
        );
    }

    // ========================================================
    // UI
    // ========================================================

    return (
        <div className="principal-page principal-attendance-page">

            {/* PAGE HEADER */}

            <div className="principal-page-header">

                <div>
                    <h1 className="principal-page-title">
                        Principal Attendance
                    </h1>

                    <p className="principal-page-subtitle">
                        Monitor student attendance records
                    </p>
                </div>

                <div className="principal-header-badge">
                    Attendance
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
                        onClick={refreshAttendance}
                    >
                        Retry
                    </button>

                </div>
            )}

            {/* FILTERS */}

            <div className="principal-toolbar">

                <div className="principal-field principal-field-wide">

                    <label>
                        Search
                    </label>

                    <input
                        type="text"
                        className="principal-input"
                        placeholder="Search student / email / subject / course..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                <div className="principal-field">

                    <label>
                        Subject
                    </label>

                    <select
                        className="principal-select"
                        value={subjectFilter}
                        onChange={(e) =>
                            setSubjectFilter(e.target.value)
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

                <div className="principal-field">

                    <label>
                        Course
                    </label>

                    <select
                        className="principal-select"
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

                <div className="principal-field">

                    <label>
                        Department
                    </label>

                    <select
                        className="principal-select"
                        value={departmentFilter}
                        onChange={(e) =>
                            setDepartmentFilter(e.target.value)
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

                    <label>
                        Year
                    </label>

                    <select
                        className="principal-select"
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

                <div className="principal-field">

                    <label>
                        Status
                    </label>

                    <select
                        className="principal-select"
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
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

                <div className="principal-field">

                    <label>
                        Date
                    </label>

                    <input
                        type="date"
                        className="principal-input"
                        value={dateFilter}
                        onChange={(e) =>
                            setDateFilter(e.target.value)
                        }
                    />

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
                        onClick={refreshAttendance}
                    >
                        ↻ Refresh
                    </button>

                </div>

            </div>

            {/* COUNT */}

            <div className="principal-count">
                Showing{" "}
                <strong>
                    {filteredAttendance.length}
                </strong>{" "}
                attendance record(s)
            </div>

            {/* TABLE */}

            {filteredAttendance.length === 0 ? (

                <div className="principal-state-card">

                    <div className="principal-empty-icon">
                        📅
                    </div>

                    <h3>
                        No attendance records found
                    </h3>

                    <p>
                        No attendance records match your current filters.
                    </p>

                </div>

            ) : (

                <div className="principal-table-card">

                    <div className="principal-table-wrap">

                        <table className="principal-table">

                            <thead>

                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Student</th>
                                    <th>Email</th>
                                    <th>Subject</th>
                                    <th>Subject Code</th>
                                    <th>Course</th>
                                    <th>Department</th>
                                    <th>Year</th>
                                    <th>Status</th>
                                    <th>Marked By</th>
                                    <th>Action</th>
                                </tr>

                            </thead>

                            <tbody>

                                {filteredAttendance.map(
                                    (item) => (

                                        <tr key={item.id}>

                                            <td>
                                                <span className="principal-id">
                                                    {item.id}
                                                </span>
                                            </td>

                                            <td>
                                                {item.date || "-"}
                                            </td>

                                            <td>
                                                <strong>
                                                    {item.student_name ||
                                                        item.student?.name ||
                                                        "-"}
                                                </strong>
                                            </td>

                                            <td>
                                                {item.student_email ||
                                                    item.student?.email ||
                                                    "-"}
                                            </td>

                                            <td>
                                                {item.subject_name ||
                                                    item.subject?.name ||
                                                    item.subject ||
                                                    "-"}
                                            </td>

                                            <td>
                                                {item.subject_code ||
                                                    item.subject?.code ||
                                                    "-"}
                                            </td>

                                            <td>
                                                {item.course_name ||
                                                    item.course?.name ||
                                                    item.course ||
                                                    "-"}
                                            </td>

                                            <td>
                                                {item.department_name ||
                                                    item.department?.name ||
                                                    item.department ||
                                                    "-"}
                                            </td>

                                            <td>
                                                {item.year ?? "-"}
                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        `principal-status ${
                                                            String(item.status).toUpperCase() === "PRESENT"
                                                                ? "principal-status-present"
                                                                : "principal-status-absent"
                                                        }`
                                                    }
                                                >
                                                    {item.status || "-"}
                                                </span>

                                            </td>

                                            <td>
                                                {item.marked_by_name ||
                                                    item.marked_by ||
                                                    "-"}
                                            </td>

                                            <td>

                                                <button
                                                    type="button"
                                                    className="principal-btn principal-btn-secondary principal-btn-sm"
                                                    onClick={() =>
                                                        handleView(item)
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

            {selectedAttendance && (

                <div className="principal-detail-card">

                    <div className="principal-detail-header">

                        <div>
                            <h2>
                                Attendance Details
                            </h2>

                            <p>
                                Complete attendance information
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
                                {selectedAttendance.id}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Date
                            </span>
                            <span className="principal-detail-value">
                                {selectedAttendance.date || "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Student
                            </span>
                            <span className="principal-detail-value">
                                {selectedAttendance.student_name ||
                                    selectedAttendance.student?.name ||
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Email
                            </span>
                            <span className="principal-detail-value">
                                {selectedAttendance.student_email ||
                                    selectedAttendance.student?.email ||
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Subject
                            </span>
                            <span className="principal-detail-value">
                                {selectedAttendance.subject_name ||
                                    selectedAttendance.subject?.name ||
                                    selectedAttendance.subject ||
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Subject Code
                            </span>
                            <span className="principal-detail-value">
                                {selectedAttendance.subject_code ||
                                    selectedAttendance.subject?.code ||
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Course
                            </span>
                            <span className="principal-detail-value">
                                {selectedAttendance.course_name ||
                                    selectedAttendance.course?.name ||
                                    selectedAttendance.course ||
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Department
                            </span>
                            <span className="principal-detail-value">
                                {selectedAttendance.department_name ||
                                    selectedAttendance.department?.name ||
                                    selectedAttendance.department ||
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Year
                            </span>
                            <span className="principal-detail-value">
                                {selectedAttendance.year ?? "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Status
                            </span>
                            <span className="principal-detail-value">
                                {selectedAttendance.status || "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Marked By
                            </span>
                            <span className="principal-detail-value">
                                {selectedAttendance.marked_by_name ||
                                    selectedAttendance.marked_by ||
                                    "-"}
                            </span>
                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default PrincipalAttendance;