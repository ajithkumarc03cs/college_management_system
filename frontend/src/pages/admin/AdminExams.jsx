// import { useEffect, useMemo, useState } from "react";
// import api from "../../api/axios";


// const getApiError = (err, fallback) => {

//     const data = err?.response?.data;

//     if (!data) {
//         return fallback;
//     }

//     if (typeof data === "string") {
//         return data;
//     }

//     if (data.detail) {
//         return data.detail;
//     }

//     const messages = [];

//     Object.entries(data).forEach(([field, value]) => {

//         if (Array.isArray(value)) {
//             messages.push(`${field}: ${value.join(", ")}`);
//         } else {
//             messages.push(`${field}: ${value}`);
//         }

//     });

//     return messages.length
//         ? messages.join(" | ")
//         : fallback;
// };


// function AdminExams() {

//     // ============================================================
//     // DATA
//     // ============================================================

//     const [exams, setExams] = useState([]);

//     const [courses, setCourses] = useState([]);

//     const [departments, setDepartments] = useState([]);

//     const [subjects, setSubjects] = useState([]);


//     // ============================================================
//     // FORM
//     // ============================================================

//     const initialForm = {
//         name: "",
//         subject: "",
//         course: "",
//         department: "",
//         year: "",
//         exam_date: "",
//         start_time: "",
//         end_time: "",
//     };


//     const [form, setForm] = useState(initialForm);


//     // ============================================================
//     // STATES
//     // ============================================================

//     const [editingId, setEditingId] = useState(null);

//     const [loading, setLoading] = useState(false);

//     const [saving, setSaving] = useState(false);

//     const [error, setError] = useState("");

//     const [success, setSuccess] = useState("");

//     const [search, setSearch] = useState("");

//     const [examType, setExamType] = useState("all");


//     // ============================================================
//     // LOAD EXAMS
//     // ============================================================

//     const loadExams = async () => {

//         try {

//             setLoading(true);

//             setError("");

//             const response = await api.get("/exams/");

//             setExams(
//                 Array.isArray(response.data)
//                     ? response.data
//                     : response.data.results || []
//             );

//         } catch (err) {

//             console.error(err);

//             setError(
//                 getApiError(
//                     err,
//                     "Failed to load exams."
//                 )
//             );

//         } finally {

//             setLoading(false);

//         }
//     };


//     // ============================================================
//     // LOAD OPTIONS
//     // ============================================================

//     const loadOptions = async () => {

//         try {

//             const response = await api.get(
//                 "/staff/exam-filter-options/"
//             );

//             const data = response.data || {};

//             setCourses(data.courses || []);

//             setDepartments(data.departments || []);

//             setSubjects(data.subjects || []);

//         } catch (err) {

//             console.error(err);

//             setError(
//                 getApiError(
//                     err,
//                     "Failed to load exam options."
//                 )
//             );
//         }
//     };


//     // ============================================================
//     // INITIAL LOAD
//     // ============================================================

//     useEffect(() => {

//         loadExams();

//         loadOptions();

//     }, []);


//     // ============================================================
//     // INPUT CHANGE
//     // ============================================================

//     const handleChange = (event) => {

//         const {
//             name,
//             value
//         } = event.target;

//         setForm((previous) => ({
//             ...previous,
//             [name]: value,
//         }));

//         setError("");

//         setSuccess("");
//     };


//     // ============================================================
//     // SUBJECT CHANGE
//     // ============================================================

//     const handleSubjectChange = (event) => {

//         const subjectId = event.target.value;

//         const selectedSubject = subjects.find(
//             (subject) =>
//                 String(subject.id) === String(subjectId)
//         );


//         if (!selectedSubject) {

//             setForm((previous) => ({
//                 ...previous,

//                 subject: "",

//                 course: "",

//                 department: "",

//                 year: "",
//             }));

//             return;
//         }


//         setForm((previous) => ({
//             ...previous,

//             subject: selectedSubject.id,

//             course:
//                 selectedSubject.course_id ??
//                 selectedSubject.course ??
//                 "",

//             department:
//                 selectedSubject.department_id ??
//                 selectedSubject.department ??
//                 "",

