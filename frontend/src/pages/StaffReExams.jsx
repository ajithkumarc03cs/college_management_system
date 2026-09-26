// import { useEffect, useState } from "react";

// import api from "../api/axios";


// function StaffReExams() {

//     // ========================================================
//     // DATA
//     // ========================================================

//     const [exams, setExams] = useState([]);

//     const [absentStudents, setAbsentStudents] = useState([]);

//     const [reexams, setReexams] = useState([]);


//     // ========================================================
//     // FORM
//     // ========================================================

//     const [selectedExam, setSelectedExam] = useState("");

//     const [student, setStudent] = useState("");

//     const [reexamDate, setReexamDate] = useState("");

//     const [startTime, setStartTime] = useState("");

//     const [endTime, setEndTime] = useState("");

//     const [reason, setReason] = useState("");


//     // ========================================================
//     // UI
//     // ========================================================

//     const [loading, setLoading] = useState(false);

//     const [saving, setSaving] = useState(false);

//     const [error, setError] = useState("");

//     const [success, setSuccess] = useState("");


//     // ========================================================
//     // TODAY
//     // ========================================================

//     const today = new Date()
//         .toISOString()
//         .split("T")[0];


//     // ========================================================
//     // LOAD EXAMS
//     // ========================================================

//     const getExams = async () => {

//         try {

//             setError("");


//             const response = await api.get(
//                 "exams/",
//                 {
//                     params: {
//                         page_size: 100
//                     }
//                 }
//             );


//             setExams(
//                 response.data.results ||
//                 response.data ||
//                 []
//             );

//         }

//         catch (error) {

//             console.error(
//                 "Exam loading error:",
//                 error.response?.data || error
//             );


//             setExams([]);


//             setError(
//                 "Unable to load exams."
//             );

//         }

//     };


//     // ========================================================
//     // LOAD EXISTING RE-EXAMS
//     // ========================================================

//     const getReExams = async () => {

//         try {

//             const response = await api.get(

//                 "reexams/",

//                 {
//                     params: {
//                         page_size: 100
//                     }
//                 }

//             );


//             setReexams(

//                 response.data.results ||
//                 response.data ||
//                 []

//             );

//         }

//         catch (error) {

//             console.error(
//                 "Re-exam loading error:",
//                 error.response?.data || error
//             );


//             setReexams([]);

//         }

//     };


//     // ========================================================
//     // LOAD ABSENT STUDENTS
//     // ========================================================

//     const getAbsentStudents = async (
//         examId
//     ) => {

//         if (!examId) {

//             setAbsentStudents([]);

//             return;

//         }


//         setLoading(true);

//         setError("");

//         setStudent("");


//         try {

//             const response = await api.get(

//                 "exam-participation/",

//                 {
//                     params: {

//                         exam:
//                             examId,

//                         status:
//                             "ABSENT",

//                         page_size:
//                             100

//                     }
//                 }

//             );


//             setAbsentStudents(

//                 response.data.results ||
//                 response.data ||
//                 []

//             );

//         }

//         catch (error) {

//             console.error(
//                 "Absent students error:",
//                 error.response?.data || error
//             );


//             setAbsentStudents([]);


//             setError(
//                 "Unable to load absent students."
//             );

//         }

//         finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // INITIAL LOAD
//     // ========================================================

//     useEffect(() => {

//         getExams();

//         getReExams();

//     }, []);


//     // ========================================================
//     // EXAM CHANGE
//     // ========================================================

//     const handleExamChange = (e) => {

//         const examId =
//             e.target.value;


//         setSelectedExam(
//             examId
//         );


//         setStudent("");

//         setReexamDate("");

//         setStartTime("");

//         setEndTime("");

//         setReason("");

//         setSuccess("");

//         setError("");


//         getAbsentStudents(
//             examId
//         );

//     };


//     // ========================================================
//     // CREATE RE-EXAM
//     // ========================================================

//     const handleSubmit = async (e) => {

//         e.preventDefault();


//         setError("");

//         setSuccess("");


//         // ====================================================
//         // BASIC VALIDATION
//         // ====================================================

//         if (!selectedExam) {

//             setError(
//                 "Please select an exam."
//             );

//             return;

//         }


//         if (!student) {

