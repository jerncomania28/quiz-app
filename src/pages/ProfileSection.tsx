import { useNavigate } from "react-router-dom";
// assets
import Profile from "../assets/profile.png";

import { useCurrentData } from "../utils/hooks";

//components 
import TeacherList from "../components/TeachersList";
import StudentList from "../components/StudentsList";
import Navigation from "../components/Navigation";

const ProfileSection = () => {

    const user = useCurrentData();

    const navigate = useNavigate();

    console.log(user)

    if (!user) return <p>Loading ... </p>;

    return (
        <div className="relative w-full">

            <Navigation />

            <div className="w-[90%] md:w-[60%] mx-auto flex justify-center items-center flex-col">
                <img src={Profile} alt="profile" className="w-[120px] my-3" />
                <h1 className="my-1 text-[25px] font-bold">{user.displayName}</h1>
                <p>{user.role}</p>

                {
                    user.role === "student" &&
                    <button
                        type="button"
                        className="text-white bg-black py-2 px-5 rounded "
                        onClick={() => navigate("/profile/test")}
                    >
                        Take Test

                    </button>
                }
                {
                    user.role === "teacher" &&
                    <button
                        type="button"
                        className="text-white bg-black py-2 px-5 rounded "
                        onClick={() => navigate("/profile/create-test")}
                    >
                        Create Test

                    </button>
                }

                {user.role === "student" && <TeacherList data={user.listOfTeachers} />}
                {user.role === "teacher" && <StudentList data={user.listOfStudents} />}
            </div>
        </div>

    )
}

export default ProfileSection