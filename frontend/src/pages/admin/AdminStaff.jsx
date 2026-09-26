// import { useEffect, useState } from "react";

// import api from "../api/axios";


// function AdminStaff() {

//     const [staff, setStaff] = useState([]);

//     const [search, setSearch] = useState("");

//     const [loading, setLoading] = useState(false);

//     const [error, setError] = useState("");


//     // ========================================================
//     // LOAD STAFF
//     // ========================================================

//     useEffect(() => {

//         loadStaff();

//     }, [search]);


//     const loadStaff = async () => {

//         try {

//             setLoading(true);

//             setError("");


//             let url = "admin/staff/";


//             if (search.trim()) {

//                 url +=
//                     `?search=${encodeURIComponent(
//                         search
//                     )}`;

//             }


//             const response =
//                 await api.get(url);


//             console.log(
//                 "Admin Staff:",
//                 response.data
//             );


//             const data =
//                 response.data.results ||
//                 response.data;


//             setStaff(data);


//         } catch (error) {

//             console.log(
//                 "Staff Error:",
//                 error.response?.data
//             );


//             setError(
//                 "Unable to load staff."
//             );


//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // ADD STAFF
//     // ========================================================

//     const handleAddStaff = () => {

//         window.location.href =
//             "/admin/staff/create";

//     };


//     // ========================================================
//     // EDIT STAFF
//     // ========================================================

//     const handleEdit = (staffId) => {

//         window.location.href =
//             `/admin/staff/${staffId}/edit`;

//     };


//     // ========================================================
//     // DELETE / DEACTIVATE STAFF
//     // ========================================================

//     const handleDelete = async (staffId) => {

//         const confirmDelete =
//             window.confirm(
//                 "Are you sure you want to deactivate this staff?"
//             );


//         if (!confirmDelete) {

//             return;

//         }


//         try {

//             setLoading(true);

//             setError("");


//             await api.patch(
//                 `admin/users/${staffId}/deactivate/`
//             );


//             alert(
//                 "Staff deactivated successfully."
//             );


//             loadStaff();


//         } catch (error) {

//             console.log(
//                 "Delete Staff Error:",
//                 error.response?.data
//             );


//             setError(
//                 "Unable to deactivate staff."
//             );

//         } finally {

//             setLoading(false);

//         }

//     };


//     return (

//         <div>

//             <h1>
//                 Staff Management
//             </h1>


//             {/* ================================================= */}
//             {/* ADD STAFF */}
//             {/* ================================================= */}

//             <button
//                 onClick={handleAddStaff}
//             >
//                 Add Staff
//             </button>


//             <br />
//             <br />


//             {/* ================================================= */}
//             {/* SEARCH */}
//             {/* ================================================= */}

//             <input
//                 type="text"
//                 placeholder="Search staff..."
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
//                     Loading staff...
//                 </p>

//             )}


//             {/* ================================================= */}
//             {/* STAFF TABLE */}
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
//                                 Email
//                             </th>

//                             <th>
//                                 Role
//                             </th>

//                             <th>
//                                 Department
//                             </th>

//                             <th>
//                                 Action
//                             </th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {staff.length === 0 ? (

//                             <tr>

//                                 <td
//                                     colSpan="6"
//                                 >
//                                     No staff found.
//                                 </td>

//                             </tr>

//                         ) : (

//                             staff.map(
//                                 (member) => (

//                                     <tr
//                                         key={
//                                             member.id
//                                         }
//                                     >

//                                         <td>
//                                             {
//                                                 member.id
//                                             }
//                                         </td>

//                                         <td>
//                                             {
//                                                 member.username
//                                             }
//                                         </td>

//                                         <td>
//                                             {
//                                                 member.email
//                                             }
//                                         </td>

//                                         <td>
//                                             {
//                                                 member.role
//                                             }
//                                         </td>

//                                         <td>
//                                             {
//                                                 member.department
//                                             }
//                                         </td>


//                                         {/* ACTION */}

//                                         <td>

