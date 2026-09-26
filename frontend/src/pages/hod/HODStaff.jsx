// import { useEffect, useState } from "react";

// import api from "../../api/axios";


// function HODStaff() {

//     const [staff, setStaff] = useState([]);

//     const [search, setSearch] = useState("");

//     const [selectedStaff, setSelectedStaff] = useState(null);

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
//                 "hod/staff/"
//             );

//             setStaff(
//                 response.data.results || response.data
//             );

//         } catch (error) {

//             console.error(error);

//             setError(
//                 "Failed to load staff."
//             );

//         } finally {

//             setLoading(false);

//         }
//     };


//     // ========================================================
//     // SEARCH
//     // ========================================================

//     const filteredStaff = staff.filter(
//         (member) => {

//             const searchValue =
//                 search.toLowerCase().trim();


//             return (

//                 member.username
//                     ?.toLowerCase()
//                     .includes(searchValue)

//                 ||

//                 member.email
//                     ?.toLowerCase()
//                     .includes(searchValue)

//                 ||

//                 member.department
//                     ?.toLowerCase()
//                     .includes(searchValue)

//             );

//         }
//     );


//     // ========================================================
//     // VIEW DETAILS
//     // ========================================================

//     const handleView = (member) => {

//         setSelectedStaff(member);

//     };


//     // ========================================================
//     // CLOSE DETAILS
//     // ========================================================

//     const handleClose = () => {

