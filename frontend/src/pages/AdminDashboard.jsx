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

    // ========================================================
    // DATA
    // ========================================================

    const [dashboard, setDashboard] = useState(null);

    // ========================================================
    // UI STATE
    // ========================================================

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ========================================================
    // LOAD DASHBOARD
    // ========================================================

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

            console.log(
                "Admin Dashboard:",
                response.data
            );

            setDashboard(response.data);

        } catch (error) {

            console.log(
                "Admin Dashboard Error:",
                error.response?.data
            );

            setError(
                "Unable to load admin dashboard."
            );

        } finally {

            setLoading(false);

        }
    };


    // ========================================================
    // LOADING STATE
    // ========================================================

    if (loading) {

        return (
            <div className="admin-page admin-dashboard-page">

                <div className="admin-page-header">
                    <h1>Admin Dashboard</h1>
                </div>

                <div className="admin-loading-state">
                    Loading dashboard...
                </div>

            </div>
        );
    }


    // ========================================================
    // ERROR STATE
    // ========================================================

    if (error) {

        return (
            <div className="admin-page admin-dashboard-page">

                <div className="admin-page-header">
                    <h1>Admin Dashboard</h1>
                </div>

                <div className="admin-alert admin-alert-error">
                    {error}
                </div>

            </div>
        );
    }


    // ========================================================
    // NO DATA STATE
    // ========================================================

    if (!dashboard) {

        return (
            <div className="admin-page admin-dashboard-page">

                <div className="admin-page-header">
                    <h1>Admin Dashboard</h1>
                </div>

                <div className="admin-empty-state">
                    No dashboard data found.
                </div>

            </div>
        );
    }


    // ========================================================
    // DASHBOARD
    // ========================================================

    return (

        <div className="admin-page admin-dashboard-page">

            {/* ================================================= */}
            {/* PAGE HEADER */}
            {/* ================================================= */}

            <div className="admin-page-header">

                <div>
                    <h1>Admin Dashboard</h1>

                    <p>
                        Manage users, academics and college activities.
                    </p>
                </div>

            </div>


            {/* ================================================= */}
            {/* USERS */}
            {/* ================================================= */}

            <section className="admin-dashboard-section">

                <div className="admin-section-header">

                    <h2>Users</h2>

                </div>


                <div className="admin-dashboard-cards">

                    <Link
                        to="/admin/users"
                        className="admin-dashboard-card"
                    >
                        <span className="admin-card-label">
                            Total Users
                        </span>

                        <strong>
                            {dashboard.users?.total || 0}
                        </strong>
                    </Link>


                    <Link
                        to="/admin/students"
                        className="admin-dashboard-card"
                    >
                        <span className="admin-card-label">
                            Total Students
                        </span>

                        <strong>
                            {dashboard.users?.students || 0}
                        </strong>
                    </Link>


                    <Link
                        to="/admin/staff"
                        className="admin-dashboard-card"
                    >
                        <span className="admin-card-label">
                            Total Staff
                        </span>

                        <strong>
                            {dashboard.users?.staff || 0}
                        </strong>
                    </Link>


                    <Link
                        to="/admin/hod"
                        className="admin-dashboard-card"
                    >
                        <span className="admin-card-label">
                            Total HOD
                        </span>

                        <strong>
                            {dashboard.users?.hod || 0}
                        </strong>
                    </Link>


                    <Link
                        to="/admin/principal"
                        className="admin-dashboard-card"
                    >
                        <span className="admin-card-label">
                            Total Principal
                        </span>

                        <strong>
                            {dashboard.users?.principal || 0}
                        </strong>
                    </Link>

                </div>

            </section>


            {/* ================================================= */}
            {/* ACADEMICS */}
            {/* ================================================= */}

            <section className="admin-dashboard-section">

                <div className="admin-section-header">

                    <h2>Academics</h2>

                </div>


                <div className="admin-dashboard-cards">

                    <Link
                        to="/admin/courses"
                        className="admin-dashboard-card"
                    >
                        <span className="admin-card-label">
                            Total Courses
                        </span>

                        <strong>
                            {dashboard.academics?.courses || 0}
                        </strong>
                    </Link>


                    <Link
                        to="/admin/departments"
                        className="admin-dashboard-card"
                    >
                        <span className="admin-card-label">
                            Total Departments
                        </span>

                        <strong>
                            {dashboard.academics?.departments || 0}
                        </strong>
                    </Link>


                    <Link
                        to="/admin/subjects"
                        className="admin-dashboard-card"
                    >
                        <span className="admin-card-label">
                            Total Subjects
                        </span>

                        <strong>
                            {dashboard.academics?.subjects || 0}
                        </strong>
                    </Link>

                </div>

            </section>


            {/* ================================================= */}
            {/* ACTIVITIES */}
            {/* ================================================= */}

            <section className="admin-dashboard-section">

                <div className="admin-section-header">

                    <h2>Activities</h2>

                </div>


                <div className="admin-dashboard-cards">

                    <Link
                        to="/admin/exams"
                        className="admin-dashboard-card"
                    >
                        <span className="admin-card-label">
                            Total Exams
                        </span>

                        <strong>
                            {dashboard.activities?.exams || 0}
                        </strong>
                    </Link>


                    <div className="admin-dashboard-card">

                        <span className="admin-card-label">
                            Total Assignments
                        </span>

                        <strong>
                            {dashboard.activities?.assignments || 0}
                        </strong>

                    </div>


                    <div className="admin-dashboard-card">

                        <span className="admin-card-label">
                            Attendance Records
                        </span>

                        <strong>
                            {
                                dashboard.activities
                                    ?.attendance_records || 0
                            }
                        </strong>

                    </div>

                </div>

            </section>

        </div>
    );
}


export default AdminDashboard;


