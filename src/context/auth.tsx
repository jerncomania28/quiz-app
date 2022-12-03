import { createContext, useState } from "react";


const initialState = {
    isLoggedIn: false,
    handleIsLoggedIn: (_ac: boolean) => null,
    courses: [],
    handleSetCourse: (courses: any) => null
}


export const AuthContext = createContext<any>(initialState);

const AuthProvider = ({ children }: { children: any }) => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const [courses, setCourses] = useState<any>()

    const handleIsLoggedIn = (_ac: boolean) => {
        setIsLoggedIn(_ac)
    }

    const handleSetCourse = (courses: any) => {
        setCourses(courses)
    }

    const value = {
        isLoggedIn,
        handleIsLoggedIn,
        courses,
        handleSetCourse
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )


}

export default AuthProvider;

