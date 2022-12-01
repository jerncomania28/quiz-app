import { Link } from "react-router-dom";

// components 
import Navigation from "../components/Navigation"

// sample data 
import SAMPLES from "../sample.json";

//icons
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TestPage = () => {


    console.log(SAMPLES);
    return (
        <div className="w-full relative">
            <Navigation />

            <div className="flex flex-col">

                {

                    SAMPLES.map((sample, _idx) => {

                        return (
                            <Link
                                className="flex justify-between items-center py-[0.5rem] px-3 w-[95%] mx-auto md:w-[60%] border-solid border-[1px] border-[#434343] rounded my-[0.5rem]"
                                to={`/test/${sample.course}`}
                                key={_idx}

                            >
                                <span className="text-[20px]"> {sample.course}</span>
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