// import { useEffect, useState } from "react";

// import api from "../../api/axios";


// function HODAssignments() {

//     const [assignments, setAssignments] = useState([]);

//     const [search, setSearch] = useState("");

//     const [subjectFilter, setSubjectFilter] = useState("");

//     const [examFilter, setExamFilter] = useState("");

//     const [studentFilter, setStudentFilter] = useState("");

//     const [selectedAssignment, setSelectedAssignment] =
//         useState(null);

//     const [loading, setLoading] = useState(true);

//     const [error, setError] = useState("");


//     // ========================================================
//     // LOAD ASSIGNMENTS
//     // ========================================================

//     useEffect(() => {

//         loadAssignments();

//     }, []);


//     const loadAssignments = async () => {

//         try {

//             setLoading(true);

//             setError("");


//             const response = await api.get(
//                 "hod/assignments/?page_size=100"
//             );


//             console.log(
//                 "HOD ASSIGNMENTS:",
//                 response.data
//             );


//             setAssignments(
//                 response.data.results ||
//                 response.data ||
//                 []
//             );


//         } catch (error) {

//             console.error(
//                 "HOD Assignments Error:",
//                 error.response?.data || error
//             );


//             setAssignments([]);


//             setError(
//                 error.response?.data?.detail ||
//                 "Failed to load assignments."
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

//             assignments.map(
//                 (assignment) => [

//                     assignment.subject,

//                     assignment.subject_name ||
//                     assignment.subject?.name ||
//                     assignment.subject ||
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
//     // EXAM OPTIONS
//     // ========================================================

//     const examOptions = [

//         ...new Map(

//             assignments.map(
//                 (assignment) => [

//                     assignment.exam,

//                     assignment.exam_name ||
//                     assignment.exam?.name ||
//                     assignment.exam ||
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
//     // STUDENT OPTIONS
//     // ========================================================

//     const studentOptions = [

//         ...new Map(

//             assignments.map(
//                 (assignment) => [

//                     assignment.student,

//                     assignment.student_name ||
//                     assignment.student?.name ||
//                     assignment.student ||
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
//     // FILTER ASSIGNMENTS
//     // ========================================================

//     const filteredAssignments =
//         assignments.filter(
//             (assignment) => {

//                 const searchValue =
//                     search
//                         .toLowerCase()
//                         .trim();


//                 const title =
//                     String(
//                         assignment.title ||
//                         ""
//                     );


//                 const subjectName =
//                     String(
//                         assignment.subject_name ||
//                         assignment.subject?.name ||
//                         assignment.subject ||
//                         ""
//                     );


//                 const subjectCode =
//                     String(
//                         assignment.subject_code ||
//                         assignment.subject?.code ||
//                         ""
//                     );


//                 const examName =
//                     String(
//                         assignment.exam_name ||
//                         assignment.exam?.name ||
//                         assignment.exam ||
//                         ""
//                     );


//                 const studentName =
//                     String(
//                         assignment.student_name ||
//                         assignment.student?.name ||
//                         assignment.student ||
//                         ""
//                     );


//                 const courseName =
//                     String(
//                         assignment.course_name ||
//                         assignment.course?.name ||
//                         ""
//                     );


//                 const departmentName =
//                     String(
//                         assignment.department_name ||
//                         assignment.department?.name ||
//                         ""
//                     );


//                 // ------------------------------------------------
//                 // SEARCH
//                 // ------------------------------------------------

//                 const matchesSearch =

//                     searchValue === ""

//                     ||

//                     title
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

//                     examName
//                         .toLowerCase()
//                         .includes(
//                             searchValue
//                         )

//                     ||

//                     studentName
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


//                 // ------------------------------------------------
//                 // SUBJECT
//                 // ------------------------------------------------

//                 const matchesSubject =

//                     subjectFilter === ""

//                     ||

//                     String(
//                         assignment.subject
//                     ) ===
//                     String(
//                         subjectFilter
//                     );


//                 // ------------------------------------------------
//                 // EXAM
//                 // ------------------------------------------------

//                 const matchesExam =

//                     examFilter === ""

//                     ||

//                     String(
//                         assignment.exam
//                     ) ===
//                     String(
//                         examFilter
//                     );


//                 // ------------------------------------------------
//                 // STUDENT
//                 // ------------------------------------------------

//                 const matchesStudent =

//                     studentFilter === ""

//                     ||

//                     String(
//                         assignment.student
//                     ) ===
//                     String(
//                         studentFilter
//                     );


