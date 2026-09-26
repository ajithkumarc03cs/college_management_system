// import { useEffect, useState } from "react";

// import api from "../api/axios";


// function StaffExams() {

//     // ========================================================
//     // EXAM DATA
//     // ========================================================

//     const [exams, setExams] = useState([]);

//     const [courses, setCourses] = useState([]);

//     const [departments, setDepartments] = useState([]);

//     const [subjects, setSubjects] = useState([]);

//     const [courseDepartments, setCourseDepartments] = useState([]);


//     // ========================================================
//     // CREATE EXAM FORM
//     // ========================================================

//     const [name, setName] = useState("");

//     const [course, setCourse] = useState("");

//     const [department, setDepartment] = useState("");

//     const [subject, setSubject] = useState("");

//     const [year, setYear] = useState("");

//     const [examDate, setExamDate] = useState("");

//     const [startTime, setStartTime] = useState("");

//     const [endTime, setEndTime] = useState("");


//     // ========================================================
//     // SEARCH / FILTER
//     // ========================================================

//     const [search, setSearch] = useState("");

//     const [examType, setExamType] = useState("");


//     // ========================================================
//     // UI STATE
//     // ========================================================

//     const [loading, setLoading] = useState(false);

//     const [error, setError] = useState("");

//     const [success, setSuccess] = useState("");


//     // ========================================================
//     // TODAY DATE
//     // ========================================================

//     const today = new Date()
//         .toISOString()
//         .split("T")[0];


//     // ========================================================
//     // LOAD STAFF EXAM OPTIONS
//     // ========================================================

//     const getFilterOptions = async () => {

//         try {

//             const response = await api.get(
//                 "staff/exam-filter-options/"
//             );


//             setCourses(
//                 response.data.courses || []
//             );


//             setDepartments(
//                 response.data.departments || []
//             );


//             setSubjects(
//                 response.data.subjects || []
//             );


//             setCourseDepartments(
//                 response.data.course_departments || []
//             );

//         }

//         catch (error) {

//             console.log(
//                 "Filter options error:",
//                 error.response?.data
//             );


//             setError(
//                 "Unable to load exam options."
//             );

//         }

//     };


//     // ========================================================
//     // LOAD EXAMS
//     // ========================================================

//     const getExams = async (
//         searchValue = search,
//         typeValue = examType
//     ) => {

//         setLoading(true);

//         setError("");


//         try {

//             const params = {};


//             // ------------------------------------------------
//             // SEARCH
//             // ------------------------------------------------

//             if (
//                 searchValue &&
//                 searchValue.trim()
//             ) {

//                 params.search =
//                     searchValue.trim();

//             }


//             // ------------------------------------------------
//             // TYPE
//             // ------------------------------------------------

//             if (typeValue) {

//                 params.type =
//                     typeValue;

//             }


//             const response = await api.get(

//                 "exams/",

//                 {
//                     params: params
//                 }

//             );


//             setExams(

//                 response.data.results ||
//                 response.data ||
//                 []

//             );

//         }

//         catch (error) {

//             console.log(
//                 "Exam loading error:",
//                 error.response?.data
//             );


//             setExams([]);


//             setError(
//                 "Unable to load exams."
//             );

//         }

//         finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // INITIAL PAGE LOAD
//     // ========================================================

//     useEffect(() => {

//         getFilterOptions();

//         getExams();

//     }, []);


//     // ========================================================
//     // COURSE CHANGE
//     // ========================================================

//     const handleCourseChange = (e) => {

//         const selectedCourse =
//             e.target.value;


//         setCourse(
//             selectedCourse
//         );


//         setDepartment("");

//         setSubject("");

//         setYear("");

//     };


//     // ========================================================
//     // DEPARTMENT CHANGE
//     // ========================================================

//     const handleDepartmentChange = (e) => {

//         const selectedDepartment =
//             e.target.value;


//         setDepartment(
//             selectedDepartment
//         );


//         setSubject("");

//         setYear("");