//             year:
//                 selectedSubject.year ??
//                 "",
//         }));

//         setError("");

//         setSuccess("");
//     };


//     // ============================================================
//     // RESET FORM
//     // ============================================================

//     const resetForm = () => {

//         setForm(initialForm);

//         setEditingId(null);

//         setError("");

//         setSuccess("");
//     };


//     // ============================================================
//     // CREATE / UPDATE
//     // ============================================================

//     const handleSubmit = async (event) => {

//         event.preventDefault();

//         setError("");

//         setSuccess("");


//         // --------------------------------------------------------
//         // VALIDATION
//         // --------------------------------------------------------

//         if (!form.name.trim()) {

//             setError("Exam name is required.");

//             return;
//         }


//         if (!form.subject) {

//             setError("Subject is required.");

//             return;
//         }


//         if (!form.course) {

//             setError("Course is required.");

//             return;
//         }


//         if (!form.department) {

//             setError("Department is required.");

//             return;
//         }


//         if (!form.year) {

//             setError("Year is required.");

//             return;
//         }


//         if (!form.exam_date) {

//             setError("Exam date is required.");

//             return;
//         }


//         if (!form.start_time) {

//             setError("Start time is required.");

//             return;
//         }


//         if (!form.end_time) {

//             setError("End time is required.");

//             return;
//         }


//         if (form.start_time >= form.end_time) {

//             setError(
//                 "End time must be greater than start time."
//             );

//             return;
//         }


//         // --------------------------------------------------------
//         // PAYLOAD
//         // --------------------------------------------------------

//         const payload = {

//             name: form.name.trim(),

//             subject: Number(form.subject),

//             course: Number(form.course),

//             department: Number(form.department),

//             year: Number(form.year),

//             exam_date: form.exam_date,

//             start_time: form.start_time,

//             end_time: form.end_time,
//         };


//         try {

//             setSaving(true);


//             // ----------------------------------------------------
//             // UPDATE
//             // ----------------------------------------------------

//             if (editingId) {

//                 await api.patch(
//                     `/exams/${editingId}/`,
//                     payload
//                 );

//                 setSuccess(
//                     "Exam updated successfully."
//                 );

//             }


//             // ----------------------------------------------------
//             // CREATE
//             // ----------------------------------------------------

//             else {

//                 await api.post(
//                     "/exams/",
//                     payload
//                 );

//                 setSuccess(
//                     "Exam created successfully."
//                 );
//             }


//             resetForm();

//             await loadExams();

//         } catch (err) {

//             console.error(err);

//             setError(
//                 getApiError(
//                     err,
//                     editingId
//                         ? "Failed to update exam."
//                         : "Failed to create exam."
//                 )
//             );

//         } finally {

//             setSaving(false);
//         }
//     };


//     // ============================================================
//     // EDIT
//     // ============================================================

//     const handleEdit = (exam) => {

//         setEditingId(exam.id);


//         setForm({

//             name: exam.name || "",

//             subject: exam.subject || "",

//             course: exam.course || "",

//             department: exam.department || "",

//             year: exam.year || "",

//             exam_date: exam.exam_date || "",

//             start_time: exam.start_time
//                 ? exam.start_time.slice(0, 5)
//                 : "",

//             end_time: exam.end_time
//                 ? exam.end_time.slice(0, 5)
//                 : "",
//         });


//         setError("");

//         setSuccess("");
//     };


//     // ============================================================
//     // DELETE
//     // ============================================================

//     const handleDelete = async (exam) => {

//         const confirmed = window.confirm(
//             `Are you sure you want to delete "${exam.name}"?`
//         );


//         if (!confirmed) {
//             return;
//         }


//         try {

//             setError("");

//             setSuccess("");


//             await api.delete(
//                 `/exams/${exam.id}/`
//             );


//             setSuccess(
//                 "Exam deleted successfully."
//             );


//             if (editingId === exam.id) {

//                 resetForm();
//             }


//             await loadExams();

//         } catch (err) {

//             console.error(err);

//             setError(
//                 getApiError(
//                     err,
//                     "Failed to delete exam."
//                 )
//             );
//         }
//     };


