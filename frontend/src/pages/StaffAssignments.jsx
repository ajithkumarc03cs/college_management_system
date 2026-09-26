// import { useEffect, useState } from "react";

// import api from "../api/axios";


// function StaffAssignments() {

//     const [assignments, setAssignments] = useState([]);

//     const [subjects, setSubjects] = useState([]);

//     const [exams, setExams] = useState([]);

//     const [students, setStudents] = useState([]);


//     // ========================================================
//     // FORM
//     // ========================================================

//     const [selectedSubject, setSelectedSubject] = useState("");

//     const [selectedExam, setSelectedExam] = useState("");

//     const [selectedStudent, setSelectedStudent] = useState("");

//     const [title, setTitle] = useState("");

//     const [description, setDescription] = useState("");

//     const [dueDate, setDueDate] = useState("");


//     // ========================================================
//     // SEARCH
//     // ========================================================

//     const [search, setSearch] = useState("");


//     // ========================================================
//     // UI STATE
//     // ========================================================

//     const [loading, setLoading] = useState(false);

//     const [error, setError] = useState("");

//     const [success, setSuccess] = useState("");


//     // ========================================================
//     // TODAY
//     // ========================================================

//     const today = new Date()
//         .toISOString()
//         .split("T")[0];


//     // ========================================================
//     // LOAD ASSIGNMENTS
//     // ========================================================

//     const loadAssignments = async () => {

//         try {

//             setError("");


//             const response = await api.get(

//                 "assignments/",

//                 {
//                     params: {
//                         page_size: 100
//                     }
//                 }

//             );


//             setAssignments(

//                 response.data.results ||
//                 response.data ||
//                 []

//             );

//         }

//         catch (error) {

//             console.error(
//                 "Assignment Error:",
//                 error.response?.data || error
//             );


//             setAssignments([]);


//             setError(
//                 "Unable to load assignments."
//             );

//         }

//     };


//     // ========================================================
//     // LOAD STAFF SUBJECTS
//     // ========================================================

//     const loadSubjects = async () => {

//         try {

//             const response = await api.get(
//                 "staff/subjects/"
//             );


//             const data =
//                 response.data.results ||
//                 response.data ||
//                 [];


//             const subjectList = data.map(
//                 (item) => ({

//                     id:
//                         item.subject,

//                     name:
//                         item.subject_name,

//                     code:
//                         item.subject_code,

//                     course_name:
//                         item.course_name,

//                     department_name:
//                         item.department_name

//                 })
//             );


//             setSubjects(
//                 subjectList
//             );

//         }

//         catch (error) {

//             console.error(
//                 "Subject Error:",
//                 error.response?.data || error
//             );


//             setSubjects([]);


//             setError(
//                 "Unable to load subjects."
//             );

//         }

//     };


//     // ========================================================
//     // INITIAL LOAD
//     // ========================================================

//     useEffect(() => {

//         loadAssignments();

//         loadSubjects();

//     }, []);


//     // ========================================================
//     // SUBJECT CHANGE
//     // ========================================================

//     const handleSubjectChange = async (e) => {

//         const subjectId =
//             e.target.value;


//         setSelectedSubject(
//             subjectId
//         );

//         setSelectedExam("");

//         setSelectedStudent("");

//         setExams([]);

//         setStudents([]);

//         setError("");

//         setSuccess("");


//         if (!subjectId) {

//             return;

//         }


//         try {

//             const response = await api.get(

//                 "exams/",

//                 {
//                     params: {

//                         subject:
//                             subjectId,

//                         page_size:
//                             100

//                     }
//                 }

//             );


//             const data =
//                 response.data.results ||
//                 response.data ||
//                 [];


//             setExams(
//                 data
//             );

//         }

//         catch (error) {

//             console.error(
//                 "Exam Error:",
//                 error.response?.data || error
//             );


//             setExams([]);


//             setError(
//                 "Unable to load exams."
//             );

//         }

//     };


//     // ========================================================
//     // EXAM CHANGE
//     // ========================================================

//     const handleExamChange = async (e) => {

//         const examId =
//             e.target.value;


//         setSelectedExam(
//             examId
//         );


//         setSelectedStudent("");

//         setStudents([]);

//         setError("");

//         setSuccess("");


//         if (!examId) {

//             return;

//         }


//         try {

//             const selectedExamData =
//                 exams.find(

//                     (exam) =>
//                         Number(exam.id) ===
//                         Number(examId)

//                 );


//             if (!selectedExamData) {

//                 setError(
//                     "Selected exam not found."
//                 );

//                 return;

//             }


