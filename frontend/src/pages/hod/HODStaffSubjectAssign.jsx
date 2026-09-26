// import { useEffect, useState } from "react";

// import api from "../../api/axios";


// function HODStaffSubjectAssign() {

//     const [staff, setStaff] = useState([]);

//     const [subjects, setSubjects] = useState([]);

//     const [assignments, setAssignments] = useState([]);

//     const [staffId, setStaffId] = useState("");

//     const [subjectId, setSubjectId] = useState("");

//     const [editingId, setEditingId] = useState(null);

//     const [error, setError] = useState("");

//     const [message, setMessage] = useState("");


//     // ========================================================
//     // LOAD DATA
//     // ========================================================

//     useEffect(() => {

//         loadStaff();

//         loadSubjects();

//         loadAssignments();

//     }, []);


//     // ========================================================
//     // LOAD STAFF
//     // ========================================================

//     const loadStaff = async () => {

//         try {

//             const response = await api.get(
//                 "hod/staff/"
//             );

//             setStaff(
//                 response.data.results || response.data
//             );

//         } catch (error) {

//             console.error(error);

//             setError(
//                 "Failed to load staff."
//             );
//         }
//     };


//     // ========================================================
//     // LOAD SUBJECTS
//     // ========================================================

//     const loadSubjects = async () => {

//         try {

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
//         }
//     };


//     // ========================================================
//     // LOAD ASSIGNMENTS
//     // ========================================================

//     const loadAssignments = async () => {

//         try {

//             const response = await api.get(
//                 "hod/staff/assignments/"
//             );

//             setAssignments(
//                 response.data.results || response.data
//             );

//         } catch (error) {

//             console.error(error);

//             setError(
//                 "Failed to load assignments."
//             );
//         }
//     };


//     // ========================================================
//     // SUBMIT
//     // ========================================================

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         setError("");

//         setMessage("");


//         // ====================================================
//         // VALIDATION
//         // ====================================================

//         if (!staffId) {

//             setError(
//                 "Please select a staff."
//             );

//             return;
//         }


//         if (!subjectId) {

//             setError(
//                 "Please select a subject."
//             );

//             return;
//         }


//         // ====================================================
//         // EDIT
//         // ====================================================

//         if (editingId !== null) {

//             try {

//                 await api.patch(
//                     `hod/staff/assignments/${editingId}/update/`,
//                     {
//                         staff: Number(staffId),
//                         subject: Number(subjectId)
//                     }
//                 );


//                 setMessage(
//                     "Assignment updated successfully."
//                 );


//                 // Reset form

//                 setStaffId("");

//                 setSubjectId("");

//                 setEditingId(null);


//                 // Reload table

//                 await loadAssignments();


//             } catch (error) {

//                 console.error(error);

//                 const data =
//                     error.response?.data;


//                 setError(

//                     data?.detail ||

//                     data?.non_field_errors?.[0] ||

//                     data?.staff?.[0] ||

//                     data?.subject?.[0] ||

//                     "Failed to update assignment."

//                 );
//             }

//             return;
//         }


//         // ====================================================
//         // CREATE
//         // ====================================================

//         try {

//             await api.post(

//                 "hod/staff/assign-subject/",

//                 {
//                     staff: Number(staffId),
//                     subject: Number(subjectId)
//                 }

//             );


//             setMessage(
//                 "Subject assigned successfully."
//             );


//             // Reset form

//             setStaffId("");

//             setSubjectId("");

//             setEditingId(null);


//             // Reload table

//             await loadAssignments();


//         } catch (error) {

//             console.error(error);

//             const data =
//                 error.response?.data;


//             setError(

//                 data?.detail ||

//                 data?.non_field_errors?.[0] ||

//                 data?.staff?.[0] ||

//                 data?.subject?.[0] ||

//                 "Failed to assign subject."

//             );
//         }

//     };


//     // ========================================================
//     // EDIT BUTTON
//     // ========================================================

//     const handleEdit = (assignment) => {

//         setError("");

//         setMessage("");


//         // Existing assignment ID

//         setEditingId(
//             assignment.id
//         );


//         // Existing staff

//         setStaffId(
//             String(assignment.staff)
//         );


//         // Existing subject

//         setSubjectId(
//             String(assignment.subject)
//         );

//     };


//     // ========================================================
//     // CANCEL EDIT
//     // ========================================================

