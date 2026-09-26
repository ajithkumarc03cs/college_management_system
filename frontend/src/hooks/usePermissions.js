import { useEffect, useState } from "react";
import api from "../api/axios";

function usePermissions() {
    const [permissions, setPermissions] = useState({});
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPermissions = async () => {
            try {
                const response = await api.get("my-permissions/");

                console.log(
                    "User Permissions:",
                    response.data
                );

                setPermissions(
                    response.data.permissions || {}
                );

                setMenus(
                    response.data.menus || []
                );
            } catch (error) {
                console.error(
                    "Failed to load permissions:",
                    error
                );

                setPermissions({});
                setMenus([]);
            } finally {
                setLoading(false);
            }
        };

        loadPermissions();
    }, []);

    const can = (permissionCode, action) => {
        return Boolean(
            permissions?.[permissionCode]?.[action]
        );
    };

    return {
        permissions,
        menus,
        loading,
        can,
    };
}

export default usePermissions;