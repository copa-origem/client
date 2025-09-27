import React, { useState, useEffect } from "react";
import { auth } from "../firebase.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    getRedirectResult,
    signOut,
    onAuthStateChanged,
    getIdToken,
    GoogleAuthProvider
} from "firebase/auth";
import { useNavigate } from "react-router-dom";


function AuthForm({ onUser }) {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const provider = new GoogleAuthProvider();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            setUser(u);
            if (u && onUser) {
                const token = await u.getIdToken();
                onUser({ uid: u.uid, email: u.email, token });
            } else if (onUser) onUser(null);
        });
        return () => unsub();
    }, [onUser]);

    const signUp = async () => {
        await createUserWithEmailAndPassword(auth, email, pwd);
        navigate("/home");
    };

    const signIn = async () => {
        await signInWithEmailAndPassword(auth, email, pwd);
        navigate("/home");
    };

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider);
        navigate("/home");
    };

    const logout = async () => {
        await signOut(auth);
    };

    if (user) {
        return (
            <div>
                Logado como: {user.email || "anônimo"} <button onClick={logout}>Sair</button>
            </div>
        );
    }

    return (
        <div>
            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email" 
            />
            <input 
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="Digite sua senha"
            />
            <button onClick={signIn}>Entrar</button>
            <button onClick={signUp}>Criar conta</button>
            <hr />
            <button onClick={signInWithGoogle}>Entrar com Google</button>
        </div>
    )
}

export default AuthForm;