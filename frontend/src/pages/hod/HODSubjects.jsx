// import { useEffect, useState } from "react";

// import api from "../../api/axios";


// function HODSubjects() {

//     const [subjects, setSubjects] = useState([]);

//     const [search, setSearch] = useState("");

//     const [courseFilter, setCourseFilter] = useState("");

//     const [yearFilter, setYearFilter] = useState("");

//     const [selectedSubject, setSelectedSubject] = useState(null);

//     const [loading, setLoading] = useState(true);

//     const [error, setError] = useState("");


//     // ========================================================
//     // LOAD SUBJECTS
//     // ========================================================

//     useEffect(() => {

//         loadSubjects();

//     }, []);


//     const loadSubjects = async () => {

//         try {

//             setLoading(true);

//             setError("");

//             const response = await api.get(
//                 "hod/subjects/"
//             );

//             setSubjects(
//                 response.data.results || response.data
//             );

//         } catch (error) {

//             console.error(error);

//             setError(
//                 "Failed to load subjects."
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

//             subjects.map(
//                 (subject) => [
//                     subject.course,
//                     subject.course_name
//                 ]
//             )

//         ).entries()
//     ];


//     // ========================================================
//     // YEAR OPTIONS
//     // ========================================================

//     const yearOptions = [
//         ...new Set(

//             subjects.map(
//                 (subject) => subject.year
//             )

//         )
//     ].sort(
//         (a, b) => a - b
//     );


//     // ========================================================
//     // FILTER
//     // ========================================================

//     const filteredSubjects = subjects.filter(
//         (subject) => {

//             const searchValue =
//                 search.toLowerCase().trim();


//             const matchesSearch =

//                 subject.name
//                     ?.toLowerCase()
//                     .includes(searchValue)

//                 ||

//                 subject.code
//                     ?.toLowerCase()
//                     .includes(searchValue);


//             const matchesCourse =

//                 courseFilter === ""

//                 ||

//                 String(subject.course)
//                     === String(courseFilter);


//             const matchesYear =

//                 yearFilter === ""

//                 ||

//                 String(subject.year)
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
//     // VIEW
//     // ========================================================

//     const handleView = (subject) => {

//         setSelectedSubject(subject);

//     };


//     // ========================================================
//     // CLOSE
//     // ========================================================

//     const handleClose = () => {

//         setSelectedSubject(null);

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

//                 <h1>
//                     HOD Subjects
//                 </h1>

//                 <p>
//                     Loading subjects...
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
//                 HOD Subjects
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

//                     placeholder="Search subject..."

//                     value={search}

//                     onChange={(e) =>
//                         setSearch(
//                             e.target.value
//                         )
//                     }

//                 />

//             </div>


//             {/* =================================================
//                 COURSE
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
//                 YEAR
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
//                 CLEAR
//             ================================================= */}

//             <button
//                 type="button"
//                 onClick={clearFilters}
//             >

//                 Clear Filters

//             </button>


//             {/* =================================================
//                 COUNT
//             ================================================= */}

//             <p>

//                 Showing{" "}
//                 {filteredSubjects.length}
//                 {" "}subject(s)

//             </p>


//             {/* =================================================
//                 TABLE
//             ================================================= */}

//             <table>

//                 <thead>

//                     <tr>

//                         <th>
//                             ID
//                         </th>

//                         <th>
//                             Name
//                         </th>

//                         <th>
//                             Code
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

//                     {filteredSubjects.length === 0 ? (

//                         <tr>

//                             <td colSpan="7">

//                                 No subjects found.

//                             </td>

//                         </tr>

//                     ) : (

//                         filteredSubjects.map(
//                             (subject) => (

//                                 <tr
//                                     key={subject.id}
//                                 >

//                                     <td>
//                                         {subject.id}
//                                     </td>

//                                     <td>
//                                         {subject.name}
//                                     </td>

//                                     <td>
//                                         {subject.code}
//                                     </td>

//                                     <td>
//                                         {
//                                             subject.course_name
//                                             ||
//                                             subject.course
//                                         }
//                                     </td>

//                                     <td>
//                                         {
//                                             subject.department_name
//                                             ||
//                                             subject.department
//                                         }
//                                     </td>

//                                     <td>
//                                         {subject.year}
//                                     </td>

//                                     <td>

//                                         <button

//                                             type="button"

//                                             onClick={() =>
//                                                 handleView(
//                                                     subject
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

//             {selectedSubject && (

//                 <div>

//                     <h2>
//                         Subject Details
//                     </h2>


//                     <p>

//                         <strong>
//                             ID:
//                         </strong>{" "}

//                         {
//                             selectedSubject.id
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Subject Name:
//                         </strong>{" "}

//                         {
//                             selectedSubject.name
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Subject Code:
//                         </strong>{" "}

//                         {
//                             selectedSubject.code
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Course:
//                         </strong>{" "}

//                         {
//                             selectedSubject.course_name
//                             ||
//                             selectedSubject.course
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Department:
//                         </strong>{" "}

//                         {
//                             selectedSubject.department_name
//                             ||
//                             selectedSubject.department
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Year:
//                         </strong>{" "}

//                         {
//                             selectedSubject.year
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


// export default HODSubjects;
import { useEffect, useState } from "react";
import api from "../../api/axios";

