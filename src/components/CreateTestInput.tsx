



interface CreateTestInputProps {
    type: string;
    placeholder: string;
    name: string;
    value: string | number;
    handleChange: (e: any) => void;
    className?: string;
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

export default CreateTestInput;