// import {
//     useEffect,
//     useState
// } from "react";

// import api from "../../api/axios";


// function AdminPrincipal() {

//     // ========================================================
//     // DATA
//     // ========================================================

//     const [principals, setPrincipals] =
//         useState([]);

//     // ========================================================
//     // CREATE / EDIT FORM
//     // ========================================================

//     const [showForm, setShowForm] =
//         useState(false);

//     const [editMode, setEditMode] =
//         useState(false);

//     const [editingId, setEditingId] =
//         useState(null);


//     const [username, setUsername] =
//         useState("");

//     const [password, setPassword] =
//         useState("");

//     const [email, setEmail] =
//         useState("");

//     const [isActive, setIsActive] =
//         useState(true);

//     // ========================================================
//     // SEARCH
//     // ========================================================

//     const [search, setSearch] =
//         useState("");

//     // ========================================================
//     // SELECTED PRINCIPAL
//     // ========================================================

//     const [selectedPrincipal, setSelectedPrincipal] =
//         useState(null);

//     // ========================================================
//     // UI
//     // ========================================================

//     const [loading, setLoading] =
//         useState(true);

//     const [saving, setSaving] =
//         useState(false);

//     const [deletingId, setDeletingId] =
//         useState(null);

//     const [error, setError] =
//         useState("");

//     const [success, setSuccess] =
//         useState("");


//     // ========================================================
//     // LOAD PRINCIPALS
//     // ========================================================

//     useEffect(() => {

//         loadPrincipals();

//     }, []);


//     const loadPrincipals = async () => {

//         try {

//             setLoading(true);

//             setError("");


//             const response = await api.get(
//                 "admin/users/?role=Principal&page_size=100"
//             );


//             console.log(
//                 "Admin Principal:",
//                 response.data
//             );


//             setPrincipals(
//                 response.data.results ||
//                 response.data ||
//                 []
//             );


//         } catch (error) {

//             console.error(
//                 "Admin Principal Error:",
//                 error.response?.data || error
//             );


//             setPrincipals([]);


//             setError(
//                 error.response?.data?.detail ||
//                 "Unable to load principals."
//             );


//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // FILTER PRINCIPALS
//     // ========================================================

//     const filteredPrincipals =
//         principals.filter(
//             (item) => {

//                 const searchValue =
//                     search
//                         .toLowerCase()
//                         .trim();


//                 const username =
//                     String(
//                         item.username ||
//                         ""
//                     )
//                     .toLowerCase();


//                 const email =
//                     String(
//                         item.email ||
//                         ""
//                     )
//                     .toLowerCase();


//                 return (

//                     searchValue === ""

//                     ||

//                     username.includes(
//                         searchValue
//                     )

//                     ||

//                     email.includes(
//                         searchValue
//                     )

//                 );

//             }
//         );


//     // ========================================================
//     // OPEN ADD FORM
//     // ========================================================

//     const handleAdd = () => {

//         setShowForm(true);

//         setEditMode(false);

//         setEditingId(null);

//         setUsername("");

//         setPassword("");

//         setEmail("");

//         setIsActive(true);

//         setSelectedPrincipal(null);

//         setError("");

//         setSuccess("");

//     };


//     // ========================================================
//     // OPEN EDIT FORM
//     // ========================================================

//     const handleEdit = (
//         item
//     ) => {

//         setShowForm(true);

//         setEditMode(true);

//         setEditingId(
//             item.id
//         );

//         setUsername(
//             item.username || ""
//         );

//         setPassword("");

//         setEmail(
//             item.email || ""
//         );

//         setIsActive(
//             item.is_active !== false
//         );

//         setSelectedPrincipal(null);

//         setError("");

//         setSuccess("");

//     };


//     // ========================================================
//     // CLOSE FORM
//     // ========================================================

//     const handleCloseForm = () => {

//         setShowForm(false);

//         setEditMode(false);

//         setEditingId(null);

//         setUsername("");

//         setPassword("");

//         setEmail("");

//         setIsActive(true);

//         setError("");

//     };


//     // ========================================================
//     // CREATE / UPDATE PRINCIPAL
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