//     };


//     // ========================================================
//     // SUBJECT CHANGE
//     // ========================================================

//     const handleSubjectChange = (e) => {

//         const selectedSubject =
//             e.target.value;


//         setSubject(
//             selectedSubject
//         );


//         const selectedSubjectData =
//             subjects.find(

//                 (item) =>
//                     String(item.id) ===
//                     String(selectedSubject)

//             );


//         if (selectedSubjectData) {

//             setYear(
//                 selectedSubjectData.year
//             );

//         }

//         else {

//             setYear("");

//         }

//     };


//     // ========================================================
//     // FILTER DEPARTMENTS BY COURSE
//     // ========================================================

//     const filteredDepartments =

//         course

//             ? departments.filter(

//                   (departmentItem) => {

//                       return courseDepartments.some(

//                           (pair) =>

//                               String(
//                                   pair.course_id
//                               ) ===
//                               String(course)

//                               &&

//                               String(
//                                   pair.department_id
//                               ) ===
//                               String(
//                                   departmentItem.id
//                               )

//                       );

//                   }

//               )

//             : [];


//     // ========================================================
//     // FILTER SUBJECTS BY COURSE + DEPARTMENT
//     // ========================================================

//     const filteredSubjects =

//         subjects.filter(

//             (subjectItem) => {

//                 if (!course) {

//                     return false;

//                 }


//                 if (!department) {

//                     return false;

//                 }


//                 return (

//                     String(
//                         subjectItem.course_id
//                     ) ===
//                     String(course)

//                     &&

//                     String(
//                         subjectItem.department_id
//                     ) ===
//                     String(department)

//                 );

//             }

//         );


//     // ========================================================
//     // CREATE EXAM
//     // ========================================================

//     const handleSubmit = async (e) => {

//         e.preventDefault();


//         setError("");

//         setSuccess("");


//         // ====================================================
//         // BASIC VALIDATION
//         // ====================================================

//         if (!name.trim()) {

//             setError(
//                 "Exam name is required."
//             );

//             return;

//         }


//         if (!course) {

//             setError(
//                 "Please select a course."
//             );

//             return;

//         }


//         if (!department) {

//             setError(
//                 "Please select a department."
//             );

//             return;

//         }


//         if (!subject) {

//             setError(
//                 "Please select a subject."
//             );

//             return;

//         }


//         if (!year) {

//             setError(
//                 "Year is required."
//             );

//             return;

//         }


//         if (!examDate) {

//             setError(
//                 "Please select an exam date."
//             );

//             return;

//         }


//         if (examDate < today) {

//             setError(
//                 "Exam date cannot be in the past."
//             );

//             return;

//         }


//         if (!startTime) {

//             setError(
//                 "Please select start time."
//             );

//             return;

//         }


//         if (!endTime) {

//             setError(
//                 "Please select end time."
//             );

//             return;

//         }


//         if (startTime >= endTime) {

//             setError(
//                 "End time must be greater than start time."
//             );

//             return;

//         }


//         // ====================================================
//         // CREATE
//         // ====================================================

//         try {

//             await api.post(

//                 "exams/",

//                 {

//                     name:
//                         name.trim(),

//                     subject:
//                         Number(subject),

//                     course:
//                         Number(course),

//                     department:
//                         Number(department),

//                     year:
//                         Number(year),

//                     exam_date:
//                         examDate,

//                     start_time:
//                         startTime,

//                     end_time:
//                         endTime

//                 }

//             );


//             setSuccess(
//                 "Exam created successfully."
//             );


//             // =================================================
//             // CLEAR FORM
//             // =================================================

//             setName("");

//             setCourse("");

//             setDepartment("");

//             setSubject("");

//             setYear("");

//             setExamDate("");

//             setStartTime("");

//             setEndTime("");


//             // =================================================
//             // RELOAD
//             // =================================================

//             getExams(
//                 search,
//                 examType
//             );

//         }

//         catch (error) {

