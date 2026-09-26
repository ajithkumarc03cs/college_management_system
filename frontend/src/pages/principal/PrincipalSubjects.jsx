// import { useEffect, useState } from "react";

// import api from "../../api/axios";


// function PrincipalSubjects() {

//     // ========================================================
//     // DATA
//     // ========================================================

//     const [subjects, setSubjects] = useState([]);

//     // ========================================================
//     // FILTERS
//     // ========================================================

//     const [search, setSearch] = useState("");

//     const [courseFilter, setCourseFilter] =
//         useState("");

//     const [departmentFilter, setDepartmentFilter] =
//         useState("");

//     const [yearFilter, setYearFilter] =
//         useState("");


//     // ========================================================
//     // SELECTED SUBJECT
//     // ========================================================

//     const [selectedSubject, setSelectedSubject] =
//         useState(null);


//     // ========================================================
//     // UI
//     // ========================================================

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
//                 "principal/subjects/?page_size=100"
//             );


//             console.log(
//                 "Principal Subjects:",
//                 response.data
//             );


//             setSubjects(
//                 response.data.results ||
//                 response.data ||
//                 []
//             );


//         } catch (error) {

//             console.error(
//                 "Principal Subjects Error:",
//                 error.response?.data || error
//             );


//             setSubjects([]);


//             setError(
//                 error.response?.data?.detail ||
//                 "Unable to load subjects."
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

//             subjects.map(
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

//             subjects
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
//     // FILTER SUBJECTS
//     // ========================================================

//     const filteredSubjects =
//         subjects.filter(
//             (subject) => {

//                 const searchValue =
//                     search
//                         .toLowerCase()
//                         .trim();


//                 const name =
//                     String(
//                         subject.name ||
//                         ""
//                     );


//                 const code =
//                     String(
//                         subject.code ||
//                         ""
//                     );


//                 const courseName =
//                     String(
//                         subject.course_name ||
//                         subject.course?.name ||
//                         subject.course ||
//                         ""
//                     );


//                 const departmentName =
//                     String(
//                         subject.department_name ||
//                         subject.department?.name ||
//                         subject.department ||
//                         ""
//                     );


//                 const matchesSearch =

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
//                         subject.course_id ??
//                         subject.course
//                     ) ===
//                     String(
//                         courseFilter
//                     );


//                 const matchesDepartment =

//                     departmentFilter === ""

//                     ||

//                     String(
//                         subject.department_id ??
//                         subject.department
//                     ) ===
//                     String(
//                         departmentFilter
//                     );


//                 const matchesYear =

//                     yearFilter === ""

//                     ||

//                     String(
//                         subject.year
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
//         subject
//     ) => {

//         setSelectedSubject(
//             subject
//         );

//     };


//     // ========================================================
//     // CLOSE DETAILS
//     // ========================================================

//     const handleClose = () => {

//         setSelectedSubject(
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
//     // REFRESH
//     // ========================================================

//     const refreshSubjects = () => {

