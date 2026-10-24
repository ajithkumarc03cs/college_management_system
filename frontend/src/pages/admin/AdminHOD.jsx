// import {
//     useEffect,
//     useState
// } from "react";

// import api from "../../api/axios";


// function AdminHOD() {

//     // ========================================================
//     // DATA
//     // ========================================================

//     const [hods, setHods] = useState([]);

//     const [departments, setDepartments] =
//         useState([]);


//     // ========================================================
//     // FILTERS
//     // ========================================================

//     const [search, setSearch] = useState("");

//     const [departmentFilter, setDepartmentFilter] =
//         useState("");


//     // ========================================================
//     // SELECTED HOD
//     // ========================================================

//     const [selectedHOD, setSelectedHOD] =
//         useState(null);


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

//     const [department, setDepartment] =
//         useState("");

//     const [isActive, setIsActive] =
//         useState(true);


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
//     // INITIAL LOAD
//     // ========================================================

//     useEffect(() => {

//         loadHODs();

//         loadDepartments();

//     }, []);


//     // ========================================================
//     // LOAD HOD
//     // ========================================================

//     const loadHODs = async () => {

//         try {

//             setLoading(true);

//             setError("");


//             const response = await api.get(
//                 "admin/users/?role=HOD&page_size=100"
//             );


//             console.log(
//                 "Admin HOD:",
//                 response.data
//             );


//             setHods(
//                 response.data.results ||
//                 response.data ||
//                 []
//             );


//         } catch (error) {

//             console.error(
//                 "Admin HOD Error:",
//                 error.response?.data || error
//             );


//             setHods([]);


//             setError(
//                 error.response?.data?.detail ||
//                 "Unable to load HOD."
//             );


//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // LOAD DEPARTMENTS
//     // ========================================================

//     const loadDepartments = async () => {

//         try {

//             const response = await api.get(
//                 "departments/?page_size=100"
//             );


//             console.log(
//                 "Departments:",
//                 response.data
//             );


//             setDepartments(
//                 response.data.results ||
//                 response.data ||
//                 []
//             );


//         } catch (error) {

//             console.error(
//                 "Department Error:",
//                 error.response?.data || error
//             );

//         }

//     };


//     // ========================================================
//     // DEPARTMENT OPTIONS
//     // ========================================================

//     const departmentOptions = [

//         ...new Map(

//             hods
//                 .filter(
//                     (item) =>
//                         item.department_id !== null &&
//                         item.department_id !== undefined
//                 )
//                 .map(
//                     (item) => [
//                         item.department_id,
//                         item.department
//                     ]
//                 )

//         ).entries()

//     ];


//     // ========================================================
//     // FILTER HOD
//     // ========================================================

//     const filteredHODs =
//         hods.filter(
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


//                 const departmentName =
//                     String(
//                         item.department ||
//                         ""
//                     )
//                     .toLowerCase();


//                 const matchesSearch =

//                     searchValue === ""

//                     ||

//                     username.includes(
//                         searchValue
//                     )

//                     ||

//                     email.includes(
//                         searchValue
//                     )

//                     ||

//                     departmentName.includes(
//                         searchValue
//                     );


//                 const matchesDepartment =

//                     departmentFilter === ""

//                     ||

//                     String(
//                         item.department_id
//                     ) ===
//                     String(
//                         departmentFilter
//                     );


//                 return (
//                     matchesSearch &&
//                     matchesDepartment
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

//         setDepartment("");

//         setIsActive(true);


//         setSelectedHOD(null);

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

//         setDepartment(
//             item.department_id
//                 ? String(
//                     item.department_id
//                 )
//                 : ""
//         );

//         setIsActive(
//             item.is_active !== false
//         );


//         setSelectedHOD(null);

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

//         setDepartment("");

//         setIsActive(true);

//         setError("");

//     };


//     // ========================================================
//     // CREATE / UPDATE
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


//         if (!department) {

//             setError(
//                 "Please select a department."
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
//                         "HOD",

//                     department:
//                         Number(
//                             department
//                         )

//                 };


//                 const response =
//                     await api.post(
//                         "admin/users/",
//                         data
//                     );


//                 console.log(
//                     "HOD Created:",
//                     response.data
//                 );


//                 setSuccess(
//                     "HOD created successfully."
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
//                         "HOD",

//                     department:
//                         Number(
//                             department
//                         ),

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
//                     "HOD Updated:",
//                     response.data
//                 );


