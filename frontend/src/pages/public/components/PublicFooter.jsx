import { Link } from "react-router-dom";

import "./PublicFooter.css";


function PublicFooter() {

    return (

        <footer className="public-footer">


            {/* ==================================================
                FOOTER CONTENT
            ================================================== */}

            <div className="public-footer-content">


                {/* ==================================================
                    ABOUT
                ================================================== */}

                <div className="footer-about">

                    <div className="footer-logo">

                        <div className="footer-logo-icon">
                            🎓
                        </div>

                        <div>

                            <h3>
                                EduManage College
                            </h3>

                            <span>
                                Excellence in Education
                            </span>

                        </div>

                    </div>


                    <p>
                        Empowering students through quality education,
                        practical learning and innovative academic
                        programs.
                    </p>

                </div>


                {/* ==================================================
                    QUICK LINKS
                ================================================== */}

                <div className="footer-column">

                    <h3>
                        Quick Links
                    </h3>

                    <Link to="/home">
                        Home
                    </Link>

                    <Link to="/about">
                        About
                    </Link>

                    <Link to="/courses">
                        Courses
                    </Link>

                    <Link to="/admissions">
                        Admissions
                    </Link>

                    <Link to="/contact">
                        Contact
                    </Link>

                </div>


                {/* ==================================================
                    ACADEMICS
                ================================================== */}

                <div className="footer-column">

                    <h3>
                        Academics
                    </h3>

                    <Link to="/departments">
                        Departments
                    </Link>

                    <Link to="/courses">
                        Courses
                    </Link>

                    <Link to="/events">
                        Events
                    </Link>

                    <Link to="/notices">
                        Notices
                    </Link>

                    <Link to="/placements">
                        Placements
                    </Link>

                </div>


                {/* ==================================================
                    CONTACT
                ================================================== */}

                <div className="footer-column footer-contact">

                    <h3>
                        Contact Us
                    </h3>

                    <p>
                        📍 Madurai, Tamil Nadu
                    </p>

                    <p>
                        📞 +91 98765 43210
                    </p>

                    <p>
                        ✉️ info@edumanagecollege.com
                    </p>


                    <div className="footer-social">

                        <a
                            href="#"
                            aria-label="Facebook"
                        >
                            f
                        </a>

                        <a
                            href="#"
                            aria-label="Instagram"
                        >
                            ◎
                        </a>

                        <a
                            href="#"
                            aria-label="YouTube"
                        >
                            ▶
                        </a>

                        <a
                            href="#"
                            aria-label="LinkedIn"
                        >
                            in
                        </a>

                    </div>

                </div>

            </div>


            {/* ==================================================
                FOOTER BOTTOM
            ================================================== */}

            <div className="public-footer-bottom">

                <p>
                    © 2026 EduManage College.
                    All Rights Reserved.
                </p>


                <div>

                    <Link to="/privacy">
                        Privacy Policy
                    </Link>

                    <Link to="/terms">
                        Terms & Conditions
                    </Link>

                </div>

            </div>


        </footer>

    );

}


// ============================================================
// DEFAULT EXPORT
// ============================================================

export default PublicFooter;