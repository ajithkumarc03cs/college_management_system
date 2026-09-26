import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./AdminAbout.css";


// ============================================================
// INITIAL DATA
// ============================================================

const initialAboutData = {
    hero_label: "",
    hero_title: "",
    hero_description: "",

    intro_label: "",
    intro_title: "",
    intro_description_1: "",
    intro_description_2: "",
    intro_description_3: "",
    intro_image: null,

    direction_label: "",
    direction_title: "",

    vision_title: "",
    vision_description: "",

    mission_title: "",
    mission_description: "",

    values_label: "",
    values_title: "",

    facilities_label: "",
    facilities_title: "",

    cta_label: "",
    cta_title: "",
    cta_description: "",

    cta_button_1_text: "",
    cta_button_1_link: "",

    cta_button_2_text: "",
    cta_button_2_link: "",
};


// ============================================================
// ABOUT VALUE INITIAL DATA
// ============================================================

const initialValueData = {
    title: "",
    description: "",
    icon: "",
    order: 0,
    is_active: true,
};


// ============================================================
// ABOUT FACILITY INITIAL DATA
// ============================================================

const initialFacilityData = {
    title: "",
    description: "",
    image: null,
    order: 0,
    is_active: true,
};


// ============================================================
// COMPONENT
// ============================================================

