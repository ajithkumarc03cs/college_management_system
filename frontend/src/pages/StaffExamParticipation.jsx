// import { useEffect, useState } from "react";
// import api from "../api/axios";


// function StaffExamParticipation() {

//     const [exams, setExams] = useState([]);

//     const [participations, setParticipations] = useState([]);

//     const [selectedExam, setSelectedExam] = useState("");

//     const [loading, setLoading] = useState(false);

//     const [savingId, setSavingId] = useState(null);

//     const [error, setError] = useState("");

//     const [success, setSuccess] = useState("");


//     // ========================================================
//     // LOAD STAFF EXAMS
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
//     // LOAD PARTICIPATIONS
//     // ========================================================

//     const getParticipations = async (
//         examId
//     ) => {

//         if (!examId) {

//             setParticipations([]);

//             return;

//         }


//         setLoading(true);

//         setError("");

//         setSuccess("");


//         try {

//             const response = await api.get(

//                 "exam-participation/",

//                 {
//                     params: {
//                         exam: examId,
//                         page_size: 100
//                     }
//                 }

//             );


//             setParticipations(

//                 response.data.results ||
//                 response.data ||
//                 []

//             );

//         }

//         catch (error) {

//             console.error(
//                 "Participation loading error:",
//                 error.response?.data || error
//             );


//             setParticipations([]);


//             setError(
//                 "Unable to load students."
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


//         setParticipations([]);

//         setError("");

//         setSuccess("");


//         getParticipations(
//             examId
//         );

//     };


//     // ========================================================
//     // UPDATE PARTICIPATION
//     // ========================================================

//     const handleUpdate = async (
//         participationId,
//         statusValue,
//         marks
//     ) => {

//         setSavingId(
//             participationId
//         );


//         setError("");

//         setSuccess("");


//         // ====================================================
//         // PREPARE MARKS
//         // ====================================================

//         let finalMarks = null;


//         if (statusValue === "PRESENT") {

//             if (
//                 marks === "" ||
//                 marks === null ||
//                 marks === undefined
//             ) {

//                 setError(
//                     "Marks are required for a present student."
//                 );


//                 setSavingId(null);

//                 return;

//             }


//             finalMarks =
//                 Number(marks);


//             if (
//                 Number.isNaN(finalMarks)
//             ) {

//                 setError(
//                     "Please enter valid marks."
//                 );


//                 setSavingId(null);

//                 return;

//             }


//             if (
//                 finalMarks < 0 ||
//                 finalMarks > 100
//             ) {

//                 setError(
//                     "Marks must be between 0 and 100."
//                 );


//                 setSavingId(null);

//                 return;

//             }

//         }


//         // ====================================================
//         // ABSENT / PENDING
//         // ====================================================

//         if (
//             statusValue === "ABSENT" ||
//             statusValue === "PENDING"
//         ) {

//             finalMarks = null;

//         }


//         // ====================================================
//         // SEND UPDATE
//         // ====================================================

//         try {

//             await api.patch(

//                 `exam-participation/${participationId}/`,

//                 {
//                     status:
//                         statusValue,

//                     marks:
//                         finalMarks
//                 }

//             );


//             setSuccess(
//                 "Student result updated successfully."
//             );


//             await getParticipations(
//                 selectedExam
//             );

//         }

//         catch (error) {

//             console.error(
//                 "Update error:",
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
//                     "Unable to update result."
//                 );

//             }

//             else {

//                 setError(
//                     "Unable to update result."
//                 );

//             }

//         }

//         finally {

//             setSavingId(null);

//         }

//     };


//     // ========================================================
//     // STATUS CHANGE
//     // ========================================================

//     const handleStatusChange = (
//         id,
//         value
//     ) => {

//         setParticipations(

//             (previous) =>

//                 previous.map(
//                     (item) => {

//                         if (
//                             item.id === id
//                         ) {

//                             return {