//     const handleCancelEdit = () => {

//         setEditingId(null);

//         setStaffId("");

//         setSubjectId("");

//         setError("");

//         setMessage("");
//     };


//     // ========================================================
//     // REMOVE
//     // ========================================================

//     const handleRemove = async (id) => {

//         const confirmed = window.confirm(

//             "Are you sure you want to remove this subject assignment?"

//         );


//         if (!confirmed) {

//             return;
//         }


//         setError("");

//         setMessage("");


//         try {

//             await api.delete(

//                 `hod/staff/assignments/${id}/remove/`

//             );


//             setMessage(
//                 "Assignment removed successfully."
//             );


//             // If currently editing same row

//             if (editingId === id) {

//                 setEditingId(null);

//                 setStaffId("");

//                 setSubjectId("");
//             }


//             await loadAssignments();


//         } catch (error) {

//             console.error(error);


//             setError(

//                 error.response?.data?.detail ||

//                 "Failed to remove assignment."

//             );
//         }
//     };


//     // ========================================================
//     // UI
//     // ========================================================

//     return (

//         <div>

//             <h1>
//                 Staff Subject Assignment
//             </h1>


//             {/* ERROR */}

//             {error && (

//                 <p>
//                     {error}
//                 </p>

//             )}


//             {/* SUCCESS */}

//             {message && (

//                 <p>
//                     {message}
//                 </p>

//             )}


//             {/* =================================================
//                 FORM
//             ================================================= */}

//             <h2>

//                 {editingId !== null

//                     ? "Edit Assignment"

//                     : "Assign Subject"

//                 }

//             </h2>


//             <form onSubmit={handleSubmit}>

//                 {/* STAFF */}

//                 <div>

//                     <label>
//                         Staff
//                     </label>


//                     <select

//                         value={staffId}

//                         onChange={(e) =>
//                             setStaffId(
//                                 e.target.value
//                             )
//                         }

//                         required

//                     >

//                         <option value="">
//                             Select Staff
//                         </option>


//                         {staff.map((member) => (

//                             <option

//                                 key={member.id}

//                                 value={member.id}

//                             >

//                                 {member.username}

//                             </option>

//                         ))}

//                     </select>

//                 </div>


//                 {/* SUBJECT */}

//                 <div>

//                     <label>
//                         Subject
//                     </label>


//                     <select

//                         value={subjectId}

//                         onChange={(e) =>
//                             setSubjectId(
//                                 e.target.value
//                             )
//                         }

//                         required

//                     >

//                         <option value="">
//                             Select Subject
//                         </option>


//                         {subjects.map((subject) => (

//                             <option

//                                 key={subject.id}

//                                 value={subject.id}

//                             >

//                                 {subject.name}

//                             </option>

//                         ))}

//                     </select>

//                 </div>


//                 {/* SUBMIT */}

//                 <button type="submit">

//                     {editingId !== null

//                         ? "Update Assignment"

//                         : "Assign Subject"

//                     }

//                 </button>


//                 {/* CANCEL */}

//                 {editingId !== null && (

//                     <button

//                         type="button"

//                         onClick={
//                             handleCancelEdit
//                         }

//                     >

//                         Cancel

//                     </button>

//                 )}

//             </form>


//             {/* =================================================
//                 ASSIGNMENT TABLE
//             ================================================= */}

//             <h2>
//                 Current Assignments
//             </h2>


//             <table>

//                 <thead>

//                     <tr>

//                         <th>ID</th>

//                         <th>Staff</th>

//                         <th>Subject</th>

//                         <th>Code</th>

//                         <th>Course</th>

//                         <th>Department</th>

//                         <th>Action</th>

//                     </tr>

//                 </thead>


//                 <tbody>

//                     {assignments.length === 0 ? (

//                         <tr>

//                             <td colSpan="7">

//                                 No assignments found.

//                             </td>

//                         </tr>

//                     ) : (

//                         assignments.map(
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
//                                             assignment.staff_name ||

//                                             assignment.staff
//                                         }

//                                     </td>


//                                     <td>

//                                         {
//                                             assignment.subject_name ||

//                                             assignment.subject
//                                         }

//                                     </td>


//                                     <td>

//                                         {
//                                             assignment.subject_code ||

//                                             "-"
//                                         }

//                                     </td>


//                                     <td>

//                                         {
//                                             assignment.course_name ||