//             // ------------------------------------------------
//             // GET STUDENTS
//             //
//             // Students must match:
//             // Course
//             // Department
//             // Current Year
//             // ------------------------------------------------

//             const response = await api.get(

//                 "students/",

//                 {
//                     params: {

//                         course:
//                             selectedExamData.course,

//                         department:
//                             selectedExamData.department,

//                         year:
//                             selectedExamData.year,

//                         page_size:
//                             100

//                     }
//                 }

//             );


//             const data =
//                 response.data.results ||
//                 response.data ||
//                 [];


//             setStudents(
//                 data
//             );

//         }

//         catch (error) {

//             console.error(
//                 "Student Error:",
//                 error.response?.data || error
//             );


//             setStudents([]);


//             setError(
//                 "Unable to load students."
//             );

//         }

//     };


//     // ========================================================
//     // CREATE ASSIGNMENT
//     // ========================================================

//     const handleSubmit = async (e) => {

//         e.preventDefault();


//         setError("");

//         setSuccess("");


//         // ====================================================
//         // VALIDATION
//         // ====================================================

//         if (!title.trim()) {

//             setError(
//                 "Assignment title is required."
//             );

//             return;

//         }


//         if (!selectedSubject) {

//             setError(
//                 "Please select a subject."
//             );

//             return;

//         }


//         if (!selectedExam) {

//             setError(
//                 "Please select an exam."
//             );

//             return;

//         }


//         if (!selectedStudent) {

//             setError(
//                 "Please select a student."
//             );

//             return;

//         }


//         if (!dueDate) {

//             setError(
//                 "Please select due date."
//             );

//             return;

//         }


//         if (dueDate < today) {

//             setError(
//                 "Due date cannot be in the past."
//             );

//             return;

//         }


//         // ====================================================
//         // CREATE
//         // ====================================================

//         setLoading(true);


//         try {

//             const data = {

//                 title:
//                     title.trim(),

//                 description:
//                     description.trim(),

//                 subject:
//                     Number(selectedSubject),

//                 exam:
//                     Number(selectedExam),

//                 student:
//                     Number(selectedStudent),

//                 due_date:
//                     dueDate

//             };


//             console.log(
//                 "Creating Assignment:",
//                 data
//             );


//             await api.post(
//                 "assignments/",
//                 data
//             );


//             setSuccess(
//                 "Assignment created successfully."
//             );


//             // =================================================
//             // RESET FORM
//             // =================================================

//             setTitle("");

//             setDescription("");

//             setSelectedStudent("");

//             setDueDate("");


//             // =================================================
//             // REFRESH
//             // =================================================

//             await loadAssignments();

//         }

//         catch (error) {

//             console.error(
//                 "Create Assignment Error:",
//                 error.response?.data || error
//             );


//             const responseData =
//                 error.response?.data;


//             if (
//                 responseData &&
//                 typeof responseData === "object"
//             ) {

//                 const messages =

//                     Object.entries(
//                         responseData
//                     )

//                     .map(
//                         ([field, message]) => {

//                             const text =

//                                 Array.isArray(
//                                     message
//                                 )

//                                     ? message.join(", ")

//                                     : message;


//                             return (
//                                 `${field}: ${text}`
//                             );

//                         }
//                     )

//                     .join(" | ");


//                 setError(

//                     messages ||

//                     "Unable to create assignment."

//                 );

//             }

//             else {

//                 setError(
//                     "Unable to create assignment."
//                 );

//             }

//         }

//         finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // SEARCH
//     // ========================================================

//     const filteredAssignments =

//         assignments.filter(
//             (assignment) => {

//                 const value =
//                     search
//                         .trim()
//                         .toLowerCase();


//                 if (!value) {

//                     return true;

//                 }


//                 return (

//                     assignment.title
//                         ?.toLowerCase()
//                         .includes(value)

//                     ||

//                     assignment.subject_name
//                         ?.toLowerCase()
//                         .includes(value)

//                     ||

//                     assignment.subject_code
//                         ?.toLowerCase()
//                         .includes(value)

//                     ||

//                     assignment.exam_name
//                         ?.toLowerCase()
//                         .includes(value)

//                     ||

//                     assignment.student_name
//                         ?.toLowerCase()
//                         .includes(value)

//                     ||

//                     assignment.student_email
//                         ?.toLowerCase()
//                         .includes(value)

//                     ||

//                     assignment.course_name
//                         ?.toLowerCase()
//                         .includes(value)

//                     ||

//                     assignment.department_name
//                         ?.toLowerCase()
//                         .includes(value)

//                 );

//             }
//         );


//     // ========================================================
//     // SELECTED SUBJECT DETAILS
//     // ========================================================

//     const selectedSubjectData =
//         subjects.find(