//                 setSuccess(
//                     "HOD updated successfully."
//                 );

//             }


//             // ------------------------------------------------
//             // RELOAD
//             // ------------------------------------------------

//             await loadHODs();


//             // ------------------------------------------------
//             // RESET FORM
//             // ------------------------------------------------

//             setUsername("");

//             setPassword("");

//             setEmail("");

//             setDepartment("");

//             setIsActive(true);

//             setEditingId(null);

//             setEditMode(false);


//         } catch (error) {

//             console.error(
//                 "HOD Save Error:",
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
//                     "Unable to save HOD."
//                 );

//             } else {

//                 setError(
//                     "Unable to save HOD."
//                 );

//             }

//         } finally {

//             setSaving(false);

//         }

//     };


//     // ========================================================
//     // DELETE HOD
//     // ========================================================

//     const handleDelete = async (
//         item
//     ) => {

//         const confirmed =
//             window.confirm(
//                 `Delete HOD "${item.username}"?`
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
//                 "HOD deleted successfully."
//             );


//             if (
//                 selectedHOD?.id ===
//                 item.id
//             ) {

//                 setSelectedHOD(
//                     null
//                 );

//             }


//             await loadHODs();


//         } catch (error) {

//             console.error(
//                 "Delete HOD Error:",
//                 error.response?.data || error
//             );


//             setError(
//                 error.response?.data?.detail ||
//                 "Unable to delete HOD."
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

//         setSelectedHOD(
//             item
//         );

//     };


//     // ========================================================
//     // CLOSE DETAILS
//     // ========================================================

//     const handleCloseDetails = () => {

//         setSelectedHOD(
//             null
//         );

//     };


//     // ========================================================
//     // CLEAR FILTERS
//     // ========================================================

//     const clearFilters = () => {

//         setSearch("");

//         setDepartmentFilter("");

//     };


//     // ========================================================
//     // REFRESH
//     // ========================================================

//     const handleRefresh = () => {

//         loadHODs();

