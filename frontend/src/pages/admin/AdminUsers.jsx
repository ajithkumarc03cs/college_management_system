// import {
//     useEffect,
//     useState
// } from "react";

// import api from "../../api/axios";


// function AdminUsers() {

    
//     // ========================================================
//     // DATA
//     // ========================================================

//     const [users, setUsers] = useState([]);

//     const [roles, setRoles] = useState([]);

//     const [departments, setDepartments] = useState([]);


//     // ========================================================
//     // FILTERS
//     // ========================================================

//     const [search, setSearch] = useState("");

//     const [roleFilter, setRoleFilter] = useState("");


//     // ========================================================
//     // SELECTED USER
//     // ========================================================

//     const [selectedUser, setSelectedUser] =
//         useState(null);


//     // ========================================================
//     // FORM
//     // ========================================================

//     const [showForm, setShowForm] = useState(false);

//     const [editMode, setEditMode] = useState(false);

//     const [editingId, setEditingId] = useState(null);


//     const [username, setUsername] = useState("");

//     const [password, setPassword] = useState("");

//     const [email, setEmail] = useState("");

//     const [role, setRole] = useState("");

//     const [department, setDepartment] = useState("");

//     const [isActive, setIsActive] = useState(true);


//     // ========================================================
//     // UI
//     // ========================================================

//     const [loading, setLoading] = useState(true);

//     const [saving, setSaving] = useState(false);

//     const [deactivatingId, setDeactivatingId] =
//         useState(null);

//     const [error, setError] = useState("");

//     const [success, setSuccess] = useState("");


//     // ========================================================
//     // INITIAL LOAD
//     // ========================================================

//     useEffect(() => {

//         loadUsers();

//         loadRoles();

//         loadDepartments();

//     }, []);


//     // ========================================================
//     // LOAD USERS
//     // ========================================================

//     const loadUsers = async () => {

//         try {

//             setLoading(true);

//             setError("");


//             const response = await api.get(
//                 "admin/users/?page_size=100"
//             );


//             console.log(
//                 "Admin Users:",
//                 response.data
//             );


//             setUsers(
//                 response.data.results ||
//                 response.data ||
//                 []
//             );

//         } catch (error) {

//             console.error(
//                 "Admin Users Error:",
//                 error.response?.data || error
//             );


//             setUsers([]);


//             setError(
//                 error.response?.data?.detail ||
//                 "Unable to load users."
//             );

//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // LOAD ROLES
//     // ========================================================

//     const loadRoles = async () => {

//         try {

//             const response = await api.get(
//                 "admin/roles/?page_size=100"
//             );


//             console.log(
//                 "Admin Roles:",
//                 response.data
//             );


//             setRoles(
//                 response.data.results ||
//                 response.data ||
//                 []
//             );

//         } catch (error) {

//             console.error(
//                 "Roles Error:",
//                 error.response?.data || error
//             );


//             setRoles([]);

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
//                 "Departments Error:",
//                 error.response?.data || error
//             );


//             setDepartments([]);

//         }

//     };


//     // ========================================================
//     // ROLE NAME FROM USER
//     // ========================================================

//     const getRoleName = (user) => {

//         return String(
//             user.role ||
//             ""
//         );

//     };


//     // ========================================================
//     // ROLE ID FROM ROLE NAME
//     // ========================================================

//     const getRoleIdByName = (
//         roleName
//     ) => {

//         const foundRole =
//             roles.find(
//                 (item) =>
//                     String(
//                         item.name
//                     ).toLowerCase() ===
//                     String(
//                         roleName
//                     ).toLowerCase()
//             );


//         return foundRole
//             ? foundRole.id
//             : null;

//     };


//     // ========================================================
//     // ROLE OPTIONS
//     // ========================================================

//     const roleOptions =
//         roles.length > 0

//             ? roles

//             : [

//                 {
//                     id: 1,
//                     name: "Admin"
//                 },

//                 {
//                     id: 2,
//                     name: "Principal"
//                 },

//                 {
//                     id: 3,
//                     name: "HOD"
//                 },

//                 {
//                     id: 4,
//                     name: "Staff"
//                 },

