// import { useEffect, useState } from "react";

// import api from "../../api/axios";


// function PrincipalAssignments() {

//     // ========================================================
//     // DATA
//     // ========================================================

//     const [assignments, setAssignments] = useState([]);

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

//     // ========================================================
//     // SELECTED ASSIGNMENT
//     // ========================================================

//     const [selectedAssignment, setSelectedAssignment] =
//         useState(null);

//     // ========================================================
//     // UI
//     // ========================================================

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
//                 "principal/assignments/?page_size=100"
//             );


//             console.log(
//                 "Principal Assignments:",
//                 response.data
//             );


//             setAssignments(
//                 response.data.results ||
//                 response.data ||
//                 []
//             );


//         } catch (error) {

//             console.error(
//                 "Principal Assignments Error:",
//                 error.response?.data || error
//             );


//             setAssignments([]);


//             setError(
//                 error.response?.data?.detail ||
//                 "Unable to load assignments."
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

//             assignments.map(
//                 (item) => [

//                     item.course_id ??
//                     item.course,

//                     item.course_name ||
//                     item.course?.name ||
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

//             assignments.map(
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

//             assignments
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


//                 const description =
//                     String(
//                         assignment.description ||
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


//                 const courseName =
//                     String(
//                         assignment.course_name ||
//                         assignment.course?.name ||
//                         assignment.course ||
//                         ""
//                     );


//                 const departmentName =
//                     String(
//                         assignment.department_name ||
//                         assignment.department?.name ||
//                         assignment.department ||
//                         ""
//                     );


//                 const studentName =
//                     String(
//                         assignment.student_name ||
//                         assignment.student?.name ||
//                         assignment.student ||
//                         ""
//                     );


//                 const matchesSearch =

//                     searchValue === ""

//                     ||

//                     title
//                         .toLowerCase()
//                         .includes(
//                             searchValue
//                         )

//                     ||

//                     description
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
//                         )

//                     ||

//                     studentName
//                         .toLowerCase()
//                         .includes(
//                             searchValue
//                         );


//                 const matchesSubject =

//                     subjectFilter === ""

//                     ||

//                     String(
//                         assignment.subject_id ??
//                         assignment.subject
//                     ) ===
//                     String(
//                         subjectFilter
//                     );


//                 const matchesCourse =

//                     courseFilter === ""

//                     ||

//                     String(
//                         assignment.course_id ??
//                         assignment.course
//                     ) ===
//                     String(
//                         courseFilter
//                     );


//                 const matchesDepartment =

//                     departmentFilter === ""

//                     ||

//                     String(
//                         assignment.department_id ??
//                         assignment.department
//                     ) ===
//                     String(
//                         departmentFilter
//                     );


//                 const matchesYear =

//                     yearFilter === ""

//                     ||

//                     String(
//                         assignment.year
//                     ) ===
//                     String(
//                         yearFilter
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

//         setCourseFilter("");

//         setDepartmentFilter("");

//         setYearFilter("");

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
//                     Principal Assignments
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
//                 Principal Assignments
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
//                     placeholder="Search title / subject / student..."
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
//                 ASSIGNMENT TABLE
//             ================================================= */}

//             {filteredAssignments.length === 0 ? (

//                 <p>
//                     No assignments found.
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
//                                 Title
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
//                                 Exam
//                             </th>

//                             <th>
//                                 Student
//                             </th>

//                             <th>
//                                 Due Date
//                             </th>

//                             <th>
//                                 Assigned By
//                             </th>

//                             <th>
//                                 Action
//                             </th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {filteredAssignments.map(
//                             (assignment) => (

//                                 <tr
//                                     key={
//                                         assignment.id
//                                     }
//                                 >

