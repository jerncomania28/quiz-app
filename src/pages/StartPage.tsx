import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
// components 
import Navigation from "../components/Navigation"
import Question from "../components/Question";

// data 
import SAMPLES from "../sample.json";


const StartPage = () => {

    const [courseQuestions, setCourseQuestions] = useState<any>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [submitNotification, setSubmitNotification] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [previousQuestions, setPreviousQuestions] = useState<any>([]);



    // varaibles needed 
    /*

     NumberOfQuestions Not Answered  = courseQuestions.length - previousQuestions.length

     Number of Questions Answered = previousQuestions.length

     total Number of Questions Correct 

     Wrong Answers - previousQuestions.length - score 
    
    */

    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const course = SAMPLES.find(sample => {
            return sample.course.trim() === param.courseId
        })
        setCourseQuestions(course?.questions)
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
    }


    const handleSubmit = () => {
        console.log("Test Submitted !!!");

        calculateScore();

        console.log("handle submit score :", score);

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


    return (
        <div className="w-full relative">
            <Navigation />

            {

                courseQuestions.length && !submitNotification && (

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
                    <div className="text-[20px] w-[90%] mx-auto font-bold md:w-[60%] mx-auto my-[3rem]">

                        <p>Test Successfully Submitted !! </p>

                        <div className="flex flex-col bg-black px-4 py-2 rounded text-white text-[14px] my-4">

                            <h1 className="flex justify-between my-2">
                                <span> Percentage score : </span>
                                {
                                    ((score / previousQuestions.length) * 100).toFixed(2)
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


                    </div>

                )
            }

        </div>
    )
}

export default StartPage