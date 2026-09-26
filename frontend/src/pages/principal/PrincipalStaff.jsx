// import { useEffect, useState } from "react";

// import api from "../../api/axios";


// function PrincipalStaff() {

//     // ========================================================
//     // DATA
//     // ========================================================

//     const [staff, setStaff] = useState([]);

//     // ========================================================
//     // FILTERS
//     // ========================================================

//     const [search, setSearch] = useState("");

//     const [departmentFilter, setDepartmentFilter] =
//         useState("");

//     // ========================================================
//     // SELECTED STAFF
//     // ========================================================

//     const [selectedStaff, setSelectedStaff] =
//         useState(null);

//     // ========================================================
//     // UI
//     // ========================================================

//     const [loading, setLoading] = useState(true);

//     const [error, setError] = useState("");


//     // ========================================================
//     // LOAD STAFF
//     // ========================================================

//     useEffect(() => {

//         loadStaff();

//     }, []);


//     const loadStaff = async () => {

//         try {

//             setLoading(true);

//             setError("");


//             const response = await api.get(
//                 "principal/staff/?page_size=100"
//             );


//             console.log(
//                 "Principal Staff:",
//                 response.data
//             );


//             setStaff(
//                 response.data.results ||
//                 response.data ||
//                 []
//             );


//         } catch (error) {

//             console.error(
//                 "Principal Staff Error:",
//                 error.response?.data || error
//             );


//             setStaff([]);


//             setError(
//                 error.response?.data?.detail ||
//                 "Unable to load staff."
//             );


//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // DEPARTMENT OPTIONS
//     // ========================================================

//     const departmentOptions = [

//         ...new Map(

//             staff
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
//     // FILTER STAFF
//     // ========================================================

//     const filteredStaff =
//         staff.filter(
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


//                 const department =
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

//                     department.includes(
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

//                     matchesSearch

//                     &&

//                     matchesDepartment

//                 );

//             }
//         );


//     // ========================================================
//     // VIEW DETAILS
//     // ========================================================

//     const handleView = (
//         item
//     ) => {

//         setSelectedStaff(
//             item
//         );

//     };


//     // ========================================================
//     // CLOSE DETAILS
//     // ========================================================

//     const handleClose = () => {

//         setSelectedStaff(
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