//                                     <td>
//                                         {
//                                             assignment.id
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             assignment.title ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             assignment.subject_name ||
//                                             assignment.subject?.name ||
//                                             assignment.subject ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             assignment.subject_code ||
//                                             assignment.subject?.code ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             assignment.course_name ||
//                                             assignment.course?.name ||
//                                             assignment.course ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             assignment.department_name ||
//                                             assignment.department?.name ||
//                                             assignment.department ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             assignment.year ??
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             assignment.exam_name ||
//                                             assignment.exam?.name ||
//                                             assignment.exam ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             assignment.student_name ||
//                                             assignment.student?.name ||
//                                             assignment.student ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             assignment.due_date ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             assignment.assigned_by_name ||
//                                             assignment.assigned_by ||
//                                             "-"
//                                         }
//                                     </td>


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
//                         )}

//                     </tbody>

//                 </table>

//             )}


//             {/* =================================================
//                 ASSIGNMENT DETAILS
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
//                             Course:
//                         </strong>{" "}

//                         {
//                             selectedAssignment.course_name ||
//                             selectedAssignment.course?.name ||
//                             selectedAssignment.course ||
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
//                             selectedAssignment.department ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Year:
//                         </strong>{" "}

//                         {
//                             selectedAssignment.year ??
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


// export default PrincipalAssignments;
import { useEffect, useState } from "react";
import api from "../../api/axios";