//             console.log(
//                 "Exam creation error:",
//                 error.response?.data
//             );


//             const responseError =
//                 error.response?.data;


//             if (
//                 responseError &&
//                 typeof responseError === "object"
//             ) {

//                 setError(
//                     JSON.stringify(
//                         responseError
//                     )
//                 );

//             }

//             else {

//                 setError(
//                     "Unable to create exam."
//                 );

//             }

//         }

//     };


//     // ========================================================
//     // DELETE EXAM
//     // ========================================================

//     const handleDelete = async (id) => {

//         const confirmed =
//             window.confirm(
//                 "Are you sure you want to delete this exam?"
//             );


//         if (!confirmed) {

//             return;

//         }


//         setError("");

//         setSuccess("");


//         try {

//             await api.delete(
//                 `exams/${id}/`
//             );


//             setSuccess(
//                 "Exam deleted successfully."
//             );


//             getExams(
//                 search,
//                 examType
//             );

//         }

//         catch (error) {

//             console.log(
//                 "Delete error:",
//                 error.response?.data
//             );


//             const responseError =
//                 error.response?.data;


//             if (
//                 responseError &&
//                 typeof responseError === "object"
//             ) {

//                 setError(
//                     JSON.stringify(
//                         responseError
//                     )
//                 );

//             }

//             else {

//                 setError(
//                     "Unable to delete exam."
//                 );

//             }

//         }

//     };


//     // ========================================================
//     // SEARCH
//     // ========================================================

//     const handleSearch = () => {

//         getExams(
//             search,
//             examType
//         );

//     };


//     // ========================================================
//     // TYPE CHANGE
//     // ========================================================

//     const handleTypeChange = (e) => {

//         const value =
//             e.target.value;


//         setExamType(
//             value
//         );


//         getExams(
//             search,
//             value
//         );

//     };


//     // ========================================================
//     // CLEAR FILTER
//     // ========================================================

//     const handleClear = () => {

//         setSearch("");

//         setExamType("");


//         getExams(
//             "",
//             ""
//         );

//     };


//     // ========================================================
//     // RENDER
//     // ========================================================

//     return (

//         <div>

//             {/* =================================================
//                 PAGE TITLE
//             ================================================= */}

//             <h1>
//                 Staff Exams
//             </h1>


//             {/* =================================================
//                 CREATE EXAM
//             ================================================= */}

//             <h2>
//                 Create Exam
//             </h2>


//             <form
//                 onSubmit={handleSubmit}
//             >

//                 {/* ------------------------------------------------
//                     EXAM NAME
//                 ------------------------------------------------ */}

//                 <div>

//                     <label>
//                         Exam Name
//                     </label>

//                     <br />

//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) =>
//                             setName(
//                                 e.target.value
//                             )
//                         }
//                         placeholder="Enter exam name"
//                         required
//                     />

//                 </div>


//                 <br />


//                 {/* ------------------------------------------------
//                     COURSE
//                 ------------------------------------------------ */}

//                 <div>

//                     <label>
//                         Course
//                     </label>

//                     <br />

//                     <select
//                         value={course}
//                         onChange={
//                             handleCourseChange
//                         }
//                         required
//                     >

//                         <option value="">
//                             Select Course
//                         </option>


//                         {courses.map(
//                             (item) => (

//                                 <option
//                                     key={item.id}
//                                     value={item.id}
//                                 >

//                                     {item.name}

//                                     {item.code
//                                         ? ` (${item.code})`
//                                         : ""
//                                     }

//                                 </option>

//                             )
//                         )}

//                     </select>

//                 </div>


//                 <br />


//                 {/* ------------------------------------------------
//                     DEPARTMENT
//                 ------------------------------------------------ */}

//                 <div>

//                     <label>
//                         Department
//                     </label>

//                     <br />

//                     <select
//                         value={department}
//                         onChange={
//                             handleDepartmentChange
//                         }
//                         disabled={!course}
//                         required
//                     >

//                         <option value="">
//                             Select Department
//                         </option>


