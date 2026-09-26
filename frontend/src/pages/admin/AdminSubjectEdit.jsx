// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../../api/axios";

// function AdminSubjectEdit() {

//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [courses, setCourses] = useState([]);
//     const [departments, setDepartments] = useState([]);

//     const [formData, setFormData] = useState({
//         name: "",
//         code: "",
//         course: "",
//         department: "",
//         year: ""
//     });

//     const [error, setError] = useState("");

//     useEffect(() => {

//         loadSubject();
//         loadCourses();
//         loadDepartments();

//     }, [id]);


//     const loadSubject = async () => {

//         try {

//             const response = await api.get(
//                 `subjects/${id}/`
//             );

//             const subject = response.data;

//             setFormData({
//                 name: subject.name,
//                 code: subject.code,
//                 course: subject.course,
//                 department: subject.department,
//                 year: subject.year
//             });

//         } catch (error) {

//             console.error(error);

//             setError("Failed to load subject.");

//         }
//     };


//     const loadCourses = async () => {

//         try {

//             const response = await api.get(
//                 "courses/"
//             );

//             setCourses(response.data.results || response.data);

//         } catch (error) {

//             console.error(error);

//         }
//     };


//     const loadDepartments = async () => {

//         try {

//             const response = await api.get(
//                 "departments/"
//             );

//             setDepartments(response.data.results || response.data);

//         } catch (error) {

//             console.error(error);

//         }
//     };


//     const handleChange = (e) => {

//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });

//     };


//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         setError("");

//         try {

//             await api.patch(
//                 `subjects/${id}/`,
//                 {
//                     name: formData.name,
//                     code: formData.code,
//                     course: Number(formData.course),
//                     department: Number(formData.department),
//                     year: Number(formData.year)
//                 }
//             );

//             alert("Subject updated successfully.");

//             navigate("/admin/subjects");

//         } catch (error) {

//             console.error(error);

//             setError(
//                 error.response?.data ||
//                 "Failed to update subject."
//             );

//         }
//     };


//     return (
//         <div>

//             <h2>Edit Subject</h2>

//             {error && (
//                 <p>{JSON.stringify(error)}</p>
//             )}

//             <form onSubmit={handleSubmit}>

//                 <div>

//                     <label>
//                         Subject Name
//                     </label>

//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                     />

//                 </div>


//                 <div>

//                     <label>
//                         Subject Code
//                     </label>

//                     <input
//                         type="text"
//                         name="code"
//                         value={formData.code}
//                         onChange={handleChange}
//                         required
//                     />

//                 </div>


//                 <div>

//                     <label>
//                         Course
//                     </label>

//                     <select
//                         name="course"
//                         value={formData.course}
//                         onChange={handleChange}
//                         required
//                     >

//                         <option value="">
//                             Select Course
//                         </option>

//                         {courses.map((course) => (

//                             <option
//                                 key={course.id}
//                                 value={course.id}
//                             >
//                                 {course.name}
//                             </option>

//                         ))}

//                     </select>

//                 </div>


//                 <div>

//                     <label>
//                         Department
//                     </label>

//                     <select
//                         name="department"
//                         value={formData.department}
//                         onChange={handleChange}
//                         required
//                     >

//                         <option value="">
//                             Select Department
//                         </option>

//                         {departments.map((department) => (

//                             <option
//                                 key={department.id}
//                                 value={department.id}
//                             >
//                                 {department.name}
//                             </option>

//                         ))}

//                     </select>

//                 </div>


//                 <div>

//                     <label>
//                         Year
//                     </label>

//                     <input
//                         type="number"
//                         name="year"
//                         value={formData.year}
//                         onChange={handleChange}
//                         min="1"
//                         required
//                     />

//                 </div>


//                 <button type="submit">
//                     Update Subject
//                 </button>

//                 <button
//                     type="button"
//                     onClick={() =>
//                         navigate("/admin/subjects")
//                     }
//                 >
//                     Cancel
//                 </button>

//             </form>

//         </div>
//     );
// }

// export default AdminSubjectEdit;






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