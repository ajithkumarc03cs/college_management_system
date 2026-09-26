import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../api/axios";

import "./Departments.css";


function Departments() {

    const [page, setPage] = useState(null);

    const [departments, setDepartments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        const loadDepartments = async () => {

            try {

                setLoading(true);
                setError("");


                // =================================================
                // PAGE CONTENT
                // =================================================

                const pageResponse = await api.get(
                    "public/departments/"
                );


                // =================================================
                // DEPARTMENTS DATA
                // =================================================

                const departmentsResponse = await api.get(
                    "admin/departments/"
                );


                console.log(
                    "ADMIN DEPARTMENTS:",
                    departmentsResponse.data
                );


                // =================================================
                // SET PAGE
                // =================================================

                setPage(
                    pageResponse.data.page
                );


                // =================================================
                // SET DEPARTMENTS
                // =================================================

                if (Array.isArray(departmentsResponse.data)) {

                    setDepartments(
                        departmentsResponse.data
                    );

                } else {

                    setDepartments(
                        departmentsResponse.data.departments || []
                    );

                }


            } catch (err) {

                console.error(
                    "Failed to load departments:",
                    err
                );


                setError(
                    err.response?.data?.detail ||
                    "Unable to load departments."
                );


            } finally {

                setLoading(false);

            }

        };


        loadDepartments();

    }, []);


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <div className="departments-page">

                <div className="departments-container">

                    <p>
                        Loading departments...
                    </p>

                </div>

            </div>

        );

    }


    // =========================================================
    // ERROR
    // =========================================================

    if (error) {

        return (

            <div className="departments-page">

                <div className="departments-container">

                    <p>
                        {error}
                    </p>

                </div>

            </div>

        );

    }


    // =========================================================
    // PAGE NOT FOUND
    // =========================================================

    if (!page) {

        return null;

    }


    return (

        <div className="departments-page">


            {/* =================================================
                HERO
            ================================================= */}

            <section className="departments-hero">

                {page.hero_label && (

                    <span>
                        {page.hero_label}
                    </span>

                )}


                <h1>
                    {page.hero_title}
                </h1>


                <p>
                    {page.hero_description}
                </p>

            </section>


            {/* =================================================
                DEPARTMENTS
            ================================================= */}

            <section className="departments-section">

                <div className="departments-container">


                    {/* =================================================
                        SECTION HEADING
                    ================================================= */}

                    <div className="departments-heading">

                        {page.section_label && (

                            <span>
                                {page.section_label}
                            </span>

                        )}


                        <h2>
                            {page.section_title}
                        </h2>


                        <p>
                            {page.section_description}
                        </p>

                    </div>


                    {/* =================================================
                        DEPARTMENT GRID
                    ================================================= */}

                    <div className="departments-grid">

                        {departments.length === 0 ? (

                            <p>
                                No departments available.
                            </p>

                        ) : (

                            departments.map(
                                (department) => (

                                    <div
                                        className="department-card"
                                        key={department.id}
                                    >


                                        {/* ICON */}

                                        <div className="department-icon">

                                            {department.icon || "🏫"}

                                        </div>


                                        {/* NAME */}

                                        <h3>

                                            {department.name}

                                        </h3>


                                        {/* DESCRIPTION */}

                                        <p>

                                            {department.description}

                                        </p>


                                        {/* COURSES */}

                                        <Link
                                            to="/courses"
                                            className="department-link"
                                        >

                                            View Courses →

                                        </Link>


                                    </div>

                                )
                            )

                        )}

                    </div>

                </div>

            </section>


            {/* =================================================
                CTA
            ================================================= */}

            <section className="departments-cta">

                <div className="departments-cta-content">


                    <h2>

                        {page.cta_title}

                    </h2>


                    <p>

                        {page.cta_description}

                    </p>


                    <Link
                        to={page.cta_button_link}
                        className="departments-cta-button"
                    >

                        {page.cta_button_text}

                    </Link>


                </div>

            </section>


        </div>

    );

}


export default Departments;