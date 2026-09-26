// import { useEffect, useState } from "react";

// import api from "../../api/axios";


// function HODExams() {

//     const [exams, setExams] = useState([]);

//     const [search, setSearch] = useState("");

//     const [subjectFilter, setSubjectFilter] = useState("");

//     const [courseFilter, setCourseFilter] = useState("");

//     const [yearFilter, setYearFilter] = useState("");

//     const [typeFilter, setTypeFilter] = useState("");

//     const [selectedExam, setSelectedExam] = useState(null);

//     const [loading, setLoading] = useState(true);

//     const [error, setError] = useState("");


//     // ========================================================
//     // LOAD HOD EXAMS
//     // ========================================================

//     useEffect(() => {

//         loadExams();

//     }, []);


//     const loadExams = async () => {

//         try {

//             setLoading(true);

//             setError("");


//             const response = await api.get(
//                 "hod/exams/?page_size=100"
//             );


//             console.log(
//                 "HOD EXAMS:",
//                 response.data
//             );


//             setExams(
//                 response.data.results ||
//                 response.data ||
//                 []
//             );


//         } catch (error) {

//             console.error(
//                 "HOD Exams Error:",
//                 error.response?.data || error
//             );


//             setExams([]);


//             setError(
//                 error.response?.data?.detail ||
//                 "Failed to load exams."
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

//             exams.map(
//                 (exam) => [

//                     exam.subject,

//                     exam.subject_name ||
//                     exam.subject?.name ||
//                     exam.subject ||
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

//             exams.map(
//                 (exam) => [

//                     exam.course,

//                     exam.course_name ||
//                     exam.course?.name ||
//                     exam.course ||
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

//             exams.map(
//                 (exam) => exam.year
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
//     // TODAY
//     // ========================================================

//     const today = new Date();

//     today.setHours(
//         0,
//         0,
//         0,
//         0
//     );


//     // ========================================================
//     // FILTER EXAMS
//     // ========================================================

//     const filteredExams = exams.filter(
//         (exam) => {

//             const searchValue =
//                 search
//                     .toLowerCase()
//                     .trim();


//             const examName =
//                 String(
//                     exam.name ||
//                     ""
//                 );


//             const subjectName =
//                 String(
//                     exam.subject_name ||
//                     exam.subject?.name ||
//                     exam.subject ||
//                     ""
//                 );


//             const subjectCode =
//                 String(
//                     exam.subject_code ||
//                     exam.subject?.code ||
//                     ""
//                 );


//             const courseName =
//                 String(
//                     exam.course_name ||
//                     exam.course?.name ||
//                     exam.course ||
//                     ""
//                 );


//             const departmentName =
//                 String(
//                     exam.department_name ||
//                     exam.department?.name ||
//                     exam.department ||
//                     ""
//                 );


//             // ------------------------------------------------
//             // SEARCH
//             // ------------------------------------------------

//             const matchesSearch =

//                 searchValue === ""

//                 ||

//                 examName
//                     .toLowerCase()
//                     .includes(
//                         searchValue
//                     )

//                 ||

//                 subjectName
//                     .toLowerCase()
//                     .includes(
//                         searchValue
//                     )

//                 ||

//                 subjectCode
//                     .toLowerCase()
//                     .includes(
//                         searchValue
//                     )

//                 ||

//                 courseName
//                     .toLowerCase()
//                     .includes(
//                         searchValue
//                     )

//                 ||

//                 departmentName
//                     .toLowerCase()
//                     .includes(
//                         searchValue
//                     );


//             // ------------------------------------------------
//             // SUBJECT
//             // ------------------------------------------------

//             const matchesSubject =

//                 subjectFilter === ""

//                 ||

//                 String(
//                     exam.subject
//                 ) ===
//                 String(
//                     subjectFilter
//                 );


//             // ------------------------------------------------
//             // COURSE
//             // ------------------------------------------------

//             const matchesCourse =

//                 courseFilter === ""

//                 ||

//                 String(
//                     exam.course
//                 ) ===
//                 String(
//                     courseFilter
//                 );


//             // ------------------------------------------------
//             // YEAR
//             // ------------------------------------------------

//             const matchesYear =

//                 yearFilter === ""

//                 ||

//                 String(
//                     exam.year
//                 ) ===
//                 String(
//                     yearFilter
//                 );


//             // ------------------------------------------------
//             // TYPE
//             // ------------------------------------------------

//             let matchesType = true;


//             if (
//                 typeFilter === "upcoming"
//             ) {

//                 const examDate =
//                     new Date(
//                         exam.exam_date
//                     );


//                 examDate.setHours(
//                     0,
//                     0,
//                     0,
//                     0
//                 );


//                 matchesType =
//                     examDate >= today;

//             }


