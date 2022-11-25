import { getResponse } from "../helpers/GetResponse";
import { useEffect, useState } from "react";


// cannot use await for Hooks

export const useCurrentData = () => {
    const [_user, setUser] = useState<any>(null);
    useEffect(() => {
        getResponse()
            .then(response => {
                setUser(response);
            })
            .catch(error => console.error(error));
    }, []);

    return _user;
}
