import { NavLink } from "react-router-dom";


function PrincipalSidebar() {

    // ========================================================
    // MENU ITEMS
    // ========================================================

    const menuItems = [

        {
            name: "Dashboard",
            path: "/principal/dashboard"
        },

        {
            name: "Students",
            path: "/principal/students"
        },

        {
            name: "Staff",
            path: "/principal/staff"
        },

        {
            name: "HOD",
            path: "/principal/hod"
        },

        {
            name: "Courses",
            path: "/principal/courses"
        },

        {
            name: "Departments",
            path: "/principal/departments"
        },

        {
            name: "Subjects",
            path: "/principal/subjects"
        },

        {
            name: "Exams",
            path: "/principal/exams"
        },

        {
            name: "Assignments",
            path: "/principal/assignments"
        },

        {
            name: "Attendance",
            path: "/principal/attendance"
        }

    ];


    // ========================================================
    // LOGOUT
    // ========================================================

    const handleLogout = () => {

        localStorage.removeItem(
            "access_token"
        );

        localStorage.removeItem(
            "refresh_token"
        );

        localStorage.removeItem(
            "user"
        );

        window.location.href = "/login";

    };


    // ========================================================
    // UI
    // ========================================================

    return (

        <aside>

            {/* =================================================
                TITLE
            ================================================= */}

            <h2>
                Principal Panel
            </h2>


            {/* =================================================
                NAVIGATION
            ================================================= */}

            <nav>

                {menuItems.map(
                    (item) => (

                        <div
                            key={
                                item.path
                            }
                        >

                            <NavLink
                                to={
                                    item.path
                                }
                                style={({
                                    isActive
                                }) => ({
                                    display:
                                        "block",

                                    padding:
                                        "8px",

                                    textDecoration:
                                        "none",

                                    fontWeight:
                                        isActive
                                            ? "bold"
                                            : "normal"
                                })}
                            >

                                {
                                    item.name
                                }

                            </NavLink>

                        </div>

                    )
                )}

            </nav>


            {/* =================================================
                LOGOUT
            ================================================= */}

            <br />


            <button
                type="button"
                onClick={
                    handleLogout
                }
            >
                Logout
            </button>

        </aside>

    );

}


export default PrincipalSidebar;
