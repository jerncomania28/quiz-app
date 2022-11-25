import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";


const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="text-red-300">
            <Navigation />
            Quiz Web  Application

            <button
                type="button"
                className="text-white bg-black py-2 px-5 rounded "
                onClick={() => navigate("/profile")}
            >
                Student

            </button>
{/* 
            <button
                type="button"
                className="text-white bg-black py-2 px-5 rounded "
                onClick={() => navigate("/teacher")}
            >
                Teacher

            </button> */}


        </div>
    )
}

export default HomePage;