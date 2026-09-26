// import { useEffect, useState } from "react";

// import api from "../api/axios";


// function StaffAttendance() {

//     // ========================================================
//     // DATA
//     // ========================================================

//     const [classes, setClasses] = useState([]);

//     const [students, setStudents] = useState([]);


//     // ========================================================
//     // SELECTED CLASS / SUBJECT
//     // ========================================================

//     const [selectedClass, setSelectedClass] = useState("");

//     const [selectedSubject, setSelectedSubject] = useState("");


//     // ========================================================
//     // DATE
//     // ========================================================

//     const [attendanceDate, setAttendanceDate] =
//         useState(
//             new Date()
//                 .toISOString()
//                 .split("T")[0]
//         );


//     // ========================================================
//     // ATTENDANCE STATUS
//     // ========================================================

//     const [attendanceStatus, setAttendanceStatus] =
//         useState({});


//     // ========================================================
//     // UI
//     // ========================================================

//     const [loading, setLoading] = useState(false);

//     const [saving, setSaving] = useState(false);

//     const [error, setError] = useState("");

//     const [success, setSuccess] = useState("");


//     // ========================================================
//     // LOAD CLASSES
//     // ========================================================

//     useEffect(() => {

//         loadClasses();

//     }, []);


//     const loadClasses = async () => {

//         try {

//             setLoading(true);

//             setError("");


//             const response = await api.get(
//                 "staff/attendance/classes/"
//             );


//             console.log(
//                 "Attendance Classes:",
//                 response.data
//             );


//             setClasses(
//                 response.data.results ||
//                 response.data ||
//                 []
//             );


//         } catch (error) {

//             console.error(
//                 "Class loading error:",
//                 error.response?.data || error
//             );


//             setClasses([]);

//             setError(
//                 "Unable to load attendance classes."
//             );

//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // LOAD STUDENTS
//     // ========================================================

//     const loadStudents = async (
//         courseId,
//         departmentId,
//         year
//     ) => {

//         try {

//             setLoading(true);

//             setError("");

//             setStudents([]);

//             setAttendanceStatus({});


//             const response = await api.get(
//                 "students/",
//                 {
//                     params: {
//                         course: courseId,
//                         department: departmentId,
//                         year: year,
//                         page_size: 100
//                     }
//                 }
//             );


//             console.log(
//                 "Attendance Students:",
//                 response.data
//             );


//             const data =
//                 response.data.results ||
//                 response.data ||
//                 [];


//             setStudents(data);


//             // ------------------------------------------------
//             // DEFAULT PRESENT
//             // ------------------------------------------------

//             const defaultStatus = {};


//             data.forEach(
//                 (student) => {

//                     defaultStatus[
//                         student.id
//                     ] = "PRESENT";

//                 }
//             );


//             setAttendanceStatus(
//                 defaultStatus
//             );


//         } catch (error) {

//             console.error(
//                 "Student loading error:",
//                 error.response?.data || error
//             );


//             setStudents([]);

//             setError(
//                 "Unable to load students."
//             );

//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // CLASS CHANGE
//     // ========================================================

//     const handleClassChange = (
//         e
//     ) => {

//         const classId =
//             e.target.value;


//         setSelectedClass(
//             classId
//         );

//         setSelectedSubject("");

//         setStudents([]);

//         setAttendanceStatus({});

//         setError("");

//         setSuccess("");


//     };


//     // ========================================================
//     // SUBJECT CHANGE
//     // ========================================================

//     const handleSubjectChange = async (
//         e
//     ) => {

//         const subjectId =
//             e.target.value;


//         setSelectedSubject(
//             subjectId
//         );

//         setStudents([]);

//         setAttendanceStatus({});

//         setError("");

//         setSuccess("");


//         if (!selectedClass || !subjectId) {

//             return;

//         }


//         const selectedClassData =
//             classes.find(
//                 (item) =>
//                     String(item.course) ===
//                         String(
//                             selectedClass.split("-")[0]
//                         )
//             );


