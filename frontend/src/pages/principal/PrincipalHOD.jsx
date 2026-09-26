// import { useEffect, useState } from "react";

// import api from "../../api/axios";


// function PrincipalHOD() {

//     // ========================================================
//     // DATA
//     // ========================================================

//     const [hods, setHods] = useState([]);

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
//     // UI
//     // ========================================================

//     const [loading, setLoading] = useState(true);

//     const [error, setError] = useState("");


//     // ========================================================
//     // LOAD HOD
//     // ========================================================

//     useEffect(() => {

//         loadHODs();

//     }, []);


//     const loadHODs = async () => {

//         try {

//             setLoading(true);

//             setError("");


//             const response = await api.get(
//                 "principal/hod/?page_size=100"
//             );


//             console.log(
//                 "Principal HOD:",
//                 response.data
//             );


//             setHods(
//                 response.data.results ||
//                 response.data ||
//                 []
//             );


//         } catch (error) {

//             console.error(
//                 "Principal HOD Error:",
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
//     // DEPARTMENT OPTIONS
//     // ========================================================

//     const departmentOptions = [

//         ...new Map(

//             hods.map(
//                 (item) => [

//                     item.department_id ??
//                     item.department,

//                     item.department_name ||
//                     item.department?.name ||
//                     item.department ||
//                     "-"

//                 ]
//             )

//         ).entries()

//     ].filter(
//         ([id]) =>
//             id !== null &&
//             id !== undefined
//     );


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
//                     );


//                 const email =
//                     String(
//                         item.email ||
//                         ""
//                     );


//                 const departmentName =
//                     String(
//                         item.department_name ||
//                         item.department?.name ||
//                         item.department ||
//                         ""
//                     );


//                 const matchesSearch =

//                     searchValue === ""

//                     ||

//                     username
//                         .toLowerCase()
//                         .includes(
//                             searchValue
//                         )

//                     ||

//                     email
//                         .toLowerCase()
//                         .includes(
//                             searchValue
//                         )

//                     ||

//                     departmentName
//                         .toLowerCase()
//                         .includes(
//                             searchValue
//                         );


//                 const matchesDepartment =

//                     departmentFilter === ""

//                     ||

//                     String(
//                         item.department_id ??
//                         item.department
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

//         setSelectedHOD(
//             item
//         );

//     };


//     // ========================================================
//     // CLOSE DETAILS
//     // ========================================================

//     const handleClose = () => {

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

//     const refreshHODs = () => {

//         loadHODs();

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (

//             <div>

//                 <h1>
//                     Principal HOD
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
//                 Principal HOD
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
//                             refreshHODs
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
//                     refreshHODs
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
//                                             item.department_name ||
//                                             item.department?.name ||
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
//                             selectedHOD.department_name ||
//                             selectedHOD.department?.name ||
//                             selectedHOD.department ||
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


// export default PrincipalHOD;
import { useEffect, useState } from "react";
import api from "../../api/axios";

function PrincipalHOD() {
    const [hods, setHods] = useState([]);

    const [search, setSearch] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");

    const [selectedHOD, setSelectedHOD] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ========================================================
    // LOAD HOD
    // ========================================================

    useEffect(() => {
        loadHODs();
    }, []);

    const loadHODs = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "principal/hod/?page_size=100"
            );

            console.log(
                "Principal HOD:",
                response.data
            );

            setHods(
                response.data.results ||
                response.data ||
                []
            );
        } catch (error) {
            console.error(
                "Principal HOD Error:",
                error.response?.data || error
            );

            setHods([]);

            setError(
                error.response?.data?.detail ||
                "Unable to load HOD."
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
            hods.map((item) => [
                item.department_id ?? item.department,
                item.department_name ||
                item.department?.name ||
                item.department ||
                "-"
            ])
        ).entries()
    ].filter(
        ([id]) =>
            id !== null &&
            id !== undefined
    );

    // ========================================================
    // FILTER HOD
    // ========================================================

    const filteredHODs = hods.filter((item) => {
        const searchValue = search
            .toLowerCase()
            .trim();

        const username = String(
            item.username || ""
        );

        const email = String(
            item.email || ""
        );

        const departmentName = String(
            item.department_name ||
            item.department?.name ||
            item.department ||
            ""
        );

        const matchesSearch =
            searchValue === "" ||
            username
                .toLowerCase()
                .includes(searchValue) ||
            email
                .toLowerCase()
                .includes(searchValue) ||
            departmentName
                .toLowerCase()
                .includes(searchValue);

        const matchesDepartment =
            departmentFilter === "" ||
            String(
                item.department_id ??
                item.department
            ) ===
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
        setSelectedHOD(item);
    };

    const handleClose = () => {
        setSelectedHOD(null);
    };

    const clearFilters = () => {
        setSearch("");
        setDepartmentFilter("");
    };

    const refreshHODs = () => {
        loadHODs();
    };

    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {
        return (
            <div className="principal-page principal-state-card">
                <h1>Principal HOD</h1>
                <p>Loading HOD...</p>
            </div>
        );
    }

    // ========================================================
    // UI
    // ========================================================

    return (
        <div className="principal-page principal-hod-page">

            <div className="principal-page-header">
                <div>
                    <h1 className="principal-page-title">
                        HOD Management
                    </h1>

                    <p className="principal-page-subtitle">
                        View and manage Heads of Departments.
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
                        onClick={refreshHODs}
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* FILTERS */}

            <div className="principal-toolbar">

                <div className="principal-field principal-field-wide">
                    <label>
                        Search
                    </label>

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
                    <label>
                        Department
                    </label>

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
                        onClick={refreshHODs}
                    >
                        Refresh
                    </button>
                </div>

            </div>

            {/* COUNT */}

            <p className="principal-count">
                Showing {filteredHODs.length} HOD(s)
            </p>

            {/* TABLE */}

            {filteredHODs.length === 0 ? (
                <div className="principal-state-card">
                    <h3>No HOD found</h3>
                    <p>
                        No HOD records match the selected filters.
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
                                {filteredHODs.map((item) => (
                                    <tr key={item.id}>

                                        <td>{item.id}</td>

                                        <td>
                                            {item.username || "-"}
                                        </td>

                                        <td>
                                            {item.email || "-"}
                                        </td>

                                        <td>
                                            <span className="principal-badge">
                                                {item.role || "HOD"}
                                            </span>
                                        </td>

                                        <td>
                                            {item.department_name ||
                                                item.department?.name ||
                                                item.department ||
                                                "-"}
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

            {selectedHOD && (
                <div className="principal-detail-card">

                    <div className="principal-detail-header">
                        <div>
                            <h2>HOD Details</h2>
                            <p>
                                Complete HOD information
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
                                {selectedHOD.id}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Username
                            </span>
                            <span className="principal-detail-value">
                                {selectedHOD.username || "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Email
                            </span>
                            <span className="principal-detail-value">
                                {selectedHOD.email || "-"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Role
                            </span>
                            <span className="principal-detail-value">
                                {selectedHOD.role || "HOD"}
                            </span>
                        </div>

                        <div className="principal-detail-item">
                            <span className="principal-detail-label">
                                Department
                            </span>
                            <span className="principal-detail-value">
                                {selectedHOD.department_name ||
                                    selectedHOD.department?.name ||
                                    selectedHOD.department ||
                                    "-"}
                            </span>
                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default PrincipalHOD;