function AdminAbout() {

    // ========================================================
    // ABOUT PAGE DATA
    // ========================================================

    const [aboutData, setAboutData] = useState(initialAboutData);

    const [values, setValues] = useState([]);
    const [facilities, setFacilities] = useState([]);


    // ========================================================
    // FORM STATES
    // ========================================================

    const [valueData, setValueData] = useState(initialValueData);
    const [facilityData, setFacilityData] = useState(initialFacilityData);


    // ========================================================
    // EDIT STATES
    // ========================================================

    const [editingValueId, setEditingValueId] = useState(null);
    const [editingFacilityId, setEditingFacilityId] = useState(null);


    // ========================================================
    // UI STATES
    // ========================================================

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // ========================================================
    // LOAD ABOUT DATA
    // ========================================================

    const loadAboutData = async () => {

        try {

            setLoading(true);
            setError("");

            const [
                aboutResponse,
                valuesResponse,
                facilitiesResponse
            ] = await Promise.all([
                api.get("admin/about/"),
                api.get("admin/about/values/"),
                api.get("admin/about/facilities/")
            ]);


            // ------------------------------------------------
            // MAIN ABOUT DATA
            // ------------------------------------------------

            setAboutData({
                ...initialAboutData,
                ...aboutResponse.data,
            });


            // ------------------------------------------------
            // VALUES
            // ------------------------------------------------

            setValues(
                Array.isArray(valuesResponse.data)
                    ? valuesResponse.data
                    : valuesResponse.data?.results || []
            );


            // ------------------------------------------------
            // FACILITIES
            // ------------------------------------------------

            setFacilities(
                Array.isArray(facilitiesResponse.data)
                    ? facilitiesResponse.data
                    : facilitiesResponse.data?.results || []
            );

        } catch (err) {

            console.error("Failed to load About data:", err);

            setError(
                err.response?.data?.detail ||
                "Failed to load About page data."
            );

        } finally {

            setLoading(false);

        }
    };


    // ========================================================
    // USE EFFECT
    // ========================================================

    useEffect(() => {

        loadAboutData();

    }, []);


    // ========================================================
    // MESSAGE HELPER
    // ========================================================

    const showMessage = (text) => {

        setMessage(text);

        setTimeout(() => {
            setMessage("");
        }, 3000);

    };


    // ========================================================
    // MAIN ABOUT INPUT CHANGE
    // ========================================================

    const handleAboutChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setAboutData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    // ========================================================
    // MAIN ABOUT IMAGE CHANGE
    // ========================================================

    const handleAboutImageChange = (event) => {

        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setAboutData((prev) => ({
            ...prev,
            intro_image: file,
        }));

    };


    // ========================================================
    // SAVE ABOUT PAGE
    // ========================================================

    const handleSaveAbout = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);
            setError("");

            const formData = new FormData();


            Object.entries(aboutData).forEach(([key, value]) => {

                if (value === null || value === undefined) {
                    return;
                }

                if (key === "intro_image") {

                    if (value instanceof File) {
                        formData.append(key, value);
                    }

                    return;
                }

                formData.append(key, value);

            });


            const response = await api.patch(
                "admin/about/",
                formData
            );


            setAboutData((prev) => ({
                ...prev,
                ...response.data,
            }));


            showMessage("About page saved successfully.");

        } catch (err) {

            console.error("Save About failed:", err);

            setError(
                err.response?.data?.detail ||
                "Failed to save About page."
            );

        } finally {

            setSaving(false);

        }
    };


    // ========================================================
    // VALUE INPUT CHANGE
    // ========================================================

    const handleValueChange = (event) => {

        const {
            name,
            value,
            type,
            checked
        } = event.target;

        setValueData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

    };


    // ========================================================
    // SAVE VALUE
    // ========================================================

    const handleSaveValue = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);
            setError("");


            const payload = {
                title: valueData.title,
                description: valueData.description,
                icon: valueData.icon,
                order: Number(valueData.order) || 0,
                is_active: valueData.is_active,
            };


            let response;


            if (editingValueId) {

                response = await api.patch(
                    `admin/about/values/${editingValueId}/`,
                    payload
                );

            } else {

                response = await api.post(
                    "admin/about/values/",
                    payload
                );

            }


            // ------------------------------------------------
            // UPDATE LIST
            // ------------------------------------------------

            if (editingValueId) {

                setValues((prev) =>
                    prev.map((item) =>
                        item.id === editingValueId
                            ? response.data
                            : item
                    )
                );

                showMessage("Value updated successfully.");

            } else {

                setValues((prev) => [
                    ...prev,
                    response.data,
                ]);

                showMessage("Value added successfully.");

            }


            // ------------------------------------------------
            // RESET
            // ------------------------------------------------

            setValueData(initialValueData);
            setEditingValueId(null);

        } catch (err) {

            console.error("Save value failed:", err);

            setError(
                err.response?.data?.detail ||
                "Failed to save value."
            );

        } finally {

            setSaving(false);

        }
    };


    // ========================================================
    // EDIT VALUE
    // ========================================================

    const handleEditValue = (item) => {

        setEditingValueId(item.id);

        setValueData({
            title: item.title || "",
            description: item.description || "",
            icon: item.icon || "",
            order: item.order ?? 0,
            is_active: item.is_active ?? true,
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };


    // ========================================================
    // DELETE VALUE
    // ========================================================

    const handleDeleteValue = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this value?"
        );

        if (!confirmed) {
            return;
        }


        try {

            setError("");

            await api.delete(
                `admin/about/values/${id}/`
            );


            setValues((prev) =>
                prev.filter((item) => item.id !== id)
            );


            if (editingValueId === id) {

                setEditingValueId(null);
                setValueData(initialValueData);

            }


            showMessage("Value deleted successfully.");

        } catch (err) {

            console.error("Delete value failed:", err);

            setError(
                err.response?.data?.detail ||
                "Failed to delete value."
            );

        }
    };


    // ========================================================
    // FACILITY INPUT CHANGE
    // ========================================================

    const handleFacilityChange = (event) => {

        const {
            name,
            value,
            type,
            checked,
            files
        } = event.target;


        if (type === "file") {

            setFacilityData((prev) => ({
                ...prev,
                [name]: files?.[0] || null,
            }));

            return;
        }


        setFacilityData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

    };


    // ========================================================
    // SAVE FACILITY
    // ========================================================

    const handleSaveFacility = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);
            setError("");


            const formData = new FormData();


            formData.append(
                "title",
                facilityData.title || ""
            );

            formData.append(
                "description",
                facilityData.description || ""
            );

            formData.append(
                "order",
                Number(facilityData.order) || 0
            );

            formData.append(
                "is_active",
                facilityData.is_active
            );


            if (facilityData.image instanceof File) {

                formData.append(
                    "image",
                    facilityData.image
                );

            }


            let response;


            if (editingFacilityId) {

                response = await api.patch(
                    `admin/about/facilities/${editingFacilityId}/`,
                    formData
                );

            } else {

                response = await api.post(
                    "admin/about/facilities/",
                    formData
                );

            }


            // ------------------------------------------------
            // UPDATE LIST
            // ------------------------------------------------

            if (editingFacilityId) {

                setFacilities((prev) =>
                    prev.map((item) =>
                        item.id === editingFacilityId
                            ? response.data
                            : item
                    )
                );

                showMessage(
                    "Facility updated successfully."
                );

            } else {

                setFacilities((prev) => [
                    ...prev,
                    response.data,
                ]);

                showMessage(
                    "Facility added successfully."
                );

            }


            // ------------------------------------------------
            // RESET
            // ------------------------------------------------

            setFacilityData(initialFacilityData);
            setEditingFacilityId(null);

        } catch (err) {

            console.error("Save facility failed:", err);

            setError(
                err.response?.data?.detail ||
                "Failed to save facility."
            );

        } finally {

            setSaving(false);

        }
    };


    // ========================================================
    // EDIT FACILITY
    // ========================================================

    const handleEditFacility = (item) => {

        setEditingFacilityId(item.id);

        setFacilityData({
            title: item.title || "",
            description: item.description || "",
            image: null,
            order: item.order ?? 0,
            is_active: item.is_active ?? true,
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };


    // ========================================================
    // DELETE FACILITY
    // ========================================================

    const handleDeleteFacility = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this facility?"
        );

        if (!confirmed) {
            return;
        }


        try {

            setError("");

            await api.delete(
                `admin/about/facilities/${id}/`
            );


            setFacilities((prev) =>
                prev.filter((item) => item.id !== id)
            );


            if (editingFacilityId === id) {

                setEditingFacilityId(null);
                setFacilityData(initialFacilityData);

            }


            showMessage(
                "Facility deleted successfully."
            );

        } catch (err) {

            console.error("Delete facility failed:", err);

            setError(
                err.response?.data?.detail ||
                "Failed to delete facility."
            );

        }
    };


    // ========================================================
    // CANCEL VALUE EDIT
    // ========================================================

    const cancelValueEdit = () => {

        setEditingValueId(null);
        setValueData(initialValueData);

    };


    // ========================================================
    // CANCEL FACILITY EDIT
    // ========================================================

    const cancelFacilityEdit = () => {

        setEditingFacilityId(null);
        setFacilityData(initialFacilityData);

    };


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (
            <div className="admin-about-page">

                <div className="admin-about-loading">
                    Loading About page...
                </div>

            </div>
        );

    }


    // ========================================================
    // JSX
    // ========================================================

    return (

        <div className="admin-about-page">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="admin-page-header">

                <h1>
                    About Page
                </h1>

                <p>
                    Manage your college About page content.
                </p>

            </div>


            {/* =================================================
                SUCCESS MESSAGE
            ================================================= */}

            {message && (
                <div className="about-success">
                    {message}
                </div>
            )}


            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {error && (
                <div className="about-error">
                    {error}
                </div>
            )}


            {/* =================================================
                MAIN ABOUT CONTENT
            ================================================= */}

            <form
                className="admin-about-card"
                onSubmit={handleSaveAbout}
            >

                <div className="about-card-header">

                    <h2>
                        Main About Content
                    </h2>

                    <p>
                        Update the main content displayed on the About page.
                    </p>

                </div>


                {/* =================================================
                    HERO
                ================================================= */}

                <div className="about-section">

                    <h3>
                        Hero Section
                    </h3>


                    <div className="about-form-grid">

                        <div className="about-field">

                            <label>
                                Hero Label
                            </label>

                            <input
                                type="text"
                                name="hero_label"
                                value={aboutData.hero_label}
                                onChange={handleAboutChange}
                                placeholder="About Us"
                            />

                        </div>


                        <div className="about-field">

                            <label>
                                Hero Title
                            </label>

                            <input
                                type="text"
                                name="hero_title"
                                value={aboutData.hero_title}
                                onChange={handleAboutChange}
                                placeholder="About Our College"
                            />

                        </div>


                        <div className="about-field about-field-full">

                            <label>
                                Hero Description
                            </label>

                            <textarea
                                name="hero_description"
                                value={aboutData.hero_description}
                                onChange={handleAboutChange}
                                placeholder="Enter hero description..."
                            />

                        </div>

                    </div>

                </div>


                {/* =================================================
                    INTRO
                ================================================= */}

                <div className="about-section">

                    <h3>
                        Introduction Section
                    </h3>


                    <div className="about-form-grid">

                        <div className="about-field">

                            <label>
                                Intro Label
                            </label>

                            <input
                                type="text"
                                name="intro_label"
                                value={aboutData.intro_label}
                                onChange={handleAboutChange}
                                placeholder="Who We Are"
                            />

                        </div>


                        <div className="about-field">

                            <label>
                                Intro Title
                            </label>

                            <input
                                type="text"
                                name="intro_title"
                                value={aboutData.intro_title}
                                onChange={handleAboutChange}
                                placeholder="Building Knowledge..."
                            />

                        </div>


                        <div className="about-field about-field-full">

                            <label>
                                Description 1
                            </label>

                            <textarea
                                name="intro_description_1"
                                value={aboutData.intro_description_1}
                                onChange={handleAboutChange}
                            />

                        </div>


                        <div className="about-field about-field-full">

                            <label>
                                Description 2
                            </label>

                            <textarea
                                name="intro_description_2"
                                value={aboutData.intro_description_2}
                                onChange={handleAboutChange}
                            />

                        </div>


                        <div className="about-field about-field-full">

                            <label>
                                Description 3
                            </label>

                            <textarea
                                name="intro_description_3"
                                value={aboutData.intro_description_3}
                                onChange={handleAboutChange}
                            />

                        </div>


                        <div className="about-field about-field-full">

                            <label>
                                Intro Image
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAboutImageChange}
                            />

                            {aboutData.intro_image &&
                                typeof aboutData.intro_image === "string" && (
                                    <img
                                        src={aboutData.intro_image}
                                        alt="About"
                                        className="about-image-preview"
                                    />
                                )}

                        </div>

                    </div>

                </div>


                {/* =================================================
                    VISION / MISSION
                ================================================= */}

                <div className="about-section">

                    <h3>
                        Vision & Mission
                    </h3>


                    <div className="about-form-grid">

                        <div className="about-field">

                            <label>
                                Direction Label
                            </label>

                            <input
                                type="text"
                                name="direction_label"
                                value={aboutData.direction_label}
                                onChange={handleAboutChange}
                            />

                        </div>


                        <div className="about-field">

                            <label>
                                Direction Title
                            </label>

                            <input
                                type="text"
                                name="direction_title"
                                value={aboutData.direction_title}
                                onChange={handleAboutChange}
                            />

                        </div>


                        <div className="about-field">

                            <label>
                                Vision Title
                            </label>

                            <input
                                type="text"
                                name="vision_title"
                                value={aboutData.vision_title}
                                onChange={handleAboutChange}
                            />

                        </div>


                        <div className="about-field">

                            <label>
                                Mission Title
                            </label>

                            <input
                                type="text"
                                name="mission_title"
                                value={aboutData.mission_title}
                                onChange={handleAboutChange}
                            />

                        </div>


                        <div className="about-field about-field-full">

                            <label>
                                Vision Description
                            </label>

                            <textarea
                                name="vision_description"
                                value={aboutData.vision_description}
                                onChange={handleAboutChange}
                            />

                        </div>


                        <div className="about-field about-field-full">

                            <label>
                                Mission Description
                            </label>

                            <textarea
                                name="mission_description"
                                value={aboutData.mission_description}
                                onChange={handleAboutChange}
                            />

                        </div>

                    </div>

                </div>


                {/* =================================================
                    VALUES LABEL
                ================================================= */}

                <div className="about-section">

                    <h3>
                        Values Section
                    </h3>


                    <div className="about-form-grid">

                        <div className="about-field">

                            <label>
                                Values Label
                            </label>

                            <input
                                type="text"
                                name="values_label"
                                value={aboutData.values_label}
                                onChange={handleAboutChange}
                            />

                        </div>


                        <div className="about-field">

                            <label>
                                Values Title
                            </label>

                            <input
                                type="text"
                                name="values_title"
                                value={aboutData.values_title}
                                onChange={handleAboutChange}
                            />

                        </div>

                    </div>

                </div>


                {/* =================================================
                    FACILITIES LABEL
                ================================================= */}

                <div className="about-section">

                    <h3>
                        Facilities Section
                    </h3>


                    <div className="about-form-grid">

                        <div className="about-field">

                            <label>
                                Facilities Label
                            </label>

                            <input
                                type="text"
                                name="facilities_label"
                                value={aboutData.facilities_label}
                                onChange={handleAboutChange}
                            />

                        </div>


                        <div className="about-field">

                            <label>
                                Facilities Title
                            </label>

                            <input
                                type="text"
                                name="facilities_title"
                                value={aboutData.facilities_title}
                                onChange={handleAboutChange}
                            />

                        </div>

                    </div>

                </div>


                {/* =================================================
                    CTA
                ================================================= */}

                <div className="about-section">

                    <h3>
                        Call To Action
                    </h3>


                    <div className="about-form-grid">

                        <div className="about-field">

                            <label>
                                CTA Label
                            </label>

                            <input
                                type="text"
                                name="cta_label"
                                value={aboutData.cta_label}
                                onChange={handleAboutChange}
                            />

                        </div>


                        <div className="about-field">

                            <label>
                                CTA Title
                            </label>

                            <input
                                type="text"
                                name="cta_title"
                                value={aboutData.cta_title}
                                onChange={handleAboutChange}
                            />

                        </div>


                        <div className="about-field about-field-full">

                            <label>
                                CTA Description
                            </label>

                            <textarea
                                name="cta_description"
                                value={aboutData.cta_description}
                                onChange={handleAboutChange}
                            />

                        </div>


                        <div className="about-field">

                            <label>
                                Button 1 Text
                            </label>

                            <input
                                type="text"
                                name="cta_button_1_text"
                                value={aboutData.cta_button_1_text}
                                onChange={handleAboutChange}
                            />

                        </div>


                        <div className="about-field">

                            <label>
                                Button 1 Link
                            </label>

                            <input
                                type="text"
                                name="cta_button_1_link"
                                value={aboutData.cta_button_1_link}
                                onChange={handleAboutChange}
                            />

                        </div>


                        <div className="about-field">

                            <label>
                                Button 2 Text
                            </label>

                            <input
                                type="text"
                                name="cta_button_2_text"
                                value={aboutData.cta_button_2_text}
                                onChange={handleAboutChange}
                            />

                        </div>


                        <div className="about-field">

                            <label>
                                Button 2 Link
                            </label>

                            <input
                                type="text"
                                name="cta_button_2_link"
                                value={aboutData.cta_button_2_link}
                                onChange={handleAboutChange}
                            />

                        </div>

                    </div>


                    <div className="about-actions">

                        <button
                            type="submit"
                            className="about-save-btn"
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Save About Page"}
                        </button>

                    </div>

                </div>

            </form>


            {/* =================================================
                VALUES MANAGEMENT
            ================================================= */}

            <div className="admin-about-card">

                <div className="about-card-header">

                    <h2>
                        About Values
                    </h2>

                    <p>
                        Add and manage your college values.
                    </p>

                </div>


                {/* VALUE FORM */}

                <form
                    className="about-section"
                    onSubmit={handleSaveValue}
                >

                    <h3>
                        {editingValueId
                            ? "Edit Value"
                            : "Add Value"}
                    </h3>


                    <div className="about-form-grid">

                        <div className="about-field">

                            <label>
                                Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={valueData.title}
                                onChange={handleValueChange}
                                required
                            />

                        </div>


                        <div className="about-field">

                            <label>
                                Icon
                            </label>

                            <input
                                type="text"
                                name="icon"
                                value={valueData.icon}
                                onChange={handleValueChange}
                                placeholder="fa-star"
                            />

                        </div>


                        <div className="about-field">

                            <label>
                                Order
                            </label>

                            <input
                                type="number"
                                name="order"
                                value={valueData.order}
                                onChange={handleValueChange}
                            />

                        </div>


                        <div className="about-checkbox">

                            <input
                                type="checkbox"
                                id="value-active"
                                name="is_active"
                                checked={valueData.is_active}
                                onChange={handleValueChange}
                            />

                            <label htmlFor="value-active">
                                Active
                            </label>

                        </div>


                        <div className="about-field about-field-full">

                            <label>
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={valueData.description}
                                onChange={handleValueChange}
                                required
                            />

                        </div>

                    </div>


                    <div className="about-actions">

                        <button
                            type="submit"
                            className="about-save-btn"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : editingValueId
                                    ? "Update Value"
                                    : "Add Value"}
                        </button>


                        {editingValueId && (
                            <button
                                type="button"
                                className="about-cancel-btn"
                                onClick={cancelValueEdit}
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </form>


                {/* VALUE LIST */}

                <div className="about-list-section">

                    <div className="about-list-header">

                        <h3>
                            Existing Values
                        </h3>

                        <span>
                            {values.length} items
                        </span>

                    </div>


                    {values.length === 0 ? (

                        <div className="about-empty">
                            No values added yet.
                        </div>

                    ) : (

                        <div className="about-item-list">

                            {values.map((item) => (

                                <div
                                    className="about-item"
                                    key={item.id}
                                >

                                    <div className="about-item-content">

                                        <div className="about-item-title-row">

                                            <h4>
                                                {item.title}
                                            </h4>

                                            <span
                                                className={
                                                    item.is_active
                                                        ? "about-status active"
                                                        : "about-status inactive"
                                                }
                                            >
                                                {item.is_active
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>

                                        </div>


                                        {item.icon && (
                                            <div className="about-item-icon">
                                                {item.icon}
                                            </div>
                                        )}


                                        <p>
                                            {item.description}
                                        </p>

                                    </div>


                                    <div className="about-item-actions">

                                        <button
                                            type="button"
                                            className="about-edit-btn"
                                            onClick={() =>
                                                handleEditValue(item)
                                            }
                                        >
                                            Edit
                                        </button>


                                        <button
                                            type="button"
                                            className="about-delete-btn"
                                            onClick={() =>
                                                handleDeleteValue(item.id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>


            {/* =================================================
                FACILITIES MANAGEMENT
            ================================================= */}

            <div className="admin-about-card">

                <div className="about-card-header">

                    <h2>
                        About Facilities
                    </h2>

                    <p>
                        Add and manage college facilities.
                    </p>

                </div>


                {/* FACILITY FORM */}

                <form
                    className="about-section"
                    onSubmit={handleSaveFacility}
                >

                    <h3>
                        {editingFacilityId
                            ? "Edit Facility"
                            : "Add Facility"}
                    </h3>


                    <div className="about-form-grid">

                        <div className="about-field">

                            <label>
                                Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={facilityData.title}
                                onChange={handleFacilityChange}
                                required
                            />

                        </div>


                        <div className="about-field">

                            <label>
                                Order
                            </label>

                            <input
                                type="number"
                                name="order"
                                value={facilityData.order}
                                onChange={handleFacilityChange}
                            />

                        </div>


                        <div className="about-field about-field-full">

                            <label>
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={facilityData.description}
                                onChange={handleFacilityChange}
                                required
                            />

                        </div>


                        <div className="about-field about-field-full">

                            <label>
                                Facility Image
                            </label>

                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleFacilityChange}
                            />

                        </div>


                        <div className="about-checkbox">

                            <input
                                type="checkbox"
                                id="facility-active"
                                name="is_active"
                                checked={facilityData.is_active}
                                onChange={handleFacilityChange}
                            />

                            <label htmlFor="facility-active">
                                Active
                            </label>

                        </div>

                    </div>


                    <div className="about-actions">

                        <button
                            type="submit"
                            className="about-save-btn"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : editingFacilityId
                                    ? "Update Facility"
                                    : "Add Facility"}
                        </button>


                        {editingFacilityId && (
                            <button
                                type="button"
                                className="about-cancel-btn"
                                onClick={cancelFacilityEdit}
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </form>


                {/* FACILITY LIST */}

                <div className="about-list-section">

                    <div className="about-list-header">

                        <h3>
                            Existing Facilities
                        </h3>

                        <span>
                            {facilities.length} items
                        </span>

                    </div>


                    {facilities.length === 0 ? (

                        <div className="about-empty">
                            No facilities added yet.
                        </div>

                    ) : (

                        <div className="about-item-list">

                            {facilities.map((item) => (

                                <div
                                    className="about-item"
                                    key={item.id}
                                >

                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="about-facility-image"
                                        />
                                    )}


                                    <div className="about-item-content">

                                        <div className="about-item-title-row">

                                            <h4>
                                                {item.title}
                                            </h4>

                                            <span
                                                className={
                                                    item.is_active
                                                        ? "about-status active"
                                                        : "about-status inactive"
                                                }
                                            >
                                                {item.is_active
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>

                                        </div>


                                        <p>
                                            {item.description}
                                        </p>

                                    </div>


                                    <div className="about-item-actions">

                                        <button
                                            type="button"
                                            className="about-edit-btn"
                                            onClick={() =>
                                                handleEditFacility(item)
                                            }
                                        >
                                            Edit
                                        </button>


                                        <button
                                            type="button"
                                            className="about-delete-btn"
                                            onClick={() =>
                                                handleDeleteFacility(item.id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}


export default AdminAbout;