//             (item) =>
//                 String(item.id) ===
//                 String(selectedSubject)

//         );


//     // ========================================================
//     // SELECTED EXAM DETAILS
//     // ========================================================

//     const selectedExamData =
//         exams.find(

//             (item) =>
//                 String(item.id) ===
//                 String(selectedExam)

//         );


//     return (

//         <div>

//             {/* =================================================
//                 PAGE TITLE
//             ================================================= */}

//             <h1>
//                 Staff Assignments
//             </h1>


//             {/* =================================================
//                 CREATE ASSIGNMENT
//             ================================================= */}

//             <h2>
//                 Create Assignment
//             </h2>


//             {/* =================================================
//                 ERROR
//             ================================================= */}

//             {error && (

//                 <p
//                     style={{
//                         color: "red"
//                     }}
//                 >
//                     {error}
//                 </p>

//             )}


//             {/* =================================================
//                 SUCCESS
//             ================================================= */}

//             {success && (

//                 <p
//                     style={{
//                         color: "green"
//                     }}
//                 >
//                     {success}
//                 </p>

//             )}


//             {/* =================================================
//                 FORM
//             ================================================= */}

//             <form
//                 onSubmit={
//                     handleSubmit
//                 }
//             >

//                 {/* ------------------------------------------------
//                     TITLE
//                 ------------------------------------------------ */}

//                 <div>

//                     <label>
//                         Assignment Title
//                     </label>

//                     <br />

//                     <input
//                         type="text"
//                         value={
//                             title
//                         }
//                         onChange={(e) =>
//                             setTitle(
//                                 e.target.value
//                             )
//                         }
//                         placeholder="Enter assignment title"
//                         required
//                     />

//                 </div>


//                 <br />


//                 {/* ------------------------------------------------
//                     DESCRIPTION
//                 ------------------------------------------------ */}

//                 <div>

//                     <label>
//                         Description
//                     </label>

//                     <br />

//                     <textarea
//                         value={
//                             description
//                         }
//                         onChange={(e) =>
//                             setDescription(
//                                 e.target.value
//                             )
//                         }
//                         placeholder="Enter assignment description"
//                         rows="4"
//                     />

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
//                         value={
//                             selectedSubject
//                         }
//                         onChange={
//                             handleSubjectChange
//                         }
//                         required
//                     >

//                         <option value="">
//                             Select Subject
//                         </option>


//                         {subjects.map(
//                             (subject) => (

//                                 <option
//                                     key={
//                                         subject.id
//                                     }
//                                     value={
//                                         subject.id
//                                     }
//                                 >

//                                     {
//                                         subject.name
//                                     }

//                                     {" ("}

//                                     {
//                                         subject.code
//                                     }

//                                     {")"}

//                                     {" - "}

//                                     {
//                                         subject.course_name
//                                     }

//                                 </option>

//                             )
//                         )}

//                     </select>

//                 </div>


//                 <br />


//                 {/* ------------------------------------------------
//                     SELECTED SUBJECT DETAILS
//                 ------------------------------------------------ */}

//                 {selectedSubjectData && (

//                     <div>

//                         <p>

//                             <strong>
//                                 Course / Class:
//                             </strong>{" "}

//                             {
//                                 selectedSubjectData.course_name
//                                 || "-"
//                             }

//                         </p>


//                         <p>

//                             <strong>
//                                 Department:
//                             </strong>{" "}

//                             {
//                                 selectedSubjectData.department_name
//                                 || "-"
//                             }

//                         </p>

//                     </div>

//                 )}


//                 {/* ------------------------------------------------
//                     EXAM
//                 ------------------------------------------------ */}

//                 <div>

//                     <label>
//                         Exam
//                     </label>

//                     <br />

//                     <select
//                         value={
//                             selectedExam
//                         }
//                         onChange={
//                             handleExamChange
//                         }
//                         disabled={
//                             !selectedSubject
//                         }
//                         required
//                     >

//                         <option value="">
//                             Select Exam
//                         </option>


//                         {exams.map(
//                             (exam) => (

//                                 <option
//                                     key={
//                                         exam.id
//                                     }
//                                     value={
//                                         exam.id
//                                     }
//                                 >

//                                     {
//                                         exam.name
//                                     }

//                                     {" - "}

//                                     {
//                                         exam.exam_date
//                                     }

//                                     {" - Year "}

//                                     {
//                                         exam.year
//                                     }

//                                 </option>

//                             )
//                         )}

//                     </select>

//                 </div>


//                 <br />


//                 {/* ------------------------------------------------
//                     SELECTED EXAM DETAILS
//                 ------------------------------------------------ */}