//                                 ...item,

//                                 status:
//                                     value,

//                                 marks:
//                                     value === "ABSENT" ||
//                                     value === "PENDING"
//                                         ? null
//                                         : item.marks

//                             };

//                         }


//                         return item;

//                     }
//                 )

//         );

//     };


//     // ========================================================
//     // MARKS CHANGE
//     // ========================================================

//     const handleMarksChange = (
//         id,
//         value
//     ) => {

//         setParticipations(

//             (previous) =>

//                 previous.map(
//                     (item) => {

//                         if (
//                             item.id === id
//                         ) {

//                             return {

//                                 ...item,

//                                 marks:
//                                     value

//                             };

//                         }


//                         return item;

//                     }
//                 )

//         );

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
//                 Exam Participation
//             </h1>


//             {/* =================================================
//                 EXAM SELECT
//             ================================================= */}

//             <div>

//                 <label>
//                     Select Exam
//                 </label>

//                 <br />


//                 <select
//                     value={
//                         selectedExam
//                     }
//                     onChange={
//                         handleExamChange
//                     }
//                 >

//                     <option value="">
//                         Select Exam
//                     </option>


//                     {exams.map(
//                         (exam) => (

//                             <option
//                                 key={
//                                     exam.id
//                                 }
//                                 value={
//                                     exam.id
//                                 }
//                             >

//                                 {exam.name}

//                                 {" - "}

//                                 {exam.subject_name || "-"}

//                                 {" - "}

//                                 {exam.course_name || "-"}

//                                 {" - Year "}

//                                 {exam.year}

//                             </option>

//                         )
//                     )}

//                 </select>

//             </div>


//             <br />


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
//                 SELECTED EXAM DETAILS
//             ================================================= */}

//             {selectedExam && (

//                 <div>

//                     {(() => {

//                         const selectedExamData =
//                             exams.find(
//                                 (item) =>
//                                     String(item.id) ===
//                                     String(selectedExam)
//                             );


//                         if (!selectedExamData) {

//                             return null;

//                         }


//                         return (

//                             <div>

//                                 <h3>
//                                     Selected Exam
//                                 </h3>

//                                 <p>
//                                     <strong>
//                                         Exam:
//                                     </strong>{" "}
//                                     {
//                                         selectedExamData.name
//                                         || "-"
//                                     }
//                                 </p>

//                                 <p>
//                                     <strong>
//                                         Subject:
//                                     </strong>{" "}
//                                     {
//                                         selectedExamData.subject_name
//                                         || "-"
//                                     }
//                                 </p>

//                                 <p>
//                                     <strong>
//                                         Subject Code:
//                                     </strong>{" "}
//                                     {
//                                         selectedExamData.subject_code
//                                         || "-"
//                                     }
//                                 </p>

//                                 <p>
//                                     <strong>
//                                         Course / Class:
//                                     </strong>{" "}
//                                     {
//                                         selectedExamData.course_name
//                                         || "-"
//                                     }
//                                 </p>

//                                 <p>
//                                     <strong>
//                                         Department:
//                                     </strong>{" "}
//                                     {
//                                         selectedExamData.department_name
//                                         || "-"
//                                     }
//                                 </p>

//                                 <p>
//                                     <strong>
//                                         Year:
//                                     </strong>{" "}
//                                     {
//                                         selectedExamData.year
//                                         ?? "-"
//                                     }
//                                 </p>

//                                 <p>
//                                     <strong>
//                                         Exam Date:
//                                     </strong>{" "}
//                                     {
//                                         selectedExamData.exam_date
//                                         || "-"
//                                     }
//                                 </p>

//                                 <p>
//                                     <strong>
//                                         Time:
//                                     </strong>{" "}
//                                     {
//                                         selectedExamData.start_time
//                                         || "-"
//                                     }
//                                     {" - "}
//                                     {
//                                         selectedExamData.end_time
//                                         || "-"
//                                     }
//                                 </p>