//     // ============================================================
//     // FILTER
//     // ============================================================

//     const filteredExams = useMemo(() => {

//         let result = [...exams];


//         const searchText =
//             search.trim().toLowerCase();


//         if (searchText) {

//             result = result.filter(
//                 (exam) =>

//                     exam.name
//                         ?.toLowerCase()
//                         .includes(searchText)

//                     ||

//                     exam.subject_name
//                         ?.toLowerCase()
//                         .includes(searchText)

//                     ||

//                     exam.course_name
//                         ?.toLowerCase()
//                         .includes(searchText)

//                     ||

//                     exam.department_name
//                         ?.toLowerCase()
//                         .includes(searchText)
//             );
//         }


//         const today =
//             new Date()
//                 .toISOString()
//                 .split("T")[0];


//         if (examType === "upcoming") {

//             result = result.filter(
//                 (exam) =>
//                     exam.exam_date >= today
//             );
//         }


//         if (examType === "completed") {

//             result = result.filter(
//                 (exam) =>
//                     exam.exam_date < today
//             );
//         }


//         return result;

//     }, [
//         exams,
//         search,
//         examType,
//     ]);


//     // ============================================================
//     // RENDER
//     // ============================================================

//     return (

//         <div>

//             <h1>
//                 Admin Exams
//             </h1>


//             {/* ==================================================
//                 MESSAGE
//             ================================================== */}

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


//             {/* ==================================================
//                 ADD / EDIT FORM
//             ================================================== */}

//             <h2>
//                 {editingId
//                     ? "Edit Exam"
//                     : "Add Exam"}
//             </h2>


//             <form onSubmit={handleSubmit}>

//                 <div>

//                     <label>
//                         Exam Name
//                     </label>

//                     <input
//                         type="text"
//                         name="name"
//                         value={form.name}
//                         onChange={handleChange}
//                         placeholder="Exam name"
//                     />

//                 </div>


//                 <div>

//                     <label>
//                         Subject
//                     </label>

//                     <select
//                         name="subject"
//                         value={form.subject}
//                         onChange={handleSubjectChange}
//                     >

//                         <option value="">
//                             Select Subject
//                         </option>

//                         {subjects.map(
//                             (subject) => (

//                                 <option
//                                     key={subject.id}
//                                     value={subject.id}
//                                 >
//                                     {subject.name}
//                                     {subject.code
//                                         ? ` (${subject.code})`
//                                         : ""}
//                                 </option>

//                             )
//                         )}

//                     </select>

//                 </div>


//                 <div>

//                     <label>
//                         Course
//                     </label>

//                     <select
//                         name="course"
//                         value={form.course}
//                         onChange={handleChange}
//                     >

//                         <option value="">
//                             Select Course
//                         </option>

//                         {courses.map(
//                             (course) => (

//                                 <option
//                                     key={course.id}
//                                     value={course.id}
//                                 >
//                                     {course.name}
//                                     {course.code
//                                         ? ` (${course.code})`
//                                         : ""}
//                                 </option>

//                             )
//                         )}

//                     </select>

//                 </div>


//                 <div>

//                     <label>
//                         Department
//                     </label>

//                     <select
//                         name="department"
//                         value={form.department}
//                         onChange={handleChange}
//                     >

//                         <option value="">
//                             Select Department
//                         </option>

//                         {departments.map(
//                             (department) => (

//                                 <option
//                                     key={department.id}
//                                     value={department.id}
//                                 >
//                                     {department.name}
//                                 </option>

//                             )
//                         )}

//                     </select>

//                 </div>


//                 <div>

//                     <label>
//                         Year
//                     </label>

//                     <select
//                         name="year"
//                         value={form.year}
//                         onChange={handleChange}
//                     >

//                         <option value="">
//                             Select Year
//                         </option>

//                         <option value="1">
//                             1st Year
//                         </option>

//                         <option value="2">
//                             2nd Year
//                         </option>

//                         <option value="3">
//                             3rd Year
//                         </option>

//                         <option value="4">
//                             4th Year
//                         </option>

//                     </select>

//                 </div>


//                 <div>

//                     <label>
//                         Exam Date
//                     </label>

