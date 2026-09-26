// import { useEffect, useState } from "react";

// import api from "../../api/axios";


// function HODReExams() {

//     const [reexams, setReexams] = useState([]);


//     // ========================================================
//     // FILTERS
//     // ========================================================

//     const [search, setSearch] = useState("");

//     const [subject, setSubject] = useState("");

//     const [exam, setExam] = useState("");

//     const [student, setStudent] = useState("");

//     const [reexamDate, setReexamDate] = useState("");

//     const [type, setType] = useState("");


//     // ========================================================
//     // SELECTED DETAILS
//     // ========================================================

//     const [selectedReExam, setSelectedReExam] =
//         useState(null);


//     // ========================================================
//     // UI
//     // ========================================================

//     const [loading, setLoading] = useState(true);

//     const [error, setError] = useState("");


//     // ========================================================
//     // LOAD RE-EXAMS
//     // ========================================================

//     const loadReExams = async () => {

//         try {

//             setLoading(true);

//             setError("");


//             const params =
//                 new URLSearchParams();


//             // ------------------------------------------------
//             // PAGE SIZE
//             // ------------------------------------------------

//             params.append(
//                 "page_size",
//                 "100"
//             );


//             // ------------------------------------------------
//             // SEARCH
//             // ------------------------------------------------

//             if (
//                 search.trim()
//             ) {

//                 params.append(
//                     "search",
//                     search.trim()
//                 );

//             }


//             // ------------------------------------------------
//             // SUBJECT
//             // ------------------------------------------------

//             if (subject) {

//                 params.append(
//                     "subject",
//                     subject
//                 );

//             }


//             // ------------------------------------------------
//             // EXAM
//             // ------------------------------------------------

//             if (exam) {

//                 params.append(
//                     "exam",
//                     exam
//                 );

//             }


//             // ------------------------------------------------
//             // STUDENT
//             // ------------------------------------------------

//             if (student) {

//                 params.append(
//                     "student",
//                     student
//                 );

//             }


//             // ------------------------------------------------
//             // RE-EXAM DATE
//             // ------------------------------------------------

//             if (reexamDate) {

//                 params.append(
//                     "reexam_date",
//                     reexamDate
//                 );

//             }


//             // ------------------------------------------------
//             // TYPE
//             // ------------------------------------------------

//             if (type) {

//                 params.append(
//                     "type",
//                     type
//                 );

//             }


//             const response = await api.get(
//                 `hod/reexams/?${params.toString()}`
//             );


//             console.log(
//                 "HOD Re-Exams:",
//                 response.data
//             );


//             const data =
//                 response.data.results ||
//                 response.data ||
//                 [];


//             setReexams(data);


//         } catch (error) {

//             console.error(
//                 "Failed to load HOD re-exams:",
//                 error.response?.data || error
//             );


//             setReexams([]);


//             setError(
//                 error.response?.data?.detail ||
//                 "Failed to load re-exams."
//             );


//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // INITIAL LOAD
//     // ========================================================

//     useEffect(() => {

//         loadReExams();

//     }, []);


//     // ========================================================
//     // SEARCH
//     // ========================================================

//     const handleSearch = () => {

//         loadReExams();

//     };


//     // ========================================================
//     // CLEAR FILTERS
//     // ========================================================

//     const clearFilters = () => {

//         setSearch("");

//         setSubject("");

//         setExam("");

//         setStudent("");

//         setReexamDate("");

//         setType("");

//         setSelectedReExam(null);


//         setTimeout(() => {

//             loadReExams();

//         }, 0);

//     };


//     // ========================================================
//     // VIEW DETAILS
//     // ========================================================

//     const viewDetails = (
//         item
//     ) => {

//         setSelectedReExam(
//             item
//         );

//     };


//     // ========================================================
//     // CLOSE DETAILS
//     // ========================================================

//     const closeDetails = () => {