//             setError(
//                 "Please select an absent student."
//             );

//             return;

//         }


//         if (!reexamDate) {

//             setError(
//                 "Please select re-exam date."
//             );

//             return;

//         }


//         if (reexamDate < today) {

//             setError(
//                 "Re-exam date cannot be in the past."
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
//         // FIND PARTICIPATION
//         // ====================================================

//         const selectedParticipation =
//             absentStudents.find(

//                 (item) =>
//                     String(item.id) ===
//                     String(student)

//             );


//         if (!selectedParticipation) {

//             setError(
//                 "Selected student participation not found."
//             );

//             return;

//         }


//         // ====================================================
//         // CREATE
//         // ====================================================

//         setSaving(true);


//         try {

//             await api.post(

//                 "reexams/",

//                 {

//                     exam:
//                         Number(selectedExam),

//                     participation:
//                         selectedParticipation.id,

//                     student:
//                         selectedParticipation.student,

//                     reexam_date:
//                         reexamDate,

//                     start_time:
//                         startTime,

//                     end_time:
//                         endTime,

//                     reason:
//                         reason.trim()

//                 }

//             );


//             setSuccess(
//                 "Re-exam created successfully."
//             );


//             // =================================================
//             // RESET FORM
//             // =================================================

//             setStudent("");

//             setReexamDate("");

//             setStartTime("");

//             setEndTime("");

//             setReason("");


//             // =================================================
//             // REFRESH
//             // =================================================

//             await getReExams();

//             await getAbsentStudents(
//                 selectedExam
//             );

//         }

//         catch (error) {

//             console.error(
//                 "Re-exam create error:",
//                 error.response?.data || error
//             );


//             const data =
//                 error.response?.data;


//             if (
//                 data &&
//                 typeof data === "object"
//             ) {

//                 const messages =
//                     Object.entries(data)

//                         .map(
//                             ([field, message]) => {

//                                 const text =
//                                     Array.isArray(message)
//                                         ? message.join(", ")
//                                         : message;

//                                 return `${field}: ${text}`;

//                             }
//                         )

//                         .join(" | ");


//                 setError(

//                     messages ||
//                     "Unable to create re-exam."

//                 );

//             }

//             else {

//                 setError(
//                     "Unable to create re-exam."
//                 );

//             }

//         }

//         finally {

//             setSaving(false);

//         }

//     };


//     // ========================================================
//     // RENDER
//     // ========================================================

//     return (

//         <div>

//             {/* =================================================
//                 TITLE
//             ================================================= */}

//             <h1>
//                 Re-Exam Management
//             </h1>


//             {/* =================================================
//                 MESSAGES
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
//                 CREATE RE-EXAM
//             ================================================= */}

//             <h2>
//                 Create Re-Exam
//             </h2>


//             <form
//                 onSubmit={
//                     handleSubmit
//                 }
//             >

//                 {/* ------------------------------------------------
//                     EXAM
//                 ------------------------------------------------ */}

//                 <div>

//                     <label>
//                         Select Exam
//                     </label>

//                     <br />

//                     <select
//                         value={
//                             selectedExam
//                         }
//                         onChange={
//                             handleExamChange
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

//                                     {exam.name}

//                                     {" - "}

//                                     {
//                                         exam.subject_name
//                                         || "-"
//                                     }

//                                     {" - "}

//                                     {
//                                         exam.course_name
//                                         || "-"
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
//                     ABSENT STUDENT
//                 ------------------------------------------------ */}

//                 <div>

//                     <label>
//                         Select Absent Student
//                     </label>

//                     <br />


//                     {loading ? (

//                         <p>
//                             Loading absent students...
//                         </p>

//                     ) : (

//                         <select
//                             value={
//                                 student
//                             }
//                             onChange={(e) =>
//                                 setStudent(
//                                     e.target.value
//                                 )
//                             }
//                             disabled={
//                                 !selectedExam
//                             }
//                             required
//                         >

//                             <option value="">
//                                 Select Student
//                             </option>


//                             {absentStudents.map(
//                                 (item) => (

//                                     <option
//                                         key={
//                                             item.id
//                                         }
//                                         value={
//                                             item.id
//                                         }
//                                     >

