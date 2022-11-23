
import { useState } from "react"

// components
import Navigation from "../components/Navigation"
import InputField from "../components/InputField"
import Button from "../components/Button"

// icons 
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// authentication
import { signInViaEmailAndPassword } from "../utils/firebase"

interface SignInDataProps {
    email: string;
    password: string;
}

const SignIn = () => {

    const defaultSignInData = {
        email: "",
        password: ""
    }

    const [signInData, setSignInData] = useState<SignInDataProps>(defaultSignInData);
    const [showSignInPassword, setShowSignInPassword] = useState<boolean>(false);



    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setSignInData({ ...signInData, [name]: value })
    }

    const handleSignInPassword = () => {
        setShowSignInPassword(!showSignInPassword)
    }

    const handleReset = () => {
        setSignInData(defaultSignInData);
    }

    const handleSubmit = (e: any) => {

        e.preventDefault();

        console.log(signInData);

        handleReset();
    }

    return (
        <div className="w-full flex justify-center items-center flex-col ">
            <Navigation />
            <form className="w-[90%] md:w-[60%] mx-auto" method="POST">

                <InputField
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full my-4"
                    handleChange={handleChange}
                    value={signInData.email}
                    required={true}
                />
                <div className="relative">
                    <InputField
                        type={showSignInPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="my-4 w-full"
                        handleChange={handleChange}
                        value={signInData.password}
                        required={true}
                    />
                    <FontAwesomeIcon
                        icon={showSignInPassword ? faEye : faEyeSlash}
                        className="absolute top-[1.8rem] right-[1.5rem] cursor-pointer"
                        onClick={handleSignInPassword}
                    />
                </div>

                <Button type="submit" Fn={handleSubmit}>
                    Sign In
                </Button>

            </form>
        </div>
    )
}

export default SignIn