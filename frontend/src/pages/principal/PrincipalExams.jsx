// import { useEffect, useState } from "react";

// import api from "../../api/axios";


// function PrincipalExams() {

//     // ========================================================
//     // DATA
//     // ========================================================

//     const [exams, setExams] = useState([]);

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

//     const [typeFilter, setTypeFilter] =
//         useState("");


//     // ========================================================
//     // SELECTED EXAM
//     // ========================================================

//     const [selectedExam, setSelectedExam] =
//         useState(null);


//     // ========================================================
//     // UI
//     // ========================================================

//     const [loading, setLoading] = useState(true);

//     const [error, setError] = useState("");


//     // ========================================================
//     // LOAD EXAMS
//     // ========================================================

//     useEffect(() => {

//         loadExams();

//     }, []);


//     const loadExams = async () => {

//         try {

//             setLoading(true);

//             setError("");


//             const response = await api.get(
//                 "principal/exams/?page_size=100"
//             );


//             console.log(
//                 "Principal Exams:",
//                 response.data
//             );


//             setExams(
//                 response.data.results ||
//                 response.data ||
//                 []
//             );


//         } catch (error) {

//             console.error(
//                 "Principal Exams Error:",
//                 error.response?.data || error
//             );


//             setExams([]);


//             setError(
//                 error.response?.data?.detail ||
//                 "Unable to load exams."
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

//             exams.map(
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

//             exams.map(
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

//             exams
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
//     // FILTER EXAMS
//     // ========================================================

//     const filteredExams =
//         exams.filter(
//             (exam) => {

//                 const searchValue =
//                     search
//                         .toLowerCase()
//                         .trim();


//                 const examName =
//                     String(
//                         exam.name ||
//                         ""
//                     );


//                 const subjectName =
//                     String(
//                         exam.subject_name ||
//                         exam.subject?.name ||
//                         exam.subject ||
//                         ""
//                     );


//                 const subjectCode =
//                     String(
//                         exam.subject_code ||
//                         exam.subject?.code ||
//                         ""
//                     );


//                 const courseName =
//                     String(
//                         exam.course_name ||
//                         exam.course?.name ||
//                         exam.course ||
//                         ""
//                     );


//                 const departmentName =
//                     String(
//                         exam.department_name ||
//                         exam.department?.name ||
//                         exam.department ||
//                         ""
//                     );


//                 const matchesSearch =

//                     searchValue === ""

//                     ||

//                     examName
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
//                         exam.subject_id ??
//                         exam.subject
//                     ) ===
//                     String(
//                         subjectFilter
//                     );


//                 const matchesCourse =

//                     courseFilter === ""

//                     ||

//                     String(
//                         exam.course_id ??
//                         exam.course
//                     ) ===
//                     String(
//                         courseFilter
//                     );


//                 const matchesDepartment =

//                     departmentFilter === ""

//                     ||

//                     String(
//                         exam.department_id ??
//                         exam.department
//                     ) ===
//                     String(
//                         departmentFilter
//                     );


//                 const matchesYear =

//                     yearFilter === ""

//                     ||

//                     String(
//                         exam.year
//                     ) ===
//                     String(
//                         yearFilter
//                     );


//                 const matchesType =

//                     typeFilter === ""

//                     ||

//                     exam.exam_status ===
//                     typeFilter;


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

//                     matchesType

//                 );

//             }
//         );


//     // ========================================================
//     // VIEW DETAILS
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

//         setDepartmentFilter("");

//         setYearFilter("");

//         setTypeFilter("");

//     };


//     // ========================================================
//     // REFRESH
//     // ========================================================

//     const refreshExams = () => {

//         loadExams();

//     };


//     // ========================================================
//     // GET EXAM STATUS
//     // ========================================================

//     const getExamStatus = (
//         exam
//     ) => {

//         if (
//             exam.exam_date
//         ) {

//             const today =
//                 new Date();

//             const examDate =
//                 new Date(
//                     exam.exam_date
//                 );


//             today.setHours(
//                 0,
//                 0,
//                 0,
//                 0
//             );


//             examDate.setHours(
//                 0,
//                 0,
//                 0,
//                 0
//             );


//             if (
//                 examDate >= today
//             ) {

//                 return "Upcoming";

//             }

//             return "Completed";

//         }