//                             </div>

//                         );

//                     })()}

//                 </div>

//             )}


//             <br />


//             {/* =================================================
//                 LOADING
//             ================================================= */}

//             {loading && (

//                 <p>
//                     Loading students...
//                 </p>

//             )}


//             {/* =================================================
//                 PARTICIPATION TABLE
//             ================================================= */}

//             {!loading && selectedExam && (

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
//                                 Email
//                             </th>

//                             <th>
//                                 Phone
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
//                                 Subject
//                             </th>

//                             <th>
//                                 Status
//                             </th>

//                             <th>
//                                 Marks
//                             </th>

//                             <th>
//                                 Action
//                             </th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {participations.length === 0 ? (

//                             <tr>

//                                 <td
//                                     colSpan="10"
//                                 >
//                                     No students found.
//                                 </td>

//                             </tr>

//                         ) : (

//                             participations.map(
//                                 (item) => (

//                                     <tr
//                                         key={
//                                             item.id
//                                         }
//                                     >

//                                         {/* ==================
//                                             STUDENT
//                                         ================== */}

//                                         <td>
//                                             {
//                                                 item.student_name
//                                                 || "-"
//                                             }
//                                         </td>


//                                         {/* ==================
//                                             EMAIL
//                                         ================== */}

//                                         <td>
//                                             {
//                                                 item.student_email
//                                                 || "-"
//                                             }
//                                         </td>


//                                         {/* ==================
//                                             PHONE
//                                         ================== */}

//                                         <td>
//                                             {
//                                                 item.student_phone
//                                                 || "-"
//                                             }
//                                         </td>


//                                         {/* ==================
//                                             COURSE
//                                         ================== */}

//                                         <td>
//                                             {
//                                                 item.student_course_name
//                                                 || "-"
//                                             }
//                                         </td>


//                                         {/* ==================
//                                             DEPARTMENT
//                                         ================== */}

//                                         <td>
//                                             {
//                                                 item.student_department_name
//                                                 || "-"
//                                             }
//                                         </td>


//                                         {/* ==================
//                                             YEAR
//                                         ================== */}

//                                         <td>
//                                             {
//                                                 item.student_year
//                                                 ?? "-"
//                                             }
//                                         </td>


//                                         {/* ==================
//                                             SUBJECT
//                                         ================== */}

//                                         <td>
//                                             {
//                                                 item.subject_name
//                                                 || "-"
//                                             }
//                                         </td>


//                                         {/* ==================
//                                             STATUS
//                                         ================== */}

//                                         <td>

//                                             <select

//                                                 value={
//                                                     item.status
//                                                     || "PENDING"
//                                                 }

//                                                 onChange={
//                                                     (e) =>
//                                                         handleStatusChange(

//                                                             item.id,

//                                                             e.target.value

//                                                         )
//                                                 }

//                                             >

//                                                 <option
//                                                     value="PENDING"
//                                                 >
//                                                     Pending
//                                                 </option>

//                                                 <option
//                                                     value="PRESENT"
//                                                 >
//                                                     Present
//                                                 </option>

//                                                 <option
//                                                     value="ABSENT"
//                                                 >
//                                                     Absent
//                                                 </option>

//                                             </select>

//                                         </td>


//                                         {/* ==================
//                                             MARKS
//                                         ================== */}

//                                         <td>

//                                             <input

//                                                 type="number"

//                                                 min="0"

//                                                 max="100"

//                                                 value={
//                                                     item.marks ?? ""
//                                                 }

//                                                 disabled={
//                                                     item.status !==
//                                                     "PRESENT"
//                                                 }

//                                                 onChange={
//                                                     (e) =>
//                                                         handleMarksChange(

//                                                             item.id,

//                                                             e.target.value

//                                                         )
//                                                 }

//                                                 placeholder="0 - 100"

//                                             />

//                                         </td>


