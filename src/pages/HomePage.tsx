import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";


const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="relative w-full">
            <Navigation />

            <h1 className="text-[20px] text-center font-bold uppercase my-3">
                Quiz Web  Application
            </h1>


        </div>
    )
}

export default HomePage;