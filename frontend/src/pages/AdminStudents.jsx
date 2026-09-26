// import { useEffect, useState } from "react";

// import api from "../api/axios";


// function AdminStudents() {

//     const [students, setStudents] = useState([]);

//     const [search, setSearch] = useState("");

//     const [loading, setLoading] = useState(false);

//     const [error, setError] = useState("");


//     // ========================================================
//     // LOAD STUDENTS
//     // ========================================================

//     useEffect(() => {

//         loadStudents();

//     }, [search]);


//     const loadStudents = async () => {

//         try {

//             setLoading(true);

//             setError("");


//             let url = "students/";


//             if (search.trim()) {

//                 url +=
//                     `?search=${encodeURIComponent(
//                         search
//                     )}`;

//             }


//             const response = await api.get(url);


//             console.log(
//                 "Admin Students:",
//                 response.data
//             );


//             const data =
//                 response.data.results ||
//                 response.data;


//             setStudents(data);


//         } catch (error) {

//             console.log(
//                 "Student Error:",
//                 error.response?.data
//             );


//             setError(
//                 "Unable to load students."
//             );


//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // EDIT STUDENT
//     // ========================================================

//     const handleEdit = (studentId) => {

//         window.location.href =
//             `/admin/students/${studentId}/edit`;

//     };


//     // ========================================================
//     // DELETE STUDENT
//     // ========================================================

//     const handleDelete = async (studentId) => {

//         const confirmDelete =
//             window.confirm(
//                 "Are you sure you want to delete this student?"
//             );


//         if (!confirmDelete) {

//             return;

//         }


//         try {

//             setError("");


//             await api.delete(
//                 `students/${studentId}/`
//             );


//             alert(
//                 "Student deleted successfully."
//             );


//             loadStudents();


//         } catch (error) {

//             console.log(
//                 "Delete Student Error:",
//                 error.response?.data
//             );


//             setError(
//                 "Unable to delete student."
//             );

//         }

//     };


//     // ========================================================
//     // ADD STUDENT
//     // ========================================================

//     const handleAddStudent = () => {

//         window.location.href =
//             "/admin/students/create";

//     };


//     return (

//         <div>

//             <h1>
//                 Student Management
//             </h1>


//             {/* ================================================= */}
//             {/* ADD STUDENT */}
//             {/* ================================================= */}

//             <button
//                 onClick={handleAddStudent}
//             >
//                 Add Student
//             </button>


//             <br />
//             <br />


//             {/* ================================================= */}
//             {/* SEARCH */}
//             {/* ================================================= */}

//             <div>

//                 <input
//                     type="text"
//                     placeholder="Search student..."
//                     value={search}
//                     onChange={(e) =>
//                         setSearch(e.target.value)
//                     }
//                 />

//             </div>


//             <br />


//             {/* ================================================= */}
//             {/* ERROR */}
//             {/* ================================================= */}

//             {error && (

//                 <p>
//                     {error}
//                 </p>

//             )}


//             {/* ================================================= */}
//             {/* LOADING */}
//             {/* ================================================= */}

//             {loading && (

//                 <p>
//                     Loading students...
//                 </p>

//             )}


//             {/* ================================================= */}
//             {/* STUDENTS TABLE */}
//             {/* ================================================= */}

//             {!loading && (

//                 <table border="1">

//                     <thead>

//                         <tr>

//                             <th>
//                                 ID
//                             </th>

//                             <th>
//                                 Username
//                             </th>

//                             <th>
//                                 Name
//                             </th>

//                             <th>
//                                 Email
//                             </th>

//                             <th>
//                                 Phone
//                             </th>

//                             <th>
//                                 Course
//                             </th>

//                             <th>
//                                 Department
//                             </th>

//                             <th>
//                                 Current Year
//                             </th>

//                             <th>
//                                 Admission Year
//                             </th>

//                             <th>
//                                 Action
//                             </th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {students.length === 0 ? (

//                             <tr>

//                                 <td
//                                     colSpan="10"
//                                 >
//                                     No students found.
//                                 </td>

//                             </tr>

//                         ) : (

//                             students.map(
//                                 (student) => (

//                                     <tr
//                                         key={student.id}
//                                     >

//                                         <td>
//                                             {
//                                                 student.id
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 student.username
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 student.name
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 student.email
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 student.phone
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 student.course_name
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 student.department_name
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 student.current_year
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 student.admission_year
//                                             }
//                                         </td>


//                                         {/* ================================= */}
//                                         {/* ACTION */}
//                                         {/* ================================= */}

//                                         <td>

//                                             <button
//                                                 onClick={() =>
//                                                     handleEdit(
//                                                         student.id
//                                                     )
//                                                 }
//                                             >
//                                                 Edit
//                                             </button>


