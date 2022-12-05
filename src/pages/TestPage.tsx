import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// components 
import Navigation from "../components/Navigation"

//icons
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// utils
import { getAllCourses } from "../utils/firebase";
import { shortenRoute } from "../utils/hooks";

// context
import { AuthContext } from "../context/auth";

const TestPage = () => {


    const { courses, handleSetCourse } = useContext(AuthContext)

    useEffect(() => {
        getAllCourses()
            .then((response) => handleSetCourse(response))
            .catch((err) => {
                console.error(err)
            })

    }, [])

    if (!courses) {
        return <div className="text-[20px] font-bold w-full h-[100vh] flex justify-center items-center"> Loading ...</div>

    }

    return (
        <div className="w-full relative">
            <Navigation />

            <div className="flex flex-col">

                {

                    courses.map((course: any, _idx: number) => {

                        return (
                            <Link
                                className="flex justify-between items-center py-[0.5rem] px-3 w-[95%] mx-auto md:w-[60%] border-solid border-[1px] border-[#434343] rounded my-[0.5rem]"
                                to={`/test/${shortenRoute(course.course)}`}
                                key={_idx}

                            >
                                <span className="text-[20px]"> {course.course}</span>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </Link>
                        )

                    })

                }
            </div>
        </div>
    )
}

export default TestPage