//                         {filteredDepartments.map(
//                             (item) => (

//                                 <option
//                                     key={item.id}
//                                     value={item.id}
//                                 >

//                                     {item.name}

//                                 </option>

//                             )
//                         )}

//                     </select>

//                 </div>


//                 <br />


//                 {/* ------------------------------------------------
//                     SUBJECT
//                 ------------------------------------------------ */}

//                 <div>

//                     <label>
//                         Subject
//                     </label>

//                     <br />

//                     <select
//                         value={subject}
//                         onChange={
//                             handleSubjectChange
//                         }
//                         disabled={
//                             !course ||
//                             !department
//                         }
//                         required
//                     >

//                         <option value="">
//                             Select Subject
//                         </option>


//                         {filteredSubjects.map(
//                             (item) => (

//                                 <option
//                                     key={item.id}
//                                     value={item.id}
//                                 >

//                                     {item.name}

//                                     {item.code
//                                         ? ` (${item.code})`
//                                         : ""
//                                     }

//                                 </option>

//                             )
//                         )}

//                     </select>

//                 </div>


//                 <br />


//                 {/* ------------------------------------------------
//                     YEAR
//                 ------------------------------------------------ */}

//                 <div>

//                     <label>
//                         Year
//                     </label>

//                     <br />

//                     <input
//                         type="number"
//                         value={year}
//                         readOnly
//                     />

//                 </div>


//                 <br />


//                 {/* ------------------------------------------------
//                     EXAM DATE
//                 ------------------------------------------------ */}

//                 <div>

//                     <label>
//                         Exam Date
//                     </label>

//                     <br />

//                     <input
//                         type="date"
//                         value={examDate}
//                         min={today}
//                         onChange={(e) =>
//                             setExamDate(
//                                 e.target.value
//                             )
//                         }
//                         required
//                     />

//                 </div>


//                 <br />


//                 {/* ------------------------------------------------
//                     START TIME
//                 ------------------------------------------------ */}

//                 <div>

//                     <label>
//                         Start Time
//                     </label>

//                     <br />

//                     <input
//                         type="time"
//                         value={startTime}
//                         onChange={(e) =>
//                             setStartTime(
//                                 e.target.value
//                             )
//                         }
//                         required
//                     />

//                 </div>


//                 <br />


//                 {/* ------------------------------------------------
//                     END TIME
//                 ------------------------------------------------ */}

//                 <div>

//                     <label>
//                         End Time
//                     </label>

//                     <br />

//                     <input
//                         type="time"
//                         value={endTime}
//                         onChange={(e) =>
//                             setEndTime(
//                                 e.target.value
//                             )
//                         }
//                         required
//                     />

//                 </div>


//                 <br />


//                 <button
//                     type="submit"
//                 >
//                     Create Exam
//                 </button>

//             </form>


//             <br />


//             {/* =================================================
//                 MESSAGES
//             ================================================= */}

//             {error && (

//                 <p>
//                     {error}
//                 </p>

//             )}


//             {success && (

//                 <p>
//                     {success}
//                 </p>

//             )}


//             {/* =================================================
//                 EXAM LIST
//             ================================================= */}

//             <h2>
//                 My Exams
//             </h2>


//             {/* =================================================
//                 SEARCH
//             ================================================= */}

//             <div>

//                 <input
//                     type="text"
//                     placeholder="Search exam..."
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


//                 <button
//                     type="button"
//                     onClick={handleSearch}
//                 >
//                     Search
//                 </button>


//                 <select
//                     value={examType}
//                     onChange={
//                         handleTypeChange
//                     }
//                 >

//                     <option value="">
//                         All Exams
//                     </option>

//                     <option value="upcoming">
//                         Upcoming
//                     </option>

//                     <option value="completed">
//                         Completed
//                     </option>

//                 </select>


//                 <button
//                     type="button"
//                     onClick={handleClear}
//                 >
//                     Clear
//                 </button>

//             </div>


//             <br />


