import { useContext } from "react"
import { AuthContext } from "../context/auth"
import { Navigate } from "react-router-dom";


const ProtectedRoutes = ({ children }: { children: any }) => {

    const { isLoggedIn } = useContext(AuthContext);

    if (isLoggedIn) {
        return children;
    } else {
        return <Navigate to="/" replace />
    }
}

export default ProtectedRoutes;