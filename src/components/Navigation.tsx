import { Link } from "react-router-dom"


const Navigation = () => {
    return (
        <nav className="w-full flex justify-around items-center py-8 shadow-sm mb-[1rem] ">

            <h1 className="text-[16px] font-bold ">Logo</h1>

            <div>
                <Link to="/sign-up" className="py-3 px-4 bg-black text-white mx-2 rounded text-[16px]">Sign Up</Link>
                <Link to="/sign-in" className="py-3 px-4 bg-black text-white mx-2 rounded text-[16px]">Sign In</Link>
            </div>

        </nav>
    )
}

export default Navigation