//         setSelectedStaff(null);

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (

//             <div>

//                 <h1>
//                     HOD Staff
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

//             <h1>
//                 HOD Staff
//             </h1>


//             {/* =================================================
//                 ERROR
//             ================================================= */}

//             {error && (

//                 <p>
//                     {error}
//                 </p>

//             )}


//             {/* =================================================
//                 SEARCH
//             ================================================= */}

//             <div>

//                 <input

//                     type="text"

//                     placeholder="Search staff..."

//                     value={search}

//                     onChange={(e) =>
//                         setSearch(
//                             e.target.value
//                         )
//                     }

//                 />

//             </div>


//             {/* =================================================
//                 RESULT COUNT
//             ================================================= */}

//             <p>

//                 Showing{" "}
//                 {filteredStaff.length}
//                 {" "}staff member(s)

//             </p>


//             {/* =================================================
//                 STAFF TABLE
//             ================================================= */}

//             <table>

//                 <thead>

//                     <tr>

//                         <th>
//                             ID
//                         </th>

//                         <th>
//                             Username
//                         </th>

//                         <th>
//                             Email
//                         </th>

//                         <th>
//                             Department
//                         </th>

//                         <th>
//                             Role
//                         </th>

//                         <th>
//                             Action
//                         </th>

//                     </tr>

//                 </thead>


//                 <tbody>

//                     {filteredStaff.length === 0 ? (

//                         <tr>

//                             <td colSpan="6">

//                                 No staff found.

//                             </td>

//                         </tr>

//                     ) : (

//                         filteredStaff.map(
//                             (member) => (

//                                 <tr
//                                     key={member.id}
//                                 >

//                                     <td>
//                                         {member.id}
//                                     </td>

//                                     <td>
//                                         {
//                                             member.username
//                                             ||
//                                             "-"
//                                         }
//                                     </td>

//                                     <td>
//                                         {
//                                             member.email
//                                             ||
//                                             "-"
//                                         }
//                                     </td>

//                                     <td>
//                                         {
//                                             member.department
//                                             ||
//                                             "-"
//                                         }
//                                     </td>

//                                     <td>
//                                         {
//                                             member.role
//                                             ||
//                                             "Staff"
//                                         }
//                                     </td>

//                                     <td>

//                                         <button

//                                             type="button"

//                                             onClick={() =>
//                                                 handleView(
//                                                     member
//                                                 )
//                                             }

//                                         >

//                                             View

//                                         </button>

//                                     </td>

//                                 </tr>

//                             )
//                         )

//                     )}

//                 </tbody>

//             </table>


//             {/* =================================================
//                 STAFF DETAILS
//             ================================================= */}

//             {selectedStaff && (

//                 <div>

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
//                             selectedStaff.username
//                             ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Email:
//                         </strong>{" "}

//                         {
//                             selectedStaff.email
//                             ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Role:
//                         </strong>{" "}

//                         {
//                             selectedStaff.role
//                             ||
//                             "Staff"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Department:
//                         </strong>{" "}

//                         {
//                             selectedStaff.department
//                             ||
//                             "-"
//                         }

//                     </p>


//                     <p>

//                         <strong>
//                             Department ID:
//                         </strong>{" "}

//                         {
//                             selectedStaff.department_id
//                             ||
//                             "-"
//                         }

//                     </p>


//                     <button
//                         type="button"
//                         onClick={handleClose}
//                     >

//                         Close

//                     </button>

//                 </div>

//             )}

//         </div>

//     );

// }


// export default HODStaff;
import { useEffect, useState } from "react";

import api from "../../api/axios";


function HODStaff() {

    const [staff, setStaff] = useState([]);

    const [search, setSearch] = useState("");

    const [selectedStaff, setSelectedStaff] = useState(null);

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
                "hod/staff/"
            );

            setStaff(
                response.data.results || response.data
            );

        } catch (error) {

            console.error(error);

            setError(
                "Failed to load staff."
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // SEARCH
    // ========================================================

    const filteredStaff = staff.filter(
        (member) => {

            const searchValue =
                search.toLowerCase().trim();

            return (

                member.username
                    ?.toLowerCase()
                    .includes(searchValue)

                ||

                member.email
                    ?.toLowerCase()
                    .includes(searchValue)

                ||

                member.department
                    ?.toLowerCase()
                    .includes(searchValue)

            );

        }
    );


    // ========================================================
    // VIEW DETAILS
    // ========================================================

    const handleView = (member) => {

        setSelectedStaff(member);

    };


    // ========================================================
    // CLOSE DETAILS
    // ========================================================

    const handleClose = () => {

        setSelectedStaff(null);

    };


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (

            <div className="hod-page hod-staff-page">

                <div className="hod-page-header">

                    <div>

                        <h1 className="hod-page-title">
                            HOD Staff
                        </h1>

                        <p className="hod-page-subtitle">
                            Loading staff...
                        </p>

                    </div>

                </div>

                <div className="hod-loading-card">
                    Loading staff...
                </div>

            </div>

        );

    }


    return (

        <div className="hod-page hod-staff-page">

            {/* HEADER */}

            <div className="hod-page-header">

                <div>

                    <h1 className="hod-page-title">
                        HOD Staff
                    </h1>

                    <p className="hod-page-subtitle">
                        View staff members in your department
                    </p>

                </div>

                <button
                    className="hod-btn hod-btn-primary"
                    type="button"
                    onClick={loadStaff}
                >
                    Refresh
                </button>

            </div>


            {/* ERROR */}

            {error && (

                <div className="hod-alert hod-alert-error">

                    <p>
                        {error}
                    </p>

                </div>

            )}


            {/* SEARCH */}

            <div className="hod-card hod-filter-card">

                <div className="hod-field hod-field-wide">

                    <label>
                        Search Staff
                    </label>

                    <input
                        className="hod-input"
                        type="text"
                        placeholder="Search staff..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

            </div>


            {/* COUNT */}

            <div className="hod-result-bar">

                <strong>
                    Showing {filteredStaff.length} staff member(s)
                </strong>

            </div>


            {/* TABLE */}

            <div className="hod-table-card">

                <table className="hod-table">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Role</th>
                            <th>Action</th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredStaff.length === 0 ? (

                            <tr>

                                <td colSpan="6">

                                    <div className="hod-table-empty">
                                        No staff found.
                                    </div>

                                </td>

                            </tr>

                        ) : (

                            filteredStaff.map(
                                (member) => (

                                    <tr key={member.id}>

                                        <td>
                                            {member.id}
                                        </td>

                                        <td>
                                            {member.username || "-"}
                                        </td>

                                        <td>
                                            {member.email || "-"}
                                        </td>

                                        <td>
                                            {member.department || "-"}
                                        </td>

                                        <td>

                                            <span className="hod-badge">
                                                {member.role || "Staff"}
                                            </span>

                                        </td>

                                        <td>

                                            <button
                                                className="hod-btn hod-btn-small hod-btn-primary"
                                                type="button"
                                                onClick={() =>
                                                    handleView(member)
                                                }
                                            >
                                                View
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>


            {/* DETAILS */}

            {selectedStaff && (

                <div className="hod-detail-card">

                    <div className="hod-detail-header">

                        <div>

                            <h2>
                                Staff Details
                            </h2>

                            <p>
                                Staff member information
                            </p>

                        </div>

                        <button
                            className="hod-btn hod-btn-secondary"
                            type="button"
                            onClick={handleClose}
                        >
                            Close
                        </button>

                    </div>


                    <div className="hod-detail-grid">

                        <div>
                            <span>ID</span>
                            <strong>
                                {selectedStaff.id}
                            </strong>
                        </div>

                        <div>
                            <span>Username</span>
                            <strong>
                                {selectedStaff.username || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>Email</span>
                            <strong>
                                {selectedStaff.email || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>Role</span>
                            <strong>
                                {selectedStaff.role || "Staff"}
                            </strong>
                        </div>

                        <div>
                            <span>Department</span>
                            <strong>
                                {selectedStaff.department || "-"}
                            </strong>
                        </div>

                        <div>
                            <span>Department ID</span>
                            <strong>
                                {selectedStaff.department_id || "-"}
                            </strong>
                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}


export default HODStaff;