//                                         {
//                                             item.student_name
//                                             || "-"
//                                         }

//                                         {" - "}

//                                         {
//                                             item.student_course_name
//                                             || "-"
//                                         }

//                                         {" - "}

//                                         {
//                                             item.student_department_name
//                                             || "-"
//                                         }

//                                         {" - Year "}

//                                         {
//                                             item.student_year
//                                             ?? "-"
//                                         }

//                                     </option>

//                                 )
//                             )}

//                         </select>

//                     )}

//                 </div>


//                 <br />


//                 {/* ------------------------------------------------
//                     RE-EXAM DATE
//                 ------------------------------------------------ */}

//                 <div>

//                     <label>
//                         Re-Exam Date
//                     </label>

//                     <br />

//                     <input
//                         type="date"
//                         value={
//                             reexamDate
//                         }
//                         min={
//                             today
//                         }
//                         onChange={(e) =>
//                             setReexamDate(
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
//                         value={
//                             startTime
//                         }
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
//                         value={
//                             endTime
//                         }
//                         onChange={(e) =>
//                             setEndTime(
//                                 e.target.value
//                             )
//                         }
//                         required
//                     />

//                 </div>


//                 <br />


//                 {/* ------------------------------------------------
//                     REASON
//                 ------------------------------------------------ */}

//                 <div>

//                     <label>
//                         Reason
//                     </label>

//                     <br />

//                     <textarea
//                         value={
//                             reason
//                         }
//                         onChange={(e) =>
//                             setReason(
//                                 e.target.value
//                             )
//                         }
//                         placeholder="Enter reason"
//                         rows="3"
//                     />

//                 </div>


//                 <br />


//                 {/* ------------------------------------------------
//                     CREATE BUTTON
//                 ------------------------------------------------ */}

//                 <button
//                     type="submit"
//                     disabled={
//                         saving
//                     }
//                 >

//                     {
//                         saving
//                             ? "Creating..."
//                             : "Create Re-Exam"
//                     }

//                 </button>

//             </form>


//             <hr />


//             {/* =================================================
//                 EXISTING RE-EXAMS
//             ================================================= */}

//             <h2>
//                 Existing Re-Exams
//             </h2>


//             {reexams.length === 0 ? (

//                 <p>
//                     No re-exams found.
//                 </p>

//             ) : (

//                 <table
//                     border="1"
//                     cellPadding="10"
//                     cellSpacing="0"
//                 >

//                     <thead>

//                         <tr>

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

//                                     <td>
//                                         {
//                                             item.student_name
//                                             || "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.course_name
//                                             || "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.department_name
//                                             || "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.student_year
//                                             ?? "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.exam_name
//                                             || "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.subject_name
//                                             || "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.subject_code
//                                             || "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.reexam_date
//                                             || "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.start_time
//                                             || "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.end_time
//                                             || "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.reason
//                                             || "-"
//                                         }
//                                     </td>

//                                 </tr>

//                             )
//                         )}

//                     </tbody>

//                 </table>

//             )}

//         </div>

//     );

// }


// export default StaffReExams;
import { useEffect, useState } from "react";
import api from "../api/axios";

