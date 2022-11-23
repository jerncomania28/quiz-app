import { useState } from "react";

// components
import InputField from "../components/InputField"
import Button from "../components/Button";
import Navigation from "../components/Navigation";

// icons 
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// authentication 
import { createUserViaEmailAndPassword, createUserDoc } from "../utils/firebase";

interface FormInputProps {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    confirmPassword: string;
    role: string;
}

const SignUp = () => {

    const defaultFormInput = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
        role: ""
    }

    // states 
    const [formInput, setFormInput] = useState<FormInputProps>(defaultFormInput);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    // const [showError, setshowError] = useState<boolean>(false);


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormInput({ ...formInput, [name]: value });

    }

    const handleReset = () => {
        setFormInput(defaultFormInput);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const { email, password, confirmPassword, ...otherProps } = formInput;

        if (!Object.values(formInput).every(Boolean)) {
            return;
        }

        if (password.trim() !== confirmPassword.trim()) {
            alert("Password Does Not Match !!");
            return;
        }

        try {

            // const response = await createUserViaEmailAndPassword(email, password);
           

        }
        catch (err: any) {

            if (err.code === "auth/email-already-exists") {
                console.log("email already exists");
            } else if (err.code === "auth/email-already-in-use") {
                console.log("email already in use")
            } else if (err.code === "auth/weak-password") {
                console.log("weak password");
            } else if (err.code === "auth/invalid-api-key") {
                console.log("invalid API KEY")
            }
            console.log(err);
        }


        handleReset();
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }


    return (
        <div className="w-full flex justify-center items-center flex-col  ">

            <Navigation />

            <form className="w-[90%] md:w-[60%] mx-auto" method="POST">
                <div className="flex justify-center items-center w-full flex-col md:flex-row md:justify-between md:my-4">
                    <InputField
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="w-full my-4 md:w-[48%] md:my-auto "
                        handleChange={handleChange}
                        value={formInput.firstName}
                        required={true}
                    />
                    <InputField
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="w-full md:w-[48%] my-4 md:my-auto"
                        handleChange={handleChange}
                        value={formInput.lastName}
                        required={true}
                    />
                </div>

                <InputField
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    className="my-4 w-full"
                    handleChange={handleChange}
                    value={formInput.email}
                    required={true}

                />
                <InputField
                    type="number"
                    name="phone"
                    placeholder="Phone Number"
                    className="my-4 w-full"
                    handleChange={handleChange}
                    value={formInput.phone}
                    required={true}

                />

                <InputField
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="my-4 w-full"
                    handleChange={handleChange}
                    value={formInput.address}
                    required={true}

                />

                <div className="relative">
                    <InputField
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="my-4 w-full"
                        handleChange={handleChange}
                        value={formInput.password}
                        required={true}
                    />
                    <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                        className="absolute top-[1.8rem] right-[1.5rem] cursor-pointer"
                        onClick={handleShowPassword}
                    />
                </div>

                <InputField
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="my-4 w-full"
                    handleChange={handleChange}
                    value={formInput.confirmPassword}
                    required={true}
                />
                <div className="relative my-3 flex">
                    <div className="flex justify-start items-center mr-4 ">
                        <input type="radio" id="teacher" name="role" value="teacher" onChange={handleChange} />
                        <label htmlFor="#teacher" className="mx-2">Teacher</label>
                    </div>
                    <div className="flex justify-start items-center">
                        <input type="radio" id="student" name="role" value="student" onChange={handleChange} />
                        <label htmlFor="#student" className="mx-2">Student</label>
                    </div>
                </div>



                <Button type="submit" Fn={handleSubmit}>
                    Sign up
                </Button>


            </form>

        </div>
    )

}



export default SignUp;