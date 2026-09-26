// import { useEffect, useState } from "react";

// import api from "../../api/axios";


// function AdminSubjects() {

//     const [subjects, setSubjects] = useState([]);

//     const [search, setSearch] = useState("");

//     const [loading, setLoading] = useState(false);

//     const [error, setError] = useState("");


//     // ========================================================
//     // LOAD SUBJECTS
//     // ========================================================

//     const loadSubjects = async () => {

//         try {

//             setLoading(true);

//             setError("");


//             let url = "subjects/";


//             if (search.trim()) {

//                 url +=
//                     `?search=${encodeURIComponent(
//                         search.trim()
//                     )}`;

//             }


//             const response =
//                 await api.get(url);


//             console.log(
//                 "Admin Subjects:",
//                 response.data
//             );


//             const data =
//                 response.data.results ||
//                 response.data;


//             setSubjects(data);


//         } catch (error) {

//             console.log(
//                 "Subject Error:",
//                 error.response?.data
//             );


//             setError(
//                 "Unable to load subjects."
//             );


//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // LOAD WHEN SEARCH CHANGES
//     // ========================================================

//     useEffect(() => {

//         loadSubjects();

//     }, [search]);


//     // ========================================================
//     // ADD SUBJECT
//     // ========================================================

//     const handleAddSubject = () => {

//         window.location.href =
//             "/admin/subjects/create";

//     };


//     // ========================================================
//     // EDIT SUBJECT
//     // ========================================================

//     const handleEdit = (subjectId) => {

//         window.location.href =
//             `/admin/subjects/${subjectId}/edit`;

//     };


//     // ========================================================
//     // DELETE SUBJECT
//     // ========================================================

//     const handleDelete = async (subjectId) => {

//         const confirmDelete =
//             window.confirm(
//                 "Are you sure you want to delete this subject?"
//             );


//         if (!confirmDelete) {

//             return;

//         }


//         try {

//             setLoading(true);

//             setError("");


//             await api.delete(
//                 `subjects/${subjectId}/`
//             );


//             alert(
//                 "Subject deleted successfully."
//             );


//             await loadSubjects();


//         } catch (error) {

//             console.log(
//                 "Delete Subject Error:",
//                 error.response?.data
//             );


//             setError(
//                 "Unable to delete subject. It may be used by other records."
//             );


//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // UI
//     // ========================================================

//     return (

//         <div>

//             <h1>
//                 Subject Management
//             </h1>


//             {/* ================================================= */}
//             {/* ADD SUBJECT */}
//             {/* ================================================= */}

//             <button
//                 onClick={handleAddSubject}
//             >
//                 Add Subject
//             </button>


//             <br />
//             <br />


//             {/* ================================================= */}
//             {/* SEARCH */}
//             {/* ================================================= */}

//             <input
//                 type="text"
//                 placeholder="Search subject..."
//                 value={search}
//                 onChange={(e) =>
//                     setSearch(e.target.value)
//                 }
//             />


//             <br />
//             <br />


//             {/* ================================================= */}
//             {/* ERROR */}
//             {/* ================================================= */}

//             {error && (

//                 <p
//                     style={{
//                         color: "red"
//                     }}
//                 >
//                     {error}
//                 </p>

//             )}


//             {/* ================================================= */}
//             {/* LOADING */}
//             {/* ================================================= */}

//             {loading && (

//                 <p>
//                     Loading subjects...
//                 </p>

//             )}


//             {/* ================================================= */}
//             {/* SUBJECT TABLE */}
//             {/* ================================================= */}

//             {!loading && (

//                 <table border="1">

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

//                         {subjects.length === 0 ? (

//                             <tr>

//                                 <td colSpan="7">

//                                     No subjects found.

//                                 </td>

//                             </tr>

//                         ) : (

//                             subjects.map(
//                                 (subject) => (

//                                     <tr
//                                         key={
//                                             subject.id
//                                         }
//                                     >

//                                         <td>
//                                             {
//                                                 subject.id
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 subject.name
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 subject.code
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 subject.course_name ||
//                                                 subject.course
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 subject.department_name ||
//                                                 subject.department
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 subject.year
//                                             }
//                                         </td>


//                                         <td>