//             if (
//                 typeFilter === "completed"
//             ) {

//                 const examDate =
//                     new Date(
//                         exam.exam_date
//                     );


//                 examDate.setHours(
//                     0,
//                     0,
//                     0,
//                     0
//                 );


//                 matchesType =
//                     examDate < today;

//             }


//             return (

//                 matchesSearch

//                 &&

//                 matchesSubject

//                 &&

//                 matchesCourse

//                 &&

//                 matchesYear

//                 &&

//                 matchesType

//             );

//         }
//     );


//     // ========================================================
//     // VIEW EXAM
//     // ========================================================

//     const handleView = (
//         exam
//     ) => {

//         setSelectedExam(
//             exam
//         );

//     };


//     // ========================================================
//     // CLOSE DETAILS
//     // ========================================================

//     const handleClose = () => {

//         setSelectedExam(
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

//         setYearFilter("");

//         setTypeFilter("");

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (

//             <div>

//                 <h1>
//                     HOD Exams
//                 </h1>

//                 <p>
//                     Loading exams...
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
//                 HOD Exams
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
//                             loadExams
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
//                     placeholder="Search exam / subject / code / course..."
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
//                 SUBJECT
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
//                 COURSE
//             ================================================= */}

//             <div>

//                 <label>
//                     Course / Class:
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
//                 TYPE
//             ================================================= */}

//             <div>

//                 <label>
//                     Type:
//                 </label>

//                 {" "}


//                 <select
//                     value={typeFilter}
//                     onChange={(e) =>
//                         setTypeFilter(
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
//                     loadExams
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
//                     filteredExams.length
//                 }

//                 {" "}
//                 exam(s)

//             </p>


//             {/* =================================================
//                 EXAMS TABLE
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
//                             Exam Name
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
//                             Date
//                         </th>

//                         <th>
//                             Start
//                         </th>

//                         <th>
//                             End
//                         </th>

//                         <th>
//                             Action
//                         </th>

//                     </tr>

//                 </thead>


//                 <tbody>

//                     {filteredExams.length === 0 ? (

//                         <tr>

//                             <td colSpan="11">

//                                 No exams found.

//                             </td>

//                         </tr>

//                     ) : (

//                         filteredExams.map(
//                             (exam) => (

//                                 <tr
//                                     key={
//                                         exam.id
//                                     }
//                                 >

//                                     <td>
//                                         {
//                                             exam.id
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             exam.name ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             exam.subject_name ||
//                                             exam.subject?.name ||
//                                             exam.subject ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             exam.subject_code ||
//                                             exam.subject?.code ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             exam.course_name ||
//                                             exam.course?.name ||
//                                             exam.course ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             exam.department_name ||
//                                             exam.department?.name ||
//                                             exam.department ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             exam.year ??
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             exam.exam_date ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             exam.start_time ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             exam.end_time ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>

//                                         <button
//                                             type="button"
//                                             onClick={() =>
//                                                 handleView(
//                                                     exam
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
//                 EXAM DETAILS
//             ================================================= */}

//             {selectedExam && (

//                 <div>

//                     <hr />


//                     <h2>
//                         Exam Details
//                     </h2>


//                     <p>

//                         <strong>
//                             ID:
//                         </strong>{" "}

//                         {
//                             selectedExam.id
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Exam Name:
//                         </strong>{" "}

//                         {
//                             selectedExam.name ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Subject:
//                         </strong>{" "}

//                         {
//                             selectedExam.subject_name ||
//                             selectedExam.subject?.name ||
//                             selectedExam.subject ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Subject Code:
//                         </strong>{" "}

//                         {
//                             selectedExam.subject_code ||
//                             selectedExam.subject?.code ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Course / Class:
//                         </strong>{" "}

//                         {
//                             selectedExam.course_name ||
//                             selectedExam.course?.name ||
//                             selectedExam.course ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Department:
//                         </strong>{" "}

//                         {
//                             selectedExam.department_name ||
//                             selectedExam.department?.name ||
//                             selectedExam.department ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Year:
//                         </strong>{" "}

//                         {
//                             selectedExam.year ??
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Exam Date:
//                         </strong>{" "}

//                         {
//                             selectedExam.exam_date ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Start Time:
//                         </strong>{" "}

//                         {
//                             selectedExam.start_time ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             End Time:
//                         </strong>{" "}

//                         {
//                             selectedExam.end_time ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Created By:
//                         </strong>{" "}

//                         {
//                             selectedExam.created_by_name ||
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


// export default HODExams;
import { useEffect, useState } from "react";

import api from "../../api/axios";


function HODExams() {

    const [exams, setExams] = useState([]);

    const [search, setSearch] = useState("");

    const [subjectFilter, setSubjectFilter] = useState("");

    const [courseFilter, setCourseFilter] = useState("");

    const [yearFilter, setYearFilter] = useState("");

    const [typeFilter, setTypeFilter] = useState("");

    const [selectedExam, setSelectedExam] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        loadExams();

    }, []);


    const loadExams = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await api.get(
                "hod/exams/?page_size=100"
            );

            console.log(
                "HOD EXAMS:",
                response.data
            );

            setExams(
                response.data.results ||
                response.data ||
                []
            );

        } catch (error) {

            console.error(
                "HOD Exams Error:",
                error.response?.data || error
            );

            setExams([]);

            setError(
                error.response?.data?.detail ||
                "Failed to load exams."
            );

        } finally {

            setLoading(false);

        }

    };


    const subjectOptions = [

        ...new Map(

            exams.map(
                (exam) => [

                    exam.subject,

                    exam.subject_name ||
                    exam.subject?.name ||
                    exam.subject ||
                    "-"

                ]
            )

        ).entries()

    ].filter(
        ([id]) =>
            id !== null &&
            id !== undefined
    );


    const courseOptions = [

        ...new Map(

            exams.map(
                (exam) => [

                    exam.course,

                    exam.course_name ||
                    exam.course?.name ||
                    exam.course ||
                    "-"

                ]
            )

        ).entries()

    ].filter(
        ([id]) =>
            id !== null &&
            id !== undefined
    );


    const yearOptions = [

        ...new Set(

            exams.map(
                (exam) => exam.year
            )

        )

    ]
        .filter(
            (year) =>
                year !== null &&
                year !== undefined
        )
        .sort(
            (a, b) => a - b
        );


    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );


    const filteredExams = exams.filter(
        (exam) => {

            const searchValue =
                search
                    .toLowerCase()
                    .trim();

            const examName =
                String(
                    exam.name || ""
                );

            const subjectName =
                String(
                    exam.subject_name ||
                    exam.subject?.name ||
                    exam.subject ||
                    ""
                );

            const subjectCode =
                String(
                    exam.subject_code ||
                    exam.subject?.code ||
                    ""
                );

            const courseName =
                String(
                    exam.course_name ||
                    exam.course?.name ||
                    exam.course ||
                    ""
                );

            const departmentName =
                String(
                    exam.department_name ||
                    exam.department?.name ||
                    exam.department ||
                    ""
                );


            const matchesSearch =
                searchValue === "" ||
                examName.toLowerCase().includes(searchValue) ||
                subjectName.toLowerCase().includes(searchValue) ||
                subjectCode.toLowerCase().includes(searchValue) ||
                courseName.toLowerCase().includes(searchValue) ||
                departmentName.toLowerCase().includes(searchValue);


            const matchesSubject =
                subjectFilter === "" ||
                String(exam.subject) === String(subjectFilter);


            const matchesCourse =
                courseFilter === "" ||
                String(exam.course) === String(courseFilter);


            const matchesYear =
                yearFilter === "" ||
                String(exam.year) === String(yearFilter);


            let matchesType = true;


            if (typeFilter === "upcoming") {

                const examDate =
                    new Date(exam.exam_date);

                examDate.setHours(
                    0,
                    0,
                    0,
                    0
                );

                matchesType =
                    examDate >= today;

            }


            if (typeFilter === "completed") {

                const examDate =
                    new Date(exam.exam_date);

                examDate.setHours(
                    0,
                    0,
                    0,
                    0
                );

                matchesType =
                    examDate < today;

            }


            return (
                matchesSearch &&
                matchesSubject &&
                matchesCourse &&
                matchesYear &&
                matchesType
            );

        }
    );


    const handleView = (exam) => {

        setSelectedExam(exam);

    };


    const handleClose = () => {

        setSelectedExam(null);

    };


    const clearFilters = () => {

        setSearch("");
        setSubjectFilter("");
        setCourseFilter("");
        setYearFilter("");
        setTypeFilter("");

    };


    if (loading) {

        return (

            <div className="hod-page hod-exams-page">

                <div className="hod-page-header">

                    <div>

                        <h1 className="hod-page-title">
                            HOD Exams
                        </h1>

                        <p className="hod-page-subtitle">
                            Loading exams...
                        </p>

                    </div>

                </div>

                <div className="hod-loading-card">
                    Loading exams...
                </div>

            </div>

        );

    }


    return (

        <div className="hod-page hod-exams-page">

            {/* TITLE */}

            <div className="hod-page-header">

                <div>

                    <h1 className="hod-page-title">
                        HOD Exams
                    </h1>

                    <p className="hod-page-subtitle">
                        View and manage department examinations
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
                        onClick={loadExams}
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
                            Filter exams by subject, course, year or status
                        </p>

                    </div>

                </div>


                <div className="hod-filter-grid">

                    <div className="hod-field hod-field-wide">

                        <label>
                            Search
                        </label>

                        <input
                            className="hod-input"
                            type="text"
                            placeholder="Search exam / subject / code / course..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>


                    <div className="hod-field">

                        <label>
                            Subject
                        </label>

                        <select
                            className="hod-select"
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


                    <div className="hod-field">

                        <label>
                            Course / Class
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


                    <div className="hod-field">

                        <label>
                            Type
                        </label>

                        <select
                            className="hod-select"
                            value={typeFilter}
                            onChange={(e) =>
                                setTypeFilter(e.target.value)
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
                        className="hod-btn hod-btn-secondary"
                        type="button"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>

                    <button
                        className="hod-btn hod-btn-primary"
                        type="button"
                        onClick={loadExams}
                    >
                        Refresh
                    </button>

                </div>

            </div>


            {/* COUNT */}

            <div className="hod-result-bar">

                <strong>
                    Showing {filteredExams.length} exam(s)
                </strong>

            </div>


            {/* TABLE */}

            <div className="hod-table-card">

                <table className="hod-table">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Exam Name</th>
                            <th>Subject</th>
                            <th>Subject Code</th>
                            <th>Course / Class</th>
                            <th>Department</th>
                            <th>Year</th>
                            <th>Date</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Action</th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredExams.length === 0 ? (

                            <tr>

                                <td colSpan="11">

                                    <div className="hod-table-empty">
                                        No exams found.
                                    </div>

                                </td>

                            </tr>

                        ) : (

                            filteredExams.map(
                                (exam) => (

                                    <tr key={exam.id}>

                                        <td>
                                            {exam.id}
                                        </td>

                                        <td>
                                            {exam.name || "-"}
                                        </td>

                                        <td>
                                            {
                                                exam.subject_name ||
                                                exam.subject?.name ||
                                                exam.subject ||
                                                "-"
                                            }
                                        </td>

                                        <td>
                                            {
                                                exam.subject_code ||
                                                exam.subject?.code ||
                                                "-"
                                            }
                                        </td>

                                        <td>
                                            {
                                                exam.course_name ||
                                                exam.course?.name ||
                                                exam.course ||
                                                "-"
                                            }
                                        </td>

                                        <td>
                                            {
                                                exam.department_name ||
                                                exam.department?.name ||
                                                exam.department ||
                                                "-"
                                            }
                                        </td>

                                        <td>
                                            {exam.year ?? "-"}
                                        </td>

                                        <td>
                                            {exam.exam_date || "-"}
                                        </td>

                                        <td>
                                            {exam.start_time || "-"}
                                        </td>

                                        <td>
                                            {exam.end_time || "-"}
                                        </td>

                                        <td>

                                            <button
                                                className="hod-btn hod-btn-small hod-btn-primary"
                                                type="button"
                                                onClick={() =>
                                                    handleView(exam)
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


            {/* DETAILS */}

            {selectedExam && (

                <div className="hod-detail-card">

                    <div className="hod-detail-header">

                        <div>

                            <h2>
                                Exam Details
                            </h2>

                            <p>
                                Complete examination information
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
                            <strong>{selectedExam.id}</strong>
                        </div>

                        <div>
                            <span>Exam Name</span>
                            <strong>
                                {selectedExam.name || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>Subject</span>
                            <strong>
                                {
                                    selectedExam.subject_name ||
                                    selectedExam.subject?.name ||
                                    selectedExam.subject ||
                                    "-"
                                }
                            </strong>
                        </div>

                        <div>
                            <span>Subject Code</span>
                            <strong>
                                {
                                    selectedExam.subject_code ||
                                    selectedExam.subject?.code ||
                                    "-"
                                }
                            </strong>
                        </div>

                        <div>
                            <span>Course / Class</span>
                            <strong>
                                {
                                    selectedExam.course_name ||
                                    selectedExam.course?.name ||
                                    selectedExam.course ||
                                    "-"
                                }
                            </strong>
                        </div>

                        <div>
                            <span>Department</span>
                            <strong>
                                {
                                    selectedExam.department_name ||
                                    selectedExam.department?.name ||
                                    selectedExam.department ||
                                    "-"
                                }
                            </strong>
                        </div>

                        <div>
                            <span>Year</span>
                            <strong>
                                {selectedExam.year ?? "-"}
                            </strong>
                        </div>

                        <div>
                            <span>Exam Date</span>
                            <strong>
                                {selectedExam.exam_date || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>Start Time</span>
                            <strong>
                                {selectedExam.start_time || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>End Time</span>
                            <strong>
                                {selectedExam.end_time || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>Created By</span>
                            <strong>
                                {selectedExam.created_by_name || "-"}
                            </strong>
                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}


export default HODExams;