import { useNavigate } from "react-router-dom";
// assets
import Profile from "../assets/profile.png";

import { useCurrentData } from "../utils/hooks";

//components
import Navigation from "../components/Navigation";
import ListTemplate from "../components/ListTemplate";

const ProfileSection = () => {
    const user = useCurrentData();
    const navigate = useNavigate();

    if (!user) return <p className="text-[20px] font-bold w-full h-[100vh] flex justify-center items-center">Loading ... </p>;

    return (
        <div className="relative w-full">

            <Navigation />

            <div className="w-[90%] h-full md:w-[60%] mx-auto flex justify-center items-center flex-col py-[3rem]">
                <img src={Profile} alt="profile" className="w-[120px] my-3" />
                <h1 className="my-1 text-[25px] font-bold">{user.displayName}</h1>
                <p>{user.role}</p>

                {
                    user.role === "student" &&
                    (
                        <>
                            <button
                                type="button"
                                className="text-white bg-black py-2 px-8 rounded my-4 outline-none border-none"
                                onClick={() => navigate("/test")}
                            >
                                Take Test

                            </button>

                            <button
                                type="button"
                                className="text-white bg-black py-2 px-8 rounded my-4 outline-none border-none"
                                onClick={() => navigate("/scoreboard")}
                            >
                                ScoreBoard

                            </button>
                        </>
                    )


                }
                {
                    user.role === "teacher" && (
                        <>
                            <button
                                type="button"
                                className="text-white bg-black py-2 px-8 rounded my-4 outline-none border-none"
                                onClick={() => navigate("/create-test")}
                            >
                                Create Test

                            </button>


                            <button
                                type="button"
                                className="text-white bg-black py-2 px-8 rounded my-4 outline-none border-none"
                                onClick={() => navigate("/scoreboard")}
                            >
                                ScoreBoard

                            </button>
                        </>
                    )
                }

                {user.role === "student" && <ListTemplate data={user.listOfTeachers} />}
                {user.role === "teacher" && <ListTemplate data={user.listOfStudents} />}
            </div>
        </div>

    )
}

export default ProfileSection