//                                             <button
//                                                 onClick={() =>
//                                                     handleEdit(
//                                                         member.id
//                                                     )
//                                                 }
//                                             >
//                                                 Edit
//                                             </button>


//                                             {" "}


//                                             <button
//                                                 onClick={() =>
//                                                     handleDelete(
//                                                         member.id
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


// export default AdminStaff;



import { useEffect, useState } from "react";

import api from "../api/axios";


function AdminStaff() {

    // ========================================================
    // DATA
    // ========================================================

    const [staff, setStaff] = useState([]);

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
    // LOAD STAFF
    // ========================================================

    useEffect(() => {

        loadStaff();

    }, [search]);


    const loadStaff = async () => {

        try {

            setLoading(true);
            setError("");

            let url = "admin/staff/";


            if (search.trim()) {

                url +=
                    `?search=${encodeURIComponent(search)}`;

            }


            const response = await api.get(url);


            console.log(
                "Admin Staff:",
                response.data
            );


            const data =
                response.data.results ||
                response.data;


            setStaff(data);

        } catch (error) {

            console.log(
                "Staff Error:",
                error.response?.data
            );

            setError(
                "Unable to load staff."
            );

        } finally {

            setLoading(false);

        }
    };


    // ========================================================
    // ADD STAFF
    // ========================================================

    const handleAddStaff = () => {

        window.location.href =
            "/admin/staff/create";

    };


    // ========================================================
    // EDIT STAFF
    // ========================================================

    const handleEdit = (staffId) => {

        window.location.href =
            `/admin/staff/${staffId}/edit`;

    };


    // ========================================================
    // DELETE / DEACTIVATE STAFF
    // ========================================================

    const handleDelete = async (staffId) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to deactivate this staff?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            setLoading(true);
            setError("");


            await api.patch(
                `admin/users/${staffId}/deactivate/`
            );


            alert(
                "Staff deactivated successfully."
            );


            loadStaff();

        } catch (error) {

            console.log(
                "Delete Staff Error:",
                error.response?.data
            );

            setError(
                "Unable to deactivate staff."
            );

        } finally {

            setLoading(false);

        }
    };


    // ========================================================
    // RENDER
    // ========================================================

    return (

        <div className="admin-page admin-staff-page">

            {/* ================================================= */}
            {/* PAGE HEADER */}
            {/* ================================================= */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Staff Management
                    </h1>

                    <p>
                        Manage college staff members.
                    </p>

                </div>


                <button
                    type="button"
                    className="admin-primary-btn"
                    onClick={handleAddStaff}
                >
                    Add Staff
                </button>

            </div>


            {/* ================================================= */}
            {/* SEARCH / TOOLBAR */}
            {/* ================================================= */}

            <div className="admin-toolbar">

                <div className="admin-form-group">

                    <label htmlFor="staff-search">
                        Search Staff
                    </label>

                    <input
                        id="staff-search"
                        type="text"
                        placeholder="Search staff..."
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
                    Loading staff...
                </div>

            )}


            {/* ================================================= */}
            {/* STAFF TABLE */}
            {/* ================================================= */}

            {!loading && (

                <div className="admin-table-card">

                    <div className="admin-table-wrapper">

                        <table className="admin-table">

                            <thead>

                                <tr>

                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Department</th>
                                    <th>Action</th>

                                </tr>

                            </thead>


                            <tbody>

                                {staff.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="admin-empty-cell"
                                        >
                                            No staff found.
                                        </td>

                                    </tr>

                                ) : (

                                    staff.map((member) => (

                                        <tr
                                            key={member.id}
                                        >

                                            <td>
                                                {member.id}
                                            </td>

                                            <td>
                                                {member.username}
                                            </td>

                                            <td>
                                                {member.email}
                                            </td>

                                            <td>
                                                {member.role}
                                            </td>

                                            <td>
                                                {member.department}
                                            </td>

                                            <td>

                                                <div className="admin-action-group">

                                                    <button
                                                        type="button"
                                                        className="admin-secondary-btn"
                                                        onClick={() =>
                                                            handleEdit(
                                                                member.id
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
                                                                member.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}

        </div>
    );
}


export default AdminStaff;