//             {/* =================================================
//                 LOADING
//             ================================================= */}

//             {loading && (

//                 <p>
//                     Loading exams...
//                 </p>

//             )}


//             {/* =================================================
//                 EXAM TABLE
//             ================================================= */}

//             {!loading && (

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
//                                 Course / Class
//                             </th>

//                             <th>
//                                 Department
//                             </th>

//                             <th>
//                                 Year
//                             </th>

//                             <th>
//                                 Date
//                             </th>

//                             <th>
//                                 Start
//                             </th>

//                             <th>
//                                 End
//                             </th>

//                             <th>
//                                 Action
//                             </th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {exams.length === 0 ? (

//                             <tr>

//                                 <td
//                                     colSpan="11"
//                                 >
//                                     No exams found.
//                                 </td>

//                             </tr>

//                         ) : (

//                             exams.map(
//                                 (exam) => (

//                                     <tr
//                                         key={
//                                             exam.id
//                                         }
//                                     >

//                                         <td>
//                                             {
//                                                 exam.id
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 exam.name
//                                                 || "-"
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 exam.subject_name
//                                                 || "-"
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 exam.subject_code
//                                                 || "-"
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 exam.course_name
//                                                 || "-"
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 exam.department_name
//                                                 || "-"
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 exam.year
//                                                 ?? "-"
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 exam.exam_date
//                                                 || "-"
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 exam.start_time
//                                                 || "-"
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 exam.end_time
//                                                 || "-"
//                                             }
//                                         </td>


//                                         <td>

//                                             <button
//                                                 type="button"
//                                                 onClick={() =>
//                                                     handleDelete(
//                                                         exam.id
//                                                     )
//                                                 }
//                                             >
//                                                 Delete
//                                             </button>

//                                         </td>

//                                     </tr>

//                                 )
//                             )

//                         )}

//                     </tbody>

//                 </table>

//             )}

//         </div>

//     );

// }


// export default StaffExams;
import { useEffect, useState } from "react";
import api from "../api/axios";