function HODSubjects() {
    const [subjects, setSubjects] = useState([]);
    const [search, setSearch] = useState("");
    const [courseFilter, setCourseFilter] = useState("");
    const [yearFilter, setYearFilter] = useState("");
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadSubjects();
    }, []);

    const loadSubjects = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("hod/subjects/");

            setSubjects(
                response.data.results || response.data
            );
        } catch (error) {
            console.error(error);

            setError("Failed to load subjects.");
        } finally {
            setLoading(false);
        }
    };

    const courseOptions = [
        ...new Map(
            subjects.map((subject) => [
                subject.course,
                subject.course_name
            ])
        ).entries()
    ];

    const yearOptions = [
        ...new Set(
            subjects.map((subject) => subject.year)
        )
    ].sort((a, b) => a - b);

    const filteredSubjects = subjects.filter(
        (subject) => {
            const searchValue =
                search.toLowerCase().trim();

            const matchesSearch =
                subject.name
                    ?.toLowerCase()
                    .includes(searchValue) ||
                subject.code
                    ?.toLowerCase()
                    .includes(searchValue);

            const matchesCourse =
                courseFilter === "" ||
                String(subject.course) ===
                String(courseFilter);

            const matchesYear =
                yearFilter === "" ||
                String(subject.year) ===
                String(yearFilter);

            return (
                matchesSearch &&
                matchesCourse &&
                matchesYear
            );
        }
    );

    const handleView = (subject) => {
        setSelectedSubject(subject);
    };

    const handleClose = () => {
        setSelectedSubject(null);
    };

    const clearFilters = () => {
        setSearch("");
        setCourseFilter("");
        setYearFilter("");
    };

    if (loading) {
        return (
            <div className="hod-page hod-subjects-page">
                <div className="hod-state-card">
                    <div className="hod-loading-icon">📖</div>
                    <h2>HOD Subjects</h2>
                    <p>Loading subjects...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="hod-page hod-subjects-page">

            {/* PAGE HEADER */}
            <div className="hod-page-header">
                <div>
                    <h1 className="hod-page-title">
                        HOD Subjects
                    </h1>

                    <p className="hod-page-subtitle">
                        View and manage subjects available for your department.
                    </p>
                </div>

                <div className="hod-header-badge">
                    📖 {filteredSubjects.length} Subjects
                </div>
            </div>

            {/* ERROR */}
            {error && (
                <div className="hod-alert hod-alert-error">
                    <span>⚠️</span>
                    <span>{error}</span>
                </div>
            )}

            {/* FILTER SECTION */}
            <div className="hod-section">

                <div className="hod-section-header">
                    <div>
                        <h2 className="hod-section-title">
                            Subject Filters
                        </h2>

                        <p className="hod-section-subtitle">
                            Search subjects by name, code, course or year.
                        </p>
                    </div>
                </div>

                <div className="hod-toolbar">

                    {/* SEARCH */}
                    <div className="hod-field hod-search-field">
                        <label className="hod-form-label">
                            Search
                        </label>

                        <input
                            type="text"
                            className="hod-input"
                            placeholder="Search subject / code..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />
                    </div>

                    {/* COURSE */}
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

                    {/* YEAR */}
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

                    {/* CLEAR */}
                    <div className="hod-field hod-action-field">
                        <label className="hod-form-label">
                            &nbsp;
                        </label>

                        <button
                            type="button"
                            className="hod-btn hod-btn-secondary"
                            onClick={clearFilters}
                        >
                            ↻ Clear Filters
                        </button>
                    </div>

                </div>
            </div>

            {/* COUNT */}
            <div className="hod-count-bar">
                <span>
                    Showing{" "}
                    <strong>
                        {filteredSubjects.length}
                    </strong>{" "}
                    subject(s)
                </span>
            </div>

            {/* TABLE */}
            <div className="hod-table-card">

                <div className="hod-table-header">
                    <div>
                        <h2>Subjects</h2>
                        <span>
                            Department subjects list
                        </span>
                    </div>
                </div>

                <div className="hod-table-wrap">

                    <table className="hod-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Course</th>
                                <th>Department</th>
                                <th>Year</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredSubjects.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="hod-empty"
                                    >
                                        No subjects found.
                                    </td>
                                </tr>
                            ) : (
                                filteredSubjects.map(
                                    (subject) => (
                                        <tr
                                            key={subject.id}
                                        >
                                            <td>
                                                #{subject.id}
                                            </td>

                                            <td>
                                                <strong>
                                                    {subject.name}
                                                </strong>
                                            </td>

                                            <td>
                                                <span className="hod-code-badge">
                                                    {subject.code}
                                                </span>
                                            </td>

                                            <td>
                                                {
                                                    subject.course_name ||
                                                    subject.course
                                                }
                                            </td>

                                            <td>
                                                {
                                                    subject.department_name ||
                                                    subject.department
                                                }
                                            </td>

                                            <td>
                                                <span className="hod-year-badge">
                                                    Year {subject.year}
                                                </span>
                                            </td>

                                            <td>
                                                <button
                                                    type="button"
                                                    className="hod-btn hod-btn-primary hod-btn-small"
                                                    onClick={() =>
                                                        handleView(
                                                            subject
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
            {selectedSubject && (
                <div className="hod-detail-card">

                    <div className="hod-detail-header">
                        <div>
                            <h2>Subject Details</h2>
                            <p>
                                Complete subject information
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
                                #{selectedSubject.id}
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Subject Name
                            </span>
                            <strong>
                                {selectedSubject.name}
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Subject Code
                            </span>
                            <strong>
                                {selectedSubject.code}
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Course
                            </span>
                            <strong>
                                {
                                    selectedSubject.course_name ||
                                    selectedSubject.course
                                }
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Department
                            </span>
                            <strong>
                                {
                                    selectedSubject.department_name ||
                                    selectedSubject.department
                                }
                            </strong>
                        </div>

                        <div className="hod-detail-item">
                            <span className="hod-detail-label">
                                Year
                            </span>
                            <strong>
                                Year {selectedSubject.year}
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




export default HODSubjects;