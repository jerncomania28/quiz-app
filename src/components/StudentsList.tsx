
const StudentList = ({ data }: { data: any }) => {
    return (
        <div>
            {data.map((student: any, _idx: number) => (
                <div key={_idx}>
                    {student.data().displayName}
                </div>
            ))}
        </div>
    )
}

export default StudentList;
