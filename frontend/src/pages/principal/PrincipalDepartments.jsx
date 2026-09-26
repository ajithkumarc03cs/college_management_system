// import { useEffect, useState } from "react";

// import api from "../../api/axios";


// function PrincipalDepartments() {

//     // ========================================================
//     // DATA
//     // ========================================================

//     const [departments, setDepartments] = useState([]);

//     // ========================================================
//     // FILTER
//     // ========================================================

//     const [search, setSearch] = useState("");

//     // ========================================================
//     // SELECTED DEPARTMENT
//     // ========================================================

//     const [selectedDepartment, setSelectedDepartment] =
//         useState(null);

//     // ========================================================
//     // UI
//     // ========================================================

//     const [loading, setLoading] = useState(true);

//     const [error, setError] = useState("");


//     // ========================================================
//     // LOAD DEPARTMENTS
//     // ========================================================

//     useEffect(() => {

//         loadDepartments();

//     }, []);


//     const loadDepartments = async () => {

//         try {

//             setLoading(true);

//             setError("");


//             const response = await api.get(
//                 "principal/departments/?page_size=100"
//             );


//             console.log(
//                 "Principal Departments:",
//                 response.data
//             );


//             setDepartments(
//                 response.data.results ||
//                 response.data ||
//                 []
//             );


//         } catch (error) {

//             console.error(
//                 "Principal Departments Error:",
//                 error.response?.data || error
//             );


//             setDepartments([]);


//             setError(
//                 error.response?.data?.detail ||
//                 "Unable to load departments."
//             );


//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // FILTER DEPARTMENTS
//     // ========================================================

//     const filteredDepartments =
//         departments.filter(
//             (department) => {

//                 const searchValue =
//                     search
//                         .toLowerCase()
//                         .trim();


//                 const name =
//                     String(
//                         department.name ||
//                         ""
//                     );


//                 const code =
//                     String(
//                         department.code ||
//                         ""
//                     );


//                 return (

//                     searchValue === ""

//                     ||

//                     name
//                         .toLowerCase()
//                         .includes(
//                             searchValue
//                         )

//                     ||

//                     code
//                         .toLowerCase()
//                         .includes(
//                             searchValue
//                         )

//                 );

//             }
//         );


//     // ========================================================
//     // VIEW DETAILS
//     // ========================================================

//     const handleView = (
//         department
//     ) => {

//         setSelectedDepartment(
//             department
//         );

//     };


//     // ========================================================
//     // CLOSE DETAILS
//     // ========================================================

//     const handleClose = () => {

//         setSelectedDepartment(
//             null
//         );

//     };


//     // ========================================================
//     // CLEAR SEARCH
//     // ========================================================

//     const clearSearch = () => {

//         setSearch("");

//     };


//     // ========================================================
//     // REFRESH
//     // ========================================================

//     const refreshDepartments = () => {