//                 {
//                     id: 5,
//                     name: "Student"
//                 }

//             ];


//     // ========================================================
//     // FILTER USERS
//     // ========================================================

//     const filteredUsers = users.filter(
//         (item) => {

//             const searchValue =
//                 search
//                     .toLowerCase()
//                     .trim();


//             const usernameValue =
//                 String(
//                     item.username ||
//                     ""
//                 )
//                 .toLowerCase();


//             const emailValue =
//                 String(
//                     item.email ||
//                     ""
//                 )
//                 .toLowerCase();


//             const roleValue =
//                 String(
//                     item.role ||
//                     ""
//                 )
//                 .toLowerCase();


//             const departmentValue =
//                 String(
//                     item.department ||
//                     ""
//                 )
//                 .toLowerCase();


//             const matchesSearch =

//                 searchValue === ""

//                 ||

//                 usernameValue.includes(
//                     searchValue
//                 )

//                 ||

//                 emailValue.includes(
//                     searchValue
//                 )

//                 ||

//                 roleValue.includes(
//                     searchValue
//                 )

//                 ||

//                 departmentValue.includes(
//                     searchValue
//                 );


//             const matchesRole =

//                 roleFilter === ""

//                 ||

//                 roleValue ===
//                 roleFilter
//                     .toLowerCase();


//             return (
//                 matchesSearch &&
//                 matchesRole
//             );

//         }
//     );


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

//         setRole("");

//         setDepartment("");

//         setIsActive(true);


//         setSelectedUser(null);

//         setError("");

//         setSuccess("");

//     };


//     // ========================================================
//     // OPEN EDIT FORM
//     // ========================================================

//     const handleEdit = (
//         item
//     ) => {

//         const roleId =
//             getRoleIdByName(
//                 getRoleName(item)
//             );


//         setShowForm(true);

//         setEditMode(true);

//         setEditingId(
//             item.id
//         );


//         setUsername(
//             item.username ||
//             ""
//         );

//         setPassword("");

//         setEmail(
//             item.email ||
//             ""
//         );


//         setRole(
//             roleId
//                 ? String(roleId)
//                 : ""
//         );


//         setDepartment(
//             item.department_id !== null &&
//             item.department_id !== undefined
//                 ? String(
//                     item.department_id
//                 )
//                 : ""
//         );


//         setIsActive(
//             item.is_active !== false
//         );


//         setSelectedUser(null);

//         setError("");

//         setSuccess("");

//     };


//     // ========================================================
//     // CLOSE FORM
//     // ========================================================

//     const resetForm = () => {

//         setShowForm(false);

//         setEditMode(false);

//         setEditingId(null);

//         setUsername("");

//         setPassword("");

//         setEmail("");

//         setRole("");

//         setDepartment("");

//         setIsActive(true);

//     };


//     // ========================================================
//     // GET SELECTED ROLE NAME
//     // ========================================================

//     const selectedRole =
//         roles.find(
//             (item) =>
//                 String(
//                     item.id
//                 ) ===
//                 String(
//                     role
//                 )
//         )?.name || "";


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
//         // BASIC VALIDATION
//         // ----------------------------------------------------

//         if (!username.trim()) {

//             setError(
//                 "Username is required."
//             );

//             return;

//         }


//         if (
//             !editMode &&
//             !password
//         ) {

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


//         if (!role) {

//             setError(
//                 "Role is required."
//             );

//             return;

//         }


//         // ----------------------------------------------------
//         // ROLE ID
//         // ----------------------------------------------------

//         const roleId =
//             Number(
//                 role
//             );


//         if (
//             !Number.isInteger(
//                 roleId
//             )
//         ) {

//             setError(
//                 "Invalid role selected."
//             );

//             return;

//         }


//         // ----------------------------------------------------
//         // DEPARTMENT
//         // ----------------------------------------------------

//         if (
//             selectedRole === "HOD" ||
//             selectedRole === "Staff"
//         ) {

//             if (!department) {

//                 setError(
//                     "Department is required for HOD and Staff."
//                 );

//                 return;

//             }

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
//                         roleId

//                 };


//                 if (
//                     selectedRole === "HOD" ||
//                     selectedRole === "Staff"
//                 ) {

