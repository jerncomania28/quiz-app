
// components
import Button from "./Button";


interface QuestionProps {
    Question: any;
    currentQuestion: number;
    totalQuestions: number;
    handleNext: () => void;
    handlePrev: () => void;
    handleOptions: (_idx: number) => void;
    previousQuestion: any;
    handleSubmit: () => void;
}



const Question = ({ Question, currentQuestion, totalQuestions, handleNext, handlePrev, handleOptions, previousQuestion, handleSubmit }: QuestionProps) => {



    if (!Question) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    return (

        <div className="w-[95%] mx-auto md:w-[60%] relative">

            <div className="p-[1rem] py-[1.5rem] text-[20px] text-white font-bold bg-black rounded">
                <p className="text-[12px] my-2">{`Question ${currentQuestion}/${totalQuestions}`}</p>
                {Question.question}
            </div>

            <div className="flex flex-col w-full relative my-[0.5rem]">

                {
                    Question.options.map((choice: any, _idx: number) => {

                        return (
                            <div
                                className={`flex cursor-pointer items-center py-[0.5rem] px-3 w-full mx-auto border-solid border-[1px] border-[#434343] rounded my-[0.7rem] hover:bg-black hover:text-white ${previousQuestion?.optionIndex === _idx ? "bg-black text-white" : ""}`}
                                key={_idx}
                                onClick={() => handleOptions(_idx)}
                            >
                                {choice}
                            </div>
                        )
                    })
                }

            </div>



            <div className="w-full relative flex justify-between items-center">
                {
                    currentQuestion !== 0 && (
                        <Button type="button" Fn={handlePrev} className="w-[150px] md:w-[200px]">
                            Prev
                        </Button>
                    )
                }


                {
                    currentQuestion === totalQuestions ? (
                        <Button type="button" Fn={handleSubmit} className="w-[150px] md:w-[200px]">
                            Submit
                        </Button>
                    ) : (
                        <Button type="button" Fn={handleNext} className="w-[150px] md:w-[200px]">
                            Next
                        </Button>
                    )
                }

            </div>


        </div >

    )
}

export default Question




// ${selectedIndex === _idx ? "bg-black text-white" : ""}