//         /*
//          * The class selector value below is created
//          * from course + department + year.
//          *
//          * Therefore find the matching class
//          * separately.
//          */

//         const selectedParts =
//             selectedClass.split("_");


//         const courseId =
//             selectedParts[0];

//         const departmentId =
//             selectedParts[1];

//         const year =
//             selectedParts[2];


//         await loadStudents(
//             courseId,
//             departmentId,
//             year
//         );

//     };


//     // ========================================================
//     // STUDENT STATUS CHANGE
//     // ========================================================

//     const handleStatusChange = (
//         studentId,
//         status
//     ) => {

//         setAttendanceStatus(
//             (previous) => ({

//                 ...previous,

//                 [studentId]:
//                     status

//             })
//         );

//     };


//     // ========================================================
//     // MARK ALL PRESENT
//     // ========================================================

//     const markAllPresent = () => {

//         const status = {};


//         students.forEach(
//             (student) => {

//                 status[
//                     student.id
//                 ] = "PRESENT";

//             }
//         );


//         setAttendanceStatus(
//             status
//         );

//     };


//     // ========================================================
//     // MARK ALL ABSENT
//     // ========================================================

//     const markAllAbsent = () => {

//         const status = {};


//         students.forEach(
//             (student) => {

//                 status[
//                     student.id
//                 ] = "ABSENT";

//             }
//         );


//         setAttendanceStatus(
//             status
//         );

//     };


//     // ========================================================
//     // SAVE ATTENDANCE
//     // ========================================================

//     const handleSubmit = async (
//         e
//     ) => {

//         e.preventDefault();


//         setError("");

//         setSuccess("");


//         // ----------------------------------------------------
//         // VALIDATION
//         // ----------------------------------------------------

//         if (!selectedClass) {

//             setError(
//                 "Please select a class."
//             );

//             return;

//         }


//         if (!selectedSubject) {

//             setError(
//                 "Please select a subject."
//             );

//             return;

//         }


//         if (!attendanceDate) {

//             setError(
//                 "Please select attendance date."
//             );

//             return;

//         }


//         if (students.length === 0) {

//             setError(
//                 "No students found."
//             );

//             return;

//         }


//         // ----------------------------------------------------
//         // CLASS DETAILS
//         // ----------------------------------------------------

//         const selectedParts =
//             selectedClass.split("_");


//         const courseId =
//             Number(selectedParts[0]);

//         const departmentId =
//             Number(selectedParts[1]);

//         const year =
//             Number(selectedParts[2]);


//         // ----------------------------------------------------
//         // RECORDS
//         // ----------------------------------------------------

//         const records =
//             students.map(
//                 (student) => ({

//                     student:
//                         student.id,

//                     status:
//                         attendanceStatus[
//                             student.id
//                         ] || "PRESENT"

//                 })
//             );


//         const payload = {

//             subject:
//                 Number(selectedSubject),

//             date:
//                 attendanceDate,

//             records:
//                 records

//         };


//         console.log(
//             "Attendance Payload:",
//             payload
//         );


//         try {

//             setSaving(true);


//             const response =
//                 await api.post(
//                     "attendance/bulk/",
//                     payload
//                 );


//             console.log(
//                 "Attendance Response:",
//                 response.data
//             );


//             setSuccess(
//                 "Attendance marked successfully."
//             );


//         } catch (error) {

//             console.error(
//                 "Attendance save error:",
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
//                     "Unable to save attendance."
//                 );

//             } else {

//                 setError(
//                     "Unable to save attendance."
//                 );

//             }

//         } finally {

//             setSaving(false);

//         }

//     };


//     // ========================================================
//     // SELECTED CLASS DATA
//     // ========================================================

//     const selectedParts =
//         selectedClass
//             ? selectedClass.split("_")
//             : [];


//     const selectedCourseId =
//         selectedParts[0] || "";

//     const selectedDepartmentId =
//         selectedParts[1] || "";