//                 {selectedExamData && (

//                     <div>

//                         <p>

//                             <strong>
//                                 Exam Course:
//                             </strong>{" "}

//                             {
//                                 selectedExamData.course_name
//                                 || "-"
//                             }

//                         </p>


//                         <p>

//                             <strong>
//                                 Exam Department:
//                             </strong>{" "}

//                             {
//                                 selectedExamData.department_name
//                                 || "-"
//                             }

//                         </p>


//                         <p>

//                             <strong>
//                                 Exam Year:
//                             </strong>{" "}

//                             {
//                                 selectedExamData.year
//                                 ?? "-"
//                             }

//                         </p>

//                     </div>

//                 )}


//                 <br />


//                 {/* ------------------------------------------------
//                     STUDENT
//                 ------------------------------------------------ */}

//                 <div>

//                     <label>
//                         Student
//                     </label>

//                     <br />


//                     <select
//                         value={
//                             selectedStudent
//                         }
//                         onChange={(e) =>
//                             setSelectedStudent(
//                                 e.target.value
//                             )
//                         }
//                         disabled={
//                             !selectedExam
//                         }
//                         required
//                     >

//                         <option value="">
//                             Select Student
//                         </option>


//                         {students.map(
//                             (student) => (

//                                 <option
//                                     key={
//                                         student.id
//                                     }
//                                     value={
//                                         student.id
//                                     }
//                                 >

//                                     {
//                                         student.name
//                                     }

//                                     {" - "}

//                                     {
//                                         student.email
//                                     }

//                                     {" - Year "}

//                                     {
//                                         student.current_year
//                                     }

//                                 </option>

//                             )
//                         )}

//                     </select>

//                 </div>


//                 <br />


//                 {/* ------------------------------------------------
//                     SELECTED STUDENT DETAILS
//                 ------------------------------------------------ */}

//                 {selectedStudent && (

//                     <div>

//                         {(() => {

//                             const selectedStudentData =
//                                 students.find(

//                                     (item) =>
//                                         String(item.id) ===
//                                         String(selectedStudent)

//                                 );


//                             if (!selectedStudentData) {

//                                 return null;

//                             }


//                             return (

//                                 <div>

//                                     <p>

//                                         <strong>
//                                             Course / Class:
//                                         </strong>{" "}

//                                         {
//                                             selectedStudentData.course_name
//                                             || "-"
//                                         }

//                                     </p>


//                                     <p>

//                                         <strong>
//                                             Department:
//                                         </strong>{" "}

//                                         {
//                                             selectedStudentData.department_name
//                                             || "-"
//                                         }

//                                     </p>


//                                     <p>

//                                         <strong>
//                                             Current Year:
//                                         </strong>{" "}

//                                         {
//                                             selectedStudentData.current_year
//                                             ?? "-"
//                                         }

//                                     </p>

//                                 </div>

//                             );

//                         })()}

//                     </div>

//                 )}


//                 <br />


//                 {/* ------------------------------------------------
//                     DUE DATE
//                 ------------------------------------------------ */}

//                 <div>

//                     <label>
//                         Due Date
//                     </label>

//                     <br />

//                     <input
//                         type="date"
//                         value={
//                             dueDate
//                         }
//                         min={
//                             today
//                         }
//                         onChange={(e) =>
//                             setDueDate(
//                                 e.target.value
//                             )
//                         }
//                         required
//                     />

//                 </div>


//                 <br />


//                 {/* ------------------------------------------------
//                     CREATE BUTTON
//                 ------------------------------------------------ */}

//                 <button
//                     type="submit"
//                     disabled={
//                         loading
//                     }
//                 >

//                     {
//                         loading
//                             ? "Creating..."
//                             : "Create Assignment"
//                     }

//                 </button>

//             </form>


//             <hr />


//             {/* =================================================
//                 ASSIGNMENT LIST
//             ================================================= */}

//             <h2>
//                 My Assignments
//             </h2>


//             {/* =================================================
//                 SEARCH
//             ================================================= */}

//             <input
//                 type="text"
//                 placeholder="Search title, subject, exam or student..."
//                 value={
//                     search
//                 }
//                 onChange={(e) =>
//                     setSearch(
//                         e.target.value
//                     )
//                 }
//             />


//             <br />
//             <br />


//             {/* =================================================
//                 TOTAL
//             ================================================= */}

//             <p>

//                 Total Assignments:{" "}

//                 {
//                     filteredAssignments.length
//                 }

//             </p>


//             {/* =================================================
//                 TABLE
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
//                                 Title
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
//                                 Exam
//                             </th>

//                             <th>
//                                 Student
//                             </th>

//                             <th>
//                                 Student Email
//                             </th>