//                     <input
//                         type="date"
//                         name="exam_date"
//                         value={form.exam_date}
//                         onChange={handleChange}
//                     />

//                 </div>


//                 <div>

//                     <label>
//                         Start Time
//                     </label>

//                     <input
//                         type="time"
//                         name="start_time"
//                         value={form.start_time}
//                         onChange={handleChange}
//                     />

//                 </div>


//                 <div>

//                     <label>
//                         End Time
//                     </label>

//                     <input
//                         type="time"
//                         name="end_time"
//                         value={form.end_time}
//                         onChange={handleChange}
//                     />

//                 </div>


//                 <button
//                     type="submit"
//                     disabled={saving}
//                 >
//                     {saving
//                         ? "Saving..."
//                         : editingId
//                             ? "Update Exam"
//                             : "Add Exam"}
//                 </button>


//                 {editingId && (

//                     <button
//                         type="button"
//                         onClick={resetForm}
//                     >
//                         Cancel
//                     </button>

//                 )}

//             </form>


//             {/* ==================================================
//                 SEARCH / FILTER
//             ================================================== */}

//             <hr />

//             <h2>
//                 Exam List
//             </h2>


//             <input
//                 type="text"
//                 placeholder="Search exams..."
//                 value={search}
//                 onChange={(event) =>
//                     setSearch(event.target.value)
//                 }
//             />


//             <select
//                 value={examType}
//                 onChange={(event) =>
//                     setExamType(event.target.value)
//                 }
//             >

//                 <option value="all">
//                     All
//                 </option>

//                 <option value="upcoming">
//                     Upcoming
//                 </option>

//                 <option value="completed">
//                     Completed
//                 </option>

//             </select>


//             {/* ==================================================
//                 LIST
//             ================================================== */}

//             {loading ? (

//                 <p>
//                     Loading...
//                 </p>

//             ) : filteredExams.length === 0 ? (

//                 <p>
//                     No exams found.
//                 </p>

//             ) : (

//                 <table>

//                     <thead>

//                         <tr>

//                             <th>
//                                 #
//                             </th>

//                             <th>
//                                 Exam
//                             </th>

//                             <th>
//                                 Subject
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
//                                 Date
//                             </th>

//                             <th>
//                                 Time
//                             </th>

//                             <th>
//                                 Actions
//                             </th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {filteredExams.map(
//                             (exam, index) => (

//                                 <tr
//                                     key={exam.id}
//                                 >

//                                     <td>
//                                         {index + 1}
//                                     </td>

//                                     <td>
//                                         {exam.name}
//                                     </td>

//                                     <td>
//                                         {exam.subject_name}
//                                     </td>

//                                     <td>
//                                         {exam.course_name}
//                                     </td>

//                                     <td>
//                                         {exam.department_name}
//                                     </td>

//                                     <td>
//                                         {exam.year}
//                                     </td>

//                                     <td>
//                                         {exam.exam_date}
//                                     </td>

//                                     <td>
//                                         {exam.start_time}
//                                         {" - "}
//                                         {exam.end_time}
//                                     </td>

//                                     <td>

//                                         <button
//                                             type="button"
//                                             onClick={() =>
//                                                 handleEdit(exam)
//                                             }
//                                         >
//                                             Edit
//                                         </button>


//                                         <button
//                                             type="button"
//                                             onClick={() =>
//                                                 handleDelete(exam)
//                                             }
//                                         >
//                                             Delete
//                                         </button>

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


// export default AdminExams;



import { useEffect, useMemo, useState } from "react";

import api from "../../api/axios";


const getApiError = (err, fallback) => {

    const data = err?.response?.data;

    if (!data) {
        return fallback;
    }

    if (typeof data === "string") {
        return data;
    }

    if (data.detail) {
        return data.detail;
    }

    const messages = [];

    Object.entries(data).forEach(([field, value]) => {

        if (Array.isArray(value)) {
            messages.push(`${field}: ${value.join(", ")}`);
        } else {
            messages.push(`${field}: ${value}`);
        }

    });

    return messages.length
        ? messages.join(" | ")
        : fallback;
};


