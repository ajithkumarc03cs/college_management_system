// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// import api from "../../api/axios";


// function AdminDashboard() {

//     const [dashboard, setDashboard] = useState(null);

//     const [loading, setLoading] = useState(true);

//     const [error, setError] = useState("");


//     // ========================================================
//     // LOAD DASHBOARD
//     // ========================================================

//     useEffect(() => {

//         loadDashboard();

//     }, []);


//     const loadDashboard = async () => {

//         try {

//             setLoading(true);
//             setError("");

//             const response = await api.get(
//                 "admin/dashboard/"
//             );

//             console.log(
//                 "Admin Dashboard:",
//                 response.data
//             );

//             setDashboard(response.data);

//         } catch (error) {

//             console.log(
//                 "Admin Dashboard Error:",
//                 error.response?.data
//             );

//             setError(
//                 "Unable to load admin dashboard."
//             );

//         } finally {

//             setLoading(false);

//         }

//     };


//     // ========================================================
//     // LOADING
//     // ========================================================

//     if (loading) {

//         return (

//             <div>

//                 <h2>
//                     Admin Dashboard
//                 </h2>

//                 <p>
//                     Loading...
//                 </p>

//             </div>

//         );

//     }


//     // ========================================================
//     // ERROR
//     // ========================================================

//     if (error) {

//         return (

//             <div>

//                 <h2>
//                     Admin Dashboard
//                 </h2>

//                 <p>
//                     {error}
//                 </p>

//             </div>

//         );

//     }


//     // ========================================================
//     // NO DATA
//     // ========================================================

//     if (!dashboard) {

//         return (

//             <div>

//                 <h2>
//                     Admin Dashboard
//                 </h2>

//                 <p>
//                     No dashboard data found.
//                 </p>

//             </div>

//         );

//     }


//     return (

//         <div>

//             {/* ================================================= */}
//             {/* TITLE */}
//             {/* ================================================= */}

//             <h1>
//                 Admin Dashboard
//             </h1>

//             <hr />


//             {/* ================================================= */}
//             {/* USERS */}
//             {/* ================================================= */}

//             <h2>
//                 Users
//             </h2>


//             <p>
//                 <strong>
//                     Total Users:
//                 </strong>{" "}

//                 <Link to="/admin/users">
//                     {dashboard.users?.total || 0}
//                 </Link>
//             </p>


//             <p>
//                 <strong>
//                     Total Students:
//                 </strong>{" "}

//                 <Link to="/admin/students">
//                     {dashboard.users?.students || 0}
//                 </Link>
//             </p>


//             <p>
//                 <strong>
//                     Total Staff:
//                 </strong>{" "}

//                 <Link to="/admin/staff">
//                     {dashboard.users?.staff || 0}
//                 </Link>
//             </p>


//             <p>
//                 <strong>
//                     Total HOD:
//                 </strong>{" "}

//                 <Link to="/admin/hod">
//                     {dashboard.users?.hod || 0}
//                 </Link>
//             </p>


//             <p>
//                 <strong>
//                     Total Principal:
//                 </strong>{" "}

//                 <Link to="/admin/principal">
//                     {dashboard.users?.principal || 0}
//                 </Link>
//             </p>


//             <hr />


//             {/* ================================================= */}
//             {/* ACADEMICS */}
//             {/* ================================================= */}

//             <h2>
//                 Academics
//             </h2>


//             <p>
//                 <strong>
//                     Total Courses:
//                 </strong>{" "}

//                 <Link to="/admin/courses">
//                     {dashboard.academics?.courses || 0}
//                 </Link>
//             </p>


//             <p>
//                 <strong>
//                     Total Departments:
//                 </strong>{" "}

//                 <Link to="/admin/departments">
//                     {dashboard.academics?.departments || 0}
//                 </Link>
//             </p>


//             <p>
//                 <strong>
//                     Total Subjects:
//                 </strong>{" "}

//                 <Link to="/admin/subjects">
//                     {dashboard.academics?.subjects || 0}
//                 </Link>
//             </p>


//             <hr />


//             {/* ================================================= */}
//             {/* ACTIVITIES */}
//             {/* ================================================= */}

//             <h2>
//                 Activities
//             </h2>


//             <p>
//                 <strong>
//                     Total Exams:
//                 </strong>{" "}

//                 <Link to="/admin/exams">
//                     {dashboard.activities?.exams || 0}
//                 </Link>
//             </p>


//             <p>
//                 <strong>
//                     Total Assignments:
//                 </strong>{" "}

//                 {dashboard.activities?.assignments || 0}

//             </p>


//             <p>
//                 <strong>
//                     Attendance Records:
//                 </strong>{" "}

//                 {
//                     dashboard.activities
//                         ?.attendance_records || 0
//                 }

//             </p>


//         </div>

//     );

// }


// export default AdminDashboard;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../api/axios";