//                                         {/* ==================
//                                             SAVE
//                                         ================== */}

//                                         <td>

//                                             <button

//                                                 type="button"

//                                                 disabled={
//                                                     savingId ===
//                                                     item.id
//                                                 }

//                                                 onClick={() =>
//                                                     handleUpdate(

//                                                         item.id,

//                                                         item.status,

//                                                         item.marks

//                                                     )
//                                                 }

//                                             >

//                                                 {
//                                                     savingId ===
//                                                     item.id

//                                                         ? "Saving..."

//                                                         : "Save"
//                                                 }

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


// export default StaffExamParticipation;
import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";

function StaffExamParticipation() {
    // ========================================================
    // DATA
    // ========================================================

    const [exams, setExams] = useState([]);
    const [participations, setParticipations] = useState([]);

    // ========================================================
    // SELECTION
    // ========================================================

    const [selectedExam, setSelectedExam] = useState("");

    // ========================================================
    // UI STATE
    // ========================================================

    const [loading, setLoading] = useState(false);
    const [savingId, setSavingId] = useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ========================================================
    // LOAD STAFF EXAMS
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
    // LOAD PARTICIPATIONS
    // ========================================================

    const getParticipations = async (examId) => {
        if (!examId) {
            setParticipations([]);
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await api.get(
                "exam-participation/",
                {
                    params: {
                        exam: examId,
                        page_size: 100
                    }
                }
            );

            setParticipations(
                response.data.results ||
                response.data ||
                []
            );
        } catch (error) {
            console.error(
                "Participation loading error:",
                error.response?.data || error
            );

            setParticipations([]);

            setError(
                "Unable to load students."
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
    }, []);

    // ========================================================
    // SELECTED EXAM DATA
    // ========================================================

    const selectedExamData = useMemo(() => {
        return exams.find(
            (item) =>
                String(item.id) ===
                String(selectedExam)
        );
    }, [
        exams,
        selectedExam
    ]);

    // ========================================================
    // EXAM CHANGE
    // ========================================================

    const handleExamChange = (e) => {
        const examId = e.target.value;

        setSelectedExam(examId);

        setParticipations([]);

        setError("");
        setSuccess("");

        getParticipations(examId);
    };

    // ========================================================
    // UPDATE PARTICIPATION
    // ========================================================

    const handleUpdate = async (
        participationId,
        statusValue,
        marks
    ) => {
        setSavingId(participationId);

        setError("");
        setSuccess("");

        // ====================================================
        // PREPARE MARKS
        // ====================================================

        let finalMarks = null;

        if (statusValue === "PRESENT") {
            if (
                marks === "" ||
                marks === null ||
                marks === undefined
            ) {
                setError(
                    "Marks are required for a present student."
                );

                setSavingId(null);

                return;
            }

            finalMarks = Number(marks);

            if (Number.isNaN(finalMarks)) {
                setError(
                    "Please enter valid marks."
                );

                setSavingId(null);

                return;
            }

            if (
                finalMarks < 0 ||
                finalMarks > 100
            ) {
                setError(
                    "Marks must be between 0 and 100."
                );

                setSavingId(null);

                return;
            }
        }

        // ====================================================
        // ABSENT / PENDING
        // ====================================================

        if (
            statusValue === "ABSENT" ||
            statusValue === "PENDING"
        ) {
            finalMarks = null;
        }

        // ====================================================
        // SEND UPDATE
        // ====================================================

        try {
            await api.patch(
                `exam-participation/${participationId}/`,
                {
                    status: statusValue,
                    marks: finalMarks
                }
            );

            setSuccess(
                "Student result updated successfully."
            );

            await getParticipations(
                selectedExam
            );
        } catch (error) {
            console.error(
                "Update error:",
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
                    "Unable to update result."
                );
            } else {
                setError(
                    "Unable to update result."
                );
            }
        } finally {
            setSavingId(null);
        }
    };

    // ========================================================
    // STATUS CHANGE
    // ========================================================

    const handleStatusChange = (
        id,
        value
    ) => {
        setParticipations(
            (previous) =>
                previous.map(
                    (item) => {
                        if (
                            item.id === id
                        ) {
                            return {
                                ...item,

                                status: value,

                                marks:
                                    value === "ABSENT" ||
                                    value === "PENDING"
                                        ? null
                                        : item.marks
                            };
                        }

                        return item;
                    }
                )
        );
    };

    // ========================================================
    // MARKS CHANGE
    // ========================================================

    const handleMarksChange = (
        id,
        value
    ) => {
        setParticipations(
            (previous) =>
                previous.map(
                    (item) => {
                        if (
                            item.id === id
                        ) {
                            return {
                                ...item,
                                marks: value
                            };
                        }

                        return item;
                    }
                )
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
                        Exam Participation
                    </h1>

                    <p>
                        Manage student exam participation
                        and marks
                    </p>

                </div>

            </div>

            {/* =================================================
                EXAM SELECTION
            ================================================= */}

            <section className="page-section">

                <div className="section-header">

                    <div>

                        <h2>
                            Select Exam
                        </h2>

                        <p>
                            Choose an exam to manage
                            student participation
                        </p>

                    </div>

                </div>

                <div className="form-group">

                    <label>
                        Exam
                    </label>

                    <select
                        value={selectedExam}
                        onChange={
                            handleExamChange
                        }
                    >

                        <option value="">
                            Select Exam
                        </option>

                        {exams.map(
                            (exam) => (

                                <option
                                    key={exam.id}
                                    value={exam.id}
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

            </section>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
                <div className="alert error-alert">

                    <p>
                        {error}
                    </p>

                </div>
            )}

            {/* =================================================
                SUCCESS
            ================================================= */}

            {success && (
                <div className="alert success-alert">

                    <p>
                        {success}
                    </p>

                </div>
            )}

            {/* =================================================
                SELECTED EXAM DETAILS
            ================================================= */}

            {selectedExamData && (

                <section className="page-section">

                    <div className="section-header">

                        <div>

                            <h2>
                                Selected Exam
                            </h2>

                        </div>

                    </div>

                    <div className="selection-details">

                        <div>
                            <strong>
                                Exam
                            </strong>

                            <span>
                                {
                                    selectedExamData.name ||
                                    "-"
                                }
                            </span>
                        </div>

                        <div>
                            <strong>
                                Subject
                            </strong>

                            <span>
                                {
                                    selectedExamData.subject_name ||
                                    "-"
                                }
                            </span>
                        </div>

                        <div>
                            <strong>
                                Subject Code
                            </strong>

                            <span>
                                {
                                    selectedExamData.subject_code ||
                                    "-"
                                }
                            </span>
                        </div>

                        <div>
                            <strong>
                                Course / Class
                            </strong>

                            <span>
                                {
                                    selectedExamData.course_name ||
                                    "-"
                                }
                            </span>
                        </div>

                        <div>
                            <strong>
                                Department
                            </strong>

                            <span>
                                {
                                    selectedExamData.department_name ||
                                    "-"
                                }
                            </span>
                        </div>

                        <div>
                            <strong>
                                Year
                            </strong>

                            <span>
                                {
                                    selectedExamData.year ??
                                    "-"
                                }
                            </span>
                        </div>

                        <div>
                            <strong>
                                Exam Date
                            </strong>

                            <span>
                                {
                                    selectedExamData.exam_date ||
                                    "-"
                                }
                            </span>
                        </div>

                        <div>
                            <strong>
                                Time
                            </strong>

                            <span>
                                {
                                    selectedExamData.start_time ||
                                    "-"
                                }
                                {" - "}
                                {
                                    selectedExamData.end_time ||
                                    "-"
                                }
                            </span>
                        </div>

                    </div>

                </section>

            )}

            {/* =================================================
                PARTICIPATION
            ================================================= */}

            {selectedExam && (

                <section className="page-section">

                    <div className="section-header">

                        <div>

                            <h2>
                                Student Participation
                            </h2>

                            <p>
                                Update attendance status
                                and marks
                            </p>

                        </div>

                        <div className="section-count">

                            {
                                participations.length
                            }{" "}
                            Students

                        </div>

                    </div>

                    {/* ------------------------------------------------
                        LOADING
                    ------------------------------------------------ */}

                    {loading && (
                        <div className="loading-state">
                            Loading students...
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

                                        <th>
                                            Student
                                        </th>

                                        <th>
                                            Email
                                        </th>

                                        <th>
                                            Phone
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
                                            Subject
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Marks
                                        </th>

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {participations.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="10"
                                                className="empty-table-cell"
                                            >
                                                No students found.
                                            </td>

                                        </tr>

                                    ) : (

                                        participations.map(
                                            (item) => (

                                                <tr
                                                    key={
                                                        item.id
                                                    }
                                                >

                                                    {/* STUDENT */}

                                                    <td>
                                                        {
                                                            item.student_name ||
                                                            "-"
                                                        }
                                                    </td>

                                                    {/* EMAIL */}

                                                    <td>
                                                        {
                                                            item.student_email ||
                                                            "-"
                                                        }
                                                    </td>

                                                    {/* PHONE */}

                                                    <td>
                                                        {
                                                            item.student_phone ||
                                                            "-"
                                                        }
                                                    </td>

                                                    {/* COURSE */}

                                                    <td>
                                                        {
                                                            item.student_course_name ||
                                                            "-"
                                                        }
                                                    </td>

                                                    {/* DEPARTMENT */}

                                                    <td>
                                                        {
                                                            item.student_department_name ||
                                                            "-"
                                                        }
                                                    </td>

                                                    {/* YEAR */}

                                                    <td>
                                                        {
                                                            item.student_year ??
                                                            "-"
                                                        }
                                                    </td>

                                                    {/* SUBJECT */}

                                                    <td>
                                                        {
                                                            item.subject_name ||
                                                            "-"
                                                        }
                                                    </td>

                                                    {/* STATUS */}

                                                    <td>

                                                        <select
                                                            value={
                                                                item.status ||
                                                                "PENDING"
                                                            }
                                                            onChange={
                                                                (e) =>
                                                                    handleStatusChange(
                                                                        item.id,
                                                                        e.target.value
                                                                    )
                                                            }
                                                        >

                                                            <option value="PENDING">
                                                                Pending
                                                            </option>

                                                            <option value="PRESENT">
                                                                Present
                                                            </option>

                                                            <option value="ABSENT">
                                                                Absent
                                                            </option>

                                                        </select>

                                                    </td>

                                                    {/* MARKS */}

                                                    <td>

                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="100"
                                                            value={
                                                                item.marks ??
                                                                ""
                                                            }
                                                            disabled={
                                                                item.status !==
                                                                "PRESENT"
                                                            }
                                                            onChange={
                                                                (e) =>
                                                                    handleMarksChange(
                                                                        item.id,
                                                                        e.target.value
                                                                    )
                                                            }
                                                            placeholder="0 - 100"
                                                        />

                                                    </td>

                                                    {/* ACTION */}

                                                    <td>

                                                        <button
                                                            type="button"
                                                            disabled={
                                                                savingId ===
                                                                item.id
                                                            }
                                                            onClick={() =>
                                                                handleUpdate(
                                                                    item.id,
                                                                    item.status,
                                                                    item.marks
                                                                )
                                                            }
                                                        >
                                                            {
                                                                savingId ===
                                                                item.id
                                                                    ? "Saving..."
                                                                    : "Save"
                                                            }
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

            )}

        </div>
    );
}

export default StaffExamParticipation;