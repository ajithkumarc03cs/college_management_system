function Header({ role }) {

    const username =
        localStorage.getItem("username") || "User";

    return (
        <header className="top-header">

            <div className="header-left">

                <div className="header-title">

                    <h2>
                        Student Management System
                    </h2>

                    <span>
                        {role || "User"} Portal
                    </span>

                </div>

            </div>


            <div className="header-right">

                <button className="notification-btn">
                    🔔
                </button>


                <div className="user-profile">

                    <div className="user-avatar">
                        {username
                            .charAt(0)
                            .toUpperCase()}
                    </div>


                    <div className="user-info">

                        <strong>
                            {username}
                        </strong>

                        <span>
                            {role || "User"}
                        </span>

                    </div>

                </div>

            </div>

        </header>
    );
}

export default Header;