

import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

// components
import Navigation from "../components/Navigation"
import Button from "../components/Button"
import CreateTestInput from "../components/CreateTestInput"
import DatabaseSubmissionUpdate from "../components/DatabaseSubmissionUpdate"

import { setCourseQuestions } from "../utils/firebase"

// icons
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface QuestionProps {
    question: string;
    options: string[];
    correctAnswer: string;
}

interface QuestionArrayProps {
    course: string;
    questions: QuestionProps[];
}



const CreateTest = () => {


    const defaultQuestionArrayInput = {
        course: "",
        questions: []
    }

    const [questionArray, setQuestionArray] = useState<QuestionArrayProps>(defaultQuestionArrayInput)


    const defaultQuestionInput = {
        question: "",
        options: [],
        correctAnswer: ""
    }


    const [courseName, setCourseName] = useState<string>("")

    const [questionParams, setQuestionParams] = useState<any>(defaultQuestionInput)

    const [optionInput, setOptionInput] = useState<string>("")

    const [dataSent, setDataSent] = useState<boolean>(false)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [showOptionList, setShowOptionList] = useState<boolean>(false)



    const handleShowOptionList = () => {
        setShowOptionList(!showOptionList)
    }

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

    const handleAddCorrectAnswer = (_idx: number) => {

        setQuestionParams({ ...questionParams, correctAnswer: questionParams.options[_idx] })

        handleShowOptionList()
    }


    const handleSubmitQuestion = () => {
        if (!Object.values(questionParams).every(Boolean) || !courseName) {
            alert("Form Not Completely Filled!")
            return;
        }
        const generatedUUID = uuidv4();
        setQuestionArray({ course: courseName, questions: [...questionArray.questions, { ...questionParams, id: generatedUUID }] })
        setQuestionParams(defaultQuestionInput)
    }


    const handleSetQuestionToDatabase = async () => {
        setIsLoading(true)
        await setCourseQuestions("courses", questionArray)
        setIsLoading(false)
        setDataSent(!dataSent);
    }


    console.log("question params", questionParams)
    console.log("question array", questionArray)
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
                                    type="text"
                                    placeholder="Enter Question"
                                    name="question"
                                    value={questionParams.question}
                                    handleChange={handleChange}
                                    className={"w-full h-[100px] py-2 px-2 "}
                                />


                                <div className="flex flex-col relative">
                                    {
                                        questionParams.options.map((option:string, _idx:number) => {

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


                                <div className="flex w-full justify-between my-4 relative">

                                    <div
                                        className="w-full p-[1rem] bg-black text-white rounded text-[20px] font-bold flex justify-between"
                                        onClick={handleShowOptionList}>
                                        <span>{questionParams.correctAnswer ? questionParams.correctAnswer : "Select Answer"} </span>
                                        <FontAwesomeIcon icon={faArrowDown} className="text-white" />
                                    </div>

                                </div>

                                <div className="flex justify-between items-center my-3 ">

                                    <Button type="submit" Fn={handleSubmitQuestion} className={" w-[150px] text-[14px] md:w-[200px] md:text-[17px]"}>
                                        add question
                                    </Button>

                                    {

                                        questionArray.questions.length > 0 && (

                                            <Button type="button" Fn={handleSetQuestionToDatabase} className={"w-[150px] text-[14px] md:w-[200px] md:text-[17px]"}>
                                                {
                                                    isLoading ? "loading..." : " send Questions"
                                                }
                                            </Button>
                                        )
                                    }

                                </div>
                            </div>
                        </div>

                    </>
                )

            }


            {
                dataSent && <DatabaseSubmissionUpdate />
            }


            {
                showOptionList && (
                    <>
                        <div className="w-full h-full fixed top-[0rem] left-[0rem] bg-black opacity-50"></div>

                        <div className="absolute top-[50%] left-[50%] transform -translate-x-[50%] bg-white rounded w-[300px] md:w-[50%] mx-auto">

                            {
                                questionParams.options.map((option:string, _idx:number) => {
                                    return (
                                        <p
                                            className="w-full p-[1rem] text-[15px] hover:bg-black hover:text-white"
                                            onClick={() => handleAddCorrectAnswer(_idx)}
                                            key={_idx}
                                        >
                                            {option}
                                        </p>
                                    )

                                })
                            }
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default CreateTest