function StaffReExams() {
    // ========================================================
    // DATA
    // ========================================================

    const [exams, setExams] = useState([]);
    const [absentStudents, setAbsentStudents] = useState([]);
    const [reexams, setReexams] = useState([]);

    // ========================================================
    // FORM
    // ========================================================

    const [selectedExam, setSelectedExam] = useState("");
    const [student, setStudent] = useState("");
    const [reexamDate, setReexamDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [reason, setReason] = useState("");

    // ========================================================
    // UI STATE
    // ========================================================

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ========================================================
    // TODAY
    // ========================================================

    const today = new Date()
        .toISOString()
        .split("T")[0];

    // ========================================================
    // LOAD EXAMS
    // ========================================================

    const getExams = async () => {
        try {
            setError("");

            const response = await api.get(
                "exams/",
                {
                    params: {
                        page_size: 100
                    }
                }
            );

            setExams(
                response.data.results ||
                response.data ||
                []
            );
        } catch (error) {
            console.error(
                "Exam loading error:",
                error.response?.data || error
            );

            setExams([]);

            setError(
                "Unable to load exams."
            );
        }
    };

    // ========================================================
    // LOAD EXISTING RE-EXAMS
    // ========================================================

    const getReExams = async () => {
        try {
            const response = await api.get(
                "reexams/",
                {
                    params: {
                        page_size: 100
                    }
                }
            );

            setReexams(
                response.data.results ||
                response.data ||
                []
            );
        } catch (error) {
            console.error(
                "Re-exam loading error:",
                error.response?.data || error
            );

            setReexams([]);
        }
    };

    // ========================================================
    // LOAD ABSENT STUDENTS
    // ========================================================

    const getAbsentStudents = async (
        examId
    ) => {
        if (!examId) {
            setAbsentStudents([]);
            return;
        }

        setLoading(true);
        setError("");
        setStudent("");

        try {
            const response = await api.get(
                "exam-participation/",
                {
                    params: {
                        exam: examId,
                        status: "ABSENT",
                        page_size: 100
                    }
                }
            );

            setAbsentStudents(
                response.data.results ||
                response.data ||
                []
            );
        } catch (error) {
            console.error(
                "Absent students error:",
                error.response?.data || error
            );

            setAbsentStudents([]);

            setError(
                "Unable to load absent students."
            );
        } finally {
            setLoading(false);
        }
    };

    // ========================================================
    // INITIAL LOAD
    // ========================================================

    useEffect(() => {
        getExams();
        getReExams();
    }, []);

    // ========================================================
    // EXAM CHANGE
    // ========================================================

    const handleExamChange = (e) => {
        const examId =
            e.target.value;

        setSelectedExam(examId);

        setStudent("");
        setReexamDate("");
        setStartTime("");
        setEndTime("");
        setReason("");

        setSuccess("");
        setError("");

        getAbsentStudents(examId);
    };

    // ========================================================
    // CREATE RE-EXAM
    // ========================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        // ----------------------------------------------------
        // VALIDATION
        // ----------------------------------------------------

        if (!selectedExam) {
            setError(
                "Please select an exam."
            );
            return;
        }

        if (!student) {
            setError(
                "Please select an absent student."
            );
            return;
        }

        if (!reexamDate) {
            setError(
                "Please select re-exam date."
            );
            return;
        }

        if (reexamDate < today) {
            setError(
                "Re-exam date cannot be in the past."
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
        // FIND PARTICIPATION
        // ----------------------------------------------------

        const selectedParticipation =
            absentStudents.find(
                (item) =>
                    String(item.id) ===
                    String(student)
            );

        if (!selectedParticipation) {
            setError(
                "Selected student participation not found."
            );
            return;
        }

        // ----------------------------------------------------
        // CREATE
        // ----------------------------------------------------

        setSaving(true);

        try {
            await api.post(
                "reexams/",
                {
                    exam:
                        Number(selectedExam),

                    participation:
                        selectedParticipation.id,

                    student:
                        selectedParticipation.student,

                    reexam_date:
                        reexamDate,

                    start_time:
                        startTime,

                    end_time:
                        endTime,

                    reason:
                        reason.trim()
                }
            );

            setSuccess(
                "Re-exam created successfully."
            );

            // ------------------------------------------------
            // RESET FORM
            // ------------------------------------------------

            setStudent("");
            setReexamDate("");
            setStartTime("");
            setEndTime("");
            setReason("");

            // ------------------------------------------------
            // REFRESH
            // ------------------------------------------------

            await getReExams();

            await getAbsentStudents(
                selectedExam
            );
        } catch (error) {
            console.error(
                "Re-exam create error:",
                error.response?.data || error
            );

            const data =
                error.response?.data;

            if (
                data &&
                typeof data === "object"
            ) {
                const messages =
                    Object.entries(data)
                        .map(
                            ([field, message]) => {
                                const text =
                                    Array.isArray(message)
                                        ? message.join(", ")
                                        : message;

                                return `${field}: ${text}`;
                            }
                        )
                        .join(" | ");

                setError(
                    messages ||
                    "Unable to create re-exam."
                );
            } else {
                setError(
                    "Unable to create re-exam."
                );
            }
        } finally {
            setSaving(false);
        }
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
                        Re-Exam Management
                    </h1>

                    <p>
                        Manage re-exams for absent students
                    </p>

                </div>

            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
                <div className="alert error-alert">
                    {error}
                </div>
            )}

            {/* =================================================
                SUCCESS
            ================================================= */}

            {success && (
                <div className="alert success-alert">
                    {success}
                </div>
            )}

            {/* =================================================
                CREATE RE-EXAM
            ================================================= */}

            <section className="page-section">

                <div className="section-header">

                    <div>

                        <h2>
                            Create Re-Exam
                        </h2>

                        <p>
                            Schedule a re-exam for an absent student
                        </p>

                    </div>

                </div>

                <form
                    className="reexam-form"
                    onSubmit={handleSubmit}
                >

                    {/* EXAM */}

                    <div className="form-group">

                        <label>
                            Select Exam
                        </label>

                        <select
                            value={selectedExam}
                            onChange={
                                handleExamChange
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

                                        {
                                            exam.subject_name ||
                                            "-"
                                        }

                                        {" - "}

                                        {
                                            exam.course_name ||
                                            "-"
                                        }

                                        {" - Year "}

                                        {
                                            exam.year
                                        }

                                    </option>

                                )
                            )}

                        </select>

                    </div>

                    {/* ABSENT STUDENT */}

                    <div className="form-group">

                        <label>
                            Select Absent Student
                        </label>

                        {loading ? (

                            <div className="loading-state">
                                Loading absent students...
                            </div>

                        ) : (

                            <select
                                value={student}
                                onChange={(e) =>
                                    setStudent(
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

                                {absentStudents.map(
                                    (item) => (

                                        <option
                                            key={
                                                item.id
                                            }
                                            value={
                                                item.id
                                            }
                                        >

                                            {
                                                item.student_name ||
                                                "-"
                                            }

                                            {" - "}

                                            {
                                                item.student_course_name ||
                                                "-"
                                            }

                                            {" - "}

                                            {
                                                item.student_department_name ||
                                                "-"
                                            }

                                            {" - Year "}

                                            {
                                                item.student_year ??
                                                "-"
                                            }

                                        </option>

                                    )
                                )}

                            </select>

                        )}

                    </div>

                    {/* RE-EXAM DATE */}

                    <div className="form-group">

                        <label>
                            Re-Exam Date
                        </label>

                        <input
                            type="date"
                            value={reexamDate}
                            min={today}
                            onChange={(e) =>
                                setReexamDate(
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

                    {/* REASON */}

                    <div className="form-group">

                        <label>
                            Reason
                        </label>

                        <textarea
                            value={reason}
                            onChange={(e) =>
                                setReason(
                                    e.target.value
                                )
                            }
                            placeholder="Enter reason"
                            rows="3"
                        />

                    </div>

                    {/* SUBMIT */}

                    <div className="form-actions">

                        <button
                            type="submit"
                            disabled={saving}
                        >
                            {
                                saving
                                    ? "Creating..."
                                    : "Create Re-Exam"
                            }
                        </button>

                    </div>

                </form>

            </section>

            {/* =================================================
                EXISTING RE-EXAMS
            ================================================= */}

            <section className="page-section">

                <div className="section-header">

                    <div>

                        <h2>
                            Existing Re-Exams
                        </h2>

                        <p>
                            Previously scheduled re-exams
                        </p>

                    </div>

                    <div className="section-count">

                        {reexams.length} Re-Exams

                    </div>

                </div>

                {reexams.length === 0 ? (

                    <div className="empty-state">
                        No re-exams found.
                    </div>

                ) : (

                    <div className="table-wrapper">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        Student
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
                                        Subject
                                    </th>

                                    <th>
                                        Subject Code
                                    </th>

                                    <th>
                                        Re-Exam Date
                                    </th>

                                    <th>
                                        Start Time
                                    </th>

                                    <th>
                                        End Time
                                    </th>

                                    <th>
                                        Reason
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {reexams.map(
                                    (item) => (

                                        <tr
                                            key={
                                                item.id
                                            }
                                        >

                                            <td>
                                                {
                                                    item.student_name ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.course_name ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.department_name ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.student_year ??
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.exam_name ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.subject_name ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.subject_code ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.reexam_date ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.start_time ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.end_time ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.reason ||
                                                    "-"
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



export default StaffReExams;