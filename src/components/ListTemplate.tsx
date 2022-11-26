

const ListTemplate = ({ data }: { data: any }) => {
    return (
        <table className="mt-[3rem] w-[95%] mx-auto">
            <thead className="text-center border-[1px] border-solid border-[#434343]">
                <tr>
                    <td>S/N</td>
                    <td>Name</td>
                    <td>Role</td>
                </tr>
            </thead>
            <tbody>
                {data.map((person: any, _idx: number) => (
                    <tr key={_idx} className="border-[1px] border-[#434343] border-solid text-center capitalize">
                        <td className="py-2">
                            {_idx}
                        </td>
                        <td className="py-2">
                            {person.data().displayName}
                        </td>
                        <td className="py-2">
                            {person.data().role}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}


export default ListTemplate;