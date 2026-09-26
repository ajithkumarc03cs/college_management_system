import { useEffect, useState } from "react";
import api from "../../../api/axios";
import "./AdminFrontendGallery.css";

function AdminFrontendGallery() {

    const [page, setPage] = useState({
        hero_label: "",
        hero_title: "",
        hero_description: "",
        section_label: "",
        section_title: "",
    });

    const [images, setImages] = useState([]);

    const [imageFile, setImageFile] = useState(null);

    const [imageForm, setImageForm] = useState({
        title: "",
        order: 0,
        is_active: true,
    });

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);

    const loadData = async () => {

        try {

            setLoading(true);

            const response = await api.get(
                "public/gallery/"
            );

            setPage(response.data.page);

            setImages(
                response.data.images || []
            );

        } catch (error) {

            console.error(
                "Failed to load gallery:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handlePageChange = (e) => {

        setPage({
            ...page,
            [e.target.name]: e.target.value
        });

    };

    const savePage = async () => {

        try {

            await api.patch(
                "admin/gallery/page/",
                page
            );

            alert(
                "Gallery page updated successfully."
            );

            loadData();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.detail ||
                "Failed to update gallery page."
            );

        }
    };

    const handleFormChange = (e) => {

        const { name, value, type, checked } = e.target;

        setImageForm({
            ...imageForm,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        });

    };

    const resetForm = () => {

        setImageForm({
            title: "",
            order: 0,
            is_active: true,
        });

        setImageFile(null);

        setEditingId(null);

    };

    const saveImage = async () => {

        try {

            if (!imageForm.title) {

                alert(
                    "Image title is required."
                );

                return;
            }

            if (!editingId && !imageFile) {

                alert(
                    "Please select an image."
                );

                return;
            }

            const formData = new FormData();

            formData.append(
                "title",
                imageForm.title
            );

            formData.append(
                "order",
                imageForm.order
            );

            formData.append(
                "is_active",
                imageForm.is_active
            );

            if (imageFile) {

                formData.append(
                    "image",
                    imageFile
                );

            }

            if (editingId) {

                await api.patch(
                    `admin/gallery/${editingId}/`,
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data"
                        }
                    }
                );

                alert(
                    "Gallery image updated successfully."
                );

            } else {

                await api.post(
                    "admin/gallery/",
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data"
                        }
                    }
                );

                alert(
                    "Gallery image added successfully."
                );

            }

            resetForm();

            loadData();

        } catch (error) {

            console.error(error);

            alert(
                JSON.stringify(
                    error.response?.data ||
                    "Failed to save gallery image."
                )
            );

        }
    };

    const editImage = (item) => {

        setEditingId(item.id);

        setImageForm({
            title: item.title || "",
            order: item.order || 0,
            is_active: item.is_active,
        });

        setImageFile(null);

    };

    const deleteImage = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this image?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(
                `admin/gallery/${id}/`
            );

            alert(
                "Gallery image deleted successfully."
            );

            loadData();

        } catch (error) {

            console.error(error);

            alert(
                "Failed to delete gallery image."
            );

        }
    };

    if (loading) {

        return (
            <div className="admin-frontend-loading">
                Loading Gallery...
            </div>
        );

    }

    return (

        <div className="admin-frontend-page">

            <h2>
                Gallery
            </h2>


            {/* PAGE SETTINGS */}

            <div className="admin-frontend-card">

                <h3>
                    Gallery Page Content
                </h3>

                <div className="admin-form-grid">

                    <div>

                        <label>
                            Hero Label
                        </label>

                        <input
                            name="hero_label"
                            value={
                                page.hero_label || ""
                            }
                            onChange={
                                handlePageChange
                            }
                        />

                    </div>

                    <div>

                        <label>
                            Hero Title
                        </label>

                        <input
                            name="hero_title"
                            value={
                                page.hero_title || ""
                            }
                            onChange={
                                handlePageChange
                            }
                        />

                    </div>

                    <div className="admin-form-full">

                        <label>
                            Hero Description
                        </label>

                        <textarea
                            name="hero_description"
                            value={
                                page.hero_description || ""
                            }
                            onChange={
                                handlePageChange
                            }
                        />

                    </div>

                    <div>

                        <label>
                            Section Label
                        </label>

                        <input
                            name="section_label"
                            value={
                                page.section_label || ""
                            }
                            onChange={
                                handlePageChange
                            }
                        />

                    </div>

                    <div>

                        <label>
                            Section Title
                        </label>

                        <input
                            name="section_title"
                            value={
                                page.section_title || ""
                            }
                            onChange={
                                handlePageChange
                            }
                        />

                    </div>

                </div>

                <button
                    onClick={savePage}
                    className="admin-primary-btn"
                >
                    Save Page
                </button>

            </div>


            {/* GALLERY LIST */}

            <div className="admin-frontend-card">

                <h3>
                    Gallery Images
                </h3>

                {images.length === 0 ? (

                    <p>
                        No gallery images found.
                    </p>

                ) : (

                    <div className="admin-gallery-list">

                        {images.map((item) => (

                            <div
                                key={item.id}
                                className="admin-gallery-item"
                            >

                                {item.image && (

                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="admin-gallery-preview"
                                    />

                                )}

                                <div>

                                    <strong>
                                        {item.title}
                                    </strong>

                                    <p>
                                        Order: {item.order}
                                    </p>

                                    <p>
                                        Status:{" "}
                                        {item.is_active
                                            ? "Active"
                                            : "Inactive"}
                                    </p>

                                </div>

                                <div>

                                    <button
                                        onClick={() =>
                                            editImage(item)
                                        }
                                        className="admin-edit-btn"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteImage(item.id)
                                        }
                                        className="admin-delete-btn"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>


            {/* ADD / EDIT IMAGE */}

            <div className="admin-frontend-card">

                <h3>
                    {editingId
                        ? "Edit Gallery Image"
                        : "Add Gallery Image"}
                </h3>

                <div className="admin-form-grid">

                    <div>

                        <label>
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={
                                imageForm.title
                            }
                            onChange={
                                handleFormChange
                            }
                        />

                    </div>

                    <div>

                        <label>
                            Order
                        </label>

                        <input
                            type="number"
                            name="order"
                            value={
                                imageForm.order
                            }
                            onChange={
                                handleFormChange
                            }
                        />

                    </div>

                    <div className="admin-form-full">

                        <label>
                            Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setImageFile(
                                    e.target.files[0]
                                )
                            }
                        />

                    </div>

                    <div>

                        <label>
                            Active
                        </label>

                        <input
                            type="checkbox"
                            name="is_active"
                            checked={
                                imageForm.is_active
                            }
                            onChange={
                                handleFormChange
                            }
                        />

                    </div>

                </div>

                <button
                    onClick={saveImage}
                    className="admin-primary-btn"
                >
                    {editingId
                        ? "Update Image"
                        : "Add Image"}
                </button>

                {editingId && (

                    <button
                        onClick={resetForm}
                        className="admin-secondary-btn"
                    >
                        Cancel
                    </button>

                )}

            </div>

        </div>

    );

}

export default AdminFrontendGallery;