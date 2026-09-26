import { useEffect, useState } from "react";
import api from "../../api/axios";

function AdminSettingsSidebar() {

    const [menus, setMenus] = useState([]);

    const [form, setForm] = useState({
        name: "",
        path: "",
        icon: "",
        order: 0,
        is_active: true,
    });

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // =====================================================
    // LOAD MENUS
    // =====================================================

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
                err.response?.data?.detail ||
                "Failed to load sidebar menus."
            );

        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadMenus();

    }, []);


    // =====================================================
    // INPUT CHANGE
    // =====================================================

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox"
                ? checked
                : value,
        });

    };


    // =====================================================
    // ADD / UPDATE
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            if (editingId) {

                await api.patch(
                    `/admin/sidebar-menus/${editingId}/`,
                    form
                );

                setMessage(
                    "Sidebar menu updated successfully."
                );

            } else {

                await api.post(
                    "/admin/sidebar-menus/",
                    form
                );

                setMessage(
                    "Sidebar menu added successfully."
                );

            }

            resetForm();

            loadMenus();

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.detail ||
                "Something went wrong."
            );

        }

    };


    // =====================================================
    // EDIT
    // =====================================================

    const handleEdit = (menu) => {

        setEditingId(menu.id);

        setForm({
            name: menu.name,
            path: menu.path,
            icon: menu.icon || "",
            order: menu.order,
            is_active: menu.is_active,
        });

        setMessage("");
        setError("");

    };


    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this sidebar menu?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(
                `/admin/sidebar-menus/${id}/`
            );

            setMessage(
                "Sidebar menu deleted successfully."
            );

            loadMenus();

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.detail ||
                "Failed to delete sidebar menu."
            );

        }

    };


    // =====================================================
    // RESET FORM
    // =====================================================

    const resetForm = () => {

        setEditingId(null);

        setForm({
            name: "",
            path: "",
            icon: "",
            order: 0,
            is_active: true,
        });

    };


    return (
        <div className="admin-settings-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Sidebar Menu Management
                    </h1>

                    <p>
                        Manage sidebar menu items for the system.
                    </p>

                </div>

            </div>


            {/* =================================================
                MESSAGE
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

            <div className="admin-settings-card">

                <div className="settings-card-header">

                    <h2>
                        {editingId
                            ? "Edit Sidebar Menu"
                            : "Add Sidebar Menu"}
                    </h2>

                </div>


                <form
                    className="settings-form"
                    onSubmit={handleSubmit}
                >

                    {/* NAME */}

                    <div className="form-group">

                        <label>
                            Menu Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Example: Dashboard"
                            required
                        />

                    </div>


                    {/* PATH */}

                    <div className="form-group">

                        <label>
                            Path
                        </label>

                        <input
                            type="text"
                            name="path"
                            value={form.path}
                            onChange={handleChange}
                            placeholder="/admin/dashboard"
                            required
                        />

                    </div>


                    {/* ICON */}

                    <div className="form-group">

                        <label>
                            Icon
                        </label>

                        <input
                            type="text"
                            name="icon"
                            value={form.icon}
                            onChange={handleChange}
                            placeholder="▦"
                        />

                    </div>


                    {/* ORDER */}

                    <div className="form-group">

                        <label>
                            Order
                        </label>

                        <input
                            type="number"
                            name="order"
                            value={form.order}
                            onChange={handleChange}
                            min="0"
                        />

                    </div>


                    {/* ACTIVE */}

                    <div className="form-group checkbox-group">

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
                                : "Add Menu"}
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


            {/* =================================================
                MENU LIST
            ================================================= */}

            <div className="admin-settings-card">

                <div className="settings-card-header">

                    <h2>
                        Sidebar Menus
                    </h2>

                </div>


                {loading ? (

                    <p>
                        Loading menus...
                    </p>

                ) : menus.length === 0 ? (

                    <p>
                        No sidebar menus found.
                    </p>

                ) : (

                    <div className="settings-menu-table">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        Order
                                    </th>

                                    <th>
                                        Name
                                    </th>

                                    <th>
                                        Path
                                    </th>

                                    <th>
                                        Icon
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {menus.map((menu) => (

                                    <tr key={menu.id}>

                                        <td>
                                            {menu.order}
                                        </td>

                                        <td>
                                            {menu.name}
                                        </td>

                                        <td>
                                            {menu.path}
                                        </td>

                                        <td>
                                            {menu.icon}
                                        </td>

                                        <td>

                                            {menu.is_active
                                                ? "Active"
                                                : "Inactive"}

                                        </td>

                                        <td>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEdit(menu)
                                                }
                                            >
                                                Edit
                                            </button>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(menu.id)
                                                }
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default AdminSettingsSidebar;