import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import api from "../../api/axios";

import "./Placements.css";


function Placements() {

    const [page, setPage] = useState(null);

    const [features, setFeatures] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        const loadPlacements = async () => {

            try {

                const response = await api.get(
                    "public/placements/"
                );

                setPage(response.data.page);

                setFeatures(
                    response.data.features || []
                );

            } catch (error) {

                console.error(
                    "Failed to load placements:",
                    error
                );

                setError(
                    "Unable to load placement information."
                );

            } finally {

                setLoading(false);

            }

        };


        loadPlacements();

    }, []);


    if (loading) {

        return (
            <div className="public-placements">

                <section className="placements-page-hero">

                    <div className="container">

                        <p>Loading placements...</p>

                    </div>

                </section>

            </div>
        );

    }


    if (error) {

        return (
            <div className="public-placements">

                <section className="placements-page-hero">

                    <div className="container">

                        <p>{error}</p>

                    </div>

                </section>

            </div>
        );

    }


    return (

        <div className="public-placements">


            {/* HERO */}

            <section className="placements-page-hero">

                <div className="container">

                    <span className="section-label">

                        {page?.hero_label}

                    </span>


                    <h1>

                        {page?.hero_title}

                    </h1>


                    <p>

                        {page?.hero_description}

                    </p>

                </div>

            </section>


            {/* INTRO */}

            <section className="placements-intro-section">

                <div className="container two-column">


                    <div>

                        <span className="section-label">

                            {page?.intro_label}

                        </span>


                        <h2>

                            {page?.intro_title}

                        </h2>


                        <p>

                            {page?.intro_description_1}

                        </p>


                        <p>

                            {page?.intro_description_2}

                        </p>

                    </div>


                    <div className="placement-image">

                        {page?.intro_image ? (

                            <img
                                src={page.intro_image}
                                alt={page?.intro_title}
                            />

                        ) : (

                            <div className="image-placeholder">

                                Placement Image

                            </div>

                        )}

                    </div>


                </div>

            </section>


            {/* FEATURES */}

            <section className="placement-features-section">

                <div className="container">


                    <div className="section-heading">

                        <span className="section-label">

                            {page?.feature_label}

                        </span>


                        <h2>

                            {page?.feature_title}

                        </h2>

                    </div>


                    <div className="placement-feature-grid">

                        {features.map((item) => (

                            <div
                                className="placement-feature-card"
                                key={item.id}
                            >

                                <span>

                                    {item.icon}

                                </span>


                                <h3>

                                    {item.title}

                                </h3>


                                <p>

                                    {item.description}

                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* CTA */}

            <section className="placements-cta-section">

                <div className="container placements-cta">


                    <div>

                        <h2>

                            {page?.cta_title}

                        </h2>


                        <p>

                            {page?.cta_description}

                        </p>

                    </div>


                    <Link
                        to={page?.cta_button_link || "/courses"}
                        className="primary-btn"
                    >

                        {page?.cta_button_text || "Explore Courses"}

                    </Link>


                </div>

            </section>


        </div>

    );

}


export default Placements;