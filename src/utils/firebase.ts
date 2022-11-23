
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth"

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"




const firebaseConfig = {
    // apiKey: process.env.REACT_APP_API_KEY,
    // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_ID,

    apiKey: "AIzaSyD8ySkrGmo3GXFU6ddiW3lJCohxMXVWqRQ",
    authDomain: "quiz-app-cc2e5.firebaseapp.com",
    projectId: "quiz-app-cc2e5",
    storageBucket: "quiz-app-cc2e5.appspot.com",
    messagingSenderId: "317345737721",
    appId: "1:317345737721:web:1623ab0e38acbac4ddeb28"
};

const app = initializeApp(firebaseConfig);



export const auth = getAuth();

export const createUserViaEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInViaEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const authStateChange = async (callback: (user: any) => void) => {
    return onAuthStateChanged(auth, callback);
};


export const signOutUser = async () => await signOut(auth);


const db = getFirestore();

export const createUserDoc = async (userAuth: any, otherProps = {}) => {
    const userDocRef = doc(db, "users", userAuth.uid);

    const userDocSnapShot = await getDoc(userDocRef);

    if (!userDocSnapShot.exists()) {
        const createdAt = new Date();

        try {
            setDoc(userDocRef, {
                createdAt,
                ...otherProps,
            });
        } catch (err) {
            console.log(err);
        }
    } else {
        return;
    }
};