//         setSelectedReExam(
//             null
//         );

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (

//             <div>

//                 <h1>
//                     HOD Re-Exams
//                 </h1>

//                 <p>
//                     Loading re-exams...
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
//                 HOD Re-Exams
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
//                             loadReExams
//                         }
//                     >
//                         Retry
//                     </button>

//                 </div>

//             )}


//             {/* =================================================
//                 FILTERS
//             ================================================= */}

//             <div>

//                 {/* SEARCH */}

//                 <input
//                     type="text"
//                     placeholder="Search exam, subject or student"
//                     value={search}
//                     onChange={(e) =>
//                         setSearch(
//                             e.target.value
//                         )
//                     }
//                     onKeyDown={(e) => {

//                         if (
//                             e.key === "Enter"
//                         ) {

//                             handleSearch();

//                         }

//                     }}
//                 />


//                 {" "}


//                 {/* SUBJECT */}

//                 <input
//                     type="number"
//                     placeholder="Subject ID"
//                     value={subject}
//                     onChange={(e) =>
//                         setSubject(
//                             e.target.value
//                         )
//                     }
//                 />


//                 {" "}


//                 {/* EXAM */}

//                 <input
//                     type="number"
//                     placeholder="Exam ID"
//                     value={exam}
//                     onChange={(e) =>
//                         setExam(
//                             e.target.value
//                         )
//                     }
//                 />


//                 {" "}


//                 {/* STUDENT */}

//                 <input
//                     type="number"
//                     placeholder="Student ID"
//                     value={student}
//                     onChange={(e) =>
//                         setStudent(
//                             e.target.value
//                         )
//                     }
//                 />


//                 {" "}


//                 {/* DATE */}

//                 <input
//                     type="date"
//                     value={reexamDate}
//                     onChange={(e) =>
//                         setReexamDate(
//                             e.target.value
//                         )
//                     }
//                 />


//                 {" "}


//                 {/* TYPE */}

//                 <select
//                     value={type}
//                     onChange={(e) =>
//                         setType(
//                             e.target.value
//                         )
//                     }
//                 >

//                     <option value="">
//                         All
//                     </option>

//                     <option value="upcoming">
//                         Upcoming
//                     </option>

//                     <option value="completed">
//                         Completed
//                     </option>

//                 </select>


//                 {" "}


//                 {/* SEARCH */}

//                 <button
//                     type="button"
//                     onClick={
//                         handleSearch
//                     }
//                 >
//                     Search
//                 </button>


//                 {" "}


//                 {/* CLEAR */}

//                 <button
//                     type="button"
//                     onClick={
//                         clearFilters
//                     }
//                 >
//                     Clear Filters
//                 </button>


//                 {" "}


//                 {/* REFRESH */}

//                 <button
//                     type="button"
//                     onClick={
//                         loadReExams
//                     }
//                 >
//                     Refresh
//                 </button>

//             </div>


//             <br />


//             {/* =================================================
//                 COUNT
//             ================================================= */}

//             <p>

//                 <strong>
//                     Re-Exam Records:
//                 </strong>

//                 {" "}

//                 {
//                     reexams.length
//                 }

//             </p>


//             {/* =================================================
//                 NO DATA
//             ================================================= */}

//             {reexams.length === 0 ? (

//                 <p>
//                     No re-exams found.
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
//                                 Student
//                             </th>

//                             <th>
//                                 Course / Class
//                             </th>

//                             <th>
//                                 Department
//                             </th>

//                             <th>
//                                 Year
//                             </th>

//                             <th>
//                                 Exam
//                             </th>

//                             <th>
//                                 Subject
//                             </th>

//                             <th>
//                                 Subject Code
//                             </th>

//                             <th>
//                                 Re-Exam Date
//                             </th>

//                             <th>
//                                 Start Time
//                             </th>

//                             <th>
//                                 End Time
//                             </th>

//                             <th>
//                                 Reason
//                             </th>

//                             <th>
//                                 Action
//                             </th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {reexams.map(
//                             (item) => (

//                                 <tr
//                                     key={
//                                         item.id
//                                     }
//                                 >

//                                     {/* ID */}

//                                     <td>
//                                         {
//                                             item.id
//                                         }
//                                     </td>


//                                     {/* STUDENT */}

//                                     <td>
//                                         {
//                                             item.student_name ||
//                                             "-"
//                                         }
//                                     </td>


//                                     {/* COURSE */}

//                                     <td>
//                                         {
//                                             item.course_name ||
//                                             "-"
//                                         }
//                                     </td>


//                                     {/* DEPARTMENT */}

//                                     <td>
//                                         {
//                                             item.department_name ||
//                                             "-"
//                                         }
//                                     </td>


//                                     {/* YEAR */}

//                                     <td>
//                                         {
//                                             item.student_year ??
//                                             "-"
//                                         }
//                                     </td>


//                                     {/* EXAM */}

//                                     <td>
//                                         {
//                                             item.exam_name ||
//                                             "-"
//                                         }
//                                     </td>


//                                     {/* SUBJECT */}

//                                     <td>
//                                         {
//                                             item.subject_name ||
//                                             "-"
//                                         }
//                                     </td>


//                                     {/* SUBJECT CODE */}

//                                     <td>
//                                         {
//                                             item.subject_code ||
//                                             "-"
//                                         }
//                                     </td>


//                                     {/* DATE */}

//                                     <td>
//                                         {
//                                             item.reexam_date ||
//                                             "-"
//                                         }
//                                     </td>


//                                     {/* START */}

//                                     <td>
//                                         {
//                                             item.start_time ||
//                                             "-"
//                                         }
//                                     </td>


//                                     {/* END */}

//                                     <td>
//                                         {
//                                             item.end_time ||
//                                             "-"
//                                         }
//                                     </td>


//                                     {/* REASON */}

//                                     <td>
//                                         {
//                                             item.reason ||
//                                             "-"
//                                         }
//                                     </td>


//                                     {/* ACTION */}

//                                     <td>

//                                         <button
//                                             type="button"
//                                             onClick={() =>
//                                                 viewDetails(
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
//                 DETAILS
//             ================================================= */}

//             {selectedReExam && (

//                 <div>

//                     <hr />


//                     <h2>
//                         Re-Exam Details
//                     </h2>


//                     <p>

//                         <strong>
//                             ID:
//                         </strong>{" "}

//                         {
//                             selectedReExam.id
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Student:
//                         </strong>{" "}

//                         {
//                             selectedReExam.student_name ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Course / Class:
//                         </strong>{" "}

//                         {
//                             selectedReExam.course_name ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Department:
//                         </strong>{" "}

//                         {
//                             selectedReExam.department_name ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Year:
//                         </strong>{" "}

//                         {
//                             selectedReExam.student_year ??
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Exam:
//                         </strong>{" "}

//                         {
//                             selectedReExam.exam_name ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Subject:
//                         </strong>{" "}

//                         {
//                             selectedReExam.subject_name ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Subject Code:
//                         </strong>{" "}

//                         {
//                             selectedReExam.subject_code ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Re-Exam Date:
//                         </strong>{" "}

//                         {
//                             selectedReExam.reexam_date ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Start Time:
//                         </strong>{" "}

//                         {
//                             selectedReExam.start_time ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             End Time:
//                         </strong>{" "}

//                         {
//                             selectedReExam.end_time ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Reason:
//                         </strong>{" "}

//                         {
//                             selectedReExam.reason ||
//                             "-"
//                         }

//                     </p>


//                     <button
//                         type="button"
//                         onClick={
//                             closeDetails
//                         }
//                     >
//                         Close
//                     </button>

//                 </div>

//             )}

//         </div>

//     );

// }


// export default HODReExams;
import { useEffect, useState } from "react";

import api from "../../api/axios";


function HODReExams() {

    const [reexams, setReexams] = useState([]);

    const [search, setSearch] = useState("");

    const [subject, setSubject] = useState("");

    const [exam, setExam] = useState("");

    const [student, setStudent] = useState("");

    const [reexamDate, setReexamDate] = useState("");

    const [type, setType] = useState("");

    const [selectedReExam, setSelectedReExam] =
        useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    const loadReExams = async () => {

        try {

            setLoading(true);
            setError("");

            const params =
                new URLSearchParams();

            params.append(
                "page_size",
                "100"
            );

            if (search.trim()) {

                params.append(
                    "search",
                    search.trim()
                );

            }

            if (subject) {

                params.append(
                    "subject",
                    subject
                );

            }

            if (exam) {

                params.append(
                    "exam",
                    exam
                );

            }

            if (student) {

                params.append(
                    "student",
                    student
                );

            }

            if (reexamDate) {

                params.append(
                    "reexam_date",
                    reexamDate
                );

            }

            if (type) {

                params.append(
                    "type",
                    type
                );

            }

            const response = await api.get(
                `hod/reexams/?${params.toString()}`
            );

            console.log(
                "HOD Re-Exams:",
                response.data
            );

            const data =
                response.data.results ||
                response.data ||
                [];

            setReexams(data);

        } catch (error) {

            console.error(
                "Failed to load HOD re-exams:",
                error.response?.data || error
            );

            setReexams([]);

            setError(
                error.response?.data?.detail ||
                "Failed to load re-exams."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadReExams();

    }, []);


    const handleSearch = () => {

        loadReExams();

    };


    const clearFilters = () => {

        setSearch("");
        setSubject("");
        setExam("");
        setStudent("");
        setReexamDate("");
        setType("");
        setSelectedReExam(null);

        setTimeout(() => {

            loadReExams();

        }, 0);

    };


    const viewDetails = (item) => {

        setSelectedReExam(item);

    };


    const closeDetails = () => {

        setSelectedReExam(null);

    };


    if (loading) {

        return (

            <div className="hod-page hod-reexams-page">

                <div className="hod-page-header">

                    <div>

                        <h1 className="hod-page-title">
                            HOD Re-Exams
                        </h1>

                        <p className="hod-page-subtitle">
                            Loading re-exams...
                        </p>

                    </div>

                </div>

                <div className="hod-loading-card">
                    Loading re-exams...
                </div>

            </div>

        );

    }


    return (

        <div className="hod-page hod-reexams-page">

            {/* TITLE */}

            <div className="hod-page-header">

                <div>

                    <h1 className="hod-page-title">
                        HOD Re-Exams
                    </h1>

                    <p className="hod-page-subtitle">
                        Manage department re-examination records
                    </p>

                </div>

            </div>


            {/* ERROR */}

            {error && (

                <div className="hod-alert hod-alert-error">

                    <p>
                        {error}
                    </p>

                    <button
                        className="hod-btn hod-btn-primary"
                        type="button"
                        onClick={loadReExams}
                    >
                        Retry
                    </button>

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
                            Filter re-exam records
                        </p>

                    </div>

                </div>


                <div className="hod-filter-grid hod-reexam-filter-grid">

                    <div className="hod-field hod-field-wide">

                        <label>
                            Search
                        </label>

                        <input
                            className="hod-input"
                            type="text"
                            placeholder="Search exam, subject or student"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            onKeyDown={(e) => {

                                if (e.key === "Enter") {

                                    handleSearch();

                                }

                            }}
                        />

                    </div>


                    <div className="hod-field">

                        <label>
                            Subject ID
                        </label>

                        <input
                            className="hod-input"
                            type="number"
                            placeholder="Subject ID"
                            value={subject}
                            onChange={(e) =>
                                setSubject(e.target.value)
                            }
                        />

                    </div>


                    <div className="hod-field">

                        <label>
                            Exam ID
                        </label>

                        <input
                            className="hod-input"
                            type="number"
                            placeholder="Exam ID"
                            value={exam}
                            onChange={(e) =>
                                setExam(e.target.value)
                            }
                        />

                    </div>


                    <div className="hod-field">

                        <label>
                            Student ID
                        </label>

                        <input
                            className="hod-input"
                            type="number"
                            placeholder="Student ID"
                            value={student}
                            onChange={(e) =>
                                setStudent(e.target.value)
                            }
                        />

                    </div>


                    <div className="hod-field">

                        <label>
                            Re-Exam Date
                        </label>

                        <input
                            className="hod-input"
                            type="date"
                            value={reexamDate}
                            onChange={(e) =>
                                setReexamDate(e.target.value)
                            }
                        />

                    </div>


                    <div className="hod-field">

                        <label>
                            Type
                        </label>

                        <select
                            className="hod-select"
                            value={type}
                            onChange={(e) =>
                                setType(e.target.value)
                            }
                        >

                            <option value="">
                                All
                            </option>

                            <option value="upcoming">
                                Upcoming
                            </option>

                            <option value="completed">
                                Completed
                            </option>

                        </select>

                    </div>

                </div>


                <div className="hod-filter-actions">

                    <button
                        className="hod-btn hod-btn-primary"
                        type="button"
                        onClick={handleSearch}
                    >
                        Search
                    </button>

                    <button
                        className="hod-btn hod-btn-secondary"
                        type="button"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>

                    <button
                        className="hod-btn hod-btn-secondary"
                        type="button"
                        onClick={loadReExams}
                    >
                        Refresh
                    </button>

                </div>

            </div>


            {/* COUNT */}

            <div className="hod-result-bar">

                <strong>
                    Re-Exam Records: {reexams.length}
                </strong>

            </div>


            {/* TABLE */}

            <div className="hod-table-card">

                {reexams.length === 0 ? (

                    <div className="hod-table-empty">
                        No re-exams found.
                    </div>

                ) : (

                    <table className="hod-table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Student</th>
                                <th>Course / Class</th>
                                <th>Department</th>
                                <th>Year</th>
                                <th>Exam</th>
                                <th>Subject</th>
                                <th>Subject Code</th>
                                <th>Re-Exam Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Reason</th>
                                <th>Action</th>

                            </tr>

                        </thead>


                        <tbody>

                            {reexams.map(
                                (item) => (

                                    <tr key={item.id}>

                                        <td>
                                            {item.id}
                                        </td>

                                        <td>
                                            {item.student_name || "-"}
                                        </td>

                                        <td>
                                            {item.course_name || "-"}
                                        </td>

                                        <td>
                                            {item.department_name || "-"}
                                        </td>

                                        <td>
                                            {item.student_year ?? "-"}
                                        </td>

                                        <td>
                                            {item.exam_name || "-"}
                                        </td>

                                        <td>
                                            {item.subject_name || "-"}
                                        </td>

                                        <td>
                                            {item.subject_code || "-"}
                                        </td>

                                        <td>
                                            {item.reexam_date || "-"}
                                        </td>

                                        <td>
                                            {item.start_time || "-"}
                                        </td>

                                        <td>
                                            {item.end_time || "-"}
                                        </td>

                                        <td>
                                            {item.reason || "-"}
                                        </td>

                                        <td>

                                            <button
                                                className="hod-btn hod-btn-small hod-btn-primary"
                                                type="button"
                                                onClick={() =>
                                                    viewDetails(item)
                                                }
                                            >
                                                View Details
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                )}

            </div>


            {/* DETAILS */}

            {selectedReExam && (

                <div className="hod-detail-card">

                    <div className="hod-detail-header">

                        <div>

                            <h2>
                                Re-Exam Details
                            </h2>

                            <p>
                                Complete re-examination information
                            </p>

                        </div>

                        <button
                            className="hod-btn hod-btn-secondary"
                            type="button"
                            onClick={closeDetails}
                        >
                            Close
                        </button>

                    </div>


                    <div className="hod-detail-grid">

                        <div>
                            <span>ID</span>
                            <strong>
                                {selectedReExam.id}
                            </strong>
                        </div>

                        <div>
                            <span>Student</span>
                            <strong>
                                {selectedReExam.student_name || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>Course / Class</span>
                            <strong>
                                {selectedReExam.course_name || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>Department</span>
                            <strong>
                                {selectedReExam.department_name || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>Year</span>
                            <strong>
                                {selectedReExam.student_year ?? "-"}
                            </strong>
                        </div>

                        <div>
                            <span>Exam</span>
                            <strong>
                                {selectedReExam.exam_name || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>Subject</span>
                            <strong>
                                {selectedReExam.subject_name || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>Subject Code</span>
                            <strong>
                                {selectedReExam.subject_code || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>Re-Exam Date</span>
                            <strong>
                                {selectedReExam.reexam_date || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>Start Time</span>
                            <strong>
                                {selectedReExam.start_time || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>End Time</span>
                            <strong>
                                {selectedReExam.end_time || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>Reason</span>
                            <strong>
                                {selectedReExam.reason || "-"}
                            </strong>
                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}


export default HODReExams;