//                     data.department =
//                         Number(
//                             department
//                         );

//                 }


//                 const response =
//                     await api.post(
//                         "admin/users/create/",
//                         data
//                     );


//                 console.log(
//                     "Created User:",
//                     response.data
//                 );


//                 setSuccess(
//                     "User created successfully."
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
//                         roleId,

//                     is_active:
//                         isActive

//                 };


//                 if (
//                     selectedRole === "HOD" ||
//                     selectedRole === "Staff"
//                 ) {

//                     data.department =
//                         Number(
//                             department
//                         );

//                 } else {

//                     data.department =
//                         null;

//                 }


//                 const response =
//                     await api.patch(
//                         `admin/users/${editingId}/update/`,
//                         data
//                     );


//                 console.log(
//                     "Updated User:",
//                     response.data
//                 );


//                 setSuccess(
//                     "User updated successfully."
//                 );

//             }


//             // ------------------------------------------------
//             // RELOAD
//             // ------------------------------------------------

//             await loadUsers();


//             // ------------------------------------------------
//             // CLOSE FORM
//             // ------------------------------------------------

//             resetForm();


//         } catch (error) {

//             console.error(
//                 "Save User Error:",
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
//                     "Unable to save user."
//                 );

//             } else {

//                 setError(
//                     "Unable to save user."
//                 );

//             }

//         } finally {

//             setSaving(false);

//         }

//     };


//     // ========================================================
//     // DEACTIVATE USER
//     // ========================================================

//     const handleDeactivate = async (
//         item
//     ) => {

//         const confirmed =
//             window.confirm(
//                 `Deactivate user "${item.username}"?`
//             );


//         if (!confirmed) {

//             return;

//         }


//         try {

//             setDeactivatingId(
//                 item.id
//             );

//             setError("");

//             setSuccess("");


//             const response =
//                 await api.patch(
//                     `admin/users/${item.id}/deactivate/`
//                 );


//             console.log(
//                 "Deactivated User:",
//                 response.data
//             );


//             setSuccess(
//                 "User deactivated successfully."
//             );


//             if (
//                 selectedUser?.id ===
//                 item.id
//             ) {

//                 setSelectedUser(
//                     null
//                 );

//             }


//             await loadUsers();


//         } catch (error) {

//             console.error(
//                 "Deactivate User Error:",
//                 error.response?.data || error
//             );


//             setError(
//                 error.response?.data?.detail ||
//                 "Unable to deactivate user."
//             );


//         } finally {

//             setDeactivatingId(null);

//         }

//     };


//     // ========================================================
//     // VIEW USER
//     // ========================================================

//     const handleView = (
//         item
//     ) => {

//         setSelectedUser(
//             item
//         );

//         setShowForm(false);

//     };


//     // ========================================================
//     // CLOSE DETAILS
//     // ========================================================

//     const handleCloseDetails = () => {

//         setSelectedUser(
//             null
//         );

//     };


//     // ========================================================
//     // CLEAR FILTERS
//     // ========================================================

//     const clearFilters = () => {

//         setSearch("");

//         setRoleFilter("");

//     };


//     // ========================================================
//     // REFRESH
//     // ========================================================

//     const handleRefresh = () => {

//         loadUsers();

//         loadRoles();

