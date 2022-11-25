import { useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import InputField from "../components/InputField"
import Button from "../components/Button";
import Navigation from "../components/Navigation";

// icons 
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// authentication 
import { createUserViaEmailAndPassword, createUserDoc, getCurrentUser, auth } from "../utils/firebase";
import { Navigate } from "react-router-dom";

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


    const navigate = useNavigate();

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
            alert("Forms not completely Filled!")
            return;
        }

        if (password.trim() !== confirmPassword.trim()) {
            alert("Password Does Not Match !!");
            return;
        }

        try {

            const response = await createUserViaEmailAndPassword(email, password);

            console.log(response);

            createUserDoc(response?.user,
                {
                    displayName: `${otherProps.firstName} ${otherProps.lastName}`,
                    email,
                    phone: `${otherProps.phone}`,
                    address: `${otherProps.address}`,
                    role: `${otherProps.role}`
                }
            )

            const currentUser = await getCurrentUser(auth);


            currentUser && navigate("/profile")

            // if (currentUser?.role.trim() === "student") {
            //     return navigate("/student");
            // } else if (currentUser?.role.trim() === "teacher") {
            //     return navigate("/teacher")
            // }

            handleReset();

        }
        catch (err: any) {

            if (err.code === "auth/email-already-exists") {
                alert("email already exists");
            } else if (err.code === "auth/email-already-in-use") {
                alert("email already in use")
            } else if (err.code === "auth/weak-password") {
                alert("weak password! , password should be at least 6 characters.");
            } else if (err.code === "auth/invalid-api-key") {
                alert("invalid API KEY")
            }
            console.log(err);
        }



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
                    />
                    <InputField
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="w-full md:w-[48%] my-4 md:my-auto"
                        handleChange={handleChange}
                        value={formInput.lastName}
                    />
                </div>

                <InputField
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    className="my-4 w-full"
                    handleChange={handleChange}
                    value={formInput.email}

                />
                <InputField
                    type="number"
                    name="phone"
                    placeholder="Phone Number"
                    className="my-4 w-full"
                    handleChange={handleChange}
                    value={formInput.phone}


                />

                <InputField
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="my-4 w-full"
                    handleChange={handleChange}
                    value={formInput.address}


                />

                <div className="relative">
                    <InputField
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="my-4 w-full"
                        handleChange={handleChange}
                        value={formInput.password}

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