//                             <th>
//                                 Due Date
//                             </th>

//                             <th>
//                                 Assigned By
//                             </th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {
//                             filteredAssignments.map(
//                                 (assignment) => (

//                                     <tr
//                                         key={
//                                             assignment.id
//                                         }
//                                     >

//                                         {/* TITLE */}

//                                         <td>
//                                             {
//                                                 assignment.title
//                                                 || "-"
//                                             }
//                                         </td>


//                                         {/* SUBJECT */}

//                                         <td>
//                                             {
//                                                 assignment.subject_name
//                                                 || "-"
//                                             }
//                                         </td>


//                                         {/* SUBJECT CODE */}

//                                         <td>
//                                             {
//                                                 assignment.subject_code
//                                                 || "-"
//                                             }
//                                         </td>


//                                         {/* COURSE */}

//                                         <td>
//                                             {
//                                                 assignment.course_name
//                                                 || "-"
//                                             }
//                                         </td>


//                                         {/* DEPARTMENT */}

//                                         <td>
//                                             {
//                                                 assignment.department_name
//                                                 || "-"
//                                             }
//                                         </td>


//                                         {/* YEAR */}

//                                         <td>
//                                             {
//                                                 assignment.subject_year
//                                                 ?? assignment.student_year
//                                                 ?? "-"
//                                             }
//                                         </td>


//                                         {/* EXAM */}

//                                         <td>
//                                             {
//                                                 assignment.exam_name
//                                                 || "-"
//                                             }
//                                         </td>


//                                         {/* STUDENT */}

//                                         <td>
//                                             {
//                                                 assignment.student_name
//                                                 || "-"
//                                             }
//                                         </td>


//                                         {/* EMAIL */}

//                                         <td>
//                                             {
//                                                 assignment.student_email
//                                                 || "-"
//                                             }
//                                         </td>


//                                         {/* DUE DATE */}

//                                         <td>
//                                             {
//                                                 assignment.due_date
//                                                 || "-"
//                                             }
//                                         </td>


//                                         {/* ASSIGNED BY */}

//                                         <td>
//                                             {
//                                                 assignment.assigned_by_name
//                                                 || "-"
//                                             }
//                                         </td>

//                                     </tr>

//                                 )
//                             )
//                         }

//                     </tbody>

//                 </table>

//             )}

//         </div>

//     );

// }


// export default StaffAssignments;
import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";

