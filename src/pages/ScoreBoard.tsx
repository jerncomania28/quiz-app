
import { useState, useEffect } from "react"
// components
import Navigation from "../components/Navigation"

import { getAllScoreBoardData } from "../utils/firebase"


const ScoreBoard = () => {

    const [scoreBoardData, setScoreBoardData] = useState<any>([])

    useEffect(() => {

        getAllScoreBoardData()
            .then(response => {
                setScoreBoardData(response)
            })

    }, [])

    return (
        <div className="w-full relative">
            <Navigation />

            <div className="w-[95%] mx-auto md:w-[70%] relative">
                <h1 className="text-[20px] font-bold text-center">Students Score Board</h1>

                {
                    scoreBoardData.length > 0 && (
                        < table className="w-full relative">
                            <thead className="text-center border-[1px] border-solid border-[#434343]">
                                <tr className="font-bold bg-black text-white">
                                    <td>S/N</td>
                                    <td>Name</td>
                                    <td className="text-left">Result</td>
                                </tr>
                            </thead>
                            <tbody>
                                {scoreBoardData.map((scoreData: any, _idx: number) => (
                                    <tr key={_idx} className="border-[1px] border-[#434343] border-solid text-center capitalize">
                                        <td className="py-2">
                                            {_idx}
                                        </td>
                                        <td className="py-2">
                                            {scoreData.name}
                                        </td>
                                        <td className="py-2 text-left">
                                            {
                                                scoreData.results.map((result: any, _idx: number) => {
                                                    return <p key={_idx} className="text-[15px] py-2">{`course: ${result.course} , percentage score : ${result.score}%`}</p>
                                                })
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )

                }
            </div>

        </div >
    )

}

export default ScoreBoard