//         loadDepartments();

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (

//             <div>

//                 <h1>
//                     Admin Users / Roles
//                 </h1>

//                 <p>
//                     Loading users...
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
//                 Admin Users / Roles
//             </h1>


//             {/* =================================================
//                 TOP BUTTONS
//             ================================================= */}

//             <button
//                 type="button"
//                 onClick={
//                     handleAdd
//                 }
//             >
//                 Add User
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
//                     {
//                         success
//                     }
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
//                     {
//                         error
//                     }
//                 </p>

//             )}


//             {/* =================================================
//                 ADD / EDIT FORM
//             ================================================= */}

//             {showForm && (

//                 <div>

//                     <hr />


//                     <h2>
//                         {
//                             editMode
//                                 ? "Edit User"
//                                 : "Add User"
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
//                                         ? " (leave blank if unchanged)"
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
//                             ROLE
//                         ===================================== */}

//                         <div>

//                             <label>
//                                 Role
//                             </label>

//                             <br />


//                             <select
//                                 value={
//                                     role
//                                 }
//                                 onChange={(e) =>
//                                     setRole(
//                                         e.target.value
//                                     )
//                                 }
//                             >

//                                 <option value="">
//                                     Select Role
//                                 </option>


//                                 {roleOptions.map(
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
//                             DEPARTMENT
//                         ===================================== */}

//                         {(
//                             selectedRole === "HOD" ||
//                             selectedRole === "Staff"
//                         ) && (

//                             <div>

//                                 <label>
//                                     Department
//                                 </label>

//                                 <br />


//                                 <select
//                                     value={
//                                         department
//                                     }
//                                     onChange={(e) =>
//                                         setDepartment(
//                                             e.target.value
//                                         )
//                                     }
//                                 >

//                                     <option value="">
//                                         Select Department
//                                     </option>


//                                     {departments.map(
//                                         (item) => (

//                                             <option
//                                                 key={
//                                                     item.id
//                                                 }
//                                                 value={
//                                                     item.id
//                                                 }
//                                             >
//                                                 {
//                                                     item.name
//                                                 }
//                                             </option>

//                                         )
//                                     )}

//                                 </select>

//                             </div>

//                         )}


//                         <br />


//                         {/* =====================================
//                             ACTIVE
//                         ===================================== */}

//                         {editMode && (

//                             <label>

//                                 <input
//                                     type="checkbox"
//                                     checked={
//                                         isActive
//                                     }
//                                     onChange={(e) =>
//                                         setIsActive(
//                                             e.target.checked
//                                         )
//                                     }
//                                 />

//                                 {" "}
//                                 Active

//                             </label>

//                         )}


//                         {editMode && (
//                             <br />
//                         )}


//                         <br />


//                         {/* =====================================
//                             FORM BUTTONS
//                         ===================================== */}

//                         <button
//                             type="submit"
//                             disabled={
//                                 saving
//                             }
//                         >
//                             {
//                                 saving
//                                     ? "Saving..."
//                                     : editMode
//                                         ? "Update User"
//                                         : "Create User"
//                             }
//                         </button>


//                         {" "}


//                         <button
//                             type="button"
//                             onClick={
//                                 resetForm
//                             }
//                             disabled={
//                                 saving
//                             }
//                         >
//                             Cancel
//                         </button>

//                     </form>


//                     <hr />

//                 </div>

//             )}


//             {/* =================================================
//                 FILTERS
//             ================================================= */}

//             <input
//                 type="text"
//                 placeholder="Search username / email / role / department..."
//                 value={
//                     search
//                 }
//                 onChange={(e) =>
//                     setSearch(
//                         e.target.value
//                     )
//                 }
//             />


//             {" "}


//             <select
//                 value={
//                     roleFilter
//                 }
//                 onChange={(e) =>
//                     setRoleFilter(
//                         e.target.value
//                     )
//                 }
//             >

//                 <option value="">
//                     All Roles
//                 </option>


//                 {roleOptions.map(
//                     (item) => (

//                         <option
//                             key={
//                                 item.id
//                             }
//                             value={
//                                 item.name
//                             }
//                         >
//                             {
//                                 item.name
//                             }
//                         </option>

//                     )
//                 )}

//             </select>


//             {" "}


//             <button
//                 type="button"
//                 onClick={
//                     clearFilters
//                 }
//             >
//                 Clear Filters
//             </button>


//             <br />
//             <br />


//             {/* =================================================
//                 COUNT
//             ================================================= */}

//             <p>

//                 Showing{" "}

//                 {
//                     filteredUsers.length
//                 }

//                 {" "}
//                 user(s)

//             </p>


//             {/* =================================================
//                 USERS TABLE
//             ================================================= */}

//             {filteredUsers.length === 0 ? (

//                 <p>
//                     No users found.
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

//                         {filteredUsers.map(
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
//                                             "-"
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


//                                         {item.is_active !== false && (

//                                             <button
//                                                 type="button"
//                                                 onClick={() =>
//                                                     handleDeactivate(
//                                                         item
//                                                     )
//                                                 }
//                                                 disabled={
//                                                     deactivatingId ===
//                                                     item.id
//                                                 }
//                                             >
//                                                 {
//                                                     deactivatingId ===
//                                                     item.id
//                                                         ? "Deactivating..."
//                                                         : "Deactivate"
//                                                 }
//                                             </button>

//                                         )}

//                                     </td>

//                                 </tr>

//                             )
//                         )}

//                     </tbody>

//                 </table>

//             )}


//             {/* =================================================
//                 USER DETAILS
//             ================================================= */}

//             {selectedUser && (

//                 <div>

//                     <hr />


//                     <h2>
//                         User Details
//                     </h2>


//                     <p>

//                         <strong>
//                             ID:
//                         </strong>{" "}

//                         {
//                             selectedUser.id
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Username:
//                         </strong>{" "}

//                         {
//                             selectedUser.username ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Email:
//                         </strong>{" "}

//                         {
//                             selectedUser.email ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Role:
//                         </strong>{" "}

//                         {
//                             selectedUser.role ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Department:
//                         </strong>{" "}

//                         {
//                             selectedUser.department ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Department ID:
//                         </strong>{" "}

//                         {
//                             selectedUser.department_id ??
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Active:
//                         </strong>{" "}

//                         {
//                             selectedUser.is_active
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


// export default AdminUsers;




import {
    useEffect,
    useState
} from "react";

import api from "../../api/axios";


function AdminUsers() {

    // ========================================================
    // DATA
    // ========================================================

    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [departments, setDepartments] = useState([]);


    // ========================================================
    // FILTERS
    // ========================================================

    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");


    // ========================================================
    // SELECTED USER
    // ========================================================

    const [selectedUser, setSelectedUser] =
        useState(null);


    // ========================================================
    // FORM
    // ========================================================

    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [department, setDepartment] = useState("");
    const [isActive, setIsActive] = useState(true);


    // ========================================================
    // UI
    // ========================================================

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [deactivatingId, setDeactivatingId] =
        useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // ========================================================
    // INITIAL LOAD
    // ========================================================

    useEffect(() => {

        loadUsers();
        loadRoles();
        loadDepartments();

    }, []);


    // ========================================================
    // LOAD USERS
    // ========================================================

    const loadUsers = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "admin/users/?page_size=100"
            );

            console.log(
                "Admin Users:",
                response.data
            );

            setUsers(
                response.data.results ||
                response.data ||
                []
            );

        } catch (error) {

            console.error(
                "Admin Users Error:",
                error.response?.data || error
            );

            setUsers([]);

            setError(
                error.response?.data?.detail ||
                "Unable to load users."
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // LOAD ROLES
    // ========================================================

    const loadRoles = async () => {

        try {

            const response = await api.get(
                "admin/roles/?page_size=100"
            );

            setRoles(
                response.data.results ||
                response.data ||
                []
            );

        } catch (error) {

            console.error(
                "Roles Error:",
                error.response?.data || error
            );

            setRoles([]);

        }

    };


    // ========================================================
    // LOAD DEPARTMENTS
    // ========================================================

    const loadDepartments = async () => {

        try {

            const response = await api.get(
                "departments/?page_size=100"
            );

            setDepartments(
                response.data.results ||
                response.data ||
                []
            );

        } catch (error) {

            console.error(
                "Departments Error:",
                error.response?.data || error
            );

            setDepartments([]);

        }

    };


    // ========================================================
    // ROLE NAME
    // ========================================================

    const getRoleName = (user) => {

        return String(
            user.role ||
            ""
        );

    };


    // ========================================================
    // ROLE ID
    // ========================================================

    const getRoleIdByName = (roleName) => {

        const foundRole =
            roles.find(
                (item) =>
                    String(item.name).toLowerCase() ===
                    String(roleName).toLowerCase()
            );

        return foundRole
            ? foundRole.id
            : null;

    };


    // ========================================================
    // ROLE OPTIONS
    // ========================================================

    const roleOptions =
        roles.length > 0
            ? roles
            : [
                {
                    id: 1,
                    name: "Admin"
                },
                {
                    id: 2,
                    name: "Principal"
                },
                {
                    id: 3,
                    name: "HOD"
                },
                {
                    id: 4,
                    name: "Staff"
                },
                {
                    id: 5,
                    name: "Student"
                }
            ];


    // ========================================================
    // FILTER USERS
    // ========================================================

    const filteredUsers = users.filter(
        (item) => {

            const searchValue =
                search
                    .toLowerCase()
                    .trim();

            const usernameValue =
                String(item.username || "")
                    .toLowerCase();

            const emailValue =
                String(item.email || "")
                    .toLowerCase();

            const roleValue =
                String(item.role || "")
                    .toLowerCase();

            const departmentValue =
                String(item.department || "")
                    .toLowerCase();

            const matchesSearch =

                searchValue === ""

                ||

                usernameValue.includes(
                    searchValue
                )

                ||

                emailValue.includes(
                    searchValue
                )

                ||

                roleValue.includes(
                    searchValue
                )

                ||

                departmentValue.includes(
                    searchValue
                );

            const matchesRole =

                roleFilter === ""

                ||

                roleValue ===
                roleFilter.toLowerCase();

            return (
                matchesSearch &&
                matchesRole
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
        setRole("");
        setDepartment("");
        setIsActive(true);

        setSelectedUser(null);
        setError("");
        setSuccess("");

    };


    // ========================================================
    // OPEN EDIT FORM
    // ========================================================

    const handleEdit = (item) => {

        const roleId =
            getRoleIdByName(
                getRoleName(item)
            );

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

        setRole(
            roleId
                ? String(roleId)
                : ""
        );

        setDepartment(
            item.department_id !== null &&
            item.department_id !== undefined
                ? String(item.department_id)
                : ""
        );

        setIsActive(
            item.is_active !== false
        );

        setSelectedUser(null);
        setError("");
        setSuccess("");

    };


    // ========================================================
    // RESET FORM
    // ========================================================

    const resetForm = () => {

        setShowForm(false);
        setEditMode(false);
        setEditingId(null);

        setUsername("");
        setPassword("");
        setEmail("");
        setRole("");
        setDepartment("");
        setIsActive(true);

    };


    // ========================================================
    // SELECTED ROLE
    // ========================================================

    const selectedRole =
        roles.find(
            (item) =>
                String(item.id) ===
                String(role)
        )?.name || "";


    // ========================================================
    // CREATE / UPDATE
    // ========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        // BASIC VALIDATION

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


        if (!role) {

            setError(
                "Role is required."
            );

            return;

        }


        const roleId = Number(role);


        if (!Number.isInteger(roleId)) {

            setError(
                "Invalid role selected."
            );

            return;

        }


        if (
            selectedRole === "HOD" ||
            selectedRole === "Staff"
        ) {

            if (!department) {

                setError(
                    "Department is required for HOD and Staff."
                );

                return;

            }

        }


        try {

            setSaving(true);


            // =================================================
            // CREATE
            // =================================================

            if (!editMode) {

                const data = {

                    username:
                        username.trim(),

                    password:
                        password,

                    email:
                        email.trim(),

                    role:
                        roleId

                };


                if (
                    selectedRole === "HOD" ||
                    selectedRole === "Staff"
                ) {

                    data.department =
                        Number(department);

                }


                const response =
                    await api.post(
                        "admin/users/create/",
                        data
                    );

                console.log(
                    "Created User:",
                    response.data
                );

                setSuccess(
                    "User created successfully."
                );

            }


            // =================================================
            // UPDATE
            // =================================================

            else {

                const data = {

                    username:
                        username.trim(),

                    email:
                        email.trim(),

                    role:
                        roleId,

                    is_active:
                        isActive

                };


                if (
                    selectedRole === "HOD" ||
                    selectedRole === "Staff"
                ) {

                    data.department =
                        Number(department);

                } else {

                    data.department = null;

                }


                const response =
                    await api.patch(
                        `admin/users/${editingId}/update/`,
                        data
                    );

                console.log(
                    "Updated User:",
                    response.data
                );

                setSuccess(
                    "User updated successfully."
                );

            }


            await loadUsers();

            resetForm();

        } catch (error) {

            console.error(
                "Save User Error:",
                error.response?.data || error
            );

            const responseData =
                error.response?.data;


            if (
                responseData &&
                typeof responseData === "object"
            ) {

                const messages =
                    Object.entries(
                        responseData
                    )
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
                    "Unable to save user."
                );

            } else {

                setError(
                    "Unable to save user."
                );

            }

        } finally {

            setSaving(false);

        }

    };


    // ========================================================
    // DEACTIVATE USER
    // ========================================================

    const handleDeactivate = async (item) => {

        const confirmed =
            window.confirm(
                `Deactivate user "${item.username}"?`
            );

        if (!confirmed) {

            return;

        }

        try {

            setDeactivatingId(item.id);
            setError("");
            setSuccess("");

            const response =
                await api.patch(
                    `admin/users/${item.id}/deactivate/`
                );

            console.log(
                "Deactivated User:",
                response.data
            );

            setSuccess(
                "User deactivated successfully."
            );

            if (
                selectedUser?.id ===
                item.id
            ) {

                setSelectedUser(null);

            }

            await loadUsers();

        } catch (error) {

            console.error(
                "Deactivate User Error:",
                error.response?.data || error
            );

            setError(
                error.response?.data?.detail ||
                "Unable to deactivate user."
            );

        } finally {

            setDeactivatingId(null);

        }

    };


    // ========================================================
    // VIEW USER
    // ========================================================

    const handleView = (item) => {

        setSelectedUser(item);
        setShowForm(false);

    };


    // ========================================================
    // CLOSE DETAILS
    // ========================================================

    const handleCloseDetails = () => {

        setSelectedUser(null);

    };


    // ========================================================
    // CLEAR FILTERS
    // ========================================================

    const clearFilters = () => {

        setSearch("");
        setRoleFilter("");

    };


    // ========================================================
    // REFRESH
    // ========================================================

    const handleRefresh = () => {

        loadUsers();
        loadRoles();
        loadDepartments();

    };


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (

            <div className="admin-page admin-users-page">

                <div className="admin-page-header">

                    <div>

                        <h1>
                            Admin Users / Roles
                        </h1>

                        <p>
                            Manage system users and roles.
                        </p>

                    </div>

                </div>

                <div className="admin-loading-state">
                    Loading users...
                </div>

            </div>

        );

    }


    // ========================================================
    // UI
    // ========================================================

    return (

        <div className="admin-page admin-users-page">

            {/* PAGE HEADER */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Admin Users / Roles
                    </h1>

                    <p>
                        Manage system users, roles and access.
                    </p>

                </div>


                <div className="admin-header-actions">

                    <button
                        type="button"
                        className="admin-primary-btn"
                        onClick={handleAdd}
                    >
                        Add User
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


            {/* SUCCESS */}

            {success && (

                <div className="admin-alert admin-alert-success">
                    {success}
                </div>

            )}


            {/* ERROR */}

            {error && (

                <div className="admin-alert admin-alert-error">
                    {error}
                </div>

            )}


            {/* ADD / EDIT FORM */}

            {showForm && (

                <div className="admin-form-card">

                    <div className="admin-section-header">

                        <div>

                            <h2>
                                {
                                    editMode
                                        ? "Edit User"
                                        : "Add User"
                                }
                            </h2>

                            <p>
                                Enter user account information.
                            </p>

                        </div>

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
                                            ? " (leave blank if unchanged)"
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


                            {/* ROLE */}

                            <div className="admin-form-group">

                                <label>
                                    Role
                                </label>

                                <select
                                    value={role}
                                    onChange={(e) =>
                                        setRole(
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="">
                                        Select Role
                                    </option>

                                    {roleOptions.map(
                                        (item) => (

                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>


                            {/* DEPARTMENT */}

                            {(
                                selectedRole === "HOD" ||
                                selectedRole === "Staff"
                            ) && (

                                <div className="admin-form-group">

                                    <label>
                                        Department
                                    </label>

                                    <select
                                        value={department}
                                        onChange={(e) =>
                                            setDepartment(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            Select Department
                                        </option>

                                        {departments.map(
                                            (item) => (

                                                <option
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>

                            )}


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

                        </div>


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
                                            ? "Update User"
                                            : "Create User"
                                }
                            </button>

                            <button
                                type="button"
                                className="admin-secondary-btn"
                                onClick={resetForm}
                                disabled={saving}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* FILTERS */}

            <div className="admin-toolbar">

                <div className="admin-form-group">

                    <label>
                        Search
                    </label>

                    <input
                        type="text"
                        placeholder="Search username / email / role / department..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </div>


                <div className="admin-form-group">

                    <label>
                        Role
                    </label>

                    <select
                        value={roleFilter}
                        onChange={(e) =>
                            setRoleFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            All Roles
                        </option>

                        {roleOptions.map(
                            (item) => (

                                <option
                                    key={item.id}
                                    value={item.name}
                                >
                                    {item.name}
                                </option>

                            )
                        )}

                    </select>

                </div>


                <button
                    type="button"
                    className="admin-secondary-btn"
                    onClick={clearFilters}
                >
                    Clear Filters
                </button>

            </div>


            {/* COUNT */}

            <div className="admin-list-summary">

                Showing{" "}
                {filteredUsers.length}
                {" "}
                user(s)

            </div>


            {/* USERS TABLE */}

            {filteredUsers.length === 0 ? (

                <div className="admin-empty-state">
                    No users found.
                </div>

            ) : (

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
                                    <th>Active</th>
                                    <th>Action</th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredUsers.map(
                                    (item) => (

                                        <tr
                                            key={item.id}
                                        >

                                            <td>
                                                {item.id}
                                            </td>

                                            <td>
                                                {
                                                    item.username ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.email ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.role ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.department ||
                                                    "-"
                                                }
                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        item.is_active
                                                            ? "admin-status admin-status-active"
                                                            : "admin-status admin-status-inactive"
                                                    }
                                                >
                                                    {
                                                        item.is_active
                                                            ? "Yes"
                                                            : "No"
                                                    }
                                                </span>

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


                                                    {item.is_active !== false && (

                                                        <button
                                                            type="button"
                                                            className="admin-danger-btn"
                                                            onClick={() =>
                                                                handleDeactivate(
                                                                    item
                                                                )
                                                            }
                                                            disabled={
                                                                deactivatingId ===
                                                                item.id
                                                            }
                                                        >
                                                            {
                                                                deactivatingId ===
                                                                item.id
                                                                    ? "Deactivating..."
                                                                    : "Deactivate"
                                                            }
                                                        </button>

                                                    )}

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}


            {/* USER DETAILS */}

            {selectedUser && (

                <div className="admin-details-card">

                    <div className="admin-section-header">

                        <div>

                            <h2>
                                User Details
                            </h2>

                        </div>

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


                    <div className="admin-details-grid">

                        <div className="admin-detail-item">

                            <span>ID</span>

                            <strong>
                                {selectedUser.id}
                            </strong>

                        </div>


                        <div className="admin-detail-item">

                            <span>Username</span>

                            <strong>
                                {
                                    selectedUser.username ||
                                    "-"
                                }
                            </strong>

                        </div>


                        <div className="admin-detail-item">

                            <span>Email</span>

                            <strong>
                                {
                                    selectedUser.email ||
                                    "-"
                                }
                            </strong>

                        </div>


                        <div className="admin-detail-item">

                            <span>Role</span>

                            <strong>
                                {
                                    selectedUser.role ||
                                    "-"
                                }
                            </strong>

                        </div>


                        <div className="admin-detail-item">

                            <span>Department</span>

                            <strong>
                                {
                                    selectedUser.department ||
                                    "-"
                                }
                            </strong>

                        </div>


                        <div className="admin-detail-item">

                            <span>Department ID</span>

                            <strong>
                                {
                                    selectedUser.department_id ??
                                    "-"
                                }
                            </strong>

                        </div>


                        <div className="admin-detail-item">

                            <span>Active</span>

                            <strong>
                                {
                                    selectedUser.is_active
                                        ? "Yes"
                                        : "No"
                                }
                            </strong>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}






export default AdminUsers;