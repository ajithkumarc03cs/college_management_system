import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../api/axios";
import "./Admissions.css";


function Admissions() {

    const [page, setPage] = useState(null);
    const [steps, setSteps] = useState([]);
    const [documents, setDocuments] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const loadAdmissions = async () => {

            try {

                setLoading(true);

                const response = await api.get(
                    "public/admissions/"
                );

                setPage(response.data.page);
                setSteps(response.data.steps || []);
                setDocuments(response.data.documents || []);

            } catch (err) {

                console.error(
                    "Failed to load admissions:",
                    err
                );

                setError(
                    "Unable to load admissions."
                );

            } finally {

                setLoading(false);

            }

        };


        loadAdmissions();

    }, []);


    if (loading) {

        return (
            <div className="public-admissions">

                <div className="container">

                    <p>
                        Loading admissions...
                    </p>

                </div>

            </div>
        );

    }


    if (error) {

        return (
            <div className="public-admissions">

                <div className="container">

                    <p>
                        {error}
                    </p>

                </div>

            </div>
        );

    }


    if (!page) {
        return null;
    }


    return (

        <div className="public-admissions">


            <section className="admissions-page-hero">

                <div className="container">

                    <span className="section-label">
                        {page.hero_label}
                    </span>

                    <h1>
                        {page.hero_title}
                    </h1>

                    <p>
                        {page.hero_description}
                    </p>

                </div>

            </section>


            <section className="admission-process-section">

                <div className="container">

                    <div className="section-heading">

                        <span className="section-label">
                            {page.process_label}
                        </span>

                        <h2>
                            {page.process_title}
                        </h2>

                    </div>


                    <div className="admission-steps">

                        {steps.map((step) => (

                            <div
                                className="admission-step"
                                key={step.id}
                            >

                                <span className="step-number">
                                    {step.number}
                                </span>

                                <h3>
                                    {step.title}
                                </h3>

                                <p>
                                    {step.description}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            <section className="admission-requirements-section">

                <div className="container two-column">

                    <div>

                        <span className="section-label">
                            {page.requirements_label}
                        </span>

                        <h2>
                            {page.requirements_title}
                        </h2>

                        <p>
                            {page.requirements_description}
                        </p>

                    </div>


                    <div className="document-list">

                        {documents.map((document) => (

                            <div
                                className="document-item"
                                key={document.id}
                            >

                                <span>
                                    ✓
                                </span>

                                <p>
                                    {document.name}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            <section className="admission-contact-section">

                <div className="container admission-contact">

                    <div>

                        <h2>
                            {page.cta_title}
                        </h2>

                        <p>
                            {page.cta_description}
                        </p>

                    </div>


                    <Link
                        to={page.cta_button_link}
                        className="primary-btn"
                    >
                        {page.cta_button_text}
                    </Link>

                </div>

            </section>


        </div>

    );

}


export default Admissions;