//         loadSubjects();

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (

//             <div>

//                 <h1>
//                     Principal Subjects
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

//             {/* =================================================
//                 TITLE
//             ================================================= */}

//             <h1>
//                 Principal Subjects
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
//                             refreshSubjects
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
//                     placeholder="Search subject / code / course / department..."
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
//                     refreshSubjects
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
//                     filteredSubjects.length
//                 }

//                 {" "}
//                 subject(s)

//             </p>


//             {/* =================================================
//                 SUBJECT TABLE
//             ================================================= */}

//             {filteredSubjects.length === 0 ? (

//                 <p>
//                     No subjects found.
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
//                                 Subject Name
//                             </th>

//                             <th>
//                                 Code
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
//                                 Action
//                             </th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {filteredSubjects.map(
//                             (subject) => (

//                                 <tr
//                                     key={
//                                         subject.id
//                                     }
//                                 >

//                                     <td>
//                                         {
//                                             subject.id
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             subject.name ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             subject.code ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             subject.course_name ||
//                                             subject.course?.name ||
//                                             subject.course ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             subject.department_name ||
//                                             subject.department?.name ||
//                                             subject.department ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             subject.year ??
//                                             "-"
//                                         }
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
//                 SUBJECT DETAILS
//             ================================================= */}

//             {selectedSubject && (

//                 <div>

//                     <hr />


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
//                             selectedSubject.name ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Subject Code:
//                         </strong>{" "}

//                         {
//                             selectedSubject.code ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Course:
//                         </strong>{" "}

//                         {
//                             selectedSubject.course_name ||
//                             selectedSubject.course?.name ||
//                             selectedSubject.course ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Department:
//                         </strong>{" "}

//                         {
//                             selectedSubject.department_name ||
//                             selectedSubject.department?.name ||
//                             selectedSubject.department ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Year:
//                         </strong>{" "}

//                         {
//                             selectedSubject.year ??
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


// export default PrincipalSubjects;
import { useEffect, useState } from "react";
import api from "../../api/axios";

function PrincipalSubjects() {
    const [subjects, setSubjects] = useState([]);

    const [search, setSearch] = useState("");
    const [courseFilter, setCourseFilter] = useState("");
    const [departmentFilter, setDepartmentFilter] =
        useState("");
    const [yearFilter, setYearFilter] = useState("");

    const [selectedSubject, setSelectedSubject] =
        useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ========================================================
    // LOAD SUBJECTS
    // ========================================================

    useEffect(() => {
        loadSubjects();
    }, []);

    const loadSubjects = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "principal/subjects/?page_size=100"
            );

            console.log(
                "Principal Subjects:",
                response.data
            );

            setSubjects(
                response.data.results ||
                response.data ||
                []
            );
        } catch (error) {
            console.error(
                "Principal Subjects Error:",
                error.response?.data || error
            );

            setSubjects([]);

            setError(
                error.response?.data?.detail ||
                "Unable to load subjects."
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
            subjects.map((item) => [
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
            subjects.map((item) => [
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
            subjects
                .map((item) => item.year)
                .filter(
                    (year) =>
                        year !== null &&
                        year !== undefined
                )
        )
    ].sort((a, b) => a - b);

    // ========================================================
    // FILTER SUBJECTS
    // ========================================================

    const filteredSubjects = subjects.filter(
        (subject) => {
            const searchValue = search
                .toLowerCase()
                .trim();

            const name = String(
                subject.name || ""
            );

            const code = String(
                subject.code || ""
            );

            const courseName = String(
                subject.course_name ||
                subject.course?.name ||
                subject.course ||
                ""
            );

            const departmentName = String(
                subject.department_name ||
                subject.department?.name ||
                subject.department ||
                ""
            );

            const matchesSearch =
                searchValue === "" ||
                name
                    .toLowerCase()
                    .includes(searchValue) ||
                code
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
                String(
                    subject.course_id ??
                    subject.course
                ) === String(courseFilter);

            const matchesDepartment =
                departmentFilter === "" ||
                String(
                    subject.department_id ??
                    subject.department
                ) === String(departmentFilter);

            const matchesYear =
                yearFilter === "" ||
                String(subject.year) ===
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

    const handleView = (subject) => {
        setSelectedSubject(subject);
    };

    const handleClose = () => {
        setSelectedSubject(null);
    };

    const clearFilters = () => {
        setSearch("");
        setCourseFilter("");
        setDepartmentFilter("");
        setYearFilter("");
    };

    const refreshSubjects = () => {
        loadSubjects();
    };

    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {
        return (
            <div className="principal-page principal-state-card">
                <h1>Principal Subjects</h1>
                <p>Loading subjects...</p>
            </div>
        );
    }

    // ========================================================
    // UI
    // ========================================================

    return (
        <div className="principal-page principal-subjects-page">

            <div className="principal-page-header">
                <div>
                    <h1 className="principal-page-title">
                        Subject Management
                    </h1>

                    <p className="principal-page-subtitle">
                        View subjects, courses, departments and academic years.
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
                        onClick={refreshSubjects}
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
                        placeholder="Search subject / code / course / department..."
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
                        onClick={refreshSubjects}
                    >
                        Refresh
                    </button>

                </div>

            </div>

            <p className="principal-count">
                Showing {filteredSubjects.length} subject(s)
            </p>

            {/* TABLE */}

            {filteredSubjects.length === 0 ? (
                <div className="principal-state-card">

                    <h3>No subjects found</h3>

                    <p>
                        No subject records match the selected filters.
                    </p>

                </div>
            ) : (
                <div className="principal-table-card">

                    <div className="principal-table-wrap">

                        <table className="principal-table principal-table-medium">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Subject Name</th>
                                    <th>Code</th>
                                    <th>Course</th>
                                    <th>Department</th>
                                    <th>Year</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {filteredSubjects.map(
                                    (subject) => (
                                        <tr
                                            key={subject.id}
                                        >

                                            <td>
                                                {subject.id}
                                            </td>

                                            <td>
                                                {subject.name || "-"}
                                            </td>

                                            <td>
                                                <span className="principal-code">
                                                    {subject.code || "-"}
                                                </span>
                                            </td>

                                            <td>
                                                {subject.course_name ||
                                                    subject.course?.name ||
                                                    subject.course ||
                                                    "-"}
                                            </td>

                                            <td>
                                                {subject.department_name ||
                                                    subject.department?.name ||
                                                    subject.department ||
                                                    "-"}
                                            </td>

                                            <td>
                                                {subject.year ?? "-"}
                                            </td>

                                            <td>
                                                <button
                                                    type="button"
                                                    className="principal-btn principal-btn-primary principal-btn-sm"
                                                    onClick={() =>
                                                        handleView(
                                                            subject
                                                        )
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

                    </div>

                </div>
            )}

            {/* DETAILS */}

            {selectedSubject && (
                <div className="principal-detail-card">

                    <div className="principal-detail-header">

                        <div>
                            <h2>Subject Details</h2>
                            <p>
                                Complete subject information
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
                                {selectedSubject.id}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Subject Name
                            </span>

                            <span className="principal-detail-value">
                                {selectedSubject.name || "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Subject Code
                            </span>

                            <span className="principal-detail-value">
                                {selectedSubject.code || "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Course
                            </span>

                            <span className="principal-detail-value">
                                {selectedSubject.course_name ||
                                    selectedSubject.course?.name ||
                                    selectedSubject.course ||
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Department
                            </span>

                            <span className="principal-detail-value">
                                {selectedSubject.department_name ||
                                    selectedSubject.department?.name ||
                                    selectedSubject.department ||
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Year
                            </span>

                            <span className="principal-detail-value">
                                {selectedSubject.year ?? "-"}
                            </span>
                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default PrincipalSubjects;