function AdminDashboard() {

    // =========================================================
    // STATE
    // =========================================================

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =========================================================
    // LOAD DASHBOARD
    // =========================================================

    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await api.get(
                "admin/dashboard/"
            );

            setDashboard(response.data);

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.detail ||
                "Unable to load dashboard."
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (
            <div className="admin-page admin-dashboard-page">

                <div className="admin-loading-state">

                    Loading dashboard...

                </div>

            </div>
        );
    }


    // =========================================================
    // ERROR
    // =========================================================

    if (error) {

        return (
            <div className="admin-page admin-dashboard-page">

                <div className="admin-alert admin-alert-error">

                    {error}

                </div>

            </div>
        );
    }


    // =========================================================
    // DASHBOARD
    // =========================================================

    return (

        <div className="admin-page admin-dashboard-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Admin Dashboard
                    </h1>

                    <p>
                        Manage users, roles and college academics.
                    </p>

                </div>

            </div>


            {/* =================================================
                USERS
            ================================================= */}

            <section className="admin-dashboard-section">

                <div className="admin-section-header">

                    <div>

                        <h2>
                            Users
                        </h2>

                        <p>
                            Overview of users in the system.
                        </p>

                    </div>

                    <Link
                        to="/admin/users"
                        className="admin-secondary-btn"
                    >
                        Manage Users
                    </Link>

                </div>


                <div className="admin-dashboard-cards">

                    <Link
                        to="/admin/users"
                        className="admin-dashboard-card"
                    >

                        <span className="admin-card-label">
                            Total Users
                        </span>

                        <h3>
                            {dashboard?.users?.total || 0}
                        </h3>

                    </Link>


                    <Link
                        to="/admin/students"
                        className="admin-dashboard-card"
                    >

                        <span className="admin-card-label">
                            Students
                        </span>

                        <h3>
                            {dashboard?.users?.students || 0}
                        </h3>

                    </Link>


                    <Link
                        to="/admin/staff"
                        className="admin-dashboard-card"
                    >

                        <span className="admin-card-label">
                            Staff
                        </span>

                        <h3>
                            {dashboard?.users?.staff || 0}
                        </h3>

                    </Link>


                    <Link
                        to="/admin/hod"
                        className="admin-dashboard-card"
                    >

                        <span className="admin-card-label">
                            HOD
                        </span>

                        <h3>
                            {dashboard?.users?.hod || 0}
                        </h3>

                    </Link>


                    <Link
                        to="/admin/principal"
                        className="admin-dashboard-card"
                    >

                        <span className="admin-card-label">
                            Principal
                        </span>

                        <h3>
                            {dashboard?.users?.principal || 0}
                        </h3>

                    </Link>

                </div>

            </section>


            {/* =================================================
                ROLES
            ================================================= */}

            <section className="admin-dashboard-section">

                <div className="admin-section-header">

                    <div>

                        <h2>
                            Roles
                        </h2>

                        <p>
                            Roles available in the college system.
                        </p>

                    </div>

                    <Link
                        to="/admin/roles"
                        className="admin-secondary-btn"
                    >
                        Manage Roles
                    </Link>

                </div>


                <div className="admin-dashboard-cards">

                    {/* Total Roles */}

                    <Link
                        to="/admin/roles"
                        className="admin-dashboard-card"
                    >

                        <span className="admin-card-label">
                            Total Roles
                        </span>

                        <h3>
                            {dashboard?.roles?.total || 0}
                        </h3>

                    </Link>


                    {/* Dynamic Roles */}

                    {dashboard?.roles?.items?.map((role) => (

                        <div
                            key={role.id}
                            className="admin-dashboard-card"
                        >

                            <span className="admin-card-label">
                                {role.name}
                            </span>

                            <h3>
                                {role.user_count}
                            </h3>

                            <span className="admin-card-description">
                                Users
                            </span>

                        </div>

                    ))}

                </div>

            </section>


            {/* =================================================
                ACADEMICS
            ================================================= */}

            <section className="admin-dashboard-section">

                <div className="admin-section-header">

                    <div>

                        <h2>
                            Academics
                        </h2>

                        <p>
                            College academic information.
                        </p>

                    </div>

                </div>


                <div className="admin-dashboard-cards">

                    <Link
                        to="/admin/courses"
                        className="admin-dashboard-card"
                    >

                        <span className="admin-card-label">
                            Courses
                        </span>

                        <h3>
                            {dashboard?.academics?.courses || 0}
                        </h3>

                    </Link>


                    <Link
                        to="/admin/departments"
                        className="admin-dashboard-card"
                    >

                        <span className="admin-card-label">
                            Departments
                        </span>

                        <h3>
                            {dashboard?.academics?.departments || 0}
                        </h3>

                    </Link>


                    <Link
                        to="/admin/subjects"
                        className="admin-dashboard-card"
                    >

                        <span className="admin-card-label">
                            Subjects
                        </span>

                        <h3>
                            {dashboard?.academics?.subjects || 0}
                        </h3>

                    </Link>

                </div>

            </section>


            {/* =================================================
                ACTIVITIES
            ================================================= */}

            <section className="admin-dashboard-section">

                <div className="admin-section-header">

                    <div>

                        <h2>
                            Activities
                        </h2>

                        <p>
                            Academic activities and records.
                        </p>

                    </div>

                </div>


                <div className="admin-dashboard-cards">

                    <Link
                        to="/admin/exams"
                        className="admin-dashboard-card"
                    >

                        <span className="admin-card-label">
                            Exams
                        </span>

                        <h3>
                            {dashboard?.activities?.exams || 0}
                        </h3>

                    </Link>


                    <div className="admin-dashboard-card">

                        <span className="admin-card-label">
                            Assignments
                        </span>

                        <h3>
                            {dashboard?.activities?.assignments || 0}
                        </h3>

                    </div>


                    <div className="admin-dashboard-card">

                        <span className="admin-card-label">
                            Attendance
                        </span>

                        <h3>
                            {
                                dashboard?.activities
                                    ?.attendance_records || 0
                            }
                        </h3>

                    </div>

                </div>

            </section>

        </div>
    );
}


export default AdminDashboard;