//         loadDepartments();

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (

//             <div>

//                 <h1>
//                     Admin HOD
//                 </h1>

//                 <p>
//                     Loading HOD...
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
//                 Admin HOD
//             </h1>


//             {/* =================================================
//                 TOP BUTTONS
//             ================================================= */}

//             <button
//                 type="button"
//                 onClick={handleAdd}
//             >
//                 Add HOD
//             </button>


//             {" "}


//             <button
//                 type="button"
//                 onClick={handleRefresh}
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
//                 ADD / EDIT FORM
//             ================================================= */}

//             {showForm && (

//                 <div>

//                     <hr />


//                     <h2>
//                         {editMode
//                             ? "Edit HOD"
//                             : "Add HOD"}
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
//                             DEPARTMENT
//                         ===================================== */}

//                         <div>

//                             <label>
//                                 Department
//                             </label>

//                             <br />


//                             <select
//                                 value={
//                                     department
//                                 }
//                                 onChange={(e) =>
//                                     setDepartment(
//                                         e.target.value
//                                     )
//                                 }
//                             >

//                                 <option value="">
//                                     Select Department
//                                 </option>


//                                 {departments.map(
//                                     (item) => (

//                                         <option
//                                             key={
//                                                 item.id
//                                             }
//                                             value={
//                                                 item.id
//                                             }
//                                         >
//                                             {
//                                                 item.name
//                                             }
//                                         </option>

//                                     )
//                                 )}

//                             </select>

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
//                             BUTTONS
//                         ===================================== */}

//                         <button
//                             type="submit"
//                             disabled={saving}
//                         >
//                             {
//                                 saving
//                                     ? "Saving..."
//                                     : editMode
//                                         ? "Update HOD"
//                                         : "Create HOD"
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
//                 placeholder="Search username / email / department..."
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
//                 DEPARTMENT FILTER
//             ================================================= */}

//             <label>
//                 Department:
//             </label>

//             {" "}


//             <select
//                 value={
//                     departmentFilter
//                 }
//                 onChange={(e) =>
//                     setDepartmentFilter(
//                         e.target.value
//                     )
//                 }
//             >

//                 <option value="">
//                     All Departments
//                 </option>


//                 {departmentOptions.map(
//                     ([id, name]) => (

//                         <option
//                             key={id}
//                             value={id}
//                         >
//                             {
//                                 name ||
//                                 "-"
//                             }
//                         </option>

//                     )
//                 )}

//             </select>


//             <br />
//             <br />


//             {/* =================================================
//                 FILTER BUTTON
//             ================================================= */}

//             <button
//                 type="button"
//                 onClick={
//                     clearFilters
//                 }
//             >
//                 Clear Filters
//             </button>


//             {/* =================================================
//                 COUNT
//             ================================================= */}

//             <p>

//                 Showing{" "}

//                 {
//                     filteredHODs.length
//                 }

//                 {" "}
//                 HOD(s)

//             </p>


//             {/* =================================================
//                 HOD TABLE
//             ================================================= */}

//             {filteredHODs.length === 0 ? (

//                 <p>
//                     No HOD found.
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
//                                 Department
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

//                         {filteredHODs.map(
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
//                                             "HOD"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.department ||
//                                             "-"
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
//                 HOD DETAILS
//             ================================================= */}

//             {selectedHOD && (

//                 <div>

//                     <hr />


//                     <h2>
//                         HOD Details
//                     </h2>


//                     <p>

//                         <strong>
//                             ID:
//                         </strong>{" "}

//                         {
//                             selectedHOD.id
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Username:
//                         </strong>{" "}

//                         {
//                             selectedHOD.username ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Email:
//                         </strong>{" "}

//                         {
//                             selectedHOD.email ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Role:
//                         </strong>{" "}

//                         {
//                             selectedHOD.role ||
//                             "HOD"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Department:
//                         </strong>{" "}

//                         {
//                             selectedHOD.department ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Department ID:
//                         </strong>{" "}

//                         {
//                             selectedHOD.department_id ??
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Active:
//                         </strong>{" "}

//                         {
//                             selectedHOD.is_active
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


// export default AdminHOD;



import { useEffect, useState } from "react";
import api from "../../api/axios";

const HOD_ROLE_ID = 3;

function AdminHOD() {
    // DATA
    const [hods, setHods] = useState([]);
    const [departments, setDepartments] = useState([]);

    // FILTERS
    const [search, setSearch] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");

    // SELECTED HOD
    const [selectedHOD, setSelectedHOD] = useState(null);

    // CREATE / EDIT FORM
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [isActive, setIsActive] = useState(true);

    // UI
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadHODs();
        loadDepartments();
    }, []);

    // LOAD HODS
    const loadHODs = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "admin/users/?role=HOD&page_size=100"
            );

            const data = response.data;
            const users = Array.isArray(data)
                ? data
                : data.results || [];

            // Keep only HOD accounts, supporting either
            // role name or role ID in the API response.
            setHods(
                users.filter(
                    (item) =>
                        String(item.role || "").toLowerCase() === "hod" ||
                        Number(item.role_id ?? item.role) === HOD_ROLE_ID
                )
            );
        } catch (err) {
            console.error(
                "Admin HOD load error:",
                err.response?.data || err
            );

            setHods([]);
            setError(
                err.response?.data?.detail ||
                "Unable to load HODs. Please check the API."
            );
        } finally {
            setLoading(false);
        }
    };

    // LOAD DEPARTMENTS
    const loadDepartments = async () => {
        try {
            const response = await api.get(
                "departments/?page_size=100"
            );

            const data = response.data;
            setDepartments(
                Array.isArray(data) ? data : data.results || []
            );
        } catch (err) {
            console.error(
                "Department load error:",
                err.response?.data || err
            );
        }
    };

    // DEPARTMENT FILTER OPTIONS
    const departmentOptions = [
        ...new Map(
            hods
                .filter(
                    (item) =>
                        item.department_id !== null &&
                        item.department_id !== undefined
                )
                .map((item) => [
                    item.department_id,
                    item.department
                ])
        ).entries()
    ];

    // FILTER HODS
    const filteredHODs = hods.filter((item) => {
        const searchValue = search.toLowerCase().trim();

        const matchesSearch =
            !searchValue ||
            String(item.username || "")
                .toLowerCase()
                .includes(searchValue) ||
            String(item.email || "")
                .toLowerCase()
                .includes(searchValue) ||
            String(item.department || "")
                .toLowerCase()
                .includes(searchValue);

        const matchesDepartment =
            !departmentFilter ||
            String(item.department_id) === String(departmentFilter);

        return matchesSearch && matchesDepartment;
    });

    // RESET FORM
    const resetForm = () => {
        setUsername("");
        setPassword("");
        setEmail("");
        setDepartment("");
        setIsActive(true);
        setEditingId(null);
        setEditMode(false);
        setShowForm(false);
    };

    // OPEN ADD FORM
    const handleAdd = () => {
        resetForm();
        setShowForm(true);
        setSelectedHOD(null);
        setError("");
        setSuccess("");
    };

    // OPEN EDIT FORM
    const handleEdit = (item) => {
        setShowForm(true);
        setEditMode(true);
        setEditingId(item.id);

        setUsername(item.username || "");
        setPassword("");
        setEmail(item.email || "");
        setDepartment(
            item.department_id != null
                ? String(item.department_id)
                : ""
        );
        setIsActive(item.is_active !== false);

        setSelectedHOD(null);
        setError("");
        setSuccess("");
    };

    // CLOSE FORM
    const handleCloseForm = () => {
        resetForm();
        setError("");
    };

    // CREATE / UPDATE HOD
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!username.trim()) {
            setError("Username is required.");
            return;
        }

        if (!editMode && !password) {
            setError("Password is required.");
            return;
        }

        if (password && password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        if (!email.trim()) {
            setError("Email is required.");
            return;
        }

        if (!department) {
            setError("Please select a department.");
            return;
        }

        try {
            setSaving(true);

            if (!editMode) {
                // CREATE HOD
                const data = {
                    username: username.trim(),
                    password,
                    email: email.trim(),
                    role: HOD_ROLE_ID,
                    department: Number(department)
                };

                const response = await api.post(
                    "admin/users/",
                    data
                );

                console.log("HOD created:", response.data);
                setSuccess("HOD created successfully.");
            } else {
                // UPDATE HOD
                const data = {
                    username: username.trim(),
                    email: email.trim(),
                    role: HOD_ROLE_ID,
                    department: Number(department),
                    is_active: isActive
                };

                if (password) {
                    data.password = password;
                }

                const response = await api.patch(
                    `admin/users/${editingId}/`,
                    data
                );

                console.log("HOD updated:", response.data);
                setSuccess("HOD updated successfully.");
            }

            resetForm();
            await loadHODs();
        } catch (err) {
            console.error(
                "HOD save error:",
                err.response?.data || err
            );

            const responseData = err.response?.data;

            if (responseData && typeof responseData === "object") {
                const messages = Object.entries(responseData)
                    .map(([field, message]) => {
                        const detail = Array.isArray(message)
                            ? message.join(", ")
                            : typeof message === "object"
                                ? JSON.stringify(message)
                                : String(message);

                        return `${field}: ${detail}`;
                    })
                    .join(" | ");

                setError(messages || "Unable to save HOD.");
            } else {
                setError("Unable to save HOD. Please try again.");
            }
        } finally {
            setSaving(false);
        }
    };

    // DELETE HOD
    const handleDelete = async (item) => {
        const confirmed = window.confirm(
            `Delete HOD "${item.username}"?`
        );

        if (!confirmed) return;

        try {
            setDeletingId(item.id);
            setError("");
            setSuccess("");

            await api.delete(`admin/users/${item.id}/`);

            setSuccess("HOD deleted successfully.");

            if (selectedHOD?.id === item.id) {
                setSelectedHOD(null);
            }

            await loadHODs();
        } catch (err) {
            console.error(
                "HOD delete error:",
                err.response?.data || err
            );

            setError(
                err.response?.data?.detail ||
                "Unable to delete HOD."
            );
        } finally {
            setDeletingId(null);
        }
    };

    // VIEW DETAILS
    const handleView = (item) => {
        setSelectedHOD(item);
    };

    // REFRESH
    const handleRefresh = () => {
        loadHODs();
        loadDepartments();
    };

    // CLEAR FILTERS
    const clearFilters = () => {
        setSearch("");
        setDepartmentFilter("");
    };

    if (loading) {
        return (
            <div>
                <h1>Admin HOD</h1>
                <p>Loading HODs...</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Admin HOD</h1>

            <button type="button" onClick={handleAdd}>
                Add HOD
            </button>{" "}

            <button type="button" onClick={handleRefresh}>
                Refresh
            </button>

            {success && (
                <p style={{ color: "green" }}>{success}</p>
            )}

            {error && (
                <p style={{ color: "red" }}>{error}</p>
            )}

            {/* ADD / EDIT FORM */}
            {showForm && (
                <div>
                    <hr />

                    <h2>{editMode ? "Edit HOD" : "Add HOD"}</h2>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Username</label>
                            <br />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                placeholder="Enter username"
                                required
                            />
                        </div>

                        <br />

                        <div>
                            <label>
                                Password
                                {editMode
                                    ? " (leave blank to keep current)"
                                    : ""}
                            </label>
                            <br />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder={
                                    editMode
                                        ? "Enter new password"
                                        : "Enter password"
                                }
                                required={!editMode}
                                minLength={6}
                            />
                        </div>

                        <br />

                        <div>
                            <label>Email</label>
                            <br />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="Enter email"
                                required
                            />
                        </div>

                        <br />

                        <div>
                            <label>Department</label>
                            <br />
                            <select
                                value={department}
                                onChange={(e) =>
                                    setDepartment(e.target.value)
                                }
                                required
                            >
                                <option value="">
                                    Select Department
                                </option>

                                {departments.map((item) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <br />

                        {editMode && (
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={isActive}
                                        onChange={(e) =>
                                            setIsActive(e.target.checked)
                                        }
                                    />{" "}
                                    Active
                                </label>
                            </div>
                        )}

                        <br />

                        <button type="submit" disabled={saving}>
                            {saving
                                ? "Saving..."
                                : editMode
                                    ? "Update HOD"
                                    : "Create HOD"}
                        </button>{" "}

                        <button
                            type="button"
                            onClick={handleCloseForm}
                            disabled={saving}
                        >
                            Cancel
                        </button>
                    </form>

                    <hr />
                </div>
            )}

            {/* SEARCH */}
            <input
                type="text"
                placeholder="Search username / email / department..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <br />
            <br />

            {/* DEPARTMENT FILTER */}
            <label>Department: </label>

            <select
                value={departmentFilter}
                onChange={(e) =>
                    setDepartmentFilter(e.target.value)
                }
            >
                <option value="">All Departments</option>

                {departmentOptions.map(([id, name]) => (
                    <option key={id} value={id}>
                        {name || "-"}
                    </option>
                ))}
            </select>{" "}

            <button type="button" onClick={clearFilters}>
                Clear Filters
            </button>

            <p>Showing {filteredHODs.length} HOD(s)</p>

            {/* HOD TABLE */}
            {filteredHODs.length === 0 ? (
                <p>No HOD found.</p>
            ) : (
                <table border="1" cellPadding="8" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Department</th>
                            <th>Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredHODs.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.username || "-"}</td>
                                <td>{item.email || "-"}</td>
                                <td>
                                    {typeof item.role === "string"
                                        ? item.role
                                        : item.role_name || "HOD"}
                                </td>
                                <td>{item.department || "-"}</td>
                                <td>
                                    {item.is_active ? "Yes" : "No"}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => handleView(item)}
                                    >
                                        View
                                    </button>{" "}

                                    <button
                                        type="button"
                                        onClick={() => handleEdit(item)}
                                    >
                                        Edit
                                    </button>{" "}

                                    <button
                                        type="button"
                                        onClick={() => handleDelete(item)}
                                        disabled={deletingId === item.id}
                                    >
                                        {deletingId === item.id
                                            ? "Deleting..."
                                            : "Delete"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* HOD DETAILS */}
            {selectedHOD && (
                <div>
                    <hr />
                    <h2>HOD Details</h2>

                    <p>
                        <strong>ID:</strong> {selectedHOD.id}
                    </p>

                    <p>
                        <strong>Username:</strong>{" "}
                        {selectedHOD.username || "-"}
                    </p>

                    <p>
                        <strong>Email:</strong>{" "}
                        {selectedHOD.email || "-"}
                    </p>

                    <p>
                        <strong>Role:</strong>{" "}
                        {typeof selectedHOD.role === "string"
                            ? selectedHOD.role
                            : selectedHOD.role_name || "HOD"}
                    </p>

                    <p>
                        <strong>Department:</strong>{" "}
                        {selectedHOD.department || "-"}
                    </p>

                    <p>
                        <strong>Department ID:</strong>{" "}
                        {selectedHOD.department_id ?? "-"}
                    </p>

                    <p>
                        <strong>Active:</strong>{" "}
                        {selectedHOD.is_active ? "Yes" : "No"}
                    </p>

                    <button
                        type="button"
                        onClick={() => setSelectedHOD(null)}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
}

export default AdminHOD;
