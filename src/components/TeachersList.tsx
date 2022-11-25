

const TeacherList = ({ data }: { data: any }) => {
    return (
        <table className="mt-[3rem] w-[95%] mx-auto">
            <thead className="text-center border-[1px] border-solid border-[#434343]">
                <th>S/N</th>
                <th>Name</th>
                <th>Role</th>
            </thead>
            {data.map((teacher: any, _idx: number) => (
                <tr key={_idx} className="border-[1px] border-[#434343] border-solid text-center capitalize">
                    <td className="py-2">
                        {_idx}
                    </td>
                    <td className="py-2">
                        {teacher.data().displayName}
                    </td>
                    <td className="py-2">
                        {teacher.data().role}
                    </td>
                </tr>
            ))}
        </table>
    )

}



export default TeacherList;