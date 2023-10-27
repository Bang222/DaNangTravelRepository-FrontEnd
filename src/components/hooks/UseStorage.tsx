import {useEffect, useState} from "react";

export default function useStorage(key:any, type = "sessionStorage") {
    const [value, setValue] = useState();

    // Initial fetch from storage
    useEffect(() => {
        const storage = type === "sessionStorage" ? sessionStorage : localStorage;
        // @ts-ignore
        setValue(storage.getItem(key));
    }, [key, type]);

    // Persist to storage
    useEffect(() => {
        // first render, don't override/destroy existing item value
        if (value !== undefined) {
            const storage = type === "sessionStorage" ? sessionStorage : localStorage;
            storage.setItem(key, value);
        }
    }, [key, value, type]);

    return [value, setValue];
}