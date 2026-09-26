// import { useEffect, useState } from "react";

// import api from "../../api/axios";


// function AdminDepartmentEdit() {

//     const departmentId =
//         window.location.pathname.split("/")[3];


//     const [name, setName] = useState("");

//     const [loading, setLoading] = useState(true);

//     const [saving, setSaving] = useState(false);

//     const [error, setError] = useState("");


//     // ========================================================
//     // LOAD DEPARTMENT
//     // ========================================================

//     const loadDepartment = async () => {

//         try {

//             setLoading(true);

//             setError("");


//             const response = await api.get(
//                 `departments/${departmentId}/`
//             );


//             setName(
//                 response.data.name || ""
//             );


//         } catch (error) {

//             console.log(
//                 "Department Load Error:",
//                 error.response?.data
//             );


//             setError(
//                 "Unable to load department."
//             );


//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // USE EFFECT
//     // ========================================================

//     useEffect(() => {

//         loadDepartment();

//     }, [departmentId]);


//     // ========================================================
//     // UPDATE DEPARTMENT
//     // ========================================================

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         setError("");


//         if (!name.trim()) {

//             setError(
//                 "Department name is required."
//             );

//             return;

//         }


//         try {

//             setSaving(true);


//             await api.patch(
//                 `departments/${departmentId}/`,
//                 {
//                     name: name.trim()
//                 }
//             );


//             alert(
//                 "Department updated successfully."
//             );


//             window.location.href =
//                 "/admin/departments";


//         } catch (error) {

//             console.log(
//                 "Department Update Error:",
//                 error.response?.data
//             );


//             const backendError =
//                 error.response?.data;


//             if (backendError?.name) {

//                 setError(
//                     Array.isArray(backendError.name)
//                         ? backendError.name[0]
//                         : backendError.name
//                 );

//             } else {

//                 setError(
//                     "Unable to update department."
//                 );

//             }


//         } finally {

//             setSaving(false);

//         }

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (

//             <div>

//                 <h1>
//                     Edit Department
//                 </h1>

//                 <p>
//                     Loading department...
//                 </p>

//             </div>

//         );

//     }


//     // ========================================================
//     // UI
//     // ========================================================

//     return (

//         <div>

//             <h1>
//                 Edit Department
//             </h1>


//             {error && (

//                 <p
//                     style={{
//                         color: "red"
//                     }}
//                 >
//                     {error}
//                 </p>

//             )}


//             <form
//                 onSubmit={handleSubmit}
//             >

//                 <div>

//                     <label>
//                         Department Name
//                     </label>

//                     <br />

//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) =>
//                             setName(e.target.value)
//                         }
//                         placeholder="Enter department name"
//                     />

//                 </div>


//                 <br />


//                 <button
//                     type="submit"
//                     disabled={saving}
//                 >

//                     {saving
//                         ? "Updating..."
//                         : "Update Department"}

//                 </button>


//                 {" "}


//                 <button
//                     type="button"
//                     onClick={() =>
//                         window.location.href =
//                             "/admin/departments"
//                     }
//                 >

//                     Cancel

//                 </button>

//             </form>

//         </div>

//     );

// }


// export default AdminDepartmentEdit;




import { useEffect, useState } from "react";

import api from "../../api/axios";


function AdminDepartmentEdit() {

    const departmentId =
        window.location.pathname.split("/")[3];


    const [name, setName] = useState("");

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");


    // ========================================================
    // LOAD DEPARTMENT
    // ========================================================

    const loadDepartment = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await api.get(
                `departments/${departmentId}/`
            );

            setName(
                response.data.name || ""
            );

        } catch (error) {

            console.log(
                "Department Load Error:",
                error.response?.data
            );

            setError(
                "Unable to load department."
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // USE EFFECT
    // ========================================================

    useEffect(() => {

        loadDepartment();

    }, [departmentId]);


    // ========================================================
    // UPDATE DEPARTMENT
    // ========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        if (!name.trim()) {

            setError(
                "Department name is required."
            );

            return;

        }


        try {

            setSaving(true);

            await api.patch(
                `departments/${departmentId}/`,
                {
                    name: name.trim()
                }
            );

            alert(
                "Department updated successfully."
            );

            window.location.href =
                "/admin/departments";

        } catch (error) {

            console.log(
                "Department Update Error:",
                error.response?.data
            );

            const backendError =
                error.response?.data;


            if (backendError?.name) {

                setError(
                    Array.isArray(backendError.name)
                        ? backendError.name[0]
                        : backendError.name
                );

            } else {

                setError(
                    "Unable to update department."
                );

            }

        } finally {

            setSaving(false);

        }

    };


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (

            <div className="admin-page admin-department-edit-page">

                <div className="admin-loading-state">

                    <h1>
                        Edit Department
                    </h1>

                    <p>
                        Loading department...
                    </p>

                </div>

            </div>

        );

    }


    // ========================================================
    // UI
    // ========================================================

    return (

        <div className="admin-page admin-department-edit-page">

            {/* PAGE HEADER */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Edit Department
                    </h1>

                    <p>
                        Update department information
                    </p>

                </div>

            </div>


            {/* ERROR */}

            {error && (

                <div className="admin-alert admin-alert-error">
                    {error}
                </div>

            )}


            {/* FORM */}

            <form
                className="admin-form-card"
                onSubmit={handleSubmit}
            >

                <div className="admin-form-group">

                    <label>
                        Department Name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        placeholder="Enter department name"
                    />

                </div>


                {/* ACTIONS */}

                <div className="admin-form-actions">

                    <button
                        type="submit"
                        className="admin-primary-btn"
                        disabled={saving}
                    >
                        {saving
                            ? "Updating..."
                            : "Update Department"}
                    </button>


                    <button
                        type="button"
                        className="admin-secondary-btn"
                        onClick={() =>
                            window.location.href =
                                "/admin/departments"
                        }
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    );

}


export default AdminDepartmentEdit;