//         loadDepartments();

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (

//             <div>

//                 <h1>
//                     Principal Departments
//                 </h1>

//                 <p>
//                     Loading departments...
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
//                 Principal Departments
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
//                             refreshDepartments
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
//                     placeholder="Search department / code..."
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
//                 BUTTONS
//             ================================================= */}

//             <button
//                 type="button"
//                 onClick={
//                     clearSearch
//                 }
//             >
//                 Clear Search
//             </button>


//             {" "}


//             <button
//                 type="button"
//                 onClick={
//                     refreshDepartments
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
//                     filteredDepartments.length
//                 }

//                 {" "}
//                 department(s)

//             </p>


//             {/* =================================================
//                 DEPARTMENT TABLE
//             ================================================= */}

//             {filteredDepartments.length === 0 ? (

//                 <p>
//                     No departments found.
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
//                                 Department Name
//                             </th>

//                             <th>
//                                 Code
//                             </th>

//                             <th>
//                                 Action
//                             </th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {filteredDepartments.map(
//                             (department) => (

//                                 <tr
//                                     key={
//                                         department.id
//                                     }
//                                 >

//                                     <td>
//                                         {
//                                             department.id
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             department.name ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>
//                                         {
//                                             department.code ||
//                                             "-"
//                                         }
//                                     </td>


//                                     <td>

//                                         <button
//                                             type="button"
//                                             onClick={() =>
//                                                 handleView(
//                                                     department
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
//                 DEPARTMENT DETAILS
//             ================================================= */}

//             {selectedDepartment && (

//                 <div>

//                     <hr />


//                     <h2>
//                         Department Details
//                     </h2>


//                     <p>

//                         <strong>
//                             ID:
//                         </strong>{" "}

//                         {
//                             selectedDepartment.id
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Department Name:
//                         </strong>{" "}

//                         {
//                             selectedDepartment.name ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Code:
//                         </strong>{" "}

//                         {
//                             selectedDepartment.code ||
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


// export default PrincipalDepartments;
import { useEffect, useState } from "react";
import api from "../../api/axios";

function PrincipalDepartments() {

    const [departments, setDepartments] = useState([]);

    const [search, setSearch] = useState("");

    const [selectedDepartment, setSelectedDepartment] =
        useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // ========================================================
    // LOAD DEPARTMENTS
    // ========================================================

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "principal/departments/?page_size=100"
            );

            console.log(
                "Principal Departments:",
                response.data
            );

            setDepartments(
                response.data.results ||
                response.data ||
                []
            );

        } catch (error) {

            console.error(
                "Principal Departments Error:",
                error.response?.data || error
            );

            setDepartments([]);

            setError(
                error.response?.data?.detail ||
                "Unable to load departments."
            );

        } finally {

            setLoading(false);

        }
    };

    // ========================================================
    // FILTER DEPARTMENTS
    // ========================================================

    const filteredDepartments =
        departments.filter(
            (department) => {

                const searchValue =
                    search.toLowerCase().trim();

                const name = String(
                    department.name || ""
                );

                const code = String(
                    department.code || ""
                );

                return (
                    searchValue === "" ||
                    name.toLowerCase().includes(searchValue) ||
                    code.toLowerCase().includes(searchValue)
                );
            }
        );

    // ========================================================
    // ACTIONS
    // ========================================================

    const handleView = (department) => {
        setSelectedDepartment(department);
    };

    const handleClose = () => {
        setSelectedDepartment(null);
    };

    const clearSearch = () => {
        setSearch("");
    };

    const refreshDepartments = () => {
        loadDepartments();
    };

    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (
            <div className="principal-page principal-departments-page">

                <div className="principal-state-card">

                    <div className="principal-loading-icon">
                        ⏳
                    </div>

                    <h2>
                        Principal Departments
                    </h2>

                    <p>
                        Loading departments...
                    </p>

                </div>

            </div>
        );
    }

    // ========================================================
    // UI
    // ========================================================

    return (
        <div className="principal-page principal-departments-page">

            {/* PAGE HEADER */}

            <div className="principal-page-header">

                <div>

                    <h1 className="principal-page-title">
                        Principal Departments
                    </h1>

                    <p className="principal-page-subtitle">
                        View and monitor college departments
                    </p>

                </div>

                <div className="principal-header-badge">
                    Departments
                </div>

            </div>

            {/* ERROR */}

            {error && (
                <div className="principal-alert principal-alert-error">

                    <span>
                        {error}
                    </span>

                    <button
                        type="button"
                        className="principal-btn principal-btn-danger principal-btn-sm"
                        onClick={refreshDepartments}
                    >
                        Retry
                    </button>

                </div>
            )}

            {/* SEARCH */}

            <div className="principal-toolbar principal-simple-toolbar">

                <div className="principal-field principal-field-wide">

                    <label>
                        Search Department
                    </label>

                    <input
                        type="text"
                        className="principal-input"
                        placeholder="Search department / code..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                <div className="principal-actions">

                    <button
                        type="button"
                        className="principal-btn principal-btn-secondary"
                        onClick={clearSearch}
                    >
                        Clear Search
                    </button>

                    <button
                        type="button"
                        className="principal-btn principal-btn-primary"
                        onClick={refreshDepartments}
                    >
                        ↻ Refresh
                    </button>

                </div>

            </div>

            {/* COUNT */}

            <div className="principal-count">

                Showing{" "}

                <strong>
                    {filteredDepartments.length}
                </strong>{" "}

                department(s)

            </div>

            {/* TABLE */}

            {filteredDepartments.length === 0 ? (

                <div className="principal-state-card">

                    <div className="principal-empty-icon">
                        🏢
                    </div>

                    <h3>
                        No departments found
                    </h3>

                    <p>
                        No departments match your current search.
                    </p>

                </div>

            ) : (

                <div className="principal-table-card">

                    <div className="principal-table-wrap">

                        <table className="principal-table principal-department-table">

                            <thead>

                                <tr>
                                    <th>ID</th>
                                    <th>Department Name</th>
                                    <th>Code</th>
                                    <th>Action</th>
                                </tr>

                            </thead>

                            <tbody>

                                {filteredDepartments.map(
                                    (department) => (

                                        <tr
                                            key={department.id}
                                        >

                                            <td>
                                                <span className="principal-id">
                                                    {department.id}
                                                </span>
                                            </td>

                                            <td>
                                                <strong>
                                                    {department.name || "-"}
                                                </strong>
                                            </td>

                                            <td>
                                                {department.code || "-"}
                                            </td>

                                            <td>

                                                <button
                                                    type="button"
                                                    className="principal-btn principal-btn-secondary principal-btn-sm"
                                                    onClick={() =>
                                                        handleView(
                                                            department
                                                        )
                                                    }
                                                >
                                                    View
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}

            {/* DETAILS */}

            {selectedDepartment && (

                <div className="principal-detail-card">

                    <div className="principal-detail-header">

                        <div>

                            <h2>
                                Department Details
                            </h2>

                            <p>
                                Complete department information
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
                                {selectedDepartment.id}
                            </span>

                        </div>

                        <div className="principal-detail-item">

                            <span className="principal-detail-label">
                                Department Name
                            </span>

                            <span className="principal-detail-value">
                                {selectedDepartment.name || "-"}
                            </span>

                        </div>

                        <div className="principal-detail-item">

                            <span className="principal-detail-label">
                                Code
                            </span>

                            <span className="principal-detail-value">
                                {selectedDepartment.code || "-"}
                            </span>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default PrincipalDepartments;