

const TeacherList = ({ data }: { data: any }) => {
    return (
        <div>
            {data.map((teacher: any, _idx: number) => (
                <div key={_idx}>
                    {teacher.data().displayName}
                </div>
            ))}
        </div>
    )

}



export default TeacherList;