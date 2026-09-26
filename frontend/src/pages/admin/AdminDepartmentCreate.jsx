// import { useState } from "react";

// import api from "../../api/axios";


// function AdminDepartmentCreate() {

//     const [name, setName] = useState("");

//     const [loading, setLoading] = useState(false);

//     const [error, setError] = useState("");


//     // ========================================================
//     // CREATE DEPARTMENT
//     // ========================================================

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         setError("");


//         // ----------------------------------------------------
//         // VALIDATION
//         // ----------------------------------------------------

//         if (!name.trim()) {

//             setError(
//                 "Department name is required."
//             );

//             return;

//         }


//         try {

//             setLoading(true);


//             await api.post(
//                 "departments/",
//                 {
//                     name: name.trim()
//                 }
//             );


//             alert(
//                 "Department created successfully."
//             );


//             window.location.href =
//                 "/admin/departments";


//         } catch (error) {

//             console.log(
//                 "Create Department Error:",
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
//                     "Unable to create department."
//                 );

//             }


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
//                 Add Department
//             </h1>


//             {/* ERROR */}

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

//                 {/* DEPARTMENT NAME */}

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


//                 {/* CREATE */}

//                 <button
//                     type="submit"
//                     disabled={loading}
//                 >

//                     {loading
//                         ? "Creating..."
//                         : "Create Department"}

//                 </button>


//                 {" "}


//                 {/* CANCEL */}

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


// export default AdminDepartmentCreate;




import { useState } from "react";

import api from "../../api/axios";


function AdminDepartmentCreate() {

    const [name, setName] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // ========================================================
    // CREATE DEPARTMENT
    // ========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        // ----------------------------------------------------
        // VALIDATION
        // ----------------------------------------------------

        if (!name.trim()) {

            setError(
                "Department name is required."
            );

            return;

        }


        try {

            setLoading(true);

            await api.post(
                "departments/",
                {
                    name: name.trim()
                }
            );

            alert(
                "Department created successfully."
            );

            window.location.href =
                "/admin/departments";

        } catch (error) {

            console.log(
                "Create Department Error:",
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
                    "Unable to create department."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // UI
    // ========================================================

    return (

        <div className="admin-page admin-department-create-page">

            {/* PAGE HEADER */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Add Department
                    </h1>

                    <p>
                        Create a new department
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
                        disabled={loading}
                    >
                        {loading
                            ? "Creating..."
                            : "Create Department"}
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


export default AdminDepartmentCreate;