//                                             {/* EDIT */}

//                                             <button
//                                                 onClick={() =>
//                                                     handleEdit(
//                                                         subject.id
//                                                     )
//                                                 }
//                                             >
//                                                 Edit
//                                             </button>


//                                             {" "}


//                                             {/* DELETE */}

//                                             <button
//                                                 onClick={() =>
//                                                     handleDelete(
//                                                         subject.id
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


// export default AdminSubjects;







import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";


function AdminSubjects() {

    const navigate = useNavigate();

    const [subjects, setSubjects] = useState([]);
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // ========================================================
    // LOAD SUBJECTS
    // ========================================================

    const loadSubjects = async () => {

        try {

            setLoading(true);
            setError("");

            let url = "subjects/";

            if (search.trim()) {

                url +=
                    `?search=${encodeURIComponent(
                        search.trim()
                    )}`;

            }

            const response = await api.get(url);

            console.log(
                "Admin Subjects:",
                response.data
            );

            const data =
                response.data.results ||
                response.data;

            setSubjects(data);

        } catch (error) {

            console.log(
                "Subject Error:",
                error.response?.data
            );

            setError(
                "Unable to load subjects."
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // LOAD WHEN SEARCH CHANGES
    // ========================================================

    useEffect(() => {

        loadSubjects();

    }, [search]);


    // ========================================================
    // ADD SUBJECT
    // ========================================================

    const handleAddSubject = () => {

        navigate("/admin/subjects/create");

    };


    // ========================================================
    // EDIT SUBJECT
    // ========================================================

    const handleEdit = (subjectId) => {

        navigate(
            `/admin/subjects/${subjectId}/edit`
        );

    };


    // ========================================================
    // DELETE SUBJECT
    // ========================================================

    const handleDelete = async (subjectId) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this subject?"
            );

        if (!confirmDelete) {

            return;

        }

        try {

            setLoading(true);
            setError("");

            await api.delete(
                `subjects/${subjectId}/`
            );

            alert(
                "Subject deleted successfully."
            );

            await loadSubjects();

        } catch (error) {

            console.log(
                "Delete Subject Error:",
                error.response?.data
            );

            setError(
                "Unable to delete subject. It may be used by other records."
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // UI
    // ========================================================

    return (

        <div className="admin-page admin-subjects-page">

            {/* PAGE HEADER */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Subject Management
                    </h1>

                    <p>
                        Manage college subjects.
                    </p>

                </div>

                <button
                    type="button"
                    className="admin-primary-btn"
                    onClick={handleAddSubject}
                >
                    Add Subject
                </button>

            </div>


            {/* SEARCH */}

            <div className="admin-toolbar">

                <div className="admin-form-group">

                    <input
                        type="text"
                        placeholder="Search subject..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

            </div>


            {/* ERROR */}

            {error && (

                <div className="admin-alert admin-alert-error">
                    {error}
                </div>

            )}


            {/* LOADING */}

            {loading && (

                <div className="admin-loading-state">
                    Loading subjects...
                </div>

            )}


            {/* TABLE */}

            {!loading && (

                <div className="admin-table-card">

                    <div className="admin-table-wrapper">

                        <table className="admin-table">

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

                                {subjects.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="admin-empty-cell"
                                        >
                                            No subjects found.
                                        </td>

                                    </tr>

                                ) : (

                                    subjects.map(
                                        (subject) => (

                                            <tr
                                                key={
                                                    subject.id
                                                }
                                            >

                                                <td>
                                                    {subject.id}
                                                </td>

                                                <td>
                                                    {subject.name}
                                                </td>

                                                <td>
                                                    {subject.code}
                                                </td>

                                                <td>
                                                    {
                                                        subject.course_name ||
                                                        subject.course
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        subject.department_name ||
                                                        subject.department
                                                    }
                                                </td>

                                                <td>
                                                    {subject.year}
                                                </td>

                                                <td>

                                                    <div className="admin-action-group">

                                                        <button
                                                            type="button"
                                                            className="admin-secondary-btn"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    subject.id
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
                                                                    subject.id
                                                                )
                                                            }
                                                        >
                                                            Delete
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

            )}

        </div>

    );

}


export default AdminSubjects;