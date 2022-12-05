import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
// components 
import Navigation from "../components/Navigation"
import Question from "../components/Question";

// context
import { AuthContext } from "../context/auth";

import { shortenRoute } from "../utils/hooks";

import { createAndUpdateScoreBoard, auth } from "../utils/firebase";

const StartPage = () => {

    const [courseQuestions, setCourseQuestions] = useState<any>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [submitNotification, setSubmitNotification] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [previousQuestions, setPreviousQuestions] = useState<any>([]);

    const [courseName, setCourseName] = useState<string>("")

    const { courses } = useContext(AuthContext)

    const param = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const course = courses.find((course: any, _idx: number) => {
            const route = shortenRoute(course.course)
            return route === param.courseId
        })

        setCourseQuestions(course?.questions)
        setCourseName(course?.course)
    }, [])


    const handlePrev = () => {
        if (currentQuestion !== 0) {
            setCurrentQuestion(currentQuestion - 1)
        } else {
            setCurrentQuestion(currentQuestion)
        }
    }

    const handleNext = () => {
        if (currentQuestion < courseQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            setCurrentQuestion(currentQuestion)
        }
    }


    const calculateScore = () => {

        const sumOfScore = previousQuestions.reduce((acc: number, previousQuestion: any) => {
            const { selectedAnswer, correctAnswer } = previousQuestion;
            if (selectedAnswer == correctAnswer) {
                return acc + 1
            }
            return acc;
        }, 0)
        setScore(sumOfScore)
        return sumOfScore
    }


    const handleSubmit = async () => {
        const calculatedScore = calculateScore();
        const percentage = ((calculatedScore / courseQuestions.length) * 100).toFixed(2)
        createAndUpdateScoreBoard(auth, { course: courseName, score: percentage })
        setSubmitNotification(!submitNotification);
    }



    const handleOptions = (_idx: number) => {
        const answeredQuestion = previousQuestions.find((previousQuestion: any, _idx: number) => {
            return previousQuestion?.id === courseQuestions[currentQuestion].id
        })
        if (answeredQuestion) {
            const newPreviousQuestion = previousQuestions.map((previousQuestion: any) => {
                return previousQuestion.id === courseQuestions[currentQuestion].id ?
                    {
                        ...previousQuestion,
                        selectedAnswer: courseQuestions[currentQuestion].options[_idx],
                        optionIndex: _idx
                    }
                    : previousQuestion
            })
            setPreviousQuestions(newPreviousQuestion);
        } else {
            setPreviousQuestions([...previousQuestions,
            {
                id: courseQuestions[currentQuestion].id,
                selectedAnswer: courseQuestions[currentQuestion].options[_idx],
                correctAnswer: courseQuestions[currentQuestion].correctAnswer,
                optionIndex: _idx
            }]);
        }
    }

    if (!courses) {
        return (
            <div className="w-full h-[100vh] flex justify-center items-center">
                Loading...
            </div>
        )
    }


    return (
        <div className="w-full relative">
            <Navigation />

            {

                courseQuestions && !submitNotification && (

                    <Question
                        Question={courseQuestions[currentQuestion]}
                        currentQuestion={currentQuestion}
                        totalQuestions={courseQuestions.length - 1}
                        handleNext={handleNext}
                        handleOptions={handleOptions}
                        handlePrev={handlePrev}
                        previousQuestion={previousQuestions[currentQuestion]}
                        handleSubmit={handleSubmit}
                    />


                )
            }

            {

                submitNotification && (
                    <div className="text-[20px] w-[90%] mx-auto font-bold md:w-[60%] mx-auto my-[3rem] flex justify-center flex-col">

                        <p>Test Successfully Submitted !! </p>

                        <div className="flex flex-col bg-black px-4 py-2 rounded text-white text-[14px] my-4">

                            <h1 className="flex justify-between my-2">
                                <span> Percentage score : </span>
                                {
                                    ((score / courseQuestions.length) * 100).toFixed(2)
                                }
                            </h1>

                            <p className="flex justify-between my-2">
                                <span>Number of Questions Not Answered :</span>
                                {
                                    courseQuestions.length - previousQuestions.length
                                }
                            </p>

                            <p className="flex justify-between my-2">

                                <span>Number of Questions Answered :</span>
                                {
                                    previousQuestions.length
                                }
                            </p>

                            <p className="flex justify-between my-2">
                                <span> Total number of questions answered correctly :</span>
                                {
                                    score
                                }
                            </p>


                            <p className="flex justify-between my-2">
                                <span> Total number of questions answered wrongly :</span>
                                {previousQuestions.length - score}
                            </p>

                        </div>

                        <button
                            type="button"
                            className="text-white bg-black py-2 px-8 rounded my-4 outline-none border-none"
                            onClick={() => navigate("/test")}
                        >
                            Test

                        </button>


                    </div>

                )
            }

        </div>
    )
}

export default StartPage