//         return "-";

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (

//             <div>

//                 <h1>
//                     Principal Exams
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
//                 Principal Exams
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
//                             refreshExams
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
//                     placeholder="Search exam / subject / code / course / department..."
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
//                 TYPE FILTER
//             ================================================= */}

//             <div>

//                 <label>
//                     Type:
//                 </label>

//                 {" "}


//                 <select
//                     value={
//                         typeFilter
//                     }
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
//                     refreshExams
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
//                 EXAM TABLE
//             ================================================= */}

//             {filteredExams.length === 0 ? (

//                 <p>
//                     No exams found.
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
//                                 Exam
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
//                                 Exam Date
//                             </th>

//                             <th>
//                                 Start
//                             </th>

//                             <th>
//                                 End
//                             </th>

//                             <th>
//                                 Status
//                             </th>

//                             <th>
//                                 Action
//                             </th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {filteredExams.map(
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
//                                         {
//                                             getExamStatus(
//                                                 exam
//                                             )
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
//                         )}

//                     </tbody>

//                 </table>

//             )}


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
//                             Course:
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
//                             Status:
//                         </strong>{" "}

//                         {
//                             getExamStatus(
//                                 selectedExam
//                             )
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Created By:
//                         </strong>{" "}

//                         {
//                             selectedExam.created_by_name ||
//                             selectedExam.created_by ||
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


// export default PrincipalExams;
import { useEffect, useState } from "react";
import api from "../../api/axios";

function PrincipalExams() {
    const [exams, setExams] = useState([]);

    const [search, setSearch] = useState("");
    const [subjectFilter, setSubjectFilter] = useState("");
    const [courseFilter, setCourseFilter] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [yearFilter, setYearFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    const [selectedExam, setSelectedExam] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ========================================================
    // LOAD EXAMS
    // ========================================================

    useEffect(() => {
        loadExams();
    }, []);

    const loadExams = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "principal/exams/?page_size=100"
            );

            console.log(
                "Principal Exams:",
                response.data
            );

            setExams(
                response.data.results ||
                response.data ||
                []
            );
        } catch (error) {
            console.error(
                "Principal Exams Error:",
                error.response?.data || error
            );

            setExams([]);

            setError(
                error.response?.data?.detail ||
                "Unable to load exams."
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
            exams.map((item) => [
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
            exams.map((item) => [
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
            exams.map((item) => [
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
            exams
                .map((item) => item.year)
                .filter(
                    (year) =>
                        year !== null &&
                        year !== undefined
                )
        )
    ].sort((a, b) => a - b);

    // ========================================================
    // FILTER EXAMS
    // ========================================================

    const filteredExams = exams.filter((exam) => {
        const searchValue = search
            .toLowerCase()
            .trim();

        const examName = String(
            exam.name || ""
        );

        const subjectName = String(
            exam.subject_name ||
            exam.subject?.name ||
            exam.subject ||
            ""
        );

        const subjectCode = String(
            exam.subject_code ||
            exam.subject?.code ||
            ""
        );

        const courseName = String(
            exam.course_name ||
            exam.course?.name ||
            exam.course ||
            ""
        );

        const departmentName = String(
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
            String(
                exam.subject_id ??
                exam.subject
            ) === String(subjectFilter);

        const matchesCourse =
            courseFilter === "" ||
            String(
                exam.course_id ??
                exam.course
            ) === String(courseFilter);

        const matchesDepartment =
            departmentFilter === "" ||
            String(
                exam.department_id ??
                exam.department
            ) === String(departmentFilter);

        const matchesYear =
            yearFilter === "" ||
            String(exam.year) === String(yearFilter);

        const matchesType =
            typeFilter === "" ||
            exam.exam_status === typeFilter;

        return (
            matchesSearch &&
            matchesSubject &&
            matchesCourse &&
            matchesDepartment &&
            matchesYear &&
            matchesType
        );
    });

    // ========================================================
    // STATUS
    // ========================================================

    const getExamStatus = (exam) => {
        if (exam.exam_date) {
            const today = new Date();
            const examDate = new Date(
                exam.exam_date
            );

            today.setHours(0, 0, 0, 0);
            examDate.setHours(0, 0, 0, 0);

            if (examDate >= today) {
                return "Upcoming";
            }

            return "Completed";
        }

        return "-";
    };

    // ========================================================
    // ACTIONS
    // ========================================================

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
        setDepartmentFilter("");
        setYearFilter("");
        setTypeFilter("");
    };

    const refreshExams = () => {
        loadExams();
    };

    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {
        return (
            <div className="principal-page principal-state-card">
                <h1>Principal Exams</h1>
                <p>Loading exams...</p>
            </div>
        );
    }

    // ========================================================
    // UI
    // ========================================================

    return (
        <div className="principal-page principal-exams-page">

            <div className="principal-page-header">
                <div>
                    <h1 className="principal-page-title">
                        Exam Management
                    </h1>

                    <p className="principal-page-subtitle">
                        View all examinations and their schedules.
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
                        onClick={refreshExams}
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* FILTER TOOLBAR */}

            <div className="principal-toolbar">

                <div className="principal-field principal-field-wide">
                    <label>Search</label>

                    <input
                        type="text"
                        className="principal-input"
                        placeholder="Search exam / subject / code / course / department..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />
                </div>

                <div className="principal-field">
                    <label>Subject</label>

                    <select
                        className="principal-select"
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

                <div className="principal-field">
                    <label>Status</label>

                    <select
                        className="principal-select"
                        value={typeFilter}
                        onChange={(e) =>
                            setTypeFilter(
                                e.target.value
                            )
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
                        onClick={refreshExams}
                    >
                        Refresh
                    </button>
                </div>

            </div>

            <p className="principal-count">
                Showing {filteredExams.length} exam(s)
            </p>

            {/* TABLE */}

            {filteredExams.length === 0 ? (
                <div className="principal-state-card">
                    <h3>No exams found</h3>
                    <p>
                        No exam records match the selected filters.
                    </p>
                </div>
            ) : (
                <div className="principal-table-card">
                    <div className="principal-table-wrap">

                        <table className="principal-table principal-table-wide">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Exam</th>
                                    <th>Subject</th>
                                    <th>Subject Code</th>
                                    <th>Course</th>
                                    <th>Department</th>
                                    <th>Year</th>
                                    <th>Exam Date</th>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredExams.map((exam) => {
                                    const status =
                                        getExamStatus(exam);

                                    return (
                                        <tr key={exam.id}>

                                            <td>{exam.id}</td>

                                            <td>
                                                {exam.name || "-"}
                                            </td>

                                            <td>
                                                {exam.subject_name ||
                                                    exam.subject?.name ||
                                                    exam.subject ||
                                                    "-"}
                                            </td>

                                            <td>
                                                {exam.subject_code ||
                                                    exam.subject?.code ||
                                                    "-"}
                                            </td>

                                            <td>
                                                {exam.course_name ||
                                                    exam.course?.name ||
                                                    exam.course ||
                                                    "-"}
                                            </td>

                                            <td>
                                                {exam.department_name ||
                                                    exam.department?.name ||
                                                    exam.department ||
                                                    "-"}
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
                                                <span
                                                    className={
                                                        status === "Upcoming"
                                                            ? "principal-status principal-status-upcoming"
                                                            : "principal-status principal-status-completed"
                                                    }
                                                >
                                                    {status}
                                                </span>
                                            </td>

                                            <td>
                                                <button
                                                    type="button"
                                                    className="principal-btn principal-btn-primary principal-btn-sm"
                                                    onClick={() =>
                                                        handleView(exam)
                                                    }
                                                >
                                                    View Details
                                                </button>
                                            </td>

                                        </tr>
                                    );
                                })}
                            </tbody>

                        </table>

                    </div>
                </div>
            )}

            {/* DETAILS */}

            {selectedExam && (
                <div className="principal-detail-card">

                    <div className="principal-detail-header">
                        <div>
                            <h2>Exam Details</h2>
                            <p>
                                Complete examination information
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
                                {selectedExam.id}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Exam Name
                            </span>
                            <span className="principal-detail-value">
                                {selectedExam.name || "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Subject
                            </span>
                            <span className="principal-detail-value">
                                {selectedExam.subject_name ||
                                    selectedExam.subject?.name ||
                                    selectedExam.subject ||
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Subject Code
                            </span>
                            <span className="principal-detail-value">
                                {selectedExam.subject_code ||
                                    selectedExam.subject?.code ||
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Course
                            </span>
                            <span className="principal-detail-value">
                                {selectedExam.course_name ||
                                    selectedExam.course?.name ||
                                    selectedExam.course ||
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Department
                            </span>
                            <span className="principal-detail-value">
                                {selectedExam.department_name ||
                                    selectedExam.department?.name ||
                                    selectedExam.department ||
                                    "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Year
                            </span>
                            <span className="principal-detail-value">
                                {selectedExam.year ?? "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Exam Date
                            </span>
                            <span className="principal-detail-value">
                                {selectedExam.exam_date || "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Start Time
                            </span>
                            <span className="principal-detail-value">
                                {selectedExam.start_time || "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                End Time
                            </span>
                            <span className="principal-detail-value">
                                {selectedExam.end_time || "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Status
                            </span>
                            <span className="principal-detail-value">
                                {getExamStatus(selectedExam)}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Created By
                            </span>
                            <span className="principal-detail-value">
                                {selectedExam.created_by_name ||
                                    selectedExam.created_by ||
                                    "-"}
                            </span>
                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default PrincipalExams;