//         if (!username.trim()) {

//             setError(
//                 "Username is required."
//             );

//             return;

//         }


//         if (!editMode && !password) {

//             setError(
//                 "Password is required."
//             );

//             return;

//         }


//         if (
//             password &&
//             password.length < 6
//         ) {

//             setError(
//                 "Password must contain at least 6 characters."
//             );

//             return;

//         }


//         if (!email.trim()) {

//             setError(
//                 "Email is required."
//             );

//             return;

//         }


//         try {

//             setSaving(true);


//             // =================================================
//             // CREATE
//             // =================================================

//             if (!editMode) {

//                 const data = {

//                     username:
//                         username.trim(),

//                     password:
//                         password,

//                     email:
//                         email.trim(),

//                     role:
//                         "Principal"

//                 };


//                 const response =
//                     await api.post(
//                         "admin/users/",
//                         data
//                     );


//                 console.log(
//                     "Principal Created:",
//                     response.data
//                 );


//                 setSuccess(
//                     "Principal created successfully."
//                 );

//             }


//             // =================================================
//             // UPDATE
//             // =================================================

//             else {

//                 const data = {

//                     username:
//                         username.trim(),

//                     email:
//                         email.trim(),

//                     role:
//                         "Principal",

//                     is_active:
//                         isActive

//                 };


//                 if (password) {

//                     data.password =
//                         password;

//                 }


//                 const response =
//                     await api.patch(
//                         `admin/users/${editingId}/`,
//                         data
//                     );


//                 console.log(
//                     "Principal Updated:",
//                     response.data
//                 );


//                 setSuccess(
//                     "Principal updated successfully."
//                 );

//             }


//             // ------------------------------------------------
//             // RELOAD
//             // ------------------------------------------------

//             await loadPrincipals();


//             // ------------------------------------------------
//             // RESET
//             // ------------------------------------------------

//             setUsername("");

//             setPassword("");

//             setEmail("");

//             setIsActive(true);

//             setEditingId(null);

//             setEditMode(false);


//         } catch (error) {

//             console.error(
//                 "Principal Save Error:",
//                 error.response?.data || error
//             );


//             const responseData =
//                 error.response?.data;


//             if (
//                 responseData &&
//                 typeof responseData ===
//                 "object"
//             ) {

//                 const messages =
//                     Object.entries(
//                         responseData
//                     )
//                     .map(
//                         ([field, message]) =>
//                             `${field}: ${
//                                 Array.isArray(message)
//                                     ? message.join(", ")
//                                     : message
//                             }`
//                     )
//                     .join(" | ");


//                 setError(
//                     messages ||
//                     "Unable to save principal."
//                 );

//             } else {

//                 setError(
//                     "Unable to save principal."
//                 );

//             }

//         } finally {

//             setSaving(false);

//         }

//     };


//     // ========================================================
//     // DELETE PRINCIPAL
//     // ========================================================

//     const handleDelete = async (
//         item
//     ) => {

//         const confirmed =
//             window.confirm(
//                 `Delete Principal "${item.username}"?`
//             );


//         if (!confirmed) {

//             return;

//         }


//         try {

//             setDeletingId(
//                 item.id
//             );

//             setError("");

//             setSuccess("");


//             await api.delete(
//                 `admin/users/${item.id}/`
//             );


//             setSuccess(
//                 "Principal deleted successfully."
//             );


//             if (
//                 selectedPrincipal?.id ===
//                 item.id
//             ) {

//                 setSelectedPrincipal(
//                     null
//                 );

//             }


//             await loadPrincipals();


//         } catch (error) {

//             console.error(
//                 "Delete Principal Error:",
//                 error.response?.data || error
//             );


//             setError(
//                 error.response?.data?.detail ||
//                 "Unable to delete principal."
//             );


//         } finally {

//             setDeletingId(
//                 null
//             );

//         }

//     };


//     // ========================================================
//     // VIEW DETAILS
//     // ========================================================

//     const handleView = (
//         item
//     ) => {

//         setSelectedPrincipal(
//             item
//         );

//     };