function StaffAssignments() {
    // ========================================================
    // DATA
    // ========================================================

    const [assignments, setAssignments] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [exams, setExams] = useState([]);
    const [students, setStudents] = useState([]);

    // ========================================================
    // FORM
    // ========================================================

    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedExam, setSelectedExam] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    // ========================================================
    // FILTER
    // ========================================================

    const [search, setSearch] = useState("");

    // ========================================================
    // UI STATE
    // ========================================================

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ========================================================
    // CONSTANT
    // ========================================================

    const today = new Date()
        .toISOString()
        .split("T")[0];

    // ========================================================
    // LOAD ASSIGNMENTS
    // ========================================================

    const loadAssignments = async () => {
        try {
            setError("");

            const response = await api.get(
                "assignments/",
                {
                    params: {
                        page_size: 100
                    }
                }
            );

            setAssignments(
                response.data.results ||
                response.data ||
                []
            );
        } catch (error) {
            console.error(
                "Assignment Error:",
                error.response?.data || error
            );

            setAssignments([]);

            setError(
                "Unable to load assignments."
            );
        }
    };

    // ========================================================
    // LOAD STAFF SUBJECTS
    // ========================================================

    const loadSubjects = async () => {
        try {
            const response = await api.get(
                "staff/subjects/"
            );

            const data =
                response.data.results ||
                response.data ||
                [];

            const subjectList = data.map(
                (item) => ({
                    id: item.subject,
                    name: item.subject_name,
                    code: item.subject_code,
                    course_name: item.course_name,
                    department_name:
                        item.department_name
                })
            );

            setSubjects(subjectList);
        } catch (error) {
            console.error(
                "Subject Error:",
                error.response?.data || error
            );

            setSubjects([]);

            setError(
                "Unable to load subjects."
            );
        }
    };

    // ========================================================
    // INITIAL LOAD
    // ========================================================

    useEffect(() => {
        loadAssignments();
        loadSubjects();
    }, []);

    // ========================================================
    // LOAD EXAMS BY SUBJECT
    // ========================================================

    const loadExamsBySubject = async (subjectId) => {
        try {
            const response = await api.get(
                "exams/",
                {
                    params: {
                        subject: subjectId,
                        page_size: 100
                    }
                }
            );

            const data =
                response.data.results ||
                response.data ||
                [];

            setExams(data);
        } catch (error) {
            console.error(
                "Exam Error:",
                error.response?.data || error
            );

            setExams([]);

            setError(
                "Unable to load exams."
            );
        }
    };

    // ========================================================
    // LOAD STUDENTS BY EXAM
    // ========================================================

    const loadStudentsByExam = async (examId) => {
        try {
            const selectedExamData =
                exams.find(
                    (exam) =>
                        Number(exam.id) ===
                        Number(examId)
                );

            if (!selectedExamData) {
                setError(
                    "Selected exam not found."
                );

                return;
            }

            const response = await api.get(
                "students/",
                {
                    params: {
                        course:
                            selectedExamData.course,

                        department:
                            selectedExamData.department,

                        year:
                            selectedExamData.year,

                        page_size: 100
                    }
                }
            );

            const data =
                response.data.results ||
                response.data ||
                [];

            setStudents(data);
        } catch (error) {
            console.error(
                "Student Error:",
                error.response?.data || error
            );

            setStudents([]);

            setError(
                "Unable to load students."
            );
        }
    };

    // ========================================================
    // SUBJECT CHANGE
    // ========================================================

    const handleSubjectChange = async (e) => {
        const subjectId =
            e.target.value;

        setSelectedSubject(subjectId);

        setSelectedExam("");
        setSelectedStudent("");

        setExams([]);
        setStudents([]);

        setError("");
        setSuccess("");

        if (!subjectId) {
            return;
        }

        await loadExamsBySubject(
            subjectId
        );
    };

    // ========================================================
    // EXAM CHANGE
    // ========================================================

    const handleExamChange = async (e) => {
        const examId =
            e.target.value;

        setSelectedExam(examId);

        setSelectedStudent("");
        setStudents([]);

        setError("");
        setSuccess("");

        if (!examId) {
            return;
        }

        await loadStudentsByExam(
            examId
        );
    };

    // ========================================================
    // RESET FORM
    // ========================================================

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setSelectedSubject("");
        setSelectedExam("");
        setSelectedStudent("");
        setDueDate("");

        setExams([]);
        setStudents([]);
    };

    // ========================================================
    // CREATE ASSIGNMENT
    // ========================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        // ----------------------------------------------------
        // VALIDATION
        // ----------------------------------------------------

        if (!title.trim()) {
            setError(
                "Assignment title is required."
            );

            return;
        }

        if (!selectedSubject) {
            setError(
                "Please select a subject."
            );

            return;
        }

        if (!selectedExam) {
            setError(
                "Please select an exam."
            );

            return;
        }

        if (!selectedStudent) {
            setError(
                "Please select a student."
            );

            return;
        }

        if (!dueDate) {
            setError(
                "Please select due date."
            );

            return;
        }

        if (dueDate < today) {
            setError(
                "Due date cannot be in the past."
            );

            return;
        }

        // ----------------------------------------------------
        // CREATE
        // ----------------------------------------------------

        setLoading(true);

        try {
            const data = {
                title: title.trim(),

                description:
                    description.trim(),

                subject:
                    Number(selectedSubject),

                exam:
                    Number(selectedExam),

                student:
                    Number(selectedStudent),

                due_date:
                    dueDate
            };

            console.log(
                "Creating Assignment:",
                data
            );

            await api.post(
                "assignments/",
                data
            );

            setSuccess(
                "Assignment created successfully."
            );

            resetForm();

            await loadAssignments();
        } catch (error) {
            console.error(
                "Create Assignment Error:",
                error.response?.data || error
            );

            const responseData =
                error.response?.data;

            if (
                responseData &&
                typeof responseData === "object"
            ) {
                const messages =
                    Object.entries(
                        responseData
                    )
                        .map(
                            ([field, message]) => {
                                const text =
                                    Array.isArray(
                                        message
                                    )
                                        ? message.join(
                                            ", "
                                        )
                                        : message;

                                return `${field}: ${text}`;
                            }
                        )
                        .join(" | ");

                setError(
                    messages ||
                    "Unable to create assignment."
                );
            } else {
                setError(
                    "Unable to create assignment."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    // ========================================================
    // FILTER ASSIGNMENTS
    // ========================================================

    const filteredAssignments = useMemo(() => {
        const value =
            search
                .trim()
                .toLowerCase();

        if (!value) {
            return assignments;
        }

        return assignments.filter(
            (assignment) => (
                assignment.title
                    ?.toLowerCase()
                    .includes(value)

                ||

                assignment.subject_name
                    ?.toLowerCase()
                    .includes(value)

                ||

                assignment.subject_code
                    ?.toLowerCase()
                    .includes(value)

                ||

                assignment.exam_name
                    ?.toLowerCase()
                    .includes(value)

                ||

                assignment.student_name
                    ?.toLowerCase()
                    .includes(value)

                ||

                assignment.student_email
                    ?.toLowerCase()
                    .includes(value)

                ||

                assignment.course_name
                    ?.toLowerCase()
                    .includes(value)

                ||

                assignment.department_name
                    ?.toLowerCase()
                    .includes(value)
            )
        );
    }, [assignments, search]);

    // ========================================================
    // SELECTED SUBJECT
    // ========================================================

    const selectedSubjectData = useMemo(() => {
        return subjects.find(
            (subject) =>
                String(subject.id) ===
                String(selectedSubject)
        );
    }, [
        subjects,
        selectedSubject
    ]);

    // ========================================================
    // SELECTED EXAM
    // ========================================================

    const selectedExamData = useMemo(() => {
        return exams.find(
            (exam) =>
                String(exam.id) ===
                String(selectedExam)
        );
    }, [
        exams,
        selectedExam
    ]);

    // ========================================================
    // SELECTED STUDENT
    // ========================================================

    const selectedStudentData = useMemo(() => {
        return students.find(
            (student) =>
                String(student.id) ===
                String(selectedStudent)
        );
    }, [
        students,
        selectedStudent
    ]);

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
                        Staff Assignments
                    </h1>

                    <p>
                        Create and manage assignments
                    </p>
                </div>
            </div>

            {/* =================================================
                ALERTS
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
                CREATE ASSIGNMENT
            ================================================= */}

            <section className="page-section">

                <div className="section-header">
                    <div>
                        <h2>
                            Create Assignment
                        </h2>

                        <p>
                            Assign an assignment to a student
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="assignment-form"
                >

                    {/* ------------------------------------------------
                        TITLE
                    ------------------------------------------------ */}

                    <div className="form-group">

                        <label>
                            Assignment Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(
                                    e.target.value
                                )
                            }
                            placeholder="Enter assignment title"
                            required
                        />

                    </div>

                    {/* ------------------------------------------------
                        DESCRIPTION
                    ------------------------------------------------ */}

                    <div className="form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            placeholder="Enter assignment description"
                            rows="4"
                        />

                    </div>

                    {/* ------------------------------------------------
                        SUBJECT
                    ------------------------------------------------ */}

                    <div className="form-group">

                        <label>
                            Subject
                        </label>

                        <select
                            value={selectedSubject}
                            onChange={
                                handleSubjectChange
                            }
                            required
                        >

                            <option value="">
                                Select Subject
                            </option>

                            {subjects.map(
                                (subject) => (
                                    <option
                                        key={
                                            subject.id
                                        }
                                        value={
                                            subject.id
                                        }
                                    >
                                        {subject.name}
                                        {" ("}
                                        {subject.code}
                                        {") - "}
                                        {
                                            subject.course_name
                                        }
                                    </option>
                                )
                            )}

                        </select>

                    </div>

                    {/* ------------------------------------------------
                        SUBJECT DETAILS
                    ------------------------------------------------ */}

                    {selectedSubjectData && (
                        <div className="selection-details">

                            <p>
                                <strong>
                                    Course / Class:
                                </strong>{" "}
                                {
                                    selectedSubjectData.course_name
                                    || "-"
                                }
                            </p>

                            <p>
                                <strong>
                                    Department:
                                </strong>{" "}
                                {
                                    selectedSubjectData.department_name
                                    || "-"
                                }
                            </p>

                        </div>
                    )}

                    {/* ------------------------------------------------
                        EXAM
                    ------------------------------------------------ */}

                    <div className="form-group">

                        <label>
                            Exam
                        </label>

                        <select
                            value={selectedExam}
                            onChange={
                                handleExamChange
                            }
                            disabled={
                                !selectedSubject
                            }
                            required
                        >

                            <option value="">
                                Select Exam
                            </option>

                            {exams.map(
                                (exam) => (
                                    <option
                                        key={
                                            exam.id
                                        }
                                        value={
                                            exam.id
                                        }
                                    >
                                        {exam.name}
                                        {" - "}
                                        {exam.exam_date}
                                        {" - Year "}
                                        {exam.year}
                                    </option>
                                )
                            )}

                        </select>

                    </div>

                    {/* ------------------------------------------------
                        EXAM DETAILS
                    ------------------------------------------------ */}

                    {selectedExamData && (
                        <div className="selection-details">

                            <p>
                                <strong>
                                    Exam Course:
                                </strong>{" "}
                                {
                                    selectedExamData.course_name
                                    || "-"
                                }
                            </p>

                            <p>
                                <strong>
                                    Exam Department:
                                </strong>{" "}
                                {
                                    selectedExamData.department_name
                                    || "-"
                                }
                            </p>

                            <p>
                                <strong>
                                    Exam Year:
                                </strong>{" "}
                                {
                                    selectedExamData.year
                                    ?? "-"
                                }
                            </p>

                        </div>
                    )}

                    {/* ------------------------------------------------
                        STUDENT
                    ------------------------------------------------ */}

                    <div className="form-group">

                        <label>
                            Student
                        </label>

                        <select
                            value={selectedStudent}
                            onChange={(e) =>
                                setSelectedStudent(
                                    e.target.value
                                )
                            }
                            disabled={
                                !selectedExam
                            }
                            required
                        >

                            <option value="">
                                Select Student
                            </option>

                            {students.map(
                                (student) => (
                                    <option
                                        key={
                                            student.id
                                        }
                                        value={
                                            student.id
                                        }
                                    >
                                        {student.name}
                                        {" - "}
                                        {student.email}
                                        {" - Year "}
                                        {
                                            student.current_year
                                        }
                                    </option>
                                )
                            )}

                        </select>

                    </div>

                    {/* ------------------------------------------------
                        STUDENT DETAILS
                    ------------------------------------------------ */}

                    {selectedStudentData && (
                        <div className="selection-details">

                            <p>
                                <strong>
                                    Course / Class:
                                </strong>{" "}
                                {
                                    selectedStudentData.course_name
                                    || "-"
                                }
                            </p>

                            <p>
                                <strong>
                                    Department:
                                </strong>{" "}
                                {
                                    selectedStudentData.department_name
                                    || "-"
                                }
                            </p>

                            <p>
                                <strong>
                                    Current Year:
                                </strong>{" "}
                                {
                                    selectedStudentData.current_year
                                    ?? "-"
                                }
                            </p>

                        </div>
                    )}

                    {/* ------------------------------------------------
                        DUE DATE
                    ------------------------------------------------ */}

                    <div className="form-group">

                        <label>
                            Due Date
                        </label>

                        <input
                            type="date"
                            value={dueDate}
                            min={today}
                            onChange={(e) =>
                                setDueDate(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    {/* ------------------------------------------------
                        SUBMIT
                    ------------------------------------------------ */}

                    <div className="form-actions">

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating..."
                                : "Create Assignment"}
                        </button>

                    </div>

                </form>

            </section>

            {/* =================================================
                ASSIGNMENT LIST
            ================================================= */}

            <section className="page-section">

                <div className="section-header">

                    <div>
                        <h2>
                            My Assignments
                        </h2>

                        <p>
                            View assignments created by staff
                        </p>
                    </div>

                    <div className="section-count">
                        Total:{" "}
                        {filteredAssignments.length}
                    </div>

                </div>

                {/* ------------------------------------------------
                    SEARCH
                ------------------------------------------------ */}

                <div className="search-box">

                    <input
                        type="text"
                        placeholder="Search title, subject, exam or student..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </div>

                {/* ------------------------------------------------
                    EMPTY STATE
                ------------------------------------------------ */}

                {filteredAssignments.length === 0 ? (

                    <div className="empty-state">
                        No assignments found.
                    </div>

                ) : (

                    <div className="table-wrapper">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        Title
                                    </th>

                                    <th>
                                        Subject
                                    </th>

                                    <th>
                                        Subject Code
                                    </th>

                                    <th>
                                        Course / Class
                                    </th>

                                    <th>
                                        Department
                                    </th>

                                    <th>
                                        Year
                                    </th>

                                    <th>
                                        Exam
                                    </th>

                                    <th>
                                        Student
                                    </th>

                                    <th>
                                        Student Email
                                    </th>

                                    <th>
                                        Due Date
                                    </th>

                                    <th>
                                        Assigned By
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredAssignments.map(
                                    (assignment) => (

                                        <tr
                                            key={
                                                assignment.id
                                            }
                                        >

                                            <td>
                                                {
                                                    assignment.title
                                                    || "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    assignment.subject_name
                                                    || "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    assignment.subject_code
                                                    || "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    assignment.course_name
                                                    || "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    assignment.department_name
                                                    || "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    assignment.subject_year
                                                    ??
                                                    assignment.student_year
                                                    ??
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    assignment.exam_name
                                                    || "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    assignment.student_name
                                                    || "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    assignment.student_email
                                                    || "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    assignment.due_date
                                                    || "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    assignment.assigned_by_name
                                                    || "-"
                                                }
                                            </td>

                                        </tr>

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

export default StaffAssignments;