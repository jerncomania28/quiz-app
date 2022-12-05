import { useEffect, useContext } from "react";

import { Link } from "react-router-dom"

import { signOutUser, authStateChange } from "../utils/firebase"
import { AuthContext } from "../context/auth";

//assets
import Profile from "../assets/profile.png";

const Navigation = () => {


    const { isLoggedIn, handleIsLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        const unsubscribeFn = () => {
            const unsubscribe = authStateChange((user) => {
                const _ac = user ? true : false;
                handleIsLoggedIn(_ac);
            })

            return unsubscribe;
        }

        unsubscribeFn();

    }, []);


    return (
        <nav className="w-full flex justify-around items-center py-8 shadow-sm mb-[1rem] ">

            <Link
                to={"/"}
                className="text-[14px] font-bold md:text-[16px] ">
                quiz web app
            </Link>

            {
                isLoggedIn && (
                    <div className="flex">
                        <button
                            type="button"
                            className="text-white bg-black py-2 px-5 rounded "
                            onClick={signOutUser}
                        >
                            sign out
                        </button>

                        <Link to={"/profile"}>
                            <img src={Profile} alt="avater" className="w-[40px] mx-3" />
                        </Link>

                    </div>
                )
            }

            {
                !isLoggedIn && (
                    <div>
                        <Link to="/sign-up" className="py-3 px-4 bg-black text-white mx-2 rounded text-[16px]">Sign Up</Link>
                        <Link to="/sign-in" className="py-3 px-4 bg-black text-white mx-2 rounded text-[16px]">Sign In</Link>
                    </div>
                )
            }


        </nav>
    )
}

export default Navigation