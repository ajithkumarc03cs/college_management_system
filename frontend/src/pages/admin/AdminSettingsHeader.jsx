import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./AdminSettingsHeader.css";

function AdminSettingsHeader() {

    const [menus, setMenus] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingMenu, setEditingMenu] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        path: "",
        order: 1,
        is_active: true,
        open_in_new_tab: false
    });


    // ==================================================
    // LOAD MENUS
    // ==================================================

    const fetchMenus = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "admin/website-menus/"
            );

            setMenus(response.data);

        } catch (error) {

            console.error(
                "Failed to load website menus:",
                error
            );

            setError(
                "Failed to load website menus."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        fetchMenus();

    }, []);


    // ==================================================
    // FORM INPUT
    // ==================================================

    const handleChange = (event) => {

        const { name, value, type, checked } =
            event.target;

        setFormData((current) => ({
            ...current,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));
    };


    // ==================================================
    // OPEN ADD FORM
    // ==================================================

    const handleAdd = () => {

        setEditingMenu(null);

        setFormData({
            name: "",
            path: "",
            order: menus.length + 1,
            is_active: true,
            open_in_new_tab: false
        });

        setShowForm(true);
    };


    // ==================================================
    // OPEN EDIT FORM
    // ==================================================

    const handleEdit = (menu) => {

        setEditingMenu(menu);

        setFormData({
            name: menu.name,
            path: menu.path,
            order: menu.order,
            is_active: menu.is_active,
            open_in_new_tab:
                menu.open_in_new_tab
        });

        setShowForm(true);
    };


    // ==================================================
    // CANCEL FORM
    // ==================================================

    const handleCancel = () => {

        setShowForm(false);

        setEditingMenu(null);

        setFormData({
            name: "",
            path: "",
            order: 1,
            is_active: true,
            open_in_new_tab: false
        });
    };


    // ==================================================
    // ADD / UPDATE MENU
    // ==================================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        if (!formData.name.trim()) {

            alert("Please enter menu name.");

            return;
        }


        if (!formData.path.trim()) {

            alert("Please enter menu path.");

            return;
        }


        try {

            const data = {
                name: formData.name.trim(),

                path: formData.path.trim(),

                order: Number(formData.order),

                is_active:
                    formData.is_active,

                open_in_new_tab:
                    formData.open_in_new_tab
            };


            // UPDATE

            if (editingMenu) {

                await api.patch(
                    `admin/website-menus/${editingMenu.id}/`,
                    data
                );

            }

            // CREATE

            else {

                await api.post(
                    "admin/website-menus/",
                    data
                );
            }


            await fetchMenus();

            handleCancel();

        } catch (error) {

            console.error(
                "Failed to save menu:",
                error
            );

            console.error(
                "Backend response:",
                error.response?.data
            );

            alert(
                "Failed to save website menu."
            );
        }
    };


    // ==================================================
    // ENABLE / DISABLE
    // ==================================================

    const toggleMenu = async (menu) => {

        try {

            const newStatus =
                !menu.is_active;


            await api.patch(
                `admin/website-menus/${menu.id}/`,
                {
                    is_active: newStatus
                }
            );


            setMenus((currentMenus) =>
                currentMenus.map((item) =>
                    item.id === menu.id
                        ? {
                            ...item,
                            is_active:
                                newStatus
                        }
                        : item
                )
            );

        } catch (error) {

            console.error(
                "Failed to update menu:",
                error
            );

            alert(
                "Failed to update menu status."
            );
        }
    };


    // ==================================================
    // DELETE MENU
    // ==================================================

    const handleDelete = async (menu) => {

        const confirmed = window.confirm(
            `Delete "${menu.name}" menu?`
        );


        if (!confirmed) {

            return;
        }


        try {

            await api.delete(
                `admin/website-menus/${menu.id}/`
            );


            setMenus((currentMenus) =>
                currentMenus.filter(
                    (item) =>
                        item.id !== menu.id
                )
            );

        } catch (error) {

            console.error(
                "Failed to delete menu:",
                error
            );

            alert(
                "Failed to delete website menu."
            );
        }
    };


    // ==================================================
    // LOADING
    // ==================================================

    if (loading) {

        return (
            <div className="website-header-loading">

                <p>
                    Loading website menus...
                </p>

            </div>
        );
    }


    // ==================================================
    // ERROR
    // ==================================================

    if (error) {

        return (
            <div className="website-header-error">

                <p>
                    {error}
                </p>

                <button
                    type="button"
                    onClick={fetchMenus}
                >
                    Retry
                </button>

            </div>
        );
    }


    // ==================================================
    // UI
    // ==================================================

    return (

        <div className="website-header-manager">


            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="website-header-manager-top">

                <div>

                    <h3>
                        Header Navigation
                    </h3>

                    <p>
                        Manage public website
                        navigation menus.
                    </p>

                </div>


                <button
                    type="button"
                    className="website-add-menu-btn"
                    onClick={handleAdd}
                >
                    + Add Menu
                </button>

            </div>


            {/* ==================================================
                ADD / EDIT FORM
            ================================================== */}

            {showForm && (

                <div className="website-menu-form">

                    <div className="website-menu-form-header">

                        <h3>
                            {editingMenu
                                ? "Edit Menu"
                                : "Add Menu"}
                        </h3>

                    </div>


                    <form onSubmit={handleSubmit}>


                        {/* MENU NAME */}

                        <div className="website-form-group">

                            <label>
                                Menu Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Example: About"
                            />

                        </div>


                        {/* PATH */}

                        <div className="website-form-group">

                            <label>
                                Path
                            </label>

                            <input
                                type="text"
                                name="path"
                                value={formData.path}
                                onChange={handleChange}
                                placeholder="Example: /about"
                            />

                        </div>


                        {/* ORDER */}

                        <div className="website-form-group">

                            <label>
                                Order
                            </label>

                            <input
                                type="number"
                                name="order"
                                min="1"
                                value={formData.order}
                                onChange={handleChange}
                            />

                        </div>


                        {/* ACTIVE */}

                        <label className="website-form-checkbox">

                            <input
                                type="checkbox"
                                name="is_active"
                                checked={
                                    formData.is_active
                                }
                                onChange={handleChange}
                            />

                            <span>
                                Show on public website
                            </span>

                        </label>


                        {/* NEW TAB */}

                        <label className="website-form-checkbox">

                            <input
                                type="checkbox"
                                name="open_in_new_tab"
                                checked={
                                    formData.open_in_new_tab
                                }
                                onChange={handleChange}
                            />

                            <span>
                                Open in new tab
                            </span>

                        </label>


                        {/* BUTTONS */}

                        <div className="website-form-actions">

                            <button
                                type="submit"
                                className="website-save-btn"
                            >
                                {editingMenu
                                    ? "Update Menu"
                                    : "Add Menu"}
                            </button>


                            <button
                                type="button"
                                className="website-cancel-btn"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>
            )}


            {/* ==================================================
                MENU LIST
            ================================================== */}

            <div className="website-menu-list">

                {menus.length === 0 ? (

                    <div className="website-menu-empty">

                        <p>
                            No website menus found.
                        </p>

                        <button
                            type="button"
                            onClick={handleAdd}
                        >
                            Add First Menu
                        </button>

                    </div>

                ) : (

                    menus.map((menu) => (

                        <div
                            className="website-menu-item"
                            key={menu.id}
                        >


                            {/* LEFT */}

                            <div className="website-menu-info">

                                <div className="website-menu-order">

                                    {menu.order}

                                </div>


                                <div>

                                    <h4>
                                        {menu.name}
                                    </h4>

                                    <p>
                                        {menu.path}
                                    </p>

                                </div>

                            </div>


                            {/* RIGHT */}

                            <div className="website-menu-actions">


                                {/* ENABLE */}

                                <label className="website-menu-toggle">

                                    <input
                                        type="checkbox"
                                        checked={
                                            menu.is_active
                                        }
                                        onChange={() =>
                                            toggleMenu(menu)
                                        }
                                    />

                                    <span className="website-toggle-slider">
                                    </span>

                                    <span className="website-toggle-label">

                                        {menu.is_active
                                            ? "Enabled"
                                            : "Disabled"}

                                    </span>

                                </label>


                                {/* EDIT */}

                                <button
                                    type="button"
                                    className="website-edit-btn"
                                    onClick={() =>
                                        handleEdit(menu)
                                    }
                                >
                                    Edit
                                </button>


                                {/* DELETE */}

                                <button
                                    type="button"
                                    className="website-delete-btn"
                                    onClick={() =>
                                        handleDelete(menu)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default AdminSettingsHeader;