//     // ========================================================
//     // CLOSE DETAILS
//     // ========================================================

//     const handleCloseDetails = () => {

//         setSelectedPrincipal(
//             null
//         );

//     };


//     // ========================================================
//     // REFRESH
//     // ========================================================

//     const handleRefresh = () => {

//         loadPrincipals();

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (

//             <div>

//                 <h1>
//                     Admin Principal
//                 </h1>

//                 <p>
//                     Loading principals...
//                 </p>

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
//                 Admin Principal
//             </h1>


//             {/* =================================================
//                 BUTTONS
//             ================================================= */}

//             <button
//                 type="button"
//                 onClick={
//                     handleAdd
//                 }
//             >
//                 Add Principal
//             </button>


//             {" "}


//             <button
//                 type="button"
//                 onClick={
//                     handleRefresh
//                 }
//             >
//                 Refresh
//             </button>


//             <br />
//             <br />


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
//                 CREATE / EDIT FORM
//             ================================================= */}

//             {showForm && (

//                 <div>

//                     <hr />


//                     <h2>
//                         {
//                             editMode
//                                 ? "Edit Principal"
//                                 : "Add Principal"
//                         }
//                     </h2>


//                     <form
//                         onSubmit={
//                             handleSubmit
//                         }
//                     >

//                         {/* =====================================
//                             USERNAME
//                         ===================================== */}

//                         <div>

//                             <label>
//                                 Username
//                             </label>

//                             <br />

//                             <input
//                                 type="text"
//                                 value={
//                                     username
//                                 }
//                                 onChange={(e) =>
//                                     setUsername(
//                                         e.target.value
//                                     )
//                                 }
//                                 placeholder="Enter username"
//                             />

//                         </div>


//                         <br />


//                         {/* =====================================
//                             PASSWORD
//                         ===================================== */}

//                         <div>

//                             <label>
//                                 Password
//                                 {
//                                     editMode
//                                         ? " (leave blank to keep current)"
//                                         : ""
//                                 }
//                             </label>

//                             <br />

//                             <input
//                                 type="password"
//                                 value={
//                                     password
//                                 }
//                                 onChange={(e) =>
//                                     setPassword(
//                                         e.target.value
//                                     )
//                                 }
//                                 placeholder={
//                                     editMode
//                                         ? "Enter new password"
//                                         : "Enter password"
//                                 }
//                             />

//                         </div>


//                         <br />


//                         {/* =====================================
//                             EMAIL
//                         ===================================== */}

//                         <div>

//                             <label>
//                                 Email
//                             </label>

//                             <br />

//                             <input
//                                 type="email"
//                                 value={
//                                     email
//                                 }
//                                 onChange={(e) =>
//                                     setEmail(
//                                         e.target.value
//                                     )
//                                 }
//                                 placeholder="Enter email"
//                             />

//                         </div>


//                         <br />


//                         {/* =====================================
//                             ACTIVE
//                         ===================================== */}

//                         {editMode && (

//                             <div>

//                                 <label>

//                                     <input
//                                         type="checkbox"
//                                         checked={
//                                             isActive
//                                         }
//                                         onChange={(e) =>
//                                             setIsActive(
//                                                 e.target.checked
//                                             )
//                                         }
//                                     />

//                                     {" "}
//                                     Active

//                                 </label>

//                             </div>

//                         )}


//                         {editMode && (
//                             <br />
//                         )}


//                         {/* =====================================
//                             FORM BUTTONS
//                         ===================================== */}

//                         <button
//                             type="submit"
//                             disabled={saving}
//                         >
//                             {
//                                 saving
//                                     ? "Saving..."
//                                     : editMode
//                                         ? "Update Principal"
//                                         : "Create Principal"
//                             }
//                         </button>


//                         {" "}


//                         <button
//                             type="button"
//                             onClick={
//                                 handleCloseForm
//                             }
//                             disabled={saving}
//                         >
//                             Cancel
//                         </button>

//                     </form>


//                     <hr />

//                 </div>

//             )}


//             {/* =================================================
//                 SEARCH
//             ================================================= */}

//             <input
//                 type="text"
//                 placeholder="Search username / email..."
//                 value={search}
//                 onChange={(e) =>
//                     setSearch(
//                         e.target.value
//                     )
//                 }
//             />


//             <br />
//             <br />


//             {/* =================================================
//                 COUNT
//             ================================================= */}

//             <p>

//                 Showing{" "}

//                 {
//                     filteredPrincipals.length
//                 }

//                 {" "}
//                 principal(s)

//             </p>


//             {/* =================================================
//                 PRINCIPAL TABLE
//             ================================================= */}

//             {filteredPrincipals.length === 0 ? (

//                 <p>
//                     No principals found.
//                 </p>

//             ) : (

//                 <table
//                     border="1"
//                     cellPadding="8"
//                     cellSpacing="0"
//                 >

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
//                                 Active
//                             </th>

//                             <th>
//                                 Action
//                             </th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {filteredPrincipals.map(
//                             (item) => (

//                                 <tr
//                                     key={
//                                         item.id
//                                     }
//                                 >

//                                     <td>
//                                         {
//                                             item.id
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.username ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.email ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.role ||
//                                             "Principal"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.is_active
//                                                 ? "Yes"
//                                                 : "No"
//                                         }
//                                     </td>


//                                     <td>

//                                         <button
//                                             type="button"
//                                             onClick={() =>
//                                                 handleView(
//                                                     item
//                                                 )
//                                             }
//                                         >
//                                             View
//                                         </button>


//                                         {" "}


//                                         <button
//                                             type="button"
//                                             onClick={() =>
//                                                 handleEdit(
//                                                     item
//                                                 )
//                                             }
//                                         >
//                                             Edit
//                                         </button>


//                                         {" "}


//                                         <button
//                                             type="button"
//                                             onClick={() =>
//                                                 handleDelete(
//                                                     item
//                                                 )
//                                             }
//                                             disabled={
//                                                 deletingId ===
//                                                 item.id
//                                             }
//                                         >
//                                             {
//                                                 deletingId ===
//                                                 item.id
//                                                     ? "Deleting..."
//                                                     : "Delete"
//                                             }
//                                         </button>

//                                     </td>

//                                 </tr>

//                             )
//                         )}

//                     </tbody>

//                 </table>

//             )}


//             {/* =================================================
//                 PRINCIPAL DETAILS
//             ================================================= */}

//             {selectedPrincipal && (

//                 <div>

//                     <hr />


//                     <h2>
//                         Principal Details
//                     </h2>


//                     <p>

//                         <strong>
//                             ID:
//                         </strong>{" "}

//                         {
//                             selectedPrincipal.id
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Username:
//                         </strong>{" "}

//                         {
//                             selectedPrincipal.username ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Email:
//                         </strong>{" "}

//                         {
//                             selectedPrincipal.email ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Role:
//                         </strong>{" "}

//                         {
//                             selectedPrincipal.role ||
//                             "Principal"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Active:
//                         </strong>{" "}

//                         {
//                             selectedPrincipal.is_active
//                                 ? "Yes"
//                                 : "No"
//                         }

//                     </p>


//                     <button
//                         type="button"
//                         onClick={
//                             handleCloseDetails
//                         }
//                     >
//                         Close
//                     </button>

//                 </div>

//             )}

//         </div>

//     );

// }


// export default AdminPrincipal;









import {
    useEffect,
    useState
} from "react";

import api from "../../api/axios";


function AdminPrincipal() {

    // ========================================================
    // DATA
    // ========================================================

    const [principals, setPrincipals] =
        useState([]);


    // ========================================================
    // FORM STATES
    // ========================================================

    const [showForm, setShowForm] =
        useState(false);

    const [editMode, setEditMode] =
        useState(false);

    const [editingId, setEditingId] =
        useState(null);

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [isActive, setIsActive] =
        useState(true);


    // ========================================================
    // SEARCH
    // ========================================================

    const [search, setSearch] =
        useState("");


    // ========================================================
    // SELECTED PRINCIPAL
    // ========================================================

    const [selectedPrincipal, setSelectedPrincipal] =
        useState(null);


    // ========================================================
    // UI STATES
    // ========================================================

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [deletingId, setDeletingId] =
        useState(null);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    // ========================================================
    // INITIAL LOAD
    // ========================================================

    useEffect(() => {

        loadPrincipals();

    }, []);


    // ========================================================
    // LOAD PRINCIPALS
    // ========================================================

    const loadPrincipals = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "admin/users/?role=Principal&page_size=100"
            );

            console.log(
                "Admin Principal:",
                response.data
            );

            setPrincipals(
                response.data.results ||
                response.data ||
                []
            );

        } catch (error) {

            console.error(
                "Admin Principal Error:",
                error.response?.data || error
            );

            setPrincipals([]);

            setError(
                error.response?.data?.detail ||
                "Unable to load principals."
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // FILTER PRINCIPALS
    // ========================================================

    const filteredPrincipals =
        principals.filter(
            (item) => {

                const searchValue =
                    search
                        .toLowerCase()
                        .trim();

                const username =
                    String(
                        item.username || ""
                    ).toLowerCase();

                const email =
                    String(
                        item.email || ""
                    ).toLowerCase();


                return (

                    searchValue === ""

                    ||

                    username.includes(
                        searchValue
                    )

                    ||

                    email.includes(
                        searchValue
                    )

                );

            }
        );


    // ========================================================
    // OPEN ADD FORM
    // ========================================================

    const handleAdd = () => {

        setShowForm(true);
        setEditMode(false);
        setEditingId(null);

        setUsername("");
        setPassword("");
        setEmail("");
        setIsActive(true);

        setSelectedPrincipal(null);

        setError("");
        setSuccess("");

    };


    // ========================================================
    // OPEN EDIT FORM
    // ========================================================

    const handleEdit = (item) => {

        setShowForm(true);
        setEditMode(true);

        setEditingId(item.id);

        setUsername(
            item.username || ""
        );

        setPassword("");

        setEmail(
            item.email || ""
        );

        setIsActive(
            item.is_active !== false
        );

        setSelectedPrincipal(null);

        setError("");
        setSuccess("");

    };


    // ========================================================
    // CLOSE FORM
    // ========================================================

    const handleCloseForm = () => {

        setShowForm(false);
        setEditMode(false);
        setEditingId(null);

        setUsername("");
        setPassword("");
        setEmail("");
        setIsActive(true);

        setError("");

    };


    // ========================================================
    // CREATE / UPDATE PRINCIPAL
    // ========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        // ----------------------------------------------------
        // VALIDATION
        // ----------------------------------------------------

        if (!username.trim()) {

            setError(
                "Username is required."
            );

            return;

        }

        if (!editMode && !password) {

            setError(
                "Password is required."
            );

            return;

        }

        if (
            password &&
            password.length < 6
        ) {

            setError(
                "Password must contain at least 6 characters."
            );

            return;

        }

        if (!email.trim()) {

            setError(
                "Email is required."
            );

            return;

        }


        try {

            setSaving(true);


            // ------------------------------------------------
            // CREATE
            // ------------------------------------------------

            if (!editMode) {

                const data = {

                    username:
                        username.trim(),

                    password:
                        password,

                    email:
                        email.trim(),

                    role:
                        "Principal"

                };


                const response =
                    await api.post(
                        "admin/users/",
                        data
                    );


                console.log(
                    "Principal Created:",
                    response.data
                );


                setSuccess(
                    "Principal created successfully."
                );

            }


            // ------------------------------------------------
            // UPDATE
            // ------------------------------------------------

            else {

                const data = {

                    username:
                        username.trim(),

                    email:
                        email.trim(),

                    role:
                        "Principal",

                    is_active:
                        isActive

                };


                if (password) {

                    data.password =
                        password;

                }


                const response =
                    await api.patch(
                        `admin/users/${editingId}/`,
                        data
                    );


                console.log(
                    "Principal Updated:",
                    response.data
                );


                setSuccess(
                    "Principal updated successfully."
                );

            }


            await loadPrincipals();


            // ------------------------------------------------
            // RESET FORM
            // ------------------------------------------------

            setUsername("");
            setPassword("");
            setEmail("");
            setIsActive(true);

            setEditingId(null);
            setEditMode(false);

        } catch (error) {

            console.error(
                "Principal Save Error:",
                error.response?.data || error
            );

            const responseData =
                error.response?.data;


            if (
                responseData &&
                typeof responseData === "object"
            ) {

                const messages =
                    Object.entries(responseData)
                        .map(
                            ([field, message]) =>
                                `${field}: ${
                                    Array.isArray(message)
                                        ? message.join(", ")
                                        : message
                                }`
                        )
                        .join(" | ");


                setError(
                    messages ||
                    "Unable to save principal."
                );

            } else {

                setError(
                    "Unable to save principal."
                );

            }

        } finally {

            setSaving(false);

        }

    };


    // ========================================================
    // DELETE PRINCIPAL
    // ========================================================

    const handleDelete = async (item) => {

        const confirmed =
            window.confirm(
                `Delete Principal "${item.username}"?`
            );


        if (!confirmed) {
            return;
        }


        try {

            setDeletingId(item.id);

            setError("");
            setSuccess("");

            await api.delete(
                `admin/users/${item.id}/`
            );

            setSuccess(
                "Principal deleted successfully."
            );


            if (
                selectedPrincipal?.id ===
                item.id
            ) {

                setSelectedPrincipal(
                    null
                );

            }


            await loadPrincipals();

        } catch (error) {

            console.error(
                "Delete Principal Error:",
                error.response?.data || error
            );

            setError(
                error.response?.data?.detail ||
                "Unable to delete principal."
            );

        } finally {

            setDeletingId(null);

        }

    };


    // ========================================================
    // VIEW DETAILS
    // ========================================================

    const handleView = (item) => {

        setSelectedPrincipal(item);

    };


    // ========================================================
    // CLOSE DETAILS
    // ========================================================

    const handleCloseDetails = () => {

        setSelectedPrincipal(null);

    };


    // ========================================================
    // REFRESH
    // ========================================================

    const handleRefresh = () => {

        loadPrincipals();

    };


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (

            <div className="admin-page admin-principal-page">

                <div className="admin-loading-state">

                    <h1>
                        Admin Principal
                    </h1>

                    <p>
                        Loading principals...
                    </p>

                </div>

            </div>

        );

    }


    // ========================================================
    // UI
    // ========================================================

    return (

        <div className="admin-page admin-principal-page">

            {/* PAGE HEADER */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Admin Principal
                    </h1>

                    <p>
                        Manage college principals
                    </p>

                </div>


                <div className="admin-header-actions">

                    <button
                        type="button"
                        className="admin-primary-btn"
                        onClick={handleAdd}
                    >
                        Add Principal
                    </button>


                    <button
                        type="button"
                        className="admin-secondary-btn"
                        onClick={handleRefresh}
                    >
                        Refresh
                    </button>

                </div>

            </div>


            {/* ALERTS */}

            {success && (

                <div className="admin-alert admin-alert-success">
                    {success}
                </div>

            )}

            {error && (

                <div className="admin-alert admin-alert-error">
                    {error}
                </div>

            )}


            {/* CREATE / EDIT FORM */}

            {showForm && (

                <div className="admin-form-card">

                    <div className="admin-section-header">

                        <h2>
                            {
                                editMode
                                    ? "Edit Principal"
                                    : "Add Principal"
                            }
                        </h2>

                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="admin-form-grid">

                            {/* USERNAME */}

                            <div className="admin-form-group">

                                <label>
                                    Username
                                </label>

                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter username"
                                />

                            </div>


                            {/* PASSWORD */}

                            <div className="admin-form-group">

                                <label>
                                    Password
                                    {
                                        editMode
                                            ? " (leave blank to keep current)"
                                            : ""
                                    }
                                </label>

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder={
                                        editMode
                                            ? "Enter new password"
                                            : "Enter password"
                                    }
                                />

                            </div>


                            {/* EMAIL */}

                            <div className="admin-form-group">

                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter email"
                                />

                            </div>

                        </div>


                        {/* ACTIVE */}

                        {editMode && (

                            <div className="admin-checkbox-group">

                                <label>

                                    <input
                                        type="checkbox"
                                        checked={isActive}
                                        onChange={(e) =>
                                            setIsActive(
                                                e.target.checked
                                            )
                                        }
                                    />

                                    <span>
                                        Active
                                    </span>

                                </label>

                            </div>

                        )}


                        {/* FORM ACTIONS */}

                        <div className="admin-form-actions">

                            <button
                                type="submit"
                                className="admin-primary-btn"
                                disabled={saving}
                            >
                                {
                                    saving
                                        ? "Saving..."
                                        : editMode
                                            ? "Update Principal"
                                            : "Create Principal"
                                }
                            </button>


                            <button
                                type="button"
                                className="admin-secondary-btn"
                                onClick={
                                    handleCloseForm
                                }
                                disabled={saving}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* SEARCH */}

            <div className="admin-toolbar">

                <div className="admin-form-group">

                    <label>
                        Search
                    </label>

                    <input
                        type="text"
                        placeholder="Search username / email..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </div>

            </div>


            {/* COUNT */}

            <div className="admin-list-summary">

                Showing{" "}
                <strong>
                    {filteredPrincipals.length}
                </strong>{" "}
                principal(s)

            </div>


            {/* PRINCIPAL TABLE */}

            <div className="admin-table-card">

                {filteredPrincipals.length === 0 ? (

                    <div className="admin-empty-state">
                        No principals found.
                    </div>

                ) : (

                    <div className="admin-table-wrapper">

                        <table className="admin-table">

                            <thead>

                                <tr>

                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Active</th>
                                    <th>Action</th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredPrincipals.map(
                                    (item) => (

                                        <tr
                                            key={item.id}
                                        >

                                            <td>
                                                {item.id}
                                            </td>

                                            <td>
                                                {item.username || "-"}
                                            </td>

                                            <td>
                                                {item.email || "-"}
                                            </td>

                                            <td>
                                                {item.role || "Principal"}
                                            </td>

                                            <td>
                                                {item.is_active
                                                    ? "Yes"
                                                    : "No"}
                                            </td>

                                            <td>

                                                <div className="admin-action-group">

                                                    <button
                                                        type="button"
                                                        className="admin-secondary-btn"
                                                        onClick={() =>
                                                            handleView(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>


                                                    <button
                                                        type="button"
                                                        className="admin-secondary-btn"
                                                        onClick={() =>
                                                            handleEdit(
                                                                item
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
                                                                item
                                                            )
                                                        }
                                                        disabled={
                                                            deletingId ===
                                                            item.id
                                                        }
                                                    >
                                                        {
                                                            deletingId ===
                                                            item.id
                                                                ? "Deleting..."
                                                                : "Delete"
                                                        }
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


            {/* PRINCIPAL DETAILS */}

            {selectedPrincipal && (

                <div className="admin-detail-card">

                    <div className="admin-section-header">

                        <h2>
                            Principal Details
                        </h2>

                    </div>


                    <div className="admin-detail-grid">

                        <div>
                            <strong>ID</strong>
                            <span>
                                {selectedPrincipal.id}
                            </span>
                        </div>

                        <div>
                            <strong>Username</strong>
                            <span>
                                {selectedPrincipal.username || "-"}
                            </span>
                        </div>

                        <div>
                            <strong>Email</strong>
                            <span>
                                {selectedPrincipal.email || "-"}
                            </span>
                        </div>

                        <div>
                            <strong>Role</strong>
                            <span>
                                {
                                    selectedPrincipal.role ||
                                    "Principal"
                                }
                            </span>
                        </div>

                        <div>
                            <strong>Active</strong>
                            <span>
                                {selectedPrincipal.is_active
                                    ? "Yes"
                                    : "No"}
                            </span>
                        </div>

                    </div>


                    <div className="admin-form-actions">

                        <button
                            type="button"
                            className="admin-secondary-btn"
                            onClick={
                                handleCloseDetails
                            }
                        >
                            Close
                        </button>

                    </div>

                </div>

            )}

        </div>

    );

}


export default AdminPrincipal;