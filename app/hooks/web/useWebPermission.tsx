import { useEffect, useState } from "react";

export const useWebPermission = (name: PermissionName, desc = {}) => {
    const [state, setState] = useState<"checking" | "unsupported" | PermissionState>("checking");

    useEffect(() => {
        (async () => {
            const status = await navigator.permissions.query({
                name,
                ...desc,
            });

            setState(status.state);

            status.onchange = () => {
                setState(status.state);
            };
        })().catch(e => {
            console.error(e);
            setState("unsupported");
        })
    }, []);

    return {
        state,
    };
};
