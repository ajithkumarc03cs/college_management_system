import { useEffect, useState } from "react";
import api from "../../../api/axios";
import "./AdminFrontendHome.css";

function AdminFrontendHome() {

    const [home, setHome] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // =====================================================
    // LOAD HOME DATA
    // =====================================================

    const loadHome = async () => {

        try {

            setLoading(true);
            setError("");
            setMessage("");

            const response = await api.get(
                "admin/home/"
            );

            setHome(response.data);

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.detail ||
                "Failed to load home data."
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadHome();

    }, []);


    // =====================================================
    // INPUT CHANGE
    // =====================================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setHome((previous) => ({
            ...previous,
            [name]: value,
        }));

    };


    // =====================================================
    // SAVE HOME DATA
    // =====================================================

    const handleSave = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);
            setError("");
            setMessage("");


            const data = {

                // HERO
                hero_small_title: home.hero_small_title,
                hero_title: home.hero_title,
                hero_description: home.hero_description,

                hero_button_1_text:
                    home.hero_button_1_text,

                hero_button_1_link:
                    home.hero_button_1_link,

                hero_button_2_text:
                    home.hero_button_2_text,

                hero_button_2_link:
                    home.hero_button_2_link,


                // ABOUT
                about_label:
                    home.about_label,

                about_title:
                    home.about_title,

                about_description_1:
                    home.about_description_1,

                about_description_2:
                    home.about_description_2,

            };


            const response = await api.patch(
                "admin/home/",
                data
            );


            setHome(response.data);

            setMessage(
                "Home data updated successfully."
            );

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.detail ||
                "Failed to update home data."
            );

        } finally {

            setSaving(false);

        }

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="admin-settings-card">

                <div className="frontend-data-placeholder">

                    <h3>
                        Loading Home data...
                    </h3>

                </div>

            </div>
        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (!home) {

        return (
            <div className="admin-settings-card">

                <div className="settings-error">

                    {error || "Home data not found."}

                </div>

            </div>
        );

    }


    return (

        <div className="frontend-home-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="frontend-home-header">

                <div>

                    <h2>
                        Home Management
                    </h2>

                    <p>
                        Manage the public website home page.
                    </p>

                </div>

            </div>


            {/* =================================================
                MESSAGES
            ================================================= */}

            {message && (

                <div className="settings-success">

                    {message}

                </div>

            )}


            {error && (

                <div className="settings-error">

                    {error}

                </div>

            )}


            {/* =================================================
                FORM
            ================================================= */}

            <form
                onSubmit={handleSave}
                className="frontend-home-form"
            >


                {/* =================================================
                    HERO SECTION
                ================================================= */}

                <div className="admin-settings-card">

                    <div className="settings-card-header">

                        <div>

                            <h3>
                                Hero Section
                            </h3>

                            <p>
                                Manage the main banner content.
                            </p>

                        </div>

                    </div>


                    <div className="frontend-form-grid">


                        {/* SMALL TITLE */}

                        <div className="form-group">

                            <label>
                                Small Title
                            </label>

                            <input
                                type="text"
                                name="hero_small_title"
                                value={
                                    home.hero_small_title || ""
                                }
                                onChange={handleChange}
                                placeholder="Welcome to our college"
                            />

                        </div>


                        {/* HERO TITLE */}

                        <div className="form-group">

                            <label>
                                Hero Title
                            </label>

                            <input
                                type="text"
                                name="hero_title"
                                value={
                                    home.hero_title || ""
                                }
                                onChange={handleChange}
                                placeholder="Excellence in Education"
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div className="form-group full-width">

                            <label>
                                Description
                            </label>

                            <textarea
                                name="hero_description"
                                value={
                                    home.hero_description || ""
                                }
                                onChange={handleChange}
                                rows="4"
                                placeholder="Enter hero description..."
                            />

                        </div>


                        {/* BUTTON 1 TEXT */}

                        <div className="form-group">

                            <label>
                                Button 1 Text
                            </label>

                            <input
                                type="text"
                                name="hero_button_1_text"
                                value={
                                    home.hero_button_1_text || ""
                                }
                                onChange={handleChange}
                                placeholder="Apply Now"
                            />

                        </div>


                        {/* BUTTON 1 LINK */}

                        <div className="form-group">

                            <label>
                                Button 1 Link
                            </label>

                            <input
                                type="text"
                                name="hero_button_1_link"
                                value={
                                    home.hero_button_1_link || ""
                                }
                                onChange={handleChange}
                                placeholder="/admissions"
                            />

                        </div>


                        {/* BUTTON 2 TEXT */}

                        <div className="form-group">

                            <label>
                                Button 2 Text
                            </label>

                            <input
                                type="text"
                                name="hero_button_2_text"
                                value={
                                    home.hero_button_2_text || ""
                                }
                                onChange={handleChange}
                                placeholder="Explore Courses"
                            />

                        </div>


                        {/* BUTTON 2 LINK */}

                        <div className="form-group">

                            <label>
                                Button 2 Link
                            </label>

                            <input
                                type="text"
                                name="hero_button_2_link"
                                value={
                                    home.hero_button_2_link || ""
                                }
                                onChange={handleChange}
                                placeholder="/courses"
                            />

                        </div>

                    </div>

                </div>


                {/* =================================================
                    ABOUT SECTION
                ================================================= */}

                <div className="admin-settings-card">

                    <div className="settings-card-header">

                        <div>

                            <h3>
                                About Section
                            </h3>

                            <p>
                                Manage the home page about section.
                            </p>

                        </div>

                    </div>


                    <div className="frontend-form-grid">


                        {/* LABEL */}

                        <div className="form-group">

                            <label>
                                About Label
                            </label>

                            <input
                                type="text"
                                name="about_label"
                                value={
                                    home.about_label || ""
                                }
                                onChange={handleChange}
                                placeholder="About Us"
                            />

                        </div>


                        {/* TITLE */}

                        <div className="form-group">

                            <label>
                                About Title
                            </label>

                            <input
                                type="text"
                                name="about_title"
                                value={
                                    home.about_title || ""
                                }
                                onChange={handleChange}
                                placeholder="About our college"
                            />

                        </div>


                        {/* DESCRIPTION 1 */}

                        <div className="form-group full-width">

                            <label>
                                Description 1
                            </label>

                            <textarea
                                name="about_description_1"
                                value={
                                    home.about_description_1 || ""
                                }
                                onChange={handleChange}
                                rows="5"
                                placeholder="Enter first about description..."
                            />

                        </div>


                        {/* DESCRIPTION 2 */}

                        <div className="form-group full-width">

                            <label>
                                Description 2
                            </label>

                            <textarea
                                name="about_description_2"
                                value={
                                    home.about_description_2 || ""
                                }
                                onChange={handleChange}
                                rows="5"
                                placeholder="Enter second about description..."
                            />

                        </div>

                    </div>

                </div>


                {/* =================================================
                    SAVE
                ================================================= */}

                <div className="frontend-home-actions">

                    <button
                        type="submit"
                        className="settings-save"
                        disabled={saving}
                    >

                        {saving
                            ? "Saving..."
                            : "Save Home Data"}

                    </button>

                </div>


            </form>

        </div>

    );
}

export default AdminFrontendHome;