//                 return (

//                     matchesSearch

//                     &&

//                     matchesSubject

//                     &&

//                     matchesExam

//                     &&

//                     matchesStudent

//                 );

//             }
//         );


//     // ========================================================
//     // VIEW DETAILS
//     // ========================================================

//     const handleView = (
//         assignment
//     ) => {

//         setSelectedAssignment(
//             assignment
//         );

//     };


//     // ========================================================
//     // CLOSE DETAILS
//     // ========================================================

//     const handleClose = () => {

//         setSelectedAssignment(
//             null
//         );

//     };


//     // ========================================================
//     // CLEAR FILTERS
//     // ========================================================

//     const clearFilters = () => {

//         setSearch("");

//         setSubjectFilter("");

//         setExamFilter("");

//         setStudentFilter("");

//     };


//     // ========================================================
//     // REFRESH
//     // ========================================================

//     const refreshAssignments = () => {

//         loadAssignments();

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (

//             <div>

//                 <h1>
//                     HOD Assignments
//                 </h1>

//                 <p>
//                     Loading assignments...
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
//                 HOD Assignments
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
//                             refreshAssignments
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
//                     placeholder="Search assignment / subject / exam / student..."
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
//                 EXAM FILTER
//             ================================================= */}

//             <div>

//                 <label>
//                     Exam:
//                 </label>

//                 {" "}


//                 <select
//                     value={examFilter}
//                     onChange={(e) =>
//                         setExamFilter(
//                             e.target.value
//                         )
//                     }
//                 >

//                     <option value="">
//                         All Exams
//                     </option>


//                     {examOptions.map(
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
//                 STUDENT FILTER
//             ================================================= */}

//             <div>

//                 <label>
//                     Student:
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
//                     refreshAssignments
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
//                     filteredAssignments.length
//                 }

//                 {" "}
//                 assignment(s)

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
//                             Title
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
//                             Exam
//                         </th>

//                         <th>
//                             Student
//                         </th>

//                         <th>
//                             Due Date
//                         </th>

//                         <th>
//                             Assigned By
//                         </th>

//                         <th>
//                             Action
//                         </th>

//                     </tr>

//                 </thead>


//                 <tbody>

//                     {filteredAssignments.length === 0 ? (

//                         <tr>

//                             <td colSpan="12">

//                                 No assignments found.

//                             </td>

//                         </tr>

//                     ) : (

//                         filteredAssignments.map(
//                             (assignment) => (

//                                 <tr
//                                     key={
//                                         assignment.id
//                                     }
//                                 >

//                                     {/* ID */}

//                                     <td>
//                                         {
//                                             assignment.id
//                                         }
//                                     </td>


//                                     {/* TITLE */}

//                                     <td>
//                                         {
//                                             assignment.title ||
//                                             "-"
//                                         }
//                                     </td>


//                                     {/* SUBJECT */}

//                                     <td>
//                                         {
//                                             assignment.subject_name ||
//                                             assignment.subject?.name ||
//                                             assignment.subject ||
//                                             "-"
//                                         }
//                                     </td>


//                                     {/* SUBJECT CODE */}

//                                     <td>
//                                         {
//                                             assignment.subject_code ||
//                                             assignment.subject?.code ||
//                                             "-"
//                                         }
//                                     </td>


//                                     {/* COURSE */}

//                                     <td>
//                                         {
//                                             assignment.course_name ||
//                                             assignment.course?.name ||
//                                             "-"
//                                         }
//                                     </td>


//                                     {/* DEPARTMENT */}

//                                     <td>
//                                         {
//                                             assignment.department_name ||
//                                             assignment.department?.name ||
//                                             "-"
//                                         }
//                                     </td>


//                                     {/* YEAR */}

//                                     <td>
//                                         {
//                                             assignment.student_year ??
//                                             assignment.subject_year ??
//                                             "-"
//                                         }
//                                     </td>


//                                     {/* EXAM */}

//                                     <td>
//                                         {
//                                             assignment.exam_name ||
//                                             assignment.exam?.name ||
//                                             assignment.exam ||
//                                             "-"
//                                         }
//                                     </td>


//                                     {/* STUDENT */}

//                                     <td>
//                                         {
//                                             assignment.student_name ||
//                                             assignment.student?.name ||
//                                             assignment.student ||
//                                             "-"
//                                         }
//                                     </td>


//                                     {/* DUE DATE */}

//                                     <td>
//                                         {
//                                             assignment.due_date ||
//                                             "-"
//                                         }
//                                     </td>


//                                     {/* ASSIGNED BY */}

//                                     <td>
//                                         {
//                                             assignment.assigned_by_name ||
//                                             assignment.assigned_by?.username ||
//                                             assignment.assigned_by ||
//                                             "-"
//                                         }
//                                     </td>


//                                     {/* ACTION */}

//                                     <td>

//                                         <button
//                                             type="button"
//                                             onClick={() =>
//                                                 handleView(
//                                                     assignment
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
//                 DETAILS
//             ================================================= */}

//             {selectedAssignment && (

//                 <div>

//                     <hr />


//                     <h2>
//                         Assignment Details
//                     </h2>


//                     <p>

//                         <strong>
//                             ID:
//                         </strong>{" "}

//                         {
//                             selectedAssignment.id
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Title:
//                         </strong>{" "}

//                         {
//                             selectedAssignment.title ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Description:
//                         </strong>{" "}

//                         {
//                             selectedAssignment.description ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Subject:
//                         </strong>{" "}

//                         {
//                             selectedAssignment.subject_name ||
//                             selectedAssignment.subject?.name ||
//                             selectedAssignment.subject ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Subject Code:
//                         </strong>{" "}

//                         {
//                             selectedAssignment.subject_code ||
//                             selectedAssignment.subject?.code ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Course / Class:
//                         </strong>{" "}

//                         {
//                             selectedAssignment.course_name ||
//                             selectedAssignment.course?.name ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Department:
//                         </strong>{" "}

//                         {
//                             selectedAssignment.department_name ||
//                             selectedAssignment.department?.name ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Year:
//                         </strong>{" "}

//                         {
//                             selectedAssignment.student_year ??
//                             selectedAssignment.subject_year ??
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Exam:
//                         </strong>{" "}

//                         {
//                             selectedAssignment.exam_name ||
//                             selectedAssignment.exam?.name ||
//                             selectedAssignment.exam ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Student:
//                         </strong>{" "}

//                         {
//                             selectedAssignment.student_name ||
//                             selectedAssignment.student?.name ||
//                             selectedAssignment.student ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Student Email:
//                         </strong>{" "}

//                         {
//                             selectedAssignment.student_email ||
//                             selectedAssignment.student?.email ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Due Date:
//                         </strong>{" "}

//                         {
//                             selectedAssignment.due_date ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Assigned By:
//                         </strong>{" "}

//                         {
//                             selectedAssignment.assigned_by_name ||
//                             selectedAssignment.assigned_by?.username ||
//                             selectedAssignment.assigned_by ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Created At:
//                         </strong>{" "}

//                         {
//                             selectedAssignment.created_at ||
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


// export default HODAssignments;
import { useEffect, useState } from "react";
import api from "../../api/axios";

function HODAssignments() {
    const [assignments, setAssignments] = useState([]);
    const [search, setSearch] = useState("");
    const [subjectFilter, setSubjectFilter] = useState("");
    const [examFilter, setExamFilter] = useState("");
    const [studentFilter, setStudentFilter] = useState("");
    const [selectedAssignment, setSelectedAssignment] =
        useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadAssignments();
    }, []);

    const loadAssignments = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "hod/assignments/?page_size=100"
            );

            console.log(
                "HOD ASSIGNMENTS:",
                response.data
            );

            setAssignments(
                response.data.results ||
                response.data ||
                []
            );
        } catch (error) {
            console.error(
                "HOD Assignments Error:",
                error.response?.data || error
            );

            setAssignments([]);

            setError(
                error.response?.data?.detail ||
                "Failed to load assignments."
            );
        } finally {
            setLoading(false);
        }
    };

    const subjectOptions = [
        ...new Map(
            assignments.map((assignment) => [
                assignment.subject,
                assignment.subject_name ||
                assignment.subject?.name ||
                assignment.subject ||
                "-"
            ])
        ).entries()
    ].filter(
        ([id]) =>
            id !== null &&
            id !== undefined
    );

    const examOptions = [
        ...new Map(
            assignments.map((assignment) => [
                assignment.exam,
                assignment.exam_name ||
                assignment.exam?.name ||
                assignment.exam ||
                "-"
            ])
        ).entries()
    ].filter(
        ([id]) =>
            id !== null &&
            id !== undefined
    );

    const studentOptions = [
        ...new Map(
            assignments.map((assignment) => [
                assignment.student,
                assignment.student_name ||
                assignment.student?.name ||
                assignment.student ||
                "-"
            ])
        ).entries()
    ].filter(
        ([id]) =>
            id !== null &&
            id !== undefined
    );

    const filteredAssignments =
        assignments.filter((assignment) => {

            const searchValue =
                search.toLowerCase().trim();

            const title = String(
                assignment.title || ""
            );

            const subjectName = String(
                assignment.subject_name ||
                assignment.subject?.name ||
                assignment.subject ||
                ""
            );

            const subjectCode = String(
                assignment.subject_code ||
                assignment.subject?.code ||
                ""
            );

            const examName = String(
                assignment.exam_name ||
                assignment.exam?.name ||
                assignment.exam ||
                ""
            );

            const studentName = String(
                assignment.student_name ||
                assignment.student?.name ||
                assignment.student ||
                ""
            );

            const courseName = String(
                assignment.course_name ||
                assignment.course?.name ||
                ""
            );

            const departmentName = String(
                assignment.department_name ||
                assignment.department?.name ||
                ""
            );

            const matchesSearch =
                searchValue === "" ||
                title
                    .toLowerCase()
                    .includes(searchValue) ||
                subjectName
                    .toLowerCase()
                    .includes(searchValue) ||
                subjectCode
                    .toLowerCase()
                    .includes(searchValue) ||
                examName
                    .toLowerCase()
                    .includes(searchValue) ||
                studentName
                    .toLowerCase()
                    .includes(searchValue) ||
                courseName
                    .toLowerCase()
                    .includes(searchValue) ||
                departmentName
                    .toLowerCase()
                    .includes(searchValue);

            const matchesSubject =
                subjectFilter === "" ||
                String(assignment.subject) ===
                String(subjectFilter);

            const matchesExam =
                examFilter === "" ||
                String(assignment.exam) ===
                String(examFilter);

            const matchesStudent =
                studentFilter === "" ||
                String(assignment.student) ===
                String(studentFilter);

            return (
                matchesSearch &&
                matchesSubject &&
                matchesExam &&
                matchesStudent
            );
        });

    const handleView = (assignment) => {
        setSelectedAssignment(assignment);
    };

    const handleClose = () => {
        setSelectedAssignment(null);
    };

    const clearFilters = () => {
        setSearch("");
        setSubjectFilter("");
        setExamFilter("");
        setStudentFilter("");
    };

    const refreshAssignments = () => {
        loadAssignments();
    };

    if (loading) {
        return (
            <div className="hod-page hod-assignments-page">
                <div className="hod-state-card">
                    <div className="hod-loading-icon">📂</div>
                    <h2>HOD Assignments</h2>
                    <p>Loading assignments...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="hod-page hod-assignments-page">

            {/* HEADER */}
            <div className="hod-page-header">
                <div>
                    <h1 className="hod-page-title">
                        HOD Assignments
                    </h1>

                    <p className="hod-page-subtitle">
                        View assignments assigned to students in your department.
                    </p>
                </div>

                <div className="hod-header-badge">
                    📂 {filteredAssignments.length} Assignments
                </div>
            </div>

            {/* ERROR */}
            {error && (
                <div className="hod-alert hod-alert-error">

                    <div>
                        <strong>
                            Unable to load assignments
                        </strong>

                        <p>{error}</p>
                    </div>

                    <button
                        type="button"
                        className="hod-btn hod-btn-danger"
                        onClick={refreshAssignments}
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
                            Assignment Filters
                        </h2>

                        <p className="hod-section-subtitle">
                            Search and filter assignments.
                        </p>
                    </div>
                </div>

                <div className="hod-filter-grid">

                    {/* SEARCH */}
                    <div className="hod-field hod-field-wide">
                        <label className="hod-form-label">
                            Search
                        </label>

                        <input
                            type="text"
                            className="hod-input"
                            placeholder="Assignment / subject / exam / student..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />
                    </div>

                    {/* SUBJECT */}
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

                    {/* EXAM */}
                    <div className="hod-field">
                        <label className="hod-form-label">
                            Exam
                        </label>

                        <select
                            className="hod-select"
                            value={examFilter}
                            onChange={(e) =>
                                setExamFilter(
                                    e.target.value
                                )
                            }
                        >
                            <option value="">
                                All Exams
                            </option>

                            {examOptions.map(
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

                    {/* STUDENT */}
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

                    {/* BUTTONS */}
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
                            onClick={refreshAssignments}
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
                    {filteredAssignments.length}
                </strong>{" "}
                assignment(s)
            </div>

            {/* TABLE */}
            <div className="hod-table-card">

                <div className="hod-table-header">
                    <div>
                        <h2>Assignments</h2>
                        <span>
                            Assignment records
                        </span>
                    </div>
                </div>

                <div className="hod-table-wrap">

                    <table className="hod-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Subject</th>
                                <th>Subject Code</th>
                                <th>Course / Class</th>
                                <th>Department</th>
                                <th>Year</th>
                                <th>Exam</th>
                                <th>Student</th>
                                <th>Due Date</th>
                                <th>Assigned By</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredAssignments.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="12"
                                        className="hod-empty"
                                    >
                                        No assignments found.
                                    </td>
                                </tr>
                            ) : (
                                filteredAssignments.map(
                                    (assignment) => (
                                        <tr
                                            key={assignment.id}
                                        >
                                            <td>
                                                #{assignment.id}
                                            </td>

                                            <td>
                                                <strong>
                                                    {assignment.title || "-"}
                                                </strong>
                                            </td>

                                            <td>
                                                {
                                                    assignment.subject_name ||
                                                    assignment.subject?.name ||
                                                    assignment.subject ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                <span className="hod-code-badge">
                                                    {
                                                        assignment.subject_code ||
                                                        assignment.subject?.code ||
                                                        "-"
                                                    }
                                                </span>
                                            </td>

                                            <td>
                                                {
                                                    assignment.course_name ||
                                                    assignment.course?.name ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    assignment.department_name ||
                                                    assignment.department?.name ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    assignment.student_year ??
                                                    assignment.subject_year ??
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    assignment.exam_name ||
                                                    assignment.exam?.name ||
                                                    assignment.exam ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    assignment.student_name ||
                                                    assignment.student?.name ||
                                                    assignment.student ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {assignment.due_date || "-"}
                                            </td>

                                            <td>
                                                {
                                                    assignment.assigned_by_name ||
                                                    assignment.assigned_by?.username ||
                                                    assignment.assigned_by ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                <button
                                                    type="button"
                                                    className="hod-btn hod-btn-primary hod-btn-small"
                                                    onClick={() =>
                                                        handleView(
                                                            assignment
                                                        )
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
            {selectedAssignment && (
                <div className="hod-detail-card">

                    <div className="hod-detail-header">
                        <div>
                            <h2>Assignment Details</h2>
                            <p>
                                Complete assignment information
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
                                #{selectedAssignment.id}
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Title
                            </span>
                            <strong>
                                {selectedAssignment.title || "-"}
                            </strong>
                        </div>

                        <div className="hod-detail-item hod-detail-full">
                            <span className="hod-detail-label">
                                Description
                            </span>
                            <strong>
                                {selectedAssignment.description || "-"}
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Subject
                            </span>
                            <strong>
                                {
                                    selectedAssignment.subject_name ||
                                    selectedAssignment.subject?.name ||
                                    selectedAssignment.subject ||
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
                                    selectedAssignment.subject_code ||
                                    selectedAssignment.subject?.code ||
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
                                    selectedAssignment.course_name ||
                                    selectedAssignment.course?.name ||
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
                                    selectedAssignment.department_name ||
                                    selectedAssignment.department?.name ||
                                    "-"
                                }
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Year
                            </span>
                            <strong>
                                {
                                    selectedAssignment.student_year ??
                                    selectedAssignment.subject_year ??
                                    "-"
                                }
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Exam
                            </span>
                            <strong>
                                {
                                    selectedAssignment.exam_name ||
                                    selectedAssignment.exam?.name ||
                                    selectedAssignment.exam ||
                                    "-"
                                }
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Student
                            </span>
                            <strong>
                                {
                                    selectedAssignment.student_name ||
                                    selectedAssignment.student?.name ||
                                    selectedAssignment.student ||
                                    "-"
                                }
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Student Email
                            </span>
                            <strong>
                                {
                                    selectedAssignment.student_email ||
                                    selectedAssignment.student?.email ||
                                    "-"
                                }
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Due Date
                            </span>
                            <strong>
                                {selectedAssignment.due_date || "-"}
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Assigned By
                            </span>
                            <strong>
                                {
                                    selectedAssignment.assigned_by_name ||
                                    selectedAssignment.assigned_by?.username ||
                                    selectedAssignment.assigned_by ||
                                    "-"
                                }
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Created At
                            </span>
                            <strong>
                                {
                                    selectedAssignment.created_at ||
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



export default HODAssignments;