//         loadStaff();

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (

//             <div>

//                 <h1>
//                     Principal Staff
//                 </h1>

//                 <p>
//                     Loading staff...
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
//                 Principal Staff
//             </h1>


//             {/* =================================================
//                 ERROR
//             ================================================= */}

//             {error && (

//                 <div>

//                     <p
//                         style={{
//                             color: "red"
//                         }}
//                     >
//                         {error}
//                     </p>


//                     <button
//                         type="button"
//                         onClick={
//                             handleRefresh
//                         }
//                     >
//                         Retry
//                     </button>

//                 </div>

//             )}


//             {/* =================================================
//                 SEARCH
//             ================================================= */}

//             <div>

//                 <input
//                     type="text"
//                     placeholder="Search username / email / department..."
//                     value={search}
//                     onChange={(e) =>
//                         setSearch(
//                             e.target.value
//                         )
//                     }
//                 />

//             </div>


//             <br />


//             {/* =================================================
//                 DEPARTMENT FILTER
//             ================================================= */}

//             <div>

//                 <label>
//                     Department:
//                 </label>

//                 {" "}


//                 <select
//                     value={
//                         departmentFilter
//                     }
//                     onChange={(e) =>
//                         setDepartmentFilter(
//                             e.target.value
//                         )
//                     }
//                 >

//                     <option value="">
//                         All Departments
//                     </option>


//                     {departmentOptions.map(
//                         ([id, name]) => (

//                             <option
//                                 key={id}
//                                 value={id}
//                             >
//                                 {name}
//                             </option>

//                         )
//                     )}

//                 </select>

//             </div>


//             <br />


//             {/* =================================================
//                 BUTTONS
//             ================================================= */}

//             <button
//                 type="button"
//                 onClick={
//                     clearFilters
//                 }
//             >
//                 Clear Filters
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


//             {/* =================================================
//                 COUNT
//             ================================================= */}

//             <p>

//                 Showing{" "}

//                 {
//                     filteredStaff.length
//                 }

//                 {" "}
//                 staff member(s)

//             </p>


//             {/* =================================================
//                 STAFF TABLE
//             ================================================= */}

//             {filteredStaff.length === 0 ? (

//                 <p>
//                     No staff found.
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
//                                 Action
//                             </th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {filteredStaff.map(
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
//                                             "Staff"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             item.department ||
//                                             "-"
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
//                                             View Details
//                                         </button>

//                                     </td>

//                                 </tr>

//                             )
//                         )}

//                     </tbody>

//                 </table>

//             )}


//             {/* =================================================
//                 STAFF DETAILS
//             ================================================= */}

//             {selectedStaff && (

//                 <div>

//                     <hr />


//                     <h2>
//                         Staff Details
//                     </h2>


//                     <p>

//                         <strong>
//                             ID:
//                         </strong>{" "}

//                         {
//                             selectedStaff.id
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Username:
//                         </strong>{" "}

//                         {
//                             selectedStaff.username ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Email:
//                         </strong>{" "}

//                         {
//                             selectedStaff.email ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Role:
//                         </strong>{" "}

//                         {
//                             selectedStaff.role ||
//                             "Staff"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Department:
//                         </strong>{" "}

//                         {
//                             selectedStaff.department ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Department ID:
//                         </strong>{" "}

//                         {
//                             selectedStaff.department_id ??
//                             "-"
//                         }

//                     </p>


//                     <button
//                         type="button"
//                         onClick={
//                             handleClose
//                         }
//                     >
//                         Close
//                     </button>

//                 </div>

//             )}

//         </div>

//     );

// }


// export default PrincipalStaff;
import { useEffect, useState } from "react";
import api from "../../api/axios";

function PrincipalStaff() {
    const [staff, setStaff] = useState([]);

    const [search, setSearch] = useState("");
    const [departmentFilter, setDepartmentFilter] =
        useState("");

    const [selectedStaff, setSelectedStaff] =
        useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ========================================================
    // LOAD STAFF
    // ========================================================

    useEffect(() => {
        loadStaff();
    }, []);

    const loadStaff = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "principal/staff/?page_size=100"
            );

            console.log(
                "Principal Staff:",
                response.data
            );

            setStaff(
                response.data.results ||
                response.data ||
                []
            );
        } catch (error) {
            console.error(
                "Principal Staff Error:",
                error.response?.data || error
            );

            setStaff([]);

            setError(
                error.response?.data?.detail ||
                "Unable to load staff."
            );
        } finally {
            setLoading(false);
        }
    };

    // ========================================================
    // DEPARTMENT OPTIONS
    // ========================================================

    const departmentOptions = [
        ...new Map(
            staff
                .filter(
                    (item) =>
                        item.department_id !== null &&
                        item.department_id !== undefined
                )
                .map(
                    (item) => [
                        item.department_id,
                        item.department
                    ]
                )
        ).entries()
    ];

    // ========================================================
    // FILTER STAFF
    // ========================================================

    const filteredStaff = staff.filter((item) => {
        const searchValue = search
            .toLowerCase()
            .trim();

        const username = String(
            item.username || ""
        ).toLowerCase();

        const email = String(
            item.email || ""
        ).toLowerCase();

        const department = String(
            item.department || ""
        ).toLowerCase();

        const matchesSearch =
            searchValue === "" ||
            username.includes(searchValue) ||
            email.includes(searchValue) ||
            department.includes(searchValue);

        const matchesDepartment =
            departmentFilter === "" ||
            String(item.department_id) ===
            String(departmentFilter);

        return (
            matchesSearch &&
            matchesDepartment
        );
    });

    // ========================================================
    // ACTIONS
    // ========================================================

    const handleView = (item) => {
        setSelectedStaff(item);
    };

    const handleClose = () => {
        setSelectedStaff(null);
    };

    const clearFilters = () => {
        setSearch("");
        setDepartmentFilter("");
    };

    const handleRefresh = () => {
        loadStaff();
    };

    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {
        return (
            <div className="principal-page principal-state-card">
                <h1>Principal Staff</h1>
                <p>Loading staff...</p>
            </div>
        );
    }

    // ========================================================
    // UI
    // ========================================================

    return (
        <div className="principal-page principal-staff-page">

            <div className="principal-page-header">
                <div>
                    <h1 className="principal-page-title">
                        Staff Management
                    </h1>

                    <p className="principal-page-subtitle">
                        View teaching staff and department information.
                    </p>
                </div>
            </div>

            {/* ERROR */}

            {error && (
                <div className="principal-alert principal-alert-error">
                    <span>{error}</span>

                    <button
                        type="button"
                        className="principal-btn principal-btn-danger principal-btn-sm"
                        onClick={handleRefresh}
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* FILTERS */}

            <div className="principal-toolbar">

                <div className="principal-field principal-field-wide">
                    <label>Search</label>

                    <input
                        type="text"
                        className="principal-input"
                        placeholder="Search username / email / department..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />
                </div>

                <div className="principal-field">
                    <label>Department</label>

                    <select
                        className="principal-select"
                        value={departmentFilter}
                        onChange={(e) =>
                            setDepartmentFilter(
                                e.target.value
                            )
                        }
                    >
                        <option value="">
                            All Departments
                        </option>

                        {departmentOptions.map(
                            ([id, name]) => (
                                <option
                                    key={id}
                                    value={id}
                                >
                                    {name}
                                </option>
                            )
                        )}
                    </select>
                </div>

                <div className="principal-actions">

                    <button
                        type="button"
                        className="principal-btn principal-btn-secondary"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>

                    <button
                        type="button"
                        className="principal-btn principal-btn-primary"
                        onClick={handleRefresh}
                    >
                        Refresh
                    </button>

                </div>

            </div>

            <p className="principal-count">
                Showing {filteredStaff.length} staff member(s)
            </p>

            {/* TABLE */}

            {filteredStaff.length === 0 ? (
                <div className="principal-state-card">
                    <h3>No staff found</h3>
                    <p>
                        No staff records match the selected filters.
                    </p>
                </div>
            ) : (
                <div className="principal-table-card">

                    <div className="principal-table-wrap">

                        <table className="principal-table principal-table-medium">

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

                                {filteredStaff.map((item) => (
                                    <tr key={item.id}>

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
                                            <span className="principal-badge">
                                                {item.role || "Staff"}
                                            </span>
                                        </td>

                                        <td>
                                            {item.department || "-"}
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                className="principal-btn principal-btn-primary principal-btn-sm"
                                                onClick={() =>
                                                    handleView(item)
                                                }
                                            >
                                                View Details
                                            </button>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>
            )}

            {/* DETAILS */}

            {selectedStaff && (
                <div className="principal-detail-card">

                    <div className="principal-detail-header">

                        <div>
                            <h2>Staff Details</h2>
                            <p>
                                Complete staff information
                            </p>
                        </div>

                        <button
                            type="button"
                            className="principal-btn principal-btn-secondary"
                            onClick={handleClose}
                        >
                            Close
                        </button>

                    </div>

                    <div className="principal-detail-grid">

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                ID
                            </span>
                            <span className="principal-detail-value">
                                {selectedStaff.id}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Username
                            </span>
                            <span className="principal-detail-value">
                                {selectedStaff.username || "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Email
                            </span>
                            <span className="principal-detail-value">
                                {selectedStaff.email || "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Role
                            </span>
                            <span className="principal-detail-value">
                                {selectedStaff.role || "Staff"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Department
                            </span>
                            <span className="principal-detail-value">
                                {selectedStaff.department || "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Department ID
                            </span>
                            <span className="principal-detail-value">
                                {selectedStaff.department_id ?? "-"}
                            </span>
                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default PrincipalStaff;