//     const selectedYear =
//         selectedParts[2] || "";


//     const selectedClassData =
//         classes.find(
//             (item) =>
//                 String(item.course) ===
//                     String(selectedCourseId) &&
//                 String(item.department) ===
//                     String(selectedDepartmentId) &&
//                 String(item.year) ===
//                     String(selectedYear)
//         );


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (
//         loading &&
//         classes.length === 0
//     ) {

//         return (

//             <div>

//                 <h2>
//                     Loading attendance classes...
//                 </h2>

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
//                 Staff Attendance
//             </h1>


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
//                 CLASS
//             ================================================= */}

//             <div>

//                 <label>
//                     Select Class:
//                 </label>

//                 {" "}


//                 <select
//                     value={
//                         selectedClass
//                     }
//                     onChange={
//                         handleClassChange
//                     }
//                 >

//                     <option value="">
//                         Select Class
//                     </option>


//                     {classes.map(
//                         (item) => (

//                             <option
//                                 key={
//                                     `${item.course}_${item.department}_${item.year}`
//                                 }
//                                 value={
//                                     `${item.course}_${item.department}_${item.year}`
//                                 }
//                             >

//                                 {
//                                     item.course_name ||
//                                     "-"
//                                 }

//                                 {" - "}

//                                 {
//                                     item.department_name ||
//                                     "-"
//                                 }

//                                 {" - Year "}

//                                 {
//                                     item.year
//                                 }

//                             </option>

//                         )
//                     )}

//                 </select>

//             </div>


//             <br />


//             {/* =================================================
//                 SUBJECT
//             ================================================= */}

//             {selectedClassData && (

//                 <div>

//                     <label>
//                         Select Subject:
//                     </label>

//                     {" "}


//                     <select
//                         value={
//                             selectedSubject
//                         }
//                         onChange={
//                             handleSubjectChange
//                         }
//                     >

//                         <option value="">
//                             Select Subject
//                         </option>


//                         {(
//                             selectedClassData.subjects ||
//                             []
//                         ).map(
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

//                                     {" - "}

//                                     {
//                                         subject.code
//                                     }

//                                 </option>

//                             )
//                         )}

//                     </select>

//                 </div>

//             )}


//             <br />


//             {/* =================================================
//                 DATE
//             ================================================= */}

//             <div>

//                 <label>
//                     Attendance Date:
//                 </label>

//                 {" "}


//                 <input
//                     type="date"
//                     value={
//                         attendanceDate
//                     }
//                     onChange={(e) =>
//                         setAttendanceDate(
//                             e.target.value
//                         )
//                     }
//                 />

//             </div>


//             <br />


//             {/* =================================================
//                 CLASS DETAILS
//             ================================================= */}

//             {selectedClassData && (

//                 <div>

//                     <p>

//                         <strong>
//                             Course / Class:
//                         </strong>

//                         {" "}

//                         {
//                             selectedClassData.course_name
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Department:
//                         </strong>

//                         {" "}

//                         {
//                             selectedClassData.department_name
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Year:
//                         </strong>

//                         {" "}

//                         {
//                             selectedClassData.year
//                         }

//                     </p>

//                 </div>

//             )}


//             <hr />


//             {/* =================================================
//                 STUDENTS
//             ================================================= */}

//             {selectedSubject && (

//                 <div>

//                     <h2>
//                         Students
//                     </h2>


//                     {/* =============================================
//                         BULK ACTIONS
//                     ============================================== */}

//                     <button
//                         type="button"
//                         onClick={
//                             markAllPresent
//                         }
//                         disabled={
//                             students.length === 0
//                         }
//                     >
//                         Mark All Present
//                     </button>


//                     {" "}


//                     <button
//                         type="button"
//                         onClick={
//                             markAllAbsent
//                         }
//                         disabled={
//                             students.length === 0
//                         }
//                     >
//                         Mark All Absent
//                     </button>


//                     <br />
//                     <br />


//                     {loading ? (

//                         <p>
//                             Loading students...
//                         </p>

//                     ) : students.length === 0 ? (

//                         <p>
//                             No students found for this class.
//                         </p>

//                     ) : (

//                         <form
//                             onSubmit={
//                                 handleSubmit
//                             }
//                         >

//                             <table
//                                 border="1"
//                                 cellPadding="10"
//                                 cellSpacing="0"
//                             >

//                                 <thead>

//                                     <tr>

//                                         <th>
//                                             #
//                                         </th>

//                                         <th>
//                                             Student
//                                         </th>

//                                         <th>
//                                             Email
//                                         </th>

//                                         <th>
//                                             Course / Class
//                                         </th>

//                                         <th>
//                                             Department
//                                         </th>

//                                         <th>
//                                             Year
//                                         </th>

//                                         <th>
//                                             Status
//                                         </th>

//                                     </tr>

//                                 </thead>


//                                 <tbody>

//                                     {students.map(
//                                         (
//                                             student,
//                                             index
//                                         ) => (

//                                             <tr
//                                                 key={
//                                                     student.id
//                                                 }
//                                             >

//                                                 <td>
//                                                     {
//                                                         index + 1
//                                                     }
//                                                 </td>


//                                                 <td>

//                                                     {
//                                                         student.name ||
//                                                         student.student_name ||
//                                                         "-"
//                                                     }

//                                                 </td>


//                                                 <td>

//                                                     {
//                                                         student.email ||
//                                                         "-"
//                                                     }

//                                                 </td>


//                                                 <td>

//                                                     {
//                                                         student.course_name ||
//                                                         selectedClassData?.course_name ||
//                                                         "-"
//                                                     }

//                                                 </td>


//                                                 <td>

//                                                     {
//                                                         student.department_name ||
//                                                         selectedClassData?.department_name ||
//                                                         "-"
//                                                     }

//                                                 </td>


//                                                 <td>

//                                                     {
//                                                         student.current_year ??
//                                                         student.year ??
//                                                         selectedClassData?.year ??
//                                                         "-"
//                                                     }

//                                                 </td>


//                                                 <td>

//                                                     <select
//                                                         value={
//                                                             attendanceStatus[
//                                                                 student.id
//                                                             ] ||
//                                                             "PRESENT"
//                                                         }
//                                                         onChange={(e) =>
//                                                             handleStatusChange(
//                                                                 student.id,
//                                                                 e.target.value
//                                                             )
//                                                         }
//                                                     >

//                                                         <option value="PRESENT">
//                                                             Present
//                                                         </option>

//                                                         <option value="ABSENT">
//                                                             Absent
//                                                         </option>

//                                                     </select>

//                                                 </td>

//                                             </tr>

//                                         )
//                                     )}

//                                 </tbody>

//                             </table>


//                             <br />


//                             {/* =========================================
//                                 SAVE
//                             ========================================== */}

//                             <button
//                                 type="submit"
//                                 disabled={
//                                     saving
//                                 }
//                             >

//                                 {
//                                     saving
//                                         ? "Saving..."
//                                         : "Mark Attendance"
//                                 }

//                             </button>

//                         </form>

//                     )}

//                 </div>

//             )}

//         </div>

//     );

// }


// export default StaffAttendance;
import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";

function StaffAttendance() {
    // ========================================================
    // DATA
    // ========================================================

    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);

    // ========================================================
    // SELECTION
    // ========================================================

    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");

    // ========================================================
    // ATTENDANCE DATE
    // ========================================================

    const [attendanceDate, setAttendanceDate] = useState(
        new Date()
            .toISOString()
            .split("T")[0]
    );

    // ========================================================
    // ATTENDANCE STATUS
    // ========================================================

    const [attendanceStatus, setAttendanceStatus] = useState({});

    // ========================================================
    // UI STATE
    // ========================================================

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ========================================================
    // LOAD CLASSES
    // ========================================================

    const loadClasses = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "staff/attendance/classes/"
            );

            console.log(
                "Attendance Classes:",
                response.data
            );

            const data =
                response.data.results ||
                response.data ||
                [];

            setClasses(data);
        } catch (error) {
            console.error(
                "Class loading error:",
                error.response?.data || error
            );

            setClasses([]);

            setError(
                "Unable to load attendance classes."
            );
        } finally {
            setLoading(false);
        }
    };

    // ========================================================
    // LOAD STUDENTS
    // ========================================================

    const loadStudents = async (
        courseId,
        departmentId,
        year
    ) => {
        try {
            setLoading(true);
            setError("");

            setStudents([]);
            setAttendanceStatus({});

            const response = await api.get(
                "students/",
                {
                    params: {
                        course: courseId,
                        department: departmentId,
                        year: year,
                        page_size: 100
                    }
                }
            );

            console.log(
                "Attendance Students:",
                response.data
            );

            const data =
                response.data.results ||
                response.data ||
                [];

            setStudents(data);

            // ------------------------------------------------
            // DEFAULT PRESENT
            // ------------------------------------------------

            const defaultStatus = {};

            data.forEach((student) => {
                defaultStatus[student.id] =
                    "PRESENT";
            });

            setAttendanceStatus(
                defaultStatus
            );
        } catch (error) {
            console.error(
                "Student loading error:",
                error.response?.data || error
            );

            setStudents([]);

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
        loadClasses();
    }, []);

    // ========================================================
    // CLASS CHANGE
    // ========================================================

    const handleClassChange = (e) => {
        const classId =
            e.target.value;

        setSelectedClass(classId);

        setSelectedSubject("");

        setStudents([]);
        setAttendanceStatus({});

        setError("");
        setSuccess("");
    };

    // ========================================================
    // SUBJECT CHANGE
    // ========================================================

    const handleSubjectChange = async (e) => {
        const subjectId =
            e.target.value;

        setSelectedSubject(subjectId);

        setStudents([]);
        setAttendanceStatus({});

        setError("");
        setSuccess("");

        if (!selectedClass || !subjectId) {
            return;
        }

        // ----------------------------------------------------
        // CLASS VALUE
        //
        // course_department_year
        // ----------------------------------------------------

        const selectedParts =
            selectedClass.split("_");

        const courseId =
            selectedParts[0];

        const departmentId =
            selectedParts[1];

        const year =
            selectedParts[2];

        await loadStudents(
            courseId,
            departmentId,
            year
        );
    };

    // ========================================================
    // STATUS CHANGE
    // ========================================================

    const handleStatusChange = (
        studentId,
        status
    ) => {
        setAttendanceStatus(
            (previous) => ({
                ...previous,
                [studentId]: status
            })
        );
    };

    // ========================================================
    // MARK ALL PRESENT
    // ========================================================

    const markAllPresent = () => {
        const status = {};

        students.forEach((student) => {
            status[student.id] =
                "PRESENT";
        });

        setAttendanceStatus(status);
    };

    // ========================================================
    // MARK ALL ABSENT
    // ========================================================

    const markAllAbsent = () => {
        const status = {};

        students.forEach((student) => {
            status[student.id] =
                "ABSENT";
        });

        setAttendanceStatus(status);
    };

    // ========================================================
    // SAVE ATTENDANCE
    // ========================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        // ----------------------------------------------------
        // VALIDATION
        // ----------------------------------------------------

        if (!selectedClass) {
            setError(
                "Please select a class."
            );

            return;
        }

        if (!selectedSubject) {
            setError(
                "Please select a subject."
            );

            return;
        }

        if (!attendanceDate) {
            setError(
                "Please select attendance date."
            );

            return;
        }

        if (students.length === 0) {
            setError(
                "No students found."
            );

            return;
        }

        // ----------------------------------------------------
        // ATTENDANCE RECORDS
        // ----------------------------------------------------

        const records =
            students.map((student) => ({
                student: student.id,

                status:
                    attendanceStatus[
                        student.id
                    ] || "PRESENT"
            }));

        // ----------------------------------------------------
        // PAYLOAD
        // ----------------------------------------------------

        const payload = {
            subject:
                Number(selectedSubject),

            date:
                attendanceDate,

            records
        };

        console.log(
            "Attendance Payload:",
            payload
        );

        // ----------------------------------------------------
        // SAVE
        // ----------------------------------------------------

        try {
            setSaving(true);

            const response =
                await api.post(
                    "attendance/bulk/",
                    payload
                );

            console.log(
                "Attendance Response:",
                response.data
            );

            setSuccess(
                "Attendance marked successfully."
            );
        } catch (error) {
            console.error(
                "Attendance save error:",
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
                    "Unable to save attendance."
                );
            } else {
                setError(
                    "Unable to save attendance."
                );
            }
        } finally {
            setSaving(false);
        }
    };

    // ========================================================
    // SELECTED CLASS DETAILS
    // ========================================================

    const selectedParts = useMemo(() => {
        if (!selectedClass) {
            return [];
        }

        return selectedClass.split("_");
    }, [selectedClass]);

    const selectedCourseId =
        selectedParts[0] || "";

    const selectedDepartmentId =
        selectedParts[1] || "";

    const selectedYear =
        selectedParts[2] || "";

    const selectedClassData = useMemo(() => {
        return classes.find(
            (item) =>
                String(item.course) ===
                    String(selectedCourseId) &&

                String(item.department) ===
                    String(selectedDepartmentId) &&

                String(item.year) ===
                    String(selectedYear)
        );
    }, [
        classes,
        selectedCourseId,
        selectedDepartmentId,
        selectedYear
    ]);

    // ========================================================
    // INITIAL LOADING
    // ========================================================

    if (
        loading &&
        classes.length === 0
    ) {
        return (
            <div className="staff-page">
                <div className="loading-state">
                    Loading attendance classes...
                </div>
            </div>
        );
    }

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
                        Staff Attendance
                    </h1>

                    <p>
                        Mark and manage student attendance
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
                ATTENDANCE SELECTION
            ================================================= */}

            <section className="page-section">

                <div className="section-header">

                    <div>
                        <h2>
                            Attendance Details
                        </h2>

                        <p>
                            Select class, subject and attendance date
                        </p>
                    </div>

                </div>

                {/* ------------------------------------------------
                    CLASS
                ------------------------------------------------ */}

                <div className="form-group">

                    <label>
                        Select Class
                    </label>

                    <select
                        value={selectedClass}
                        onChange={
                            handleClassChange
                        }
                    >

                        <option value="">
                            Select Class
                        </option>

                        {classes.map((item) => (

                            <option
                                key={
                                    `${item.course}_${item.department}_${item.year}`
                                }
                                value={
                                    `${item.course}_${item.department}_${item.year}`
                                }
                            >
                                {
                                    item.course_name ||
                                    "-"
                                }

                                {" - "}

                                {
                                    item.department_name ||
                                    "-"
                                }

                                {" - Year "}

                                {
                                    item.year
                                }
                            </option>

                        ))}

                    </select>

                </div>

                {/* ------------------------------------------------
                    SUBJECT
                ------------------------------------------------ */}

                {selectedClassData && (

                    <div className="form-group">

                        <label>
                            Select Subject
                        </label>

                        <select
                            value={selectedSubject}
                            onChange={
                                handleSubjectChange
                            }
                        >

                            <option value="">
                                Select Subject
                            </option>

                            {(
                                selectedClassData.subjects ||
                                []
                            ).map(
                                (subject) => (

                                    <option
                                        key={
                                            subject.id
                                        }
                                        value={
                                            subject.id
                                        }
                                    >
                                        {
                                            subject.name
                                        }

                                        {" - "}

                                        {
                                            subject.code
                                        }
                                    </option>

                                )
                            )}

                        </select>

                    </div>

                )}

                {/* ------------------------------------------------
                    DATE
                ------------------------------------------------ */}

                <div className="form-group">

                    <label>
                        Attendance Date
                    </label>

                    <input
                        type="date"
                        value={
                            attendanceDate
                        }
                        onChange={(e) =>
                            setAttendanceDate(
                                e.target.value
                            )
                        }
                    />

                </div>

                {/* ------------------------------------------------
                    CLASS DETAILS
                ------------------------------------------------ */}

                {selectedClassData && (

                    <div className="selection-details">

                        <p>
                            <strong>
                                Course / Class:
                            </strong>{" "}
                            {
                                selectedClassData.course_name ||
                                "-"
                            }
                        </p>

                        <p>
                            <strong>
                                Department:
                            </strong>{" "}
                            {
                                selectedClassData.department_name ||
                                "-"
                            }
                        </p>

                        <p>
                            <strong>
                                Year:
                            </strong>{" "}
                            {
                                selectedClassData.year ??
                                "-"
                            }
                        </p>

                    </div>

                )}

            </section>

            {/* =================================================
                STUDENTS
            ================================================= */}

            {selectedSubject && (

                <section className="page-section">

                    <div className="section-header">

                        <div>
                            <h2>
                                Students
                            </h2>

                            <p>
                                Mark attendance for each student
                            </p>
                        </div>

                    </div>

                    {/* ------------------------------------------------
                        BULK ACTIONS
                    ------------------------------------------------ */}

                    <div className="toolbar">

                        <button
                            type="button"
                            onClick={
                                markAllPresent
                            }
                            disabled={
                                students.length === 0
                            }
                        >
                            Mark All Present
                        </button>

                        <button
                            type="button"
                            onClick={
                                markAllAbsent
                            }
                            disabled={
                                students.length === 0
                            }
                        >
                            Mark All Absent
                        </button>

                    </div>

                    {/* ------------------------------------------------
                        STUDENT LOADING
                    ------------------------------------------------ */}

                    {loading ? (

                        <div className="loading-state">
                            Loading students...
                        </div>

                    ) : students.length === 0 ? (

                        <div className="empty-state">
                            No students found for this class.
                        </div>

                    ) : (

                        <form
                            onSubmit={
                                handleSubmit
                            }
                        >

                            <div className="table-wrapper">

                                <table>

                                    <thead>

                                        <tr>

                                            <th>
                                                #
                                            </th>

                                            <th>
                                                Student
                                            </th>

                                            <th>
                                                Email
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
                                                Status
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {students.map(
                                            (
                                                student,
                                                index
                                            ) => (

                                                <tr
                                                    key={
                                                        student.id
                                                    }
                                                >

                                                    <td>
                                                        {
                                                            index + 1
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            student.name ||
                                                            student.student_name ||
                                                            "-"
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            student.email ||
                                                            "-"
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            student.course_name ||
                                                            selectedClassData?.course_name ||
                                                            "-"
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            student.department_name ||
                                                            selectedClassData?.department_name ||
                                                            "-"
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            student.current_year ??
                                                            student.year ??
                                                            selectedClassData?.year ??
                                                            "-"
                                                        }
                                                    </td>

                                                    <td>

                                                        <select
                                                            value={
                                                                attendanceStatus[
                                                                    student.id
                                                                ] ||
                                                                "PRESENT"
                                                            }
                                                            onChange={(e) =>
                                                                handleStatusChange(
                                                                    student.id,
                                                                    e.target.value
                                                                )
                                                            }
                                                        >

                                                            <option value="PRESENT">
                                                                Present
                                                            </option>

                                                            <option value="ABSENT">
                                                                Absent
                                                            </option>

                                                        </select>

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                            {/* ------------------------------------------------
                                SAVE
                            ------------------------------------------------ */}

                            <div className="form-actions">

                                <button
                                    type="submit"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Saving..."
                                        : "Mark Attendance"}
                                </button>

                            </div>

                        </form>

                    )}

                </section>

            )}

        </div>
    );
}

export default StaffAttendance;