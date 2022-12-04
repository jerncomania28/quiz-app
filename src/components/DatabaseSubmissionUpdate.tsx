

import { Link } from "react-router-dom"

const DatabaseSubmissionUpdate = () => {
    return (

        <div className="flex justify-center items-center flex-col">
            <h1 className="text-[20px] font-bold"> Test Successfully Uploaded to Database !!</h1>

            <Link
                to={"/profile"}
                className={"px-[2.5rem] py-2 rounded bg-black text-white my-3"}
            >
                Profile
            </Link>
        </div>
    )
}

export default DatabaseSubmissionUpdate