import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../api/axios";
import "./About.css";


function About() {

    // =========================================================
    // STATE
    // =========================================================

    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =========================================================
    // LOAD ABOUT DATA
    // =========================================================

    useEffect(() => {

        const loadAbout = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await api.get(
                    "public/about/"
                );

                console.log(
                    "PUBLIC ABOUT RESPONSE:",
                    response.data
                );

                setPage(response.data);

            } catch (err) {

                console.error(
                    "Failed to load About page:",
                    err
                );

                setError(
                    err.response?.data?.detail ||
                    "Failed to load About page."
                );

            } finally {

                setLoading(false);

            }

        };


        loadAbout();

    }, []);


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (
            <div className="public-about">

                <div className="container">

                    <p>
                        Loading About page...
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
            <div className="public-about">

                <div className="container">

                    <p>
                        {error}
                    </p>

                </div>

            </div>
        );

    }


    // =========================================================
    // NO DATA
    // =========================================================

    if (!page) {

        return (
            <div className="public-about">

                <div className="container">

                    <p>
                        About page data not available.
                    </p>

                </div>

            </div>
        );

    }


    // =========================================================
    // VALUES
    // =========================================================

    const values = Array.isArray(page.values)
        ? page.values.filter(
            (value) => value.is_active !== false
        )
        : [];


    // =========================================================
    // FACILITIES
    // =========================================================

    const facilities = Array.isArray(page.facilities)
        ? page.facilities.filter(
            (facility) => facility.is_active !== false
        )
        : [];


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <div className="public-about">


            {/* ====================================================
                PAGE HERO
            ==================================================== */}

            <section className="about-page-hero">

                <div className="container">

                    <span className="section-label">

                        {page.hero_label}

                    </span>


                    <h1>

                        {page.hero_title}

                    </h1>


                    {page.hero_description && (

                        <p>

                            {page.hero_description}

                        </p>

                    )}

                </div>

            </section>


            {/* ====================================================
                ABOUT INTRO
            ==================================================== */}

            <section className="about-intro-section">

                <div className="container two-column">


                    {/* IMAGE */}

                    <div className="about-intro-image">

                        {page.intro_image ? (

                           <img
                                src={`http://127.0.0.1:8000${page.intro_image}`}
                                alt={page.intro_title}
                            />

                        ) : (

                            <div className="image-placeholder">

                                College Image

                            </div>

                        )}

                    </div>


                    {/* CONTENT */}

                    <div className="about-intro-content">

                        <span className="section-label">

                            {page.intro_label}

                        </span>


                        <h2>

                            {page.intro_title}

                        </h2>


                        {page.intro_description_1 && (

                            <p>

                                {page.intro_description_1}

                            </p>

                        )}


                        {page.intro_description_2 && (

                            <p>

                                {page.intro_description_2}

                            </p>

                        )}


                        {page.intro_description_3 && (

                            <p>

                                {page.intro_description_3}

                            </p>

                        )}

                    </div>

                </div>

            </section>


            {/* ====================================================
                VISION & MISSION
            ==================================================== */}

            <section className="vision-mission-section">

                <div className="container">


                    <div className="section-heading">

                        <span className="section-label">

                            {page.direction_label}

                        </span>


                        <h2>

                            {page.direction_title}

                        </h2>

                    </div>


                    <div className="vision-mission-grid">


                        {/* VISION */}

                        <div className="vision-card">

                            <span>
                                👁️
                            </span>


                            <h3>

                                {page.vision_title}

                            </h3>


                            <p>

                                {page.vision_description}

                            </p>

                        </div>


                        {/* MISSION */}

                        <div className="mission-card">

                            <span>
                                🎯
                            </span>


                            <h3>

                                {page.mission_title}

                            </h3>


                            <p>

                                {page.mission_description}

                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ====================================================
                CORE VALUES
            ==================================================== */}

            <section className="values-section">

                <div className="container">


                    <div className="section-heading">

                        <span className="section-label">

                            {page.values_label}

                        </span>


                        <h2>

                            {page.values_title}

                        </h2>

                    </div>


                    <div className="values-grid">

                        {values.length > 0 ? (

                            values
                                .slice()
                                .sort(
                                    (a, b) =>
                                        (a.order || 0) -
                                        (b.order || 0)
                                )
                                .map((value) => (

                                    <div
                                        className="value-card"
                                        key={value.id}
                                    >

                                        <span className="value-icon">

                                            {value.icon}

                                        </span>


                                        <h3>

                                            {value.title}

                                        </h3>


                                        <p>

                                            {value.description}

                                        </p>

                                    </div>

                                ))

                        ) : (

                            <p>
                                No values available.
                            </p>

                        )}

                    </div>

                </div>

            </section>


            {/* ====================================================
                FACILITIES
            ==================================================== */}

            <section className="about-facilities-section">

                <div className="container">


                    <div className="section-heading">

                        <span className="section-label">

                            {page.facilities_label}

                        </span>


                        <h2>

                            {page.facilities_title}

                        </h2>

                    </div>


                    <div className="about-facilities-grid">

                        {facilities.length > 0 ? (

                            facilities
                                .slice()
                                .sort(
                                    (a, b) =>
                                        (a.order || 0) -
                                        (b.order || 0)
                                )
                                .map((facility) => (

                                    <div
                                        className="about-facility-card"
                                        key={facility.id}
                                    >


                                        {/* IMAGE */}

                                        <div className="facility-image">

                                            {facility.image ? (

                                                <img
                                                    src={
                                                        facility.image
                                                    }
                                                    alt={
                                                        facility.title
                                                    }
                                                />

                                            ) : (

                                                <span>

                                                    {facility.title}

                                                </span>

                                            )}

                                        </div>


                                        {/* CONTENT */}

                                        <div className="facility-content">

                                            <h3>

                                                {facility.title}

                                            </h3>


                                            <p>

                                                {facility.description}

                                            </p>

                                        </div>

                                    </div>

                                ))

                        ) : (

                            <p>
                                No facilities available.
                            </p>

                        )}

                    </div>

                </div>

            </section>


            {/* ====================================================
                CTA
            ==================================================== */}

            <section className="about-cta-section">

                <div className="container">

                    <div className="about-cta">


                        <div>

                            <span className="section-label">

                                {page.cta_label}

                            </span>


                            <h2>

                                {page.cta_title}

                            </h2>


                            {page.cta_description && (

                                <p>

                                    {page.cta_description}

                                </p>

                            )}

                        </div>


                        <div className="about-cta-buttons">


                            <Link
                                to={
                                    page.cta_button_1_link ||
                                    "/courses"
                                }
                                className="primary-btn"
                            >

                                {page.cta_button_1_text ||
                                    "Explore Courses"}

                            </Link>


                            <Link
                                to={
                                    page.cta_button_2_link ||
                                    "/admissions"
                                }
                                className="secondary-btn"
                            >

                                {page.cta_button_2_text ||
                                    "Apply Now"}

                            </Link>

                        </div>

                    </div>

                </div>

            </section>


        </div>

    );

}


export default About;