//                                             "-"
//                                         }

//                                     </td>


//                                     <td>

//                                         {
//                                             assignment.department_name ||

//                                             "-"
//                                         }

//                                     </td>


//                                     <td>

//                                         {/* EDIT */}

//                                         <button

//                                             type="button"

//                                             onClick={() =>
//                                                 handleEdit(
//                                                     assignment
//                                                 )
//                                             }

//                                         >

//                                             Edit

//                                         </button>


//                                         {/* REMOVE */}

//                                         <button

//                                             type="button"

//                                             onClick={() =>
//                                                 handleRemove(
//                                                     assignment.id
//                                                 )
//                                             }

//                                         >

//                                             Remove

//                                         </button>

//                                     </td>

//                                 </tr>

//                             )
//                         )

//                     )}

//                 </tbody>

//             </table>

//         </div>

//     );

// }


// export default HODStaffSubjectAssign;
import { useEffect, useState } from "react";

import api from "../../api/axios";


function HODStaffSubjectAssign() {

    const [staff, setStaff] = useState([]);

    const [subjects, setSubjects] = useState([]);

    const [assignments, setAssignments] = useState([]);

    const [staffId, setStaffId] = useState("");

    const [subjectId, setSubjectId] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [error, setError] = useState("");

    const [message, setMessage] = useState("");


    useEffect(() => {

        loadStaff();

        loadSubjects();

        loadAssignments();

    }, []);


    const loadStaff = async () => {

        try {

            const response = await api.get(
                "hod/staff/"
            );

            setStaff(
                response.data.results || response.data
            );

        } catch (error) {

            console.error(error);

            setError(
                "Failed to load staff."
            );

        }

    };


    const loadSubjects = async () => {

        try {

            const response = await api.get(
                "hod/subjects/"
            );

            setSubjects(
                response.data.results || response.data
            );

        } catch (error) {

            console.error(error);

            setError(
                "Failed to load subjects."
            );

        }

    };


    const loadAssignments = async () => {

        try {

            const response = await api.get(
                "hod/staff/assignments/"
            );

            setAssignments(
                response.data.results || response.data
            );

        } catch (error) {

            console.error(error);

            setError(
                "Failed to load assignments."
            );

        }

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setMessage("");


        if (!staffId) {

            setError(
                "Please select a staff."
            );

            return;

        }


        if (!subjectId) {

            setError(
                "Please select a subject."
            );

            return;

        }


        if (editingId !== null) {

            try {

                await api.patch(
                    `hod/staff/assignments/${editingId}/update/`,
                    {
                        staff: Number(staffId),
                        subject: Number(subjectId)
                    }
                );

                setMessage(
                    "Assignment updated successfully."
                );

                setStaffId("");
                setSubjectId("");
                setEditingId(null);

                await loadAssignments();

            } catch (error) {

                console.error(error);

                const data =
                    error.response?.data;

                setError(
                    data?.detail ||
                    data?.non_field_errors?.[0] ||
                    data?.staff?.[0] ||
                    data?.subject?.[0] ||
                    "Failed to update assignment."
                );

            }

            return;

        }


        try {

            await api.post(
                "hod/staff/assign-subject/",
                {
                    staff: Number(staffId),
                    subject: Number(subjectId)
                }
            );

            setMessage(
                "Subject assigned successfully."
            );

            setStaffId("");
            setSubjectId("");
            setEditingId(null);

            await loadAssignments();

        } catch (error) {

            console.error(error);

            const data =
                error.response?.data;

            setError(
                data?.detail ||
                data?.non_field_errors?.[0] ||
                data?.staff?.[0] ||
                data?.subject?.[0] ||
                "Failed to assign subject."
            );

        }

    };


    const handleEdit = (assignment) => {

        setError("");

        setMessage("");

        setEditingId(
            assignment.id
        );

        setStaffId(
            String(assignment.staff)
        );

        setSubjectId(
            String(assignment.subject)
        );

    };


    const handleCancelEdit = () => {

        setEditingId(null);

        setStaffId("");

        setSubjectId("");

        setError("");

        setMessage("");

    };


    const handleRemove = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to remove this subject assignment?"
        );

        if (!confirmed) {
            return;
        }

        setError("");

        setMessage("");

        try {

            await api.delete(
                `hod/staff/assignments/${id}/remove/`
            );

            setMessage(
                "Assignment removed successfully."
            );

            if (editingId === id) {

                setEditingId(null);

                setStaffId("");

                setSubjectId("");

            }

            await loadAssignments();

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.detail ||
                "Failed to remove assignment."
            );

        }

    };


    return (

        <div className="hod-page hod-assignment-page">

            {/* HEADER */}

            <div className="hod-page-header">

                <div>

                    <h1 className="hod-page-title">
                        Staff Subject Assignment
                    </h1>

                    <p className="hod-page-subtitle">
                        Assign subjects to department staff members
                    </p>

                </div>

            </div>


            {/* ERROR */}

            {error && (

                <div className="hod-alert hod-alert-error">

                    {error}

                </div>

            )}


            {/* SUCCESS */}

            {message && (

                <div className="hod-alert hod-alert-success">

                    {message}

                </div>

            )}


            {/* FORM */}

            <div className="hod-form-card">

                <div className="hod-form-header">

                    <div>

                        <h2>

                            {editingId !== null
                                ? "Edit Assignment"
                                : "Assign Subject"
                            }

                        </h2>

                        <p>
                            Select a staff member and subject
                        </p>

                    </div>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="hod-form-grid">

                        {/* STAFF */}

                        <div className="hod-field">

                            <label>
                                Staff
                            </label>

                            <select
                                className="hod-select"
                                value={staffId}
                                onChange={(e) =>
                                    setStaffId(e.target.value)
                                }
                                required
                            >

                                <option value="">
                                    Select Staff
                                </option>

                                {staff.map(
                                    (member) => (

                                        <option
                                            key={member.id}
                                            value={member.id}
                                        >
                                            {member.username}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* SUBJECT */}

                        <div className="hod-field">

                            <label>
                                Subject
                            </label>

                            <select
                                className="hod-select"
                                value={subjectId}
                                onChange={(e) =>
                                    setSubjectId(e.target.value)
                                }
                                required
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
                                        </option>

                                    )
                                )}

                            </select>

                        </div>

                    </div>


                    <div className="hod-form-actions">

                        <button
                            className="hod-btn hod-btn-primary"
                            type="submit"
                        >

                            {editingId !== null
                                ? "Update Assignment"
                                : "Assign Subject"
                            }

                        </button>


                        {editingId !== null && (

                            <button
                                className="hod-btn hod-btn-secondary"
                                type="button"
                                onClick={handleCancelEdit}
                            >
                                Cancel
                            </button>

                        )}

                    </div>

                </form>

            </div>


            {/* TABLE */}

            <div className="hod-section-heading">

                <div>

                    <h2>
                        Current Assignments
                    </h2>

                    <p>
                        Staff subject allocation records
                    </p>

                </div>

            </div>


            <div className="hod-table-card">

                <table className="hod-table">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Staff</th>
                            <th>Subject</th>
                            <th>Code</th>
                            <th>Course</th>
                            <th>Department</th>
                            <th>Action</th>

                        </tr>

                    </thead>


                    <tbody>

                        {assignments.length === 0 ? (

                            <tr>

                                <td colSpan="7">

                                    <div className="hod-table-empty">
                                        No assignments found.
                                    </div>

                                </td>

                            </tr>

                        ) : (

                            assignments.map(
                                (assignment) => (

                                    <tr
                                        key={assignment.id}
                                    >

                                        <td>
                                            {assignment.id}
                                        </td>

                                        <td>
                                            {
                                                assignment.staff_name ||
                                                assignment.staff
                                            }
                                        </td>

                                        <td>
                                            {
                                                assignment.subject_name ||
                                                assignment.subject
                                            }
                                        </td>

                                        <td>
                                            {
                                                assignment.subject_code ||
                                                "-"
                                            }
                                        </td>

                                        <td>
                                            {
                                                assignment.course_name ||
                                                "-"
                                            }
                                        </td>

                                        <td>
                                            {
                                                assignment.department_name ||
                                                "-"
                                            }
                                        </td>

                                        <td>

                                            <div className="hod-table-actions">

                                                <button
                                                    className="hod-btn hod-btn-small hod-btn-primary"
                                                    type="button"
                                                    onClick={() =>
                                                        handleEdit(
                                                            assignment
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>


                                                <button
                                                    className="hod-btn hod-btn-small hod-btn-danger"
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemove(
                                                            assignment.id
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}


export default HODStaffSubjectAssign;