function PrincipalAssignments() {

    // ========================================================
    // DATA
    // ========================================================

    const [assignments, setAssignments] = useState([]);

    // ========================================================
    // FILTERS
    // ========================================================

    const [search, setSearch] = useState("");
    const [subjectFilter, setSubjectFilter] = useState("");
    const [courseFilter, setCourseFilter] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [yearFilter, setYearFilter] = useState("");

    // ========================================================
    // SELECTED ASSIGNMENT
    // ========================================================

    const [selectedAssignment, setSelectedAssignment] =
        useState(null);

    // ========================================================
    // UI
    // ========================================================

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ========================================================
    // LOAD ASSIGNMENTS
    // ========================================================

    useEffect(() => {
        loadAssignments();
    }, []);

    const loadAssignments = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "principal/assignments/?page_size=100"
            );

            console.log(
                "Principal Assignments:",
                response.data
            );

            setAssignments(
                response.data.results ||
                response.data ||
                []
            );

        } catch (error) {

            console.error(
                "Principal Assignments Error:",
                error.response?.data || error
            );

            setAssignments([]);

            setError(
                error.response?.data?.detail ||
                "Unable to load assignments."
            );

        } finally {
            setLoading(false);
        }
    };

    // ========================================================
    // SUBJECT OPTIONS
    // ========================================================

    const subjectOptions = [
        ...new Map(
            assignments.map((item) => [
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

    // ========================================================
    // COURSE OPTIONS
    // ========================================================

    const courseOptions = [
        ...new Map(
            assignments.map((item) => [
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

    // ========================================================
    // DEPARTMENT OPTIONS
    // ========================================================

    const departmentOptions = [
        ...new Map(
            assignments.map((item) => [
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

    // ========================================================
    // YEAR OPTIONS
    // ========================================================

    const yearOptions = [
        ...new Set(
            assignments
                .map((item) => item.year)
                .filter(
                    (year) =>
                        year !== null &&
                        year !== undefined
                )
        )
    ].sort((a, b) => a - b);

    // ========================================================
    // FILTER ASSIGNMENTS
    // ========================================================

    const filteredAssignments = assignments.filter(
        (assignment) => {

            const searchValue =
                search.toLowerCase().trim();

            const title = String(
                assignment.title || ""
            );

            const description = String(
                assignment.description || ""
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

            const courseName = String(
                assignment.course_name ||
                assignment.course?.name ||
                assignment.course ||
                ""
            );

            const departmentName = String(
                assignment.department_name ||
                assignment.department?.name ||
                assignment.department ||
                ""
            );

            const studentName = String(
                assignment.student_name ||
                assignment.student?.name ||
                assignment.student ||
                ""
            );

            const matchesSearch =
                searchValue === "" ||
                title.toLowerCase().includes(searchValue) ||
                description.toLowerCase().includes(searchValue) ||
                subjectName.toLowerCase().includes(searchValue) ||
                subjectCode.toLowerCase().includes(searchValue) ||
                courseName.toLowerCase().includes(searchValue) ||
                departmentName.toLowerCase().includes(searchValue) ||
                studentName.toLowerCase().includes(searchValue);

            const matchesSubject =
                subjectFilter === "" ||
                String(
                    assignment.subject_id ??
                    assignment.subject
                ) === String(subjectFilter);

            const matchesCourse =
                courseFilter === "" ||
                String(
                    assignment.course_id ??
                    assignment.course
                ) === String(courseFilter);

            const matchesDepartment =
                departmentFilter === "" ||
                String(
                    assignment.department_id ??
                    assignment.department
                ) === String(departmentFilter);

            const matchesYear =
                yearFilter === "" ||
                String(assignment.year) ===
                String(yearFilter);

            return (
                matchesSearch &&
                matchesSubject &&
                matchesCourse &&
                matchesDepartment &&
                matchesYear
            );
        }
    );

    // ========================================================
    // VIEW DETAILS
    // ========================================================

    const handleView = (assignment) => {
        setSelectedAssignment(assignment);
    };

    // ========================================================
    // CLOSE DETAILS
    // ========================================================

    const handleClose = () => {
        setSelectedAssignment(null);
    };

    // ========================================================
    // CLEAR FILTERS
    // ========================================================

    const clearFilters = () => {
        setSearch("");
        setSubjectFilter("");
        setCourseFilter("");
        setDepartmentFilter("");
        setYearFilter("");
    };

    // ========================================================
    // REFRESH
    // ========================================================

    const refreshAssignments = () => {
        loadAssignments();
    };

    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {
        return (
            <div className="principal-page principal-assignments-page">
                <div className="principal-state-card">
                    <div className="principal-loading-icon">
                        ⏳
                    </div>

                    <h2>Principal Assignments</h2>

                    <p>
                        Loading assignments...
                    </p>
                </div>
            </div>
        );
    }

    // ========================================================
    // UI
    // ========================================================

    return (
        <div className="principal-page principal-assignments-page">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="principal-page-header">

                <div>
                    <h1 className="principal-page-title">
                        Principal Assignments
                    </h1>

                    <p className="principal-page-subtitle">
                        Monitor assignments assigned to students
                    </p>
                </div>

                <div className="principal-header-badge">
                    Assignments
                </div>

            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
                <div className="principal-alert principal-alert-error">

                    <span>
                        {error}
                    </span>

                    <button
                        type="button"
                        className="principal-btn principal-btn-danger principal-btn-sm"
                        onClick={refreshAssignments}
                    >
                        Retry
                    </button>

                </div>
            )}

            {/* =================================================
                FILTERS
            ================================================= */}

            <div className="principal-toolbar">

                <div className="principal-field principal-field-wide">

                    <label>
                        Search
                    </label>

                    <input
                        type="text"
                        className="principal-input"
                        placeholder="Search title / subject / student..."
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
                        onClick={refreshAssignments}
                    >
                        ↻ Refresh
                    </button>

                </div>

            </div>

            {/* =================================================
                COUNT
            ================================================= */}

            <div className="principal-count">
                Showing{" "}
                <strong>
                    {filteredAssignments.length}
                </strong>{" "}
                assignment(s)
            </div>

            {/* =================================================
                TABLE
            ================================================= */}

            {filteredAssignments.length === 0 ? (

                <div className="principal-state-card">

                    <div className="principal-empty-icon">
                        📂
                    </div>

                    <h3>
                        No assignments found
                    </h3>

                    <p>
                        No assignment records match your current filters.
                    </p>

                </div>

            ) : (

                <div className="principal-table-card">

                    <div className="principal-table-wrap">

                        <table className="principal-table">

                            <thead>

                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Subject</th>
                                    <th>Subject Code</th>
                                    <th>Course</th>
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

                                {filteredAssignments.map(
                                    (assignment) => (

                                        <tr
                                            key={assignment.id}
                                        >

                                            <td>
                                                <span className="principal-id">
                                                    {assignment.id}
                                                </span>
                                            </td>

                                            <td>
                                                <strong>
                                                    {assignment.title || "-"}
                                                </strong>
                                            </td>

                                            <td>
                                                {assignment.subject_name ||
                                                    assignment.subject?.name ||
                                                    assignment.subject ||
                                                    "-"}
                                            </td>

                                            <td>
                                                {assignment.subject_code ||
                                                    assignment.subject?.code ||
                                                    "-"}
                                            </td>

                                            <td>
                                                {assignment.course_name ||
                                                    assignment.course?.name ||
                                                    assignment.course ||
                                                    "-"}
                                            </td>

                                            <td>
                                                {assignment.department_name ||
                                                    assignment.department?.name ||
                                                    assignment.department ||
                                                    "-"}
                                            </td>

                                            <td>
                                                {assignment.year ?? "-"}
                                            </td>

                                            <td>
                                                {assignment.exam_name ||
                                                    assignment.exam?.name ||
                                                    assignment.exam ||
                                                    "-"}
                                            </td>

                                            <td>
                                                {assignment.student_name ||
                                                    assignment.student?.name ||
                                                    assignment.student ||
                                                    "-"}
                                            </td>

                                            <td>
                                                {assignment.due_date || "-"}
                                            </td>

                                            <td>
                                                {assignment.assigned_by_name ||
                                                    assignment.assigned_by ||
                                                    "-"}
                                            </td>

                                            <td>

                                                <button
                                                    type="button"
                                                    className="principal-btn principal-btn-secondary principal-btn-sm"
                                                    onClick={() =>
                                                        handleView(
                                                            assignment
                                                        )
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

            {/* =================================================
                DETAILS
            ================================================= */}

            {selectedAssignment && (

                <div className="principal-detail-card">

                    <div className="principal-detail-header">

                        <div>
                            <h2>
                                Assignment Details
                            </h2>

                            <p>
                                Complete assignment information
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
                                {selectedAssignment.id}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Title
                            </span>
                            <span className="principal-detail-value">
                                {selectedAssignment.title || "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item principal-detail-wide">
                            <span className="principal-detail-label">
                                Description
                            </span>
                            <span className="principal-detail-value">
                                {selectedAssignment.description || "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Subject
                            </span>
                            <span className="principal-detail-value">
                                {selectedAssignment.subject_name ||
                                    selectedAssignment.subject?.name ||
                                    selectedAssignment.subject ||
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Subject Code
                            </span>
                            <span className="principal-detail-value">
                                {selectedAssignment.subject_code ||
                                    selectedAssignment.subject?.code ||
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Course
                            </span>
                            <span className="principal-detail-value">
                                {selectedAssignment.course_name ||
                                    selectedAssignment.course?.name ||
                                    selectedAssignment.course ||
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Department
                            </span>
                            <span className="principal-detail-value">
                                {selectedAssignment.department_name ||
                                    selectedAssignment.department?.name ||
                                    selectedAssignment.department ||
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Year
                            </span>
                            <span className="principal-detail-value">
                                {selectedAssignment.year ?? "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Exam
                            </span>
                            <span className="principal-detail-value">
                                {selectedAssignment.exam_name ||
                                    selectedAssignment.exam?.name ||
                                    selectedAssignment.exam ||
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Student
                            </span>
                            <span className="principal-detail-value">
                                {selectedAssignment.student_name ||
                                    selectedAssignment.student?.name ||
                                    selectedAssignment.student ||
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Student Email
                            </span>
                            <span className="principal-detail-value">
                                {selectedAssignment.student_email ||
                                    selectedAssignment.student?.email ||
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Due Date
                            </span>
                            <span className="principal-detail-value">
                                {selectedAssignment.due_date || "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Assigned By
                            </span>
                            <span className="principal-detail-value">
                                {selectedAssignment.assigned_by_name ||
                                    selectedAssignment.assigned_by ||
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Created At
                            </span>
                            <span className="principal-detail-value">
                                {selectedAssignment.created_at || "-"}
                            </span>
                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default PrincipalAssignments;