
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
    apiKey: "AIzaSyCJPh35C4suDNJ1hCmqZLcESKokAGnqfmU",
    authDomain: "quiz-app-33089.firebaseapp.com",
    projectId: "quiz-app-33089",
    storageBucket: "quiz-app-33089.appspot.com",
    messagingSenderId: "1032257180128",
    appId: "1:1032257180128:web:6fde79ebb5e78b8f01db85"
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

export const getAllCourses = async () => {
    const collectionRef = collection(db, "courses");
    const q = query(collectionRef)
    const allCoursesSnapshot = await getDocs(q)
    const courses = allCoursesSnapshot.docs.map((course: any, _idx) => {
        return course.data()
    })
    return courses;
}

export const getCurrentUser = async (auth: any) => {
    const currentUserDocRef = doc(db, "users", auth.currentUser?.uid)
    const currentUserSnapshot = await getDoc(currentUserDocRef);
    return currentUserSnapshot.data();
}



export const setCourseQuestions = async (collectionKey: string, objectToAdd: any) => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db)
    const userDocRef = doc(collectionRef, objectToAdd.course)
    batch.set(userDocRef, objectToAdd)
    await batch.commit();
    console.log("sent!!")
}


export const createAndUpdateScoreBoard = async (userAuth: any, object = {}) => {
    const userDocRef = doc(db, "scoreboard", userAuth.currentUser.uid)
    const scoreSnapshot = await getDoc(userDocRef)

    const currentUser = await getCurrentUser(userAuth)
    if (scoreSnapshot.exists()) {
        const updatedAt = new Date()
        try {
            setDoc(userDocRef, {
                ...scoreSnapshot.data(),
                createdAt: updatedAt,
                results: [...scoreSnapshot.data().results, object]
            })
        } catch (err) { console.error(err) }
    } else {
        const createdAt = new Date()
        try {
            setDoc(userDocRef, { createdAt, results: [object], name: currentUser?.displayName })
        } catch (err) { console.error(err) }
    }

}


export const getAllScoreBoardData = async () => {
    const collectionRef = collection(db, "scoreboard");
    const q = query(collectionRef)
    const allScoreBoardData = await getDocs(q)
    const allScores = allScoreBoardData.docs.map((score: any, _idx) => {
        return score.data()
    })
    return allScores;
}