//                                             {" "}


//                                             <button
//                                                 onClick={() =>
//                                                     handleDelete(
//                                                         student.id
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


// export default AdminStudents;



import { useEffect, useState } from "react";

import api from "../api/axios";


function AdminStudents() {

    // ========================================================
    // DATA
    // ========================================================

    const [students, setStudents] = useState([]);


    // ========================================================
    // FILTER
    // ========================================================

    const [search, setSearch] = useState("");


    // ========================================================
    // UI STATE
    // ========================================================

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // ========================================================
    // LOAD STUDENTS
    // ========================================================

    useEffect(() => {

        loadStudents();

    }, [search]);


    const loadStudents = async () => {

        try {

            setLoading(true);
            setError("");


            let url = "students/";


            if (search.trim()) {

                url +=
                    `?search=${encodeURIComponent(search)}`;

            }


            const response =
                await api.get(url);


            console.log(
                "Admin Students:",
                response.data
            );


            const data =
                response.data.results ||
                response.data;


            setStudents(data);

        } catch (error) {

            console.log(
                "Student Error:",
                error.response?.data
            );

            setError(
                "Unable to load students."
            );

        } finally {

            setLoading(false);

        }
    };


    // ========================================================
    // EDIT STUDENT
    // ========================================================

    const handleEdit = (studentId) => {

        window.location.href =
            `/admin/students/${studentId}/edit`;

    };


    // ========================================================
    // DELETE STUDENT
    // ========================================================

    const handleDelete = async (studentId) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this student?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            setError("");


            await api.delete(
                `students/${studentId}/`
            );


            alert(
                "Student deleted successfully."
            );


            loadStudents();

        } catch (error) {

            console.log(
                "Delete Student Error:",
                error.response?.data
            );

            setError(
                "Unable to delete student."
            );

        }
    };


    // ========================================================
    // ADD STUDENT
    // ========================================================

    const handleAddStudent = () => {

        window.location.href =
            "/admin/students/create";

    };


    // ========================================================
    // RENDER
    // ========================================================

    return (

        <div className="admin-page admin-students-page">

            {/* ================================================= */}
            {/* PAGE HEADER */}
            {/* ================================================= */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Student Management
                    </h1>

                    <p>
                        Manage student accounts and academic details.
                    </p>

                </div>


                <button
                    type="button"
                    className="admin-primary-btn"
                    onClick={handleAddStudent}
                >
                    Add Student
                </button>

            </div>


            {/* ================================================= */}
            {/* SEARCH TOOLBAR */}
            {/* ================================================= */}

            <div className="admin-toolbar">

                <div className="admin-form-group">

                    <label htmlFor="student-search">
                        Search Student
                    </label>

                    <input
                        id="student-search"
                        type="text"
                        placeholder="Search student..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

            </div>


            {/* ================================================= */}
            {/* ERROR */}
            {/* ================================================= */}

            {error && (

                <div className="admin-alert admin-alert-error">
                    {error}
                </div>

            )}


            {/* ================================================= */}
            {/* LOADING */}
            {/* ================================================= */}

            {loading && (

                <div className="admin-loading-state">
                    Loading students...
                </div>

            )}


            {/* ================================================= */}
            {/* TABLE */}
            {/* ================================================= */}

            {!loading && (

                <div className="admin-table-card">

                    <div className="admin-table-wrapper">

                        <table className="admin-table">

                            <thead>

                                <tr>

                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Course</th>
                                    <th>Department</th>
                                    <th>Current Year</th>
                                    <th>Admission Year</th>
                                    <th>Action</th>

                                </tr>

                            </thead>


                            <tbody>

                                {students.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="10"
                                            className="admin-empty-cell"
                                        >
                                            No students found.
                                        </td>

                                    </tr>

                                ) : (

                                    students.map(
                                        (student) => (

                                            <tr
                                                key={student.id}
                                            >

                                                <td>
                                                    {student.id}
                                                </td>

                                                <td>
                                                    {student.username}
                                                </td>

                                                <td>
                                                    {student.name}
                                                </td>

                                                <td>
                                                    {student.email}
                                                </td>

                                                <td>
                                                    {student.phone}
                                                </td>

                                                <td>
                                                    {student.course_name}
                                                </td>

                                                <td>
                                                    {student.department_name}
                                                </td>

                                                <td>
                                                    {student.current_year}
                                                </td>

                                                <td>
                                                    {student.admission_year}
                                                </td>


                                                {/* ========================= */}
                                                {/* ACTION */}
                                                {/* ========================= */}

                                                <td>

                                                    <div className="admin-action-group">

                                                        <button
                                                            type="button"
                                                            className="admin-secondary-btn"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    student.id
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
                                                                    student.id
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


export default AdminStudents;