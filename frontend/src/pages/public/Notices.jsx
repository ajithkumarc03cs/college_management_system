import { useEffect, useState } from "react";

import api from "../../api/axios";

import "./Notices.css";


function Notices() {

    const [page, setPage] = useState(null);

    const [notices, setNotices] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        const loadNotices = async () => {

            try {

                const response = await api.get(
                    "public/notices/"
                );

                setPage(response.data.page);

                setNotices(
                    response.data.notices || []
                );

            } catch (error) {

                console.error(
                    "Failed to load notices:",
                    error
                );

                setError(
                    "Unable to load notices."
                );

            } finally {

                setLoading(false);

            }

        };


        loadNotices();

    }, []);


    if (loading) {

        return (
            <div className="public-notices">

                <section className="notices-page-hero">

                    <div className="container">

                        <p>Loading notices...</p>

                    </div>

                </section>

            </div>
        );

    }


    if (error) {

        return (
            <div className="public-notices">

                <section className="notices-page-hero">

                    <div className="container">

                        <p>{error}</p>

                    </div>

                </section>

            </div>
        );

    }


    return (

        <div className="public-notices">


            {/* HERO */}

            <section className="notices-page-hero">

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


            {/* NOTICES */}

            <section className="notices-list-section">

                <div className="container">


                    <div className="section-heading">

                        <span className="section-label">

                            {page?.section_label}

                        </span>


                        <h2>

                            {page?.section_title}

                        </h2>

                    </div>


                    <div className="public-notices-list">

                        {notices.length === 0 ? (

                            <p>
                                No notices available.
                            </p>

                        ) : (

                            notices.map((notice) => (

                                <article
                                    className="public-notice-card"
                                    key={notice.id}
                                >

                                    <div className="notice-date">

                                        <strong>

                                            {new Date(
                                                notice.date
                                            ).toLocaleDateString(
                                                "en-GB",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )}

                                        </strong>

                                    </div>


                                    <div className="notice-content">

                                        <span>

                                            {notice.category}

                                        </span>


                                        <h3>

                                            {notice.title}

                                        </h3>


                                        <p>

                                            {notice.description}

                                        </p>

                                    </div>

                                </article>

                            ))

                        )}

                    </div>

                </div>

            </section>


        </div>

    );

}


export default Notices;