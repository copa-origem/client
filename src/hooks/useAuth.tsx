import { useEffect, useState } from "react";
import { onAuthStateChanged} from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../firebase.js";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsub();

    }, []);

    return { user };
}
