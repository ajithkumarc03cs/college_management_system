import { useEffect, useState } from "react";
import api from "../../../api/axios";


function SidebarSettings() {

    // ========================================================
    // DATA
    // ========================================================

    const [menus, setMenus] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // ========================================================
    // FORM
    // ========================================================

    const [form, setForm] = useState({

        name: "",
        path: "",
        icon: "",
        order: 1,
        is_active: true,

    });


    // ========================================================
    // EDIT MODE
    // ========================================================

    const [editingId, setEditingId] = useState(null);


    // ========================================================
    // LOAD MENUS
    // ========================================================

    const loadMenus = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "/admin/sidebar-menus/"
            );

            setMenus(response.data);

        } catch (err) {

            console.error(err);

            setError(
                "Failed to load sidebar menus."
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // INITIAL LOAD
    // ========================================================

    useEffect(() => {

        loadMenus();

    }, []);


    // ========================================================
    // FORM CHANGE
    // ========================================================

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setForm((previous) => ({

            ...previous,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,

        }));

    };


    // ========================================================
    // RESET FORM
    // ========================================================

    const resetForm = () => {

        setForm({

            name: "",
            path: "",
            icon: "",
            order: menus.length + 1,
            is_active: true,

        });

        setEditingId(null);

    };


    // ========================================================
    // ADD MENU
    // ========================================================

    const handleAdd = async (e) => {

        e.preventDefault();

        try {

            setError("");
            setSuccess("");

            await api.post(
                "/admin/sidebar-menus/",
                {
                    name: form.name,
                    path: form.path,
                    icon: form.icon,
                    order: Number(form.order),
                    is_active: form.is_active,
                }
            );

            setSuccess(
                "Sidebar menu added successfully."
            );

            resetForm();

            loadMenus();

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.detail ||
                "Failed to add sidebar menu."
            );

        }

    };


    // ========================================================
    // EDIT MENU
    // ========================================================

    const handleEdit = (menu) => {

        setEditingId(menu.id);

        setForm({

            name: menu.name,
            path: menu.path,
            icon: menu.icon,
            order: menu.order,
            is_active: menu.is_active,

        });

        setError("");
        setSuccess("");

    };


    // ========================================================
    // UPDATE MENU
    // ========================================================

    const handleUpdate = async (e) => {

        e.preventDefault();

        if (!editingId) {
            return;
        }

        try {

            setError("");
            setSuccess("");

            await api.patch(
                `/admin/sidebar-menus/${editingId}/`,
                {
                    name: form.name,
                    path: form.path,
                    icon: form.icon,
                    order: Number(form.order),
                    is_active: form.is_active,
                }
            );

            setSuccess(
                "Sidebar menu updated successfully."
            );

            resetForm();

            loadMenus();

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.detail ||
                "Failed to update sidebar menu."
            );

        }

    };


    // ========================================================
    // DELETE MENU
    // ========================================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this sidebar menu?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            setError("");
            setSuccess("");

            await api.delete(
                `/admin/sidebar-menus/${id}/`
            );

            setSuccess(
                "Sidebar menu deleted successfully."
            );

            if (editingId === id) {
                resetForm();
            }

            loadMenus();

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.detail ||
                "Failed to delete sidebar menu."
            );

        }

    };


    // ========================================================
    // TOGGLE ACTIVE
    // ========================================================

    const handleToggleActive = async (menu) => {

        try {

            setError("");
            setSuccess("");

            await api.patch(
                `/admin/sidebar-menus/${menu.id}/`,
                {
                    is_active: !menu.is_active,
                }
            );

            loadMenus();

        } catch (err) {

            console.error(err);

            setError(
                "Failed to update menu status."
            );

        }

    };


    // ========================================================
    // RENDER
    // ========================================================

    return (

        <div className="settings-content-page">


            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="settings-content-header">

                <div>

                    <h2>
                        Sidebar
                    </h2>

                    <p>
                        Manage sidebar menu items
                    </p>

                </div>

            </div>


            {/* ==================================================
                MESSAGES
            ================================================== */}

            {error && (

                <div className="settings-error">

                    {error}

                </div>

            )}


            {success && (

                <div className="settings-success">

                    {success}

                </div>

            )}


            {/* ==================================================
                ADD / EDIT FORM
            ================================================== */}

            <div className="sidebar-settings-form">

                <h3>

                    {editingId
                        ? "Edit Sidebar Menu"
                        : "Add Sidebar Menu"
                    }

                </h3>


                <form
                    onSubmit={
                        editingId
                            ? handleUpdate
                            : handleAdd
                    }
                >


                    {/* NAME */}

                    <div className="settings-form-group">

                        <label>
                            Menu Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Example: Students"
                            required
                        />

                    </div>


                    {/* PATH */}

                    <div className="settings-form-group">

                        <label>
                            Path
                        </label>

                        <input
                            type="text"
                            name="path"
                            value={form.path}
                            onChange={handleChange}
                            placeholder="/admin/students"
                            required
                        />

                    </div>


                    {/* ICON */}

                    <div className="settings-form-group">

                        <label>
                            Icon
                        </label>

                        <input
                            type="text"
                            name="icon"
                            value={form.icon}
                            onChange={handleChange}
                            placeholder="🎓"
                        />

                    </div>


                    {/* ORDER */}

                    <div className="settings-form-group">

                        <label>
                            Order
                        </label>

                        <input
                            type="number"
                            name="order"
                            value={form.order}
                            onChange={handleChange}
                            min="1"
                            required
                        />

                    </div>


                    {/* ACTIVE */}

                    <div className="settings-form-checkbox">

                        <label>

                            <input
                                type="checkbox"
                                name="is_active"
                                checked={form.is_active}
                                onChange={handleChange}
                            />

                            <span>
                                Active
                            </span>

                        </label>

                    </div>


                    {/* BUTTONS */}

                    <div className="settings-form-actions">

                        <button
                            type="submit"
                            className="settings-save"
                        >

                            {editingId
                                ? "Update Menu"
                                : "Add Menu"
                            }

                        </button>


                        {editingId && (

                            <button
                                type="button"
                                className="settings-cancel"
                                onClick={resetForm}
                            >

                                Cancel

                            </button>

                        )}

                    </div>

                </form>

            </div>


            {/* ==================================================
                MENU LIST
            ================================================== */}

            <div className="sidebar-settings-list">

                <div className="settings-content-header">

                    <div>

                        <h3>
                            Sidebar Menus
                        </h3>

                        <p>
                            {menus.length} menu
                            {menus.length !== 1 ? "s" : ""}
                        </p>

                    </div>

                </div>


                {/* =================================================
                    LOADING
                ================================================= */}

                {loading ? (

                    <div className="settings-loading">

                        Loading sidebar menus...

                    </div>

                ) : menus.length === 0 ? (

                    <div className="settings-empty">

                        No sidebar menus found.

                    </div>

                ) : (

                    <div className="sidebar-menu-list">

                        {/* ==========================================
                            ARRAY ITERATION
                        =========================================== */}

                        {menus.map((menu) => (

                            <div
                                key={menu.id}
                                className="sidebar-menu-item"
                            >


                                {/* =================================
                                    DRAG / ORDER
                                ================================= */}

                                <div className="sidebar-menu-order">

                                    {menu.order}

                                </div>


                                {/* =================================
                                    ICON
                                ================================= */}

                                <div className="sidebar-menu-preview-icon">

                                    {menu.icon || "•"}

                                </div>


                                {/* =================================
                                    MENU INFO
                                ================================= */}

                                <div className="sidebar-menu-info">

                                    <strong>

                                        {menu.name}

                                    </strong>

                                    <span>

                                        {menu.path}

                                    </span>

                                </div>


                                {/* =================================
                                    STATUS
                                ================================= */}

                                <button
                                    type="button"
                                    className={
                                        menu.is_active
                                            ? "menu-status active"
                                            : "menu-status inactive"
                                    }
                                    onClick={() =>
                                        handleToggleActive(menu)
                                    }
                                >

                                    {menu.is_active
                                        ? "Active"
                                        : "Inactive"
                                    }

                                </button>


                                {/* =================================
                                    EDIT
                                ================================= */}

                                <button
                                    type="button"
                                    className="menu-edit-btn"
                                    onClick={() =>
                                        handleEdit(menu)
                                    }
                                >

                                    Edit

                                </button>


                                {/* =================================
                                    DELETE
                                ================================= */}

                                <button
                                    type="button"
                                    className="menu-delete-btn"
                                    onClick={() =>
                                        handleDelete(menu.id)
                                    }
                                >

                                    Delete

                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

}


export default SidebarSettings;