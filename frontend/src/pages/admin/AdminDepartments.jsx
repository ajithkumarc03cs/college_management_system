// import { useEffect, useState } from "react";

// import api from "../../api/axios";

// function AdminDepartments() {

//     const [departments, setDepartments] = useState([]);

//     const [search, setSearch] = useState("");

//     const [loading, setLoading] = useState(false);

//     const [error, setError] = useState("");


//     // ========================================================
//     // LOAD DEPARTMENTS
//     // ========================================================

//     const loadDepartments = async () => {

//         try {

//             setLoading(true);

//             setError("");


//             let url = "departments/";


//             if (search.trim()) {

//                 url +=
//                     `?search=${encodeURIComponent(
//                         search.trim()
//                     )}`;

//             }


//             const response =
//                 await api.get(url);


//             console.log(
//                 "Admin Departments:",
//                 response.data
//             );


//             const data =
//                 response.data.results ||
//                 response.data;


//             setDepartments(data);


//         } catch (error) {

//             console.log(
//                 "Department Error:",
//                 error.response?.data
//             );


//             setError(
//                 "Unable to load departments."
//             );


//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // LOAD WHEN SEARCH CHANGES
//     // ========================================================

//     useEffect(() => {

//         loadDepartments();

//     }, [search]);


//     // ========================================================
//     // ADD DEPARTMENT
//     // ========================================================

//     const handleAddDepartment = () => {

//         window.location.href =
//             "/admin/departments/create";

//     };


//     // ========================================================
//     // EDIT DEPARTMENT
//     // ========================================================

//     const handleEdit = (departmentId) => {

//         window.location.href =
//             `/admin/departments/${departmentId}/edit`;

//     };


//     // ========================================================
//     // DELETE DEPARTMENT
//     // ========================================================

//     const handleDelete = async (departmentId) => {

//         const confirmDelete =
//             window.confirm(
//                 "Are you sure you want to delete this department?"
//             );


//         if (!confirmDelete) {

//             return;

//         }


//         try {

//             setLoading(true);

//             setError("");


//             await api.delete(
//                 `departments/${departmentId}/`
//             );


//             alert(
//                 "Department deleted successfully."
//             );


//             await loadDepartments();


//         } catch (error) {

//             console.log(
//                 "Delete Department Error:",
//                 error.response?.data
//             );


//             setError(
//                 "Unable to delete department. It may be used by other records."
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
//                 Department Management
//             </h1>


//             {/* ================================================= */}
//             {/* ADD DEPARTMENT */}
//             {/* ================================================= */}

//             <button
//                 onClick={handleAddDepartment}
//             >
//                 Add Department
//             </button>


//             <br />
//             <br />


//             {/* ================================================= */}
//             {/* SEARCH */}
//             {/* ================================================= */}

//             <input
//                 type="text"
//                 placeholder="Search department..."
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
//                     Loading departments...
//                 </p>

//             )}


//             {/* ================================================= */}
//             {/* DEPARTMENT TABLE */}
//             {/* ================================================= */}

//             {!loading && (

//                 <table border="1">

//                     <thead>

//                         <tr>

//                             <th>
//                                 ID
//                             </th>

//                             <th>
//                                 Department Name
//                             </th>

//                             <th>
//                                 Action
//                             </th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {departments.length === 0 ? (

//                             <tr>

//                                 <td colSpan="3">

//                                     No departments found.

//                                 </td>

//                             </tr>

//                         ) : (

//                             departments.map(
//                                 (department) => (

//                                     <tr
//                                         key={
//                                             department.id
//                                         }
//                                     >

//                                         <td>
//                                             {
//                                                 department.id
//                                             }
//                                         </td>


//                                         <td>
//                                             {
//                                                 department.name
//                                             }
//                                         </td>


//                                         <td>

//                                             {/* EDIT */}

//                                             <button
//                                                 onClick={() =>
//                                                     handleEdit(
//                                                         department.id
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
//                                                         department.id
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


// export default AdminDepartments;



import { useEffect, useState } from "react";

import api from "../../api/axios";


function AdminDepartments() {

    const [departments, setDepartments] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // ========================================================
    // LOAD DEPARTMENTS
    // ========================================================

    const loadDepartments = async () => {

        try {

            setLoading(true);

            setError("");

            let url = "departments/";


            if (search.trim()) {

                url +=
                    `?search=${encodeURIComponent(
                        search.trim()
                    )}`;

            }


            const response =
                await api.get(url);


            console.log(
                "Admin Departments:",
                response.data
            );


            const data =
                response.data.results ||
                response.data;


            setDepartments(data);

        } catch (error) {

            console.log(
                "Department Error:",
                error.response?.data
            );

            setError(
                "Unable to load departments."
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // LOAD WHEN SEARCH CHANGES
    // ========================================================

    useEffect(() => {

        loadDepartments();

    }, [search]);


    // ========================================================
    // ADD DEPARTMENT
    // ========================================================

    const handleAddDepartment = () => {

        window.location.href =
            "/admin/departments/create";

    };


    // ========================================================
    // EDIT DEPARTMENT
    // ========================================================

    const handleEdit = (departmentId) => {

        window.location.href =
            `/admin/departments/${departmentId}/edit`;

    };


    // ========================================================
    // DELETE DEPARTMENT
    // ========================================================

    const handleDelete = async (departmentId) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this department?"
            );


        if (!confirmDelete) {

            return;

        }


        try {

            setLoading(true);

            setError("");

            await api.delete(
                `departments/${departmentId}/`
            );


            alert(
                "Department deleted successfully."
            );


            await loadDepartments();

        } catch (error) {

            console.log(
                "Delete Department Error:",
                error.response?.data
            );

            setError(
                "Unable to delete department. It may be used by other records."
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // UI
    // ========================================================

    return (

        <div className="admin-page admin-departments-page">

            {/* PAGE HEADER */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Department Management
                    </h1>

                    <p>
                        Manage college departments
                    </p>

                </div>


                <button
                    className="admin-primary-btn"
                    onClick={handleAddDepartment}
                >
                    Add Department
                </button>

            </div>


            {/* SEARCH TOOLBAR */}

            <div className="admin-toolbar">

                <div className="admin-form-group">

                    <label>
                        Search
                    </label>

                    <input
                        type="text"
                        placeholder="Search department..."
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
                    Loading departments...
                </div>

            )}


            {/* TABLE */}

            {!loading && (

                <div className="admin-table-card">

                    <div className="admin-table-wrapper">

                        <table className="admin-table">

                            <thead>

                                <tr>

                                    <th>
                                        ID
                                    </th>

                                    <th>
                                        Department Name
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {departments.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="3"
                                            className="admin-empty-cell"
                                        >
                                            No departments found.
                                        </td>

                                    </tr>

                                ) : (

                                    departments.map(
                                        (department) => (

                                            <tr
                                                key={
                                                    department.id
                                                }
                                            >

                                                <td>
                                                    {
                                                        department.id
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        department.name
                                                    }
                                                </td>

                                                <td>

                                                    <div className="admin-action-group">

                                                        <button
                                                            className="admin-secondary-btn"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    department.id
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>


                                                        <button
                                                            className="admin-danger-btn"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    department.id
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


export default AdminDepartments;