function AdminExams() {

    // ========================================================
    // DATA
    // ========================================================

    const [exams, setExams] = useState([]);
    const [courses, setCourses] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [subjects, setSubjects] = useState([]);


    // ========================================================
    // FORM
    // ========================================================

    const initialForm = {
        name: "",
        subject: "",
        course: "",
        department: "",
        year: "",
        exam_date: "",
        start_time: "",
        end_time: "",
    };

    const [form, setForm] = useState(initialForm);


    // ========================================================
    // STATES
    // ========================================================

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [search, setSearch] = useState("");
    const [examType, setExamType] = useState("all");


    // ========================================================
    // LOAD EXAMS
    // ========================================================

    const loadExams = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get("/exams/");

            setExams(
                Array.isArray(response.data)
                    ? response.data
                    : response.data.results || []
            );

        } catch (err) {

            console.error(err);

            setError(
                getApiError(
                    err,
                    "Failed to load exams."
                )
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // LOAD OPTIONS
    // ========================================================

    const loadOptions = async () => {

        try {

            const response = await api.get(
                "/staff/exam-filter-options/"
            );

            const data = response.data || {};

            setCourses(data.courses || []);
            setDepartments(data.departments || []);
            setSubjects(data.subjects || []);

        } catch (err) {

            console.error(err);

            setError(
                getApiError(
                    err,
                    "Failed to load exam options."
                )
            );

        }

    };


    // ========================================================
    // INITIAL LOAD
    // ========================================================

    useEffect(() => {

        loadExams();
        loadOptions();

    }, []);


    // ========================================================
    // INPUT CHANGE
    // ========================================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value
        }));

        setError("");
        setSuccess("");

    };


    // ========================================================
    // SUBJECT CHANGE
    // ========================================================

    const handleSubjectChange = (event) => {

        const subjectId = event.target.value;

        const selectedSubject = subjects.find(
            (subject) =>
                String(subject.id) === String(subjectId)
        );


        if (!selectedSubject) {

            setForm((previous) => ({
                ...previous,
                subject: "",
                course: "",
                department: "",
                year: ""
            }));

            return;

        }


        setForm((previous) => ({
            ...previous,

            subject: selectedSubject.id,

            course:
                selectedSubject.course_id ??
                selectedSubject.course ??
                "",

            department:
                selectedSubject.department_id ??
                selectedSubject.department ??
                "",

            year:
                selectedSubject.year ??
                ""
        }));

        setError("");
        setSuccess("");

    };


    // ========================================================
    // RESET FORM
    // ========================================================

    const resetForm = () => {

        setForm(initialForm);

        setEditingId(null);

        setError("");
        setSuccess("");

    };


    // ========================================================
    // CREATE / UPDATE
    // ========================================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");


        // ----------------------------------------------------
        // VALIDATION
        // ----------------------------------------------------

        if (!form.name.trim()) {

            setError("Exam name is required.");
            return;

        }

        if (!form.subject) {

            setError("Subject is required.");
            return;

        }

        if (!form.course) {

            setError("Course is required.");
            return;

        }

        if (!form.department) {

            setError("Department is required.");
            return;

        }

        if (!form.year) {

            setError("Year is required.");
            return;

        }

        if (!form.exam_date) {

            setError("Exam date is required.");
            return;

        }

        if (!form.start_time) {

            setError("Start time is required.");
            return;

        }

        if (!form.end_time) {

            setError("End time is required.");
            return;

        }

        if (form.start_time >= form.end_time) {

            setError(
                "End time must be greater than start time."
            );

            return;

        }


        // ----------------------------------------------------
        // PAYLOAD
        // ----------------------------------------------------

        const payload = {

            name: form.name.trim(),

            subject: Number(form.subject),

            course: Number(form.course),

            department: Number(form.department),

            year: Number(form.year),

            exam_date: form.exam_date,

            start_time: form.start_time,

            end_time: form.end_time

        };


        try {

            setSaving(true);


            if (editingId) {

                await api.patch(
                    `/exams/${editingId}/`,
                    payload
                );

                setSuccess(
                    "Exam updated successfully."
                );

            } else {

                await api.post(
                    "/exams/",
                    payload
                );

                setSuccess(
                    "Exam created successfully."
                );

            }


            resetForm();

            await loadExams();

        } catch (err) {

            console.error(err);

            setError(
                getApiError(
                    err,
                    editingId
                        ? "Failed to update exam."
                        : "Failed to create exam."
                )
            );

        } finally {

            setSaving(false);

        }

    };


    // ========================================================
    // EDIT
    // ========================================================

    const handleEdit = (exam) => {

        setEditingId(exam.id);

        setForm({

            name: exam.name || "",

            subject: exam.subject || "",

            course: exam.course || "",

            department: exam.department || "",

            year: exam.year || "",

            exam_date: exam.exam_date || "",

            start_time: exam.start_time
                ? exam.start_time.slice(0, 5)
                : "",

            end_time: exam.end_time
                ? exam.end_time.slice(0, 5)
                : ""

        });

        setError("");
        setSuccess("");

    };


    // ========================================================
    // DELETE
    // ========================================================

    const handleDelete = async (exam) => {

        const confirmed = window.confirm(
            `Are you sure you want to delete "${exam.name}"?`
        );


        if (!confirmed) {
            return;
        }


        try {

            setError("");
            setSuccess("");

            await api.delete(
                `/exams/${exam.id}/`
            );

            setSuccess(
                "Exam deleted successfully."
            );


            if (editingId === exam.id) {
                resetForm();
            }

            await loadExams();

        } catch (err) {

            console.error(err);

            setError(
                getApiError(
                    err,
                    "Failed to delete exam."
                )
            );

        }

    };


    // ========================================================
    // FILTER
    // ========================================================

    const filteredExams = useMemo(() => {

        let result = [...exams];

        const searchText =
            search.trim().toLowerCase();


        if (searchText) {

            result = result.filter(
                (exam) =>

                    exam.name
                        ?.toLowerCase()
                        .includes(searchText)

                    ||

                    exam.subject_name
                        ?.toLowerCase()
                        .includes(searchText)

                    ||

                    exam.course_name
                        ?.toLowerCase()
                        .includes(searchText)

                    ||

                    exam.department_name
                        ?.toLowerCase()
                        .includes(searchText)
            );

        }


        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        if (examType === "upcoming") {

            result = result.filter(
                (exam) =>
                    exam.exam_date >= today
            );

        }


        if (examType === "completed") {

            result = result.filter(
                (exam) =>
                    exam.exam_date < today
            );

        }


        return result;

    }, [
        exams,
        search,
        examType
    ]);


    // ========================================================
    // UI
    // ========================================================

    return (

        <div className="admin-page admin-exams-page">

            {/* PAGE HEADER */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Admin Exams
                    </h1>

                    <p>
                        Create and manage examinations
                    </p>

                </div>

            </div>


            {/* ALERTS */}

            {error && (

                <div className="admin-alert admin-alert-error">
                    {error}
                </div>

            )}

            {success && (

                <div className="admin-alert admin-alert-success">
                    {success}
                </div>

            )}


            {/* ADD / EDIT FORM */}

            <div className="admin-form-card">

                <div className="admin-section-header">

                    <h2>
                        {editingId
                            ? "Edit Exam"
                            : "Add Exam"}
                    </h2>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="admin-form-grid">

                        {/* EXAM NAME */}

                        <div className="admin-form-group">

                            <label>
                                Exam Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Exam name"
                            />

                        </div>


                        {/* SUBJECT */}

                        <div className="admin-form-group">

                            <label>
                                Subject
                            </label>

                            <select
                                name="subject"
                                value={form.subject}
                                onChange={handleSubjectChange}
                            >

                                <option value="">
                                    Select Subject
                                </option>

                                {subjects.map(
                                    (subject) => (

                                        <option
                                            key={subject.id}
                                            value={subject.id}
                                        >
                                            {subject.name}

                                            {subject.code
                                                ? ` (${subject.code})`
                                                : ""}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* COURSE */}

                        <div className="admin-form-group">

                            <label>
                                Course
                            </label>

                            <select
                                name="course"
                                value={form.course}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Course
                                </option>

                                {courses.map(
                                    (course) => (

                                        <option
                                            key={course.id}
                                            value={course.id}
                                        >
                                            {course.name}

                                            {course.code
                                                ? ` (${course.code})`
                                                : ""}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* DEPARTMENT */}

                        <div className="admin-form-group">

                            <label>
                                Department
                            </label>

                            <select
                                name="department"
                                value={form.department}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Department
                                </option>

                                {departments.map(
                                    (department) => (

                                        <option
                                            key={department.id}
                                            value={department.id}
                                        >
                                            {department.name}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* YEAR */}

                        <div className="admin-form-group">

                            <label>
                                Year
                            </label>

                            <select
                                name="year"
                                value={form.year}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Year
                                </option>

                                <option value="1">
                                    1st Year
                                </option>

                                <option value="2">
                                    2nd Year
                                </option>

                                <option value="3">
                                    3rd Year
                                </option>

                                <option value="4">
                                    4th Year
                                </option>

                            </select>

                        </div>


                        {/* EXAM DATE */}

                        <div className="admin-form-group">

                            <label>
                                Exam Date
                            </label>

                            <input
                                type="date"
                                name="exam_date"
                                value={form.exam_date}
                                onChange={handleChange}
                            />

                        </div>


                        {/* START TIME */}

                        <div className="admin-form-group">

                            <label>
                                Start Time
                            </label>

                            <input
                                type="time"
                                name="start_time"
                                value={form.start_time}
                                onChange={handleChange}
                            />

                        </div>


                        {/* END TIME */}

                        <div className="admin-form-group">

                            <label>
                                End Time
                            </label>

                            <input
                                type="time"
                                name="end_time"
                                value={form.end_time}
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    {/* FORM ACTIONS */}

                    <div className="admin-form-actions">

                        <button
                            type="submit"
                            className="admin-primary-btn"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : editingId
                                    ? "Update Exam"
                                    : "Add Exam"}
                        </button>


                        {editingId && (

                            <button
                                type="button"
                                className="admin-secondary-btn"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>

                        )}

                    </div>

                </form>

            </div>


            {/* SEARCH / FILTER */}

            <div className="admin-toolbar">

                <div className="admin-form-group">

                    <label>
                        Search
                    </label>

                    <input
                        type="text"
                        placeholder="Search exams..."
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                    />

                </div>


                <div className="admin-form-group">

                    <label>
                        Exam Type
                    </label>

                    <select
                        value={examType}
                        onChange={(event) =>
                            setExamType(
                                event.target.value
                            )
                        }
                    >

                        <option value="all">
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


            {/* EXAM LIST */}

            <div className="admin-table-card">

                {loading ? (

                    <div className="admin-loading-state">
                        Loading exams...
                    </div>

                ) : filteredExams.length === 0 ? (

                    <div className="admin-empty-state">
                        No exams found.
                    </div>

                ) : (

                    <div className="admin-table-wrapper">

                        <table className="admin-table">

                            <thead>

                                <tr>

                                    <th>#</th>
                                    <th>Exam</th>
                                    <th>Subject</th>
                                    <th>Course</th>
                                    <th>Department</th>
                                    <th>Year</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Actions</th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredExams.map(
                                    (exam, index) => (

                                        <tr
                                            key={exam.id}
                                        >

                                            <td>
                                                {index + 1}
                                            </td>

                                            <td>
                                                {exam.name}
                                            </td>

                                            <td>
                                                {exam.subject_name}
                                            </td>

                                            <td>
                                                {exam.course_name}
                                            </td>

                                            <td>
                                                {exam.department_name}
                                            </td>

                                            <td>
                                                {exam.year}
                                            </td>

                                            <td>
                                                {exam.exam_date}
                                            </td>

                                            <td>
                                                {exam.start_time}
                                                {" - "}
                                                {exam.end_time}
                                            </td>

                                            <td>

                                                <div className="admin-action-group">

                                                    <button
                                                        type="button"
                                                        className="admin-secondary-btn"
                                                        onClick={() =>
                                                            handleEdit(
                                                                exam
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        type="button"
                                                        className="admin-danger-btn"
                                                        onClick={() =>
                                                            handleDelete(
                                                                exam
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>

    );

}


export default AdminExams;