function StaffExams() {
    // ========================================================
    // DATA
    // ========================================================

    const [exams, setExams] = useState([]);
    const [courses, setCourses] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [courseDepartments, setCourseDepartments] = useState([]);

    // ========================================================
    // FORM
    // ========================================================

    const [name, setName] = useState("");
    const [course, setCourse] = useState("");
    const [department, setDepartment] = useState("");
    const [subject, setSubject] = useState("");
    const [year, setYear] = useState("");
    const [examDate, setExamDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    // ========================================================
    // FILTERS
    // ========================================================

    const [search, setSearch] = useState("");
    const [examType, setExamType] = useState("");

    // ========================================================
    // UI STATE
    // ========================================================

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ========================================================
    // TODAY
    // ========================================================

    const today = new Date()
        .toISOString()
        .split("T")[0];

    // ========================================================
    // LOAD FILTER OPTIONS
    // ========================================================

    const getFilterOptions = async () => {
        try {
            const response = await api.get(
                "staff/exam-filter-options/"
            );

            setCourses(
                response.data.courses || []
            );

            setDepartments(
                response.data.departments || []
            );

            setSubjects(
                response.data.subjects || []
            );

            setCourseDepartments(
                response.data.course_departments || []
            );
        } catch (error) {
            console.log(
                "Filter options error:",
                error.response?.data
            );

            setError(
                "Unable to load exam options."
            );
        }
    };

    // ========================================================
    // LOAD EXAMS
    // ========================================================

    const getExams = async (
        searchValue = search,
        typeValue = examType
    ) => {
        setLoading(true);
        setError("");

        try {
            const params = {};

            if (
                searchValue &&
                searchValue.trim()
            ) {
                params.search =
                    searchValue.trim();
            }

            if (typeValue) {
                params.type =
                    typeValue;
            }

            const response = await api.get(
                "exams/",
                {
                    params
                }
            );

            setExams(
                response.data.results ||
                response.data ||
                []
            );
        } catch (error) {
            console.log(
                "Exam loading error:",
                error.response?.data
            );

            setExams([]);

            setError(
                "Unable to load exams."
            );
        } finally {
            setLoading(false);
        }
    };

    // ========================================================
    // INITIAL LOAD
    // ========================================================

    useEffect(() => {
        getFilterOptions();
        getExams();
    }, []);

    // ========================================================
    // COURSE CHANGE
    // ========================================================

    const handleCourseChange = (e) => {
        const selectedCourse =
            e.target.value;

        setCourse(selectedCourse);

        setDepartment("");
        setSubject("");
        setYear("");
    };

    // ========================================================
    // DEPARTMENT CHANGE
    // ========================================================

    const handleDepartmentChange = (e) => {
        const selectedDepartment =
            e.target.value;

        setDepartment(selectedDepartment);

        setSubject("");
        setYear("");
    };

    // ========================================================
    // SUBJECT CHANGE
    // ========================================================

    const handleSubjectChange = (e) => {
        const selectedSubject =
            e.target.value;

        setSubject(selectedSubject);

        const selectedSubjectData =
            subjects.find(
                (item) =>
                    String(item.id) ===
                    String(selectedSubject)
            );

        if (selectedSubjectData) {
            setYear(
                selectedSubjectData.year
            );
        } else {
            setYear("");
        }
    };

    // ========================================================
    // FILTER DEPARTMENTS BY COURSE
    // ========================================================

    const filteredDepartments =
        course
            ? departments.filter(
                  (departmentItem) =>
                      courseDepartments.some(
                          (pair) =>
                              String(
                                  pair.course_id
                              ) ===
                              String(course) &&
                              String(
                                  pair.department_id
                              ) ===
                              String(
                                  departmentItem.id
                              )
                      )
              )
            : [];

    // ========================================================
    // FILTER SUBJECTS
    // ========================================================

    const filteredSubjects =
        subjects.filter(
            (subjectItem) => {
                if (!course) {
                    return false;
                }

                if (!department) {
                    return false;
                }

                return (
                    String(
                        subjectItem.course_id
                    ) ===
                        String(course) &&
                    String(
                        subjectItem.department_id
                    ) ===
                        String(department)
                );
            }
        );

    // ========================================================
    // CREATE EXAM
    // ========================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        // ----------------------------------------------------
        // VALIDATION
        // ----------------------------------------------------

        if (!name.trim()) {
            setError(
                "Exam name is required."
            );
            return;
        }

        if (!course) {
            setError(
                "Please select a course."
            );
            return;
        }

        if (!department) {
            setError(
                "Please select a department."
            );
            return;
        }

        if (!subject) {
            setError(
                "Please select a subject."
            );
            return;
        }

        if (!year) {
            setError(
                "Year is required."
            );
            return;
        }

        if (!examDate) {
            setError(
                "Please select an exam date."
            );
            return;
        }

        if (examDate < today) {
            setError(
                "Exam date cannot be in the past."
            );
            return;
        }

        if (!startTime) {
            setError(
                "Please select start time."
            );
            return;
        }

        if (!endTime) {
            setError(
                "Please select end time."
            );
            return;
        }

        if (startTime >= endTime) {
            setError(
                "End time must be greater than start time."
            );
            return;
        }

        // ----------------------------------------------------
        // CREATE
        // ----------------------------------------------------

        try {
            await api.post(
                "exams/",
                {
                    name: name.trim(),
                    subject: Number(subject),
                    course: Number(course),
                    department: Number(department),
                    year: Number(year),
                    exam_date: examDate,
                    start_time: startTime,
                    end_time: endTime
                }
            );

            setSuccess(
                "Exam created successfully."
            );

            // ------------------------------------------------
            // RESET FORM
            // ------------------------------------------------

            setName("");
            setCourse("");
            setDepartment("");
            setSubject("");
            setYear("");
            setExamDate("");
            setStartTime("");
            setEndTime("");

            // ------------------------------------------------
            // REFRESH
            // ------------------------------------------------

            getExams(
                search,
                examType
            );
        } catch (error) {
            console.log(
                "Exam creation error:",
                error.response?.data
            );

            const responseError =
                error.response?.data;

            if (
                responseError &&
                typeof responseError === "object"
            ) {
                setError(
                    JSON.stringify(
                        responseError
                    )
                );
            } else {
                setError(
                    "Unable to create exam."
                );
            }
        }
    };

    // ========================================================
    // DELETE EXAM
    // ========================================================

    const handleDelete = async (id) => {
        const confirmed =
            window.confirm(
                "Are you sure you want to delete this exam?"
            );

        if (!confirmed) {
            return;
        }

        setError("");
        setSuccess("");

        try {
            await api.delete(
                `exams/${id}/`
            );

            setSuccess(
                "Exam deleted successfully."
            );

            getExams(
                search,
                examType
            );
        } catch (error) {
            console.log(
                "Delete error:",
                error.response?.data
            );

            const responseError =
                error.response?.data;

            if (
                responseError &&
                typeof responseError === "object"
            ) {
                setError(
                    JSON.stringify(
                        responseError
                    )
                );
            } else {
                setError(
                    "Unable to delete exam."
                );
            }
        }
    };

    // ========================================================
    // SEARCH
    // ========================================================

    const handleSearch = () => {
        getExams(
            search,
            examType
        );
    };

    // ========================================================
    // TYPE CHANGE
    // ========================================================

    const handleTypeChange = (e) => {
        const value =
            e.target.value;

        setExamType(value);

        getExams(
            search,
            value
        );
    };

    // ========================================================
    // CLEAR FILTER
    // ========================================================

    const handleClear = () => {
        setSearch("");
        setExamType("");

        getExams(
            "",
            ""
        );
    };

    // ========================================================
    // RENDER
    // ========================================================

    return (
        <div className="staff-page">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="page-header">

                <div>

                    <h1>
                        Staff Exams
                    </h1>

                    <p>
                        Create and manage your exams
                    </p>

                </div>

            </div>

            {/* =================================================
                CREATE EXAM
            ================================================= */}

            <section className="page-section">

                <div className="section-header">

                    <div>

                        <h2>
                            Create Exam
                        </h2>

                        <p>
                            Schedule a new examination
                        </p>

                    </div>

                </div>

                <form
                    className="exam-form"
                    onSubmit={handleSubmit}
                >

                    {/* EXAM NAME */}

                    <div className="form-group">

                        <label>
                            Exam Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                            placeholder="Enter exam name"
                            required
                        />

                    </div>

                    {/* COURSE */}

                    <div className="form-group">

                        <label>
                            Course
                        </label>

                        <select
                            value={course}
                            onChange={
                                handleCourseChange
                            }
                            required
                        >

                            <option value="">
                                Select Course
                            </option>

                            {courses.map(
                                (item) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.name}

                                        {item.code
                                            ? ` (${item.code})`
                                            : ""
                                        }
                                    </option>
                                )
                            )}

                        </select>

                    </div>

                    {/* DEPARTMENT */}

                    <div className="form-group">

                        <label>
                            Department
                        </label>

                        <select
                            value={department}
                            onChange={
                                handleDepartmentChange
                            }
                            disabled={!course}
                            required
                        >

                            <option value="">
                                Select Department
                            </option>

                            {filteredDepartments.map(
                                (item) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.name}
                                    </option>
                                )
                            )}

                        </select>

                    </div>

                    {/* SUBJECT */}

                    <div className="form-group">

                        <label>
                            Subject
                        </label>

                        <select
                            value={subject}
                            onChange={
                                handleSubjectChange
                            }
                            disabled={
                                !course ||
                                !department
                            }
                            required
                        >

                            <option value="">
                                Select Subject
                            </option>

                            {filteredSubjects.map(
                                (item) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.name}

                                        {item.code
                                            ? ` (${item.code})`
                                            : ""
                                        }
                                    </option>
                                )
                            )}

                        </select>

                    </div>

                    {/* YEAR */}

                    <div className="form-group">

                        <label>
                            Year
                        </label>

                        <input
                            type="number"
                            value={year}
                            readOnly
                        />

                    </div>

                    {/* DATE */}

                    <div className="form-group">

                        <label>
                            Exam Date
                        </label>

                        <input
                            type="date"
                            value={examDate}
                            min={today}
                            onChange={(e) =>
                                setExamDate(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    {/* START TIME */}

                    <div className="form-group">

                        <label>
                            Start Time
                        </label>

                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) =>
                                setStartTime(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    {/* END TIME */}

                    <div className="form-group">

                        <label>
                            End Time
                        </label>

                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) =>
                                setEndTime(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    {/* SUBMIT */}

                    <div className="form-actions">

                        <button
                            type="submit"
                        >
                            Create Exam
                        </button>

                    </div>

                </form>

            </section>

            {/* =================================================
                MESSAGES
            ================================================= */}

            {error && (
                <div className="alert error-alert">
                    {error}
                </div>
            )}

            {success && (
                <div className="alert success-alert">
                    {success}
                </div>
            )}

            {/* =================================================
                EXAM LIST
            ================================================= */}

            <section className="page-section">

                <div className="section-header">

                    <div>

                        <h2>
                            My Exams
                        </h2>

                        <p>
                            View and manage your exams
                        </p>

                    </div>

                    <div className="section-count">

                        {exams.length} Exams

                    </div>

                </div>

                {/* ------------------------------------------------
                    SEARCH / FILTER
                ------------------------------------------------ */}

                <div className="toolbar">

                    <div className="filter-group">

                        <label>
                            Search
                        </label>

                        <input
                            type="text"
                            placeholder="Search exam..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            onKeyDown={(e) => {
                                if (
                                    e.key === "Enter"
                                ) {
                                    handleSearch();
                                }
                            }}
                        />

                    </div>

                    <div className="filter-group">

                        <label>
                            Exam Type
                        </label>

                        <select
                            value={examType}
                            onChange={
                                handleTypeChange
                            }
                        >

                            <option value="">
                                All Exams
                            </option>

                            <option value="upcoming">
                                Upcoming
                            </option>

                            <option value="completed">
                                Completed
                            </option>

                        </select>

                    </div>

                    <div className="filter-actions">

                        <button
                            type="button"
                            onClick={
                                handleSearch
                            }
                        >
                            Search
                        </button>

                        <button
                            type="button"
                            onClick={
                                handleClear
                            }
                        >
                            Clear
                        </button>

                    </div>

                </div>

                {/* ------------------------------------------------
                    LOADING
                ------------------------------------------------ */}

                {loading && (
                    <div className="loading-state">
                        Loading exams...
                    </div>
                )}

                {/* ------------------------------------------------
                    TABLE
                ------------------------------------------------ */}

                {!loading && (

                    <div className="table-wrapper">

                        <table>

                            <thead>

                                <tr>

                                    <th>ID</th>
                                    <th>Exam</th>
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

                                {exams.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="11"
                                            className="empty-table-cell"
                                        >
                                            No exams found.
                                        </td>

                                    </tr>

                                ) : (

                                    exams.map(
                                        (exam) => (

                                            <tr
                                                key={
                                                    exam.id
                                                }
                                            >

                                                <td>
                                                    {
                                                        exam.id
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        exam.name ||
                                                        "-"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        exam.subject_name ||
                                                        "-"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        exam.subject_code ||
                                                        "-"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        exam.course_name ||
                                                        "-"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        exam.department_name ||
                                                        "-"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        exam.year ??
                                                        "-"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        exam.exam_date ||
                                                        "-"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        exam.start_time ||
                                                        "-"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        exam.end_time ||
                                                        "-"
                                                    }
                                                </td>

                                                <td>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                exam.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </section>

        </div>
    );
}

export default StaffExams;