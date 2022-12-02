
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth"

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    query,
    collection,
    getDocs,
    writeBatch
} from "firebase/firestore"




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


export const getAllUsers = async (collectionkey: string) => {

    const collectionRef = collection(db, collectionkey);

    const q = query(collectionRef)

    const allUsersSnapshot = await getDocs(q)

    const currentUserSnapshot = await getCurrentUser(auth);

    if (currentUserSnapshot?.role.trim() === "student") {

        const listOfTeachers = allUsersSnapshot.docs.filter((usr: any) => {
            return usr.data().role.trim() === "teacher"
        })

        return { ...currentUserSnapshot, listOfTeachers }

    } else if (currentUserSnapshot?.role.trim() === "teacher") {

        const listOfStudents = allUsersSnapshot.docs.filter((usr: any) => {
            return usr.data().role.trim() === "student"
        })

        return { ...currentUserSnapshot, listOfStudents }
    } else {
        return currentUserSnapshot;
    }

}


export const getCurrentUser = async (auth: any) => {

    const currentUserDocRef = doc(db, "users", auth.currentUser?.uid)

    const currentUserSnapshot = await getDoc(currentUserDocRef);

    return currentUserSnapshot.data();
}


export const setScoreBoard = async (auth: any, score: number) => {

    const userDocRef = doc(db, "scoreboard", auth.uid)

    const timeTaken = new Date()


    console.log("firebase scoreboard", score)

    const batch = writeBatch(db);


    if (score) {
        batch.set(userDocRef, {
            score,
            timeTaken
        })
    }

    await batch.commit();

    console.log("done")

}


export const setCourseQuestions = async (collectionKey: string, objectToAdd: any) => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db)
    const userDocRef = doc(collectionRef, objectToAdd.course)
    batch.set(userDocRef, objectToAdd)
    await batch.commit();
    console.log("sent!!")
}

