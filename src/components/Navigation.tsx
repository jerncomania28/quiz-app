import { useEffect, useState } from "react";

import { Link } from "react-router-dom"

import { signOutUser, authStateChange } from "../utils/firebase"

const Navigation = () => {

    const [isLoggedIn, setIsLogged] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribeFn = () => {
            const unsubscribe = authStateChange((user) => {
                const _ac = user ? true : false;
                setIsLogged(_ac);
            })

            return unsubscribe;
        }

        unsubscribeFn();

    }, []);


    return (
        <nav className="w-full flex justify-around items-center py-8 shadow-sm mb-[1rem] ">

            <h1 className="text-[16px] font-bold ">Logo</h1>

            {
                isLoggedIn && (
                    <button
                        type="button"
                        className="text-white bg-black py-2 px-5 rounded "
                        onClick={signOutUser}
                    >
                        sign out
                    </button>
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