
import { useEffect, useState } from "react";
import api from "../../../api/axios";
import "./AdminFrontendHome.css";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

function AdminFrontendHome() {
    const [home, setHome] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [heroImageFile, setHeroImageFile] = useState(null);
    const [heroImagePreview, setHeroImagePreview] = useState("");

    const [aboutImageFile, setAboutImageFile] = useState(null);
    const [aboutImagePreview, setAboutImagePreview] = useState("");

    // Convert relative image paths to backend URLs.
    const getImageUrl = (imageUrl) => {
        if (!imageUrl) return "";

        if (
            imageUrl.startsWith("blob:") ||
            imageUrl.startsWith("http://") ||
            imageUrl.startsWith("https://") ||
            imageUrl.startsWith("data:")
        ) {
            return imageUrl;
        }

        const baseURL = api.defaults.baseURL || "";
        const backendUrl = baseURL.replace(/\/api\/?$/, "");

        return `${backendUrl}/${imageUrl.replace(/^\/+/, "")}`;
    };

    // Load home page data.
    const loadHome = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("admin/home/");
            setHome(response.data);
        } catch (err) {
            console.error("Load home error:", err);

            setError(
                err.response?.data?.detail ||
                "Failed to load home data."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadHome();

        return () => {
            if (heroImagePreview) {
                URL.revokeObjectURL(heroImagePreview);
            }

            if (aboutImagePreview) {
                URL.revokeObjectURL(aboutImagePreview);
            }
        };
        // Load once when the component mounts.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update text fields.
    const handleChange = (e) => {
        const { name, value } = e.target;

        setHome((previous) => ({
            ...previous,
            [name]: value,
        }));

        setMessage("");
        setError("");
    };

    // Validate selected image.
    const validateImage = (file) => {
        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            return false;
        }

        if (file.size > MAX_IMAGE_SIZE) {
            setError("Image size must be less than 5 MB.");
            return false;
        }

        return true;
    };

    // Select hero image.
    const handleHeroImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!validateImage(file)) {
            e.target.value = "";
            return;
        }

        if (heroImagePreview) {
            URL.revokeObjectURL(heroImagePreview);
        }

        setHeroImageFile(file);
        setHeroImagePreview(URL.createObjectURL(file));
        setError("");
        setMessage("");
    };

    // Select about image.
    const handleAboutImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!validateImage(file)) {
            e.target.value = "";
            return;
        }

        if (aboutImagePreview) {
            URL.revokeObjectURL(aboutImagePreview);
        }

        setAboutImageFile(file);
        setAboutImagePreview(URL.createObjectURL(file));
        setError("");
        setMessage("");
    };

    // Display placeholder when the image cannot be loaded.
    const handleImageError = (e) => {
        const img = e.currentTarget;

        img.style.display = "none";

        const placeholder =
            img.parentElement?.querySelector(".image-placeholder");

        if (placeholder) {
            placeholder.style.display = "flex";
        }
    };

    // Display image and hide placeholder when image loads.
    const handleImageLoad = (e) => {
        const img = e.currentTarget;

        img.style.display = "block";

        const placeholder =
            img.parentElement?.querySelector(".image-placeholder");

        if (placeholder) {
            placeholder.style.display = "none";
        }
    };

    // Save text and selected images.
    const handleSave = async (e) => {
        e.preventDefault();

        if (!home) return;

        try {
            setSaving(true);
            setError("");
            setMessage("");

            const payload = new FormData();

            const data = {
                hero_small_title: home.hero_small_title,
                hero_title: home.hero_title,
                hero_description: home.hero_description,
                hero_button_1_text: home.hero_button_1_text,
                hero_button_1_link: home.hero_button_1_link,
                hero_button_2_text: home.hero_button_2_text,
                hero_button_2_link: home.hero_button_2_link,

                about_label: home.about_label,
                about_title: home.about_title,
                about_description_1: home.about_description_1,
                about_description_2: home.about_description_2,
            };

            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    payload.append(key, value);
                }
            });

            if (heroImageFile) {
                payload.append("hero_image", heroImageFile);
            }

            if (aboutImageFile) {
                payload.append("about_image", aboutImageFile);
            }

            const response = await api.patch(
                "admin/home/",
                payload
            );

            setHome(response.data);

            setHeroImageFile(null);
            setAboutImageFile(null);

            if (heroImagePreview) {
                URL.revokeObjectURL(heroImagePreview);
            }

            if (aboutImagePreview) {
                URL.revokeObjectURL(aboutImagePreview);
            }

            setHeroImagePreview("");
            setAboutImagePreview("");

            const heroInput = document.getElementById("hero_image");
            const aboutInput = document.getElementById("about_image");

            if (heroInput) heroInput.value = "";
            if (aboutInput) aboutInput.value = "";

            setMessage("Home page updated successfully.");
        } catch (err) {
            console.error(
                "Save home error:",
                err.response?.data || err
            );

            const details = err.response?.data;

            if (details && typeof details === "object") {
                setError(
                    Object.entries(details)
                        .map(([key, value]) => {
                            const detail = Array.isArray(value)
                                ? value.join(", ")
                                : typeof value === "string"
                                    ? value
                                    : JSON.stringify(value);

                            return `${key}: ${detail}`;
                        })
                        .join(" | ")
                );
            } else {
                setError(
                    details || "Failed to update home data."
                );
            }
        } finally {
            setSaving(false);
        }
    };

    // Reusable image preview.
    const renderImagePreview = ({
        title,
        imageUrl,
        alt,
        inputId,
        onImageChange,
    }) => (
        <div className="form-group full-width">
            <label htmlFor={inputId}>{title}</label>

            <div className="image-preview-wrapper">
                {imageUrl && (
                    <img
                        key={imageUrl}
                        className="managed-image-preview"
                        src={getImageUrl(imageUrl)}
                        alt={alt}
                        onError={handleImageError}
                        onLoad={handleImageLoad}
                    />
                )}

                <div
                    className="image-placeholder"
                    style={{
                        display: imageUrl ? "none" : "flex",
                    }}
                >
                    <div className="placeholder-icon">
                        <span aria-hidden="true">✦</span>
                    </div>

                    <h4>{title}</h4>

                    <p>
                        {imageUrl
                            ? "Image unavailable"
                            : "No image selected"}
                    </p>

                    <span>
                        Select an image below to preview it
                    </span>
                </div>
            </div>

            <input
                id={inputId}
                type="file"
                accept="image/*"
                onChange={onImageChange}
            />

            <small>Maximum image size: 5 MB.</small>
        </div>
    );

    if (loading) {
        return (
            <div className="admin-settings-card">
                <div className="frontend-data-placeholder">
                    <h3>Loading Home data...</h3>
                </div>
            </div>
        );
    }

    if (!home) {
        return (
            <div className="admin-settings-card">
                <div className="settings-error">
                    {error || "Home data not found."}
                </div>

                <button type="button" onClick={loadHome}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="frontend-home-page">
            <div className="frontend-home-header">
                <div>
                    <h2>Home Management</h2>
                    <p>Manage the public website home page.</p>
                </div>
            </div>

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

            <form
                onSubmit={handleSave}
                className="frontend-home-form"
            >
                {/* HERO SECTION */}
                <div className="admin-settings-card">
                    <div className="settings-card-header">
                        <div>
                            <h3>Hero Section</h3>
                            <p>Manage the main banner content.</p>
                        </div>
                    </div>

                    <div className="frontend-form-grid">
                        <div className="form-group">
                            <label htmlFor="hero_small_title">
                                Small Title
                            </label>
                            <input
                                id="hero_small_title"
                                type="text"
                                name="hero_small_title"
                                value={home.hero_small_title || ""}
                                onChange={handleChange}
                                placeholder="Welcome to our college"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="hero_title">
                                Hero Title
                            </label>
                            <input
                                id="hero_title"
                                type="text"
                                name="hero_title"
                                value={home.hero_title || ""}
                                onChange={handleChange}
                                placeholder="Excellence in Education"
                            />
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="hero_description">
                                Description
                            </label>
                            <textarea
                                id="hero_description"
                                name="hero_description"
                                value={home.hero_description || ""}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Enter hero description..."
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="hero_button_1_text">
                                Button 1 Text
                            </label>
                            <input
                                id="hero_button_1_text"
                                type="text"
                                name="hero_button_1_text"
                                value={home.hero_button_1_text || ""}
                                onChange={handleChange}
                                placeholder="Apply Now"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="hero_button_1_link">
                                Button 1 Link
                            </label>
                            <input
                                id="hero_button_1_link"
                                type="text"
                                name="hero_button_1_link"
                                value={home.hero_button_1_link || ""}
                                onChange={handleChange}
                                placeholder="/admissions"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="hero_button_2_text">
                                Button 2 Text
                            </label>
                            <input
                                id="hero_button_2_text"
                                type="text"
                                name="hero_button_2_text"
                                value={home.hero_button_2_text || ""}
                                onChange={handleChange}
                                placeholder="Explore Courses"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="hero_button_2_link">
                                Button 2 Link
                            </label>
                            <input
                                id="hero_button_2_link"
                                type="text"
                                name="hero_button_2_link"
                                value={home.hero_button_2_link || ""}
                                onChange={handleChange}
                                placeholder="/courses"
                            />
                        </div>

                        {renderImagePreview({
                            title: "Hero Image",
                            imageUrl:
                                heroImagePreview ||
                                home.hero_image ||
                                "",
                            alt: "Hero preview",
                            inputId: "hero_image",
                            onImageChange: handleHeroImageChange,
                        })}
                    </div>
                </div>

                {/* ABOUT SECTION */}
                <div className="admin-settings-card">
                    <div className="settings-card-header">
                        <div>
                            <h3>About Section</h3>
                            <p>Manage the home page about section.</p>
                        </div>
                    </div>

                    <div className="frontend-form-grid">
                        <div className="form-group">
                            <label htmlFor="about_label">
                                About Label
                            </label>
                            <input
                                id="about_label"
                                type="text"
                                name="about_label"
                                value={home.about_label || ""}
                                onChange={handleChange}
                                placeholder="About Us"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="about_title">
                                About Title
                            </label>
                            <input
                                id="about_title"
                                type="text"
                                name="about_title"
                                value={home.about_title || ""}
                                onChange={handleChange}
                                placeholder="About our college"
                            />
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="about_description_1">
                                Description 1
                            </label>
                            <textarea
                                id="about_description_1"
                                name="about_description_1"
                                value={home.about_description_1 || ""}
                                onChange={handleChange}
                                rows="5"
                                placeholder="Enter first about description..."
                            />
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="about_description_2">
                                Description 2
                            </label>
                            <textarea
                                id="about_description_2"
                                name="about_description_2"
                                value={home.about_description_2 || ""}
                                onChange={handleChange}
                                rows="5"
                                placeholder="Enter second about description..."
                            />
                        </div>

                        {renderImagePreview({
                            title: "About Section Image",
                            imageUrl:
                                aboutImagePreview ||
                                home.about_image ||
                                "",
                            alt: "About section preview",
                            inputId: "about_image",
                            onImageChange: handleAboutImageChange,
                        })}
                    </div>
                </div>

                {/* SAVE BUTTON */}
                <div className="frontend-home-actions">
                    <button
                        type="submit"
                        className="settings-save"
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save Home Data"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminFrontendHome;
