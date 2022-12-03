

import { useState } from "react"
import { Link } from "react-router-dom"

// components
import Navigation from "../components/Navigation"
import Button from "../components/Button"

import { setCourseQuestions } from "../utils/firebase"

interface QuestionProps {
    id: number | string;
    question: string;
    options: string[];
    correctAnswer: string;
}

interface CreateTestInputProps {
    type: string;
    placeholder: string;
    name: string;
    value: string | number;
    handleChange: (e: any) => void;
    className?: string;
}

interface QuestionArrayProps {
    course: string;
    questions: QuestionProps[];
}



const CreateTestInput = ({ type, placeholder, name, value, handleChange, className }: CreateTestInputProps) => {

    return (

        <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={handleChange}
            className={`rounded outline-none border-none bg-[#ddd] indent-[10px] break-words focus:border-solid focus:border-[1px] focus:border-[#434343] ${className}`}
        />

    )
}


const CreateTest = () => {

    const defaultQuestionInput = {
        id: "",
        question: "",
        options: [],
        correctAnswer: ""
    }

    const defaultQuestionArrayInput = {
        course: "",
        questions: []
    }

    const [courseName, setCourseName] = useState<string>("")

    const [questionParams, setQuestionParams] = useState<QuestionProps>(defaultQuestionInput)

    const [optionInput, setOptionInput] = useState<string>("")

    const [correctAnswer, setCorrectAnswer] = useState<string>("")

    const [questionArray, setQuestionArray] = useState<QuestionArrayProps>(defaultQuestionArrayInput)

    const [dataSent, setDataSent] = useState<boolean>(false)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleCourseName = (e: any) => {
        setCourseName(e.target.value)
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setQuestionParams({ ...questionParams, [name]: value })
    }

    const handleOptions = (e: any) => {
        setOptionInput(e.target.value)
    }

    const handleAddOption = () => {
        if (optionInput) {
            setQuestionParams({ ...questionParams, options: [...questionParams.options, optionInput.toLowerCase()] })
        } else {
            alert("option box cannot be empty")
        }
        setOptionInput("")
    }

    const handleCorrectAnswer = (e: any) => {
        setCorrectAnswer(e.target.value)
    }

    const handleAddCorrectAnswer = () => {
        if (correctAnswer) {
            setQuestionParams({ ...questionParams, correctAnswer: correctAnswer.toLowerCase() })
        } else {
            alert("correct answer must be filled!")
        }

        setCorrectAnswer("")
    }


    const handleSubmitQuestion = () => {

        if (!Object.values(questionParams).every(Boolean) || !courseName) {
            alert("Form Not Completely Filled!")

            return;
        }

        setQuestionArray({ course: courseName, questions: [...questionArray.questions, questionParams] })

        setQuestionParams(defaultQuestionInput)

    }


    const handleSetQuestionToDatabase = async () => {

        setIsLoading(true)

        await setCourseQuestions("courses", questionArray)

        setIsLoading(false)
        console.log("questions uploaded to database")
        setDataSent(!dataSent);
    }


    console.log("question parameters", questionParams)

    console.log("questions array", questionArray)


    return (
        <div className="w-full relative">
            <Navigation />

            {
                !dataSent && (
                    <>

                        <h1 className="text-[20px] font-bold capitalize text-center my-4"> create students test</h1>

                        <div className="w-[90%] mx-auto md:w-[60%] relative">

                            <div className="flex w-full justify-between flex-col md:flex-row ">

                                <CreateTestInput
                                    type="text"
                                    placeholder="Course Name"
                                    name="course"
                                    value={courseName}
                                    handleChange={handleCourseName}
                                    className={"py-2 px-2 w-[40%]"}
                                />

                                <span
                                    className="font-bold text-[20px] my-3 md:my-auto">
                                    {`Number of Questions : ${questionArray.questions.length}`}
                                </span>
                            </div>


                            <div className="w-full relative my-3">

                                <CreateTestInput

                                    type="number"
                                    placeholder="ID"
                                    name="id"
                                    value={questionParams.id}
                                    handleChange={handleChange}
                                    className={"w-[100px] my-3 text-center py-2 px-2 "}

                                />


                                <CreateTestInput
                                    type="text"
                                    placeholder="Enter Question"
                                    name="question"
                                    value={questionParams.question}
                                    handleChange={handleChange}
                                    className={"w-full h-[100px] py-2 px-2 "}
                                />


                                <div className="flex flex-col relative">
                                    {
                                        questionParams.options.map((option, _idx) => {

                                            return (
                                                <p
                                                    className="rounded bg-[#ddd] px-3 py-3 w-full my-2"
                                                    key={_idx}
                                                >
                                                    {option}
                                                </p>
                                            )

                                        })
                                    }

                                </div>
                                <div className="flex w-full justify-between my-4">
                                    <CreateTestInput
                                        type="text"
                                        placeholder="option"
                                        name="option"
                                        value={optionInput}
                                        handleChange={handleOptions}
                                        className={" w-[70%] mr-2 py-4"}
                                    />

                                    <Button type="button" Fn={handleAddOption} className={"w-[30%] my-auto text-[14px] md:text-[17px] py-4"}>
                                        Add Option
                                    </Button>
                                </div>

                                {

                                    questionParams.correctAnswer && (
                                        <p className="rounded px-3 py-3 w-full my-2 text-white bg-black">
                                            {questionParams.correctAnswer}
                                        </p>
                                    )
                                }


                                <div className="flex w-full justify-between my-4">
                                    <CreateTestInput
                                        type="text"
                                        placeholder="Correct Answer"
                                        name="correctAnswer"
                                        value={correctAnswer}
                                        handleChange={handleCorrectAnswer}
                                        className={" w-[70%] mr-2 py-4"}
                                    />

                                    <Button type="button" Fn={handleAddCorrectAnswer} className={"w-[30%] my-auto text-[14px] md:text-[17px] py-4"}>
                                        Add Answer
                                    </Button>

                                </div>

                                <div className="flex justify-between items-center my-3 ">

                                    <Button type="submit" Fn={handleSubmitQuestion} className={" w-[150px] text-[14px] md:w-[200px] md:text-[17px]"}>
                                        add question
                                    </Button>

                                    <Button type="button" Fn={handleSetQuestionToDatabase} className={"w-[150px] text-[14px] md:w-[200px] md:text-[17px]"}>

                                        {
                                            isLoading ? "loading..." : " send Questions"
                                        }

                                    </Button>

                                </div>
                            </div>
                        </div>

                    </>
                )

            }


            {
                dataSent && (

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
        </div>
    )
}

export default CreateTest